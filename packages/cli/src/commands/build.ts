import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import {
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
  const wants = (id: string) => all || targets.some((t) => t.id === id);

  // Agent Skills, flat (hodios-dist/skills/<id>/): spec-clean SKILL.md plus Codex's agents/openai.yaml.
  if (all) {
    for (const entry of lib.entries) {
      const id = exportName(entry.fm.id);
      add('skills', `skills/${id}/SKILL.md`, specSkill(entry, ctx));
      add('skills', `skills/${id}/agents/openai.yaml`, codexSkillYaml(entry));
    }
  }

  // Claude Code plugins (one per category and one per pack) and the marketplace.
  if (all || wants('claude-code')) {
    const groups: PluginGroup[] = [];
    const categories = [...new Set(lib.entries.map((e) => e.fm.category))].sort();
    for (const category of categories) {
      groups.push({
        name: category,
        category,
        description: `Hodios ${category} entries: prompts, personas and workflows.`,
        entries: lib.entries.filter((e) => e.fm.category === category),
      });
    }
    for (const pack of lib.packs) {
      if (categories.includes(pack.id)) continue; // a category plugin already has this name
      groups.push({
        name: pack.id,
        description: pack.description || pack.title,
        entries: lib.entries.filter((e) => pack.ids.includes(e.fm.id)),
      });
    }
    for (const group of groups) {
      const plugin = claudePluginFiles(group, ctx);
      for (const [path, content] of plugin.files) add('plugins', path, content);
      // Plugins cannot carry CLAUDE.md rules by design; that is a note, not a warning.
      for (const w of plugin.warnings) notes.add(w.split(':')[0] as string);
    }
    add('plugins', '.claude-plugin/marketplace.json', claudeMarketplace(groups));
  }

  // Drop-in project trees per tool (hodios-dist/native/<target>/), default formats, project scope.
  for (const target of INSTALL_TARGETS) {
    if (!wants(target.id)) continue;
    for (const entry of lib.entries) {
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

  // Paste-in text (ChatGPT, claude.ai). Above the custom GPT cap is a build error.
  let pasteErrors = 0;
  if (wants('paste')) {
    for (const entry of lib.entries) {
      const text = pasteText(entry, {}, ctx);
      if (text.length > PASTE_MAX) {
        io.err(`error   ${entry.fm.id}: paste form is ${text.length} characters; the limit is ${PASTE_MAX}`);
        pasteErrors++;
      }
      add('paste', `paste/${exportName(entry.fm.id)}.md`, text);
    }
  }

  // Hermes bundles: everything, plus one per pack.
  if (wants('hermes')) {
    const hash = (e: (typeof lib.entries)[number]) => `sha256:${sha256(`${JSON.stringify(e)}\n`)}`;
    add('bundles', 'bundles/all.hermes-prompts', hermesBundle(lib.entries, { catalog, hash }));
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
    const cat = writeCatalog(lib, join(out, 'catalog', 'v1'), catalog);
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
  io.out(`Built ${lib.entries.length} entries (catalog ${catalog}) into ${shown}: ${summary}.`);
  if (notes.size > 0)
    io.out(`${notes.size} rules are not in Claude Code plugins (plugins cannot carry rules); use hodios install <id>.`);
  return pasteErrors > 0 ? 1 : 0;
}
