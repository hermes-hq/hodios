---
schema: 1
id: write-test-summary-report
kind: prompt
title: Write a test summary report
description: Writes a test summary report for a release from test results and defect data - what was tested, results, open defects, residual risk and a go or no-go recommendation.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [qa-engineer, tech-lead, project-manager]
requires: [none]
inputs: [text, logs, document]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [release-testing, go-no-go, residual-risk, defects]
pairs_with:
  prompts: [write-test-plan, select-regression-tests-for-release, plan-user-acceptance-testing]
  personas: [test-engineer]
args:
  - name: release
    description: The release or feature, its scope and the exit criteria from the test plan, if there was one.
    type: text
    required: true
  - name: results
    description: Test execution results - suites or test cases run, passed, failed, blocked and not run, plus exploratory testing notes.
    type: text
    required: true
  - name: defects
    description: Open and fixed defects with severity and status, and any known issues with workarounds.
    type: text
  - name: audience
    description: Who reads the report, for example the release board, executives or the engineering team.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, What was tested, Results, Open defects, Not tested, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test summary report exists to support a release decision, so the recommendation and the risks that drive it belong at the top, not after pages of pass counts. Raw numbers mislead: "97% passed" can hide one failing payment test that should block the release, and "all tests passed" says nothing if a third of the planned scope was never run. The honest report is explicit about what was not tested and why, compares results to the exit criteria agreed before testing rather than to new ones chosen afterwards, and translates open defects into user impact. The recommendation is the tester's professional view; the go or no-go decision belongs to the release owner.
</context>

<task>
Write a test summary report for:
{{release}}

Results:
{{results}}
{{#defects}}

Defects: {{defects}}
{{/defects}}
{{#audience}}

Audience: {{audience}}
{{/audience}}

1. Compare the results with the exit criteria in the release description. Where no exit criteria were given, say so and use common defaults (no open critical or high defects, critical flows passed, planned scope executed), labelled as assumed.
2. Summarise what was tested by area and test level, and the environment and build tested.
3. Present results per area: run, passed, failed, blocked, not run. Highlight failures and blocked tests in critical areas rather than only totals.
4. List open defects that matter for the decision, each with severity, the user impact in plain words, the workaround if any, and whether it blocks the release under the criteria.
5. List what was not tested or only partly tested, and why (blocked environment, no time, descoped).
6. Assess residual risk: what could still go wrong in production given the gaps and open defects, how likely, and what mitigation exists (feature flag, monitoring, rollback, staged rollout).
7. Give a recommendation: go, go with conditions (name them), or no-go (name what would change it). Keep it consistent with the criteria.
8. Fit the tone and detail to the audience: decision first and plain language for a release board or executives, more detail for engineers.
</task>

<constraints>
- Do not report numbers that are not in the input; mark gaps as unknown.
- Do not call a release ready while a criterion is unmet without stating that and the condition attached.
- Do not soften critical defects; state the user impact plainly.
- The recommendation is advisory; name the release owner's decision as theirs.
</constraints>

<output_format>
## Recommendation
Go, go with conditions, or no-go, in one or two sentences, with conditions listed.

## What was tested
Bullets by area and level, plus build and environment.

## Results
Table: area | run | passed | failed | blocked | not run | notes. Then exit criteria met or unmet as a checklist.

## Open defects
Table: id | severity | user impact | workaround | blocks release?

## Not tested
Bullets with reasons.

## Residual risk
Short paragraph with mitigations.
</output_format>
