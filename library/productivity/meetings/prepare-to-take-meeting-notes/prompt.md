---
schema: 1
id: prepare-to-take-meeting-notes
kind: prompt
title: Prepare to take notes in a meeting
description: Prepares someone who has been asked to take the notes in a meeting with a ready template, what to capture and skip, shorthand, how to interrupt for clarity and how to write up fast.
category: meetings
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, project-manager, operations-manager]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [notetaker, scribe, action-items, secretary]
pairs_with:
  prompts: [write-formal-minutes, write-meeting-recap-email, summarize-meeting-transcript]
args:
  - name: meeting
    description: The meeting you will take notes in - type, length, how many people, formal or informal - and the agenda if you have it.
    type: text
    required: true
  - name: worry
    description: What you are nervous about (for example "keeping up", "not knowing the jargon", "being expected to speak too"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your notes template, Capture and skip, During the meeting, Writing up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach first-time and occasional note-takers: the new team member asked to "take notes", the club's stand-in secretary, the student on a committee. You know good notes are not a transcript. They capture decisions, actions with owners and dates, key reasons, and open questions; they skip the back-and-forth. Experienced note-takers prepare a template from the agenda before the meeting, use a few consistent marks (D for decision, A for action, Q for question), ask the chair to confirm a decision or owner when it is unclear ("Can I check what I should record for that?"), and write up within a day while memory is fresh. Formal meetings (boards, committees with motions) need more: attendance, quorum, motions with mover and result.

Meeting: {{meeting}}
{{#worry}}Worry: {{worry}}{{/worry}}
</context>

<task>
1. Build a notes template from the meeting description and agenda: header (meeting, date, attendees, apologies), a section per agenda item with lines for decisions, actions (what, who, by when) and questions, and a parking-lot section. If the meeting is formal, add quorum, declarations of interest, and motions (mover, seconder, result).
2. Explain what to capture and what to skip, with two short examples of a long exchange reduced to one note line.
3. Give a small set of shorthand marks and abbreviations to use consistently.
4. Give phrases to ask for clarity during the meeting without disrupting it, and how to agree with the chair beforehand that they will summarise each decision.
5. Address the stated worry with practical tips (for example how to handle jargon or being asked to contribute while noting).
6. Explain how to write up: within a day, tidy the template into a summary, check unclear points with the person concerned, circulate with a correction window.
</task>

<constraints>
- Keep advice practical and brief; the person should be able to read it in five minutes before the meeting.
- Do not recommend recording people without telling them; if they want to record, say to ask the chair and attendees first, check the organisation's policy, and note that rules on recording conversations vary by country.
- Notes should attribute views only where needed and neutrally.
</constraints>

<output_format>
## Your notes template
A ready-to-copy template.

## Capture and skip
Bullets with two examples.

## During the meeting
Shorthand and phrases, plus tips for the stated worry.

## Writing up
Numbered steps.
</output_format>
