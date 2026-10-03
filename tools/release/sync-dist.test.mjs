import { describe, expect, it } from 'vitest';
import { checkTree, GENERATED, updateReadme } from './sync-dist.mjs';

const manifest = { catalog: '2026.1003.0', tiers: { curated: { rows: 1570 } } };
const plugins = [
  { name: 'hodios-travel', category: 'travel' },
  { name: 'hodios-education', category: 'education' },
  { name: 'starter', category: undefined },
];

describe('checkTree', () => {
  it('accepts a full build within the caps', () => {
    expect(checkTree({ manifest, skills: 1570, plugins })).toEqual([]);
  });

  it('refuses a tree without the v1 catalog', () => {
    expect(checkTree({ manifest: null, skills: 10, plugins })[0]).toMatch(/catalog\/v1\/manifest.json is missing/);
  });

  it('enforces 2,000 skills, 100 plugins and one plugin per domain', () => {
    const many = Array.from({ length: 101 }, (_, i) => ({ name: `p${i}` }));
    expect(checkTree({ manifest, skills: 2001, plugins: many })).toEqual([
      '2001 skills; hodios-dist holds at most 2000',
      '101 plugins; the marketplace limit is 100',
    ]);
    const twice = [...plugins, { name: 'hodios-travel-2', category: 'travel' }];
    expect(checkTree({ manifest, skills: 1, plugins: twice })).toEqual(['more than one plugin for domain travel']);
  });

  it('always copies the catalog tree', () => {
    expect(GENERATED).toContain('catalog');
  });
});

describe('updateReadme', () => {
  it('rewrites the catalog version and entry count', () => {
    const readme = 'the generated install tree for catalog `2026.1002.2`: 1,070 entries compiled into skills.';
    expect(updateReadme(readme, '2026.1003.0', 1570)).toBe(
      'the generated install tree for catalog `2026.1003.0`: 1,570 entries compiled into skills.',
    );
  });

  it('fails loudly when the line is gone', () => {
    expect(() => updateReadme('# hodios-dist', '2026.1003.0', 1)).toThrow(/no "catalog/);
  });
});
