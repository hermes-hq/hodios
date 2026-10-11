---
schema: 1
id: design-product-catalogue
kind: prompt
title: Design a product catalogue
description: Designs a print or PDF product catalogue or lookbook with structure, page count and binding, a grid and page templates, the product entry, photography rules, data merge and price proofing.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, marketer, founder, operations-manager]
requires: [none]
inputs: [text, dataset, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [product-catalogue, lookbook, editorial-layout, data-merge, print-design]
pairs_with:
  prompts: [design-report-layout, prepare-print-files, design-packaging, write-product-description]
  personas: [art-director]
args:
  - name: products
    description: The range - number of products, categories, what data exists per product (name, code, sizes, materials, price, images) and where it lives (spreadsheet, shop platform).
    type: text
    required: true
  - name: purpose
    description: Who uses the catalogue and how, for example "trade buyers ordering at a fair", "consumers browsing at home", "seasonal fashion lookbook for stockists".
    type: text
    required: true
  - name: format
    description: Print, PDF or both, size, quantity, and how often it is updated. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and use, Structure, Page count and binding, Grid and templates, Product entry, Photography, Data and pricing, Proofing, Digital version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A catalogue is two things at once: a mood piece that sells the range and a reference tool that buyers order from. Trade buyers need product codes, pack sizes, minimum order quantities and a fast way to find things; consumers need inspiration and a clear way to buy. Catalogues go wrong when photography is inconsistent (different angles, backgrounds and light make the range look cheap), when every page is a dense grid with no pacing, when prices are printed into a catalogue that must last a year, and when product data is retyped by hand so codes and prices are wrong. Printed page counts must be a multiple of 4 for saddle stitching, which only works up to a limited thickness; thicker catalogues need perfect binding.
</context>

<task>
Design a product catalogue for this range:

<products>
{{products}}
</products>

Purpose and use: {{purpose}}
{{#format}}Format: {{format}}{{/format}}

1. **Purpose and use.** Who opens it, in what situation, and what they must be able to do in under a minute (find a product, compare, order, feel the brand).
2. **Structure.** Sections in order (cover, intro or brand story, category sections with openers, index by name and code, ordering information, back cover), and how readers navigate (tabs, running heads, colour per section, page references).
3. **Page count and binding.** An estimated page count from the number of products and products per page, rounded to a multiple of 4; binding recommendation (saddle stitch for thinner catalogues, perfect binding beyond about 48 to 64 pages depending on paper; confirm with the printer); size and orientation.
4. **Grid and templates.** A grid and 3 to 5 page templates (hero spread, category opener, product grid of 4, 6 or 9, feature page, order information), with pacing so dense grids alternate with hero pages.
5. **Product entry.** Every field in display order with type style: name, code, short description, variants, dimensions or sizes, materials, price or price reference, icons (with a legend) for attributes such as vegan or certified, only when true.
6. **Photography.** Packshot rules (background, angle, lighting, shadow, scale cues), lifestyle shots for openers, consistent crops, and what to do with existing inconsistent images.
7. **Data and pricing.** Keep product data in one spreadsheet and merge it into the layout; prices printed in the catalogue versus a separate price list insert or PDF that can be updated; currency and tax display for the audience.
8. **Proofing.** A checklist: codes and prices checked against the source data, images matched to the right product, colour proof for key products, page references and index checked.
9. **Digital version.** An accessible, bookmarked PDF or a web version, linked product pages, and file size limits for email.
</task>

<constraints>
- Do not invent product data, prices, certifications or claims; use placeholders and flag missing data.
- Never use certification or eco icons unless the product actually holds them.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Structure as a page plan table (Pages, Section, Template, Content). Product entry as a table (Field, Example, Style). Proofing as a checklist.
</output_format>
