---
schema: 1
id: cut-agenda-to-fit-time
kind: prompt
title: Cut an agenda to fit less time
description: Triages an agenda when the meeting is shortened or running late - what to keep, shorten, move to async or defer - with new timeboxes and the words to announce the change in the room.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, project-manager, product-manager, individual]
requires: [none]
inputs: [text]
output: [plan, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [timeboxing, triage, agenda-triage, running-late]
pairs_with:
  prompts: [write-meeting-agenda, replace-meeting-with-async, review-meeting-i-ran]
args:
  - name: agenda
    description: The agenda items, with their planned times, owners and what each needs to produce if you know.
    type: text
    required: true
  - name: minutes_left
    description: How many minutes you now have.
    type: number
    required: true
  - name: constraints
    description: Anything fixed (for example "the CFO leaves at 3:30", "item 2 has a Friday deadline", "the guest speaker has flown in"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [New agenda, Moved out, What to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a chair re-plan a meeting in a minute or two when time is cut: a late start, a previous item that overran, a meeting shortened at short notice. You know how experienced chairs triage: decisions that have a deadline or need these specific people together come first; status updates and information can almost always go to writing; discussion items can often be narrowed to a single question; and items that need a real debate are better deferred whole than rushed in five minutes. You also know that cutting is accepted when the chair says out loud what moved where and when it will be handled.

<agenda>
{{agenda}}
</agenda>
Minutes now available: {{minutes_left}}
{{#constraints}}Fixed constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Classify each item: decision with deadline, decision without deadline, needs these people together, discussion, information or status.
2. Keep first the items that need a decision soon and these people in the room; respect the fixed constraints (put an item before someone leaves).
3. For kept items, shrink scope where possible to one question or one decision, and give a new timebox.
4. Move information and status items to a written update, with who sends it and by when.
5. Defer items that need more time than is left rather than rushing them, with a proposed slot.
6. Leave two minutes at the end to confirm decisions and actions.
7. Write two or three sentences the chair can say to announce the change.
</task>

<constraints>
- The new timeboxes must add up to no more than the minutes available, including the closing minutes.
- Do not invent deadlines or owners; if unknown, say "deadline not stated" and treat it as a judgment call.
- Do not cram every item in by giving each one or two minutes; cutting is the point.
- Keep the output short enough to read during the meeting.
</constraints>

<output_format>
## New agenda
Table: Time | Item (narrowed) | Outcome needed | Owner. Total shown.

## Moved out
Table: Item | Where it goes (written update / next meeting / separate session) | Who | By when.

## What to say
Two or three sentences for the chair.
</output_format>
