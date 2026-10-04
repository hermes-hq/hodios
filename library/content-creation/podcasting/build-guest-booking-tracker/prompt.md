---
schema: 1
id: build-guest-booking-tracker
kind: prompt
title: Build a guest booking tracker
description: Turns messy emails and notes about potential podcast guests into a booking tracker with status, contact route, angle, dates, owners and follow-ups, plus the next three messages to send.
category: podcasting
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes, message]
output: [table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [guest-booking, pipeline, follow-ups, csv, production-tracking]
pairs_with:
  prompts: [write-podcast-guest-pitch, write-guest-prep-packet, plan-podcast-season]
  personas: [podcast-producer]
args:
  - name: notes
    description: Paste everything about possible and booked guests - email threads, DMs, notes, ideas - with today's date so follow-ups can be dated.
    type: text
    required: true
  - name: format
    description: table gives a markdown table to read and edit; csv gives comma-separated text to paste into a spreadsheet.
    type: enum
    enum: [table, csv]
    default: table
output_contract:
  format: markdown
  sections: [Tracker, Next three messages, Gaps and conflicts]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a podcaster's scattered guest notes into one tracker. Guest booking breaks down quietly: a "yes, maybe next month" is never followed up, two guests are booked on the same slot, prep is nobody's job, and a recorded episode sits unreleased because nobody told the guest the date. The tracker's job is to make the next action and its date obvious for every guest.

Statuses, in order: idea, to contact, contacted, follow-up due, agreed, scheduled, recorded, released, declined or parked.

Output format: {{format}}
</context>

<task>
<notes>
{{notes}}
</notes>

1. Find every person mentioned as a possible, agreed or past guest. Merge duplicates (same person under a nickname or email).
2. For each guest fill: name; status; contact route (the channel only, such as "email thread" or "via their agent", and the address only if it appears in the notes); angle or episode idea; availability; prep owner; recording date; release date; last contact date; next action; follow-up due date.
3. Set follow-up dates with simple rules: no reply after 7 days, one polite follow-up; no reply after a second follow-up, park it; "ask me next month" means a dated reminder; a recorded episode gets a release-date note to the guest at least a week before release.
4. Flag conflicts: two recordings on the same slot, release dates that clash, recordings without a prep owner, agreed guests with no date.
5. Write the next three messages to send, chosen by urgency, each short, warm and specific to the thread (a follow-up, a scheduling message, a release-date note).
6. List what is missing or unclear.
</task>

<constraints>
- Never invent emails, phone numbers, handles, dates or availability. Use only what is in the notes; leave the cell blank or write "unknown".
- Do not add guests who are not in the notes.
- Use the date given in the notes as today; if none is given, leave follow-up dates relative ("in 7 days") and say so.
- For csv, quote every field that contains a comma, use one header row, and output only the CSV in a code block under Tracker.
- Keep messages under 100 words each, with [X] for anything unknown.
</constraints>

<output_format>
## Tracker
Columns: Guest | Status | Contact route | Angle | Availability | Prep owner | Recording date | Release date | Last contact | Next action | Follow-up due. Markdown table or CSV per the format, sorted by follow-up due date.
## Next three messages
Each with who it goes to, why now, and the message.
## Gaps and conflicts
Bullets, or "None".
</output_format>
