---
schema: 1
id: revert-feature-across-many-commits
kind: prompt
title: Revert a feature spread over many commits
description: Backs out a feature whose commits are scattered among other work on a shared branch, as one reviewable revert, after checking for later changes that depend on it.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [revert, feature-removal, dependency-check, shared-branch]
pairs_with:
  prompts: [revert-merged-pull-request, investigate-code-history, resolve-merge-conflict]
args:
  - name: feature
    description: The feature to remove and how to recognise its commits, for example a ticket id in messages, an author and date range, a list of PRs, or the files and flags it introduced.
    type: text
    required: true
  - name: branch
    description: The branch to remove it from, if not main.
    type: text
output_contract:
  format: markdown
  sections: [Feature commits, Dependents, Approach, Done, Check, Data and migrations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Removing a feature that landed over weeks in many commits, interleaved with other people's work, is harder than reverting one PR. The commits must be found reliably (ticket ids in messages are often missing on some), reverted newest first so each revert applies to the code it changed, and gathered into one commit or PR so reviewers see the whole removal at once. The hard part is dependency: later commits by others may extend the feature's code, rename things inside it, or rely on a helper it added. Reverting blindly either conflicts or, worse, applies cleanly and breaks those later changes at runtime. Sometimes a forward removal (delete the feature's code by hand, keep the shared helpers) is clearer than a stack of reverts, and turning the feature off behind its flag is the fastest safe option if one exists.
</context>

<task>
Remove this feature{{#branch}} from {{branch}}{{/branch}}: {{feature}}

1. Find the feature's commits by every route available: message search (`git log --grep`), PR merge commits, files and symbols it introduced (`git log -S<symbol>`), author and date range. Show the candidate list with the evidence for each and ask the user to confirm it before reverting.
2. Find dependents: commits not in the list that touch the same files or use symbols the feature added, after the feature's first commit. For each, say whether it extends the feature (revert it too), uses a shared helper (keep the helper), or is unrelated.
3. If the feature has a flag or config switch, say so and offer turning it off as the immediate step.
4. Choose the approach and say why: one combined revert (`git revert --no-commit` for each commit, newest first, then one commit) or a forward removal commit when the reverts would conflict heavily with later work.
5. On a new branch from the up-to-date target, carry out the approach. Resolve conflicts by removing the feature's behaviour while keeping later unrelated changes.
6. Search for leftovers: dead imports, routes, migrations, config keys, feature flags, docs and tests that still mention the feature. Database migrations get special care: never revert a migration that already ran in production without a separate down-migration plan.
7. Run the build and the full test suite. Write the commit message listing every reverted commit sha and the reason.
8. Show the push and PR commands and wait for confirmation.
</task>

<constraints>
- Do not revert anything until the user has confirmed the commit list.
- Never rewrite the shared branch's history; removal is a new commit.
- Do not drop a later colleague's unrelated change to make a revert apply.
- Flag every database or data change separately; code reverts do not undo data.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Feature commits
Table: sha | message | evidence it belongs to the feature.
## Dependents
Table: sha | what it does | decision (revert too, keep, unrelated).
## Approach
Combined revert, forward removal or flag-off, and why.
## Done
What was changed, leftovers removed, and the commit message.
## Check
Build and test results.
## Data and migrations
What a code revert does not undo, or "None".
</output_format>
