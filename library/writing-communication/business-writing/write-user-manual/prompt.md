---
schema: 1
id: write-user-manual
kind: prompt
title: Write a user manual
description: Writes a task-based user manual for a physical product, appliance, office system or service, with safety notices, setup, everyday tasks, care and troubleshooting organised by symptom.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, founder, operations-manager, product-manager]
requires: [none]
inputs: [spec, notes, document]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [user-manual, instructions, symptom-table, safety-notices, minimalism]
pairs_with:
  prompts: [write-sop, simplify-to-plain-language, review-document-for-ambiguity]
args:
  - name: product_description
    description: What the product or service is, its parts and controls (names as printed on the product), how it is set up and used, specifications, and any existing notes or drafts.
    type: text
    required: true
  - name: reader_skill
    description: The least experienced reader the manual must serve. Novice assumes no prior knowledge of this kind of product.
    type: enum
    enum: [novice, regular, expert]
    default: novice
  - name: known_issues
    description: Problems users report or support handles, with their causes and fixes if known.
    type: text
output_contract:
  format: markdown
  sections: [Manual, Facts to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People open a manual when they are trying to do something or something has gone wrong, not to read about features. Task-based manuals (the minimalist approach from technical communication research) organise content around what users want to do, start each task with the action, put one action in each step, show what should happen after a step, and let readers recover from errors. Manuals fail when they describe each button in turn, bury safety warnings in the middle of steps, use names that differ from the labels on the product, assume knowledge the reader lacks, or invent specifications the product does not have.

Safety notices follow the widely used signal-word hierarchy: **DANGER** (will cause death or serious injury), **WARNING** (could cause death or serious injury), **CAUTION** (could cause minor or moderate injury), **NOTICE** (property damage only, no injury). Each notice names the hazard, the consequence and how to avoid it, and sits before the step it applies to.
</context>

<task>
Write a user manual for a {{reader_skill}} reader.

<product_description>
{{product_description}}
</product_description>
{{#known_issues}}
<known_issues>
{{known_issues}}
</known_issues>
{{/known_issues}}

1. If you cannot tell what the product is, what its main controls are, or how it is used, ask for those details and stop.
2. List the user's tasks in the order they meet them: unpacking and checking the contents, setup, first use, everyday tasks, occasional tasks (settings, cleaning, refilling, replacing parts), and end of life (storage, disposal) where relevant.
3. Write each task as: a heading that names the goal ("Make a double espresso", "Add a new user"), any prerequisite, safety notices that apply, then numbered steps. One action per step, imperative mood, the control named exactly as labelled and in bold, and the expected result in italics after the steps where users need confirmation.
4. Pitch the detail to {{reader_skill}}: novices get every step and a one-line explanation of unfamiliar terms; regular users get compact steps; experts get reference tables and shortcuts.
5. Write troubleshooting as a table organised by what the user notices (the symptom), not by internal cause: Symptom · Possible cause · What to do. Use known issues first, then obvious checks (power, connection, consumables). Escalation to support or a qualified technician goes last.
6. Add safety notices only for hazards that follow from the description (heat, electricity, moving parts, pressure, chemicals, weight, children, data loss) and mark any you inferred with `[confirm]`.
7. Keep a list of every fact you needed but did not have (dimensions, voltages, capacities, button names, temperatures, warranty terms, support contacts) and use `[confirm: …]` in the text rather than inventing them.
</task>

<constraints>
- Never invent specifications, settings, part numbers, certifications, warranty terms or contact details.
- Use the product's own names for controls and screens consistently; if the description uses two names for one thing, pick one and note it.
- Plain language: short sentences, active voice, second person, no marketing claims.
- For electrical, gas, pressure, children's, medical or vehicle products, note under Facts to confirm that legally required manual content and safety wording differ by market and must be checked against the applicable regulations before publication.
- Keep each task under about ten steps; split longer ones.
</constraints>

<output_format>
## Manual
Title, then: Safety information · What is in the box (or What you need) · Parts and controls (table: Part · What it does) · Setup · Everyday tasks · Occasional tasks · Care and maintenance · Troubleshooting (table) · Specifications (only supplied facts) · Getting help.
## Facts to confirm
Bullets: every `[confirm: …]` placeholder and inferred safety notice, grouped by section, plus any naming inconsistencies found.
</output_format>
