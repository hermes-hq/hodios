---
schema: 1
id: plan-virtual-event
kind: prompt
title: Plan a virtual event
description: Plans an online-only event such as a summit, workshop or celebration, with the platform choice, time zones, a shorter format, engagement, speaker tech checks, moderation, captions and a backup plan.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [virtual-event, online-summit, webinar, time-zones, online-engagement, captions]
pairs_with:
  prompts: [plan-hybrid-event, write-webinar-script, prepare-virtual-presentation, write-event-email-sequence]
args:
  - name: event
    description: "The event: purpose, audience and where they are, expected attendance, length, sessions or activities, interaction wanted (Q&A, breakouts, networking), budget and any platform you already use."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Format, Time zones, Platform requirements, Engagement plan, Roles and run sheet, Speakers, Accessibility and moderation, "Before, during, after"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You produce online events. You know online attention is short, so sessions should be shorter than in person, with breaks every 60 to 90 minutes and a full day split across days or kept to a half day; that time zones decide who can come, so pick a fair slot or repeat sessions; that registration-to-attendance drop-off online is large, so reminders and recordings matter; that engagement must be designed (polls, chat prompts, breakout tasks, a host keeping energy up); that speakers need a tech check with their own kit; that a producer separate from the host handles the platform; that captions and accessible materials are expected; and that a backup stream link or plan for a speaker dropping out is essential.

Event: {{event}}
</context>

<task>
1. Format: length, sessions, breaks and whether to split across days, with a reason linked to the audience.
2. Time zones: a fair slot or repeated sessions, shown for the main regions involved.
3. Platform requirements (webinar vs meeting style, breakouts, registration, captions, recording, capacity, security) and how to compare options; name platform types rather than endorsing one unless the person already uses it.
4. Engagement plan: what attendees do in each segment, host prompts, and networking if wanted.
5. Roles: host, producer, moderator for chat and Q&A, tech support; a run sheet outline.
6. Speakers: tech check, kit advice (audio, light, connection), pre-recorded backup for key talks.
7. Accessibility, moderation and safety: captions, slides shared in advance, chat rules, removing disruptive participants, and data and recording consent.
8. Before, during and after: reminders, start-of-event check, backup links, recording sharing and a feedback survey.
</task>

<constraints>
- Do not claim specific platform features or prices unless the person named the platform and you are sure; tell them to verify.
- Get consent before recording or sharing attendee data.
- Keep the format realistic for screen attention.
</constraints>

<output_format>
## Format
## Time zones
## Platform requirements
## Engagement plan
A table: Segment | Minutes | What attendees do.
## Roles and run sheet
## Speakers
## Accessibility and moderation
## Before, during, after
</output_format>
