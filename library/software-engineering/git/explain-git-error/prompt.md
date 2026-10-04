---
schema: 1
id: explain-git-error
kind: prompt
title: Explain a git error
description: Explains a git error or confusing state such as detached HEAD, rejected push or divergent branches in plain words, what caused it and the safest command to get out. Use when git stops you.
category: git
version: 1.0.0
status: incubating
stage: [build, learn]
role: [student, software-engineer]
stack: [git]
requires: [none]
inputs: [text, logs]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [error-messages, detached-head, push-rejected, plain-language]
pairs_with:
  prompts: [choose-git-undo-command, recover-lost-git-work, resolve-merge-conflict]
args:
  - name: error_output
    description: The exact message git printed, copied in full. Add the output of `git status` if you can.
    type: text
    required: true
  - name: what_i_was_doing
    description: The command you ran and what you were trying to do, for example "pushing my branch after my colleague merged theirs". Optional.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [What it means, Why it happened, Safest way out, Check it worked]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user hit a git error or a state they do not understand. They may be a student, a junior developer, or a designer or writer who uses git occasionally. Git's messages are accurate but written for people who already know its model, and the commands people find online to "fix" them (`--force`, `reset --hard`, deleting `.git` and recloning) often destroy work. A good answer translates the message, explains the cause in terms of their situation, and gives the least destructive way forward.
</context>

<task>
<error_output>
{{error_output}}
</error_output>
{{#what_i_was_doing}}
<what_i_was_doing>
{{what_i_was_doing}}
</what_i_was_doing>
{{/what_i_was_doing}}

1. Identify the message. Common ones: detached HEAD; push rejected (non-fast-forward, fetch first); divergent branches needing a pull strategy; refusing to merge unrelated histories; `index.lock` exists; untracked or local changes would be overwritten by checkout, merge or pull; merge or rebase in progress; authentication or permission denied; pathspec did not match; not a git repository; large file or protected branch rejected by the server; line-ending warnings.
2. Explain what git is protecting the user from, in one or two plain sentences, using a simple picture where it helps (for example "your branch and the remote branch each have commits the other does not").
3. Give the cause in their situation if the context allows; otherwise list the two most likely causes and the command that tells them apart (usually `git status`, `git log --oneline --graph --all -n 15` or `git remote -v`).
4. Give the safest way out as numbered commands, one per line, with a short comment on what each does. Prefer commands that keep work: commit or stash first, `git pull --rebase` or merge instead of force, `git switch -c` to keep commits made on a detached HEAD, `git merge --abort` or `git rebase --abort` to get back to where they were.
5. If the only fix is destructive (discarding changes, force-pushing, deleting a lock file while another git process may be running), put a clear **Warning** line before it, say what will be lost, and give a backup step first (`git branch backup-<name>` or copying the folder). For force-push, use `--force-with-lease` and only on a branch nobody else uses.
6. Give one command to confirm they are out of trouble, and what its output should look like.
</task>

<constraints>
- Plain language; define any git term the first time you use it (commit, branch, remote, HEAD).
- Never recommend `git push --force` to a shared branch, `git reset --hard`, `git clean -fd` or deleting the `.git` folder without the warning and backup above.
- If the message is cut off or the situation is unclear, say what to paste (the full message, `git status`) rather than guessing.
- If the error is from a hosting service policy (protected branch, required checks, file size limit), say that git cannot override it and who to ask.
- Keep the whole answer under about 250 words unless the situation needs more.
</constraints>

<output_format>
## What it means
One or two sentences.
## Why it happened
Short explanation, or the two likely causes with the command to tell them apart.
## Safest way out
Numbered commands in code blocks with comments, warnings before anything destructive.
## Check it worked
One command and what to look for.
</output_format>
