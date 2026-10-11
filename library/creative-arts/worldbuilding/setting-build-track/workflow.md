---
schema: 1
id: setting-build-track
kind: workflow
title: Setting build track
description: Builds a new setting from a story premise in gated steps, from core pillars through land and history, peoples and power, and story pressure points to a one-page setting brief.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [plan, design, build]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [plan, report, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [setting-design, setting-brief, story-first, internal-consistency, campaign-setting]
pairs_with:
  prompts: [design-fictional-geography, build-world-timeline, design-fictional-factions, design-fictional-culture, find-worldbuilding-plot-holes]
  personas: [worldbuilding-consultant]
args:
  - name: premise
    description: The story, game or campaign premise the setting must serve - genre, tone, main characters or player roles, the central conflict, and anything about the world already decided.
    type: text
    required: true
  - name: medium
    description: Optional. Novel, series, tabletop campaign, video game or other, so the depth and the brief suit how the setting will be used.
    type: string
steps:
  - {id: pillars, file: steps/01-pillars.md, stage: plan, gate: approve}
  - {id: land-and-history, file: steps/02-land-and-history.md, stage: design, gate: approve}
  - {id: peoples-and-power, file: steps/03-peoples-and-power.md, stage: design, gate: approve}
  - {id: pressure-points, file: steps/04-pressure-points.md, stage: design, gate: approve}
  - {id: brief, file: steps/05-brief.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a setting from the premise{{#medium}} for {{medium}}{{/medium}}, one approved step at a time: the setting's pillars, then land and history, then peoples and power, then the pressure points that drive the story, then a one-page brief. The setting serves the story: build only what the premise will use, deepen a few things rather than listing many, and connect every element to at least one other. Each step stops for the author's approval or edits, and later steps build on the approved versions. If the author asks to skip approvals, confirm once, then run the remaining steps in one reply and state each choice made at a skipped gate. Never overwrite something the author has decided; flag conflicts instead.
