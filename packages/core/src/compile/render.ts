import type { EntryArg } from '@hermes-hq/hodios-schema';

/**
 * How a target spells arguments. Source only ever has named `{{x}}` and `{{#x}}…{{/x}}` (design §6.3);
 * each target lowers them to its own syntax.
 */
export interface Lowering {
  /** Replacement for `{{name}}`. */
  ref(arg: EntryArg): string;
  /**
   * Replacement for an optional section. Return `undefined` to drop it, the inner text to keep it, or
   * conditional prose for targets without templating. Default: conditional prose around `ref`.
   */
  section?(arg: EntryArg, inner: string): string | undefined;
}

/** `[DIFF]`-style placeholder used by targets without native named arguments and by the paste form. */
export const placeholder = (name: string): string => `[${name.toUpperCase()}]`;

export const conditional = (ref: string, inner: string): string => `Only if ${ref} was provided: ${inner}`;

const SECTION = /\{\{\s*#\s*([a-z][a-z0-9_]*)\s*\}\}([\s\S]*?)\{\{\s*\/\s*\1\s*\}\}/;
const VAR = /\{\{\s*([a-z][a-z0-9_]*)\s*\}\}/g;

/**
 * Renders a logic-less template. Sections follow Mustache's standalone-tag rule: a closing tag alone at the end
 * of a line takes its newline with it, so dropping or keeping a block never leaves a stray blank line.
 */
export function renderTemplate(text: string, args: readonly EntryArg[], lowering: Lowering): string {
  const byName = new Map(args.map((a) => [a.name, a]));
  const argOf = (name: string): EntryArg => byName.get(name) ?? { name, description: '', type: 'text' }; // validated sources never hit the fallback
  let out = text;
  for (let guard = 0; guard < 1000; guard++) {
    const m = SECTION.exec(out);
    if (!m) break;
    const [raw, name = '', inner = ''] = m;
    const start = m.index;
    let end = start + raw.length;
    const standaloneClose = inner.endsWith('\n') || inner === '';
    if (standaloneClose && out[end] === '\n') end += 1;
    const arg = argOf(name);
    const replaced = lowering.section ? lowering.section(arg, inner) : conditional(lowering.ref(arg), inner);
    let replacement = replaced ?? '';
    if (replaced !== undefined && standaloneClose && out[start + raw.length] === '\n' && !replacement.endsWith('\n')) {
      replacement += '\n';
    }
    out = out.slice(0, start) + replacement + out.slice(end);
  }
  return out.replace(VAR, (_raw, name: string) => lowering.ref(argOf(name)));
}

/** Lowering that fills values (paste, `hodios use`). Missing values become `[NAME]`; defaults apply. */
export function fillLowering(values: Readonly<Record<string, string>>): Lowering {
  const valueOf = (arg: EntryArg): string | undefined => {
    const v = values[arg.name];
    if (v !== undefined && v !== '') return v;
    if (arg.default !== undefined) return String(arg.default);
    return undefined;
  };
  return {
    ref: (arg) => valueOf(arg) ?? placeholder(arg.name),
    section: (arg, inner) => (valueOf(arg) === undefined ? undefined : inner),
  };
}

/** Lowering to `[NAME]` placeholders plus conditional prose; pairs with an `## Inputs` block. */
export const placeholderLowering: Lowering = { ref: (arg) => placeholder(arg.name) };
