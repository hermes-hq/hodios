---
schema: 1
id: manage-incoming-requests
kind: prompt
title: Manage incoming requests
description: Sets up one intake for ad-hoc requests colleagues send by chat, email and in passing, with triage rules, a visible queue, reply templates and a weekly check, so nothing is lost or jumps the line.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, data-analyst, designer]
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
tags: [request-intake, ad-hoc-requests, triage-rules, queue, service-levels, stakeholders]
pairs_with:
  prompts: [plan-around-interruptions, decline-request-gracefully, set-up-task-system]
args:
  - name: requests
    description: The kinds of requests you get, from whom, through which channels, and roughly how many a week, with a few real examples.
    type: text
    required: true
  - name: tools
    description: What you already use for tasks or tickets (a task app, a spreadsheet, a ticketing tool, nothing). Optional.
    type: string
  - name: constraints
    description: Your planned work that requests compete with, and who decides priorities if requests clash. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Request types, Intake, Triage rules, The queue, Reply templates, Rollout message, Weekly check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who is the go-to person for ad-hoc requests turn a stream of chat messages, emails and hallway asks into a manageable queue. Requests get lost when they live in five channels, get done in the order of whoever shouts loudest, and quietly eat the planned work. The fixes that work are: one place every request lands (the user copies corridor and chat asks there themselves at first), a short set of request types each with a standard turnaround, triage at set times rather than on arrival, a queue requesters can see so they stop chasing, and a capacity cap that tells the user when to escalate priorities to whoever owns them.

Requests:
<requests>
{{requests}}
</requests>
{{#tools}}Tools: {{tools}}{{/tools}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Group the requests into three to six types (for example quick question, data pull, small change, new project) with a typical size and a standard turnaround for each.
2. Design the intake: the one place requests land, the minimum information a request must carry (what, why, by when, who decides), and how the user captures requests that still arrive in chat or in person.
3. Write triage rules: when triage happens, how to decide do now, schedule, redirect or decline, and when to escalate a clash to the person who owns priorities.
4. Design the queue in the user's tool (or a simple spreadsheet if none): columns, statuses, who can see it, and a weekly capacity cap so planned work is protected.
5. Draft short reply templates: received with expected date, need more information, redirected to someone else, declined or deferred with a reason.
6. Draft a short rollout message to colleagues explaining the new way to ask.
7. Set a weekly 15-minute check: what to look at and what to change.
</task>

<constraints>
- Keep the intake light; if a form has more than four required fields, people will bypass it.
- Do not tell the user to refuse colleagues' requests outright; declines must offer a reason and an alternative.
- If the user is not the person who sets priorities, the triage rules must route clashes to that person, not settle them alone.
- Do not invent tool features; describe columns and statuses that any task app or spreadsheet can hold.
- If the request volume is far beyond one person's capacity, say so and suggest raising it with the manager with the numbers.
</constraints>

<output_format>
## Request types
Table: Type | Example | Typical size | Turnaround.

## Intake
Bullets: where, required fields, capture habit.

## Triage rules
Numbered rules.

## The queue
Columns, statuses, visibility, capacity cap.

## Reply templates
Four short templates.

## Rollout message
Ready-to-send message.

## Weekly check
Checklist.
</output_format>
