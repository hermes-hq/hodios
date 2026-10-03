import { describe, expect, it } from 'vitest';
import { renderCatalog, renderStats, renderStatus, renderTools, replaceSection } from './readme-catalog.mjs';

const vocab = {
  domains: [
    { value: 'software-engineering', label: 'Software engineering' },
    { value: 'travel', label: 'Travel' },
  ],
  categories: [
    { value: 'testing', label: 'Testing', domain: 'software-engineering' },
    { value: 'security', label: 'Security', domain: 'software-engineering' },
    { value: 'trip-planning', label: 'Trip planning', domain: 'travel' },
  ],
};
const entry = (id, kind, category) => ({ id, kind, category, title: id, path: `library/x/${category}/${id}/` });

describe('renderCatalog', () => {
  it('writes one row per category, largest first, with up to three examples', () => {
    const md = renderCatalog(
      [
        entry('fix-flaky-test', 'prompt', 'testing'),
        entry('test-engineer', 'persona', 'testing'),
        entry('add-tests', 'prompt', 'testing'),
        entry('fill-gaps', 'prompt', 'testing'),
        entry('security-auditor', 'persona', 'security'),
      ],
      vocab,
    );
    expect(md).toContain('**5 entries** (3 prompts, 2 personas).');
    expect(md).toContain('<b>Software engineering</b> · 5');
    expect(md).not.toContain('Travel');
    expect(md.indexOf('| Testing |')).toBeLessThan(md.indexOf('| Security |'));
    expect(md).toContain('| Testing | 4 | [`add-tests`](library/x/testing/add-tests/) · [`fill-gaps`]');
    expect(md).not.toContain('test-engineer`](');
  });
});

describe('renderStats', () => {
  it('counts entries, domains with entries, used categories, personas and workflows', () => {
    const md = renderStats(
      [
        entry('fix-flaky-test', 'prompt', 'testing'),
        entry('test-engineer', 'persona', 'testing'),
        entry('feature-track', 'workflow', 'security'),
        entry('plan-trip', 'prompt', 'trip-planning'),
        entry('knit', 'prompt', 'unsorted'),
      ],
      {
        ...vocab,
        domains: [...vocab.domains, { value: 'other', label: 'Other' }],
        categories: [...vocab.categories, { value: 'unsorted', label: 'Unsorted', domain: 'other' }],
      },
    );
    expect(md).toBe(
      '<b>5</b> entries &nbsp;·&nbsp; <b>2</b> domains &nbsp;·&nbsp; <b>3</b> categories &nbsp;·&nbsp; <b>1</b> personas &nbsp;·&nbsp; <b>1</b> workflows',
    );
  });
  it('groups thousands', () => {
    const many = Array.from({ length: 2570 }, (_, i) => entry(`e${i}`, 'prompt', 'testing'));
    expect(renderStats(many, vocab)).toMatch(/^<b>2,570<\/b> entries/);
  });
});

describe('renderTools', () => {
  it('lists every tool target and leaves out formats and integrations', () => {
    expect(
      renderTools([
        { id: 'claude-code', label: 'Claude Code' },
        { id: 'agents-md', label: 'AGENTS.md' },
        { id: 'mcp', label: 'MCP' },
        { id: 'chatgpt', label: 'ChatGPT' },
        { id: 'hermes', label: 'Hermes IDE' },
      ]),
    ).toBe('Works with **Claude Code** · **ChatGPT**.');
  });
});

describe('renderStatus', () => {
  it('counts statuses, eval files, authorship and the curated tier', () => {
    const md = renderStatus(
      [
        { status: 'incubating', authorship: 'ai-generated', evals: true },
        { status: 'incubating', authorship: 'ai-assisted', evals: false },
        { status: 'experimental', authorship: 'human', evals: true },
      ],
      2,
    );
    expect(md).toContain('| Stable | 0 |');
    expect(md).toContain('| Experimental | 1 |');
    expect(md).toContain('| Incubating | 2 |');
    expect(md).not.toContain('Deprecated');
    expect(md).toContain('- **2** of 3 entries ship with eval cases.');
    expect(md).toContain('**1** by a person, **1** by a person with AI help, **1** drafted by AI.');
    expect(md).toContain('- **2** entries are in the curated tier');
  });
  it('adds a deprecated row only when there are deprecated entries', () => {
    expect(renderStatus([{ status: 'deprecated' }], 0)).toContain('| Deprecated | 1 |');
  });
});

describe('replaceSection', () => {
  it('replaces only the text between the markers', () => {
    const readme = 'a\n<!-- catalog:start -->\nold\n<!-- catalog:end -->\nb\n';
    expect(replaceSection(readme, 'new')).toBe('a\n<!-- catalog:start -->\nnew\n<!-- catalog:end -->\nb\n');
  });
  it('takes other markers', () => {
    const readme = 'a <!-- stats:start -->\nold\n<!-- stats:end --> b';
    expect(replaceSection(readme, 'new', '<!-- stats:start -->', '<!-- stats:end -->')).toBe(
      'a <!-- stats:start -->\nnew\n<!-- stats:end --> b',
    );
  });
  it('throws without markers', () => {
    expect(() => replaceSection('no markers', 'x')).toThrow(/catalog:start/);
  });
});
