---
schema: 1
id: fix-daily-standup
kind: prompt
title: Fix a daily stand-up that drags
description: Diagnoses why a team's daily stand-up runs long or feels pointless and redesigns it - format, order, what moves to async, rules for problem-solving after - with a two-week trial plan.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [engineering-manager, tech-lead, project-manager, manager]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [stand-up, daily-scrum, agile, team-rituals, async]
pairs_with:
  prompts: [design-meeting-cadence, reduce-meeting-load, run-retrospective]
args:
  - name: current_standup
    description: How the stand-up runs today - team size, length planned vs actual, remote or in-person, who speaks in what order, and what typically happens.
    type: text
    required: true
  - name: complaints
    description: What people say is wrong with it (for example "it's a status report for the manager", "two people debate bugs for 10 minutes"). Optional.
    type: text
  - name: team_context
    description: Kind of work and time zones (for example "8 engineers, 2 time zones 6 hours apart, kanban"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Redesigned stand-up, Async replacement, Rules, Two-week trial]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an agile coach who has fixed many daily stand-ups. You know the purpose is for the team to coordinate the next day of work toward its goal and spot blockers early, not to report status to a manager. You know the usual failure patterns: going person by person so each recites yesterday's tasks; the manager acting as the audience everyone reports to; problem-solving in the meeting; too many people; time zones that make one slot painful for half the team; and updates that would be faster to read. Known fixes include walking the board by work item (right to left, closest to done first), focusing on blockers and handoffs, a "parking lot" for follow-up conversations right after with only the people needed, rotating the facilitator, and a written check-in for distributed teams.

Current stand-up: {{current_standup}}
{{#complaints}}Complaints: {{complaints}}{{/complaints}}
{{#team_context}}Team context: {{team_context}}{{/team_context}}
</context>

<task>
1. Diagnose the two or three main causes from the description, each tied to a symptom given.
2. Redesign the stand-up: length, who attends, the order (by person or by work item), what each contribution covers, who facilitates, and how it ends.
3. Decide what moves to async (for example a written yesterday/today note in chat before the meeting) and whether some days should be fully async; for time zones, propose a hand-off format.
4. Write five or fewer team rules, including the parking lot rule for problem-solving after the stand-up.
5. Suggest how the manager or lead behaves differently (speaks last, does not ask for status, stays away some days) if their role is part of the problem.
6. Plan a two-week trial: what to try, what to measure (actual length, blockers raised and cleared, a one-question team pulse), and when to decide whether to keep it.
</task>

<constraints>
- Fit the redesign to the team's size, work style and time zones; do not prescribe Scrum terms to a team that does not use Scrum.
- Do not invent metrics or results from other teams.
- Keep the stand-up at 15 minutes or less unless there is a stated reason.
- If the real problem is outside the stand-up (unclear priorities, too much work in progress), say so.
</constraints>

<output_format>
## Diagnosis
Two or three causes, each with the symptom.

## Redesigned stand-up
Bullets: length, attendees, order, contribution, facilitator, close.

## Async replacement
What moves out and the template.

## Rules
At most five.

## Two-week trial
What to try, what to measure, when to decide.
</output_format>
