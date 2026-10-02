import {
  COMPUTED_FIELDS,
  FORBIDDEN_FIELDS,
  KINDS,
  STATUSES_REQUIRING_EVALS,
  validateEntry,
  validateEvals,
  type EntryFrontmatter,
  type Kind,
} from '@hermes-hq/hodios-schema';
import type { IdsLock } from './ids-lock.js';
import { parseFrontmatter, parseYamlDocument } from './parse.js';
import type { Issue, RuleId, Severity } from './rules.js';
import { ARG_NAME, findPositionalPlaceholders, resolveInclude, scanTemplate } from './template.js';
import { lookup, type Vocab } from './vocab.js';

/** One entry folder, as read by the caller (the core has no file system access). */
export interface EntrySource {
  /** Repo-relative POSIX path of the folder, e.g. `library/code-review/review-pull-request`. */
  dir: string;
  /** Every file in the folder: relative POSIX path -> UTF-8 text. */
  files: Map<string, string>;
}

export interface LibraryContext {
  vocab: Vocab;
  /** Partials by path under partials/, e.g. `guardrails/scope-discipline.md`. */
  partials: Map<string, string>;
  idsLock: IdsLock;
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

/** Facets checked against vocab/, and the frontmatter field each comes from. */
export const VOCAB_FACETS = ['category', 'stage', 'stack', 'requires', 'inputs', 'output', 'tags'] as const;

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
  const folderCategory = segments.at(-2) ?? '';

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
    ['stage', [...(fm.stage ?? []), ...(fm.steps ?? []).map((s) => s.stage)]],
    ['stack', fm.stack ?? []],
    ['requires', (fm.requires ?? []).map((v) => v.split(':')[0] ?? v)],
    ['inputs', fm.inputs ?? []],
    ['output', fm.output ?? []],
  ];
  for (const [facet, values] of facetValues) {
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
  for (const [path, text] of templated) {
    const open: string[] = [];
    for (const token of scanTemplate(text)) {
      if (token.type === 'include') {
        const target = resolveInclude(token.path);
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

  return { entries, issues };
}
