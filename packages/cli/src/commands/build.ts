import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import {
  CURATED_MAX,
  INSTALL_TARGETS,
  PASTE_MAX,
  claudeMarketplace,
  claudePluginFiles,
  codexSkillYaml,
  compileFor,
  exportName,
  hermesBundle,
  pasteText,
  specSkill,
  targetById,
  upsertSection,
  type PluginGroup,
} from '@hermes-hq/hodios-core';
import type { Io } from '../cli.js';
import { loadLibrary, sha256, todayCalver, writeCatalog } from '../library.js';
import { findRoot } from '../root.js';

/** Marks a folder `hodios build` owns, so a rebuild may clear it. Any other non-empty folder is left alone. */
const MARKER = '.hodios-build';
/**
 * hodios-dist scale caps (design §3.3, §6.4): installers clone or tree-list the whole repo, so it holds the curated
 * tier only (curated.txt). Every entry, in every tier, goes to the catalog.
 */
const SKILL_MAX = CURATED_MAX;
const PLUGIN_MAX = 100;

function prepareOut(out: string): void {
  if (existsSync(out) && readdirSync(out).length > 0) {
    if (!existsSync(join(out, MARKER))) {
      throw new Error(`${out} is not empty and was not written by hodios build; choose another --out`);
    }
    rmSync(out, { recursive: true, force: true });
  }
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, MARKER), 'Written by `hodios build`. The whole folder is replaced on the next build.\n');
}

export function runBuild(args: string[], io: Io): number {
  const { values } = parseArgs({
    args,
    options: {
      root: { type: 'string' },
      out: { type: 'string' },
      target: { type: 'string', multiple: true },
      catalog: { type: 'string' },
      seq: { type: 'string' },
    },
    allowPositionals: false,
  });
  const root = values.root ? resolve(io.cwd, values.root) : findRoot(io.cwd);
  if (!root) {
    io.err('hodios build: no library/ found (run inside a Hodios checkout or pass --root)');
    return 2;
  }
  const catalog = values.catalog ?? todayCalver();
  if (!/^20\d{2}\.([1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\.(0|[1-9]\d*)$/.test(catalog)) {
    io.err(`hodios build: --catalog must be YYYY.MDD.PATCH, got "${catalog}"`);
    return 2;
  }
  // Manifest seq: one step per catalog release, so clients can tell a newer manifest and fetch deltas (design §7).
  if (values.seq !== undefined && !/^(0|[1-9]\d*)$/.test(values.seq)) {
    io.err(`hodios build: --seq must be a non-negative integer, got "${values.seq}"`);
    return 2;
  }
  const seq = values.seq === undefined ? 0 : Number(values.seq);
  const targets = (values.target ?? []).map((t) => {
    const target = targetById(t);
    if (!target) throw new Error(`unknown target "${t}"`);
    return target;
  });

  const lib = loadLibrary(root);
  const errors = lib.issues.filter((i) => i.severity === 'error');
  if (errors.length > 0) {
    for (const i of errors) io.err(`error   ${i.rule} ${i.file}: ${i.message}`);
    io.err(`hodios build: ${errors.length} validation errors; run hodios validate`);
    return 1;
  }

  const out = resolve(io.cwd, values.out ?? join(root, 'dist'));
  prepareOut(out);
  const files = new Map<string, string>();
  const warnings: string[] = [];
  const notes = new Set<string>(); // expected, not a problem: printed once on stdout
  const groups = new Map<string, string>(); // path -> summary group
  const add = (group: string, path: string, content: string) => {
    files.set(path, content);
    groups.set(path, group);
  };
  const ctx = { catalog };
  const all = targets.length === 0;
  // The install tree (skills, plugins, native, paste, bundles) takes the curated tier only; the catalog takes all.
  const curated = lib.entries.filter((e) => lib.curated.has(e.fm.id));
  if (curated.length > SKILL_MAX) {
    io.err(`hodios build: ${curated.length} curated entries; hodios-dist holds at most ${SKILL_MAX}`);
    return 1;
  }
  const wants = (id: string) => all || targets.some((t) => t.id === id);

  // Agent Skills, flat (hodios-dist/skills/<id>/): spec-clean SKILL.md plus Codex's agents/openai.yaml.
  if (all) {
    for (const entry of curated) {
      const id = exportName(entry.fm.id);
      add('skills', `skills/${id}/SKILL.md`, specSkill(entry, ctx));
      add('skills', `skills/${id}/agents/openai.yaml`, codexSkillYaml(entry));
    }
  }

  // Claude Code plugins (one per domain and one per pack) and the marketplace. Domains, not categories:
  // the marketplace stays under PLUGIN_MAX plugins at any catalog size (design §6.4, §12.4).
  if (all || wants('claude-code')) {
    const groups: PluginGroup[] = [];
    const domainOf = (category: string) => lib.vocab.get('category')?.meta.get(category)?.domain ?? 'other';
    const domains = [...new Set(curated.map((e) => domainOf(e.fm.category)))].sort();
    for (const domain of domains) {
      const label = lib.vocab.get('domain')?.meta.get(domain)?.label ?? domain;
      groups.push({
        name: domain,
        category: domain,
        description: `${label} prompts, personas and workflows from Hodios.`,
        entries: curated.filter((e) => domainOf(e.fm.category) === domain),
      });
    }
    for (const pack of lib.packs) {
      if (domains.includes(pack.id)) continue; // a domain plugin already has this name
      groups.push({
        name: pack.id,
        description: pack.description || pack.title,
        entries: curated.filter((e) => pack.ids.includes(e.fm.id)),
      });
    }
    const shipped: PluginGroup[] = [];
    for (const group of groups) {
      const plugin = claudePluginFiles(group, ctx);
      // Plugins cannot carry CLAUDE.md rules by design; that is a note, not a warning.
      for (const w of plugin.warnings) notes.add(w.split(':')[0] as string);
      if (plugin.files.size <= 1) continue; // only plugin.json: every entry was a rule, so no empty plugin
      for (const [path, content] of plugin.files) add('plugins', path, content);
      shipped.push(group);
    }
    if (shipped.length > PLUGIN_MAX) {
      io.err(`hodios build: ${shipped.length} plugins; the marketplace limit is ${PLUGIN_MAX}`);
      return 1;
    }
    add('plugins', '.claude-plugin/marketplace.json', claudeMarketplace(shipped));
  }

  // Drop-in project trees per tool (hodios-dist/native/<target>/), default formats, project scope.
  for (const target of INSTALL_TARGETS) {
    if (!wants(target.id)) continue;
    for (const entry of curated) {
      if (!target.defaults[entry.fm.kind]) continue;
      const result = compileFor(entry, target.id, ctx);
      warnings.push(...result.warnings);
      for (const file of result.files) {
        if (!file.path) continue;
        const path = `native/${target.id}/${file.path}`;
        const content =
          file.mode === 'section' ? upsertSection(files.get(path) ?? '', entry.fm.id, file.content) : file.content;
        add('native', path, content);
      }
    }
  }

  // Paste-in text (ChatGPT, claude.ai). Above the custom GPT cap is a build error for every entry, since
  // `hodios use` and the site paste any of them; only curated entries get a file in the install tree.
  let pasteErrors = 0;
  if (wants('paste')) {
    for (const entry of lib.entries) {
      const text = pasteText(entry, {}, ctx);
      if (text.length > PASTE_MAX) {
        io.err(`error   ${entry.fm.id}: paste form is ${text.length} characters; the limit is ${PASTE_MAX}`);
        pasteErrors++;
      }
      if (lib.curated.has(entry.fm.id)) add('paste', `paste/${exportName(entry.fm.id)}.md`, text);
    }
  }

  // Hermes bundles: the curated tier, plus one per pack (every member, so a pack bundle is complete).
  if (wants('hermes')) {
    const hash = (e: (typeof lib.entries)[number]) => `sha256:${sha256(`${JSON.stringify(e)}\n`)}`;
    add('bundles', 'bundles/all.hermes-prompts', hermesBundle(curated, { catalog, hash }));
    for (const pack of lib.packs) {
      const entries = lib.entries.filter((e) => pack.ids.includes(e.fm.id));
      add('bundles', `bundles/${pack.id}.hermes-prompts`, hermesBundle(entries, { catalog, hash }));
    }
  }

  for (const [path, content] of files) {
    const full = join(out, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
  if (all) {
    const cat = writeCatalog(lib, join(out, 'catalog', 'v1'), catalog, seq);
    for (const ref of cat.objects.keys()) groups.set(ref, 'catalog');
    groups.set('catalog/v1/manifest.json', 'catalog');
  }

  for (const w of warnings) io.err(`warning ${w}`);
  const rel = relative(io.cwd, out);
  const shown = rel === '' ? '.' : rel.startsWith('..') ? out : rel;
  const counts: Record<string, number> = {};
  for (const group of groups.values()) counts[group] = (counts[group] ?? 0) + 1;
  const summary = Object.entries(counts)
    .map(([k, n]) => `${n} ${k}`)
    .join(', ');
  io.out(
    `Built ${lib.entries.length} entries, ${curated.length} curated (catalog ${catalog}) into ${shown}: ${summary}.`,
  );
  if (notes.size > 0)
    io.out(`${notes.size} rules are not in Claude Code plugins (plugins cannot carry rules); use hodios install <id>.`);
  return pasteErrors > 0 ? 1 : 0;
}
