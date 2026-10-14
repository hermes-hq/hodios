---
schema: 1
id: run-async-brainwriting
kind: prompt
title: Run an async brainwriting round
description: Sets up a written 6-3-5 style brainwriting round that a remote or busy team runs over a few days in a shared document, with rotation rules, prompts, reminders and a way to converge.
category: brainstorming
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [manager, product-manager, engineering-manager, teacher]
requires: [none]
inputs: [topic, text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [brainwriting, 6-3-5, remote-teams, async-collaboration, time-zones]
pairs_with:
  prompts: [facilitate-group-brainstorm, cluster-ideas, write-how-might-we-questions]
args:
  - name: challenge
    description: What the team needs ideas for, why now, constraints and who decides afterwards.
    type: text
    required: true
  - name: team
    description: Who takes part - number of people, time zones or working patterns, and the shared tools you already use (a document, a whiteboard tool, a chat channel).
    type: text
    required: true
  - name: days
    description: How many working days the round can take, from 2 to 10.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Framed question, How the round works, Schedule, Messages to send, Template, Converging]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brainwriting (the classic 6-3-5 form: six people, three ideas each, five minutes per round, sheets passed on) produces more and more varied ideas than talking because nobody waits for a turn or anchors on the loudest voice. Run asynchronously, it also suits teams across time zones and people who think better in writing. What makes async rounds fail is predictable: a vague question, no fixed turn order so everyone writes on the same sheet, no deadline per turn, people judging instead of building, and nobody converging at the end. You design a round that avoids all of these and that someone can run from your plan with the tools they already have.

<challenge>
{{challenge}}
</challenge>
<team>
{{team}}
</team>
Working days available: {{days}}.
</context>

<task>
1. Frame the challenge as one "How might we ...?" question with its constraints and decision owner. If the challenge has no owner or is too vague, say what to settle first and still draft the question.
2. Size the round from the team: one column or sheet per person; each turn adds three ideas, at least one of which builds on an idea already on the sheet once there is one. Set the number of turns so the round fits {{days}} working days with a turn window per person (for example 24 hours) that respects their time zones. For more than 8 people, split into parallel groups of 4 to 6 and say so.
3. Fix the rotation: a named order (by initials or role, not by personal details) so each sheet passes through everyone in the group once, plus the rule for a missed turn (skip and pass on after the window, do not hold up the chain).
4. Give a shared-document template: the question at the top, ground rules, then one table per sheet with columns for turn, contributor initials, idea, builds on.
5. Write the messages: kickoff, a turn-ready nudge, a gentle reminder for late turns, and the close. Keep each under 120 words and in plain language.
6. Plan convergence: after the last turn, each person reads all sheets and marks favourites (a fixed number of votes), the facilitator clusters, and the decision owner picks what to test, with a date.
</task>

<constraints>
- Use only the tools the user named; if none were named, assume a shared document and a chat channel and say so.
- Do not schedule turns outside working hours of the time zones given; if time zones were not given, ask for them in the plan as an open point.
- Keep ground rules short: quantity first, no criticism during the round, build on others, one idea per line.
- Do not generate the team's ideas for them, beyond at most three seed examples clearly marked as optional.
</constraints>

<output_format>
## Framed question
The question, constraints and decision owner.

## How the round works
Five to eight bullets: group size, turns, ideas per turn, rotation, missed-turn rule.

## Schedule
Table: Day | Turn | Who writes on which sheet | Window closes.

## Messages to send
Kickoff, turn-ready, reminder and close, each in a quote block.

## Template
The shared-document layout as Markdown.

## Converging
Numbered steps with who does what and by when.
</output_format>
