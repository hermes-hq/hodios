---
schema: 1
id: run-volunteer-committee-meeting
kind: prompt
title: Run a volunteer committee meeting
description: Plans an informal volunteer committee meeting (PTA, sports club, community group) with a light agenda, roles, quick decisions, owned actions and short minutes that keep volunteers coming back.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent, manager, teacher]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [volunteers, community-groups, pta, light-minutes, action-items]
pairs_with:
  prompts: [prepare-to-chair-meeting, run-residents-association-agm, recruit-volunteers, chase-overdue-action-items]
args:
  - name: group
    description: The group, what it does, how many volunteers come, and how formal it is (constitution, officers, or just a WhatsApp group of helpers).
    type: text
    required: true
  - name: topics
    description: What needs discussing at the next meeting (events, money, jobs to share out, problems).
    type: text
    required: true
  - name: problems
    description: What tends to go wrong in your meetings (run late, same few do everything, decisions get reopened, people stop coming). Optional.
    type: text
  - name: minutes
    description: Meeting length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Agenda, Roles, Making decisions, Sharing out the work, Light minutes template, Keeping volunteers engaged]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer committees run meetings that people want to come back to. Volunteers give scarce evening time, so meetings that overrun, reopen last month's decisions, wander into gossip, or end with the same two people taking every job quietly drive people away, and the workload falls on fewer shoulders. Experienced volunteer chairs keep meetings to an hour, put decisions and jobs before discussion, break big jobs into small, well-defined tasks a newcomer can say yes to, record decisions and actions in a few lines rather than formal minutes, thank people by name, and handle money with simple transparency (a short treasurer's update, who can approve spending). Informal groups still benefit from a few rules: how decisions are made when people disagree, and what can be decided between meetings. If the group has a constitution or is a registered charity or association, its rules on officers, quorum and voting take priority.

Group: {{group}}
<topics>
{{topics}}
</topics>
{{#problems}}What tends to go wrong: {{problems}}{{/problems}}
Length: {{minutes}} minutes
</context>

<task>
1. Write an agenda for the given topics that fits the length: welcome and thanks, quick action review, decisions first, then planning and job sharing, money update, any other business capped, next date. Timebox each item and mark which need a decision.
2. Suggest light roles: chair, note-taker, timekeeper, treasurer if there is money, and rotate them where possible.
3. Set simple decision rules: how the group decides (general agreement, then a show of hands if needed), what the chair or a small group can decide between meetings, and spending limits. Note where a constitution may override these.
4. Show how to share out work: split each big job into small tasks with a clear end and time needed, ask for volunteers by task, and gently invite people who have not taken anything.
5. Provide a light minutes template: date, who came, decisions, actions with names and dates, money in and out, next meeting; to be sent within two days.
6. If problems are given, give a specific fix for each. Add three habits that keep volunteers engaged (thanks by name, finishing on time, welcoming newcomers).
</task>

<constraints>
- Keep it informal and friendly; do not impose formal procedure unless the group's rules require it.
- Do not give legal, tax or charity-law advice; if money, insurance or safeguarding matters arise, point to the group's governing rules or the relevant body.
- Do not invent names, figures or event dates; use placeholders.
- Keep the meeting within the time given.
</constraints>

<output_format>
## Agenda
Table: Time | Item | Lead | Decision needed?

## Roles
Bullets.

## Making decisions
Short rules.

## Sharing out the work
Method plus a task list template: Task | Time needed | Who | By when.

## Light minutes template
Ready-to-fill template.

## Keeping volunteers engaged
Fixes for the stated problems, plus three habits.
</output_format>
