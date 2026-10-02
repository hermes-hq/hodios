#!/usr/bin/env node
// DCO check: every non-merge commit in a pull request must carry a
// `Signed-off-by: Name <email>` trailer whose email matches the commit author or committer.
// Bot-authored commits are skipped (same rule as the DCO GitHub App).
//
// Usage (CI): node tools/dco/check.mjs <base-sha> <head-sha>
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const SIGNOFF = /^Signed-off-by:\s*(.+?)\s*<([^<>\s]+)>\s*$/gim;

/** @param {string} message */
export function signOffs(message) {
  return [...message.matchAll(SIGNOFF)].map((m) => ({ name: m[1], email: m[2].toLowerCase() }));
}

/**
 * @param {{ sha: string, authorName: string, authorEmail: string, committerEmail: string, message: string, parents: number }} commit
 * @returns {string | null} a problem, or null when the commit passes
 */
export function checkCommit(commit) {
  if (commit.parents > 1) return null; // merge commits carry no new authorship
  if (/\[bot\]$/i.test(commit.authorName) || /\[bot\]@users\.noreply\.github\.com$/i.test(commit.authorEmail)) {
    return null;
  }
  const found = signOffs(commit.message);
  if (found.length === 0) return 'no Signed-off-by trailer';
  const allowed = new Set([commit.authorEmail.toLowerCase(), commit.committerEmail.toLowerCase()]);
  if (!found.some((s) => allowed.has(s.email))) {
    return `Signed-off-by email (${found.map((s) => s.email).join(', ')}) does not match the author (${commit.authorEmail})`;
  }
  return null;
}

/** @param {string} base @param {string} head */
function readCommits(base, head) {
  const SEP = '\u001e';
  const FIELD = '\u001f';
  const out = execFileSync(
    'git',
    ['log', '--format=' + ['%H', '%an', '%ae', '%ce', '%P', '%B'].join('%x1f') + '%x1e', `${base}..${head}`],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
  );
  return out
    .split(SEP)
    .map((chunk) => chunk.replace(/^\n/, ''))
    .filter((chunk) => chunk.trim() !== '')
    .map((chunk) => {
      const [sha, authorName, authorEmail, committerEmail, parents, message] = chunk.split(FIELD);
      return {
        sha,
        authorName,
        authorEmail,
        committerEmail,
        parents: parents.trim() === '' ? 0 : parents.trim().split(' ').length,
        message,
      };
    });
}

function main() {
  const [base, head] = process.argv.slice(2);
  if (!base || !head) {
    console.error('usage: check.mjs <base-sha> <head-sha>');
    process.exit(2);
  }
  const commits = readCommits(base, head);
  let failed = 0;
  for (const commit of commits) {
    const problem = checkCommit(commit);
    if (problem) {
      failed++;
      console.error(`✗ ${commit.sha.slice(0, 12)} ${commit.message.split('\n')[0]}: ${problem}`);
    } else {
      console.log(`✓ ${commit.sha.slice(0, 12)} ${commit.message.split('\n')[0]}`);
    }
  }
  if (failed > 0) {
    console.error(
      `\n${failed} of ${commits.length} commits are not signed off. Every commit needs a Developer Certificate of Origin sign-off.\n` +
        'Fix: git rebase --signoff origin/main && git push --force-with-lease\n' +
        'Then use `git commit -s` for new commits. See CONTRIBUTING.md#sign-off.',
    );
    process.exit(1);
  }
  console.log(`\nAll ${commits.length} commits are signed off.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
