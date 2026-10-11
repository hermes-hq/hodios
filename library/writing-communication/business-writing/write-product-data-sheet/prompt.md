---
schema: 1
id: write-product-data-sheet
kind: prompt
title: Write a product data sheet
description: Writes a B2B product data sheet from technical notes with specifications and test conditions, dimensions, compliance, ordering codes and limits of use, and flags gaps or conflicts.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, technical-writer, sales-rep]
subject: [engineering]
requires: [none]
inputs: [notes, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-sheet, product-specifications, technical-documentation, b2b, ordering-codes]
pairs_with:
  prompts: [write-brochure-copy, write-user-manual]
args:
  - name: technical_notes
    description: Everything engineering or the supplier gave you - specs, test reports, dimensions, materials, variants, packaging, certifications held, storage and handling, known limits.
    type: text
    required: true
  - name: audience
    description: Who uses the sheet, for example "specifying engineers", "distributors' sales staff" or "installers".
    type: string
    required: true
  - name: markets
    description: Countries or regions it will be sold in, so units and compliance marks are presented correctly.
    type: string
output_contract:
  format: markdown
  sections: [Data sheet, Gaps and conflicts, Claims needing evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn engineering notes into product data sheets that specifiers and buyers can rely on. A data sheet is a reference document, not a brochure: readers compare numbers across suppliers and copy them into their own designs, specifications and purchase orders. Experienced technical writers know that a number without its test condition, tolerance or standard is close to useless ("IP67" needs the standard, "load 500 kg" needs static or dynamic, "battery life 10 h" needs the conditions), that typical, minimum and maximum values must be labelled, that units must be consistent with conversions rounded honestly, and that compliance marks may only appear when a certificate or declaration exists. Every sheet needs a revision number, a date and a short disclaimer, and should say what the product is not intended for.

Audience: {{audience}}
{{#markets}}Markets: {{markets}}{{/markets}}

<technical_notes>
{{technical_notes}}
</technical_notes>
</context>

<task>
1. Write the data sheet with these blocks:
   - Header: product name, model or part number, a one-sentence description of what it is and its main application, revision [Rev X] and date [placeholder].
   - Key features: four to six factual bullets, each tied to a specification.
   - Specifications table: Parameter | Value | Unit | Condition or test standard, with min, typical and max labelled where they differ.
   - Dimensions and weight, materials and finishes.
   - Environmental and operating limits: temperature, humidity, ingress, chemical resistance, as supplied.
   - Compliance and certifications: only those the notes say are held, with the standard number.
   - Ordering information: table of variants with ordering codes, packaging quantity and accessories.
   - Storage, handling, installation notes and intended use, including "not intended for" if the notes indicate limits.
   - Disclaimer placeholder: specifications subject to change; check the latest revision.
2. Units: keep the notes' units; for markets that expect another system, add a converted value in brackets, rounded sensibly and marked as converted.
3. Gaps and conflicts: list missing test conditions, missing tolerances, values that conflict between sources, and inconsistent units.
4. Claims needing evidence: list any statements (performance, safety, compliance, "food safe", "fire rated") that need a certificate or test report before publication.
</task>

<constraints>
- Never invent a value, tolerance, standard, certificate or ordering code. Leave [to confirm] and list it under Gaps.
- No marketing language in the specifications or features; no "best", "ultimate", "revolutionary".
- If two sources disagree on a value, do not choose one silently; show both in Gaps and conflicts.
- Do not add safety or compliance claims that are not in the notes.
</constraints>

<output_format>
## Data sheet
The sheet with block headings and tables.
## Gaps and conflicts
Bullets naming the parameter and what is missing or conflicting.
## Claims needing evidence
Bullets.
</output_format>
