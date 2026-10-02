---
schema: 1
id: recover-lost-git-work
kind: prompt
title: Recover lost Git work
description: Recovers lost commits, branches, stashes or staged files with reflog and fsck, backing up the repository first and explaining each command. Use after a bad reset, rebase or dropped stash.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer]
stack: [git]
requires: [none]
inputs: [text, logs]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [reflog, data-recovery, git-fsck, stash]
args:
  - name: what_happened
    description: What you did and what is missing, in your own words, including the exact commands you ran if you remember them.
    type: text
    required: true
  - name: git_output
    description: Output of `git status`, `git reflog -n 30`, `git stash list` or any error messages you have.
    type: text
output_contract:
  format: markdown
  sections: [What likely happened, Stop and back up, Find it, Restore it, If it is not there]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git rarely deletes committed work immediately. A reset, rebase, amend or deleted branch only moves references; the old commits stay in the object store and in the reflog until garbage collection removes them, typically after weeks. A dropped stash is a dangling commit. Staged but uncommitted files exist as blobs. Only changes that were never committed or staged are outside Git's reach. The danger during recovery is panic: more resets, `git gc`, or re-cloning can destroy what is still recoverable.
</context>

<task>
Help recover lost work.

What happened:
{{what_happened}}
{{#git_output}}Output so far:
{{git_output}}{{/git_output}}

1. Classify the loss: commits lost by reset, rebase or amend; a deleted branch; a dropped or cleared stash; staged files lost by reset or checkout; uncommitted, unstaged changes overwritten; a force-pushed remote branch; or something else. If the description is ambiguous, ask the one question that decides it, and give the read-only commands that will show it.
2. Start with safety: stop running write commands, do not run `git gc` or `git prune`, and make a full copy of the repository directory (including `.git`) before changing anything.
3. Give read-only commands to locate the work, explaining what each one shows:
   - `git reflog` and `git reflog show <branch>` for previous positions of HEAD and branches; `ORIG_HEAD` after a reset, rebase or merge;
   - `git fsck --lost-found` or `git fsck --unreachable --no-reflogs` for dangling commits and blobs, including dropped stashes (stash commits have messages starting "WIP on" or "On <branch>");
   - `git show <sha>` and `git log -p <sha>` to confirm a candidate is the lost work.
4. Restore without overwriting anything: create a new branch at the found commit (`git branch recovered/<name> <sha>`), apply a stash commit with `git stash apply <sha>`, or write a blob to a new file with `git show <sha> > recovered-file`. Only then compare and merge into the working branch.
5. If the lost changes were never committed or staged, say so plainly and list the places that might still hold them: editor or IDE local history, editor swap or backup files, OS snapshots or backups, a copy in another clone, CI artifacts, or an open pull request.
6. If the remote branch was force-pushed, check other clones and the reflog of whoever pushed, and the hosting service's pull request or activity views for the old head commit.
</task>

<constraints>
- Every command you give is read-only until the user has a backup. Label each command read-only or writes.
- Never suggest `git reset --hard`, `git checkout -- .`, `git clean`, `git gc` or `git prune` during recovery.
- Do not claim a commit is the lost work until its contents have been checked with `git show`.
- If you need output you do not have, ask for it with the exact command, and wait.
</constraints>

<output_format>
## What likely happened
Two or three sentences, and the one question to ask if unsure.
## Stop and back up
The backup command for the user's platform.
## Find it
Numbered read-only commands, each with what to look for in the output.
## Restore it
Commands to restore onto a new branch or file, then how to bring it back into the working branch.
## If it is not there
Where else the work may survive, in order of likelihood.
</output_format>
