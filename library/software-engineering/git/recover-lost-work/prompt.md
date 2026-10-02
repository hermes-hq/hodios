---
schema: 1
id: recover-lost-work
kind: prompt
title: Recover lost git work
description: Recovers commits, branches and stashes lost to a reset, rebase, deleted branch or dropped stash, using the reflog and unreachable objects. Use right after a git mistake.
category: git
version: 1.0.0
status: experimental
stage: [maintain]
role: [software-engineer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [text, repo]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [reflog, data-recovery]
args:
  - name: situation
    description: What happened, in your words, including the commands you ran if you remember them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What happened, Candidates, Recovery, Cannot be recovered]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git rarely deletes committed work immediately. A commit that no branch points to stays in the object database and in the reflog (90 days for reachable entries and 30 for unreachable ones by default) until garbage collection removes it. Staged content survives as dangling blobs. Changes that were never staged or committed are not in git at all. The main risk during recovery is a second mistake, so the first job is to stop anything that could trigger garbage collection or overwrite more work.
</context>

<task>
Help recover the work described here: {{situation}}

1. Do not run anything that changes refs, the index or the working tree yet. Do not run `git gc`, `git prune` or `git reflog expire`.
2. Record where things stand: `git status`, `git branch -a`, and the current `HEAD`.
3. Find candidates with the source that fits the situation:
   - reset, amend, rebase or commit on the wrong branch: `git reflog` and `git reflog show` for the branch.
   - deleted branch: `git reflog` entries that mention the branch, or the sha printed when it was deleted.
   - dropped or cleared stash: `git fsck --unreachable --no-reflogs`, then inspect each unreachable commit whose message starts with "WIP on" or "On".
   - staged but never committed files: `git fsck --lost-found`, then inspect the dangling blobs.
4. For each candidate show the sha, date, subject and a `--stat` summary so the user can recognise it. Rank by how well it matches the description.
5. Recover by creating a new branch at the chosen commit (`git branch rescue/NAME SHA`) or by applying a stash commit with `git stash apply SHA`. These add a reference and move nothing. Only propose resetting or force-moving an existing branch after the user confirms the rescued branch has what they need, and show the exact command.
</task>

<constraints>
- Never run `reset --hard`, `checkout -- .`, `clean`, `push --force`, `branch -D` or history-rewriting commands on the user's behalf. Print them for the user to run if they are needed.
- Be honest about what is gone: changes that were never staged or committed cannot be recovered from git. Suggest editor local history, IDE backups or file-sync versions instead, and do not imply git can bring them back.
- If the lost work was already pushed, say that the remote (or a teammate's clone) also has it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What happened
One or two sentences in plain words: which command moved what.
## Candidates
A table: sha | date | subject | files changed | match (high, medium, low).
## Recovery
The exact commands to restore the best candidate, safe ones first, and how to check the result.
## Cannot be recovered
What is not in git and where else to look, or "Nothing" if everything is recoverable.
</output_format>
