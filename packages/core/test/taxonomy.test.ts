import { describe, expect, it } from 'vitest';
import {
  buildVocab,
  checkLibrary,
  checkVocabSet,
  impliedBy,
  parseIdsLock,
  type EntrySource,
  type LibraryContext,
} from '../src/index.js';

const vocab = buildVocab([
  {
    schema: 1,
    facet: 'domain',
    values: [
      { value: 'software-engineering', label: 'Software engineering' },
      { value: 'health-wellbeing', label: 'Health' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    schema: 1,
    facet: 'category',
    values: [
      { value: 'testing', label: 'Testing', domain: 'software-engineering' },
      { value: 'big', label: 'Big', domain: 'software-engineering', layout: 'nested' },
      { value: 'fitness', label: 'Fitness', domain: 'health-wellbeing', advice_risk: ['medical'] },
      { value: 'mental-health', label: 'Mental health', domain: 'health-wellbeing', advice_risk: ['mental-health'] },
      { value: 'unsorted', label: 'Unsorted', domain: 'other' },
      { value: 'old', label: 'Old', domain: 'software-engineering', deprecated_by: 'testing' },
    ],
  },
  {
    schema: 1,
    facet: 'subcategory',
    values: [
      { value: 'big-a', label: 'A', parent: 'big' },
      { value: 'testing-e2e', label: 'E2E', parent: 'testing' },
    ],
  },
  { schema: 1, facet: 'stage', values: [{ value: 'verify', label: 'Verify' }] },
  {
    schema: 1,
    facet: 'stack',
    values: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'react', label: 'React', implies: ['javascript'] },
      { value: 'nextjs', label: 'Next.js', implies: ['react'] },
    ],
  },
  { schema: 1, facet: 'role', values: [{ value: 'student', label: 'Student', synonyms: ['learner'] }] },
  { schema: 1, facet: 'subject', values: [{ value: 'biology', label: 'Biology' }] },
  {
    schema: 1,
    facet: 'requires',
    values: [
      { value: 'shell', label: 'Shell' },
      { value: 'file-write', label: 'Write' },
      { value: 'web', label: 'Web' },
    ],
  },
  { schema: 1, facet: 'inputs', values: [{ value: 'text', label: 'Text' }] },
  { schema: 1, facet: 'output', values: [{ value: 'plan', label: 'Plan' }] },
  {
    schema: 1,
    facet: 'advice-risk',
    values: [
      { value: 'medical', label: 'Medical', partials: ['guardrails/professional-limits'] },
      {
        value: 'mental-health',
        label: 'Mental health',
        partials: ['guardrails/professional-limits', 'guardrails/crisis-safety'],
      },
    ],
  },
  { schema: 1, facet: 'tags', values: [{ value: 'flaky-tests', label: 'Flaky tests' }] },
]);

const partials = new Map([
  ['guardrails/professional-limits.md', '- Not a professional.\n'],
  ['guardrails/crisis-safety.md', '- Crisis help.\n'],
]);

const ctx: LibraryContext = { vocab, partials, idsLock: parseIdsLock('') };

function prompt(id: string, category: string, extra = '', constraints = ''): string {
  return `---
schema: 1
id: ${id}
kind: prompt
title: Example entry
description: Does one example thing for the taxonomy tests. Use when testing the validator rules.
category: ${category}
version: 1.0.0
status: incubating
${extra}
---
<context>
Example.
</context>

<task>
Do it.
</task>

<constraints>
${constraints}
</constraints>

<output_format>
Text.
</output_format>
`;
}

const src = (dir: string, text: string): EntrySource => ({ dir, files: new Map([['prompt.md', text]]) });

function issues(sources: EntrySource[], context = ctx) {
  return checkLibrary(sources, context).issues.filter((i) => i.severity !== 'info');
}
const ids = (sources: EntrySource[]) => issues(sources).map((i) => `${i.rule}:${i.severity}`);

describe('taxonomy paths (PS051)', () => {
  it('accepts library/<domain>/<category>/<id>/', () => {
    expect(issues([src('library/software-engineering/testing/a-b', prompt('a-b', 'testing'))])).toEqual([]);
  });

  it('warns on the legacy library/<category>/<id>/ path', () => {
    expect(ids([src('library/testing/a-b', prompt('a-b', 'testing'))])).toEqual(['PS051:warning']);
  });

  it('rejects the wrong domain', () => {
    expect(ids([src('library/health-wellbeing/testing/a-b', prompt('a-b', 'testing'))])).toContain('PS051:error');
  });

  it('requires a subcategory folder in a nested category, and none in a flat one', () => {
    const nested = prompt('a-b', 'big', 'subcategory: big-a');
    expect(issues([src('library/software-engineering/big/big-a/a-b', nested)])).toEqual([]);
    expect(ids([src('library/software-engineering/big/a-b', nested)])).toContain('PS051:error');
    expect(ids([src('library/software-engineering/big/a-b', prompt('a-b', 'big'))])).toContain('PS051:error');
    const flat = prompt('a-b', 'testing', 'subcategory: testing-e2e');
    expect(issues([src('library/software-engineering/testing/a-b', flat)])).toEqual([]);
    expect(ids([src('library/software-engineering/testing/testing-e2e/a-b', flat)])).toContain('PS051:error');
  });

  it('rejects a subcategory of another category', () => {
    const text = prompt('a-b', 'testing', 'subcategory: big-a');
    expect(ids([src('library/software-engineering/testing/a-b', text)])).toContain('PS051:error');
  });
});

describe('sensitive categories (PS052, PS053)', () => {
  const ok = prompt(
    'a-b',
    'fitness',
    'advice_risk: [medical]\ninvocation: user',
    '{{> guardrails/professional-limits}}',
  );
  const dir = 'library/health-wellbeing/fitness/a-b';

  it('passes with advice_risk and the guardrail partial', () => {
    expect(issues([src(dir, ok)])).toEqual([]);
  });

  it('requires the category advice_risk value', () => {
    expect(ids([src(dir, prompt('a-b', 'fitness', '', '{{> guardrails/professional-limits}}'))])).toContain(
      'PS052:error',
    );
  });

  it('requires the guardrail partials, including crisis-safety for mental health', () => {
    expect(ids([src(dir, prompt('a-b', 'fitness', 'advice_risk: [medical]'))])).toContain('PS053:error');
    const mental = prompt(
      'a-b',
      'mental-health',
      'advice_risk: [mental-health]',
      '{{> guardrails/professional-limits}}',
    );
    expect(ids([src('library/health-wellbeing/mental-health/a-b', mental)])).toContain('PS053:error');
  });

  it('never allows model invocation', () => {
    expect(ids([src(dir, ok.replace('invocation: user', 'invocation: model'))])).toContain('PS053:error');
  });
});

describe('holding area (PS054)', () => {
  const dir = (id: string) => `library/other/unsorted/${id}`;

  it('requires proposed_category, which must not be a live category', () => {
    expect(ids([src(dir('a-b'), prompt('a-b', 'unsorted'))])).toContain('PS054:error');
    expect(ids([src(dir('a-b'), prompt('a-b', 'unsorted', 'proposed_category: testing'))])).toContain('PS054:error');
    expect(issues([src(dir('a-b'), prompt('a-b', 'unsorted', 'proposed_category: astrology'))])).toEqual([]);
  });

  it('allows proposed_category only in the holding area', () => {
    const text = prompt('a-b', 'testing', 'proposed_category: astrology');
    expect(ids([src('library/software-engineering/testing/a-b', text)])).toContain('PS054:error');
  });

  it('caps the holding area and asks for graduation', () => {
    const many = Array.from({ length: 51 }, (_, i) =>
      src(dir(`e-${i}`), prompt(`e-${i}`, 'unsorted', `proposed_category: ${i < 5 ? 'astrology' : `p-${i}`}`)),
    );
    const found = issues(many).filter((i) => i.rule === 'PS054');
    expect(found).toContainEqual(
      expect.objectContaining({ severity: 'error', message: expect.stringContaining('51') }),
    );
    expect(found).toContainEqual(expect.objectContaining({ message: expect.stringContaining('"astrology"') }));
  });
});

describe('folder size (PS055)', () => {
  it('warns above 600 entries in one category folder', () => {
    const many = Array.from({ length: 601 }, (_, i) =>
      src(`library/software-engineering/testing/e-${i}`, prompt(`e-${i}`, 'testing')),
    );
    expect(issues(many).filter((i) => i.rule === 'PS055')).toEqual([
      expect.objectContaining({ severity: 'warning', file: 'library/software-engineering/testing' }),
    ]);
  });
});

describe('facet hygiene (PS056-PS059)', () => {
  const dir = 'library/software-engineering/testing/a-b';
  it.each([
    ['PS056:error', 'requires: [shell]\nrisk: read-only'],
    ['PS056:warning', 'requires: [file-write]'],
    ['PS057:warning', 'tags: [testing]'],
    ['PS057:warning', 'tags: [learner]'],
    ['PS058:warning', 'stack: [nextjs, javascript]'],
    ['PS059:warning', 'stage: [verify, verify-a, verify-b, verify-c]'],
  ])('reports %s', (rule, extra) => {
    expect(ids([src(dir, prompt('a-b', 'testing', extra))])).toContain(rule);
  });

  it('accepts risk at or above the floor', () => {
    expect(issues([src(dir, prompt('a-b', 'testing', 'requires: [web]\nrisk: external'))])).toEqual([]);
  });

  it('accepts the new facets', () => {
    const text = prompt('a-b', 'testing', 'role: [student]\nsubject: [biology]\nlang: pt-BR\nstack: [nextjs]');
    expect(issues([src(dir, text)])).toEqual([]);
    expect(ids([src(dir, prompt('a-b', 'testing', 'role: [learner]'))])).toContain('PS006:error');
  });
});

describe('vocab integrity (PS050)', () => {
  it('passes the fixture', () => {
    expect(checkVocabSet(vocab, partials)).toEqual([]);
  });

  it('expands implies transitively', () => {
    expect([...impliedBy(vocab, 'stack', 'nextjs')].sort()).toEqual(['javascript', 'react']);
  });

  it('finds broken cross-references', () => {
    const broken = buildVocab([
      { schema: 1, facet: 'domain', values: [{ value: 'testing', label: 'T', synonyms: ['qa'] }] },
      {
        schema: 1,
        facet: 'category',
        values: [
          { value: 'testing', label: 'Testing', domain: 'nowhere' },
          { value: 'qa', label: 'QA', domain: 'testing', advice_risk: ['legal'] },
        ],
      },
      { schema: 1, facet: 'subcategory', values: [{ value: 'x', label: 'X', parent: 'missing' }] },
      { schema: 1, facet: 'advice-risk', values: [{ value: 'medical', label: 'M', partials: ['guardrails/nope'] }] },
    ]);
    const messages = checkVocabSet(broken, new Map()).map((p) => p.message);
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.stringContaining('unknown domain "nowhere"'),
        expect.stringContaining('unknown advice_risk "legal"'),
        expect.stringContaining('both a domain and a live category'),
        expect.stringContaining('synonym "qa"'),
        expect.stringContaining('unknown parent "missing"'),
        expect.stringContaining('partials/guardrails/nope.md'),
      ]),
    );
  });
});
