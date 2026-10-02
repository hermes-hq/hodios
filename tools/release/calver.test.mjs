import { describe, expect, it } from 'vitest';
import { nextCalver, nextSeq } from './calver.mjs';

describe('nextCalver', () => {
  const oct2 = new Date('2026-10-02T06:00:00Z');

  it('starts each day at patch 0', () => {
    expect(nextCalver(oct2, [])).toBe('2026.1002.0');
    expect(nextCalver(new Date('2027-01-05T00:00:00Z'), ['v2026.1231.0'])).toBe('2027.105.0');
  });

  it('bumps the patch for same-day releases', () => {
    expect(nextCalver(oct2, ['v2026.1002.0', 'v2026.1002.1', 'v2026.1001.4'])).toBe('2026.1002.2');
  });

  it('sorts monotonically as semver', () => {
    const versions = ['2026.105.0', '2026.1002.0', '2026.1002.1', '2026.930.0'];
    const key = (v) => v.split('.').map(Number);
    const sorted = [...versions].sort((a, b) => {
      const [x, y] = [key(a), key(b)];
      return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
    });
    expect(sorted).toEqual(['2026.105.0', '2026.930.0', '2026.1002.0', '2026.1002.1']);
  });
});

describe('nextSeq', () => {
  it('goes up by one with each catalog release', () => {
    expect(nextSeq([])).toBe(0);
    expect(nextSeq(['v2026.1002.0'])).toBe(1);
    expect(nextSeq(['v2026.1002.0', 'v2026.1002.1', 'not-a-release'])).toBe(2);
  });
});
