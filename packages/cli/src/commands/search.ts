import { parseArgs } from 'node:util';
import { parseQuery, search, type Profile } from '@hermes-hq/hodios-core/catalog';
import { openCatalog } from '../catalog.js';
import type { Io } from '../cli.js';
import { looksLikeProject, projectProfile } from '../project.js';

/** Facet flags that become query filters (`--stack react` = `stack:react`). */
const FLAG_KEYS = [
  'kind',
  'cat',
  'domain',
  'stage',
  'role',
  'stack',
  'subject',
  'works',
  'tag',
  'risk',
  'tier',
  'level',
  'lang',
] as const;

export async function runSearch(args: string[], io: Io): Promise<number> {
  const { values, positionals } = parseArgs({
    args,
    options: {
      ...Object.fromEntries(FLAG_KEYS.map((k) => [k, { type: 'string' as const, multiple: true as const }])),
      here: { type: 'boolean', default: false },
      all: { type: 'boolean', default: false },
      limit: { type: 'string', default: '20' },
      page: { type: 'string', default: '1' },
      json: { type: 'boolean', default: false },
      catalog: { type: 'string' },
    },
    allowPositionals: true,
  });
  const query = parseQuery(positionals.join(' '));
  for (const key of FLAG_KEYS) {
    const v = (values as Record<string, unknown>)[key] as string[] | undefined;
    if (v?.length) query.filters[key] = [...(query.filters[key] ?? []), ...v.flatMap((x) => x.split(','))];
  }
  const limit = Math.max(1, Math.min(100, Number(values.limit) || 20));
  const page = Math.max(1, Number(values.page) || 1);

  const catalog = await openCatalog(io, values.catalog);
  const [rows, vocab] = await Promise.all([catalog.rows(), catalog.vocab()]);
  const empty = query.terms.length === 0 && Object.keys(query.filters).length === 0;
  // "The ones for you, not all of them": inside a project, an empty search ranks what fits this project first.
  const personal = !values.all && (values.here || (empty && looksLikeProject(io.cwd)));
  const profile: Profile | undefined = personal ? projectProfile(io.cwd, vocab, io.env) : undefined;
  const result = search(rows, query, { vocab, profile, limit, offset: (page - 1) * limit });

  if (values.json) {
    io.out(
      JSON.stringify(
        {
          catalog: catalog.manifest.catalog,
          total: result.total,
          page,
          profile,
          hits: result.hits.map((h) => ({ ...h.row, score: h.score, why: h.reasons })),
        },
        null,
        2,
      ),
    );
    return 0;
  }
  if (profile) {
    const parts = [
      profile.stack?.length ? `stack ${profile.stack.join(', ')}` : '',
      profile.works?.length ? `agents ${profile.works.join(', ')}` : '',
    ].filter(Boolean);
    io.out(`For this project${parts.length ? ` (${parts.join('; ')})` : ''}. Use --all to rank without it.\n`);
  }
  if (result.hits.length === 0) {
    io.out('No entries match. Try fewer filters, or `hodios search` with no query to browse.');
    return 0;
  }
  const width = Math.max(...result.hits.map((h) => h.row.id.length));
  for (const { row, reasons } of result.hits) {
    io.out(`${row.id.padEnd(width)}  ${row.kind.padEnd(8)} ${row.title}`);
    io.out(`${' '.repeat(width)}  ${row.desc}`);
    if (reasons.length) io.out(`${' '.repeat(width)}  why: ${reasons.join(' · ')}`);
  }
  const shown = (page - 1) * limit + result.hits.length;
  const more = result.total > shown ? ` Next: --page ${page + 1}.` : '';
  io.out(
    `\n${shown} of ${result.total}${result.capped ? '+' : ''} (catalog ${catalog.manifest.catalog}).${more} Install: hodios install <id> --target <tool>`,
  );
  return 0;
}
