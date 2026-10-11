---
schema: 1
id: plan-dynamic-product-ads
kind: prompt
title: Plan dynamic product ads
description: Sets up catalogue-based dynamic product ads on social platforms with feed and event checks, product sets, retargeting and broad audiences, creative templates and exclusions.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer, consultant]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [catalog-ads, product-feed, product-sets, dynamic-retargeting, advantage-plus, merchandising]
pairs_with:
  prompts: [optimize-shopping-feed, define-ad-audiences, write-retargeting-ad-sequence, calculate-break-even-roas]
  personas: [paid-media-specialist]
  workflows: [ad-campaign-launch-track]
args:
  - name: store
    description: What you sell, number of products, price range, margins by category if known, store platform, and countries.
    type: text
    required: true
  - name: platform
    description: Where the ads will run, for example Meta, TikTok, Pinterest or Snapchat.
    type: string
    required: true
  - name: catalog_status
    description: Whether a catalogue is connected, how it syncs, feed errors, and whether pixel events send product IDs that match the catalogue.
    type: text
  - name: goal_and_budget
    description: Target ROAS or cost per purchase, and the monthly budget for catalogue ads.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Readiness checks, Product sets, Campaigns and audiences, Creative templates, Exclusions and frequency, What to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs an online shop and wants catalogue (dynamic product) ads that show each person products from the feed, either products they viewed or products the platform predicts they will want. These ads fail quietly for technical reasons more than creative ones. What experts know: the product IDs in pixel and server events must match the catalogue IDs exactly, or retargeting shows the wrong items or nothing; price and stock must sync often enough that ads never promote sold-out items or old prices; product sets should be built around business logic (best-sellers, high margin, in stock, price bands, new arrivals) rather than every item; showing the product someone viewed works for retargeting, but catalogue ads to broad audiences can also prospect well when the catalogue is large; plain white-background product images look like ads, so frames, overlays with price or offer and lifestyle images help; and recent purchasers must be excluded or shown complementary items instead.
</context>

<task>
Store: {{store}}
Platform: {{platform}}
{{#catalog_status}}Catalogue status: {{catalog_status}}{{/catalog_status}}
Goal and budget: {{goal_and_budget}}

1. Readiness checks: list what must be true before launch (catalogue connected and syncing, error-free core fields, product ID match between events and catalogue, view content, add to cart and purchase events with IDs, price and availability updates) and how to verify each in the platform's diagnostics. If the status is unknown, put these first.
2. Product sets: propose 3 to 6 sets with the filter rule for each (category, margin label, price band, in stock, new, best-seller) and which campaign uses it.
3. Campaigns and audiences: a retargeting campaign split by intent stage if volume allows (viewed, added to cart, started checkout) with lookback windows, a broad prospecting catalogue campaign if the catalogue and budget support it, and a cross-sell set for past buyers. Give budget split and optimisation event.
4. Creative templates: frame or overlay ideas, which fields to show (price, discount, rating, free shipping), mixing catalogue and lifestyle or video, and primary text variants by stage.
5. Exclusions and frequency: purchasers by window, out-of-stock items, low-margin or returned-heavy items, and frequency to watch.
6. What to watch: metrics per set and campaign, signs of feed or ID mismatch (low match rate, irrelevant products shown), and decision rules.
</task>

<constraints>
- Do not state catalogue field requirements, image specs or match-rate thresholds as fact; tell the user to confirm in the platform's current commerce or catalogue documentation.
- Do not invent ROAS or conversion rates; use the user's targets.
- Do not recommend retargeting messages that reveal sensitive browsing (health, intimate or financial products) in a way the viewer would find intrusive; flag such categories.
</constraints>

<output_format>
## Readiness checks
Checklist with how to verify each item.

## Product sets
A table: Set | Filter rule | Size estimate | Used in.

## Campaigns and audiences
A table: Campaign | Audience and window | Product set | Optimisation event | Budget share.

## Creative templates
Bullets per campaign, with example primary text.

## Exclusions and frequency
Checklist.

## What to watch
Metrics, warning signs and decision rules.
</output_format>
