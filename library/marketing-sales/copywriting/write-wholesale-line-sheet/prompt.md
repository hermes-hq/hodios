---
schema: 1
id: write-wholesale-line-sheet
kind: prompt
title: Write a wholesale line sheet
description: Writes the copy and layout for a wholesale line sheet or trade catalogue, with a three-line brand story, product rows with SKUs and prices from your data, minimums, lead times and reorder terms.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, sales-rep]
subject: [retail]
requires: [none]
inputs: [text, dataset]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [line-sheet, wholesale, stockists, trade-catalogue, makers]
pairs_with:
  prompts: [write-product-description, write-packaging-copy, plan-promotional-offer, write-about-page]
args:
  - name: products_and_prices
    description: Your products with name, SKU or code, variants, size or weight, wholesale price, recommended retail price, case pack, barcode if you have them, and a short note on each. A pasted spreadsheet is fine.
    type: text
    required: true
  - name: terms
    description: Trade terms - minimum opening and reorder order, payment terms, shipping costs or free-shipping threshold, lead times, returns or damages policy, exclusivity, and how to order.
    type: text
    required: true
  - name: brand
    description: Brand name, what you make, where and how, and what shops and their customers like about it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Cover and brand story, Product pages, Order terms, Order form, Checks before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write wholesale line sheets for makers and small brands selling to independent shops. A shop buyer reads a line sheet fast, often at a trade fair or between customers, to answer four questions: will it sell to my customers, what margin do I make, what do I have to order, and when does it arrive. Line sheets lose orders when they read like a consumer website, bury the minimums, mix up wholesale and retail prices, leave out case packs, or are undated so buyers do not trust the prices.
</context>

<task>
<products_and_prices>
{{products_and_prices}}
</products_and_prices>

<terms>
{{terms}}
</terms>

{{#brand}}<brand>
{{brand}}
</brand>{{/brand}}

1. If wholesale prices or the minimum order are missing, ask for them and stop; a line sheet without them cannot be used.
2. Cover: brand name, season or date, a three-line brand story aimed at the shop (what it is, why customers buy it, proof such as current stockists only if supplied), and contact details.
3. Product pages: group products into collections or categories. For each product write a name, a selling line of at most 15 words a shop assistant could repeat, and the data row: SKU, variants, size, case pack, wholesale price, recommended retail price, markup (RRP divided by wholesale, computed from the data) and barcode. Note where a photo goes.
4. Check the numbers: flag any product where the markup is far below the others or below what shops in the category usually expect, as a question rather than a verdict. Never change prices.
5. Order terms: opening minimum, reorder minimum, payment terms, shipping and thresholds, lead time, damages and returns, exclusivity, and "prices valid until".
6. Order form: a simple table the buyer fills in (SKU, product, case pack, number of cases, line total) with a terms reminder.
7. Checks before sending: missing data, inconsistencies, and the date and version on every page.
</task>

<constraints>
- Use only the supplied prices, SKUs and terms; never round or alter them. Mark missing data as [X].
- Show computed markups with one decimal and say they are computed.
- No invented stockists, press, awards or sales figures.
- Keep wholesale and retail prices clearly labelled and never shown in a way a consumer could confuse.
- Product claims (organic, vegan, handmade, local) only if supplied; certifications need the certificate holder's wording.
</constraints>

<output_format>
## Cover and brand story
Cover text and the three-line story.

## Product pages
Per collection: a heading, then a table: Product | Selling line | SKU | Variants | Size | Case pack | Wholesale | RRP | Markup | Barcode.

## Order terms
Bullets, one per term, with "prices valid until".

## Order form
A blank table ready to fill.

## Checks before sending
Checklist of [X] items and flagged prices.
</output_format>
