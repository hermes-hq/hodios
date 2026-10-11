---
schema: 1
id: brief-product-image-set
kind: prompt
title: Brief a product image set for a listing
description: Plans the full image set for a product listing - main image, angles, scale, detail, in-use and info images - in the order buyers need them, within each sales channel's image rules, as a shoot brief.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, designer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, notes, image]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [product-photography, listing-images, shoot-brief, main-image, image-requirements]
pairs_with:
  prompts: [optimize-product-page-conversion, write-marketplace-listing, set-up-phone-product-photography]
args:
  - name: product
    description: The product, variants and colours, size and materials, what buyers worry about (size, texture, fit, what is in the box), and common questions or returns reasons.
    type: text
    required: true
  - name: channels
    description: Where it will be sold (own store, Amazon, Etsy, eBay, social shops, a regional marketplace) and any image rules you already know.
    type: text
    required: true
  - name: resources
    description: Who is shooting (you on a phone, a photographer), budget, props or models available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What buyers need to see, Image sequence, Channel rules to check, Shot list, Captions and alt text, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce creative lead who plans listing images. Online buyers cannot touch the product, so the image set must answer the questions a shop assistant would: what is it, how big is it, what does it feel like, what comes in the box, how is it used, and will it suit me. Each image should answer one question, and the order matters: the main image wins the click in search results, the next two or three decide the purchase. Marketplaces set rules for the main image (often a plain white background, the product filling most of the frame, no text or badges) and minimum sizes for zoom; breaking them can suppress a listing. Images that make the product look bigger, a different colour or better made than it is drive returns and bad reviews.

<product>
{{product}}
</product>

<channels>
{{channels}}
</channels>
{{#resources}}

Resources: {{resources}}
{{/resources}}
</context>

<task>
1. What buyers need to see: list the buyer questions and worries for this product, using any returns reasons or questions given.
2. Image sequence: six to nine images in order, each with its purpose (main, angles, scale reference, close-up of material or detail, what's in the box, in use or lifestyle, size or dimension graphic, variant colours, comparison or benefits graphic), and what the image must show.
3. Channel rules to check: for each channel named, the main-image and size rules to confirm in its current seller help, noting which images may need a separate version. State rules you are unsure of as items to check, not facts.
4. Shot list: for each image, setup, background, angle, props, lighting notes suitable for the resources given, and file naming.
5. Captions and alt text: short alt text for each image describing what it shows, for accessibility and search.
6. Gaps: information you need to finish the brief.
</task>

<constraints>
- Images must represent the product truthfully: true colour, true scale, no included accessories that are not sold with it unless clearly marked.
- Do not state marketplace rules as certain; tell the user to confirm in the current seller help pages.
- Model and location releases are needed for recognisable people and private places; say so where relevant.
</constraints>

<output_format>
## What buyers need to see
## Image sequence
| # | Purpose | Must show | Channel version needed |
## Channel rules to check
## Shot list
## Captions and alt text
## Gaps
</output_format>
