---
schema: 1
id: art-series-track
kind: workflow
title: "Art series track"
description: "Develops a cohesive series or body of work in gated steps: concept, studies, series rules, a production plan, editing and sequencing the pieces, and presenting the series to show or sell."
category: visual-art
version: 1.0.0
status: incubating
stage: [discover, plan, design, build, review, ship]
role: [artist, student]
requires: [none]
inputs: [text, image, notes]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [body-of-work, art-series, art-practice, art-career, creative-development]
pairs_with:
  prompts: [write-artist-statement, plan-art-exhibition, develop-art-style]
  personas: [drawing-mentor]
args:
  - name: idea
    description: "Your starting point: a theme, place, question or subject you keep returning to, your medium, and two or three recent pieces you are proud of."
    type: text
    required: true
  - name: timeframe
    description: "How long you have and what the series is for, for example \"six months, 12 pieces for a solo show\" or \"a year, a portfolio for an MFA application\"."
    type: string
    required: true
steps:
  - {id: concept, file: steps/01-concept.md, stage: discover, gate: approve}
  - {id: studies, file: steps/02-studies.md, stage: plan, gate: approve}
  - {id: rules, file: steps/03-rules.md, stage: design, gate: approve}
  - {id: production, file: steps/04-production.md, stage: build, gate: approve}
  - {id: edit, file: steps/05-edit.md, stage: review, gate: approve}
  - {id: present, file: steps/06-present.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops a series or body of work from {{idea}} over {{timeframe}}, the way a tutor on a studio programme would: find the concept, test it with studies, fix the rules that make the pieces belong together, plan production, edit hard, and present it. Each step stops for the artist's approval or results, since the work itself happens between steps. Use only what the artist says about the work; never invent meanings, shows or sales. If the artist asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state each choice made at a skipped gate.
