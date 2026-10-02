import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import {
  TARGETS,
  compileFor,
  expandIncludes,
  fillLowering,
  findSection,
  pasteText,
  placeholderLowering,
  removeSection,
  renderTemplate,
  sectionBlock,
  upsertSection,
  type ResolvedEntry,
} from '@hermes-hq/hodios-core';
import type { EntryArg } from '@hermes-hq/hodios-schema';

const args: EntryArg[] = [
  { name: 'test', description: 'Test name.', type: 'text', required: true },
  { name: 'log', description: 'Failing output.', type: 'text' },
  { name: 'focus', description: 'Focus.', type: 'enum', enum: ['a', 'b'], default: 'a' },
];
const template = 'Investigate {{test}}.\n{{#log}}Start from:\n{{log}}\n{{/log}}\n1. Read.\nFocus: {{focus}}.';

describe('renderTemplate', () => {
  it('fills values and keeps a section whose value is set', () => {
    expect(renderTemplate(template, args, fillLowering({ test: 'T1', log: 'boom' }))).toBe(
      'Investigate T1.\nStart from:\nboom\n1. Read.\nFocus: a.',
    );
  });

  it('drops an empty section without leaving a blank line', () => {
    expect(renderTemplate(template, args, fillLowering({ test: 'T1' }))).toBe('Investigate T1.\n1. Read.\nFocus: a.');
  });

  it('leaves [NAME] placeholders for missing required values', () => {
    expect(renderTemplate('Review {{test}}.', args, fillLowering({}))).toBe('Review [TEST].');
  });

  it('lowers sections to conditional prose on targets without templating', () => {
    expect(renderTemplate(template, args, placeholderLowering)).toBe(
      'Investigate [TEST].\nOnly if [LOG] was provided: Start from:\n[LOG]\n1. Read.\nFocus: [FOCUS].',
    );
  });

  it('handles inline sections', () => {
    expect(renderTemplate('A{{#log}} with {{log}}{{/log}}.', args, fillLowering({ log: 'x' }))).toBe('A with x.');
    expect(renderTemplate('A{{#log}} with {{log}}{{/log}}.', args, fillLowering({}))).toBe('A.');
  });
});

describe('expandIncludes', () => {
  const partials = new Map([
    ['a.md', '- from a\n{{> b}}\n'],
    ['b.md', '- from b\n'],
  ]);
  it('expands partials recursively and entry files', () => {
    const files = new Map([['examples/x.md', 'EX\n']]);
    expect(expandIncludes('{{> a}}\n{{> ./examples/x.md}}', files, partials)).toBe('- from a\n- from b\nEX');
  });
  it('throws on an include that does not resolve', () => {
    expect(() => expandIncludes('{{> missing}}', new Map(), partials)).toThrow(/does not resolve/);
  });
});

const rule: ResolvedEntry = {
  schema: 1,
  fm: {
    schema: 1,
    id: 'x-rules',
    kind: 'rule',
    title: 'X rules',
    description: 'Rules for x.',
    category: 'conventions',
    version: '1.0.0',
    status: 'incubating',
  },
  body: '- Do x.',
  steps: [],
};

describe('sections in shared files', () => {
  const block = sectionBlock(rule);

  it('inserts, replaces idempotently and removes without touching other text', () => {
    const original = '# My project\n\nKeep this.\n';
    const once = upsertSection(original, 'x-rules', block);
    expect(once).toBe(`# My project\n\nKeep this.\n\n${block}`);
    expect(upsertSection(once, 'x-rules', block)).toBe(once);
    expect(findSection(once, 'x-rules')).toBe(block);
    const changed = upsertSection(once, 'x-rules', block.replace('Do x.', 'Do y.'));
    expect(changed).toContain('Do y.');
    expect(changed).not.toContain('Do x.');
    expect(removeSection(once, 'x-rules')).toBe(original);
  });

  it('empties a file that only held the section', () => {
    expect(removeSection(upsertSection('', 'x-rules', block), 'x-rules')).toBe('');
  });
});

describe('targets', () => {
  it('match the ids in vocab/targets.yml', () => {
    const vocab = parse(readFileSync(new URL('../../../vocab/targets.yml', import.meta.url), 'utf8')) as {
      targets: { id: string }[];
    };
    const known = new Set(vocab.targets.map((t) => t.id));
    for (const t of TARGETS) {
      if (t.id === 'paste') continue; // stands for chatgpt and claude-ai
      expect(known.has(t.id), t.id).toBe(true);
    }
  });

  it('give user-scope paths under ~ and refuse unsupported kinds', () => {
    const user = compileFor(rule, 'claude-code', { scope: 'user' });
    expect(user.files[0]?.path).toBe('~/.claude/CLAUDE.md');
    expect(compileFor(rule, 'cursor').files[0]?.path).toBe('.cursor/rules/x-rules.mdc');
    expect(() => compileFor({ ...rule, fm: { ...rule.fm, kind: 'prompt' } }, 'agents-md')).toThrow(
      /no format for a prompt/,
    );
    expect(() => compileFor(rule, 'cursor', { format: 'paste' })).toThrow(/not available for cursor/);
    expect(() => compileFor(rule, 'nope')).toThrow(/unknown target/);
  });

  it('accept aliases', () => {
    expect(compileFor(rule, 'claude').target).toBe('claude-code');
    expect(compileFor(rule, 'chatgpt').adapter).toBe('paste');
  });
});

describe('pasteText', () => {
  it('turns a rule into standalone instructions', () => {
    expect(pasteText(rule)).toBe('Follow these rules for the rest of this conversation.\n\n- Do x.\n');
  });
});
