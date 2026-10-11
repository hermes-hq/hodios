---
schema: 1
id: fix-push-blocked-by-large-file
kind: prompt
title: Fix a push blocked by a large file
description: Fixes a push rejected by the host's file size limit by removing the file from the local unpushed commits only, then moving it to Git LFS, external storage or the ignore list.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, data-scientist, student]
stack: [git]
requires: [repo-read, shell, git]
inputs: [logs, text]
output: [report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [large-file, push-rejected, unpushed-commits, file-size-limit]
pairs_with:
  prompts: [set-up-git-lfs, purge-file-from-git-history, write-gitignore-file]
args:
  - name: push_error
    description: The full push error output, and what the large file is (a dataset, a build output, a video, a model file).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What blocked the push, Fix, Where the file lives now, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hosting services reject pushes that contain a file over their limit (commonly around 100 MB, with warnings earlier; check your host's current limit). People then delete the file and commit again, and the push still fails, because the file is still inside an earlier commit that is being pushed. When none of those commits have been pushed yet, the fix is local and cheap: rewrite only the unpushed commits so the file never enters them. Nobody else is affected, so a full history rewrite tool is overkill. What to do with the file afterwards depends on what it is: build outputs and downloaded data belong in the ignore list, assets that must be versioned with the code belong in Git LFS, and big datasets or models usually belong in object storage or a data-versioning tool with a pointer in the repository.
</context>

<task>
<push_error>
{{push_error}}
</push_error>

1. Read the error: the file paths and sizes, and the branch being pushed.
2. Find every unpushed commit that contains the file: `git log --oneline origin/<branch>..HEAD -- <path>` (use the default branch if the branch has no upstream), and confirm with the user that none of these commits were pushed or shared.
3. Make a backup ref: `git branch backup/before-large-file-fix`.
4. Remove the file from the unpushed commits:
   - only the last commit added it: `git rm --cached <path>` then `git commit --amend`;
   - an earlier unpushed commit added it: `git rebase -i origin/<branch>`, mark that commit `edit`, `git rm --cached <path>`, `git commit --amend`, `git rebase --continue`.
   If later unpushed commits also changed the file, the rebase stops on each of them; remove it there the same way. The file stays on disk in all cases.
5. Decide where the file goes and do it: add it to `.gitignore`; or track it with LFS (`git lfs track`, commit `.gitattributes`, re-add the file); or move it to storage and commit a small pointer or download instructions. Ask if the right home is unclear.
6. Verify the large blob is gone from what will be pushed: `git rev-list --objects origin/<branch>..HEAD` should not list it, and `git log --stat origin/<branch>..HEAD` should not show it. Then show the push command and wait for confirmation.
7. If any commit containing the file was already pushed, stop: this needs a shared history rewrite, and point to the purge procedure instead.
</task>

<constraints>
- Do not delete the file from disk; only remove it from git.
- Rewrite only commits that were never pushed. If that is not certain, ask.
- Do not suggest raising limits or splitting the file to dodge the limit when the file does not belong in git.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What blocked the push
File, size and the commits that contain it.
## Fix
Numbered commands with what each does.
## Where the file lives now
Ignore list, LFS or storage, and why.
## Check
Evidence the file is no longer in the outgoing commits, and the push command.
</output_format>
