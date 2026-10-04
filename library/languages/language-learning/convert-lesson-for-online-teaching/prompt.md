---
schema: 1
id: convert-lesson-for-online-teaching
kind: prompt
title: Convert a language lesson for online teaching
description: Converts one in-person group language lesson to a live online class, with breakout-room tasks, screen-shared materials, chat and poll checks, camera-off options and new timings, keeping the aims.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [document, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [online-teaching, breakout-rooms, video-call, live-lessons, interaction-patterns]
pairs_with:
  prompts: [plan-one-to-one-language-lesson, plan-task-based-language-lesson]
args:
  - name: lesson_plan
    description: The in-person lesson plan - aims, level, stages with timings, materials and interaction patterns. Add the video platform's features if you know them (breakout rooms, polls, whiteboard).
    type: text
    required: true
  - name: class_size
    description: How many learners join, and anything known about their devices and connection (phones only, slow internet, shared rooms).
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [What changes, Online lesson plan, Materials and screens, Checks and feedback, Tech fallback, Before the lesson]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a language teacher move one in-person group lesson to a live online class, keeping the same aims. Class size and devices: {{class_size}}.

Online lessons lose what the classroom gives for free: the teacher cannot see every pair working, mingling and board work disappear, instructions take longer, and silence feels longer. Converted lessons go wrong when the teacher lectures to a gallery of muted faces, when breakout rooms are opened with unclear instructions and nobody knows what to do, when every check is "any questions?", and when the plan assumes every learner has a laptop, a camera and a fast connection.

<lesson_plan>
{{lesson_plan}}
</lesson_plan>
</context>

<task>
1. What changes: restate the aims and list each stage with its online version and the reason (keep, adapt, replace, cut). Mingling becomes pair breakouts with rotation; board work becomes a shared document or whiteboard; realia become screen-shared images; a long reading becomes a document sent before class.
2. Online lesson plan with new timings. Allow about 20-30 percent more time for instructions and transitions, and cut content rather than rush. For every breakout stage: group size (pairs or threes), time, the task visible in the room (a slide, a shared document link or a message), and what the teacher does while visiting rooms. For every whole-class stage: how every learner responds (chat, poll, reactions, unmute in a set order), so that no stage relies on volunteers only.
3. Materials and screens: for each stage, what is on screen, what learners need open, and a short version for phone users (big text, one task per screen).
4. Checks and feedback: instruction-checking questions before every breakout; quick checks through chat waterfall (everyone types and sends at the same time), polls, thumbs or a shared document; how to give delayed error correction from notes taken in breakouts.
5. Camera and participation: camera-off alternatives that still require output (chat answers, voice-only, a shared document), without making cameras compulsory.
6. Tech fallback: what to do if breakout rooms fail, the shared document will not load, or a learner drops out (a pairs-by-chat version, a teacher-led alternative, resending links).
7. Before the lesson: a checklist for the teacher (links ready, rooms pre-set if possible, materials sent, a 2-minute tech warm-up at the start).
</task>

<constraints>
- Keep the original aims; if one cannot be met online in the same time, say so and suggest how to split it across lessons.
- Use features common to most video platforms (screen share, chat, breakout rooms, polls, a shared document); do not assume a specific product or paid tool, and give a fallback when a feature is missing.
- Respect privacy: no recording without the learners' and school's agreement, and no requirement to show their homes.
- If no actual plan is given (no stages or activities), ask for the aims, level, stages, timings and materials and stop. If only aims or timings are missing, state your assumptions at the top.
</constraints>

<output_format>
## What changes
Table: Original stage | Online version | Keep, adapt, replace or cut | Why.
## Online lesson plan
Table: Stage | Minutes | Interaction (main room, breakout pairs, individual) | What learners do | How the teacher checks. Total on the last line.
## Materials and screens
## Checks and feedback
## Tech fallback
## Before the lesson
Checklist.
</output_format>
