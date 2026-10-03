---
schema: 1
id: channel-launch-track
kind: workflow
title: Channel launch track
description: Launches a YouTube channel in gated steps from niche and audience to positioning, content pillars, ten video ideas, first-video packaging and a publishing rhythm. Use before the first upload.
category: video
version: 1.0.0
status: incubating
stage: [discover, plan, design, build]
role: [content-creator]
stack: [youtube]
requires: [none]
inputs: [text, preferences]
output: [plan, ideas, copy]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [channel-launch, niche, channel-positioning, content-pillars, packaging, publishing-schedule]
pairs_with:
  prompts: [define-content-pillars, package-video-title-thumbnail, write-video-hooks, plan-video-series]
  personas: [youtube-strategist]
  workflows: [video-production-track]
args:
  - name: creator_background
    description: What you know, have done or can show on camera; topics you could talk about for years; gear, budget and whether you want to be on camera.
    type: text
    required: true
  - name: goals
    description: What the channel should achieve and by when, for example a side income, clients for a business, a portfolio, or a community.
    type: text
  - name: time_per_week
    description: Hours per week you can realistically spend on the channel, for example "6 hours, mostly weekends".
    type: string
steps:
  - {id: niche-audience, file: steps/01-niche-audience.md, stage: discover, gate: approve}
  - {id: positioning, file: steps/02-positioning.md, stage: plan, gate: approve}
  - {id: pillars, file: steps/03-pillars.md, stage: plan, gate: approve}
  - {id: video-ideas, file: steps/04-video-ideas.md, stage: design, gate: approve}
  - {id: first-packaging, file: steps/05-first-packaging.md, stage: build, gate: approve}
  - {id: publishing-rhythm, file: steps/06-publishing-rhythm.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Launches a YouTube channel for a creator with this background: "{{creator_background}}". Goals: "{{goals}}". Time available: "{{time_per_week}}". The track moves one approved decision at a time: the viewer, the positioning, the pillars, ten video ideas, the first video's packaging, and a publishing rhythm the creator can keep. Each step produces one artifact and stops for approval; later steps build on approved versions and never re-open settled decisions without asking. The approved viewer and promise are the test for everything after them. The creator owns every decision. Never invent audience data, competitor channels, search volumes or the creator's experience; turn anything uncertain into a quick check the creator can do. If the creator asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.
