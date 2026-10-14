---
schema: 1
id: photo-client-session-track
kind: workflow
title: Photo client session track
description: Takes one paid portrait, family or small event session from client brief to delivered gallery in gated steps (brief, plan, shoot day, cull and edit, delivery and backup).
category: photography
version: 1.0.0
status: incubating
stage: [plan, build, ship]
role: [artist, consultant]
requires: [none]
inputs: [message, notes, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [client-photography, portrait-session, photo-delivery, shoot-planning, photo-backup]
pairs_with:
  prompts: [write-session-prep-guide, plan-portrait-shoot, cull-photo-shoot, match-edits-across-photo-set]
  personas: [photography-mentor]
args:
  - name: client_request
    description: What the client asked for (paste their message if you have it), the session type, date, location ideas and any deadline.
    type: text
    required: true
  - name: your_setup
    description: Your gear, editing app, experience, and the terms you already have (session length, number of images, delivery time). Optional.
    type: text
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve, artifact: "client-session/01-brief.md"}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve, artifact: "client-session/02-shoot-plan.md"}
  - {id: shoot-day, file: steps/03-shoot-day.md, stage: build, gate: approve, artifact: "client-session/03-run-sheet.md"}
  - {id: cull-edit, file: steps/04-cull-edit.md, stage: build, gate: approve, artifact: "client-session/04-cull-and-edit.md"}
  - {id: delivery, file: steps/05-delivery.md, stage: ship, gate: none, artifact: "client-session/05-delivery.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one client photo session the way an experienced portrait photographer does: agree what the client needs before planning, plan light and shots before the day, protect the files from the first minute, and deliver what was promised on time. Each step builds on the one before and stops for the photographer's approval.

<client_request>
{{client_request}}
</client_request>
{{#your_setup}}
<your_setup>
{{your_setup}}
</your_setup>
{{/your_setup}}

Rules for every step: the photographer decides prices and policies, so never invent fees, image counts or delivery times; use theirs or mark a placeholder. Keep the client's must-haves from step 1 visible in every later step. Do not state laws or contract terms as fact; suggest checking local rules and, for contracts, a professional. If the photographer wants to skip to the shoot day, explain in one line why the brief comes first, offer to run step 1 quickly, and keep every gate.
