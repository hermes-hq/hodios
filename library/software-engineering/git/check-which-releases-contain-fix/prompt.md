---
schema: 1
id: check-which-releases-contain-fix
kind: prompt
title: Check which releases contain a fix
description: Answers whether a fix is in a given branch or release, including squash-merged and cherry-picked copies with new hashes, using tag --contains, cherry markers and patch-id.
category: git
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, support-agent, tech-lead]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [report, table]
risk: runs-commands
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [release-tracking, cherry-pick, patch-id, tag-contains, support-questions]
pairs_with:
  prompts: [backport-fix-to-release-branches, investigate-code-history, cut-hotfix-from-release-tag]
args:
  - name: fix
    description: The fix as a commit hash, pull request number, issue id or a description of the change, for example "PR 4812, null check in invoice export".
    type: text
    required: true
  - name: targets
    description: The releases or branches to check, for example "v4.2.0 to v4.6.1 and release/4.x". Leave empty to check all release tags.
    type: text
output_contract:
  format: markdown
  sections: [The fix, Results, How it was checked, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Is the fix for bug X in version 4.3?" sounds like one command, `git tag --contains <sha>`, but that only finds the exact commit. The same change often exists under different hashes: squash merging creates a new commit on main, rebase merging rewrites every commit, and backports are cherry-picks with their own hashes. So a release can contain the fix while `--contains` says no, and vice versa a release can contain the commit but with the fix later reverted. Reliable answers combine several checks: `--contains` for the exact commit; `git log --grep` for the pull request number or the "cherry picked from commit" trailer that `-x` adds; `git cherry` or `git log --cherry-mark` and `git patch-id` to match changes by content; and finally checking the code itself at the tag, which is the ground truth if a fix was adapted during a backport. Revert commits after the fix must be checked too.
</context>

<task>
<fix>
{{fix}}
</fix>
{{#targets}}
Check against: {{targets}}
{{/targets}}

1. `git fetch --tags` (read-only for the working tree) and identify the fix: from a hash, a PR number (`git log --all --grep "#<n>"` or the merge subject), an issue id, or by searching the change with `git log -S'<distinctive code>'`. Record the commit or commits and the files and lines they change.
2. For each target (all release tags matching the project's pattern if none were given), check in this order and record which check answered: exact commit (`git merge-base --is-ancestor <sha> <tag>` or `git tag --contains <sha>`); a copy via the `cherry picked from commit <sha>` trailer or the PR number in the target's history; a content match with `git patch-id --stable` compared against commits in the target's range; and finally the code at the tag (`git show <tag>:<path>` around the fixed lines).
3. Check for reverts: `git log <sha>..<tag> --grep "Revert" -- <files>` and whether the fixed lines were later changed back.
4. Mark each target: contains (exact), contains (copy), contains (adapted, confirmed by code), reverted, or does not contain. Give the first release containing it for each release line.
</task>

<constraints>
- Read-only: do not create branches, tags or commits.
- Do not answer from commit messages alone when a code check is possible; a message can claim a fix the code does not have.
- If the fix cannot be identified with confidence, list the candidates and ask instead of guessing.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## The fix
Commits, files and the lines that matter.
## Results
Table: release or branch, status, evidence.
## How it was checked
The commands used, briefly.
## Caveats
Anything uncertain, such as an adapted backport or a partial revert.
</output_format>
