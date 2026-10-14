---
schema: 1
id: fix-git-submodule-problems
kind: prompt
title: Fix git submodule problems
description: Fixes submodules that are empty, detached, out of sync with the recorded commit, failing in CI, pointing at a lost commit or needing clean removal, with the exact commands.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer, embedded-engineer]
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
tags: [submodules, detached-head, nested-repositories, submodule-removal]
pairs_with:
  prompts: [choose-submodule-or-subtree, fix-git-in-ci-pipelines, grant-ci-access-to-private-repos]
args:
  - name: problem
    description: What is wrong, with the output of `git status` and `git submodule status`, for example "lib/sdk folder is empty after clone" or "git status always shows lib/sdk modified".
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
Almost every submodule problem follows from one fact: the parent repository records one exact commit for each submodule, not a branch. A plain clone leaves submodule folders empty until `git submodule update --init --recursive`. After pulling the parent, submodules stay on the old commit until updated again, so `git status` shows them as modified. Submodules are checked out in detached HEAD, so commits made inside them sit on no branch and are easy to lose. Pushing the parent with a new submodule commit that was never pushed in the submodule's own repository breaks everyone else's update with "not our ref" or "did not contain" errors. Changing a submodule's URL in `.gitmodules` does nothing locally until `git submodule sync`. Removing a submodule properly needs `git rm` plus cleaning `.git/modules/<name>`. `git submodule status` shows the state compactly: a leading `-` means not initialised, `+` means checked out at a different commit than recorded, `U` means a merge conflict.
</context>

<task>
<problem>
{{problem}}
</problem>

1. Gather state with read-only commands: `git submodule status --recursive`, `cat .gitmodules`, `git config --get-regexp '^submodule\.'`, and inside each affected submodule `git status` and `git log --oneline -3`. Check `git config submodule.recurse` and `diff.submodule`.
2. Diagnose which case applies: not initialised; behind the recorded commit after a pull; local commits inside the submodule on a detached HEAD; recorded commit missing from the submodule's remote; URL changed; conflict on the submodule pointer after a merge; authentication failure in CI; or a removal that left debris.
3. Fix with the minimal commands for that case:
   - not initialised or behind: `git submodule update --init --recursive`;
   - local work inside a detached submodule: create a branch there first (`git switch -c <name>`), push it, then record the new commit in the parent;
   - missing recorded commit: find who has it (the author's machine), push it to the submodule remote, or record a commit that exists, and say which;
   - URL changed: `git submodule sync --recursive` then update;
   - pointer conflict: choose the intended submodule commit (check both in the submodule), `git add <path>` and continue;
   - CI: checkout with submodules enabled and credentials that can read the submodule repositories, preferring relative URLs in `.gitmodules` where hosting allows;
   - removal: `git rm <path>`, remove `.git/modules/<path>` after confirmation, commit.
4. Before any command that discards submodule changes (`update --force`, `deinit -f`, deleting `.git/modules`), check for uncommitted or unpushed work inside the submodule and ask.
5. Suggest settings that prevent recurrence where they fit: `submodule.recurse true`, `push.recurseSubmodules check`, and `status.submoduleSummary true`.
</task>

<constraints>
- Never discard work inside a submodule without showing it and asking.
- Do not convert away from submodules here; if the user wants to, point to the choice between submodules and alternatives.
- Do not commit a submodule pointer to a commit that is not pushed to its remote.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
The case and the evidence from the status output.
## Fix
Numbered commands with what each does.
## Check
`git submodule status` and `git status` after the fix.
## Avoid next time
The settings or habits that prevent this.
</output_format>
