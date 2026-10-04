---
schema: 1
id: optimize-product-pages-for-search
kind: prompt
title: Optimise product pages for search
description: Reviews a small online shop's product pages for search, covering copy, titles, variants, stock status, product structured data, images and links, with fixes per page in priority order.
category: seo
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, url]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [product-pages, product-schema, variants, manufacturer-copy, online-shop]
pairs_with:
  prompts: [optimize-category-pages, write-product-description, write-schema-markup, decide-discontinued-product-pages]
args:
  - name: product_pages
    description: For each product page - URL, title tag, H1, description text (say if it is the manufacturer's), variants and how they are set up, stock status, reviews shown, image file names and alt text, and any structured data. Paste as much as you have.
    type: text
    required: true
  - name: platform
    description: Shop platform (for example Shopify, WooCommerce, Squarespace, a custom build), so fixes name the right setting.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Summary, Page by page, Site-wide patterns, Structured data, Priorities]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review product pages for independent online shops. Small shops lose to big retailers on the same product for predictable reasons: they reuse the manufacturer's description that a hundred other sites carry, their titles miss the attributes people search for (model, size, material, colour), every variant gets its own thin URL or none is findable, out-of-stock pages vanish, and structured data is missing or claims reviews the page does not show. A small shop wins with things only it can say: its own photos, fit and use notes, answers to customers' questions. Platform: {{platform}}.
</context>

<task>
<product_pages>
{{product_pages}}
</product_pages>

Check each page against this list, and note only what is wrong or missing:
1. Copy: is it the manufacturer's text? Replace or add at least a substantial own section (about 150 words or more for considered purchases): who it suits, how it fits or performs, what is in the box, care, honest limits, and real customer questions.
2. Title tag and H1: pattern Brand + product + the attribute people search for (model number, size, material) within about 60 characters for the title; H1 can be longer. No repeated store name at the front, no keyword lists.
3. Variants: one page with a variant selector by default; separate pages only for variants people search for by name (a distinct colour or model) with their own copy. Variant URL parameters canonical to the main page unless they are deliberately separate.
4. Stock status: temporarily out of stock pages stay live with a clear status, restock date if known, a notify option and alternatives. Discontinued items need a separate decision (keep, redirect or remove).
5. Structured data (Product with Offer): name, image, description, sku, brand, gtin or mpn where the product has one, price, priceCurrency, availability matching the visible status, and review or aggregateRating only when those reviews are visible on the page and come from customers.
6. Images: several real angles and in-use shots, descriptive file names (oak-side-table-60cm.jpg, not IMG_0042.jpg), alt text describing the product and variant, compressed, main image not lazy-loaded.
7. Internal links: breadcrumb to the category, related and complementary products, links from guides or category copy.
8. Rank fixes by likely effect (pages that already earn impressions or sales first) and effort.
</task>

<constraints>
- Use only what is supplied. Do not invent specifications, reviews, ratings, prices, GTINs or sales figures; mark gaps as [X].
- Rewrites must not claim certifications, materials or performance the shop did not state.
- If the input is only URLs with no page content, say you cannot read them here and ask for the title, copy, variants and stock status of each.
- Name a platform setting only when you are confident it exists on that platform; otherwise describe what to look for.
</constraints>

<output_format>
## Summary
Three to five lines: overall state and the biggest gap.

## Page by page
Per page: a table Element | Now | Change to | Priority (high, medium, low), plus a rewritten title tag and the outline of the own-copy section.

## Site-wide patterns
Bullets: problems that repeat across pages and the template or setting fix.

## Structured data
Fields present, missing or wrong, per page or per template.

## Priorities
Numbered list of the first ten fixes, with effort (minutes, hours, developer).
</output_format>
