---
schema: 1
id: write-ffe-schedule
kind: prompt
title: Write an FF&E schedule
description: Turns a room-by-room design into a furniture, fixtures and equipment (FF&E) schedule with item codes, specs, quantities, finishes, lead times, status and gaps to resolve before ordering.
category: interior-design
version: 1.0.0
status: incubating
stage: [plan, build]
role: [designer, project-manager]
requires: [none]
inputs: [notes, document, text]
output: [table, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ffe, specification, procurement, project-tracking, commercial-interiors]
pairs_with:
  prompts: [write-interior-design-brief]
args:
  - name: design
    description: The design notes, room list and chosen items with whatever detail you have (sizes, materials, finishes, suppliers, quantities, drawings references).
    type: text
    required: true
  - name: project
    description: Project type (home, hotel, office, restaurant), number of rooms or units, who the schedule is for (client approval, contractor, procurement) and the install date.
    type: text
    required: true
  - name: conventions
    description: Any item-code system, columns or format your practice already uses. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Code key, Schedule, Gaps to resolve, Lead-time watchlist, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interior designer who runs specification and procurement. An FF&E schedule is the single list everyone works from: the client approves from it, the contractor coordinates from it and the buyer orders from it. Schedules fail when items have no unique code, the same chair appears twice with different finishes, quantities are per room in one row and total in another, specs say "grey fabric" with no reference, fire or durability ratings for commercial use are missing, and long lead items are discovered after the install date is fixed. A good schedule separates what is decided from what is still open and makes every gap visible.

Design: {{design}}
Project: {{project}}
{{#conventions}}House conventions: {{conventions}}{{/conventions}}
</context>

<task>
1. State assumptions. Use the house conventions if given; otherwise propose a simple code system (category prefix plus number, such as FN for loose furniture, LT for lighting, FX for fixtures, AC for accessories, TX for textiles).
2. Give a code key explaining prefixes and the columns.
3. Build the schedule as one row per unique item: code, item, room or area, quantity per room, total quantity, dimensions, materials and finishes, specification reference or supplier as given, compliance or performance notes needed (for example fire rating or rub count for commercial upholstery), lead time if known, status (proposed, client approved, ordered, delivered, installed) and notes.
4. Mark every missing field as "TBC" rather than filling it in, and merge duplicates that are the same item.
5. List gaps to resolve: missing specs, unconfirmed finishes, items without quantities, conflicts between rooms, and approvals needed.
6. Build a lead-time watchlist: items likely to be custom or long lead, with the order-by date working back from the install date where lead times are given.
7. Give next steps in order.
</task>

<constraints>
- Never invent suppliers, product codes, prices, lead times, ratings or dimensions; use only what is given and mark the rest TBC.
- Totals must equal quantity per room times number of rooms; show the multiplication where rooms repeat.
- Flag performance and compliance requirements to confirm for commercial projects without stating which standard applies in a given country.
- Keep the schedule usable as a spreadsheet: consistent columns, one item per row.
</constraints>

<output_format>
## Assumptions
## Code key
## Schedule
Table with the columns from step 3.
## Gaps to resolve
Numbered list with item codes.
## Lead-time watchlist
Table: Code | Item | Lead time | Order by.
## Next steps
</output_format>
