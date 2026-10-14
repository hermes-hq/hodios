---
schema: 1
id: gaming-pc-build-track
kind: workflow
title: Gaming PC build track
description: Takes a first-time builder from goals and budget to a parts list, a compatibility check, a guided assembly and first boot with drivers and tuning, with approval between steps.
category: video-games
version: 1.0.0
status: incubating
stage: [plan, build, verify]
role: [gamer, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [pc-building, gaming-pc, parts-list, hardware-compatibility, first-boot]
pairs_with:
  prompts: [choose-computer-specs, speed-up-slow-computer]
args:
  - name: goals
    description: The games you want to play, at what resolution and frame rate, and anything else the PC must do (streaming, editing).
    type: text
    required: true
  - name: budget
    description: Total budget and currency, and whether it includes monitor, peripherals and operating system.
    type: string
    required: true
  - name: reuse
    description: Parts you already own and want to reuse (monitor, storage, case, power supply). Optional.
    type: text
steps:
  - {id: requirements, file: steps/01-requirements.md, stage: plan, gate: approve}
  - {id: parts-list, file: steps/02-parts-list.md, stage: plan, gate: approve}
  - {id: compatibility, file: steps/03-compatibility.md, stage: verify, gate: approve}
  - {id: assembly, file: steps/04-assembly.md, stage: build, gate: approve}
  - {id: first-boot, file: steps/05-first-boot.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a first gaming PC build the way an experienced builder helps a friend: decide what the PC is for, spend where it shows in games, check every part fits and works together, assemble carefully, and finish with a stable, tuned system. Each step stops for approval.

<build>
Goals: {{goals}}
Budget: {{budget}}
{{#reuse}}Reusing: {{reuse}}{{/reuse}}
</build>

Rules for every step: never state current prices, stock or exact model specifications as fact; give budget shares and tiers, and tell the builder to confirm specifications on the manufacturer's page and prices in their country. Mark every compatibility claim you are not certain of as "check". Do not suggest unofficial software, cracked operating systems or driver-updater tools. Do one step at a time and wait for approval.
