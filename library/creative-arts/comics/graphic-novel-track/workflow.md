---
schema: 1
id: graphic-novel-track
kind: workflow
title: Graphic novel track
description: Takes a graphic novel from idea to a production-ready first chapter in gated steps (concept and page budget, chapters, page breakdown, chapter one script, production plan).
category: comics
version: 1.0.0
status: incubating
stage: [plan, design, build]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [plan, outline, script, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [graphic-novel-development, page-budget, chapter-breakdown, full-script, production-plan]
pairs_with:
  prompts: [review-comic-script, thumbnail-comic-page, plan-comic-production-schedule, write-graphic-novel-pitch]
  personas: [comics-editor]
args:
  - name: idea
    description: The premise, main characters, genre, audience, how the story ends if you know, and any length or format you have in mind.
    type: text
    required: true
  - name: team_and_time
    description: Who will draw, colour and letter, how many hours a week each can give, and any deadline (a pitch, a crowdfunding campaign, a contest). Optional.
    type: text
steps:
  - {id: concept, file: steps/01-concept.md, stage: plan, gate: approve, artifact: "graphic-novel/01-concept.md"}
  - {id: chapters, file: steps/02-chapters.md, stage: plan, gate: approve, artifact: "graphic-novel/02-chapter-breakdown.md"}
  - {id: pages, file: steps/03-pages.md, stage: design, gate: approve, artifact: "graphic-novel/03-page-breakdown.md"}
  - {id: script, file: steps/04-script.md, stage: build, gate: approve, artifact: "graphic-novel/04-chapter-one-script.md"}
  - {id: production, file: steps/05-production.md, stage: plan, gate: none, artifact: "graphic-novel/05-production-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops a graphic novel the way a comics editor would: decide the length and shape before scripting, budget pages before writing panels, and prove the approach on one chapter before committing to the whole book. Each step builds on the one before and stops for the creator's approval.

<idea>
{{idea}}
</idea>
{{#team_and_time}}
<team_and_time>
{{team_and_time}}
</team_and_time>
{{/team_and_time}}

Rules for every step: the story belongs to the creator, so offer options and explain trade-offs rather than replacing their choices; never contradict an approved step without flagging it; keep page arithmetic consistent across steps; one moment per panel and roughly 200 to 250 lettered words per page at most; never invent publishers, comparable titles or platform rules. If the creator wants to jump straight to scripting, explain in one line why the page budget comes first, offer to run steps 1 and 2 quickly, and keep every gate.
