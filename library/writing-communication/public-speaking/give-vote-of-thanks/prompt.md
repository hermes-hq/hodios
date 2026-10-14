---
schema: 1
id: give-vote-of-thanks
kind: prompt
title: Give a vote of thanks
description: Writes a formal vote of thanks for the end of a seminar, lecture, school or community event that names each contribution specifically and fits a tight two-to-three-minute slot.
category: public-speaking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, teacher, manager]
requires: [none]
inputs: [notes, spec]
output: [script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [vote-of-thanks, acknowledgements, seminar, school-function, formal-event]
pairs_with:
  prompts: [write-speaker-introduction, write-opening-or-closing-remarks]
args:
  - name: event
    description: The event, your role and the formality, for example "annual day at a college, I'm the student secretary", "guest lecture at a professional institute, I'm on the committee".
    type: string
    required: true
  - name: people
    description: "Everyone to thank in the order protocol expects: chief guest, speakers, chair, organisers, staff, sponsors, volunteers, audience. For each, their correct name and title and what they actually did or said today."
    type: text
    required: true
  - name: minutes
    description: Time allowed, usually 2 to 3 minutes.
    type: number
    default: 3
  - name: notes_from_today
    description: Optional. Points the speaker or chief guest made that you want to refer back to; can be added on the day just before you speak.
    type: text
output_contract:
  format: markdown
  sections: [Vote of thanks, Length, Live slots, Names to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A vote of thanks is a formal closing item at seminars, lectures, school and college functions and community events, common across South Asia, Africa, the UK and Commonwealth countries, and in professional bodies everywhere. The audience is tired and ready to leave, so the best ones are brisk, warm and specific. Two things separate a good one from a dull one: it follows the expected order of precedence (usually chief guest, then speakers and chair, then the head of the institution, organisers and staff, sponsors, volunteers and finally the audience), and it says one specific thing about each main contribution, ideally a point the speaker actually made today, rather than "for the wonderful speech". The classic mistakes are getting a title or name wrong, forgetting a group such as support staff or the technical crew, and overrunning by repeating the speeches. Because the speaker cannot know exactly what will be said, a well-prepared vote of thanks leaves short live slots to fill during the event.
</context>

<task>
Write a vote of thanks for: {{event}}. Time: {{minutes}} minutes.
<people>
{{people}}
</people>
{{#notes_from_today}}
<notes_from_today>
{{notes_from_today}}
</notes_from_today>
{{/notes_from_today}}

1. If the people list lacks names or roles for the chief guest or main speakers, ask for them and stop.
2. Order the thanks by the precedence given; if the user gave no order, use the usual order in the context and say so in Names to confirm.
3. For each main contribution (chief guest, speakers, chair) write one specific line using what they did or the notes from today. Where the content is not yet known, insert a live slot: `[live: one point from their talk, e.g. "your reminder that…"]`.
4. Thank groups (organisers, staff, technical crew, volunteers, sponsors) in one line each, naming people only where the user did.
5. Open with a formal one-line address to the chair and guests in the register the event expects; close by thanking the audience and, if appropriate, inviting them to the next item (refreshments, photo).
6. Keep it within the time: about 130 words per minute, leaving 20 seconds for live slots.
</task>

<constraints>
- Use exact names and titles as given; never invent titles, honours or what someone said. Mark uncertain ones `[confirm]`.
- Do not summarise the speeches; one point per speaker at most.
- Avoid ornate filler ("words fail me to express…"); formal can still be plain.
- Do not leave out support staff, volunteers or the audience.
</constraints>

<output_format>
## Vote of thanks
Full text with [live: …] slots.
## Length
"N words, about M minutes" plus time reserved for live slots.
## Live slots
List of what to listen for during the event to fill each slot.
## Names to confirm
Names, titles and the precedence order to check with the organisers.
</output_format>
