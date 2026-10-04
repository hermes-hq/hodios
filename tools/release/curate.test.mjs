import { describe, expect, it } from 'vitest';
import { parseCuratedList } from '@hermes-hq/hodios-core';
import { renderList, selectCurated } from './curate.mjs';

const entry = (id, extra = {}) => ({
  id,
  kind: 'prompt',
  domain: 'software-engineering',
  category: 'testing',
  status: 'incubating',
  advice: false,
  aliases: [],
  evalCases: 3,
  examples: false,
  ...extra,
});

describe('selectCurated', () => {
  it('keeps every listed entry, then adds every non-prompt kind', () => {
    const entries = [
      entry('kept-prompt'),
      entry('new-persona', { kind: 'persona' }),
      entry('new-rule', { kind: 'rule' }),
      entry('new-prompt'),
    ];
    const result = selectCurated(entries, { listed: ['kept-prompt'], target: 3 });
    expect(result.ids).toEqual(['kept-prompt', 'new-persona', 'new-rule']);
    expect(result.added).toEqual(['new-persona', 'new-rule']);
  });

  it('never drops a listed entry to make room, even above the target', () => {
    const entries = [entry('a'), entry('b'), entry('c')];
    expect(selectCurated(entries, { listed: ['a', 'b', 'c'], target: 2 }).ids).toEqual(['a', 'b', 'c']);
  });

  it('gives free slots to new non-prompt kinds before prompts, and stops at the target', () => {
    const entries = [
      entry('kept'),
      entry('a-prompt', { status: 'stable', evalCases: 9 }),
      entry('new-workflow', { kind: 'workflow' }),
      entry('new-style', { kind: 'style' }),
      entry('new-persona', { kind: 'persona' }),
    ];
    const result = selectCurated(entries, { listed: ['kept'], target: 3 });
    expect(result.ids).toEqual(['kept', 'new-persona', 'new-style']);
    expect(result.waiting).toEqual(['a-prompt', 'new-workflow']);
  });

  it('adds nothing once listed entries reach the target, and keeps them all', () => {
    const entries = [entry('a'), entry('b'), entry('c'), entry('new-persona', { kind: 'persona' }), entry('d')];
    const result = selectCurated(entries, { listed: ['a', 'b', 'c'], target: 2 });
    expect(result.ids).toEqual(['a', 'b', 'c']);
    expect(result.added).toEqual([]);
    expect(result.waiting).toEqual(['d', 'new-persona']);
  });

  it('never goes over the cap, whatever the target', () => {
    const entries = Array.from({ length: 6 }, (_, i) => entry(`r${i}`, { kind: 'rule' }));
    const result = selectCurated(entries, { listed: ['r0'], target: 10, max: 4 });
    expect(result.ids).toHaveLength(4);
    expect(result.waiting).toHaveLength(2);
  });

  it('refuses a hand-edited list that is already over the cap', () => {
    const entries = [entry('a'), entry('b'), entry('c')];
    expect(() => selectCurated(entries, { listed: ['a', 'b', 'c'], max: 2 })).toThrow(/cap is 2/);
  });

  it('drops deprecated, holding-area and opted-out ids, and follows renames', () => {
    const entries = [
      entry('gone', { status: 'deprecated' }),
      entry('loose', { category: 'unsorted' }),
      entry('nope'),
      entry('successor', { aliases: ['old-name'] }),
    ];
    const result = selectCurated(entries, {
      listed: ['gone', 'loose', 'nope', 'old-name'],
      excluded: ['nope'],
      target: 10,
    });
    expect(result.ids).toEqual(['successor']);
    expect(result.dropped).toEqual(['gone', 'loose', 'nope']);
  });

  it('never adds advice-risk entries on its own', () => {
    const entries = [entry('budget-plan', { advice: true }), entry('meal-plan')];
    expect(selectCurated(entries, { listed: [], target: 10 }).ids).toEqual(['meal-plan']);
    expect(selectCurated(entries, { listed: ['budget-plan'], target: 10 }).ids).toEqual(['budget-plan', 'meal-plan']);
  });

  it('fills the domain furthest below its quota, then the thinnest category, then by quality', () => {
    const entries = [
      // software-engineering: 4 of 6 entries, quota 2 of 3; already has one curated.
      entry('se-kept'),
      entry('se-a', { category: 'testing' }),
      entry('se-b', { category: 'security', status: 'experimental' }),
      entry('se-c', { category: 'security' }),
      // travel: 2 of 6 entries, quota 1 of 3.
      entry('tr-a', { domain: 'travel', category: 'trips', evalCases: 5 }),
      entry('tr-b', { domain: 'travel', category: 'trips', evalCases: 3 }),
    ];
    // Slot 1: travel is 1 below quota, software 1 below; tie broken by the thinner category (trips 0 vs security 0
    // vs testing 1), then quality: se-b (experimental) beats tr-a. Slot 2: travel is still 1 below quota.
    const result = selectCurated(entries, { listed: ['se-kept'], target: 3 });
    expect(result.added).toEqual(['se-b', 'tr-a']);
  });

  it('is deterministic whatever the input order', () => {
    const entries = Array.from({ length: 30 }, (_, i) =>
      entry(`p${String(i).padStart(2, '0')}`, { category: `c${i % 4}`, domain: `d${i % 3}`, evalCases: i % 5 }),
    );
    const a = selectCurated(entries, { listed: [], target: 12 });
    const b = selectCurated([...entries].reverse(), { listed: [], target: 12 });
    expect(a.ids).toEqual(b.ids);
    expect(a.ids).toHaveLength(12);
  });
});

describe('renderList', () => {
  it('writes a list the validator reads back, opt-outs in id order', () => {
    const text = renderList(['alpha', 'gamma'], ['beta']);
    expect(text.endsWith('alpha\n!beta\ngamma\n')).toBe(true);
    const list = parseCuratedList(text);
    expect(list.problems).toEqual([]);
    expect([...list.ids]).toEqual(['alpha', 'gamma']);
    expect([...list.excluded]).toEqual(['beta']);
  });
});
