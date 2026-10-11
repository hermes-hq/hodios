---
schema: 1
id: plan-job-change-on-work-visa
kind: prompt
title: Plan a job change on a work visa
description: Plans changing employer or role while on a sponsored or employer-tied work permit, covering whether a new application is needed first, the gap rules, the notice timing and effects on settlement time.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, job-seeker, software-engineer]
subject: [law]
requires: [none]
inputs: [text, document]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [change-employer, sponsored-worker, job-switch, work-permit-conditions, notice-period]
pairs_with:
  prompts: [understand-residence-permit-conditions, report-change-of-circumstances, ask-employer-for-visa-sponsorship, calculate-absences-from-country]
args:
  - name: country
    description: The country and the work permit or visa you hold, with its expiry date.
    type: string
    required: true
  - name: change
    description: What is changing (new employer, promotion, new role at the same employer, fewer hours, redundancy), the offer details (occupation, salary, start date), your notice period and whether the new employer has agreed to sponsor.
    type: text
    required: true
  - name: long_term_plan
    description: Whether you are counting time towards permanent residence or citizenship, and how long you have been on this route. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Does the change need permission, Sequencing, Risks, Effect on long-term plans, Questions for HR and an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many work permits tie the holder to an employer, an occupation, or both. Changing job can require a fresh application or the new employer's sponsorship before starting work, and the order of steps matters: resigning before the new permission is granted, or starting with the new employer too early, can breach conditions. Other systems give an open permit, or allow a set number of days to find a new job after losing one, and some require a notification within a short deadline. A promotion or change of hours with the same employer can also matter if it changes the occupation or drops pay below a threshold. Time already spent may or may not count towards permanent residence after a switch, and a gap between jobs can break continuity.

Country and permit: {{country}}

<change>
{{change}}
</change>
{{#long_term_plan}}
<long_term_plan>
{{long_term_plan}}
</long_term_plan>
{{/long_term_plan}}
</context>

<task>
1. Does the change need permission: based on the permit type described, whether this kind of change commonly requires a new application, the new employer's sponsorship, only a notification, or nothing, each marked to confirm on the official source and against the conditions on the person's own permit.
2. Sequencing: a safe order of steps with dates (offer in writing, sponsorship or application, decision, resignation, notice, last day, first day), showing what must not happen before what.
3. Risks: gaps without a job, working for the new employer too early, salary or occupation thresholds, redundancy before the new permit, and dependants' status.
4. Effect on long-term plans: whether time may continue to count toward settlement and what to check.
5. Questions for HR and an adviser: for the current employer, the new employer and a regulated adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark rules, grace periods, thresholds and deadlines "commonly, confirm"; never state them as fact from memory.
- Do not tell the person to resign or accept until the permission position is confirmed.
- If they have already resigned, been dismissed or started the new job, put getting regulated advice now first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Does the change need permission
## Sequencing
Table: Step | Earliest date | Must happen after | Owner.
## Risks
Bullets.
## Effect on long-term plans
## Questions for HR and an adviser
Grouped bullets.
</output_format>
