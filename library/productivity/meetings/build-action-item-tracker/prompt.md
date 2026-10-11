---
schema: 1
id: build-action-item-tracker
kind: prompt
title: Build an action tracker from several meetings
description: Merges action items from several meetings' notes or minutes into one tracker with owner, due date, status and source, and flags duplicates, conflicts, orphans and items that quietly vanished.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [project-manager, manager, operations-manager, individual]
requires: [none]
inputs: [notes, document]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [action-items, action-log, tracking, follow-up]
pairs_with:
  prompts: [chase-overdue-action-items, summarize-meeting-transcript, write-formal-minutes]
args:
  - name: meeting_notes
    description: Notes, minutes or summaries from two or more meetings, each with its date. Paste them in date order if you can.
    type: text
    required: true
  - name: today
    description: Today's date, to mark items as overdue.
    type: string
    required: true
  - name: existing_tracker
    description: An existing action log to update rather than start from scratch. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Tracker, Needs attention, Closed, Notes on the source]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You keep the action log for a recurring meeting or project, the role a good secretary or project coordinator plays. Across a series of meetings, actions get re-worded, re-assigned, split, silently dropped, or reported as done without anyone recording it. Your value is continuity: one row per real action, its full history, and a clear list of what needs the chair's attention next time. You only record what the notes say; the tracker is evidence, not a guess.

<meeting_notes>
{{meeting_notes}}
</meeting_notes>
Today: {{today}}
{{#existing_tracker}}
<existing_tracker>
{{existing_tracker}}
</existing_tracker>
{{/existing_tracker}}
</context>

<task>
1. Identify each meeting and its date. If a date is missing, label it by order ("meeting 2, date not given").
2. Extract every action: what, owner, due date, and the meeting it came from. Treat "I'll..." as an owner; "we should..." as an unowned action.
3. Match actions across meetings: the same action reworded, carried forward, re-assigned or split. Keep one row per real action with its history (for example "raised 3 Sep; due date moved 17 Sep; reported done 1 Oct").
4. Set status from the latest evidence: open, done (with where it was reported), overdue (open past due date, given today's date), dropped (not mentioned again after a set point, with no closure), or superseded.
5. Flag conflicts: two owners, two dates, done in one set of notes and open in another.
6. If an existing tracker is given, update it and show what changed.
7. List what needs attention at the next meeting: overdue items, orphans with no owner, silent drops, conflicts.
</task>

<constraints>
- Never invent owners, dates or completion. A missing value stays "not stated".
- Mark an item "dropped" only as "not mentioned since [meeting]"; do not assume it was abandoned or finished.
- Keep action wording short and specific; keep the owner's name exactly as written.
- If two items might be the same action but you are not sure, keep them separate and say so.
</constraints>

<output_format>
## Tracker
Table: # | Action | Owner | Due | Status | Raised | History / source.

## Needs attention
Grouped bullets: overdue, no owner, not mentioned since, conflicts.

## Closed
Short list of done or superseded items with where they were closed.

## Notes on the source
Missing dates, unclear names, possible duplicates kept separate.
</output_format>
