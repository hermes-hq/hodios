---
schema: 1
id: set-up-report-request-intake
kind: prompt
title: Set up intake for ad hoc data requests
description: Sets up how an analytics team takes in, sizes and prioritises ad hoc data and report requests, with an intake form, triage rules, service levels, a request rota and review measures.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [data-analyst, manager, business-analyst, operations-manager]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [request-triage, analytics-team, service-levels, request-priority, intake-form]
pairs_with:
  prompts: [write-data-request-brief, prune-report-inventory, plan-self-service-reporting]
args:
  - name: team_situation
    description: "The team (size, skills), who sends requests and how today (chat, email, hallway), rough volume per week, what kinds of requests arrive, and what is going wrong."
    type: text
    required: true
  - name: tools
    description: The ticketing or work tracking tools available, and any existing service commitments. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Intake form, Triage rules, Service levels, Capacity and rota, Tracking and review, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Analytics teams drown in ad hoc requests when requests arrive through every channel, nobody records them, and the loudest requester wins. The result is analysts context-switching all day, planned work slipping, and requesters who feel ignored. Teams that fix this do a few things consistently. They take requests through one door with a short form that forces the requester to state the decision the data will inform and the real deadline; that question alone cuts or reshapes a large share of requests. They sort requests into size tiers (a quick answer, a standard request, a project, and a request for a new recurring report, which goes to the roadmap rather than the queue). They prioritise by the value of the decision and the deadline, not by seniority alone. They protect the rest of the team by rotating one analyst onto requests each week. They point repeat questions to existing reports or self-service, and they review the queue data monthly to see what keeps being asked and should become a report.
</context>

<task>
<team_situation>
{{team_situation}}
</team_situation>
{{#tools}}

<tools>
{{tools}}
</tools>
{{/tools}}

1. Diagnose the current problems from the situation in two or three sentences.
2. Design the intake form: no more than eight fields, including requester, the decision or action the answer supports, the question, needed by and why, definitions or filters already known, existing reports checked, and output wanted. Mark which are required.
3. Write triage rules: size tiers with rough effort bounds suited to this team, how each tier is handled, a priority rule (for example decision value times urgency, with stated levels), and routing for requests that existing reports or self-service can answer, and for new recurring reports.
4. Set service levels per tier: time to acknowledge, time to first answer or estimate, and what happens when a deadline cannot be met. Keep them achievable for the stated volume and team size.
5. Set capacity: the share of team time reserved for requests, based on the volume given, and a weekly request rota or office hours if the team is big enough.
6. Define tracking and review: fields to record, and a monthly review of volume, cycle time, backlog age, share answered by existing reports, and repeat questions that should become reports or self-service.
7. Plan the rollout: announcement text in two or three sentences, a trial period, and what to do with requests that bypass the door.
</task>

<constraints>
- Fit the process to the team's size; a two-person team needs a shared list and a form, not a ticketing system and a committee.
- Present any numbers for effort bounds, service levels or capacity as starting points to adjust, derived from the volume given.
- Do not recommend tools the team does not have unless asked; work with those listed.
- Keep the form short; every extra field lowers use.
</constraints>

<output_format>
## Summary
Diagnosis and the new process in five bullets or fewer.

## Intake form
Table: field | required | why it is asked.

## Triage rules
Table: tier | effort | handling | example. Then the priority rule.

## Service levels
Table: tier | acknowledge | first answer or estimate.

## Capacity and rota
## Tracking and review
Fields and monthly measures.

## Rollout
Steps with the announcement text.
</output_format>
