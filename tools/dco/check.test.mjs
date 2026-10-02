import { describe, expect, it } from 'vitest';
import { checkCommit, signOffs } from './check.mjs';

const commit = (message, overrides = {}) => ({
  sha: 'abc',
  authorName: 'Ada Lovelace',
  authorEmail: 'ada@example.com',
  committerEmail: 'ada@example.com',
  parents: 1,
  message,
  ...overrides,
});

describe('DCO check', () => {
  it('parses trailers', () => {
    expect(signOffs('Fix\n\nSigned-off-by: Ada Lovelace <Ada@Example.com>\n')).toEqual([
      { name: 'Ada Lovelace', email: 'ada@example.com' },
    ]);
  });

  it('passes a signed-off commit', () => {
    expect(checkCommit(commit('Fix\n\nSigned-off-by: Ada Lovelace <ada@example.com>'))).toBeNull();
  });

  it('accepts a sign-off matching the committer', () => {
    const c = commit('Fix\n\nSigned-off-by: Ada <ada@work.example>', { committerEmail: 'ada@work.example' });
    expect(checkCommit(c)).toBeNull();
  });

  it('fails without a sign-off or with a mismatched email', () => {
    expect(checkCommit(commit('Fix'))).toMatch(/no Signed-off-by/);
    expect(checkCommit(commit('Fix\n\nSigned-off-by: Eve <eve@example.com>'))).toMatch(/does not match/);
  });

  it('skips merge and bot commits', () => {
    expect(checkCommit(commit('Merge', { parents: 2 }))).toBeNull();
    expect(checkCommit(commit('Bump', { authorName: 'dependabot[bot]' }))).toBeNull();
  });
});
