---
schema: 1
id: add-quality-gates-to-ci
kind: prompt
title: Add quality gates to CI
description: Adds lint, type-check, coverage and build gates to CI with thresholds that block new problems without failing on legacy code, and names the checks to require before merge.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, tech-lead, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [quality-gates, linting, type-checking, coverage, ratcheting, required-checks]
pairs_with:
  prompts: [configure-branch-protection, write-github-actions-workflow, speed-up-ci-pipeline]
args:
  - name: gates
    description: The gates wanted, for example "lint, type check, 80% coverage, build must pass", and the language or tooling if known.
    type: text
    required: true
  - name: legacy_state
    description: How much existing code would fail today, for example "3,000 lint errors, coverage at 41%".
    type: text
output_contract:
  format: markdown
  sections: [Baseline, Gates, Changes, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Quality gates fail in two opposite ways. Strict gates switched on over a legacy codebase block every pull request, so the team adds ignore comments or disables the gate within a week. Gates that only report and never block are ignored. The working pattern is a ratchet: measure today's baseline, block anything that makes it worse (new lint errors, new type errors in changed files, coverage on changed lines below a threshold, total coverage falling), and tighten the baseline as debt is paid. Absolute coverage targets on the whole repo invite tests written for the number; a patch coverage threshold on new code is fairer and harder to game. Gates also need the same commands locally as in CI, or developers learn about failures only after pushing.
</context>

<task>
Add these quality gates to CI: {{gates}}
{{#legacy_state}}
Known legacy state: {{legacy_state}}
{{/legacy_state}}

1. Read the repository: languages, existing lint, format and type-check configs, test runner and coverage tooling, the CI files and any pre-commit hooks. Reuse configured tools; do not add a second linter for the same language.
2. Measure the baseline by running each gate's command if a shell is available: count of lint errors, type errors and current coverage. Record the numbers.
3. For each gate, pick blocking or reporting and a threshold that passes today and blocks regressions: a lint or type baseline file, or checking only changed files; patch coverage on changed lines plus "total must not drop by more than a small margin". Explain each choice.
4. Wire the gates as separate, clearly named CI jobs or steps so a failure says which gate failed. Make sure each gate's command is a project script that developers can run locally with the same result.
5. Run the cheapest gates first (format, lint) and fail fast on them only if it saves real time.
6. List the exact check names to mark as required in branch protection.
7. Run the gates locally and report the real results.
</task>

<constraints>
- Do not fix or reformat legacy code as part of this change, and do not add blanket ignore comments to make gates pass.
- Do not invent coverage numbers or error counts; report "not measured" if you could not run the tools.
- Do not use third-party coverage services or actions you are not sure exist; prefer the tool's own threshold options.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
A table: gate, tool, current count or percentage, measured or not measured.

## Gates
A table: gate, blocking or reporting, threshold, why.

## Changes
Each file changed with a diff or full contents, plus the local command for each gate.

## Verify
What ran and the real results.

## Follow-ups
Required checks to set in branch protection and a suggested schedule for tightening the ratchet. "None" if empty.
</output_format>
