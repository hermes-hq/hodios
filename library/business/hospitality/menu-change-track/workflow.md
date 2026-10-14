---
schema: 1
id: menu-change-track
kind: workflow
title: Change a restaurant menu
description: Takes a restaurant or cafe through a menu change in gated steps - review the current menu, draft and cost dishes, test and finalise, train and launch, then review after four weeks.
category: hospitality
version: 1.0.0
status: incubating
stage: [review, design, build, ship]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [dataset, notes, text]
output: [plan, table, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [menu-change, seasonal-menu, recipe-costing, menu-launch, staff-tasting, allergens]
pairs_with:
  prompts: [engineer-restaurant-menu, cost-menu-dish, write-dish-spec-sheet, build-allergen-matrix, write-menu-descriptions]
  personas: [hospitality-manager]
args:
  - name: venue
    description: The venue, its concept and guests, kitchen equipment and team, price level, and why the menu is changing (season, cost increases, slow sales, new chef).
    type: text
    required: true
  - name: current_menu
    description: The current menu with prices, and sales and costs per dish if you have them.
    type: text
    required: true
  - name: launch_date
    description: When the new menu should go live. Optional.
    type: string
steps:
  - {id: review, file: steps/01-review-current-menu.md, stage: review, gate: approve, artifact: "menu/01-review.md"}
  - {id: draft, file: steps/02-draft-and-cost.md, stage: design, gate: approve, artifact: "menu/02-draft-and-costing.md"}
  - {id: test, file: steps/03-test-and-finalise.md, stage: build, gate: approve, artifact: "menu/03-final-menu.md"}
  - {id: launch, file: steps/04-train-and-launch.md, stage: ship, gate: approve, artifact: "menu/04-launch-plan.md"}
  - {id: after, file: steps/05-four-week-review.md, stage: review, gate: none, artifact: "menu/05-four-week-review.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a menu change the way an experienced head chef and manager would: decide what to keep and why before writing new dishes, cost every new dish before it is tasted, test it on the real line, train the team and update allergen information before launch, then check the numbers after four weeks. Each step writes one artifact and stops for approval; later steps use only what was approved.

<venue>
{{venue}}
</venue>

<current_menu>
{{current_menu}}
</current_menu>
{{#launch_date}}

Launch date: {{launch_date}}
{{/launch_date}}

Rules for every step:
- Use only figures the user gave or confirmed. Mark gaps as `[needed]`; never invent supplier prices, sales or costs.
- Show arithmetic for every margin and food cost figure.
- Keep the kitchen's real capacity in view: stations, equipment, prep time and team skills on a busy service.
- Allergen and dietary information must be updated before any new dish is sold; never state a dish is free from an allergen without checked ingredients and supplier labels.
- Keep dietary coverage: vegetarian, vegan or other options the venue offers must not disappear without a replacement.
- Plain words and short tables; each artifact ends with open questions.
