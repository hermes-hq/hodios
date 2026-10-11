---
schema: 1
id: plan-freelance-work-week
kind: prompt
title: Plan a freelancer's standard work week
description: Designs a freelancer's repeatable weekly schedule - billable capacity from the income target, blocks for client work, admin, marketing and buffer, rules for client requests and a weekly review.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [weekly-schedule, billable-hours, utilisation, time-blocking, freelance-admin]
pairs_with:
  prompts: [price-services, build-freelance-pipeline-routine, triage-overbooked-client-schedule, reset-client-communication-boundaries]
  personas: [freelance-business-advisor]
args:
  - name: situation
    description: Your service, current clients and their typical demands (meetings, response expectations, deadlines), the hours you want to work per week, and your fixed commitments (childcare, another job, energy peaks).
    type: text
    required: true
  - name: money
    description: Your income target for the month or year, your rate, and roughly how many hours per week you bill today. Optional but needed for the capacity check.
    type: text
  - name: problems
    description: What goes wrong now, such as admin piling up, marketing only when work dries up, constant interruptions, evenings and weekends. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Weekly template, Client request rules, Weekly review, What to change first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help freelancers build a sustainable work week, the way experienced independents run their business. What they know: most full-time freelancers can bill only about 50 to 70 percent of their working hours, because admin, invoicing, sales, learning and client communication take the rest, so planning a 40-hour week of billable work leads to evenings and weekends; the income target divided by the realistic billable hours shows whether the rate works at all; deep work needs protected blocks, ideally at the person's best hours, while calls and email can be batched; marketing and pipeline work must happen weekly even when busy, or the feast-or-famine cycle starts; a daily buffer absorbs the urgent requests that every client produces; clients accept fixed response windows and meeting days when they are told clearly; and a short weekly review keeps the plan honest.

<situation>
{{situation}}
</situation>
{{#money}}
<money>
{{money}}
</money>
{{/money}}
{{#problems}}
<problems>
{{problems}}
</problems>
{{/problems}}
</context>

<task>
1. Capacity check: from the hours wanted, estimate realistic billable hours (state the utilisation assumption), the income they produce at the stated rate, and the gap against the target. If the maths does not work, say so plainly and name the levers (rate, hours, utilisation, offer), without solving it by adding hours past the stated limit.
2. Weekly template: a day-by-day table with blocks for deep client work, calls and meetings, email and messages, admin and invoicing, marketing and pipeline, learning, and buffer, fitted to the fixed commitments and energy peaks given.
3. Client request rules: response times by channel, meeting days, how urgent requests are handled and charged, and short wording to tell clients.
4. Weekly review: a 20-minute checklist (hours billed versus plan, pipeline, invoices sent and overdue, next week's deadlines, one improvement).
5. What to change first: the two or three changes with the biggest effect on the stated problems.
</task>

<constraints>
- Respect the user's stated hours and commitments; do not plan evenings or weekends unless the user wants them.
- Use only the money figures given and show the arithmetic; mark missing figures [X].
- Keep it practical; no productivity-app recommendations unless asked.
{{> output/uncertainty}}
</constraints>

<output_format>
## Capacity check
Short calculation and verdict.
## Weekly template
Table: Day | Morning | Afternoon | Notes.
## Client request rules
## Weekly review
Checklist.
## What to change first
Numbered.
</output_format>
