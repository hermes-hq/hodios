---
schema: 1
id: track-waiting-for-items
kind: prompt
title: Track what others owe you
description: Builds a waiting-for list of replies, deliverables, refunds and approvals other people owe you, with when to chase each, polite nudges that escalate and what to do when nothing comes back.
category: task-management
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, manager, project-manager, operations-manager]
requires: [none]
inputs: [text, notes]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [waiting-for, follow-ups, chasing, delegation-tracking, open-loops]
pairs_with:
  prompts: [run-weekly-review, set-up-task-system, write-follow-up-email]
args:
  - name: items
    description: Things you are waiting for, each with who owes it, when you asked, how it was asked (email, chat, in person), any date they promised, and what depends on it.
    type: text
    required: true
  - name: tool
    description: Where you keep tasks (an app, a spreadsheet, a notebook), so the list can be set up there. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Waiting-for list, Chase now, Nudge messages, If it still does not come, Keeping the list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people keep track of what other people owe them, the way an experienced executive assistant does. Things you are waiting for are open loops too, and they cause most "I thought you were handling it" problems: the refund nobody chased, the approval that blocked a project for three weeks, the contractor quote that never arrived. The habit that works is a single waiting-for list with the date asked and a chase date set by what depends on it, followed by nudges that are polite, specific and easy to answer, escalating calmly in channel and in person rather than in tone. People respond faster to a short message with the original request repeated and a clear date than to "just checking in".

<items>
{{items}}
</items>
{{#tool}}
Tool: {{tool}}
{{/tool}}
</context>

<task>
1. Waiting-for list: one row per item with who, what, asked on, promised date, what depends on it, and a chase date. Set the chase date from what depends on it: sooner when it blocks something with a deadline, later for low-stakes items; state the reasoning briefly.
2. Chase now: the items whose chase date is today or past, in order of what depends on them.
3. Nudge messages: for each chase-now item, a first nudge (restate the request, give a date, make the reply easy), and for items already nudged, a second message that changes something: a different channel, a smaller ask, a call, or copying the person who needs it, with care.
4. If it still does not come: for each item, the fallback (do it another way, escalate to whom, cancel, or accept the delay and tell whoever depends on you).
5. Keeping the list: how to set it up in their tool (a list, tag or column), how to log a new item in five seconds when you ask for something, and checking it in the weekly review.
</task>

<constraints>
- Keep nudges short, courteous and specific; no passive-aggressive phrasing.
- Do not invent dates, promises or people; mark missing dates as unknown.
- Escalation suggestions name roles or people from the input only; if none, say "the person who can decide".
- For consumer refunds or disputes, suggest checking the company's complaint process and their consumer rights locally, without stating rights as fact.
</constraints>

<output_format>
## Waiting-for list
Table: Who | What | Asked on | Promised | Depends on it | Chase on
## Chase now
## Nudge messages
## If it still does not come
## Keeping the list
</output_format>
