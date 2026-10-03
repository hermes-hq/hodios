import { describe, expect, it } from 'vitest';
import { CURATED_MAX, checkCurated, parseCuratedList, type CuratedList } from '@hermes-hq/hodios-core';
import type { EntryFrontmatter } from '@hermes-hq/hodios-schema';

const fm = (id: string, extra: Partial<EntryFrontmatter> = {}): EntryFrontmatter => ({
  schema: 1,
  id,
  kind: 'prompt',
  title: id,
  description: `Does ${id} for tests.`,
  category: 'testing',
  version: '1.0.0',
  status: 'incubating',
  ...extra,
});

const messages = (list: CuratedList, entries: EntryFrontmatter[]) =>
  checkCurated(list, entries).map((i) => `${i.rule} ${i.message}`);

describe('parseCuratedList', () => {
  it('reads ids, opt-outs and comments', () => {
    const list = parseCuratedList('# header\nalpha\n!beta\n\ngamma\n');
    expect([...list.ids]).toEqual(['alpha', 'gamma']);
    expect([...list.excluded]).toEqual(['beta']);
    expect(list.problems).toEqual([]);
  });

  it('reports bad ids, duplicates and order', () => {
    const list = parseCuratedList('beta\nalpha\nalpha\nNot An Id\n');
    expect(list.problems.map((p) => p.message)).toEqual([
      'not sorted: "alpha" comes after "beta"',
      '"alpha" is listed twice',
      'invalid unscoped id "Not An Id"',
    ]);
  });
});

describe('checkCurated (PS060)', () => {
  it('accepts live entries', () => {
    expect(messages(parseCuratedList('alpha\n!beta\n'), [fm('alpha'), fm('beta')])).toEqual([]);
  });

  it('refuses unknown, renamed, deprecated and holding-area ids', () => {
    const entries = [
      fm('alpha', { aliases: ['old-alpha'] }),
      fm('gone', { status: 'deprecated' }),
      fm('loose', { category: 'unsorted' }),
    ];
    expect(messages(parseCuratedList('gone\nloose\nmissing\nold-alpha\n'), entries)).toEqual([
      'PS060 "gone" is deprecated and cannot be curated',
      'PS060 "loose" is in the holding area (other/unsorted) and cannot be curated',
      'PS060 "missing" is not an entry',
      'PS060 "old-alpha" is now an alias of "alpha"; list "alpha"',
    ]);
  });

  it(`caps the tier at ${CURATED_MAX}`, () => {
    const ids = Array.from({ length: CURATED_MAX + 1 }, (_, i) => `e${String(i).padStart(5, '0')}`);
    const issues = messages(
      parseCuratedList(ids.join('\n')),
      ids.map((id) => fm(id)),
    );
    expect(issues).toEqual([`PS060 ${CURATED_MAX + 1} curated entries; hodios-dist holds at most ${CURATED_MAX}`]);
  });
});
