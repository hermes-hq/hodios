---
schema: 1
id: write-test-plan
kind: prompt
title: Write a test plan
description: Writes a risk-based test plan for a feature or release covering scope, risks, test levels, environments, data, manual checks automation misses and exit criteria. Use before testing a release.
category: testing
version: 1.0.0
status: experimental
stage: [plan, verify]
role: [qa-engineer, software-engineer, tech-lead, product-manager]
requires: [none]
inputs: [spec, ticket, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [risk-based-testing, exploratory-testing, exit-criteria, release-testing]
pairs_with:
  prompts: [fill-test-gaps, write-e2e-test, write-acceptance-criteria]
  personas: [test-engineer]
args:
  - name: feature
    description: The feature or release - what it does, who uses it, the spec or acceptance criteria, the components and integrations it touches, and what changed.
    type: text
    required: true
  - name: risks
    description: Known worries - areas that broke before, complex logic, money or data at stake, new third parties, performance or compliance concerns.
    type: text
  - name: release_date
    description: Target release date or deadline, and any code freeze.
    type: string
  - name: automation_coverage
    description: What automated tests already cover (unit, integration, end-to-end, contract) and what runs in CI.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Risks, Test approach, Environments and data, Manual and exploratory testing, Entry and exit criteria, Schedule and owners, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test plan is useful when it tells a team where to spend limited testing time and when to stop. Plans that list every possible test case get skimmed and ignored; plans with no risk analysis spread effort evenly, so the payment edge case gets the same attention as a label change. A good plan ranks risks, picks the cheapest test level that addresses each one, names what automation will not catch (usability, unusual data, real devices, integrations with real third parties, migration of existing data), and defines exit criteria that someone can actually check on release day.
</context>

<task>
Write a test plan for:
{{feature}}
{{#risks}}

Known risks: {{risks}}
{{/risks}}
{{#release_date}}

Release date: {{release_date}}
{{/release_date}}
{{#automation_coverage}}

Existing automation: {{automation_coverage}}
{{/automation_coverage}}

1. Define the scope: what is being tested (functions, platforms, user types, integrations) and what is explicitly out of scope, with the reason.
2. Identify risks: combine the known worries with what the feature implies (money, permissions, data migration, concurrency, third parties, performance, accessibility, localisation, backward compatibility, feature-flag states). Rate each by likelihood and impact, and rank them.
3. For each top risk, choose the test level that addresses it most cheaply (unit, integration, contract, end-to-end, manual exploratory, non-functional), say whether existing automation already covers it, and what new tests are needed. Name the gaps automation will not close.
4. Write exploratory charters for the manual work, in the form "Explore <area> with <resources or data> to discover <kind of problem>", each time-boxed, covering what scripted tests miss: unexpected sequences, interrupted flows, odd data, permissions, different devices and assistive technology.
5. Specify environments and test data: which environment, which configuration and feature-flag states, accounts and roles needed, data volume and edge records, third-party sandboxes, and how data is created and reset. No real personal data.
6. Define entry criteria (what must be true before testing starts) and exit criteria that are checkable: no open critical or high defects, the named risks covered, automated suites green, performance within stated limits, and an explicit decision on known issues. Include a rollback or flag-off check if the release can be reverted.
7. Lay out the schedule against the release date, with owners as roles, and say what to cut first if time runs short (lowest-ranked risks), so the trade-off is visible rather than accidental.

If the feature description is too thin to identify risks (no behaviour, users or integrations), ask for the spec or acceptance criteria and stop.
</task>

<constraints>
- Rank everything by risk. Do not list low-value test cases to look thorough.
- Do not duplicate what existing automation already covers; reference it instead.
- Exit criteria must be measurable or a named decision, never "sufficient testing done".
- Do not invent dates, people or metrics; use roles and placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
In scope and out of scope, as two short lists.

## Risks
Table: # | risk | likelihood | impact | priority.

## Test approach
Table: risk # | test level | covered by existing automation? | new tests needed.

## Environments and data
Bullets.

## Manual and exploratory testing
Numbered charters with time boxes, plus any must-do manual checks.

## Entry and exit criteria
Two checklists.

## Schedule and owners
Table: activity | owner (role) | when. Then "If time runs short, cut:" in priority order.

## Open questions
Only the ones that change the plan.
</output_format>
