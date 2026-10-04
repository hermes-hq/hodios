---
schema: 1
id: plan-bug-bash
kind: prompt
title: Plan a bug bash
description: Plans a pre-release bug bash with charters, participants, environments and test data, a bug template, severity rules, live triage and how results feed the release decision.
category: planning
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [engineering-manager, qa-engineer, product-manager, tech-lead]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [bug-bash, exploratory-testing, release-readiness, triage]
pairs_with:
  prompts: [plan-sprint, write-implementation-plan]
args:
  - name: release_scope
    description: What is shipping - features and changes, platforms, risky areas, the release date, and known open bugs.
    type: text
    required: true
  - name: participants
    description: Who could join and how many, for example 6 engineers, 2 designers, support and sales volunteers. Optional.
    type: string
    default: not decided
  - name: duration_minutes
    description: Length of the testing session itself.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Goal and exit criteria, Charters, Participants and pairing, Setup checklist, Bug template, Severity rules, Session run sheet, After the bash]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan a bug bash: a time-boxed session where many people explore a release to find problems before users do. Bug bashes waste time when everyone tests the same happy path, the environment or test accounts break in the first ten minutes, reports are duplicated and too vague to reproduce, severity is argued instead of defined, and nobody decides what the findings mean for the release. Good ones use short exploratory charters, mix engineers with people who think like customers, and end with a clear go, go-with-fixes or no-go input.

Participants: {{participants}}
Session length: {{duration_minutes}} minutes
</context>

<task>
<release_scope>
{{release_scope}}
</release_scope>

1. Set the goal and exit criteria: what this bash must give confidence in, and the rule for the release input (for example no open blocker or critical, majors each with an owner and decision).
2. Write five to ten charters in the form "Explore <area> with <resources or persona> to discover <kind of risk>", weighted to risky and changed areas, covering platforms, accessibility, slow networks, permissions and roles, edge data (empty, huge, unicode, time zones), upgrade from the previous version, and error paths.
3. Assign participants to charters, pairing a non-engineer with an engineer where possible, and rotate halfway for fresh eyes on the riskiest areas.
4. Setup checklist, done the day before: the build and environment frozen and smoke-tested, test accounts per role, seeded data, feature flags set, devices or browsers listed, where to file bugs, and a tagged label for this bash.
5. Bug template: title as "area: what fails when", steps, expected, actual, environment and build, account used, screenshot or recording, and suspected severity.
6. Severity rules with examples from this release: blocker (data loss, security, payment or core flow broken for many), critical, major, minor, cosmetic. The triager decides, not the reporter.
7. Session run sheet in minutes: kickoff (about 10 minutes: goal, charters, how to report), testing with a mid-point rotation, live triage by one or two people deduplicating and assigning severity as bugs arrive, and a wrap-up with the top findings.
8. After the bash: triage meeting within a day, fix-or-defer decisions per major and above with owners, a short summary with counts by severity and area, the release input, and charters to automate as regression tests.
</task>

<constraints>
- Use only the scope given; if the release date, platforms or risky areas are missing, list them as questions and mark [X] where they matter.
- Keep each charter achievable within the session; no "test everything".
- Never use real customer data or production accounts; require test data.
- Keep the tone inclusive for non-engineers: no assumed tools knowledge beyond the bug form.
</constraints>

<output_format>
## Goal and exit criteria
Two to four bullets.

## Charters
Table: charter | area | risk targeted | suggested participants.

## Participants and pairing
Bullets, with the rotation.

## Setup checklist
Checklist with owner placeholders.

## Bug template
The template in a code block.

## Severity rules
Table: severity | definition | example from this release | release impact.

## Session run sheet
Table: minute | activity | who.

## After the bash
Numbered follow-up steps.
</output_format>
