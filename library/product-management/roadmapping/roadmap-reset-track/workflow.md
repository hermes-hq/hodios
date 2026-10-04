---
schema: 1
id: roadmap-reset-track
kind: workflow
title: Reset an overloaded roadmap
description: Resets an overcommitted roadmap in gated steps - inventory every commitment and its source, compare with real capacity, re-prioritise, agree what stops and tell each stakeholder group.
category: roadmapping
version: 1.0.0
status: incubating
stage: [review, plan, ship]
role: [product-manager, founder, executive, engineering-manager]
requires: [none]
inputs: [text, notes, document]
output: [table, plan, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [replanning, commitment-inventory, stop-list, overcommitment, stakeholder-communication]
pairs_with:
  prompts: [critique-roadmap, audit-customer-commitments, allocate-capacity-across-departments, write-roadmap-update, build-outcome-roadmap]
  personas: [internal-tools-product-manager, technical-program-manager]
args:
  - name: current_roadmap
    description: The roadmap as it stands, plus every other place work is promised (sales promises, executive asks, tickets marked urgent, side projects), with owners and dates where known.
    type: text
    required: true
  - name: team_capacity
    description: Teams and people, real availability over the period, and how much time support, incidents and maintenance take.
    type: text
    required: true
  - name: goals
    description: Optional. The goals or outcomes the roadmap should serve. If empty, step 3 asks for them.
    type: text
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: review, gate: approve, artifact: "reset/01-commitment-inventory.md"}
  - {id: capacity, file: steps/02-capacity.md, stage: review, gate: approve, artifact: "reset/02-capacity-gap.md"}
  - {id: reprioritise, file: steps/03-reprioritise.md, stage: plan, gate: approve, artifact: "reset/03-priorities.md"}
  - {id: stop-list, file: steps/04-stop-list.md, stage: plan, gate: approve, artifact: "reset/04-stop-and-delay.md"}
  - {id: communicate, file: steps/05-communicate.md, stage: ship, gate: none, artifact: "reset/05-communications.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Resets a roadmap that promises more than the team can deliver. The usual cause is hidden commitments: promises made in sales calls, executive side requests and "small" favours that never appear on the official plan. This track makes every commitment visible, measures it against real capacity, re-ranks against outcomes, gets explicit agreement on what will not happen, and tells each group what changed. Each step writes one artifact and stops for approval.

<current_roadmap>
{{current_roadmap}}
</current_roadmap>

<team_capacity>
{{team_capacity}}
</team_capacity>

{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

Rules for every step:
- Use only facts the owner gave or confirmed. Missing owners, sizes, dates and sources become [X] and a question; never invent them.
- Keep a single list: every item carries the same id from step 1 to step 5.
- Stopping or delaying work is a decision for a named owner, not for the assistant. Present options and consequences; do not decide.
- Contract terms and customer promises with remedies go to the company's legal contact before any customer message.
- Be honest in every message; do not spin delays as progress.
- End each artifact with open questions.
