---
schema: 1
id: design-kanban-replenishment
kind: prompt
title: Design a kanban or two-bin replenishment system
description: Designs a kanban or two-bin system for parts, materials or consumables - which items, bin or card quantities from usage and lead time, card design, triggers, the reorder routine and owners.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager, manager]
subject: [supply-chain]
inputs: [dataset, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [kanban, two-bin, replenishment, lean, consumables, pull-system, reorder-point]
pairs_with:
  prompts: [plan-inventory, run-5s-organisation, plan-production-schedule, plan-warehouse-slotting]
args:
  - name: setting
    description: Where the system will run, for example "assembly workshop with 6 benches", "dental clinic store room", "restaurant dry store", "maintenance spares cage".
    type: text
    required: true
  - name: items
    description: The items to include with average usage per day or week, how they are bought (pack size, minimum order), supplier lead time, and space limits. Paste a list or table.
    type: text
    required: true
  - name: current_problems
    description: Optional. What goes wrong today, for example running out, over-ordering, nobody owns ordering, staff hoarding stock at benches.
    type: text
output_contract:
  format: markdown
  sections: [Which items suit kanban, Sizing, Card and bin design, How the loop works, Owners and routine, Launch plan, Review and adjust]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lean materials specialist who sets up kanban and two-bin systems in workshops, clinics, kitchens and stores. A two-bin system keeps two containers of an item: when the first is empty, it (or its card) is the signal to reorder, and the second bin covers usage until the refill arrives. It works well for steady, low-cost, frequently used items and removes the need to count or remember. It fails when bins are sized by guess (so the second bin runs out before the refill comes), when the signal card goes nowhere or waits a week for someone to act, when staff take from the second bin before the first is empty, and when items with lumpy or rare demand are forced into it. Sizing is arithmetic: each bin must cover usage during the replenishment lead time (including the time for the signal to be seen and the order placed) plus a safety margin, rounded to pack sizes.
</context>

<task>
Design a kanban or two-bin replenishment system.

Setting: {{setting}}

<items>
{{items}}
</items>
{{#current_problems}}
<current_problems>
{{current_problems}}
</current_problems>
{{/current_problems}}

1. Which items suit kanban: sort items into good fits (steady, frequent, low or medium cost), poor fits (rare, lumpy, expensive, perishable, very bulky) and what to use for the poor fits instead (for example reorder by count, order on demand). Give the reason for each.
2. Sizing: for each good-fit item, compute the bin quantity as usage per day x (lead time days + signal and ordering delay days) x (1 + safety factor), rounded up to the pack size. State the safety factor and delay you assume and why. Show the arithmetic. Flag items where the bin is too big for the space or far above or below the supplier's minimum order, and suggest a fix (multi-card kanban, larger order covering several bins, or a different supplier pack).
3. Card and bin design: what goes on the card or bin label (item name and code, location, bin quantity, supplier, supplier code, lead time, reorder contact), colours or markings, and where the empty bins or cards go (a clear "to order" box or board).
4. How the loop works: step by step - first bin emptied, card to the board, collected at a fixed time, ordered, received, refilled bin returned behind the current one - with what to do with urgent shortages.
5. Owners and routine: who collects cards and how often, who places orders, who receives and refills, and a weekly five-minute check.
6. Launch plan: set up order (label locations, fill both bins, remove extra stock to a reserve area), train staff on the rule "never take from the second bin while the first has stock", and a start date.
7. Review and adjust: track stockouts and how often each card cycles; resize bins quarterly or after usage changes; retire items that no longer fit.
</task>

<constraints>
- Use the user's usage and lead times; label every assumption, especially missing lead times or usage.
- Show the sizing arithmetic for every item so it can be checked.
- Do not include safety-critical or regulated items (for example controlled medicines or items needing temperature records) in a simple two-bin system without noting the extra controls they need.
- Keep it practical for the setting's size; no software is required unless the user asks.
</constraints>

<output_format>
## Which items suit kanban
Table: Item | Fit | Reason | Alternative if poor fit.
## Sizing
Table: Item | Usage/day | Lead + delay (days) | Safety | Raw qty | Pack size | Bin qty, with one worked example in full.
## Card and bin design
A card template.
## How the loop works
Numbered steps.
## Owners and routine
Table: Task | Owner | When.
## Launch plan
Checklist.
## Review and adjust
Bullets.
</output_format>
