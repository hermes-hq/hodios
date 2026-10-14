---
schema: 1
id: fix-commit-author-identity
kind: prompt
title: Fix the wrong author on git commits
description: Fixes commits made with the wrong name or email, choosing between a .mailmap, amending recent unpushed commits or rewriting history, and sets the identity right per repository so it stops recurring.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan, config]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [author-email, mailmap, commit-identity, includeif, history-rewrite]
pairs_with:
  prompts: [set-up-git-on-new-machine, set-up-commit-signing, purge-file-from-git-history, choose-git-undo-command]
  rules: [git-safety-rules]
args:
  - name: problem
    description: What is wrong and where, for example "last 4 commits on my feature branch used my personal email" or "300 commits in our main history show three different names for me". Say whether the commits are pushed and whether others use the branch.
    type: text
    required: true
  - name: goal
    description: What you need, for example "commits must count on my work account", "remove my personal email from the public repo", or "just make the history and statistics consistent".
    type: string
---
<context>
You help fix commits that carry the wrong author name or email. The right tool depends on whether the commits are pushed and on the goal. If they are local, amending or an interactive rebase with `--reset-author` is cheap. If they are on a shared branch, rewriting changes every hash after the first fixed commit, breaks other people's clones and open pull requests, and drops signatures; for display and statistics, a `.mailmap` file maps old identities to the right one without rewriting anything. Removing a leaked personal email from a public repository does need a rewrite (with git filter-repo and its mailmap option), and even then forks and clones keep the old data. Hosting sites link commits to accounts by email, so the fix may also be adding the email to the account. Prevention is per-directory identity with `includeIf` in the global config.

<problem>
{{problem}}
</problem>

{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Restate the situation: how many commits, pushed or not, shared or not, and the goal. If it is unclear whether the commits are pushed or shared, give the commands to check (`git log --format='%h %an <%ae>' <range>`, `git branch -r --contains <commit>`) and ask.
2. Pick the least disruptive fix that meets the goal and say why, from: add the email to the hosting account; add a `.mailmap`; amend the last commit; rebase a range with `--exec 'git commit --amend --no-edit --reset-author'`; rewrite the full history with git filter-repo and a mailmap.
3. Give exact commands for the chosen fix, after a backup branch or a mirror clone for full rewrites. For `.mailmap`, show the file format.
4. If history is rewritten and shared: what collaborators must do (re-clone or reset to the new branch), what happens to open pull requests, signatures and tags, and that forks keep the old identity.
5. Prevent it: set `user.email` per repository, or `includeIf "gitdir:..."` blocks in the global config, and a check (`git config user.email` in the repo) before committing.
</task>

<constraints>
- Prefer `.mailmap` or the hosting account fix over rewriting shared history when the goal is display or attribution.
- Before any rewrite, require a backup and warn that hashes and signatures change. Use `--force-with-lease`, never plain `--force`, and only after the team agrees.
- Do not promise that a rewrite removes an email from every copy; forks, clones and caches keep it.
- Use placeholders for names and emails; never invent them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Situation
Two or three sentences.
## Recommended fix
The choice and why.
## Commands
Numbered commands, each with a one-line explanation.
## If history was rewritten
Bullets, or "Not needed".
## Stop it happening again
Config snippet and a check.
</output_format>
