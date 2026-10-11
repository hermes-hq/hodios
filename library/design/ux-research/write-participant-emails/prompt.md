---
schema: 1
id: write-participant-emails
kind: prompt
title: Write research participant emails
description: Writes the messages sent once someone agrees to a research session - confirmation, preparation and consent, reminders, reschedule and no-show, and thank-you with incentive details.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [participant-communication, session-scheduling, reminders, no-shows, research-ops]
pairs_with:
  prompts: [write-interview-outreach-messages, set-participant-incentives, write-research-screener]
  personas: [ux-researcher]
args:
  - name: session
    description: Study type, length, format (remote with which tool, or in person with the address), what participants need (camera, own phone, prototype link), and the incentive.
    type: text
    required: true
  - name: sender
    description: Who sends the messages and how participants can reach them. Optional.
    type: text
  - name: tone
    description: Brand or audience tone, for example formal for clinicians or friendly for app users. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Message schedule, Confirmation, Preparation and consent, Reminders, Reschedule and no-show, Thank-you, Notes for the sender]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most no-shows and late starts in research are avoidable with good logistics messages. People forget sessions booked a week earlier, do not know which video tool to install, join from a phone when a laptop was needed, cannot find the building, or are surprised by recording on the day and withdraw. Messages that work are short, sent from a named person who can be replied to, repeat the essentials every time (date, time with time zone, length, how to join, contact), explain recording and consent before the session, and make rescheduling easy rather than embarrassing. A reminder the day before and a short one an hour before cut no-shows noticeably. Thank-you messages should say exactly when and how the incentive arrives, because payment delays are the most common complaint from participants.
</context>

<task>
<session>
{{session}}
</session>
{{#sender}}

<sender>
{{sender}}
</sender>
{{/sender}}
{{#tone}}

<tone>
{{tone}}
</tone>
{{/tone}}

1. Message schedule: when each message goes out relative to the session.
2. Confirmation (sent on booking): date, time with time zone, length, format, how to join or arrive, what to prepare, incentive, how to reschedule, a calendar-invite note.
3. Preparation and consent (2 to 3 days before): setup steps (tool, device, quiet space), what will happen, recording and how data is used, link or attachment placeholder for the consent form, and reassurance that the product is being tested, not them.
4. Reminders: day-before and one-hour-before versions, very short, with the join link or address.
5. Reschedule and no-show: a friendly message offering new times after a missed session, and a reply for people who cancel, without guilt.
6. Thank-you: thanks, when and how the incentive arrives, a contact for problems, and an optional opt-in for future studies.
7. Notes for the sender: placeholders to fill, and variants for SMS where useful.
</task>

<constraints>
- Use placeholders in square brackets for dates, links, names and amounts; do not invent them.
- Do not describe the product idea or hypotheses in a way that would bias participants.
- Always state that the session is recorded if it is, and that participants can stop at any time.
- Keep each email under about 150 words and each SMS under 160 characters.
</constraints>

<output_format>
## Message schedule
| Message | When | Channel |
## Confirmation
## Preparation and consent
## Reminders
## Reschedule and no-show
## Thank-you
## Notes for the sender
</output_format>
