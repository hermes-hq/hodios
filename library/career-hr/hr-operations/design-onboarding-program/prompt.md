---
schema: 1
id: design-onboarding-program
kind: prompt
title: Design a company onboarding programme
description: Designs a company-wide onboarding programme for all new hires - preboarding, day one, first week, first 90 days - with owners, a checklist per role type and measures of whether it works.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, founder, executive]
requires: [none]
inputs: [text]
output: [plan, checklist, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employee-onboarding, preboarding, new-starters, time-to-productivity, early-attrition]
pairs_with:
  prompts: [plan-new-hire-onboarding, write-team-onboarding-guide, design-probation-review-process, plan-employee-offboarding]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Headcount, hires expected per year, locations and remote set-up, main role types (for example office, field, engineering, shift), and who handles onboarding today (HR, IT, managers).
    type: text
    required: true
  - name: problems
    description: What goes wrong now, such as laptops not ready, people leaving in the first months, managers forgetting, repeated questions, slow ramp-up. Include any early-leaver numbers you have.
    type: text
    required: true
  - name: constraints
    description: Budget, systems you already use, legal paperwork steps you know about, and how much time HR and managers can give. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals and measures, Programme map, Preboarding, Day one and week one, First 90 days, Owners and checklists, Rollout, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design onboarding programmes the way an experienced people operations lead does. What experts know: much early attrition is decided in the first weeks, by whether the job matches what was promised and whether the person feels expected and useful; onboarding has four layers (compliance paperwork, clarification of the role and expectations, culture and how things really work, and connection with people), and most companies do only the first; preboarding (contact, equipment, accounts and paperwork before day one) removes the most common day-one failures; a named buddy, a first real task in week one and scheduled manager check-ins at 30, 60 and 90 days matter more than a long induction deck; the programme must be owned by someone, with checklists that trigger tasks for IT, facilities, payroll and the manager on a timeline; remote and shift workers need their own versions. Right-to-work checks and employment paperwork vary by country.

<organisation>
{{organisation}}
</organisation>

<problems>
{{problems}}
</problems>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Goals and measures: three or four goals tied to the stated problems, with measures (equipment ready on day one, new-hire survey at 30 and 90 days, early leavers within 90 days or the first year, time to first contribution, manager completion of check-ins).
2. Programme map: the stages from offer acceptance to day 90, with what the new hire experiences at each.
3. Preboarding: welcome contact, equipment and access requests with lead times, paperwork, first-week schedule sent in advance, and buddy assignment.
4. Day one and week one: a schedule template, the first real task, meetings with the manager and key people, and what to avoid (a day of slides, nobody expecting them).
5. First 90 days: role expectations in writing, 30-60-90 check-ins with questions, training, connection activities, and a probation link where it applies.
6. Owners and checklists: a dated checklist per owner (HR, IT, manager, buddy, payroll), with variants for remote, shift or field roles where relevant.
7. Rollout: templates, manager briefing, tooling, and a review after the first ten hires.
8. Questions that need a decision.
</task>

<constraints>
- Fit the effort to the stated HR and manager capacity and hiring volume.
- Keep legal paperwork as a step to confirm locally; do not list country-specific documents as fact.
- Do not invent attrition or survey numbers; mark gaps as [X].
{{> output/uncertainty}}
</constraints>

<output_format>
## Goals and measures
Table: Goal | Measure | Target | Source.
## Programme map
## Preboarding
## Day one and week one
## First 90 days
## Owners and checklists
Table per owner: Task | When (relative to start date) | Done when.
## Rollout
## Questions
Numbered.
</output_format>
