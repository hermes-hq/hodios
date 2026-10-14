---
schema: 1
id: fix-git-lfs-problems
kind: prompt
title: Fix Git LFS problems
description: Fixes Git LFS trouble such as pointer files checked out as text, missing objects, smudge errors, quota limits, and files wrongly in or out of LFS, without losing content.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, game-developer, data-scientist]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, logs, text]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [git-lfs, pointer-files, smudge-filter, storage-quota, binary-assets]
pairs_with:
  prompts: [set-up-git-lfs, fix-git-in-ci-pipelines, purge-file-from-git-history, fix-push-blocked-by-large-file]
args:
  - name: problem
    description: What is wrong and the exact error output, for example "textures open as small text files starting with version https://git-lfs" or "smudge filter lfs failed", plus the hosting service.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Fix, Check, Avoid next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git LFS replaces large files in commits with small pointer files and stores the content separately, and almost every LFS problem is a mismatch between pointers and content. If LFS is not installed or its filters are not configured (`git lfs install`), a checkout leaves pointer text files where images or models should be. If someone committed a file that matches an LFS pattern without LFS installed, the real content went into git and the next LFS user sees it as "should have been a pointer"; `git lfs migrate import --no-rewrite` or a re-add fixes new commits without rewriting history. If someone pushed commits but not the LFS objects (pushing to a remote without LFS support, or a failed upload), others get "object does not exist on the server" and only the original author's machine has the content. Host storage and bandwidth quotas can make downloads fail for everyone. CI often clones with LFS disabled to save bandwidth, so builds use pointer files. `git lfs ls-files`, `git lfs status`, `git lfs env` and `git lfs fsck` reveal most of this quickly.
</context>

<task>
<problem>
{{problem}}
</problem>

1. Gather state with read-only commands: `git lfs version`, `git lfs env`, `cat .gitattributes`, `git lfs ls-files | head`, `git lfs status`, and for an affected file `head -c 200 <file>` to see if it is a pointer. Run `git lfs fsck` to check local objects and pointers.
2. Diagnose the case: LFS not installed or filters missing; files are pointers because content was not pulled; objects missing on the server; files that match a pattern but were committed as plain git objects; files that should be in LFS but are not; quota or bandwidth exceeded; CI checkout without LFS; or lock conflicts on lockable files.
3. Fix with the minimal commands:
   - filters missing: `git lfs install`, then `git lfs pull`;
   - pointers in the working tree: `git lfs pull` (or `git lfs pull --include=<path>` to limit download);
   - missing on the server: find a machine that has the objects (`git lfs ls-files` with `git lfs fsck` there) and run `git lfs push --all origin` from it;
   - committed outside LFS by mistake: for future commits, re-add the files (`git rm --cached` then `git add`) and commit; rewriting history to move old blobs into LFS is a separate, coordinated decision;
   - quota: check the host's usage page, and reduce downloads with include and exclude patterns or fetch settings;
   - CI: enable LFS in the checkout step and cache LFS objects.
4. Before anything that overwrites working files (`git lfs checkout`, `git checkout -- .`, `git reset --hard`), check `git status` for local changes and ask.
5. Suggest prevention that fits: `git lfs install` in onboarding, a hook or CI check that fails on pattern-matching files committed outside LFS, and correct patterns in `.gitattributes`.
</task>

<constraints>
- Do not rewrite shared history (`git lfs migrate import` without `--no-rewrite`) without explicit agreement and a coordination plan.
- Do not delete local LFS objects (`git lfs prune`) while any of them might be the only copy of objects missing on the server.
- Do not invent host quota numbers; tell the user where to look.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
The case and the evidence.
## Fix
Numbered commands with what each does.
## Check
`git lfs fsck`, `git lfs ls-files` or file checks after the fix.
## Avoid next time
Prevention steps that fit this team.
</output_format>
