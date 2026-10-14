---
schema: 1
id: plan-distributed-team-workflow
kind: prompt
title: Plan a distributed engineering team's workflow
description: Plans how an engineering team spread across time zones hands off work, with overlap hours, async rituals, review turnaround targets, decision records and on-call coverage.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [remote-teams, time-zones, async-work, code-review-turnaround, follow-the-sun, handoffs]
pairs_with:
  prompts: [assign-work-across-developers, design-interrupt-rotation]
args:
  - name: team
    description: Who is where (cities or UTC offsets), roles, working hours, and how the team plans, reviews and deploys today.
    type: text
    required: true
  - name: problems
    description: What hurts now, for example PRs waiting a day for review, decisions made in one time zone, meetings at bad hours for the same people, blocked mornings.
    type: text
output_contract:
  format: markdown
  sections: [Time zone map, Overlap and meetings, Async rituals, Code review and handoffs, Decisions and docs, On-call, Trial and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Distributed engineering teams lose most time to waiting: a pull request opened at the end of one person's day is reviewed at the start of the reviewer's, a question asked in chat sits for twelve hours, and a decision made in a meeting one group could not attend gets reopened. What works is designing for the time zone gaps rather than pretending they do not exist: a small, protected overlap window used for things that need real time, everything else written down by default, work split so each time zone can finish things without blocking, reviewers in the same or adjacent time zones for fast loops, end-of-day handoff notes for work that crosses over, and meeting times that rotate so the same people do not always take the early or late slot. On-call needs to follow working hours where possible instead of waking people.
</context>

<task>
Team: {{team}}
{{#problems}}Problems: {{problems}}{{/problems}}

1. Time zone map: working hours per location in a common reference (UTC) and the overlap windows between each pair. Check daylight saving changes that shift overlap.
2. Overlap and meetings: which few meetings need real time, when they happen within the overlap, and a rotation for meetings that fall outside comfortable hours. Everything else becomes async.
3. Async rituals: written stand-up (format and when), planning inputs collected in writing before a shorter live session, demos recorded, and a response-time norm for chat versus urgent channels.
4. Code review and handoffs: review turnaround targets in working hours, reviewer pairing by time zone, small pull requests, and an end-of-day handoff note template for work that continues in another zone. Split work so most tasks can be finished within one zone.
5. Decisions and docs: where decisions are written (decision records, design docs), a comment period that spans all zones before a decision is final, and how to escalate.
6. On-call: a rotation that follows the working day if the team spans enough zones, handover notes, and what happens outside covered hours.
7. Trial and review: what to try for four to six weeks, and the signals to check (review wait time, blocked hours, meeting load per person).
</task>

<constraints>
- Do not assume time zones or hours that were not given; ask or mark them.
- Do not schedule recurring meetings that consistently fall outside someone's working hours without a rotation.
- Keep the number of live meetings small.
{{> output/uncertainty}}
</constraints>

<output_format>
## Time zone map
Table: Location | UTC offset | Working hours in UTC | Overlap with others.
## Overlap and meetings
## Async rituals
## Code review and handoffs
Including the handoff note template.
## Decisions and docs
## On-call
## Trial and review
</output_format>
