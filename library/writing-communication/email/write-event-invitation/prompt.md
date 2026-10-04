---
schema: 1
id: write-event-invitation
kind: prompt
title: Write an event invitation
description: Writes an invitation email for a work social, workshop, offsite or community event with why to come, logistics, RSVP mechanics and accessibility notes, plus a reminder. Use when organising an event.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, marketer, individual]
requires: [none]
inputs: [text, notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [invitation, rsvp, inclusive-events, offsite, workshop, events]
pairs_with:
  prompts: [invite-speaker, write-internal-announcement, write-emcee-script]
args:
  - name: event_details
    description: What, when (with time zone and end time), where or the video link, who it is for, agenda highlights, cost, food, dress code, and any known access information about the venue.
    type: text
    required: true
  - name: audience
    description: Who is invited, for example "the 40-person support team", "customers in the Leeds area" or "neighbourhood association members".
    type: string
    required: true
  - name: rsvp_deadline
    description: When you need replies by, and if you know it, why (catering numbers, room size, travel booking).
    type: string
  - name: tone
    description: Formal suits board dinners, client events and official ceremonies; friendly suits most team and community events; playful suits socials and celebrations.
    type: enum
    enum: [formal, friendly, playful]
    default: friendly
output_contract:
  format: markdown
  sections: [Invitation, Calendar hold, Reminder, Missing details]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People decide whether to open an invitation from the subject line and whether to come from the first two lines: what it is, when, and why it is worth their evening or afternoon. Attendance then depends on removing friction: a single obvious way to RSVP, a deadline with a reason, a calendar hold, and logistics they do not have to ask about (end time, how to get there, cost, food). Organisers often forget the people who silently skip events: those who need step-free access, captions or a quiet space, those with dietary needs, carers who need an end time, and people who do not drink. A good invitation tells everyone what is already in place and invites them to ask for what they need, privately and without having to explain why.
</context>

<task>
Write a {{tone}} invitation for {{audience}}.{{#rsvp_deadline}} RSVP by: {{rsvp_deadline}}.{{/rsvp_deadline}}

<event_details>
{{event_details}}
</event_details>

1. If the date, the start time, or the place (or link) is missing, ask for it and stop. Everything else can be a placeholder.
2. Subject line: event name, date and a hook, for example "Thu 4 Dec: support team winter social at the Boathouse".
3. Opening: what it is and why this audience should come, in two sentences. Base the "why" on the details (who will be there, what they will learn, decide or celebrate), not on generic enthusiasm.
4. Logistics block, as short labelled lines: date and time with start and end and the time zone for online or mixed audiences; place with address and how to get there, or the link and platform; cost and who pays; food and drink, including that non-alcoholic options are available if the details say so; dress code if any; what to bring or prepare.
5. RSVP: one action (reply, form placeholder, or calendar accept), the deadline and its reason, and what to include: dietary requirements and access needs. If there is no deadline, suggest one under Missing details.
6. Accessibility and inclusion: state only the arrangements given in the details (step-free access, captions, quiet room, parking, recordings). Where nothing is given, do not claim it; instead invite people to tell a named contact what they need, and list the unknowns under Missing details. If attendance is optional for a work social, say so plainly.
7. Write a calendar hold title and short description.
8. Write a three-to-four line reminder to send two or three days before, repeating the essentials and the RSVP or "see you there".
</task>

<constraints>
- Invitation body under about 180 words, with the logistics scannable on a phone.
- Never invent venue features, menus, speakers, prices or links; use `[need: …]` placeholders and list them.
- Match the tone: formal means no exclamation marks or emojis; friendly allows warmth; playful allows one or two light touches but the logistics stay plain.
- No pressure or guilt to attend ("everyone is expected") for socials, unless the details say attendance is required, in which case say so neutrally.
- Write dates with weekday and date, and times with start, end and time zone where readers may be in different zones.
</constraints>

<output_format>
## Invitation
Subject line, then the body.
## Calendar hold
Title, then two or three lines.
## Reminder
Subject line, then the body.
## Missing details
Bullets of placeholders and accessibility unknowns to confirm with the venue. "None" if nothing.
</output_format>
