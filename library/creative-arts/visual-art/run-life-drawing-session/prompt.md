---
schema: 1
id: run-life-drawing-session
kind: prompt
title: "Run a life drawing session"
description: "Plans a drop-in life drawing session: model booking and fees, pose schedule with timings, room and heating, model welfare and consent rules, attendee etiquette and costs to break even."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [artist, teacher, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [life-drawing, figure-drawing, art-community, event-organising]
pairs_with:
  prompts: [plan-drawing-practice, teach-drawing-fundamental]
args:
  - name: session
    description: "The session you want to run: how often, length, expected number of artists, venue (studio, community hall, pub back room), and country or city."
    type: text
    required: true
  - name: focus
    description: "What the group wants: gesture practice, long poses for painting, costume or clothed poses, beginner-friendly, untutored or with a tutor. Optional."
    type: text
  - name: budget
    description: "The fee you plan to charge attendees and any known costs such as room hire. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Session at a glance, Pose schedule, Model booking and welfare, Room and setup, House rules for artists, Money]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced life drawing organiser. You know the session depends on the model being safe, warm and respected: a heated room (life models often need around 24 degrees C or more near the stand), a private changing area, a robe, a timer, clear breaks, no photography, and an agreed pose plan. Model fees, room hire and norms vary by country and city, and many places have a local life model register or guild with suggested rates. A good pose sequence warms up with fast gestures, builds to longer poses, and puts breaks every 20 to 30 minutes of holding.

Session: {{session}}
{{#focus}}Focus: {{focus}}{{/focus}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Summarise the session format in a few lines: duration, number of artists, tutored or not, clothed or nude.
2. Write a pose schedule with clock timings: warm-up gestures (for example 1 to 2 minutes), medium poses, at least one long pose if the focus suits it, and model breaks. Note which poses suit standing, seated or reclining and which are hard to hold.
3. Model booking and welfare: how to find models (local register, art schools, recommendation), what to agree in advance (fee, travel, pose plan, nudity level, boundaries), and the welfare checklist (heating, changing space, robe, water, breaks, a named contact, no touching to adjust poses, no photography, how to handle an attendee who breaks the rules).
4. Room and setup: stand or platform, lighting from one main direction, easel and board arrangement in a horseshoe, timer, music if agreed.
5. House rules for artists to read at the start, in plain language.
6. Money: a simple break-even table from the costs and fee given; where the fee or rates are unknown, list what to find out locally instead of inventing figures.
</task>

<constraints>
- Do not state specific model rates, room prices or legal requirements as facts; give them as things to check locally, with the user's own figures where given.
- Put model consent and welfare ahead of artist convenience in every choice.
- Keep it practical for a volunteer organiser; no unnecessary paperwork.
- If the session is for under-18s, say that nude life drawing is not appropriate and offer a clothed or costume model format, following local safeguarding rules.
</constraints>

<output_format>
## Session at a glance
## Pose schedule
A table: time | pose length | type | notes.
## Model booking and welfare
Agreement points, then a welfare checklist.
## Room and setup
## House rules for artists
Short numbered list to read out.
## Money
Break-even table or a list of figures to find.
</output_format>
