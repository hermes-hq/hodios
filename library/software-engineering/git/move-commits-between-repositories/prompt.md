---
schema: 1
id: move-commits-between-repositories
kind: prompt
title: Move commits between repositories
description: Carries commits or a patch between repositories that share no history, using format-patch, am and apply with three-way fallback, and fixes patches that fail to apply because paths or code differ.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, maintainer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, diff, text]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [format-patch, git-am, three-way-apply, patch-series, cross-repository]
pairs_with:
  prompts: [backport-fix-to-release-branches, resolve-merge-conflict, extract-folder-into-new-repo]
args:
  - name: source_and_target
    description: Where the commits come from and where they go, for example "commits abc..def in our old monolith, into the new payments repo where the code now lives under src/payments", or a pasted patch or diff.
    type: text
    required: true
  - name: keep_authorship
    description: Whether the original authors, dates and messages must be preserved, for example for licensing or audit.
    type: text
output_contract:
  format: markdown
  sections: [Route, Applied, Check, Left for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cherry-pick only works inside one repository's object store. To carry work between repositories without shared history (a monolith and an extracted service, a vendored copy and its upstream, two forks that diverged long ago), the reliable tools are `git format-patch` to export commits as mail-formatted patches with author, date and message, and `git am` to replay them. Patches fail for predictable reasons: the files live at a different path (fixed with `--directory=` or `-p<n>` on apply, or by rewriting paths in the patch), the surrounding code drifted (fixed with `git am -3` when the target has the preimage blobs, or by applying with `--reject` and finishing the rejected hunks by hand), or line endings and whitespace differ (`--ignore-whitespace`, `--keep-cr`). Adding the source repository as a temporary remote and fetching it makes three-way apply and even cherry-pick possible, which is often simpler than patch files.
</context>

<task>
<source_and_target>
{{source_and_target}}
</source_and_target>
{{#keep_authorship}}
Authorship requirement: {{keep_authorship}}
{{/keep_authorship}}

1. Inspect both repositories: the commits to move (`git log --stat <range>` in the source), the matching paths in the target, and whether the target's working tree is clean. Create a branch in the target for the import.
2. Choose the route and say why: temporary remote plus cherry-pick when both are reachable locally (`git remote add src <path>`, `git fetch src`); otherwise `git format-patch <range> -o <dir>` and `git am`.
3. Map paths: if the code moved, use `git am --directory=<prefix>` or `-p<n>`, or `git apply` with the same options; state the mapping you chose.
4. Apply one patch at a time with `git am -3`. On failure, read the rejected hunk against the target's current code, apply what still makes sense by hand, `git add`, and `git am --continue`. If a hunk no longer applies because the target already has an equivalent change, skip it and say so.
5. After the series, run the target's build and tests. Compare the net change with the source diff and list any intentional differences.
6. Clean up: remove the temporary remote and patch directory. Report the commits created with their original authors and messages, and add a trailer such as `(cherry picked from <repo>@<sha>)` if traceability matters.
</task>

<constraints>
- Preserve original authorship unless the user says otherwise; never claim authorship of someone else's commit.
- Do not edit the source repository.
- Never skip a failing patch silently; every skipped or hand-applied hunk appears in the report.
- Ask before pushing the import branch.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Route
Remote-and-cherry-pick or patch files, and the path mapping.
## Applied
Table: source commit | target commit | clean, three-way or hand-fixed | notes.
## Check
Build and test results, and how the net change compares with the source.
## Left for you
Skipped hunks or decisions, or "None".
</output_format>
