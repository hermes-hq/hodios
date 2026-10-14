---
schema: 1
id: speed-up-large-repo
kind: prompt
title: Speed up git in a large repository
description: Diagnoses slow clone, fetch, status or checkout in a large repository and applies the matching fixes, such as partial clone, sparse checkout, fsmonitor, commit-graph and scheduled maintenance.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, devops-engineer]
stack: [git]
requires: [none]
inputs: [text, logs]
output: [plan, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [partial-clone, sparse-checkout, fsmonitor, git-performance, large-repos]
pairs_with:
  prompts: [set-up-git-lfs, purge-file-from-git-history, extract-folder-into-new-repo]
args:
  - name: symptoms
    description: Which operations are slow and how slow (clone, fetch, status, checkout, log, blame), repository size (`git count-objects -vH`), number of files, git version, operating system, and whether this is for developers or CI.
    type: text
    required: true
---
<context>
You help make git fast in a large repository. Slowness has distinct causes with distinct fixes. Slow clone and fetch come from total history and object size: partial clone (`--filter=blob:none`) defers file contents, shallow clone suits throwaway CI checkouts but breaks some history operations, and large binaries belong in LFS. Slow status and checkout come from the number of files in the working tree: sparse checkout in cone mode limits it, the built-in fsmonitor and untracked cache avoid rescanning, and antivirus scanning on Windows makes it much worse. Slow log, blame and merge-base come from walking commits: the commit-graph file and `git maintenance` fix most of it. Features differ by git version, so the version matters. Developers and CI need different settings.

<symptoms>
{{symptoms}}
</symptoms>
</context>

<task>
1. Map each slow operation to its likely cause (history size, object size, working tree file count, commit walking, network, platform). If key facts are missing (git version, file count, which operation), list the commands to gather them (`git version`, `git count-objects -vH`, `git ls-files | wc -l`, `GIT_TRACE2_PERF=1 git status`) and give a provisional plan.
2. For clone and fetch: recommend partial clone or shallow clone per use case (developer versus CI), with commands and their trade-offs (on-demand downloads need network; shallow breaks blame and some merges).
3. For status and checkout: sparse checkout in cone mode with the folders a developer needs, `core.fsmonitor` and `core.untrackedCache`, and platform notes such as excluding the repository from antivirus scans on Windows where policy allows.
4. For history operations: `git maintenance start` (or `git commit-graph write --reachable` for one-off runs) and what it schedules.
5. Note when the real fix is in the repository content: large binaries that belong in LFS, generated files committed by mistake, or a monorepo that should use a dedicated tool such as Scalar where available.
6. Give a measured approach: time the slow commands before and after each change, and change one thing at a time.
7. Write the resulting config as a snippet, separately for developers and CI.
</task>

<constraints>
- State the git version each feature needs only if you are sure; otherwise say "recent git versions" and tell the user to check the release notes for their version.
- Do not recommend shallow clones for developer machines without naming what breaks.
- Do not suggest disabling security tools; mention exclusions only as something to agree with whoever owns the policy.
- Do not invent timings; ask the user to measure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Table: operation | likely cause | evidence or command to confirm.
## Fixes for developers
Numbered, with commands and trade-offs.
## Fixes for CI
Numbered, with commands and trade-offs.
## Repository content issues
Bullets, or "None seen".
## Measure
How to time before and after.
## Config snippets
Developer and CI snippets.
</output_format>
