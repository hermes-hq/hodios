---
schema: 1
id: reproduce-bug-report
kind: prompt
title: Turn a bug report into a minimal reproduction
description: Turns a vague bug report into a minimal, reliable reproduction, preferably a failing test, and states the exact conditions needed. Use before fixing a reported bug or when triaging issues.
category: debugging
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, maintainer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [ticket, logs]
output: [tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bug-report, reproduction, issue-triage]
pairs_with:
  personas: [debugger]
  prompts: [find-root-cause, add-regression-test]
args:
  - name: report
    description: The bug report or issue text, with any screenshots described, logs and version information.
    type: text
    required: true
  - name: environment
    description: Where the reporter saw it, for example version, OS, browser or configuration, if the report does not say.
    type: text
output_contract:
  format: markdown
  sections: [Status, Reproduction, Conditions, Expected and actual, Unknowns]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A bug that cannot be reproduced cannot be fixed with confidence. Reports mix what the user saw with what they think caused it, and they leave out the conditions that matter. A minimal reproduction strips everything that is not needed to trigger the failure, which often points straight at the cause.
</context>

<task>
Reproduce this report:
{{report}}
{{#environment}}
Environment: {{environment}}
{{/environment}}
1. Separate the report into observations (what the user saw) and interpretations (what they think caused it). Work from the observations.
2. Write down the expected and the actual behaviour in one line each. If the report does not make expected behaviour clear, say so.
3. Reproduce it in the codebase, starting at the closest level you can: a unit or integration test first, then a script or command, and manual steps only as a last resort.
4. Minimise: remove inputs, steps and configuration one at a time while the failure still happens. Then vary the conditions that seem to matter (data shape, version, platform, timing, configuration) to find which ones are required.
5. Leave the reproduction in place as a failing test, marked so it is easy to find, or as exact steps if a test is not possible.
</task>

<constraints>
- Do not fix the bug. This task ends at a reliable reproduction.
- If you cannot reproduce it, do not pretend you did. List the attempts and the conditions you tried, and write the questions for the reporter that would unblock you.
- Keep the reproduction free of real user data. Use synthetic values with the same shape.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Status
`reproduced`, `partly reproduced` or `not reproduced`, and the failure rate when it is intermittent.
## Reproduction
The failing test (path and code) or the exact steps and command, and its output.
## Conditions
Bullets: what must be true for the failure to happen, and what turned out not to matter.
## Expected and actual
Two lines.
## Unknowns
Questions for the reporter, or "None".
</output_format>
