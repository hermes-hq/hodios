---
schema: 1
id: estimate-team-size-for-project
kind: prompt
title: Estimate team size for a project
description: Works out how many engineers, and with which skills, a project needs to hit a date, allowing for ramp-up, parallelism limits and coordination cost.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead, project-manager, founder]
stack: []
requires: [none]
inputs: [spec, text]
output: [plan, table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [staffing, headcount, brooks-law, ramp-up, resourcing]
pairs_with:
  prompts: [estimate-with-ranges, plan-team-capacity, find-critical-path]
args:
  - name: project
    description: The work, its size if already estimated (effort range in engineer-weeks), the stack and the main components.
    type: text
    required: true
  - name: target_date
    description: The date the project must be done by, and whether it is fixed or negotiable.
    type: string
    required: true
  - name: current_team
    description: Who is already available, their skills, familiarity with the code and how much of their time is free.
    type: text
output_contract:
  format: markdown
  sections: [Answer, Effort and calendar, Team options, Skills needed, Risks of adding people, What would change it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dividing total effort by the weeks available gives a headcount that is almost always wrong. Work does not split evenly: the critical path sets a floor on duration no matter how many people join; each new engineer needs weeks to become productive and takes time from existing staff while ramping up; communication paths grow roughly with the square of team size; and hiring takes months before anyone starts. Adding people late to a late project makes it later (Brooks's law). The honest answer is usually a range of team shapes with trade-offs, plus the date below which no team size helps.
</context>

<task>
Project: {{project}}
Target date: {{target_date}}
{{#current_team}}Current team: {{current_team}}{{/current_team}}

1. If there is no effort estimate, build a rough one: list the major workstreams and give each an effort range in engineer-weeks, and say the estimate is rough. If the work is too vague, ask the three questions that matter most.
2. Find the critical path: the chain of dependent work that cannot be parallelised. Its length is the shortest possible duration; compare it with the time to the target date.
3. Count the usable weeks: time to the target date minus hiring and onboarding lead time for new people, holidays, and a stabilisation period before launch.
4. Work out effective capacity per person: about 60 to 70% of a week on project work for existing staff after meetings and support; new hires at roughly a quarter, then a half, then full productivity over their first two to three months (state your assumption), plus the time they cost a mentor.
5. Give two or three team options (for example lean, balanced, fast), each with headcount by skill, expected finish range, cost in person-months, and the coordination overhead it adds. Note where a workstream can only absorb a certain number of people.
6. Name the skills that are scarce (one person who knows the payments code, no mobile engineer) and whether to hire, borrow, contract or descope.
7. Say plainly if the date cannot be met by any team size, and what scope cut would make it reachable.
</task>

<constraints>
- Do not divide effort by weeks and call it a team size.
- Every productivity and ramp-up figure is an assumption; label it and let the user replace it.
- Do not invent salaries or rates; give cost in person-months unless rates are provided.
- Treat contractors and new hires as needing onboarding too.
{{> output/uncertainty}}
</constraints>

<output_format>
## Answer
Two sentences: the recommended team shape and the date it likely reaches, or that the date is not reachable.
## Effort and calendar
Effort range, critical path length, usable weeks, with the arithmetic.
## Team options
Table: Option | People by skill | Likely finish | Person-months | Coordination cost | Main risk.
## Skills needed
Bullets, with the scarce skills flagged and how to cover them.
## Risks of adding people
Bullets.
## What would change it
The three assumptions that move the answer most.
</output_format>
