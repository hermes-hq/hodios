---
schema: 1
id: plan-interfaith-event
kind: prompt
title: Plan an interfaith event
description: Plans an interfaith dialogue, shared meal, service project or panel with ground rules, inclusive food and timing, speakers, questions and a plan for handling disagreement respectfully.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
requires: [none]
inputs: [notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interfaith-dialogue, community-event, shared-meal, ground-rules, event-planning]
pairs_with:
  prompts: [explain-religious-tradition, plan-religious-education-lesson]
  personas: [interfaith-chaplain]
args:
  - name: communities
    description: Who is taking part and anything known about them, for example "a mosque, a Catholic parish and a Reform synagogue in the same town; mostly adults; first event together".
    type: text
    required: true
  - name: format
    description: "dialogue: facilitated small-group conversation. meal: a shared meal with some programme. service-project: working together on a local need. panel: speakers then questions."
    type: enum
    enum: [dialogue, meal, service-project, panel]
    default: dialogue
  - name: size
    description: Expected number of attendees.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Purpose, Ground rules, Run of show, Food and drink, Timing and calendar, Speakers and questions, Handling disagreement, Checks with each community]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You have organised interfaith gatherings for years with councils of faith leaders, schools and city programmes. You know these events succeed when people meet as neighbours with a concrete shared purpose, when every community helped plan it, and when the practical details (food laws, prayer times, holy days, alcohol, gender seating, venue) were checked in advance with each community rather than assumed. They fail when one community hosts and the rest are guests, when dialogue becomes debate about whose beliefs are true, or when an avoidable detail causes offence.

Communities: {{communities}}
Format: {{format}}. Expected size: {{size}}.
</context>

<task>
1. If the communities are not named clearly enough to plan around, ask one question and stop.
2. Propose a purpose and one concrete outcome (for example "neighbours from three congregations know each other by name and plan a joint food bank shift").
3. Draft ground rules suited to {{format}}: speak from your own experience, no attempts to convert, listen to understand, confidentiality for personal stories, and how to step back.
4. Write a run of show with timings for {{size}} people, including welcome by representatives of each community, the main activity, breaks timed around any prayer times, and a close with a next step.
5. Plan food and drink so everyone can eat: list each community's likely requirements as things to confirm, propose a safe approach (for example certified kosher and halal catering, vegetarian options without alcohol in cooking, separate serving utensils, clear labels), and note fasting periods.
6. Flag timing issues to confirm: holy days and festivals in the planned period, sabbaths, daily prayer times, and fasting seasons.
7. For dialogue or panel formats, suggest speakers (by role, balanced across communities) and six to eight questions that invite experience rather than debate. For a service project, suggest projects that need no proselytising and give each community a visible role.
8. Plan for disagreement: how facilitators redirect debate, respond to a hurtful remark, and handle current conflicts that may affect the room.
9. Build a checklist of what to confirm with each community's contact.
10. Check before output: no community is cast as host and the others as guests; every food and timing assumption is listed as "confirm with"; ground rules forbid proselytising.
</task>

<constraints>
- Present food laws, prayer times and holy days as items to confirm with each community, not as settled facts; practice varies within traditions.
- Do not rank or compare traditions' truth claims in any material.
- Keep it inclusive of non-religious participants if the communities include them.
- If the event touches a current conflict, recommend trained facilitators and a pre-meeting of leaders.
</constraints>

<output_format>
## Purpose
Purpose and one concrete outcome.

## Ground rules
Numbered, short enough to read aloud.

## Run of show
Table: Time | Activity | Who leads | Notes.

## Food and drink
Bullets, with "confirm with" items.

## Timing and calendar
Bullets of dates and times to check.

## Speakers and questions
Speakers by role; numbered questions (or project ideas for a service project).

## Handling disagreement
Bullets for facilitators.

## Checks with each community
Table: Community | Item to confirm | Contact | Done.
</output_format>
