---
schema: 1
id: plan-sales-kickoff
kind: prompt
title: Plan a sales kickoff
description: Plans an annual or half-year sales kickoff with goals, an agenda that mixes the year's plan with practised skills, recognition and the 90-day follow-up that makes the training stick.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive, founder, operations-manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sales-kickoff, sales-enablement, team-meetings, sales-training, sales-leadership]
pairs_with:
  prompts: [build-sales-playbook, plan-new-rep-ramp, set-sales-quotas, plan-team-offsite]
args:
  - name: team
    description: Team size and roles (reps, SDRs, managers, customer success, partners), how many are new, remote or in one place, and how long you have (half day, one day, two days).
    type: text
    required: true
  - name: year_ahead
    description: What is changing this year - targets, new products or pricing, territory or comp changes, new segments, last year's results and the main skill gaps or lost-deal reasons you have seen.
    type: text
    required: true
  - name: limits
    description: Budget, venue or online, who from leadership and other teams can present, and any fixed slots. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Agenda, Session designs, Recognition, Logistics checklist, 90-day follow-up, How you will know it worked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan sales kickoffs (SKOs) for sales leaders. The typical kickoff is a day of slide presentations from every department that reps forget within a week. Enablement leaders who run good ones know: reps come for three things, clarity on the number and how they get paid, practical skills they can use on Monday, and recognition in front of peers; anything else must earn its slot. Skills only transfer when reps practise them (role-plays on real deal scenarios, certification on the new pitch) and when managers reinforce them in weekly one-to-ones afterwards. Comp and territory changes are best explained before or at the start, in small groups, so anxiety about pay does not drown out every other session. Customer voices (a live customer panel or interview) land harder than any internal presentation.
</context>

<task>
<team>
{{team}}
</team>

<year_ahead>
{{year_ahead}}
</year_ahead>

{{#limits}}<limits>
{{limits}}
</limits>{{/limits}}

1. **Goals:** three outcomes at most for the kickoff (for example "every rep can run the new discovery flow", "everyone knows their number and plan"), tied to the year-ahead notes.
2. **Agenda:** a timed agenda for the length given, with at least a third of the time spent in practice rather than listening. Put the number, comp and territory clarity early. Keep any single talk under 30 minutes. Include breaks and networking time.
3. **Session designs:** for each skills or practice session, the format (role-play in threes, deal clinic, certification), the real scenario used, who facilitates, materials needed and what "done" looks like.
4. **Recognition:** how to recognise last year's results and behaviours fairly (not only top revenue: also team help, process, new-rep progress), with care for remote attendees.
5. **Logistics checklist:** pre-work for reps, briefings for presenters (time limit, one message each), materials, hybrid setup if anyone is remote, and dates counted back from the event.
6. **90-day follow-up:** weekly or fortnightly reinforcement tied to each goal (manager one-to-one prompts, call reviews, a recertification), owners and dates.
7. **How you will know it worked:** two or three measures with a baseline, such as certification pass rate, use of the new process in CRM, or stage conversion after 90 days.
</task>

<constraints>
- Work from the notes given; do not invent targets, results, product names or speakers. Use placeholders where details are missing.
- Do not plan sessions that share confidential comp details of individuals in public.
- Keep the agenda realistic for the time given; cut sessions rather than cram.
- If the team is very small (under about five people), scale the plan down to a working session instead of an event, and say so.
</constraints>

<output_format>
## Goals
Numbered, at most three.

## Agenda
Table: Time | Session | Format | Owner | Goal it serves.

## Session designs
One short block per practice session.

## Recognition
Bullets.

## Logistics checklist
Checklist with dates relative to the event.

## 90-day follow-up
Table: Week | Activity | Owner | Goal.

## How you will know it worked
Bullets: measure, baseline, target.
</output_format>
