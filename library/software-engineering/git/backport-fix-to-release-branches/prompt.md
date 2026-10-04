---
schema: 1
id: backport-fix-to-release-branches
kind: prompt
title: Backport a fix to release branches
description: Plans backporting a fix to maintained release branches with cherry-pick -x, conflict handling where code has diverged, per-branch tests, version bumps and changelog entries. Use for patch releases.
category: git
version: 1.0.0
status: incubating
stage: [maintain, ship]
role: [maintainer, software-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [backport, cherry-pick, release-branches, patch-release, lts]
pairs_with:
  prompts: [resolve-merge-conflict, choose-branching-strategy]
args:
  - name: fix_description
    description: The fix as commit hashes or a PR on the main branch, what it fixes, severity (security, data loss, crash, minor), and the files it touches.
    type: text
    required: true
  - name: release_branches
    description: Maintained branches and their support status, for example "release/3.x (current), release/2.8 (LTS until 2027), release/2.6 (security only)".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Which branches, Per-branch plan, Conflicts and divergence, Release steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A maintainer has a fix on the main branch and must ship it on older supported release lines. Backports go wrong in quiet ways: a cherry-pick applies cleanly but the surrounding code differs, so the fix is incomplete or wrong; a refactor on main means the "same" fix needs rewriting; a test that proves the fix is not backported; the commit loses its link to the original; or a security fix is published on main before the patched releases are ready. Each branch is its own small release.

<fix_description>
{{fix_description}}
</fix_description>

Release branches: {{release_branches}}
</context>

<task>
1. **Which branches.** For each branch, decide backport or skip based on its support status and whether the bug exists there (check with `git log` or by reading the affected code on that branch; a bug introduced after the branch was cut does not need a backport). For a security fix, note the coordination: patched releases on all affected lines before or together with public disclosure.
2. **Order.** Backport from newest to oldest, each from the previous backport rather than straight from main when branches are close, so conflict fixes carry down.
3. **Per-branch commands:**
   - `git switch <branch> && git pull`, then `git switch -c backport/<fix>-<branch>`;
   - `git cherry-pick -x <sha>` (the `-x` records "cherry picked from commit"); for several commits, cherry-pick them in original order, or `-m 1` only if picking a merge commit is unavoidable;
   - include the regression test commit with the fix;
   - run the branch's own test suite and the specific test, and note the test may need adapting to older APIs.
4. **Conflicts and divergence.** For each likely conflict area, say whether to resolve, rewrite the fix by hand for that branch (when the code was refactored), or skip. A clean cherry-pick is not proof: read the surrounding code on the old branch for the same bug in a different form, and check callers that differ.
5. **PRs.** One PR per branch titled `[<branch>] <original title>`, linking the original PR, labelled for backport, reviewed by someone who knows that line. Mention backport bots or labels only if the user's setup uses them.
6. **Release steps.** Patch version bump per branch (semver patch), changelog entry on each branch referencing the issue, tag and publish, release notes that say which versions contain the fix, and merge-forward or record-keeping so the fix is not reported as missing later.
</task>

<constraints>
- Use the real hashes and branch names given; mark placeholders otherwise.
- Never cherry-pick unrelated commits to make a backport apply; if the fix depends on an earlier refactor, say so and propose a minimal hand-written fix instead.
- Do not publish details of a security fix in commit messages or PR titles on public repos before the release; suggest neutral wording.
- If the fix description lacks the commits or which branches are affected, ask for them and stop.
</constraints>

<output_format>
## Which branches
Table: Branch | Status | Affected? | Backport? | Reason.
## Per-branch plan
For each branch, a numbered code block of commands and the tests to run.
## Conflicts and divergence
Bullets per branch: expected conflicts, how to resolve, or the rewrite needed.
## Release steps
Checklist per branch: version, changelog, tag, publish, notes.
</output_format>
