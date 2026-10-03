import { describe, expect, it } from 'vitest';
import { checkTree, GENERATED, updateReadme } from './sync-dist.mjs';

const manifest = { catalog: '2026.1003.0', tiers: { curated: { rows: 1570 } } };
const signature = /** @type {const} */ ({ ok: true, keyId: '0102030405060708' });
const plugins = [
  { name: 'hodios-travel', category: 'travel' },
  { name: 'hodios-education', category: 'education' },
  { name: 'starter', category: undefined },
];

describe('checkTree', () => {
  it('accepts a full build within the caps', () => {
    expect(checkTree({ manifest, skills: 1570, plugins, signature })).toEqual([]);
  });

  it('refuses a tree without the v1 catalog', () => {
    expect(checkTree({ manifest: null, skills: 10, plugins })[0]).toMatch(/catalog\/v1\/manifest.json is missing/);
  });

  it('enforces 2,000 skills, 100 plugins and one plugin per domain', () => {
    const many = Array.from({ length: 101 }, (_, i) => ({ name: `p${i}` }));
    expect(checkTree({ manifest, skills: 2001, plugins: many, signature })).toEqual([
      '2001 skills; hodios-dist holds at most 2000',
      '101 plugins; the marketplace limit is 100',
    ]);
    const twice = [...plugins, { name: 'hodios-travel-2', category: 'travel' }];
    expect(checkTree({ manifest, skills: 1, plugins: twice, signature })).toEqual([
      'more than one plugin for domain travel',
    ]);
  });

  it('keeps the tree under 60,000 entries', () => {
    expect(checkTree({ manifest, skills: 1900, plugins, entries: 59999, signature })).toEqual([]);
    expect(checkTree({ manifest, skills: 1900, plugins, entries: 60000, signature })).toEqual([
      '60000 tree entries; hodios-dist must stay under 60000',
    ]);
  });

  it('refuses an unsigned or badly signed catalog', () => {
    expect(checkTree({ manifest, skills: 1, plugins })).toEqual([
      'catalog/v1 is not signed: no signature check. Run tools/release/manifest-signing.mjs sign; Hermes IDE refuses unsigned catalog updates',
    ]);
    const bad = { ok: false, reason: 'manifest.json.minisig does not verify with key 0102030405060708' };
    expect(checkTree({ manifest, skills: 1, plugins, signature: bad })[0]).toMatch(
      /not signed: manifest.json.minisig does not verify/,
    );
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

  it('writes the curated count and, when the README names it, the catalog total', () => {
    const readme = 'catalog `2026.1003.0`: 1,570 entries (the curated tier, of 1,570 in the catalog) compiled.';
    expect(updateReadme(readme, '2026.1003.1', 1900, 2570)).toBe(
      'catalog `2026.1003.1`: 1,900 entries (the curated tier, of 2,570 in the catalog) compiled.',
    );
  });

  it('fails loudly when the line is gone', () => {
    expect(() => updateReadme('# hodios-dist', '2026.1003.0', 1)).toThrow(/no "catalog/);
  });
});
