---
schema: 1
id: plan-internal-tool-rollout
kind: prompt
title: Plan an internal tool rollout
description: Plans rolling out a new or replacement internal tool with change impact by role, champions, training, cutover and fallback, early support, adoption measures and a date to switch off the old way.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, operations-manager, manager, project-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [change-management, cutover, hypercare, champions, adoption, decommissioning]
pairs_with:
  prompts: [brief-frontline-staff-on-release, plan-branch-by-branch-rollout, allocate-capacity-across-departments]
  personas: [internal-tools-product-manager]
args:
  - name: tool_and_change
    description: The tool, what it replaces (a system, spreadsheets, paper), what changes in people's work, data to migrate, and anything that cannot stop (payroll runs, month-end, customer orders).
    type: text
    required: true
  - name: teams_affected
    description: The teams or roles affected, how many people in each, shifts or locations, and how comfortable they are with change or technology.
    type: text
    required: true
  - name: go_live_date
    description: Optional. The planned go-live date, if set.
    type: string
output_contract:
  format: markdown
  sections: [Change impact, Champions, Training plan, Cutover and fallback, Early support, Adoption measures, Switch-off plan, Timeline, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan internal tool rollouts the way an experienced internal product and change lead does. A tool is not launched when it is switched on; it is launched when people have stopped using the old way. Rollouts fail when the plan is built around the tool rather than around the people whose day changes most, when training is one generic session weeks before go-live, when there is no tested way back if the cutover goes wrong, and when the old system is never switched off, so the company runs two systems and two sets of data indefinitely.
{{#go_live_date}}
Planned go-live: {{go_live_date}}
{{/go_live_date}}
</context>

<task>
Tool and change:

<tool_and_change>
{{tool_and_change}}
</tool_and_change>

Teams affected:

<teams_affected>
{{teams_affected}}
</teams_affected>

1. Change impact by role: what each role stops, starts and does differently, how often (daily, weekly, monthly), and impact rating (high, medium, low). High-impact roles get the most attention in every later step.
2. Champions: one per team or roughly one per 10-20 users, chosen from respected practitioners rather than managers; what they do before, during and after go-live, and the time they need freed up.
3. Training by role and impact: format (hands-on session with real tasks, short video, quick reference card, floor walking), length, timing (as close to go-live as possible, within one to two weeks), and a practice environment if possible. Plan for shifts and people who are absent.
4. Cutover and fallback: the approach (all at once, by team, or a short parallel run with a fixed end date), data migration and validation checks, a freeze window, go or no-go criteria checked the day before, and fallback triggers with who decides and how far back you can go.
5. Early support for the first two to four weeks: floor walkers or a drop-in channel, a daily check-in for issues, a known-issues list, and how fixes are prioritised.
6. Adoption measures: share of target users active, tasks completed in the new tool versus the old, support requests per user, time per key task or error rate versus the baseline, and satisfaction pulse. Set targets with the user.
7. Switch-off plan: criteria for switching the old way off, read-only period, data archiving, licence cancellation, and the date.
8. Timeline from now to switch-off.
</task>

<constraints>
- Do not invent team sizes, dates or system details; mark gaps [X] and list them as questions.
- Never plan a cutover for a business-critical process without a tested fallback and a go or no-go check.
- Avoid an open-ended parallel run; every parallel period has an end date and exit criteria.
- Keep language plain; this plan will be read by managers outside IT.
- If the tool or the affected teams are not described, ask for them and stop.
</constraints>

<output_format>
## Change impact
Table: role | people | stops | starts | changes | frequency | impact.

## Champions
Bullets.

## Training plan
Table: role | format | length | when | materials.

## Cutover and fallback
Approach, migration checks, go or no-go criteria, fallback triggers.

## Early support
Bullets.

## Adoption measures
Table: measure | baseline | target | how measured.

## Switch-off plan
Criteria, steps and date.

## Timeline
Table: week | activity | owner placeholder.

## Risks and questions
Bullets.
</output_format>
