---
schema: 1
id: reduce-recurring-merge-conflicts
kind: prompt
title: Reduce recurring merge conflicts
description: Finds which files keep conflicting from repository history and removes the causes, such as shared registries, unsorted lists, formatter drift and long-lived branches.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [report, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [merge-conflicts, conflict-hotspots, team-workflow, code-layout]
pairs_with:
  prompts: [resolve-merge-conflict, find-hotspots-in-git-history, choose-branching-strategy, resolve-lockfile-merge-conflict]
args:
  - name: symptoms
    description: What keeps conflicting as the team sees it, for example "every PR conflicts in routes.ts and the changelog", plus team size and how long branches usually live.
    type: text
    required: true
  - name: since
    description: How far back to look, for example "6 months". Defaults to the last 6 months.
    type: text
output_contract:
  format: markdown
  sections: [Where conflicts happen, Causes, Fixes, Not worth fixing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams that fight the same conflicts every week usually blame git, but the causes are almost always structural and few. Append-only files that everyone edits at the end (a route table, a dependency-injection registry, a changelog, an enum, a translations file) conflict on every pair of branches because every change lands on the same lines. Lists kept in insertion order instead of sorted order do the same. Formatter or import-order drift, where people run different versions or settings, turns unrelated edits into whole-file conflicts. Generated files committed to the repository (lockfiles, snapshots, compiled assets, project files) conflict mechanically. And long-lived branches magnify all of it. Git keeps evidence: merge commits whose resolution differs from both parents show which files needed manual resolution, and pairs of branches touching the same files show where collisions come from. Fixes are cheap once the cause is named: sort lists, split registries into one file per entry, use a changelog fragments directory, pin and enforce the formatter, stop committing generated output, and shorten branch life.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#since}}
Period to examine: {{since}}
{{/since}}

1. Use the period given, or the last 6 months if none. Read the repository layout and the files the user names. Check for a formatter config, a pinned formatter version, pre-commit hooks and CI format checks.
2. Find the files that actually needed conflict resolution. Merge commits that differ from both parents are a good signal: `git log --merges --since=<period> --format=%H` and, for each, `git show --cc --stat <sha>` or `git diff-tree --cc` lists files with combined-diff hunks. Also count files changed by many branches: `git log --since=<period> --format= --name-only | sort | uniq -c | sort -rn | head -30`. If the host squash-merges and there are no merge commits, say so and rely on the change-frequency list plus the user's report.
3. For the top 5 to 10 files, read them and classify the cause: append-at-end registry, unsorted list, generated file, formatter drift, a hub file mixing many concerns, or simply a hot area under active development.
4. Check branch age: `git for-each-ref --sort=committerdate refs/remotes --format='%(committerdate:short) %(refname:short)'` and typical time from first commit to merge, if visible.
5. Propose one fix per cause, smallest first, with the concrete change: sort and keep sorted (with a lint rule if available), one file per entry with auto-discovery, changelog fragments, a `.gitattributes` `merge=union` only for files where line order truly does not matter, pinning the formatter and checking it in CI, removing generated files from the repository, or merging main more often and splitting big pull requests.
6. Estimate the effort and disruption of each fix and order them by conflicts removed per hour of work.
</task>

<constraints>
- Base claims on history and file contents you examined; mark anything from the user's report alone as reported, not measured.
- Do not recommend `merge=union` for code or structured files where duplicated or interleaved lines break the file.
- Do not reformat or restructure files as part of this analysis; this is a plan.
- If the conflicts come from real concurrent work on the same logic, say that structure will not fix it and coordination will.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where conflicts happen
Table: file, evidence (merge resolutions or change count), cause.
## Causes
One short paragraph per cause found.
## Fixes
Numbered, smallest first: the change, effort, expected effect.
## Not worth fixing
Hot spots that are just active work, and why to leave them.
</output_format>
