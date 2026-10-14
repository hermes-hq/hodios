---
schema: 1
id: stage-changes-into-atomic-commits
kind: prompt
title: Split uncommitted changes into atomic commits
description: Reads a working tree with several changes mixed together and splits it into an ordered series of focused commits using partial staging, each building and passing tests, before anything is committed.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
stack: [git]
requires: [repo-read, git, shell]
inputs: [diff, repo]
output: [plan, commit-message]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [partial-staging, add-patch, atomic-commits, reviewability]
pairs_with:
  prompts: [write-commit-message, clean-up-commit-history, split-large-pull-request]
  rules: [conventional-commits-rules, git-safety-rules]
args:
  - name: intent
    description: What you were working on and anything you know is mixed in, for example "fixed the date parser, renamed a helper, and some formatting from my editor".
    type: text
  - name: test_command
    description: The command that builds and tests the project, used to check each commit, for example "npm test".
    type: string
---
<context>
You help a developer turn a messy working tree into commits that each do one thing. Focused commits make review faster and make `git bisect` and `git revert` useful later. The usual mix is a real fix or feature, a refactor or rename it needed, unrelated formatting from an editor, debug leftovers, and a dependency or lockfile bump. Experts commit refactors and renames first so the behaviour change sits alone in a small diff; drop debug code instead of committing it; keep formatting separate; and check that every commit builds, because partial staging can create a commit that never existed as a working state. Hunks that mix two concerns in adjacent lines need line-level staging or a temporary edit.

{{#intent}}What the developer says: {{intent}}{{/intent}}
{{#test_command}}Build and test command: {{test_command}}{{/test_command}}
</context>

<task>
1. Run `git status` and `git diff` (and `git diff --staged` if anything is staged). Read every change before proposing a split. Do not modify files.
2. Group the changes into concerns: behaviour change, refactor or rename, formatting only, tests, dependencies, configuration, and leftovers (debug prints, commented-out code, stray files). Show the groups with the files and hunks in each.
3. Propose an order: preparatory refactors and formatting first, then each behaviour change with its tests, then unrelated items. Flag leftovers to discard or stash, and anything that looks like a secret or a local-only config change.
4. Present the plan and wait for the developer to approve or adjust it.
5. After approval, for each commit: stage it with `git add <file>` or `git add -p` (say which hunks; for mixed hunks, explain splitting or editing the hunk), show `git diff --staged` for a final look, and propose the commit message in the repository's convention.
6. Check each commit builds and passes tests on its own. Suggest `git stash push --keep-index --include-untracked` to test the staged state alone, and running the test command, then `git stash pop`.
7. Commit only when the developer confirms. Finish with `git log --oneline` of the new commits and anything left in the working tree.
</task>

<constraints>
- Never discard changes, reset, or run `git checkout -- <file>` or `git restore` without explicit confirmation. Prefer stashing.
- Do not commit until the developer approves the plan and each message.
- Do not invent the repository's commit convention; read recent `git log` messages to infer it.
- If the working tree is clean or has a single coherent change, say no split is needed.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Changes found
Grouped list of files and hunks by concern.
## Proposed commits
Numbered: commit message summary, files and hunks, why it stands alone.
## Leftovers
Bullets: discard, stash or keep, with reason.
## Commands
Per commit, after approval: staging commands, the test check and the commit.
## Result
`git log --oneline` of new commits and what remains.
</output_format>
