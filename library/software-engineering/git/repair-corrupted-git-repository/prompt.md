---
schema: 1
id: repair-corrupted-git-repository
kind: prompt
title: Repair a corrupted git repository
description: Recovers a repository with corrupt or missing objects, broken refs, a stuck index.lock or damage from cloud-sync folders, backing up the whole folder and saving uncommitted work first.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, student]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [logs, text]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [repository-corruption, git-fsck, index-lock, cloud-sync, data-recovery]
pairs_with:
  prompts: [recover-lost-git-work, explain-git-error, speed-up-large-repo]
args:
  - name: symptoms
    description: The exact errors, for example "error - object file .git/objects/ab/cd... is empty" or "fatal - bad object HEAD", what happened before (crash, power loss, disk full, the repo is in Dropbox or OneDrive), and whether the work is pushed somewhere.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Damage, Backup, Repair, Check, Prevent it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Repository corruption almost always comes from outside git: a crash or power loss during a write, a full disk, a failing drive, or a cloud-sync tool (Dropbox, OneDrive, iCloud, Google Drive) syncing `.git` between machines and producing empty object files or conflicted copies of refs. Most cases are recoverable because the damage is local and a remote holds most objects. The order matters: first copy the whole folder, because repair attempts can make things worse; then save uncommitted work from the working tree, which is plain files and usually intact even when `.git` is damaged; then find what is broken with `git fsck --full`; then restore missing objects from the remote or another clone. A stale `index.lock` only means a git process died; removing it is safe once no git process is running. A corrupt index can be rebuilt from HEAD without touching working files. Re-cloning and copying the working files over is often the fastest fix when everything important is pushed.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>

1. Stop other git activity: close IDEs and git GUIs, pause cloud sync for this folder, and check no git process is running.
2. Back up the whole repository folder, including `.git`, as a copy or archive next to it. Do not continue until this exists.
3. Save the working tree state: copy changed and untracked files listed by `git status` (if it runs) or, if not, the whole working tree excluding `.git`, so uncommitted work is safe regardless of what follows.
4. Diagnose with `git fsck --full` and the error messages. Classify: stale `index.lock`; corrupt index; empty or corrupt loose objects; missing objects; broken or conflicted refs (for example "main (conflicted copy)" files from a sync tool, or a ref containing zeros); damaged pack files.
5. Repair, one step at a time, rerunning `git fsck --full` after each:
   - stale lock: confirm no git process, then remove `.git/index.lock`;
   - corrupt index: move `.git/index` aside, then `git reset` (mixed, keeps working files) to rebuild it;
   - empty or corrupt objects: move the empty files aside, then `git fetch origin` to bring back objects the remote has; for objects nobody else has, check whether `git fsck` shows they belong to unpushed commits;
   - broken refs: restore the ref from `.git/logs/refs/...` or `git reflog`, or from the remote branch; delete sync-tool conflict copies after reading them;
   - unrecoverable: fresh clone, then copy the saved working files into it and review with `git diff`.
6. List any unpushed commits that could not be recovered and what survives of them in the saved working files.
7. If the folder is under a cloud-sync tool, recommend moving the repository out of it and using the remote for syncing.
</task>

<constraints>
- No repair step before the full backup exists.
- Never run `git gc --prune=now`, `git reset --hard`, `git clean` or delete `.git` contents beyond the specific damaged files without asking.
- Move damaged files aside rather than deleting them.
- If the disk itself may be failing, say to copy the data off the disk first.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Damage
What fsck and the errors show, and the likely cause.
## Backup
Where the folder copy and saved working files are.
## Repair
Numbered steps run, with results after each.
## Check
Final `git fsck --full` and `git status` results, and anything unrecoverable.
## Prevent it
One or two bullets.
</output_format>
