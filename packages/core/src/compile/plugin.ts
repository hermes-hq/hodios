import { claudeAgentAdapter, claudeOutputStyleAdapter } from './adapters/claude.js';
import { claudeSkill } from './adapters/skill.js';
import { CONTENT_LICENSE, SITE, exportName } from './text.js';
import type { AdapterContext, ResolvedEntry } from './types.js';

export const MARKETPLACE_NAME = 'hodios';
const REPO = 'https://github.com/hermes-hq/hodios';

/** One plugin: a pack or a category (design §6.4: pack = plugin, never one plugin per prompt). */
export interface PluginGroup {
  /** Plugin name without the prefix, e.g. `code-review` -> `hodios-code-review`. */
  name: string;
  description: string;
  category?: string;
  entries: readonly ResolvedEntry[];
}

export const pluginName = (group: string): string => `hodios-${group}`;

/** Files of one Claude Code plugin, relative to the marketplace root. */
export function claudePluginFiles(
  group: PluginGroup,
  ctx: AdapterContext,
): { files: Map<string, string>; warnings: string[] } {
  const name = pluginName(group.name);
  const root = `plugins/${name}`;
  const files = new Map<string, string>();
  const warnings: string[] = [];
  const keywords = [...new Set(group.entries.flatMap((e) => [e.fm.category, ...(e.fm.tags ?? [])]))].sort();
  const manifest = {
    name,
    version: ctx.catalog ?? '0.0.0',
    description: group.description,
    author: { name: 'Hodios contributors', url: REPO },
    homepage: SITE,
    repository: REPO,
    license: CONTENT_LICENSE,
    keywords,
  };
  files.set(`${root}/.claude-plugin/plugin.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  for (const entry of [...group.entries].sort((a, b) => a.fm.id.localeCompare(b.fm.id))) {
    const id = exportName(entry.fm.id);
    switch (entry.fm.kind) {
      case 'prompt':
      case 'workflow':
        files.set(`${root}/skills/${id}/SKILL.md`, claudeSkill(entry, ctx));
        break;
      case 'persona':
        for (const f of claudeAgentAdapter.compile(entry, ctx).files) files.set(`${root}/agents/${f.name}`, f.content);
        break;
      case 'style':
        for (const f of claudeOutputStyleAdapter.compile(entry, ctx).files)
          files.set(`${root}/output-styles/${f.name}`, f.content);
        break;
      case 'rule':
        warnings.push(
          `${entry.fm.id}: rules are not shipped in plugins; install them with \`hodios install ${entry.fm.id}\``,
        );
        break;
    }
  }
  return { files, warnings };
}

/** `.claude-plugin/marketplace.json`. Versions live only in each plugin.json (design §6.4). */
export function claudeMarketplace(groups: readonly PluginGroup[]): string {
  const marketplace = {
    name: MARKETPLACE_NAME,
    owner: { name: 'Hermes IDE', url: 'https://hermes-ide.com' },
    metadata: {
      description:
        'Hodios — prompts by Hermes IDE. Open prompts, personas and workflows, grouped by pack and category.',
    },
    plugins: [...groups]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((g) => ({
        name: pluginName(g.name),
        source: `./plugins/${pluginName(g.name)}`,
        description: g.description,
        category: g.category,
        license: CONTENT_LICENSE,
      })),
  };
  return `${JSON.stringify(marketplace, null, 2)}\n`;
}
