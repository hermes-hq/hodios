---
schema: 1
id: plan-homeschool-around-work
kind: prompt
title: Plan homeschool around work
description: Plans homeschooling around one or both parents' paid work, with a weekly schedule that maps who covers which hours, independent work for the child, outside help and fallback days.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [working-parents, scheduling, supervision, solo-study, childcare]
pairs_with:
  prompts: [plan-multi-age-homeschool-week, set-up-independent-work-system]
args:
  - name: work_schedule
    description: "Each adult's working hours and days, whether from home or away, and how often they can be interrupted."
    type: text
    required: true
  - name: children
    description: "Each child's age and what they can do independently, plus anything that needs an adult (early reading, new maths)."
    type: text
    required: true
  - name: support
    description: "Optional: relatives, sitters, co-ops, classes or swaps available, and budget."
    type: text
output_contract:
  format: markdown
  sections: [Week map, What needs an adult, Independent work, Weekly schedule, Fallback days, Risks and weekly check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families who homeschool while one or both parents work, whether part-time, full-time from home, in shifts or self-employed. It can work, but only if the plan accepts the trade-offs: direct teaching time shrinks, so it has to go to what truly needs an adult (early reading, new maths concepts, discussion), while practice, reading, projects and online or outside classes fill the rest. Learning does not have to happen 9 to 3; evenings, weekends and early mornings count, and many families teach in a few concentrated blocks. Children need age-appropriate independence and supervision: a 6-year-old cannot be left to self-study for hours, a 14-year-old often can. Other carers, co-ops, grandparents, sitters and paid classes fill gaps. The plan breaks on sick days, deadlines and school holidays of siblings, so fallbacks matter.

Family and work: {{work_schedule}}
Children: {{children}}
{{#support}}Help available: {{support}}{{/support}}
</context>

<task>
1. Map the week: list each adult's working hours and the children's needs, and find the protected teaching blocks (when a parent can give full attention) and the supervision-only blocks.
2. Decide what goes in the teaching blocks: only work that needs an adult, by child and subject.
3. Fill supervision-only time with independent work matched to each child's age: practice, reading, audiobooks, projects, quality online lessons, and how the child knows what to do without asking.
4. Place outside help: co-op days, classes, relatives, sitters or swaps with other families, and the cost if given.
5. Write the weekly schedule.
6. Plan fallbacks: a bad-work-day plan, a sick-child plan and a crunch-week plan that still counts as learning.
7. Name the risks (supervision gaps, parent burnout, screens creeping up) and one weekly check.
</task>

<constraints>
- Do not plan for young children to be left unsupervised; flag any gap in adult supervision clearly.
- Do not assume a particular employer will allow flexibility; plan around the hours given.
- Keep teaching blocks realistic: shorter and focused beats long and interrupted.
- Do not state legal requirements on hours or supervision; suggest the family check locally.
</constraints>

<output_format>
## Week map
Table: Time block | Adult available | Type (teaching, supervision, outside help) | Each child.
## What needs an adult
## Independent work
By child.
## Weekly schedule
Table by day.
## Fallback days
## Risks and weekly check
</output_format>
