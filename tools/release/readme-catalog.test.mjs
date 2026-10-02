import { describe, expect, it } from 'vitest';
import { renderCatalog, replaceSection } from './readme-catalog.mjs';

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

describe('replaceSection', () => {
  it('replaces only the text between the markers', () => {
    const readme = 'a\n<!-- catalog:start -->\nold\n<!-- catalog:end -->\nb\n';
    expect(replaceSection(readme, 'new')).toBe('a\n<!-- catalog:start -->\nnew\n<!-- catalog:end -->\nb\n');
  });
  it('throws without markers', () => {
    expect(() => replaceSection('no markers', 'x')).toThrow(/catalog:start/);
  });
});
