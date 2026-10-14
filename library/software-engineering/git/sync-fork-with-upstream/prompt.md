---
schema: 1
id: sync-fork-with-upstream
kind: prompt
title: Sync a fork with its upstream
description: Brings a fork up to date with the original repository, choosing merge or rebase by whether the fork carries its own patches, with exact commands, conflict handling and a routine to keep it current.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [fork, upstream-remote, carried-patches, rebase, open-source-contribution]
pairs_with:
  prompts: [resolve-merge-conflict, rebase-stacked-branches, recover-lost-git-work, explain-git-error]
args:
  - name: fork_situation
    description: Why you have the fork (contributing pull requests, or running your own modified version), which branches matter, how far behind it is, and output of `git remote -v` and `git status` if you have them.
    type: text
    required: true
  - name: upstream_changes
    description: Anything notable upstream, for example "they renamed master to main" or "they rewrote history last month".
    type: text
---
<context>
You help someone bring a fork up to date with the repository it was forked from. The right method depends on what the fork is for. A contribution fork should keep its main branch identical to upstream and do all work on topic branches, so syncing is a fast-forward and topic branches are rebased. A long-lived fork that carries its own patches (a company's patched version of a library) needs those patches kept as a clear, small set: rebasing them onto each upstream release keeps them visible but rewrites the fork's history, while merging upstream keeps history stable for others who use the fork but buries the patches. Common accidents: committing to the fork's main branch, then fighting divergence forever; pushing upstream's history over the fork's patches; upstream renaming its default branch; and opening pull requests that include unrelated merge commits.

<fork_situation>
{{fork_situation}}
</fork_situation>

{{#upstream_changes}}
<upstream_changes>
{{upstream_changes}}
</upstream_changes>
{{/upstream_changes}}
</context>

<task>
1. Classify the fork: contribution fork, patch-carrying fork used only by you, or patch-carrying fork others depend on. If it is unclear, ask and stop.
2. Give the one-time setup: add the `upstream` remote if missing, fetch, and check what diverged with `git log --oneline main..upstream/main` and `git log --oneline upstream/main..main`.
3. For a contribution fork: fast-forward main to upstream (`git merge --ff-only upstream/main`), and if main has local commits, move them to a topic branch first and reset main, with a backup branch. Then rebase each open topic branch and force-push with `--force-with-lease`, explaining that this updates the open pull request.
4. For a patch-carrying fork: recommend rebase (private) or merge (shared), explain why, and give the commands, including a backup branch and how to list the carried patches afterwards. Suggest keeping patches few and upstreaming them where possible.
5. Explain how conflicts will show up in the chosen method and how to resolve them without losing a carried patch.
6. Handle what upstream changed: a renamed default branch, rewritten history (rebase with `--onto` from the old base), or deleted branches.
7. Give a routine to stay current: how often to sync, and the hosting site's built-in sync button and when it is safe to use.
</task>

<constraints>
- Always make a backup branch before a reset, rebase or force-push, and use `--force-with-lease`, never plain `--force`.
- Never suggest rewriting the history of a branch others pull from without warning them and explaining what they must do.
- Use the branch names given; if unknown, use main and say so.
- Explain each command in one line.
</constraints>

<output_format>
## What kind of fork
One or two sentences.
## One-time setup
Commands with explanations.
## Sync now
Numbered commands with explanations.
## Conflicts
Bullets.
## Upstream changes to handle
Bullets, or "None".
## Staying current
Bullets.
</output_format>
