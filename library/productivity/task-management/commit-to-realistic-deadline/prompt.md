---
schema: 1
id: commit-to-realistic-deadline
kind: prompt
title: Commit to a realistic deadline
description: Answers "when can you have this?" by placing the new task in your existing queue, sizing it with a range and buffer, and drafting a reply with a date you can keep and what would make it sooner.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, designer, consultant]
requires: [none]
inputs: [message, text]
output: [plan, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [due-dates, estimating, queue, promises, availability, planning-fallacy]
pairs_with:
  prompts: [estimate-task-durations, acknowledge-request-and-set-timeline, push-back-on-deadline-by-email]
args:
  - name: request
    description: What you have been asked to do, by whom, and how they asked (for example "client asks when the revised logo will be ready").
    type: text
    required: true
  - name: queue
    description: What you already have on, with due dates and rough sizes, and your available hours per week.
    type: text
    required: true
  - name: notes
    description: Anything that affects timing - holidays, dependencies on others, how big similar work took last time. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Size of the new task, Where it fits, Date to commit to, Reply, What would make it sooner]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone give a delivery date they will actually hit. People answer "when can you have it?" from the gut, picturing the task as if it were the only thing on their plate, and quote the day they would finish if nothing else happened. Reliable estimators do three things: they size the task as a range based on similar past work, they place it behind the work already promised (or say what it would bump), and they add buffer for waiting on other people and for the normal interruptions of a week. They then commit to a specific date at the conservative end, with a check-in point, and offer what would make it faster. A slightly later date that is kept builds more trust than an early one that slips.

Request:
<request>
{{request}}
</request>

Current queue:
<queue>
{{queue}}
</queue>
{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. Size the new task as a range in working hours (best and likely), using any past examples the user gave, and list hidden steps such as review rounds, waiting for input and final checks.
2. Place it in the queue: compute when free hours become available after current commitments, and show the arithmetic with the user's weekly hours.
3. Add buffer for dependencies on other people and for interruptions (about 20 to 30 percent unless the user's history says otherwise) and pick a date at the likely end, not the best.
4. Draft a short reply that gives that date, one condition it depends on (for example "if I get the copy by Monday"), and a check-in point.
5. Offer what would bring it sooner: what could be bumped (and who must agree), a smaller first version, or an earlier partial delivery.
</task>

<constraints>
- Do not quietly push existing commitments back to fit the new one; if the user wants to bump something, name it and who must agree.
- Never give a date sooner than the arithmetic supports; show it.
- If the queue lacks sizes or hours, state the assumptions and how they change the date.
- If the requester has already imposed a deadline that is unrealistic, say so and point to negotiating it rather than committing to it.
</constraints>

<output_format>
## Size of the new task
Range in hours and hidden steps.

## Where it fits
Short arithmetic and the earliest free slot.

## Date to commit to
One date, with the buffer explained in a sentence.

## Reply
Ready to send.

## What would make it sooner
Bullets.
</output_format>
