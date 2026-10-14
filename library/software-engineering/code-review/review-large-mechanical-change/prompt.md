---
schema: 1
id: review-large-mechanical-change
kind: prompt
title: Review a large mechanical change
description: Plans and runs the review of a codemod, mass rename, lint autofix or generated change touching hundreds of files, by checking the transformation rule, sampling smartly and hunting the exceptions.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, maintainer]
requires: [none]
inputs: [diff, text]
output: [report, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [codemods, mass-rename, large-diffs, sampling, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [split-large-pull-request, fix-lint-violations-repo-wide, review-refactoring-change]
args:
  - name: description
    description: What the change is meant to do and how it was produced, for example "codemod replacing moment with date-fns, script attached" or "sed rename of userId to accountId".
    type: text
    required: true
  - name: diff
    description: The diff, or a representative part of it plus the file list and line counts if it is too large to paste.
    type: text
    required: true
  - name: transform
    description: The codemod script, regex or tool command used, if available.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Transformation rule, Exceptions found, Sampling plan, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nobody reads 600 files of a codemod line by line, so these PRs are either rubber-stamped or stall forever. The efficient review checks the rule, not each instance: is the transformation correct in general, and where does it not apply? The defects cluster in predictable places: string-based renames that also hit comments, strings, SQL, config keys, serialised field names or unrelated identifiers with the same substring; manual edits mixed into the automated change; generated or vendored files that should not have been touched; files the tool skipped or failed on; and semantic differences between old and new APIs that the codemod maps one to one. The reviewer reviews the script, the outliers and a smart sample, then relies on the build, tests and gradual rollout.
</context>

<task>
<description>
{{description}}
</description>

{{#transform}}
<transform>
{{transform}}
</transform>
{{/transform}}

<diff>
{{diff}}
</diff>

1. State the transformation rule as precisely as possible from the description, script or diff, and judge whether it is correct in general, including semantic differences between old and new APIs.
2. Hunt for exceptions in the diff: hunks that do not match the rule (manual edits mixed in), matches in strings, comments, docs, SQL, config, serialised names, public API surfaces and test fixtures, partial or duplicated application, formatting churn, and touched generated, vendored or lock files.
3. Identify what the rule could have missed: dynamic access (reflection, string keys, templates), other languages in the repo, files excluded by the tool's glob.
4. Propose a sampling plan: which files to read fully (outliers by size of change, public APIs, security-sensitive and data-handling code, files with manual edits) and a random sample size, with how to pick it.
5. Propose verification: build, typecheck and tests, a grep for leftovers of the old pattern, a grep for suspicious new-pattern matches, and re-running the transform on a clean checkout to confirm it is reproducible.
6. Propose a rollout: split out manual edits into their own PR, split by area or owner if the change spans teams, merge quickly to limit conflicts, and how to revert.
</task>

<constraints>
- Review the rule and the exceptions; do not comment hunk by hunk on correct mechanical edits.
- Cite file and line for each exception.
- If only part of the diff was given, say which checks need the full diff and give the grep or command pattern to run them, without running anything yourself.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve after exceptions fixed | request changes | split first.
## Transformation rule
The rule in one or two sentences, and whether it is correct in general.
## Exceptions found
Numbered: `path:line`, what is wrong, fix.
## Sampling plan
Bullets: files to read fully, random sample size and method.
## Verification
Checkbox list.
## Rollout
Numbered.
</output_format>
