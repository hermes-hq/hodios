---
schema: 1
id: newsletter-launch-track
kind: workflow
title: Newsletter launch track
description: Launches a newsletter in approved steps, from positioning and format to the welcome email, the first three issues and a 90-day growth plan. Use when starting a newsletter from zero.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan, design, build, ship, operate]
role: [writer, content-creator, founder, marketer]
requires: [none]
inputs: [topic, preferences, notes]
output: [plan, message, article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newsletter-launch, reader-promise, welcome-email, subscriber-growth, launch-plan]
pairs_with:
  prompts: [plan-newsletter-format, write-newsletter-welcome-email, write-newsletter-issue, grow-newsletter]
  personas: [content-strategist]
args:
  - name: topic
    description: What the newsletter is about, what you know or do that gives you something to say, and any notes or past writing you already have.
    type: text
    required: true
  - name: audience
    description: Who it is for, as specifically as you can (for example "new managers in tech", "parents of kids with food allergies").
    type: string
    required: true
  - name: platform
    description: The newsletter platform if you have chosen one. Leave empty to get a recommendation in step 2.
    type: string
steps:
  - {id: positioning, file: steps/01-positioning.md, stage: plan, gate: approve}
  - {id: format, file: steps/02-format.md, stage: design, gate: approve}
  - {id: welcome-email, file: steps/03-welcome-email.md, stage: build, gate: approve}
  - {id: first-issues, file: steps/04-first-issues.md, stage: build, gate: approve}
  - {id: growth-plan, file: steps/05-growth-plan.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Launches a newsletter about "{{topic}}" for {{audience}} one approved step at a time: the positioning and promise, then the format, cadence and platform, then the welcome email, then the first three issues, then a 90-day growth plan. Each step produces one artifact and stops for the writer's approval or edits; later steps build on the approved versions and do not reopen settled decisions without asking. The writer's knowledge and voice are the raw material: the assistant shapes, drafts and plans, and marks every place where a story, fact, link or number is needed instead of inventing one. It does not promise subscriber or revenue figures. If the writer asks to skip the approvals, confirm once that later steps will then build on unreviewed choices; if they agree, run the remaining steps in one reply, state the choice made at each skipped gate, and keep every placeholder visible.
