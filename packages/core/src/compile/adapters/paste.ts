import { fillLowering } from '../render.js';
import { blocks, entryText, exportName, styleLevel } from '../text.js';
import type { Adapter, AdapterContext, ResolvedEntry } from '../types.js';
import { ALL_KINDS } from './skill.js';

/** The custom GPT instructions cap; the build fails a curated entry above it (design §6.4). */
export const PASTE_MAX = 8_000;

/**
 * Plain text to paste into ChatGPT, claude.ai or any chat: partials expanded, workflow steps inlined, arguments
 * filled from `values` (missing ones stay as `[NAME]`, optional sections without a value are dropped).
 */
export function pasteText(
  entry: ResolvedEntry,
  values: Readonly<Record<string, string>> = {},
  ctx: AdapterContext = {},
): string {
  const { fm } = entry;
  const lowering = fillLowering(values);
  switch (fm.kind) {
    case 'persona':
      return blocks(`From now on, work as this persona: ${fm.title}.`, entry.body);
    case 'rule':
      return blocks('Follow these rules for the rest of this conversation.', entryText(entry, lowering));
    case 'style': {
      const level = values['level'] !== undefined ? Number(values['level']) : ctx.level;
      const { n, label, instruction } = styleLevel(fm, level);
      return blocks(
        entry.body,
        `For the rest of this conversation, use this output style: ${fm.title}, level ${n} of 5 (${label}). ${instruction}`,
      );
    }
    default:
      return entryText(entry, lowering);
  }
}

export const pasteAdapter: Adapter = {
  id: 'paste',
  label: 'Paste-in text (ChatGPT, claude.ai, any chat)',
  kinds: ALL_KINDS,
  compile(entry, ctx) {
    const content = pasteText(entry, {}, ctx);
    const warnings =
      content.length > PASTE_MAX
        ? [`${entry.fm.id}: paste form is ${content.length} characters; the limit is ${PASTE_MAX}`]
        : [];
    return { files: [{ slot: 'prompts', name: `${exportName(entry.fm.id)}.md`, content, mode: 'file' }], warnings };
  },
};
