---
schema: 1
id: set-up-reagent-inventory
kind: prompt
title: Set up a lab reagent inventory
description: Sets up a reagent and consumables inventory for a lab with fields, locations, reorder points, opened and expiry dates, ordering roles and a weekly routine, fitted to a spreadsheet or lab system.
category: lab-work
version: 1.0.0
status: incubating
stage: [operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [reagent-inventory, reorder-point, consumables, lab-ordering, stock-control]
pairs_with:
  prompts: [set-up-sample-tracking, estimate-experiment-reagent-costs, bridge-new-reagent-lot]
  personas: [lab-manager]
args:
  - name: lab
    description: Lab size, the kinds of reagents and consumables used, storage locations (rooms, fridges, freezers, cabinets), and how ordering works now.
    type: text
    required: true
  - name: tool
    description: Where the inventory will live, for example "shared spreadsheet", "our institution's LIMS" or "paper sheets on each fridge".
    type: string
    required: true
  - name: problems
    description: What goes wrong today, for example "run out of tips mid-week" or "duplicate antibodies nobody knew we had". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Record fields, Location scheme, Reorder rules, Roles and routine, Expiry and opened items, Rollout, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lab inventories fail when they try to track every item perfectly and nobody keeps them up to date. What works is tracking the items that hurt when they run out or are duplicated (expensive antibodies and kits, long-lead items, controlled or hazardous chemicals with register duties), using simple reorder points for consumables, recording lot number and opened date for reagents whose performance drifts, and building the update into a moment that already happens (unpacking a delivery, opening the last box). Chemical inventories often have legal or institutional reporting duties that a general system must support, not replace.
</context>

<task>
<lab>
{{lab}}
</lab>

Tool: {{tool}}
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. Scope: which item classes are tracked individually, which by reorder point only, and which not at all, with reasons.
2. Record fields: name, catalogue number, supplier, lot, quantity and unit, location, received date, opened date, expiry, owner or project, hazard class and register link where relevant. Mark required versus optional.
3. Location scheme: codes for rooms, units, shelves and boxes that match labels people can see.
4. Reorder rules: reorder point and order quantity based on usage and lead time, and the "last box" rule (whoever opens it triggers the order).
5. Roles and routine: who orders, who receives and logs deliveries, a weekly 15-minute check, and how requests from lab members come in.
6. Expiry and opened items: labelling convention, a monthly expiry sweep, and what to do with expired items (validate, discard via the right waste stream, or mark "not for critical work" if the lab permits).
7. Rollout: a staged start (high-value items first), a one-off count, and how to keep it alive.
8. Checks: quarterly spot checks of a sample of records against shelves.
</task>

<constraints>
- Fit the design to the stated tool; do not assume features it does not have.
- Do not state legal reporting thresholds for chemicals; say the institution's safety office sets them and the inventory must support its register.
- Keep it light enough for the lab size given.
</constraints>

<output_format>
## Scope
## Record fields
| Field | Required | Example |
## Location scheme
## Reorder rules
## Roles and routine
## Expiry and opened items
## Rollout
## Checks
</output_format>
