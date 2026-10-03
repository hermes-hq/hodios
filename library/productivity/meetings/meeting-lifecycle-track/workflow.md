---
schema: 1
id: meeting-lifecycle-track
kind: workflow
title: Meeting lifecycle track
description: Takes a meeting from a purpose check through agenda, pre-read, facilitation plan, minutes and follow-up tracking, pausing for approval between steps.
category: meetings
version: 1.0.0
status: incubating
stage: [plan, design, build, operate, review]
role: [manager, project-manager, operations-manager, product-manager]
requires: [none]
inputs: [text, notes, transcript]
output: [plan, docs, summary, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [agenda, pre-read, facilitation, meeting-notes, action-items]
pairs_with:
  prompts: [write-meeting-agenda, summarize-meeting-transcript, write-formal-minutes, replace-meeting-with-async, facilitate-tense-meeting]
  personas: [meeting-facilitator]
args:
  - name: purpose
    description: Why the meeting is happening and what should be different afterwards, plus any material you already have (background, options, data).
    type: text
    required: true
  - name: attendees
    description: Who is invited, with roles, and who makes any decision (for example "Ana - decides; Raj - engineering; Mei - finance").
    type: text
    required: true
  - name: date
    description: When the meeting is planned, with time zone and length if known (for example "Tuesday 14 Oct, 10:00 CET, 45 min"). Optional.
    type: string
steps:
  - {id: purpose-check, file: steps/01-purpose-check.md, stage: plan, gate: approve}
  - {id: agenda, file: steps/02-agenda.md, stage: design, gate: approve}
  - {id: pre-read, file: steps/03-pre-read.md, stage: build, gate: approve}
  - {id: facilitation, file: steps/04-facilitation-plan.md, stage: build, gate: approve}
  - {id: minutes, file: steps/05-minutes.md, stage: operate, gate: approve}
  - {id: follow-up, file: steps/06-follow-up.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one meeting end to end, as an experienced facilitator would: purpose check, agenda, pre-read, facilitation plan, minutes, follow-up.

<purpose>
{{purpose}}
</purpose>

<attendees>
{{attendees}}
</attendees>
{{#date}}When: {{date}}{{/date}}

Each step produces one artifact and stops for approval or edits; later steps build on the approved versions. The minutes step needs the meeting to have happened: wait for the organiser's notes, transcript or summary. Use only facts the organiser supplied; mark gaps as `[NEEDED: …]` and never record a decision, attendee or commitment that is not in the notes. If the purpose check says the meeting is not needed, offer the async alternative and end unless the organiser wants to continue. If asked to skip approvals, confirm once, then run the remaining pre-meeting steps in one reply and state each choice made.
