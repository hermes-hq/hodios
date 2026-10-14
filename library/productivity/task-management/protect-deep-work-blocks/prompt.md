---
schema: 1
id: protect-deep-work-blocks
kind: prompt
title: Protect deep work blocks in your calendar
description: Finds and protects regular blocks for focused work in a meeting-heavy calendar, with where to place them, which meetings to move or shorten, how to defend them and messages to send.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, researcher]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [deep-work, focus-time, calendar-blocking, maker-schedule, time-blocking]
pairs_with:
  prompts: [plan-my-week, audit-time-use, run-focus-session]
args:
  - name: calendar
    description: Your typical week of meetings and fixed commitments (paste or describe it), which meetings you run, which you just attend, and any that are optional.
    type: text
    required: true
  - name: focus_work
    description: The work that needs focus, how many hours a week it really needs, when your energy is best, and your team's expectations about response times.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your week now, Where the blocks go, Meetings to change, Defending the blocks, Messages to send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people win back focus time the way a seasoned engineering manager or research lead coaches their team. Hard thinking usually needs unbroken blocks of 60 to 90 minutes or more, and a calendar of 30-minute gaps between meetings produces none, even if the total free time looks fine. The levers that work: cluster meetings on certain days or half-days, move recurring meetings that sit in the middle of a morning, shorten default lengths, decline or go async on status meetings, and put the blocks in the calendar as real recurring events placed at the person's best energy time. Blocks survive only with defence rules: what may interrupt them, when messages are checked, and what to do when someone books over one. A person's level of control varies: managers and senior staff can move much more than a new joiner or someone in a support role, so the plan has to fit what they can actually change.

<calendar>
{{calendar}}
</calendar>

<focus_work>
{{focus_work}}
</focus_work>
</context>

<task>
1. Your week now: count the hours of meetings and the free stretches of at least 60 minutes (noting which reach 90), and name the meetings that fragment the best hours.
2. Where the blocks go: a weekly pattern of focus blocks at their best energy times, with how many hours that gives against what the work needs.
3. Meetings to change: for each meeting that blocks the pattern, a suggestion (move, shorten, cluster, make async, decline, or keep), noting which ones they control and which need a request.
4. Defending the blocks: rules for notifications, response expectations, what counts as an interruption worth taking, and what to do when someone books over a block.
5. Messages to send: short notes to the team or meeting owners proposing the changes and explaining the focus time, framed around better work and response times.
</task>

<constraints>
- Respect what they cannot move; never suggest declining meetings that are clearly part of their role or required by their manager without saying it needs agreement.
- Do not invent meetings or colleagues; use what they gave.
- If even the best plan cannot reach the hours the work needs, say so and suggest what to raise with their manager.
- Keep messages friendly and specific, under 120 words each.
</constraints>

<output_format>
## Your week now
## Where the blocks go
Table: Day | Block | Hours
## Meetings to change
Table: Meeting | Change | You control it?
## Defending the blocks
## Messages to send
</output_format>
