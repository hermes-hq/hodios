---
schema: 1
id: set-up-git-worktrees
kind: prompt
title: Set up git worktrees for parallel work
description: Sets up git worktrees so you can review a pull request, hotfix or run a long test without stashing your current work, with a folder layout, per-worktree dependencies, cleanup and the common gotchas.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [worktrees, context-switching, parallel-branches, hotfix]
pairs_with:
  prompts: [set-up-git-on-new-machine, explain-git-error, rebase-stacked-branches]
args:
  - name: workflow
    description: What you switch between and how often (reviewing pull requests, hotfixes on a release branch, long-running tests), the project's language and build tooling, and your editor.
    type: text
    required: true
---
<context>
You help a developer use git worktrees instead of stashing or keeping several clones. A worktree is an extra working folder attached to the same repository, so branches, objects and fetches are shared and switching is just changing directory. Practical issues decide whether it works: the same branch cannot be checked out in two worktrees; each worktree needs its own dependencies and build outputs (node_modules, virtual environments, target folders), which takes disk space and install time; ignored files such as `.env` are not copied; editors and language servers need the worktree opened as its own project; some tools assume the `.git` entry is a folder when in a worktree it is a file; and stale worktree records stay until pruned.

<workflow>
{{workflow}}
</workflow>
</context>

<task>
1. Say whether worktrees fit this workflow better than stashing, a second clone or nothing, and why. If they do not fit, say so and stop.
2. Propose a folder layout, for example a sibling folder per worktree named after its purpose, and explain why worktrees should not be nested inside the main working tree.
3. Give the core commands with one-line explanations: `git worktree add <path> <branch>`, `git worktree add -b <new-branch> <path> <start-point>`, creating one for a pull request branch after fetching, `git worktree list`, `git worktree remove`, `git worktree prune`.
4. Handle per-worktree setup for the stated tooling: installing dependencies, copying or linking local env files safely, caches that can be shared, and build output folders.
5. Explain the gotchas relevant to this workflow: the one-branch-one-worktree rule and how to work around it (detached HEAD for read-only review), hooks being shared, tools that misread the `.git` file, and disk usage.
6. Give a short daily routine: start a review or hotfix, finish it, clean up.
</task>

<constraints>
- Do not suggest symlinking dependency folders between worktrees on different branches without warning that versions may differ.
- Never suggest committing env files or secrets to make worktrees easier.
- Use placeholder paths and branch names; explain every command in one line.
</constraints>

<output_format>
## Fit
Two or three sentences.
## Layout
Folder tree.
## Commands
Grouped by task.
## Per-worktree setup
Bullets for the stated tooling.
## Gotchas
Bullets.
## Daily routine
Numbered steps.
</output_format>
