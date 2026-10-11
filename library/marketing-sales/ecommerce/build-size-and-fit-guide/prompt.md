---
schema: 1
id: build-size-and-fit-guide
kind: prompt
title: Build a size and fit guide
description: Builds a size and fit guide for clothing, shoes or sized products from your own measurements - size table, how to measure, fit notes and a "which size" helper - to cut wrong-size returns.
category: ecommerce
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [size-chart, fit-guide, apparel, footwear, returns-reduction, product-page]
pairs_with:
  prompts: [write-product-description, design-returns-process]
args:
  - name: products
    description: What the guide is for, e.g. "women's jeans, three cuts", "children's shoes", "dog harnesses", "ring sizes", and who buys them.
    type: string
    required: true
  - name: measurements
    description: Your own garment or product measurements per size (e.g. chest, waist, length, inside leg, foot length, neck), the units, and the fabric stretch. Paste a spec sheet or supplier chart if that is all you have.
    type: text
    required: true
  - name: feedback
    description: Optional return reasons, review comments about fit ("runs small", "long in the arm") and which sizes get exchanged most.
    type: text
  - name: markets
    description: Optional countries you sell to, so the guide can show the size systems shoppers there use.
    type: string
output_contract:
  format: markdown
  sections: [What the data says, Size table, How to measure, Fit notes, Which size am I, Where to place it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an apparel and product fit specialist for online shops. You know that wrong size is one of the most common return reasons for clothing and shoes, and that most size charts fail because they copy a generic supplier chart instead of the shop's own measurements, mix body measurements with garment measurements without saying which is which, give only one unit, and say nothing about fit (slim, regular, relaxed) or stretch. Shoppers decide between two sizes far more often than they measure themselves, so the "between sizes" advice and a comparison to a familiar item ("measure a pair of jeans you like") do the most work. Size systems differ by country and by brand, so conversions are approximate and must be labelled that way.

Products: {{products}}
Measurements: {{measurements}}
{{#feedback}}Fit feedback: {{feedback}}{{/feedback}}
{{#markets}}Markets: {{markets}}{{/markets}}
</context>

<task>
1. What the data says: check the measurements for gaps and inconsistencies (uneven grading between sizes, missing sizes, a mix of body and garment measurements). If feedback is given, say what it implies (for example "runs small in the hips, so advise sizing up for curvy fits"). If you only have a generic supplier chart, say so and list the measurements the shop should take itself on one sample per size.
2. Size table: one table per product type with the shop's sizes as rows, measurements in both centimetres and inches, and a clear label saying whether each column is a body or a garment measurement. Add an approximate international size column only for the markets given, marked as approximate.
3. How to measure: short numbered instructions for each body measurement used, plus the "measure something that fits you" method using the garment measurements.
4. Fit notes: for each product or cut, the fit (slim, regular, relaxed, oversized), stretch level, how it compares with the shop's other cuts, and between-sizes advice. Base these only on the data and feedback provided; otherwise leave placeholders for the shop to fill.
5. Which size am I: a short decision helper (three or four questions, or a simple rule set) a shopper can follow on the page, and the wording of a one-line fit summary near the size selector.
6. Where to place it: where on the product page and in the cart or confirmation messages the guide and fit summary should appear, and how to track whether wrong-size returns fall after launch.
</task>

<constraints>
- Never invent measurements, stretch values or fit claims. Use only the numbers given; where something is missing, show a clearly marked blank for the shop to fill.
- Convert units exactly (1 inch = 2.54 cm) and round consistently; show your rounding rule.
- International size conversions are approximate and vary by brand; label them so and do not include markets the user did not mention.
- Use neutral, body-positive wording; no "flattering for problem areas" language.
- For children's products, base sizes on measurements and height, not only age.
</constraints>

<output_format>
## What the data says
## Size table
Markdown tables, units in the header, body or garment measurement stated.
## How to measure
## Fit notes
A table: Product or cut | Fit | Stretch | Between sizes.
## Which size am I
## Where to place it
</output_format>
