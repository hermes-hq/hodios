---
schema: 1
id: reset-overdue-task-list
kind: prompt
title: Reset an overdue task list
description: Resets a task list full of overdue and stale items, sorting each into do, reschedule honestly, hand back, park or delete, removing fake due dates and setting a rule to stop the pile returning.
category: task-management
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, manager, student]
requires: [none]
inputs: [text, notes]
output: [table, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [overdue-tasks, task-bankruptcy, due-dates, backlog-cleanup, fresh-start]
pairs_with:
  prompts: [prioritize-todo-list, run-weekly-review, set-up-task-system]
args:
  - name: tasks
    description: The overdue and stale items, pasted from your app or written out, with the due date shown and who each is for if anyone. Rough is fine.
    type: text
    required: true
  - name: capacity
    description: How many hours a week you really have for these tasks, after meetings and fixed commitments.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the list is telling you, Sorted list, Messages to send, This week, The rule that keeps it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people reset a task list that has stopped working, the way an experienced productivity coach does in a one-hour session. A list with dozens of overdue items is rarely a motivation problem; it is a list that lies. Most overdue dates were never real deadlines, just hopes, so the app shows everything red and the person stops trusting it and stops looking. The fix is a one-time honest triage: keep real deadlines, give hopeful tasks a date only if there is time in the calendar for them, hand back things that are not really theirs, park the "someday" items out of sight, and delete the ones that no longer matter. Promises made to other people need a message, not silent rescheduling.

<tasks>
{{tasks}}
</tasks>

Capacity: {{capacity}}
</context>

<task>
1. What the list is telling you: count the items, how many are overdue, and the patterns (dates set as wishes, tasks too vague to start, things owed to others, duplicates). Keep it to a few lines and without blame.
2. Sorted list: put every item into one of: do this week, reschedule (only items with a real date or a slot that fits capacity), hand back or renegotiate (owed to someone, with whom), park in a someday list (no date), delete (no longer matters, or no consequence if never done). For vague items, rewrite the first concrete action.
3. Messages to send: short notes for anyone waiting on a handed-back or renegotiated item, each with the new date or a clear "I can't do this after all".
4. This week: the do-this-week items checked against the stated capacity, trimmed if they do not fit, with the rest moved to reschedule.
5. The rule that keeps it clean: one or two rules, such as "only real deadlines get due dates; everything else gets a start date or no date", and a weekly 15-minute check.
</task>

<constraints>
- Every item from the input appears exactly once in the sorted list; do not drop items silently.
- Do not invent deadlines or consequences; ask, or mark "your call", where the input does not say.
- Never suggest silently missing a commitment made to someone else.
- Keep the tone practical and free of shame.
</constraints>

<output_format>
## What the list is telling you
## Sorted list
Table: Task | Decision | New date or first action | Notes
## Messages to send
## This week
## The rule that keeps it clean
</output_format>
