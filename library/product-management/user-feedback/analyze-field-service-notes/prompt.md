---
schema: 1
id: analyze-field-service-notes
kind: prompt
title: Analyse field service notes
description: Analyses technician visit notes for a physical product into failure modes, parts, use conditions and repeat visits, separating product faults from installation and misuse and flagging safety patterns.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [product-manager, operations-manager, manager]
subject: [engineering, agriculture]
requires: [none]
inputs: [notes, text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [field-service, failure-modes, repeat-visits, no-fault-found, product-safety, warranty-claims]
pairs_with:
  prompts: [define-physical-product-kpis, analyze-user-feedback]
  workflows: [returns-reduction-track]
args:
  - name: service_notes
    description: The visit notes or job records - date, model, serial or build date if known, symptom reported, what the technician found, parts replaced, and whether it was a repeat visit. Remove customer names and addresses.
    type: text
    required: true
  - name: product_and_models
    description: The product line, the models covered, roughly how many units are in use per model if known, and the period the notes cover.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coverage, Safety signals, Cause split, Failure modes, Repeat visits, Conditions of use, Fixes, Data quality, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn field service notes for a physical product (appliances, machines, vehicles, farm or workshop equipment, building systems) into evidence a product and quality team can act on. Technicians write for the next technician, not for analysis: notes are short, use part codes, and mix what the customer said with what was found. The value is in separating causes. A product fault needs a design or supplier fix; an installation fault needs installer guidance; misuse or harsh conditions often point to unclear instructions or a design that invites the wrong use; "no fault found" visits often mean the customer could not tell normal behaviour from a fault.

Safety comes first: a single pattern of overheating, smoke, fire, electric shock, gas or fluid leaks, sharp edges or moving-part injuries matters more than any volume count.
</context>

<task>
Product and models: {{product_and_models}}

<service_notes>
{{service_notes}}
</service_notes>

1. Safety signals: list every note that mentions heat, burning smell, smoke, fire, shock, gas, leaks onto electrics, injury or near miss, with model, date and the finding. Group them by likely mechanism.
2. Classify every visit by cause: product fault (design, component, manufacturing), installation, misuse or operating conditions, wear within normal life, no fault found, or unclear. Show counts and shares by model.
3. Failure modes: for product faults, group by component and mode (for example "drain pump - blocked impeller", "control board - relay failure") with counts, models, build-date range if available, and parts used. When units in use are given, express each mode per 1,000 units; otherwise note that counts alone cannot show rates.
4. Repeat visits: visits to the same unit within 30 days, their share, and what the first visit missed (wrong diagnosis, part not available, fix that did not hold).
5. Conditions of use: water hardness, dust, temperature, heavy use, power quality, or anything the notes show that clusters with faults.
6. Fixes: for the top three to five patterns, the fix type (design change, supplier quality, installer instructions, user instructions or labels, technician diagnostic guide, spare parts stocking) and the evidence it would need.
7. Data quality: which fields were missing and how to improve the note template so the next analysis is easier.
</task>

<constraints>
- Escalate every safety signal to the person responsible for product safety or quality straight away, regardless of count, and say that product safety reporting duties differ by country and product type and should be checked. Never conclude that a product is safe.
- Use only the notes given. Mark inferred causes as "inferred" and leave unclear visits as unclear rather than forcing a category.
- Do not compute failure rates without units in use; do not invent installed base figures.
- If the notes or the product description are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Coverage
Visits analysed, models, period, share of notes usable.

## Safety signals
Table: model | date | finding | mechanism | escalate. "None found" if none.

## Cause split
Table: model | product fault | installation | misuse or conditions | wear | no fault found | unclear | total.

## Failure modes
Table: component and mode | count | models | build dates | parts | per 1,000 units (or n/a).

## Repeat visits
Share, and the main reasons first visits did not resolve the problem.

## Conditions of use
Bullets with counts.

## Fixes
Table: pattern | fix type | owner (role) | evidence needed.

## Data quality
Missing fields and the improved note template.

## Questions
Up to five.
</output_format>
