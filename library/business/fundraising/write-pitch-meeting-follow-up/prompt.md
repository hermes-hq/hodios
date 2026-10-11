---
schema: 1
id: write-pitch-meeting-follow-up
kind: prompt
title: Write the follow-up after an investor meeting
description: Writes the email a founder sends after a pitch meeting - thanks, answers to open questions, the promised materials, a clear next step and the round's timeline - from the meeting notes.
category: fundraising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, executive]
inputs: [notes, transcript]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [investor-meeting, follow-up-email, investor-relations, next-steps]
pairs_with:
  prompts: [prepare-investor-qa, build-investor-pipeline, respond-to-investor-pass]
args:
  - name: meeting_notes
    description: Notes or transcript from the meeting - who attended, what they asked, concerns raised, what you promised to send and any next step they mentioned.
    type: text
    required: true
  - name: round_status
    description: Where the round stands right now - amount, lead status, committed amounts and target closing date. Only what you are comfortable sharing truthfully.
    type: text
output_contract:
  format: markdown
  sections: [Subject, Email, Attachments to prepare, Notes for your pipeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write investor meeting follow-ups for founders. The follow-up is the first test of what the founder promised in the room: whether they send what they said, answer the hard question they dodged, and keep momentum without pressure. Good follow-ups go out within a day, answer open questions with evidence rather than reassurance, and propose a concrete next step. Bad ones re-pitch the whole company, inflate round momentum ("we are oversubscribed") or ignore the concern the investor raised.
</context>

<task>
Write the follow-up email.

<meeting_notes>
{{meeting_notes}}
</meeting_notes>

{{#round_status}}
<round_status>
{{round_status}}
</round_status>
{{/round_status}}

1. Extract from the notes: attendees, questions left open, concerns raised, materials promised and any next step mentioned. List anything ambiguous.
2. Subject: refers to the meeting and the company.
3. Email under 200 words: a one-line thanks that names something specific from the conversation; answers to each open question or concern, in two or three sentences each, with numbers from the notes, or an honest "we will send this by [date]" when the answer is not in the notes; the materials included; the round status in one line if given; a specific next step with a proposed time frame.
4. Attachments to prepare: a checklist of what was promised, with any gap flagged.
5. Notes for your pipeline: the investor's apparent interest level, their main concern and the next date to follow up, based only on the notes.
</task>

<constraints>
- Never overstate momentum. Describe commitments and timelines exactly as given; if the round status is empty, leave it out rather than inventing urgency.
- Do not invent answers to the investor's questions. Where the notes lack the answer, write a placeholder like `[answer: churn by cohort]` and list it.
- Do not repeat the pitch. No hype, no exclamation marks.
- Keep any confidential customer details at the level the notes show they were shared in the meeting.
</constraints>

<output_format>
## Subject
## Email
## Attachments to prepare
Checklist.
## Notes for your pipeline
Three bullets: interest, main concern, next follow-up date.
</output_format>
