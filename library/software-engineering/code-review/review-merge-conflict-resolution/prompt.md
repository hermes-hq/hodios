---
schema: 1
id: review-merge-conflict-resolution
kind: prompt
title: Review a merge conflict resolution
description: Reviews how someone resolved merge or rebase conflicts by comparing both parents with the result, catching dropped changes, duplicated code, semantic conflicts and edits outside the conflict hunks.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [none]
inputs: [diff, file]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [merge-conflicts, merge-commit, rebase, semantic-conflict, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [resolve-merge-conflict, review-pull-request]
args:
  - name: ours_change
    description: The change on the branch being merged into (for example main) since the merge base, as a diff, or a summary of what it did.
    type: text
    required: true
  - name: theirs_change
    description: The change on the incoming branch since the merge base, as a diff, or a summary of what it did.
    type: text
    required: true
  - name: resolution
    description: The resolved result for the conflicted files, or the merge commit's combined diff, plus any changes the resolver made outside conflict markers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Intent check, Findings, Semantic conflicts, Checks to run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Merge resolutions are the least reviewed code in most repositories: the merge commit's diff looks enormous or empty, reviewers approve the branch before it was rebased, and the resolver was in a hurry to get CI green. The common failures are taking one side wholesale and silently dropping the other side's fix, keeping both sides so a call happens twice or a function is defined twice, resolving the text correctly while the logic breaks (one side renamed a parameter, the other added a new caller with the old name), and "while I was here" edits sneaked in during resolution. Git only flags textual overlap; semantic conflicts in non-overlapping lines merge silently and are the most dangerous.
</context>

<task>
<ours>
{{ours_change}}
</ours>

<theirs>
{{theirs_change}}
</theirs>

<resolution>
{{resolution}}
</resolution>

1. State the intent of each side in one or two sentences per file: what behaviour each change was trying to add, fix or remove.
2. For each conflicted hunk, check that the resolution keeps both intents. Flag: a side's change dropped, both sides kept where they should have been combined (duplicate calls, duplicate imports, a value set twice), the wrong side chosen for an incompatible change, leftover conflict markers.
3. Look beyond the conflicted hunks for semantic conflicts: a renamed or removed function, field, config key or parameter on one side still used by new code on the other; changed defaults or return types one side relies on; tests on one side that assert behaviour the other side changed; migrations from both sides with clashing order or numbering.
4. Flag edits in the resolution that belong to neither side, and ask whether they were intended.
5. Rate each finding: blocker (lost fix, broken behaviour, compile or runtime error), should-fix, question.
6. List the checks that would confirm the resolution: tests from both sides to run, a build, a grep for old names, and comparing the diff of the merged result against each parent.
</task>

<constraints>
- Cite file and line or hunk for each finding and name which side's intent is affected.
- If only summaries were given instead of diffs, say which checks you could not do.
- Do not re-review the original changes on their merits; review only whether the resolution preserves them.
- At most 10 findings, blockers first.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: resolution correct | correct with questions | needs fixing, and the main reason.
## Intent check
Table: file, ours intent, theirs intent, preserved (yes, partly, no).
## Findings
Numbered: severity, location, problem, which intent is lost, fix.
## Semantic conflicts
Bullets, or "none found" with what was checked.
## Checks to run
Numbered.
</output_format>
