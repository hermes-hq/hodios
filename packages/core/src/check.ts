import {
  COMPUTED_FIELDS,
  FACET_LIMITS,
  FORBIDDEN_FIELDS,
  KINDS,
  RISKS,
  STATUSES_REQUIRING_EVALS,
  validateEntry,
  validateEvals,
  type EntryFrontmatter,
  type Kind,
} from '@hermes-hq/hodios-schema';
import { checkCurated, type CuratedList } from './curation.js';
import type { IdsLock } from './ids-lock.js';
import { parseFrontmatter, parseYamlDocument } from './parse.js';
import type { Issue, RuleId, Severity } from './rules.js';
import { ARG_NAME, findPositionalPlaceholders, resolveInclude, scanTemplate } from './template.js';
import { checkVocabSet, impliedBy, liveValues, lookup, type Vocab } from './vocab.js';

/** One entry folder, as read by the caller (the core has no file system access). */
export interface EntrySource {
  /** Repo-relative POSIX path of the folder, e.g. `library/software-engineering/code-review/review-pull-request`. */
  dir: string;
  /** Every file in the folder: relative POSIX path -> UTF-8 text. */
  files: Map<string, string>;
}

export interface LibraryContext {
  vocab: Vocab;
  /** Partials by path under partials/, e.g. `guardrails/scope-discipline.md`. */
  partials: Map<string, string>;
  idsLock: IdsLock;
  /** curated.txt, when the checkout has one. Without it every entry is curated. */
  curated?: CuratedList;
}

export interface CheckedEntry {
  dir: string;
  /** Repo-relative path of the `<kind>.md` file, when one was found. */
  file?: string;
  frontmatter?: EntryFrontmatter;
}

export interface CheckResult {
  entries: CheckedEntry[];
  issues: Issue[];
}

/** Vocabulary files that must exist in vocab/. `subcategory` is optional until a category is split. */
export const VOCAB_FACETS = [
  'domain',
  'category',
  'stage',
  'stack',
  'role',
  'subject',
  'requires',
  'inputs',
  'output',
  'advice-risk',
  'tags',
] as const;

/** The holding-area category (TAXONOMY.md §2.5) and its limits. */
export const HOLDING_CATEGORY = 'unsorted';
export const HOLDING_LIMITS = { warn: 40, error: 50, graduate: 5 } as const;

/** Entries per category (or subcategory) folder (TAXONOMY.md §2.3). GitHub caps a directory at 3,000. */
export const FOLDER_LIMITS = { warn: 600, error: 1000 } as const;

/** The lowest `risk` each `requires` value implies (PS056). */
const RISK_FLOOR: Record<string, (typeof RISKS)[number]> = {
  'file-write': 'edits-files',
  shell: 'runs-commands',
  web: 'network',
};

/** Facets a tag must not duplicate (PS057). */
const TAG_SHADOWED_FACETS = ['category', 'stack', 'subject', 'role', 'stage'] as const;

const KIND_FILE = new RegExp(`^(${KINDS.join('|')})\\.md$`);
const LAYOUT: { pattern: RegExp; kinds?: Kind[] }[] = [
  { pattern: KIND_FILE },
  { pattern: /^evals\.yaml$/ },
  { pattern: /^examples\/[a-z0-9]+(-[a-z0-9]+)*\.md$/ },
  { pattern: /^references\/[a-z0-9]+(-[a-z0-9]+)*\.md$/ },
  { pattern: /^variants\/[a-z0-9]+(-[a-z0-9]+)*\.md$/ },
  { pattern: /^steps\/\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$/, kinds: ['workflow'] },
];

const PROMPT_SECTIONS = ['context', 'task', 'constraints', 'output_format'];
const HIDDEN_CHARS =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/u;
const DOWNLOAD_EXEC = [
  /\b(curl|wget)\b[^\n|]*\|\s*(sudo\s+)?(ba|z|k|da)?sh\b/i,
  /\b(iwr|irm|invoke-webrequest|invoke-restmethod)\b[^\n|]*\|\s*iex\b/i,
  /\biex\s*\(\s*(new-object|iwr|irm|invoke-webrequest)/i,
];
const SHELL_INJECTION = [/!`[^`\n]+`/, /!\{[^}\n]+\}/];

class Reporter {
  readonly issues: Issue[] = [];
  add(rule: RuleId, severity: Severity, file: string, message: string): void {
    this.issues.push({ rule, severity, file, message });
  }
  error(rule: RuleId, file: string, message: string): void {
    this.add(rule, 'error', file, message);
  }
}

function hasTag(body: string, tag: string): boolean {
  return body.includes(`<${tag}>`) && body.includes(`</${tag}>`);
}

/** Checks one entry folder. Cross-entry rules (duplicates, aliases, PS004) live in checkLibrary. */
export function checkEntry(src: EntrySource, ctx: LibraryContext): { checked: CheckedEntry; issues: Issue[] } {
  const r = new Reporter();
  const checked: CheckedEntry = { dir: src.dir };
  const segments = src.dir.split('/');
  const folderId = segments.at(-1) ?? '';
  // Below library/: [category, id] (legacy), [domain, category, id] or [domain, category, subcategory, id].
  const pathParts = segments[0] === 'library' ? segments.slice(1) : segments;
  const folderCategory = pathParts.length <= 3 ? (pathParts.at(-2) ?? '') : (pathParts[1] ?? '');

  // Layout (PS009, PS045) and text hygiene on every file (PS040, PS043, PS045).
  const kindFiles: string[] = [];
  for (const [rel, text] of src.files) {
    const path = `${src.dir}/${rel}`;
    if (rel === 'scripts' || rel.startsWith('scripts/')) {
      r.error('PS045', path, 'scripts/ directories are not allowed; entries are text only');
      continue;
    }
    if (KIND_FILE.test(rel)) kindFiles.push(rel);
    if (!LAYOUT.some((l) => l.pattern.test(rel))) {
      r.error('PS009', path, 'unexpected file; see CONTRIBUTING.md for the entry folder layout');
    }
    if (HIDDEN_CHARS.test(text)) {
      r.error('PS040', path, 'contains zero-width, bidirectional or control characters');
    }
    if (DOWNLOAD_EXEC.some((re) => re.test(text))) {
      r.error('PS043', path, 'contains a download-and-execute pattern');
    }
    if (rel.endsWith('.md') && SHELL_INJECTION.some((re) => re.test(text))) {
      r.error('PS045', path, 'contains shell injection syntax (!`cmd` or !{cmd})');
    }
    if (rel.endsWith('.md')) {
      const positional = findPositionalPlaceholders(text);
      if (positional.length > 0) {
        r.error(
          'PS012',
          path,
          `positional placeholders are not allowed: ${[...new Set(positional)].join(', ')}; use {{name}}`,
        );
      }
    }
  }

  if (kindFiles.length === 0) {
    r.error('PS009', src.dir, `no entry file; expected one of ${KINDS.map((k) => `${k}.md`).join(', ')}`);
    return { checked, issues: r.issues };
  }
  if (kindFiles.length > 1) {
    r.error('PS009', src.dir, `more than one entry file: ${kindFiles.join(', ')}`);
    return { checked, issues: r.issues };
  }

  const kindFile = kindFiles[0] as string;
  const file = `${src.dir}/${kindFile}`;
  checked.file = file;
  const fileKind = kindFile.replace(/\.md$/, '') as Kind;
  const parsed = parseFrontmatter(src.files.get(kindFile) ?? '');
  if (parsed.error) {
    r.error('PS000', file, parsed.error);
    return { checked, issues: r.issues };
  }
  if (typeof parsed.data !== 'object' || parsed.data === null || Array.isArray(parsed.data)) {
    r.error('PS000', file, 'frontmatter must be a YAML mapping');
    return { checked, issues: r.issues };
  }

  const raw = parsed.data as Record<string, unknown>;
  for (const field of COMPUTED_FIELDS) {
    if (field in raw) r.error('PS000', file, `"${field}" is computed by the build; remove it`);
  }
  for (const field of FORBIDDEN_FIELDS) {
    if (field in raw) r.error('PS045', file, `"${field}" is not allowed; entries are text only`);
  }
  const schema = validateEntry(raw);
  if (!schema.valid || !schema.value) {
    for (const issue of schema.issues) {
      const field = issue.path === '' ? '' : `${issue.path.slice(1).replaceAll('/', '.')}: `;
      const known = [...COMPUTED_FIELDS, ...FORBIDDEN_FIELDS] as readonly string[];
      if (known.some((f) => issue.message === `unknown field "${f}"`)) continue;
      r.error('PS000', file, `${field}${issue.message}`);
    }
    return { checked, issues: r.issues };
  }

  const fm = schema.value;
  checked.frontmatter = fm;

  // Identity.
  if (fm.id.startsWith('@')) {
    r.error('PS001', file, `scoped id "${fm.id}" belongs to the community registry, not the core repo`);
  } else if (fm.id !== folderId) {
    r.error('PS001', file, `id "${fm.id}" does not match folder "${folderId}"`);
  }
  if (fm.category !== folderCategory) {
    r.error('PS002', file, `category "${fm.category}" does not match folder "${folderCategory}"`);
  }
  checkPath(r, file, pathParts, fm, ctx.vocab);
  if (fm.kind !== fileKind) {
    r.error('PS009', file, `kind "${fm.kind}" does not match file name "${kindFile}"`);
  }
  const locked = ctx.idsLock.entries.get(fm.id);
  if (locked && locked.kind !== fm.kind) {
    r.error('PS003', file, `ids.lock records "${fm.id}" as a ${locked.kind}; ids never change kind`);
  } else if (!locked) {
    r.add('PS003', 'info', file, `new id "${fm.id}" (the release adds it to ids.lock)`);
  }

  // Vocabulary.
  const facetValues: [string, string[]][] = [
    ['category', [fm.category]],
    ['subcategory', fm.subcategory ? [fm.subcategory] : []],
    ['stage', [...(fm.stage ?? []), ...(fm.steps ?? []).map((s) => s.stage)]],
    ['stack', fm.stack ?? []],
    ['role', fm.role ?? []],
    ['subject', fm.subject ?? []],
    ['requires', (fm.requires ?? []).map((v) => v.split(':')[0] ?? v)],
    ['inputs', fm.inputs ?? []],
    ['output', fm.output ?? []],
    ['advice-risk', fm.advice_risk ?? []],
  ];
  for (const [facet, values] of facetValues) {
    if (facet === 'subcategory' && values.length > 0 && !ctx.vocab.has(facet)) {
      r.error('PS006', file, `subcategory: unknown value "${values[0]}" (vocab/subcategory.yml has none)`);
      continue;
    }
    if (!ctx.vocab.has(facet)) continue; // missing vocab file is reported once by checkLibrary
    for (const value of new Set(values)) {
      const hit = lookup(ctx.vocab, facet, value);
      if (hit.status === 'unknown')
        r.error('PS006', file, `${facet}: unknown value "${value}" (see vocab/${facet}.yml)`);
      else if (hit.status === 'synonym')
        r.error('PS006', file, `${facet}: use "${hit.canonical}" instead of "${value}"`);
      else if (hit.status === 'deprecated')
        r.add(
          'PS006',
          'warning',
          file,
          `${facet}: "${value}" is deprecated${hit.replacement ? `; use "${hit.replacement}"` : ''}`,
        );
    }
  }
  for (const tag of fm.tags ?? []) {
    const hit = lookup(ctx.vocab, 'tags', tag);
    if (hit.status === 'synonym') r.add('PS006', 'warning', file, `tags: use "${hit.canonical}" instead of "${tag}"`);
    if (hit.status === 'deprecated')
      r.add(
        'PS006',
        'warning',
        file,
        `tags: "${tag}" is deprecated${hit.replacement ? `; use "${hit.replacement}"` : ''}`,
      );
  }
  if ((fm.tags?.length ?? 0) > 8) r.error('PS007', file, `${fm.tags?.length} tags; at most 8`);
  checkTaxonomyFacets(r, file, fm, ctx.vocab);
  if (fm.aliases?.includes(fm.id)) r.error('PS008', file, 'aliases must not contain the entry’s own id');

  // Description.
  const desc = fm.description.trim();
  if (desc.length < 40 || desc.length > 200) {
    r.error('PS023', file, `description is ${desc.length} characters; keep it between 40 and 200`);
  }
  if (/[<>]/.test(desc)) r.error('PS023', file, 'description must not contain markup or angle brackets');
  if (/^(you|your|i|i'm|we|my|our)\b/i.test(desc)) {
    r.error('PS023', file, 'write the description in the third person ("Reviews…", not "You…" or "I…")');
  }

  // Templating: placeholders, sections, includes.
  const templated: [string, string][] = [[file, parsed.body]];
  for (const [rel, text] of src.files) {
    if (rel.startsWith('steps/')) templated.push([`${src.dir}/${rel}`, text]);
  }
  const used = new Set<string>();
  for (const step of fm.steps ?? []) {
    for (const t of scanTemplate(step.artifact ?? '')) if (t.type === 'var') used.add(t.name);
  }
  const declared = new Set((fm.args ?? []).map((a) => a.name));
  const includedPartials = new Set<string>();
  for (const [path, text] of templated) {
    const open: string[] = [];
    for (const token of scanTemplate(text)) {
      if (token.type === 'include') {
        const target = resolveInclude(token.path);
        if (target.scope !== 'entry') includedPartials.add(target.file);
        const exists = target.scope === 'entry' ? src.files.has(target.file) : ctx.partials.has(target.file);
        if (!exists) r.error('PS011', path, `${token.raw} does not resolve`);
        continue;
      }
      if (!ARG_NAME.test(token.name)) {
        r.error('PS010', path, `${token.raw} is not a valid placeholder; use {{lower_snake_case}}`);
        continue;
      }
      used.add(token.name);
      if (token.type === 'section-open') open.push(token.name);
      if (token.type === 'section-close') {
        if (open.pop() !== token.name) r.error('PS010', path, `${token.raw} closes a section that is not open`);
      }
    }
    for (const name of open) r.error('PS010', path, `{{#${name}}} is never closed`);
  }
  for (const name of used) {
    if (!declared.has(name)) r.error('PS010', file, `{{${name}}} is not declared in args`);
  }
  for (const name of declared) {
    if (!used.has(name)) r.error('PS010', file, `arg "${name}" is declared but never used`);
  }

  checkAdviceRisk(r, file, fm, ctx.vocab, includedPartials);

  // Body structure by kind.
  const body = parsed.body;
  if (fm.kind !== 'style' && body.trim() === '') r.error('PS020', file, 'body is empty');
  if (fm.kind === 'prompt') {
    const missing = PROMPT_SECTIONS.filter((tag) => !hasTag(body, tag));
    if (missing.length > 0) {
      r.error('PS020', file, `missing body sections: ${missing.map((t) => `<${t}>`).join(', ')}`);
    }
  }
  if (fm.kind === 'persona' && (hasTag(body, 'task') || hasTag(body, 'output_format'))) {
    r.error('PS024', file, 'a persona describes who the agent is; move <task>/<output_format> into a prompt');
  }
  if (fm.kind === 'workflow') {
    const stepIds = new Set<string>();
    const referenced = new Set<string>();
    for (const step of fm.steps ?? []) {
      if (stepIds.has(step.id)) r.error('PS020', file, `duplicate step id "${step.id}"`);
      stepIds.add(step.id);
      referenced.add(step.file);
      if (!src.files.has(step.file)) r.error('PS020', file, `step "${step.id}": ${step.file} does not exist`);
      else if ((src.files.get(step.file) ?? '').trim() === '')
        r.error('PS020', `${src.dir}/${step.file}`, 'step file is empty');
    }
    for (const rel of src.files.keys()) {
      if (rel.startsWith('steps/') && !referenced.has(rel)) {
        r.error('PS020', `${src.dir}/${rel}`, 'step file is not listed in steps');
      }
    }
  }

  // Evals.
  const evalsPath = `${src.dir}/evals.yaml`;
  const evalsText = src.files.get('evals.yaml');
  const needsEvals = STATUSES_REQUIRING_EVALS.includes(fm.status);
  if (evalsText === undefined) {
    if (needsEvals) r.error('PS025', file, `status "${fm.status}" requires an evals.yaml`);
  } else {
    const doc = parseYamlDocument(evalsText);
    const evals = doc.error ? undefined : validateEvals(doc.data);
    if (doc.error) r.error('PS025', evalsPath, doc.error);
    else if (evals && !evals.valid) {
      for (const issue of evals.issues) {
        const field = issue.path === '' ? '' : `${issue.path.slice(1).replaceAll('/', '.')}: `;
        r.error('PS025', evalsPath, `${field}${issue.message}`);
      }
    } else if (evals?.value) {
      if (needsEvals && evals.value.cases.length < 3) {
        r.error(
          'PS025',
          evalsPath,
          `${evals.value.cases.length} cases; status "${fm.status}" needs at least 3 (happy, edge, negative)`,
        );
      }
      const names = new Set<string>();
      for (const c of evals.value.cases) {
        if (names.has(c.name)) r.error('PS025', evalsPath, `duplicate case name "${c.name}"`);
        names.add(c.name);
        for (const key of Object.keys(c.vars)) {
          if (!declared.has(key))
            r.error('PS025', evalsPath, `case "${c.name}": var "${key}" is not an arg of the entry`);
        }
      }
    }
  }

  return { checked, issues: r.issues };
}

/** PS051: the folder path matches the domain, category, subcategory and layout in vocab/. */
function checkPath(r: Reporter, file: string, parts: string[], fm: EntryFrontmatter, vocab: Vocab): void {
  const category = vocab.get('category')?.meta.get(fm.category);
  const domain = category?.domain;
  const nested = category?.layout === 'nested';
  if (fm.subcategory) {
    const parent = vocab.get('subcategory')?.meta.get(fm.subcategory)?.parent;
    if (parent && parent !== fm.category) {
      r.error('PS051', file, `subcategory "${fm.subcategory}" belongs to category "${parent}", not "${fm.category}"`);
    }
  }
  if (nested && !fm.subcategory) {
    r.error('PS051', file, `category "${fm.category}" is split (layout: nested); set a subcategory`);
  }
  if (!domain) return; // unknown category: PS006 reports it
  const expected = ['library', domain, fm.category, ...(nested && fm.subcategory ? [fm.subcategory] : []), fm.id].join(
    '/',
  );
  if (parts.length === 2) {
    if (nested) r.error('PS051', file, `category "${fm.category}" is split; move the entry to ${expected}/`);
    else r.add('PS051', 'warning', file, `legacy path; move the entry to ${expected}/ (TAXONOMY.md §11)`);
    return;
  }
  if (parts.length !== 3 && parts.length !== 4) {
    r.error('PS051', file, 'entry folders live at library/<domain>/<category>/[<subcategory>/]<id>/');
    return;
  }
  if (parts[0] !== domain) {
    r.error('PS051', file, `category "${fm.category}" belongs to domain "${domain}"; move the entry to ${expected}/`);
  }
  if (parts.length === 4 && !nested) {
    r.error('PS051', file, `category "${fm.category}" is not split (layout: flat); move the entry to ${expected}/`);
  } else if (parts.length === 4 && parts[2] !== fm.subcategory) {
    r.error('PS051', file, `subcategory folder "${parts[2]}" does not match subcategory "${fm.subcategory ?? ''}"`);
  } else if (parts.length === 3 && nested) {
    r.error('PS051', file, `category "${fm.category}" is split; move the entry to ${expected}/`);
  }
}

/** PS052, PS053: sensitive categories declare advice_risk; advice_risk brings its guardrail partials. */
function checkAdviceRisk(
  r: Reporter,
  file: string,
  fm: EntryFrontmatter,
  vocab: Vocab,
  includedPartials: Set<string>,
): void {
  const required = vocab.get('category')?.meta.get(fm.category)?.advice_risk ?? [];
  const declared = new Set(fm.advice_risk ?? []);
  const missing = required.filter((v) => !declared.has(v));
  if (missing.length > 0) {
    r.error('PS052', file, `category "${fm.category}" is sensitive; add advice_risk: [${missing.join(', ')}]`);
  }
  if (declared.size === 0) return;
  const needed = new Set<string>();
  for (const value of declared) {
    for (const partial of vocab.get('advice-risk')?.meta.get(value)?.partials ?? []) needed.add(partial);
  }
  for (const partial of needed) {
    if (!includedPartials.has(`${partial}.md`)) {
      r.error('PS053', file, `advice_risk needs {{> ${partial}}} in the body`);
    }
  }
  if (fm.invocation === 'model' || fm.invocation === 'both') {
    r.error('PS053', file, 'entries with advice_risk are never model-invoked; use invocation: user');
  }
}

/** PS054 (per entry), PS056, PS057, PS058, PS059. */
function checkTaxonomyFacets(r: Reporter, file: string, fm: EntryFrontmatter, vocab: Vocab): void {
  if (fm.category === HOLDING_CATEGORY) {
    if (!fm.proposed_category) {
      r.error('PS054', file, 'entries in "unsorted" must set proposed_category (TAXONOMY.md §2.5)');
    } else if (liveValues(vocab, 'category').has(fm.proposed_category)) {
      r.error('PS054', file, `"${fm.proposed_category}" is a live category; move the entry there`);
    }
  } else if (fm.proposed_category) {
    r.error('PS054', file, 'proposed_category is only for entries in the "unsorted" holding area');
  }

  for (const req of fm.requires ?? []) {
    const floor = RISK_FLOOR[req];
    if (!floor) continue;
    if (!fm.risk) {
      if (floor !== 'read-only') r.add('PS056', 'warning', file, `requires "${req}"; declare risk: ${floor} or higher`);
    } else if (RISKS.indexOf(fm.risk) < RISKS.indexOf(floor)) {
      r.error('PS056', file, `requires "${req}" implies risk ${floor} or higher, not ${fm.risk}`);
    }
  }

  for (const tag of fm.tags ?? []) {
    for (const facet of TAG_SHADOWED_FACETS) {
      const hit = lookup(vocab, facet, tag);
      if (hit.status === 'ok' || hit.status === 'synonym') {
        const value = hit.status === 'synonym' ? hit.canonical : tag;
        r.add('PS057', 'warning', file, `tag "${tag}" duplicates ${facet} "${value}"; use the ${facet} facet instead`);
        break;
      }
    }
  }

  for (const facet of ['stack', 'subject'] as const) {
    const values = fm[facet] ?? [];
    for (const value of values) {
      const implied = impliedBy(vocab, facet, value);
      for (const other of values) {
        if (implied.has(other)) {
          r.add('PS058', 'warning', file, `${facet}: "${value}" already implies "${other}"; drop "${other}"`);
        }
      }
    }
  }

  const counted: [keyof typeof FACET_LIMITS, number][] = [
    ['stage', fm.kind === 'workflow' ? 0 : (fm.stage?.length ?? 0)], // workflows span phases
    ['stack', fm.stack?.length ?? 0],
    ['requires', fm.requires?.length ?? 0],
    ['inputs', fm.inputs?.length ?? 0],
    ['output', fm.output?.length ?? 0],
  ];
  for (const [facet, count] of counted) {
    if (count > FACET_LIMITS[facet]) {
      r.add('PS059', 'warning', file, `${facet} has ${count} values; keep it to ${FACET_LIMITS[facet]} or fewer`);
    }
  }
}

/** Checks include cycles and hygiene inside partials/. */
export function checkPartials(partials: Map<string, string>): Issue[] {
  const r = new Reporter();
  const edges = new Map<string, string[]>();
  for (const [path, text] of partials) {
    const file = `partials/${path}`;
    if (HIDDEN_CHARS.test(text)) r.error('PS040', file, 'contains zero-width, bidirectional or control characters');
    if (DOWNLOAD_EXEC.some((re) => re.test(text))) r.error('PS043', file, 'contains a download-and-execute pattern');
    const targets: string[] = [];
    for (const token of scanTemplate(text)) {
      if (token.type !== 'include') {
        r.error('PS010', file, `${token.raw}: partials cannot use placeholders; pass context in the entry`);
        continue;
      }
      const target = resolveInclude(token.path);
      if (target.scope === 'entry') r.error('PS011', file, `${token.raw}: partials can only include other partials`);
      else if (!partials.has(target.file)) r.error('PS011', file, `${token.raw} does not resolve`);
      else targets.push(target.file);
    }
    edges.set(path, targets);
  }
  const state = new Map<string, 'visiting' | 'done'>();
  const visit = (node: string, trail: string[]): void => {
    if (state.get(node) === 'done') return;
    if (state.get(node) === 'visiting') {
      r.error('PS011', `partials/${node}`, `include cycle: ${[...trail, node].join(' -> ')}`);
      return;
    }
    state.set(node, 'visiting');
    for (const next of edges.get(node) ?? []) visit(next, [...trail, node]);
    state.set(node, 'done');
  };
  for (const node of edges.keys()) visit(node, []);
  return r.issues;
}

/** Checks every entry plus the cross-entry rules: unique ids, aliases (PS008) and ids.lock (PS004). */
export function checkLibrary(sources: EntrySource[], ctx: LibraryContext): CheckResult {
  const issues: Issue[] = [];
  const entries: CheckedEntry[] = [];

  for (const facet of VOCAB_FACETS) {
    if (!ctx.vocab.has(facet)) {
      issues.push({
        rule: 'PS006',
        severity: 'error',
        file: `vocab/${facet}.yml`,
        message: 'vocabulary file is missing or invalid',
      });
    }
  }
  for (const p of ctx.idsLock.problems) {
    issues.push({ rule: 'PS003', severity: 'error', file: 'ids.lock', message: `line ${p.line}: ${p.message}` });
  }
  issues.push(...checkPartials(ctx.partials));
  for (const p of checkVocabSet(ctx.vocab, ctx.partials)) issues.push(p);

  for (const src of sources) {
    const result = checkEntry(src, ctx);
    entries.push(result.checked);
    issues.push(...result.issues);
  }

  const owners = new Map<string, string>();
  for (const e of entries) {
    if (!e.frontmatter || !e.file) continue;
    const other = owners.get(e.frontmatter.id);
    if (other) {
      issues.push({
        rule: 'PS001',
        severity: 'error',
        file: e.file,
        message: `id "${e.frontmatter.id}" is also used by ${other}`,
      });
    } else owners.set(e.frontmatter.id, e.file);
  }
  const aliasOwners = new Map<string, string>();
  for (const e of entries) {
    if (!e.frontmatter || !e.file) continue;
    for (const alias of e.frontmatter.aliases ?? []) {
      if (alias === e.frontmatter.id) continue; // reported by checkEntry
      if (owners.has(alias)) {
        issues.push({
          rule: 'PS008',
          severity: 'error',
          file: e.file,
          message: `alias "${alias}" is a live id (${owners.get(alias)})`,
        });
      }
      const other = aliasOwners.get(alias);
      if (other) {
        issues.push({
          rule: 'PS008',
          severity: 'error',
          file: e.file,
          message: `alias "${alias}" is also claimed by ${other}`,
        });
      } else aliasOwners.set(alias, e.file);
    }
  }
  // Holding area (PS054) and folder size (PS055).
  const holding = entries.filter((e) => e.frontmatter?.category === HOLDING_CATEGORY);
  if (holding.length > HOLDING_LIMITS.warn) {
    issues.push({
      rule: 'PS054',
      severity: holding.length > HOLDING_LIMITS.error ? 'error' : 'warning',
      file: 'library/other/unsorted',
      message: `${holding.length} entries in the holding area (warn above ${HOLDING_LIMITS.warn}, error above ${HOLDING_LIMITS.error}); graduate some`,
    });
  }
  const proposals = new Map<string, number>();
  for (const e of holding) {
    const p = e.frontmatter?.proposed_category;
    if (p) proposals.set(p, (proposals.get(p) ?? 0) + 1);
  }
  for (const [proposal, count] of proposals) {
    if (count >= HOLDING_LIMITS.graduate) {
      issues.push({
        rule: 'PS054',
        severity: 'warning',
        file: 'library/other/unsorted',
        message: `${count} entries propose "${proposal}"; open a vocab RFC to add it or re-home them (TAXONOMY.md §2.5)`,
      });
    }
  }
  const perFolder = new Map<string, number>();
  for (const e of entries) {
    const folder = e.dir.split('/').slice(0, -1).join('/');
    perFolder.set(folder, (perFolder.get(folder) ?? 0) + 1);
  }
  for (const [folder, count] of perFolder) {
    if (count > FOLDER_LIMITS.warn) {
      issues.push({
        rule: 'PS055',
        severity: count > FOLDER_LIMITS.error ? 'error' : 'warning',
        file: folder,
        message: `${count} entries in one folder (warn above ${FOLDER_LIMITS.warn}, error above ${FOLDER_LIMITS.error}); split the category (TAXONOMY.md §2.4)`,
      });
    }
  }

  for (const locked of ctx.idsLock.entries.values()) {
    if (!owners.has(locked.id) && !aliasOwners.has(locked.id)) {
      issues.push({
        rule: 'PS004',
        severity: 'error',
        file: 'ids.lock',
        message: `line ${locked.line}: released id "${locked.id}" has no entry; restore it, deprecate it, or add it to a successor's aliases`,
      });
    }
  }

  if (ctx.curated) {
    const live = entries.flatMap((e) => (e.frontmatter && e.file ? [e.frontmatter] : []));
    issues.push(...checkCurated(ctx.curated, live));
  }

  return { entries, issues };
}
