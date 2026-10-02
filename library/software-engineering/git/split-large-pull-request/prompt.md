---
schema: 1
id: split-large-pull-request
kind: prompt
title: Split a large pull request into a stack
description: Splits a large pull request into a stack of small, independently reviewable PRs with their order, dependencies and the branch commands to build them. Use when a PR is too big to review well.
category: git
version: 1.0.0
status: incubating
stage: [review, ship]
role: [software-engineer, tech-lead]
stack: [git]
requires: [none]
inputs: [diff, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pull-request, stacked-prs, code-review-size]
args:
  - name: diff_summary
    description: The PR's file list with line counts (for example `git diff --stat main...HEAD`), its description, and the full diff if it fits.
    type: text
    required: true
  - name: reviewers_concern
    description: What reviewers said or what makes this PR hard to review, for example "too many unrelated changes" or "can't tell what changes behaviour".
    type: text
output_contract:
  format: markdown
  sections: [Change inventory, Proposed stack, Branch commands, Merge plan, What stays together]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Review quality drops sharply as pull requests grow: big PRs get skimmed and approved, and their defects ship. Most large PRs combine several kinds of change that can be reviewed separately: mechanical changes (renames, moves, formatting, generated code), preparatory refactors, new code that is not yet called, schema or infrastructure changes, and the behaviour change itself. Split along those lines, each PR has one purpose, builds and passes tests on its own, and can merge independently or as a short stack.
</context>

<task>
Propose how to split this pull request:
{{diff_summary}}
{{#reviewers_concern}}Reviewers' concern: {{reviewers_concern}}{{/reviewers_concern}}

1. Inventory the changes, grouping files and hunks by kind: mechanical, preparatory refactor, new isolated code (not yet wired in), schema or migration, configuration or infrastructure, behaviour change, tests, docs. Note which groups depend on which.
2. Propose the stack, usually in this order: mechanical changes; preparatory refactors with no behaviour change; additive schema changes (expand) and new code behind a flag or not yet called; the behaviour change that wires it in; clean-up and contract steps. Each PR must compile and pass tests on its own, contain the tests for its own code, and have a single purpose stated in its title. Aim for each PR to be reviewable in under 30 minutes; say when a PR stays large and why that is acceptable (for example a generated file or a pure rename).
3. Mark which PRs are independent (can branch from main and merge in any order) and which must stack.
4. Give the commands to build the branches from the existing one without rewriting it: create each branch from the right base and bring over files with `git restore --source=<big-branch> -- <paths>` or hunks with `git checkout -p <big-branch> -- <path>`, then commit. For stacked branches, show how to keep them in sync when an earlier PR changes: `git rebase --update-refs` (Git 2.38 or newer) or `git rebase --onto`.
5. Describe how to verify the split lost nothing: the tip of the stack must have no diff against the original branch.
6. Write the merge plan: order, what each reviewer should focus on, and whether to retarget each PR to main after its parent merges.
</task>

<constraints>
- Base the plan on the files and changes in the input. If you only have a file list, say which groupings are guesses and ask for the diff of the files that matter.
- Keep anything that must change atomically in the same PR (a schema change and the code that requires it in the same deploy, a public API change and its callers in the same repository) and say why.
- Do not suggest splitting tests from the code they verify unless the team asks for it.
</constraints>

<output_format>
## Change inventory
Table: Group | Kind | Files | Approx. lines | Depends on.
## Proposed stack
Table: Order | PR title | Contents | Base branch | Independent or stacked | Reviewer focus.
## Branch commands
Code block with the commands to create each branch, plus the final check that nothing was lost.
## Merge plan
Numbered merge order and retargeting steps.
## What stays together
Bullets: changes that must stay in one PR and why.
</output_format>
