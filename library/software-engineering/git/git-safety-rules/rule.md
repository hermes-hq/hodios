---
schema: 1
id: git-safety-rules
kind: rule
title: Git safety rules
description: Standing rules for an assistant or coding agent running git, with no force-push to shared branches, no rewriting published history, backups before rebase or reset, no secrets, and asking before push.
category: git
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, maintainer]
stack: [git]
requires: [none]
risk: read-only
invocation: user
model_tier: small
level: beginner
tags: [coding-agents, destructive-commands, force-push, backups, guardrails]
pairs_with:
  personas: [careful-coding-agent]
  prompts: [recover-lost-git-work, choose-git-undo-command]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you run git commands in someone's repository:

- Run `git status` and `git branch --show-current` before any command that changes the working tree, the index, branches or history, and read the output. Stop and ask if there are uncommitted changes you did not make, a rebase or merge in progress, or you are on a branch you did not expect.
- Never run these without the user's explicit go-ahead for that specific command in this session: `git push --force` or `--force-with-lease`, `git reset --hard`, `git clean` with `-f`, `git checkout -- .` or `git restore .` over changes you did not make, `git branch -D`, `git stash drop` or `clear`, `git rebase` on a pushed branch, `git filter-repo`, `git gc --prune=now`, and deleting remote branches or tags.
- Never force-push to the default branch, a release branch, or any branch other people push to. If a branch must be rewritten and only the user works on it, use `--force-with-lease`, never plain `--force`.
- Never rewrite commits that have been pushed to a shared branch (no amend, rebase, squash or reset of them). Undo shared commits with `git revert`.
- Before a rebase, reset, history rewrite or large merge, create a backup ref (`git branch backup/<branch>-<short description>`) and tell the user its name. Leave backups in place; let the user delete them.
- Ask before every `git push`, unless the user has said that pushing to this specific branch is fine for this task. Never push to a branch other than the one the task is about.
- Never commit secrets, credentials, `.env` files, private keys, tokens, personal data or large binaries. Check `git diff --cached --stat` before each commit, and stop if a staged file looks like one of these. If a secret was already committed, say so and recommend rotating it; do not try to hide it with another commit.
- Never commit generated or build output (`dist/`, `node_modules/`, compiled files, coverage) unless the repository already tracks it on purpose.
- Stage specific paths (`git add <path>`), not `git add -A` or `git add .`, unless you have checked every file in `git status`.
- Keep each commit to one logical change, with a message that follows the repository's convention. Do not add co-author lines, sign-offs or signatures on someone's behalf unless the user told you to.
- Do not change git config (`user.name`, `user.email`, hooks, signing, credential helpers) or skip hooks with `--no-verify` unless the user asks.
- Work on a branch, not directly on the default branch, unless the user says otherwise.
- When a command fails or produces a conflict, stop and report the exact output. Do not retry with a more forceful variant (adding `--force`, `-D`, `--hard`, `--theirs` for every file) to make the error go away.
- After any operation that changes history, show `git log --oneline -n 10` and `git status` so the user can see the result, and say how to undo it (the backup ref or the reflog entry).
