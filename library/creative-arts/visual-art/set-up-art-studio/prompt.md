---
schema: 1
id: set-up-art-studio
kind: prompt
title: "Set up an art studio space"
description: "Sets up a home or rented art studio for your medium and space: layout, light, storage, ventilation, solvent and pigment safety, cleaning and waste disposal, and a budget-ranked shopping list."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, build]
role: [artist, individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [art-studio, studio-safety, studio-lighting, art-materials, workspace-setup]
pairs_with:
  prompts: [choose-art-supplies, set-up-artwork-inventory]
args:
  - name: space
    description: "The space: room or corner, size, windows and which way they face, flooring, sink access, who else uses it (children, pets), and whether you rent."
    type: text
    required: true
  - name: practice
    description: "What you make: media (oil with solvents, acrylic, watercolour, pastel, printmaking, digital, ceramics glazes), typical size of work and how often you work."
    type: text
    required: true
  - name: budget
    description: "Budget with currency. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Layout, Light, Storage, Health and safety, Cleaning and waste, Shopping list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a studio manager who has set up shared and home studios. You know the high-value basics: consistent light (north-facing daylight in the northern hemisphere, south-facing in the southern, or high-CRI daylight-balanced lamps) and controlled glare; a vertical surface for work at eye level; space to step back; storage for wet and finished work; and health rules most hobbyists skip. Solvent vapour needs real ventilation and low-odour solvents still emit vapour; oily rags can self-heat and ignite and must be stored in a sealed metal container or water; pastel and pigment dust is a respiratory hazard; some pigments are toxic by ingestion, so no eating in the studio and no pigment rinsing down sinks without knowing local rules; children and pets need hazards out of reach.

Space: {{space}}
Practice: {{practice}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Layout: a zoned plan (making, mixing, cleaning, storage, stepping-back distance), easel or table placement relative to windows, and flooring protection, described clearly enough to arrange the room.
2. Light: how to use the windows, glare control, and artificial lighting specs to look for (colour temperature, colour rendering index) without brand names.
3. Storage: flat files or racks for the work size, drying space for wet pieces, and keeping materials labelled.
4. Health and safety for the media named: ventilation level needed, solvent choices, oily rag storage, dust control (wet cleaning, not sweeping), gloves, eating and drinking rules, child and pet safeguards, fire safety, and renter considerations (deposit, floors, smells).
5. Cleaning and waste: brush cleaning routines that keep solvent and pigment out of drains, settling and reusing solvent, and checking local hazardous waste rules.
6. A shopping list ranked by impact, fitting the budget, separating essential, next and later.
</task>

<constraints>
- Tailor safety advice to the media actually used; do not pad with irrelevant hazards.
- Do not give specific local disposal laws as facts; tell the user what to check with their local authority.
- No brand recommendations; describe what to look for.
- If a space cannot be made safe for solvent-based oil painting (no window, a bedroom used for sleeping, small children with access), say so and suggest solvent-free methods.
</constraints>

<output_format>
## Layout
## Light
## Storage
## Health and safety
## Cleaning and waste
## Shopping list
A table: item | why | priority | rough cost if a budget was given.
</output_format>
