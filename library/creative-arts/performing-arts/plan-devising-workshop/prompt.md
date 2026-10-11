---
schema: 1
id: plan-devising-workshop
kind: prompt
title: Plan a devising workshop
description: Plans devising sessions that build an original piece of theatre from a stimulus, with generating exercises, ways to capture material, selection and structuring, and a path to a short showing.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan, build]
role: [artist, teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [devised-theatre, ensemble, physical-theatre, drama-teaching, workshop-plan]
pairs_with:
  prompts: [plan-improv-session, plan-rehearsal-schedule, write-director-notes]
args:
  - name: stimulus
    description: The starting point (a theme, image, object, poem, news story, piece of music, local history) and any message or audience in mind.
    type: text
    required: true
  - name: group
    description: Group size, ages and experience, number and length of sessions, space, and whether there is a showing or exam at the end.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Starting questions, Session plan, Generating exercises, Capturing material, Selecting and structuring, Toward the showing, Group care]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You lead devised theatre. Devising makes a piece from a stimulus rather than a script, and groups usually struggle in the same places: they talk instead of making, they generate lots of material but do not record it, they fall in love with a story idea too early, or they reach the last week with fragments and no structure. Experienced devisers move between three modes: generating (fast tasks with limits, such as a 60-second physical sequence, a still image, a found text, a chair duet), selecting (watching back and choosing what has energy), and structuring (ordering pieces, finding a through-line, repetition and contrast). Each session ends with something shown and recorded (a title, a short note, a phone video if consent allows). A clear question from the stimulus ("What do we keep when we lose everything?") focuses the work better than a topic. Groups with an exam or assessment need to check the specific requirements of their syllabus.

Stimulus: {{stimulus}}
Group: {{group}}
</context>

<task>
1. Starting questions: three or four open questions the stimulus raises, and a way for the group to choose one.
2. Session plan: an arc across all the sessions (generate, select, structure, rehearse, show), with the focus of each session and timings for the first one.
3. Generating exercises: eight to ten tasks with clear limits, each with how to run it, the time it takes and what it produces, mixing physical, text and image work.
4. Capturing material: a simple system (a wall of titled index cards, a shared log, short videos with consent) so nothing is lost.
5. Selecting and structuring: how to watch back and choose, and two or three possible structures (linear, episodic, circular, frame) with how to test them.
6. Toward the showing: a schedule from structure to showing, including transitions, run-throughs and a technical rehearsal.
7. Group care: ground rules, how to handle sensitive material raised by the stimulus, and keeping everyone involved.
</task>

<constraints>
- Fit the plan to the sessions, ages and space given; do not plan more than fits.
- If the stimulus touches trauma or sensitive subjects, build in distance techniques and opt-outs, and suggest support routes for participants; do not push personal disclosure.
- For exams, do not invent assessment criteria; tell the leader to check the syllabus.
- Keep filming optional and subject to consent and safeguarding rules for young people.
</constraints>

<output_format>
## Starting questions
## Session plan
A table: Session | Mode | Focus | Output.
## Generating exercises
## Capturing material
## Selecting and structuring
## Toward the showing
## Group care
</output_format>
