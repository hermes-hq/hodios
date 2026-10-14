---
schema: 1
id: write-file-note
kind: prompt
title: Write a file note
description: Writes a contemporaneous file note of a call, meeting or decision with date, attendees, the facts stated, what was agreed and follow-ups, kept factual so it can be relied on later.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, consultant, legal-professional, individual]
requires: [none]
inputs: [notes, transcript, text]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [file-note, record-keeping, attendance-note, audit-trail, call-record]
pairs_with:
  prompts: [write-formal-minutes, summarize-meeting-transcript, write-meeting-recap-email]
args:
  - name: rough_notes
    description: What you remember or jotted down, such as who was there, what each person said, numbers, documents mentioned and anything agreed. Shorthand is fine.
    type: text
    required: true
  - name: event
    description: The call, meeting or decision, with the date, time, how it took place and its length if known.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [File note, Check before filing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A file note is a private record written close to the event so that months later, in a dispute, an audit, a handover or a complaint, there is reliable evidence of what was said and decided. Professionals in law, social care, finance and project management are taught the same rules: write it as soon as possible and record when it was written; record facts, not impressions; attribute statements to who said them; distinguish what was said from your own comment; include what was not agreed as well as what was; and never back-date or quietly edit a note later (add a dated addendum instead). Notes that fail later are vague ("discussed the contract"), mix opinion with fact, or omit the date and the people present.
</context>

<task>
Write a file note for: {{event}}

<rough_notes>
{{rough_notes}}
</rough_notes>

1. If the notes contain nothing about what was said or decided, ask in one short message and stop.
2. Header: date and time of the event, method (phone, video, in person, email), people present with roles, author, and "Note written on: [date and time]" with a placeholder for the author to fill.
3. Record the substance in short numbered paragraphs, in the order it happened. Attribute each statement ("X said that…"). Keep figures, dates and document names exactly as in the notes.
4. Record what was agreed, what was not agreed or left open, and any advice or warning given and how it was received, if the notes include it.
5. Put the author's own observations or comments in a separate section labelled as comment, not mixed with the record.
6. Follow-ups: each action with who and by when.
7. List anything in the notes that is ambiguous or that the author should confirm with the other party.
</task>

<constraints>
- Record only what is in the notes. Never add statements, figures, attendees or agreements that were not in them; mark unclear points `[unclear: …]`.
- Neutral, factual language. Do not characterise people's attitudes ("aggressive", "evasive"); describe what they said or did.
- Do not fill in the "written on" time; leave the placeholder so the author records it truthfully.
- Keep it as short as the substance allows; most notes are under 400 words.
</constraints>

<output_format>
## File note
Header block; Record (numbered paragraphs); Agreed; Not agreed or open; Author's comment (if any); Follow-ups.
## Check before filing
Ambiguous points to confirm, and a reminder to add the written-on time and file it. Never more than five bullets.
</output_format>
