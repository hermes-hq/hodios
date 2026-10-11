---
schema: 1
id: select-regression-tests-for-release
kind: prompt
title: Select regression tests for a release
description: Selects which regression tests to run for a release from the diff, risk areas and past defects, with a must-run core, impact-based picks and an explicit list of what is skipped.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [qa-engineer, tech-lead, software-engineer]
requires: [repo-read]
inputs: [diff, text, repo]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [regression, impact-analysis, release-testing, risk-based-testing]
pairs_with:
  prompts: [write-test-plan, write-test-summary-report, write-smoke-tests]
  personas: [test-engineer]
args:
  - name: changes
    description: What is in the release - the diff, merged pull request list or changelog, plus any migrations or config changes.
    type: text
    required: true
  - name: test_inventory
    description: The regression suites or manual test cases available, with rough run time each, or the path to them in the repo.
    type: text
    required: true
  - name: history
    description: Past defects and escapes by area, flaky or fragile areas, and customer-critical flows.
    type: text
  - name: time_budget
    description: How much testing time or CI time there is before release.
    type: string
output_contract:
  format: markdown
  sections: [Change impact, Must-run core, Selected by impact, Skipped and why, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When the full regression suite (or the manual regression pack) does not fit before a release, teams either run everything late or pick tests by habit. Selection works better when it combines three signals: a small must-run core of business-critical flows that always runs regardless of the diff, tests whose code paths the change actually reaches (including indirect reach through shared modules, config, database migrations, dependency upgrades and feature flags), and areas with a history of breaking. The usual mistake is reading the diff too literally: a change to a shared date utility, a serializer or an ORM upgrade reaches far more than the files touched. Whatever is skipped should be written down, so the residual risk is a decision rather than an accident.
</context>

<task>
Select regression tests for this release.

Changes:
{{changes}}

Available tests:
{{test_inventory}}
{{#history}}

History: {{history}}
{{/history}}
{{#time_budget}}

Time budget: {{time_budget}}
{{/time_budget}}

1. If the repository is available, read the changed files and find what depends on them (imports, callers, shared modules, routes, jobs, config keys, database tables). Otherwise work from the change description and say so.
2. Build a change-impact list: each change, the areas it reaches directly and indirectly, and a risk rating. Treat migrations, dependency upgrades, config and feature-flag changes, authentication and payment code as wide-reaching by default.
3. Define the must-run core: the tests for flows whose failure would be severe (sign-in, checkout, data writes, the product's main job), kept small enough to always run.
4. Select additional tests by impact: tests covering the reached areas, then areas with past defects. Give the reason for each selection.
5. Fit to the time budget: if the selection exceeds it, cut from the lowest-risk end and say what was cut.
6. List what is skipped, grouped, with the reason (not reached by the change, low risk, covered at a lower level).
7. State the residual risk in two or three sentences and what would trigger running the full suite (for example a late change to a shared module).
</task>

<constraints>
- Never skip the must-run core to fit the budget; say the budget is too small instead.
- Do not invent test names; refer to tests as given in the inventory, or by area if the inventory is coarse.
- Mark indirect impact you inferred without reading code as inferred.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Change impact
Table: change | areas reached (direct, indirect) | risk.

## Must-run core
Checklist.

## Selected by impact
Table: test or suite | reason | est. time.

## Skipped and why
Grouped bullets.

## Residual risk
Short paragraph, plus triggers for a full run.
</output_format>
