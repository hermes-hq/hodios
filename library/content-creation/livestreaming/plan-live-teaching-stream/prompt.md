---
schema: 1
id: plan-live-teaching-stream
kind: prompt
title: Plan a live teaching stream
description: Plans a stream that teaches a skill live - coding, art, music, cooking - with a lesson arc, pacing for chat questions, screen and desk privacy checks, a recap and a fallback when the demo breaks.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, teacher, developer-advocate]
inputs: [notes, topic]
output: [plan, outline, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [teaching-stream, live-coding, live-tutorial, screen-privacy, learn-with-me]
pairs_with:
  prompts: [plan-livestream-run-of-show, plan-stream-scenes, audit-stream-for-privacy-leaks]
  personas: [stream-producer]
args:
  - name: topic
    description: "The skill and today's goal (build a feature, paint a landscape, learn a song, cook a dish), who it is for and their level, platform and length."
    type: text
    required: true
  - name: setup
    description: "What you show (screen, overhead camera, instrument, kitchen), your tools, and whether chat usually asks many questions."
    type: text
    required: true
  - name: format
    description: "Optional. One-off lesson, a series, or a learn-with-me stream where you are also learning."
    type: text
output_contract:
  format: markdown
  sections: [Lesson arc, Pacing and chat, Before you go live, Teaching moves, When the demo breaks, Recap]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teaching live differs from a recorded tutorial: nothing can be cut, viewers arrive part way through, and chat asks questions at the wrong moment. Good live teachers set one achievable goal per stream, show the goal at the start, keep a visible "where we are" marker for people who join late, and batch chat questions at checkpoints instead of derailing every two minutes, while answering quick ones immediately. Thinking out loud is the teaching: narrating why, not only what, and showing mistakes and how they are found is more useful than a flawless run. Screens leak things on stream: API keys and passwords in config files and terminals, notifications, email, browser history and autocomplete, other tabs; overhead cameras show addresses on packages and paperwork. Demos break live, so a prepared fallback (a finished version, a known-good branch, a pre-made dish, a recorded segment) keeps the lesson going. Learn-with-me streams work when the streamer is honest about what they do not know.
</context>

<task>
<topic>
{{topic}}
</topic>

<setup>
{{setup}}
</setup>

{{#format}}
<format>
{{format}}
</format>
{{/format}}

1. **Lesson arc:** one goal for the stream, three to five checkpoints, and a timed outline from intro to recap, sized to the stream length and audience level.
2. **Pacing and chat:** when to answer questions immediately, when to batch them at checkpoints, a pinned or bot message saying where the stream is, and how mods can collect questions.
3. **Before you go live:** a privacy checklist for their setup (secrets in files and terminals, notifications, accounts, tabs, autocomplete, paperwork and packages on camera) and a prepared environment.
4. **Teaching moves:** how to narrate reasoning at their audience's level, show and fix mistakes, and check understanding with chat.
5. **When the demo breaks:** a fallback for their topic and how to turn a failure into a teaching moment without losing the lesson.
6. **Recap:** what was learned, a short summary chat can copy, what next stream covers, and where resources will be posted.
</task>

<constraints>
- Always include a privacy check of what is shown on screen or camera before going live.
- Do not make up technical facts about their tools; mark version-specific details as checks.
- Keep the goal achievable within the stream length; cut scope rather than rush.
- For learn-with-me formats, do not encourage presenting guesses as expertise.
</constraints>

<output_format>
## Lesson arc
Table: time | checkpoint | goal.

## Pacing and chat
## Before you go live
Checkbox list.

## Teaching moves
## When the demo breaks
## Recap
</output_format>
