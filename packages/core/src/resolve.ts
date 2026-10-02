import { validateEntry } from '@hermes-hq/hodios-schema';
import type { EntrySource } from './check.js';
import type { ResolvedEntry } from './compile/types.js';
import { parseFrontmatter } from './parse.js';
import { resolveInclude } from './template.js';

const INCLUDE = /\{\{\s*>\s*([^{}]*?)\s*\}\}/g;
const MAX_DEPTH = 8;

/**
 * Expands `{{> partial}}` and `{{> ./file.md}}` includes. Entry includes resolve in `files`, partial includes in
 * `partials` (which may include other partials). Trailing whitespace of an included file is dropped so an include
 * on its own line stays one block.
 */
export function expandIncludes(
  text: string,
  files: ReadonlyMap<string, string>,
  partials: ReadonlyMap<string, string>,
  depth = 0,
): string {
  if (depth > MAX_DEPTH) throw new Error('includes nested too deeply (cycle?)');
  return text.replace(INCLUDE, (raw, path: string) => {
    const target = resolveInclude(path);
    const included = target.scope === 'entry' ? files.get(target.file) : partials.get(target.file);
    if (included === undefined) throw new Error(`${raw} does not resolve`);
    // Entry files may include partials; partials only include partials.
    return expandIncludes(included.replace(/\s+$/, ''), files, partials, depth + 1);
  });
}

/** Builds the self-contained form of one entry folder. Throws on a missing entry file, bad frontmatter or include. */
export function resolveEntry(src: EntrySource, partials: ReadonlyMap<string, string>): ResolvedEntry {
  const kindFile = [...src.files.keys()].find((f) => /^(prompt|persona|workflow|rule|style)\.md$/.test(f));
  if (!kindFile) throw new Error(`${src.dir}: no entry file`);
  const parsed = parseFrontmatter(src.files.get(kindFile) ?? '');
  if (parsed.error) throw new Error(`${src.dir}/${kindFile}: ${parsed.error}`);
  const result = validateEntry(parsed.data);
  if (!result.valid || !result.value) {
    const first = result.issues[0];
    throw new Error(`${src.dir}/${kindFile}: invalid frontmatter (${first?.path ?? ''} ${first?.message ?? ''})`);
  }
  const fm = result.value;
  const expand = (text: string) => expandIncludes(text, src.files, partials);
  const steps = (fm.steps ?? []).map((step) => {
    const text = src.files.get(step.file);
    if (text === undefined) throw new Error(`${src.dir}: step file ${step.file} is missing`);
    return { ...step, text: expand(text).trim() };
  });
  return { schema: 1, fm, body: expand(parsed.body).trim(), steps };
}
