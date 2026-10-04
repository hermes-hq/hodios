---
schema: 1
id: set-up-git-lfs
kind: prompt
title: Set up Git LFS
description: Sets up Git Large File Storage for a repository with tracking patterns, optional migration of existing large files, CI and clone settings, and storage and bandwidth quota considerations.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, game-developer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [git-lfs, large-files, binary-assets, history-rewrite, monorepo]
pairs_with:
  prompts: [purge-file-from-git-history]
args:
  - name: file_types
    description: The large or binary files involved, with typical sizes, for example "PSD and PNG textures up to 200 MB, FBX models, WAV audio, a 2 GB sample dataset in data/raw".
    type: text
    required: true
  - name: repo_size
    description: Current repository facts if known, for example "4.3 GB .git, 9 years of history, 60 contributors, hosted on GitHub". Leave empty if unknown.
    type: string
  - name: history_rewrite_ok
    description: True only if the team has agreed to rewrite history so existing large files move into LFS. Rewriting changes every commit hash and needs everyone to re-clone.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Recommendation, Tracking patterns, Setup steps, Existing files, CI and clones, Quotas and cost, Team checklist, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git LFS replaces large files in the repository with small pointer files and stores the content on an LFS server. Set up badly, it causes more pain than it removes: patterns that miss files or catch source code; `.gitattributes` committed after the files, so they stay in normal history; contributors without LFS installed committing raw binaries or pointer files; CI downloading gigabytes on every job; hosting quotas for storage and bandwidth exhausted without warning; and history rewrites done without warning that strand everyone's local clones and open pull requests. Tracking only affects new commits. Moving files already in history requires a rewrite, which is a team decision.
</context>

<task>
Plan the Git LFS setup for these files: {{file_types}}

Repository: {{repo_size}}
History rewrite agreed: {{history_rewrite_ok}}

1. Decide what belongs in LFS. Recommend LFS for large binaries that change (art, audio, video, models, compiled assets that must be versioned). Say when something should not be in Git at all (build outputs, generated files, very large datasets better kept in object storage or a data versioning tool) and when small text formats should stay as normal files.
2. Write the tracking patterns as `.gitattributes` lines, as specific as possible (by extension and, where useful, by directory). Mark files that cannot be merged as lockable if the team edits them concurrently, and explain file locking briefly.
3. Give the setup steps in order: install and `git lfs install` for every contributor, add the patterns with `git lfs track`, commit `.gitattributes` before or with the first large file, and verify with `git lfs ls-files` and `git lfs status`.
4. Existing large files:
   - If {{history_rewrite_ok}} is false: do not rewrite. New versions go to LFS from now on, and existing history keeps its size. Show how to find the largest blobs in history so the team can decide later, and what a rewrite would involve.
   - If true: give the rewrite plan with `git lfs migrate import` (with `--include` patterns and `--everything` or specific refs), preceded by a full mirror backup, a freeze on merges, and followed by force-pushing all branches and tags, every contributor re-cloning, and open pull requests being recreated. Note that the old objects stay on the host until it garbage collects them, so the quota may not drop immediately.
5. CI and clones: how to skip or limit LFS downloads in jobs that do not need the files (for example `GIT_LFS_SKIP_SMUDGE=1` then `git lfs pull --include` for the paths a job needs), caching LFS objects between runs, and partial clone or sparse checkout for contributors who need only part of the repository.
6. Quotas and cost: explain that LFS hosting usually meters storage and bandwidth separately, that every CI checkout counts toward bandwidth, and that deleting a file in a commit does not free LFS storage. Tell the user to check their host's current limits rather than relying on numbers from you.
7. Add a team checklist and a safeguard against raw binaries sneaking in (a pre-commit or server-side check for files over a size limit, or a CI check that tracked patterns are pointers).

If {{file_types}} does not say which file types or rough sizes are involved, ask for that and stop, because the patterns depend on it.
</task>

<constraints>
- Do not recommend a history rewrite unless {{history_rewrite_ok}} is true, and even then present it with its backup and coordination steps, never as a quick command.
- Do not state current quota figures or prices for any host; tell the user where to check.
- Keep commands copy-pasteable and in a safe order.
</constraints>

<output_format>
## Recommendation
What goes into LFS, what does not, and why, in a short paragraph.
## Tracking patterns
The `.gitattributes` content in a fenced block.
## Setup steps
Numbered commands with one line each on what they do.
## Existing files
The path chosen (no rewrite, or rewrite plan) with steps.
## CI and clones
Configuration snippets and guidance.
## Quotas and cost
What to check and how to keep usage down.
## Team checklist
Checkboxes for every contributor and for the maintainer.
## Risks
What can go wrong and how to detect it.
</output_format>
