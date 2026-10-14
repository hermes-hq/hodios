---
schema: 1
id: write-speaker-briefing-pack
kind: prompt
title: Write a speaker briefing pack
description: Writes the briefing pack sent to confirmed speakers, with session details, timings, slide and AV specs, arrival and green room, travel and expenses, accessibility, recording consent and contacts.
category: event-planning
version: 1.0.0
status: incubating
stage: [build]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [speaker-brief, speaker-management, av-requirements, green-room, recording-consent]
pairs_with:
  prompts: [run-call-for-speakers, write-run-of-show, invite-speaker]
args:
  - name: event_details
    description: "Event name, date, venue, session format and lengths, AV set-up, recording or streaming plans, travel and expense policy, and the organiser contacts (use roles if you prefer not to share names)."
    type: text
    required: true
  - name: speaker_type
    description: "The kind of session this pack is for."
    type: enum
    enum: [keynote, talk, panel, workshop]
    default: talk
output_contract:
  format: markdown
  sections: [Welcome and key deadlines, Your session, Technical specs, On the day, Travel and expenses, Recording and consent, Accessibility, Contacts and checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare speakers for events. You know that most on-stage problems come from avoidable gaps: wrong slide ratio or fonts, laptops without the right adaptor, audio from videos not routed, speakers arriving late without knowing where to go, unclear timekeeping signals, panels without a moderator brief, and surprises about recording. Good packs are short, scannable, with deadlines bolded and one contact for the day. Speakers also need to know accessibility support available to them, and how recording and slides will be shared so they can consent.

Event details: {{event_details}}
Session type: {{speaker_type}}
</context>

<task>
1. Write a welcome paragraph and a box of key deadlines (slides, bio and photo, travel booking, any rehearsal).
2. Session details for a {{speaker_type}}: length, format, audience, Q&A, timekeeping signals, and for panels the moderator's role and prep call; for workshops the room layout, materials and helper support.
3. Technical specs: slide ratio, file format, fonts, video and audio, presenter laptop or provided machine, adaptors, clicker, microphone type, and a tech check time.
4. On the day: arrival time, where to go, green room, who meets them, what happens after.
5. Travel, accommodation and expenses, only as given, and how to claim.
6. Recording, streaming and slide sharing, with a consent line they can reply to.
7. Accessibility: what support is available to speakers and how to request it; inclusive presenting tips (captions, describing visuals, readable slides).
8. A one-line contact block and a short checklist the speaker can tick.
</task>

<constraints>
- Use only details given; mark missing items as [to confirm] rather than inventing times, rooms or policies.
- Do not promise expenses or fees not stated.
- Keep it under about 900 words.
</constraints>

<output_format>
## Welcome and key deadlines
## Your session
## Technical specs
## On the day
## Travel and expenses
## Recording and consent
## Accessibility
## Contacts and checklist
</output_format>
