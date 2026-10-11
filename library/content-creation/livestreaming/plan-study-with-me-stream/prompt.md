---
schema: 1
id: plan-study-with-me-stream
kind: prompt
title: Plan a study-with-me stream
description: Plans a study-with-me, coworking or body-doubling stream - format, focus and break timing, scene and audio, chat rituals for goals and check-ins, moderation, schedule and a first-stream script.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, student]
inputs: [notes, preferences]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [study-with-me, coworking-stream, body-doubling, focus-timer, pomodoro]
pairs_with:
  prompts: [plan-stream-scenes, write-chat-bot-commands, choose-stream-music-safely]
  personas: [stream-producer]
args:
  - name: idea
    description: "Who it is for (students, writers, remote workers), what you will be doing on camera, platform, how long sessions run and whether you will talk."
    type: text
    required: true
  - name: setup
    description: "Your camera and desk view, what is visible in the room, music plans, and when you can stream."
    type: text
    required: true
  - name: audience
    description: "Optional. Current viewers if you already stream, and the community you want (quiet focus, chatty accountability, exam season)."
    type: text
output_contract:
  format: markdown
  sections: [Format, Session timing, Scene and audio, Chat rituals, Moderation, Schedule, First stream script]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Study-with-me and coworking streams sell presence, not entertainment: viewers keep the stream open while they work because someone else working beside them helps them start and keep going (often called body doubling). That changes the rules of streaming. Long, consistent sessions at the same times matter more than energy; a visible timer with focus and break blocks lets viewers sync; talk mostly happens in breaks. Chat rituals carry the community: posting a goal at the start, checking in at breaks, celebrating finished tasks, with bot commands keeping it tidy. Background music is the usual copyright risk, and a desk camera can show screens, mail, notes, or the room in ways that reveal personal information. Viewers include students who may be minors, so moderation keeps chat on-topic and kind, and direct-message invitations from strangers are a known risk to address in rules. Pressure culture (shaming breaks, glorifying all-nighters) works against the point.
</context>

<task>
<idea>
{{idea}}
</idea>

<setup>
{{setup}}
</setup>

{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}

1. **Format:** quiet, low-talk or chatty, what the camera shows, and what makes this stream distinct.
2. **Session timing:** focus and break blocks (such as 50/10 or 25/5) with a reason for the choice, total session length, and what happens on stream during breaks.
3. **Scene and audio:** a timer, task list or goal board, camera framing that avoids screens and personal items, music approach with copyright care, and a break scene.
4. **Chat rituals:** goal posting at the start, break check-ins, finishing celebrations, with bot command names and one-line texts.
5. **Moderation:** chat rules for a mixed-age, focused audience, link and DM rules, and what mods remove.
6. **Schedule:** consistent slots that fit their life and their audience's time zones.
7. **First stream script:** a short opening, what to say at each break, and the closing.
</task>

<constraints>
- Do not encourage all-nighters, skipping sleep, or shaming breaks.
- Flag anything in their described setup that could reveal personal information on camera.
- Mark music choices as copyright checks unless they have a licence that covers streaming.
- Do not overstate study benefits as research facts.
</constraints>

<output_format>
## Format
## Session timing
Table: block | length | on stream.

## Scene and audio
## Chat rituals
Table: ritual | command | text.

## Moderation
## Schedule
## First stream script
</output_format>
