---
schema: 1
id: plan-user-acceptance-testing
kind: prompt
title: Plan user acceptance testing
description: Plans user acceptance testing with business-readable scenarios, chosen testers, test data, a defect process and sign-off criteria. Use before business users accept a system or release.
category: testing
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [qa-engineer, business-analyst, product-manager, project-manager]
requires: [none]
inputs: [spec, document, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [uat, sign-off, business-testing, release-testing]
pairs_with:
  prompts: [write-test-plan, write-acceptance-criteria, write-test-summary-report]
  personas: [test-engineer]
args:
  - name: system
    description: What is being accepted - the system or release, the business processes it supports, who the users are, and what changed for them.
    type: text
    required: true
  - name: stakeholders
    description: Who must sign off, which teams will test, and how much of their time is available.
    type: text
  - name: window
    description: The UAT window and go-live date.
    type: string
output_contract:
  format: markdown
  sections: [Objectives and scope, Testers and roles, Scenarios, Environment and data, Defect handling, Entry and exit criteria, Schedule, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
User acceptance testing is where the people who will live with the system confirm it supports their real work. It is not a second round of system testing, and when it turns into one, business testers burn their limited time finding crashes the delivery team should have caught. UAT works when the build is already stable, scenarios follow end-to-end business processes in the users' own language (month-end close, onboarding a new customer) rather than screens, testers are the people who do that work today, data looks like their real cases (with personal data masked), and everyone agrees up front what blocks go-live versus what can be fixed after. Without agreed severity rules and sign-off criteria, UAT ends in either endless rounds or a sign-off nobody believes.
</context>

<task>
Plan user acceptance testing for:
{{system}}
{{#stakeholders}}

Stakeholders: {{stakeholders}}
{{/stakeholders}}
{{#window}}

Window: {{window}}
{{/window}}

1. State the objectives: which business processes must be proven to work, and what is out of scope for UAT because system testing already covers it.
2. Define testers and roles: business process owners, everyday users, a UAT coordinator, a delivery-team contact for triage, and who signs off. Note gaps if a key user group has no tester.
3. Write scenarios as business processes in plain language. Each scenario has a business goal, the role performing it, the starting situation, the steps at the level a user would describe them, and the expected business outcome. Include variants that matter in real work: exceptions, corrections, approvals, period ends, unusual but legitimate cases.
4. Specify the environment and data: a stable, production-like environment, realistic data covering the scenarios, test accounts per role, and masking of any personal data copied from production. Say who prepares it and by when.
5. Define defect handling: how testers report (what, steps, expected versus actual, screenshot), severity definitions in business terms, triage cadence, and which severities block sign-off.
6. Set entry criteria (system testing finished, no open critical defects, environment and data ready, testers briefed) and exit criteria (all priority scenarios executed and passed, no open blocking defects, workarounds agreed for accepted issues, signed by the named approvers).
7. Lay out the schedule within the window: briefing, execution rounds, a retest round for fixes, and sign-off, with a buffer.
</task>

<constraints>
- Scenarios must be in business language, not UI instructions or technical steps.
- Do not include real personal data in examples or test data.
- Do not invent names, dates or people; use roles and placeholders.
- Severity definitions must say what blocks go-live.
{{> output/uncertainty}}
</constraints>

<output_format>
## Objectives and scope
Bullets.

## Testers and roles
Table: role | who (role or team) | responsibility.

## Scenarios
Numbered scenarios with goal, role, starting situation, steps, expected outcome and priority.

## Environment and data
Bullets with owner and due point.

## Defect handling
Severity table and the reporting and triage process.

## Entry and exit criteria
Two checklists.

## Schedule
Table: activity | when | owner.

## Open questions
Only the ones that affect the plan.
</output_format>
