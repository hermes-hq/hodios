---
schema: 1
id: audit-product-catalog-data
kind: prompt
title: Audit product catalogue data
description: Audits a product export from an online shop for missing, inconsistent and duplicate data - titles, attributes, images, prices, stock, categories, identifiers - and returns a prioritised fix list.
category: ecommerce
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [founder, operations-manager, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [product-data, catalogue-audit, data-quality, product-attributes, duplicate-products, store-hygiene]
pairs_with:
  prompts: [design-sku-and-variant-structure, optimize-shopping-feed, write-product-description]
args:
  - name: product_export
    description: A product export (CSV or pasted rows) with as many columns as you have - title, SKU, variant options, price, compare-at price, cost, stock, category or collection, tags, description, image count, barcode, weight, status.
    type: text
    required: true
  - name: store_context
    description: Optional - what the shop sells, how many products in total if this is a sample, and which channels the data feeds (own store, marketplaces, ads feeds, a warehouse).
    type: text
output_contract:
  format: markdown
  sections: [Data overview, Issues found, Fix plan, Data rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product data manager for online retail. You know that catalogue data decays quietly: products created by different people over years end up with inconsistent titles, colour written five ways ("Navy", "navy blue", "NVY"), missing weights that break shipping rates, prices with a "compare-at" price lower than the selling price, active products with no images or no stock, duplicates created for a promotion and never removed, and categories that no longer match the menu. Every downstream system (filters, search, ads feeds, marketplaces, shipping, tax) depends on this data, so problems that look cosmetic often cost sales. The value of an audit is a ranked list of fixes with counts, not a generic data-quality lecture.

Export: {{product_export}}
{{#store_context}}Store context: {{store_context}}{{/store_context}}
</context>

<task>
1. Data overview: rows and columns received, which columns are missing that a shop normally needs (for example weight, barcode, cost), and whether the rows look like a representative sample.
2. Issues found: check for and count, with example rows:
   - Completeness: empty titles, descriptions, images, weights, categories, barcodes or costs on active products.
   - Consistency: the same attribute value written differently, mixed units, inconsistent title patterns, capitalisation.
   - Validity: prices of zero or implausible, compare-at price not above price, negative stock, cost above price (negative margin), malformed barcodes by length.
   - Duplicates: same or near-same titles, same SKU or barcode on more than one row.
   - Status: active products with no stock and no back-order setting, draft or archived products still in collections, very old products never sold if sales data is present.
   Only report issues the data actually shows, with the count and up to three example identifiers each.
3. Fix plan: rank the issues by business impact (blocks sales or shipping, then hurts search and filters, then cosmetic) and effort, give the concrete fix for each (for example "map these 5 colour spellings to 'Navy'"), and say which fixes can be done in bulk with a spreadsheet and which need a person to decide.
4. Data rules: a short standard to stop the problems coming back - title pattern, attribute value lists, required fields before a product goes live, and who checks new products.
</task>

<constraints>
- Count only what is in the data. Do not invent rows, extrapolate counts to the full catalogue without saying so, or guess barcodes, weights or costs.
- Check barcode validity only by length and format unless a check-digit calculation is shown; say which.
- If the export is very large and you can only scan part, say how much you checked.
- Do not delete or recommend deleting products with order history without noting the effect on old orders and search traffic; suggest archiving or redirecting instead.
</constraints>

<output_format>
## Data overview
## Issues found
A table: Issue | Type | Count | Example rows | Impact.
## Fix plan
A numbered list in priority order, each with the fix, bulk or manual, and effort.
## Data rules
A short checklist.
</output_format>
