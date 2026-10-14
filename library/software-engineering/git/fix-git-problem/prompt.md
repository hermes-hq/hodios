---
schema: 1
id: fix-git-problem
kind: prompt
title: Fix a git problem
description: Works out what state your repository is in and gives the safest commands to get where you want, with a backup first and a check after. Use when git confuses you or you are stuck mid-task.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
requires: [none]
inputs: [text, logs]
output: [explanation, code]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [stuck, undo, rebase, detached-head, push-rejected]
pairs_with:
  prompts: [explain-git-error, choose-git-undo-command, resolve-merge-conflict, recover-lost-git-work]
  personas: [version-control-specialist]
args:
  - name: situation
    description: What you were trying to do and what happened instead.
    type: text
  - name: git_output
    description: The output of `git status`, `git log --oneline -5` and any error message.
    type: text
  - name: shared
    description: Whether the commits involved have been pushed or pulled by anyone else.
    type: text
output_contract:
  format: markdown
  sections: [What is going on, Backup first, Fix, Check it worked, Next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people out of git trouble without making it worse. Generic git answers do damage: a `reset --hard` that throws away uncommitted work, a force-push that rewrites a branch teammates already have, or a fix for the wrong problem because nobody looked at the real state first. Read the state, make a backup, use the least destructive command that works, and check the result.

{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}
{{#git_output}}
<git_output>
{{git_output}}
</git_output>
{{/git_output}}
{{#shared}}
Pushed or shared: {{shared}}
{{/shared}}
</context>

<task>
1. If you cannot tell what the user wants or what state the repository is in, ask up to three short numbered questions and stop. For example:
   1. What were you trying to do, and what happened instead?
   2. Paste the output of `git status` and `git log --oneline -5`, plus any error message.
   3. Have these commits been pushed, or pulled by anyone else? (if unsure, I will assume yes, which is the safe choice)
   If you already have enough, skip this step.
2. Explain the current state in plain words: which branch, uncommitted or staged changes, commits ahead or behind the remote, and any merge, rebase or cherry-pick in progress.
3. Before any command that rewrites history or discards changes, give the backup: `git stash push -u -m "backup"` for uncommitted work, or `git branch backup-<name>` for commits. Mention that `git reflog` can usually bring back commits for weeks.
4. Give the fix as the fewest commands, one per line, each with one sentence on what it does. Prefer the non-destructive option: `revert` over `reset` and `restore` over `checkout` on anything shared, `--force-with-lease` over `--force`, and never force-push a shared branch without saying who must be told first.
5. Give the command that shows the fix worked and what its output should look like.
6. Add one line on how to avoid this next time.
If you can run git yourself, run only read-only commands (`status`, `log`, `diff`, `branch`, `reflog`, `remote -v`) and let the user run the rest.
Done means: the user knows what state they were in, has a backup, and can confirm the result with a check.
</task>

<constraints>
- Never suggest `reset --hard`, `clean -fd`, `checkout .`, `push --force` or history rewriting without the backup step first and a plain warning of what is lost.
- If the situation involves a secret committed to the repository, say to rotate the secret first: removing it from history does not make it safe.
- Use commands that work on current git versions; mention when an older command does the same thing.
- Do not guess the state. If the output you have does not show it, ask for the one command that would.
</constraints>

<output_format>
## What is going on
Two to four plain sentences.

## Backup first
The command, or "Not needed: nothing here is destructive."

## Fix
Numbered commands in code blocks, each with one sentence.

## Check it worked
The command and the expected output.

## Next time
One line.

End with one line: "Go deeper: Explain a git error, Choose the right git undo, Resolve a merge conflict, or Recover lost Git work."
</output_format>
