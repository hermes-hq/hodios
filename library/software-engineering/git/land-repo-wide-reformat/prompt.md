---
schema: 1
id: land-repo-wide-reformat
kind: prompt
title: Land a repository-wide reformat
description: Lands a repository-wide reformat or codemod without wrecking open branches, with a freeze window, an update recipe for open branches and a .git-blame-ignore-revs entry.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [plan, config, message]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [reformat, codemod, git-blame, open-branches, formatter-adoption]
pairs_with:
  prompts: [review-large-mechanical-change, fix-lint-violations-repo-wide, update-feature-branch-from-main, fix-line-ending-churn]
args:
  - name: change
    description: The mechanical change, for example "adopt Black on the whole Python codebase" or "rename the package com.acme.old to com.acme.core with a codemod", and the exact command that produces it.
    type: text
    required: true
  - name: team
    description: How many open branches or pull requests there are, how the team merges (squash, merge commits), and the hosting service.
    type: text
output_contract:
  format: markdown
  sections: [Plan, The commit, Blame, Recipe for open branches, Announcement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reformat that touches every file creates two lasting problems if landed carelessly. Every open branch conflicts with it on nearly every line, and `git blame` afterwards points at the reformat commit instead of the real authors. Both are avoidable. The commit must be purely mechanical and reproducible from one command, so anyone can regenerate it rather than resolve conflicts by hand. Open branches are updated by a recipe, not by resolving conflicts by hand: update to the commit just before the reformat, run the same formatter on the branch, then merge the reformat commit with the strategy option that prefers the already formatted branch. The reformat commit's hash goes into `.git-blame-ignore-revs`, which local blame honours once `blame.ignoreRevsFile` is set and several hosting services read automatically. The listed hash must be the commit as it exists on the default branch after landing, and that commit must contain only the mechanical change, so it cannot be squashed together with config or feature changes.
</context>

<task>
<change>
{{change}}
</change>
{{#team}}
Team and hosting: {{team}}
{{/team}}

1. Read the repository: formatter or codemod config, CI checks, and the open branches (`git branch -r --no-merged origin/<default>`) to size the impact.
2. Split the work into two commits: first the config or tooling change (formatter config, pinned version, CI check disabled or in warn mode), reviewed normally; then the purely mechanical commit produced by one command. Nothing hand-edited goes in the mechanical commit; if the tool needs manual fixes, those are a third commit.
3. Produce the mechanical commit on a branch from the latest default branch. Run the build and tests. Record the exact command and tool version in the commit message.
4. Plan the landing: a short freeze window announced in advance, landing with a merge method that keeps the mechanical commit separate (merge commit, rebase-merge or fast-forward; never squashed together with the config commit), noting that rebase-merge gives it a new hash, and enabling the CI check right after.
5. After landing, add the full hash of the reformat commit as it appears on the default branch to `.git-blame-ignore-revs` in a follow-up commit, and show the local setting `git config blame.ignoreRevsFile .git-blame-ignore-revs`.
6. Write the recipe for open branches: bring the branch up to the commit just before the reformat (`git merge <commit-before-reformat>`, or rebase onto it if the branch is private); run the same formatter command and commit; then `git merge -X ours <reformat-commit>`. In a merge, "ours" is the branch, which is already formatted and contains everything up to the reformat, so the reformat's purely formatting hunks are safely taken from the branch side. Then `git diff <reformat-commit>` must show only the branch's real changes. Teams that require linear history can squash the result onto the reformat commit afterwards. Test this recipe on one real branch and compare its diff against the original branch's diff before sending it out.
7. Draft the announcement: when, what changes, the recipe, and who to ask.
</task>

<constraints>
- Show every push and merge command and wait for confirmation; never force-push the default branch.
- Do not mix behaviour changes into the mechanical commit.
- Verify the recipe on a test branch before giving it to the team; `-X ours` means the opposite side during a rebase, and getting it backwards silently drops the branch's changes.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Numbered steps with dates or placeholders.
## The commit
Command, tool version and commit message.
## Blame
The ignore file content and local setting.
## Recipe for open branches
Copyable commands, tested on one branch.
## Announcement
A short message for the team.
</output_format>
