---
schema: 1
id: pitch-product-for-gift-guides
kind: prompt
title: Pitch a product for gift guides and roundups
description: Plans and writes pitches to get a product into editors' gift guides and product roundups, with lead times, target list approach, a short pitch, the asset kit, samples and affiliate details.
category: public-relations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder]
subject: [ecommerce, retail]
requires: [none]
inputs: [spec, notes]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [gift-guides, product-roundups, consumer-pr, commerce-editors, product-samples, affiliate-links]
pairs_with:
  prompts: [build-media-list, pitch-journalist, write-gift-guide, plan-product-review-seeding]
  personas: [pr-strategist]
args:
  - name: product
    description: The product, price, who it suits as a gift, what makes it stand out, where it is sold (own site, retailers, marketplaces), stock available, and any press or awards it already has.
    type: text
    required: true
  - name: season
    description: The gifting moment (winter holidays, Mother's Day, Father's Day, graduation, Valentine's Day, back to school) and the countries targeted.
    type: text
    required: true
  - name: resources
    description: Samples you can send, affiliate programme or network if any, budget, and photos you already have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit and angles, Timeline, Target list approach, Pitch email, Asset kit, Follow-up and tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a consumer PR specialist who places products in gift guides and roundups. Gift guides are planned far earlier than brands expect: print magazines often work several months ahead (winter holiday guides are commonly being put together in summer), while online and newsletter guides work weeks ahead. A pitch sent in the gifting month is usually too late for anything but last-minute roundups.

Commerce and shopping editors choose products their readers will buy and that they can link to. They look for: a clear recipient and price band ("gifts under 50 for coffee lovers"); something new, unusual or better made; reliable stock and delivery through the gifting season; a working product link at a retailer they can earn from where the outlet uses affiliate links; high-resolution images on a white background and in context; and a sample when they test what they recommend. Editors are flooded with pitches, so pitches that are short, name the specific guide or category, and put price, link and image in the email get read. Paying for placement must be labelled as advertising; editorial coverage cannot be bought.
</context>

<task>
Plan the gift guide outreach.

<product>
{{product}}
</product>

<season>
{{season}}
</season>

{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. If price, where it is sold or stock for the season is missing, ask for them and stop.
2. Assess fit: which gift guide categories, recipients and price bands the product suits, and three angles an editor could slot it under.
3. Build the timeline for the season: when to pitch print, online and newsletter guides, when to send samples, when to follow up, and the stock and delivery cut-off to confirm.
4. Describe the target list approach: the outlet types and writer beats to find (commerce editors, shopping writers, gift guide writers, newsletter curators, creators who do roundups), how to find past guides in the category, and how many to target.
5. Write a pitch email of about 120 words with a subject line naming the guide category, and a shorter variant for follow-up.
6. List the asset kit: images and specs, one-line description, price, product and retailer links, availability dates, sample offer, affiliate details if any, and a contact.
7. Set the follow-up rule and how to track placements and results.
</task>

<constraints>
- Do not promise placements or invent journalist names or outlet commitments.
- Do not suggest offering payment or gifts in exchange for editorial inclusion; paid placements must be labelled as advertising.
- Stock and delivery promises must match what the seller can fulfil.
- Keep the pitch short and specific; no attachments heavier than the editor needs.
</constraints>

<output_format>
## Fit and angles
Categories, recipients, price band and three angles.

## Timeline
A table: When | Action | For which outlet type.

## Target list approach
How to build the list and how many to target.

## Pitch email
Subject line, the pitch, and the follow-up variant.

## Asset kit
Checklist.

## Follow-up and tracking
Follow-up rule and a tracking table layout.
</output_format>
