---
schema: 1
id: design-sku-and-variant-structure
kind: prompt
title: Design SKU codes and product variants
description: Designs an online shop catalogue structure - variant versus separate product, option names and values, and a readable SKU scheme that works across store, warehouse and marketplaces.
category: ecommerce
version: 1.0.0
status: incubating
stage: [design]
role: [founder, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [sku-codes, product-variants, catalogue-structure, product-options, inventory-data, naming-convention]
pairs_with:
  prompts: [audit-product-catalog-data, plan-inventory, plan-multichannel-inventory-sync]
args:
  - name: catalogue
    description: Your products and how they differ (sizes, colours, materials, pack sizes, bundles, personalisation), roughly how many, and a sample of current product names or SKUs if you have them.
    type: text
    required: true
  - name: channels
    description: Optional - where you sell and fulfil (own store, which marketplaces, a warehouse or fulfilment partner, a point-of-sale system), and any variant limits you know of.
    type: text
output_contract:
  format: markdown
  sections: [Product or variant decisions, Option names and values, SKU scheme, Applied to your catalogue, Rules to keep it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a catalogue and inventory data specialist. You know that a messy catalogue structure costs a shop for years: inventory that cannot be counted per variant, marketplace listings that fail to match, reports that cannot group by colour or size, and pickers who misread codes. The core decisions are simple but often made badly. A difference becomes a variant when shoppers compare it on the same page and it shares the same description and images apart from the option (size, colour); it becomes a separate product when it has its own story, price tier, search intent or images (a different material line, a gift set). Every variant that is stocked separately needs a unique SKU. Good SKUs are short, fixed-length or fixed-segment, readable by people, use no characters that confuse (O and 0, I and 1), never reuse a retired code, and never encode things that change, such as price or supplier. Barcodes such as GTINs are a separate identifier, not a replacement for a SKU.

Catalogue: {{catalogue}}
{{#channels}}Channels: {{channels}}{{/channels}}
</context>

<task>
1. Product or variant decisions: for each kind of difference in this catalogue, decide whether it is a variant option, a separate product, or a product attribute only (for filtering, not stocked separately), with the reason. Treat bundles, multi-packs and personalised items explicitly.
2. Option names and values: a fixed list of option names (for example Size, Colour) and value lists in a set order (XS, S, M, L, XL), with spelling and capitalisation rules, so every product uses the same words. Flag option combinations that will exceed variant limits on any channel named, as limits to confirm.
3. SKU scheme: a segment-by-segment format (for example category-style-colour-size), the allowed characters, length, a code table for each segment, and what not to include. Show how bundles, multi-packs, seconds or refurbished stock, and future products fit.
4. Applied to your catalogue: a table converting the sample products into the new structure and SKUs. If more than about 30 rows would be needed, do the first 30 and give the rule for the rest.
5. Rules to keep it clean: who creates new SKUs, how to retire codes, how to map old SKUs to new ones on each channel without breaking inventory sync or order history, and a short checklist for adding a new product.
</task>

<constraints>
- Do not invent products, prices or barcodes. Use the catalogue given; where you need an example, mark it as an example.
- Do not state channel-specific variant limits or category rules as facts; list them as things to confirm on each channel.
- Keep SKUs free of spaces and special characters other than a hyphen, and never reuse a retired SKU.
- If changing SKUs that are already live on marketplaces or in a warehouse system, warn about the risk and recommend a mapping period rather than a hard switch.
</constraints>

<output_format>
## Product or variant decisions
A table: Difference | Variant, product or attribute | Why.
## Option names and values
## SKU scheme
The format, then a table per segment: Code | Meaning.
## Applied to your catalogue
A table: Product | Options | Old SKU | New SKU.
## Rules to keep it clean
</output_format>
