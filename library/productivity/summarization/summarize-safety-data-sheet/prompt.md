---
schema: 1
id: summarize-safety-data-sheet
kind: prompt
title: Summarise a safety data sheet
description: Summarises a chemical safety data sheet for a non-specialist into the hazards, protective equipment, safe use, first aid, storage, spills and disposal, quoting the sheet's own wording.
category: summarization
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager, teacher, manager]
requires: [none]
inputs: [document]
output: [summary, checklist]
advice_risk: [medical]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [sds, msds, hazardous-substances, workplace-safety, cleaning-products]
pairs_with:
  prompts: [summarize-user-manual, interrogate-a-document, extract-instructions-from-transcript]
args:
  - name: sheet
    description: The full safety data sheet text, all sections (usually 16), including the product name, supplier and revision date.
    type: text
    required: true
  - name: use
    description: How the product will be used, by whom and where (for example "cleaning staff diluting it in a small kitchen", "school science prep room").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Product and sheet, Main hazards in plain words, Protective equipment and safe use, First aid, "Storage, spills and disposal", Not to mix or store with, Gaps and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise a safety data sheet (SDS, sometimes called MSDS) for someone who has to use or manage a chemical but is not a chemist: a cleaning supervisor, a facilities manager, a teacher, a small business owner. Sheets follow a standard 16-section layout, but the parts a user needs are scattered: hazard statements in section 2, first aid in 4, handling and storage in 7, exposure controls and protective equipment in 8, incompatible materials in 10, disposal in 13. Hazard codes and phrases are precise and must not be softened. Common real-world harm comes from mixing products (bleach with acids or ammonia), using concentrate where the sheet assumes dilution, missing ventilation, and the wrong gloves. A summary supports a local risk assessment; it never replaces the sheet or that assessment.

<sheet>
{{sheet}}
</sheet>

Intended use: {{use}}
</context>

<task>
1. Identify the product, supplier, revision date and whether the sheet appears complete.
2. List the hazard pictograms, signal word and hazard statements exactly as given, then explain each in plain words.
3. Give the protective equipment and handling measures from section 8 and 7 for the intended use, including the glove material if stated and ventilation needs.
4. Give first aid by route (eyes, skin, inhalation, swallowing) exactly as the sheet says, and when to get medical help.
5. Summarise storage, spill clean-up and disposal instructions.
6. List incompatible materials and products it must not be mixed or stored with.
7. List gaps: missing sections, an old revision date, instructions that seem not to fit the intended use, and what to check with the supplier or a safety adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the sheet. Never add hazards, exposure limits, glove types or first-aid steps from general knowledge as if they were on the sheet.
- Quote hazard statements and first-aid instructions exactly; do not soften "causes severe burns" into "may irritate".
- Say plainly that this summary does not replace the sheet, the label or a workplace risk assessment, and that local workplace safety rules apply.
- In an emergency, the user should follow the sheet's first-aid section and contact emergency services or a poison information centre.
- If the sheet is for a different concentration or product variant than the user describes, flag it.
</constraints>

<output_format>
## Product and sheet
Name, supplier, revision date, completeness.

## Main hazards in plain words
Table: Hazard statement (exact) | What it means

## Protective equipment and safe use
Checklist.

## First aid
Table: Route | What the sheet says | Get medical help when

## Storage, spills and disposal
Bullets.

## Not to mix or store with
Bullets.

## Gaps and checks
Bullets.
</output_format>
