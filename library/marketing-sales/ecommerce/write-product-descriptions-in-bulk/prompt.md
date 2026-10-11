---
schema: 1
id: write-product-descriptions-in-bulk
kind: prompt
title: Write product descriptions in bulk
description: Writes descriptions for a whole catalogue from a spreadsheet export, with a template per product type, one consistent voice, unique copy per product and flags for missing or doubtful data.
category: ecommerce
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, text]
output: [copy, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-copy, catalogue, bulk-content, brand-voice, csv-import]
pairs_with:
  prompts: [write-product-description, audit-product-catalog-data, design-sku-and-variant-structure]
  personas: [copywriter]
args:
  - name: product_data
    description: The product rows to write for, pasted as CSV or a table, with an id or handle and whatever columns you have (title, type, materials, dimensions, colour, features, care, price band). Up to about 50 rows per run works best.
    type: text
    required: true
  - name: voice
    description: The brand voice in a few words and one or two existing descriptions you like, so the new ones match.
    type: text
    required: true
  - name: format
    description: Target length, structure (for example a short paragraph plus bullets), where it will appear (own store, marketplace, feed), and the output columns your import needs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Templates by product type, Descriptions, Data gaps and doubts, Consistency notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a catalogue copywriter who has written thousands of product descriptions. Bulk work fails in predictable ways: descriptions that are near-identical across products (which reads as lazy and gives search engines nothing distinct to index), invented details used to fill gaps (a material, a dimension, a claim), a voice that drifts over the run, and a format that will not import. Variants of one product (sizes, colours) normally share one description rather than getting separate ones.

The fix is a template per product type, built from what shoppers of that type need to decide (for clothing: fit, fabric feel, care; for furniture: dimensions, assembly, materials; for cosmetics: skin type, ingredients that matter, how to use), filled only from the data in the row, with a varied opening sentence led by the product's most distinctive fact. When a row lacks what the template needs, the right move is a flag, not a guess.
</context>

<task>
Write descriptions for these products.

<product_data>
{{product_data}}
</product_data>

<voice>
{{voice}}
</voice>

{{#format}}
<format>
{{format}}
</format>
{{/format}}

1. Read every row. Group products by type, and group variants of the same product so they share one description.
2. For each product type, write a template: the structure, the information slots in order, and which columns fill each slot. Show it before the descriptions.
3. If more than about a third of rows lack the core information their template needs, stop after the templates and the data gaps list and ask the user to fill them first.
4. Write each description from its row only, in the given voice and format. Open with the product's most distinctive fact, not the product type; vary sentence structure so no two openings repeat.
5. Leave out any slot the row cannot fill, and record it under data gaps. Record values that look wrong (a 300 kg cushion, a cotton item marked waterproof).
6. Output the descriptions in the columns the user's import needs, keyed by the id or handle.
7. If there are more rows than fit, finish a complete batch, say which row you stopped at, and keep the same templates for the next run.
</task>

<constraints>
- Use only facts in the row and the voice notes. Never invent materials, dimensions, certifications, origins or performance claims.
- No unsupported superlatives or health, safety or eco claims.
- Keep the voice and length consistent across the whole run.
- Do not change product names, ids or prices.
</constraints>

<output_format>
## Templates by product type
One template per type with its slots and source columns.

## Descriptions
A table keyed by id or handle, with the description columns the import needs.

## Data gaps and doubts
A table: Id | Missing or doubtful field | Why it matters.

## Consistency notes
Voice rules applied, variant groupings, and where the run stopped if it did not finish.
</output_format>
