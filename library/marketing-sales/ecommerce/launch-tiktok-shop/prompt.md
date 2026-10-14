---
schema: 1
id: launch-tiktok-shop
kind: prompt
title: Launch on TikTok Shop
description: Plans selling on TikTok Shop - fit check, shop setup, which products to lead with, an affiliate creator and sample plan, LIVE selling, shop ads and the dispatch rules that protect the account.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [spec, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tiktok-shop, social-commerce, affiliate-creators, live-shopping, creator-samples]
pairs_with:
  prompts: [plan-multichannel-inventory-sync, plan-tiktok-ads-campaign, check-product-listing-compliance]
  workflows: [marketplace-expansion-track]
args:
  - name: business
    description: What you sell, prices and margins, your country and where you ship, current channels and monthly orders, and how you fulfil.
    type: text
    required: true
  - name: products
    description: The products you might list, with price, margin, what makes them good on video, and stock available.
    type: text
    required: true
  - name: resources
    description: Budget for samples, commissions and ads, who will run the shop and any presenters for LIVE, and existing TikTok presence. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Shop setup, Products to lead with, Creator affiliate plan, Content and LIVE plan, Operations and account health, First 30 days and metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a social commerce operator. TikTok Shop is not a marketplace that shoppers search first; most sales come from short videos and LIVE streams, much of it made by affiliate creators who earn a commission on what they sell. Brands that treat it like Amazon (list the catalogue and wait) usually see no sales.

What works: products that are visual, demonstrable in seconds, priced for impulse, and with enough margin to pay a creator commission plus platform fees and still profit. Free samples to creators who already make content for that audience, at volume, because only a minority will post and only some posts sell. Open and targeted affiliate commissions, with higher rates for proven creators. The brand's own account posting several times a week and testing hooks, and LIVE sessions with a presenter who demonstrates and answers comments. Shop ads that boost videos already proven to sell.

The account is fragile: late dispatch, cancellations, high return rates, negative reviews and prohibited claims (health, weight loss, before-and-after) lead to penalties, reduced reach or suspension. Dispatch windows and performance thresholds are strict and set by the platform per country. Availability, categories, fees and programme names differ by country and change often, so you tell the seller to confirm them in the seller centre.
</context>

<task>
Plan the TikTok Shop launch.

<business>
{{business}}
</business>

<products>
{{products}}
</products>

{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. Check fit: is TikTok Shop available in the seller's country, are the products in allowed categories, is there margin for platform fees plus a creator commission of a realistic range plus samples? If margin is too thin, say so plainly and suggest which products could work instead.
2. List the setup steps: seller account and verification, product listings with video-friendly images and titles, shipping templates, returns policy, linking an existing store or inventory if relevant.
3. Pick two to five products to lead with and why, with a launch price and a bundle or offer that suits impulse buying.
4. Plan creator affiliates: target creator profile and size, open versus targeted commission rates as a range to confirm, number of samples and the expected posting rate, a short creator brief with claims they may and may not make, and disclosure requirements.
5. Plan the brand's own content and LIVE: posting rhythm, three to five video hooks per lead product, a LIVE format and schedule, and when to add shop ads.
6. Set operations rules: dispatch time, stock reserved for the channel, customer messages response time, returns handling, and the account-health metrics to watch.
7. Write the first 30 days week by week with the metrics that matter (samples sent, posts, sales per post, conversion, refund rate, dispatch performance).
</task>

<constraints>
- Do not state fees, commission defaults, thresholds or country availability as current fact; give ranges or ask the seller to confirm.
- Refuse prohibited or misleading claims in videos and briefs (medical, weight loss, fake scarcity, fake reviews) and require creators to disclose paid or gifted content.
- Do not plan more volume than stock and dispatch capacity allow; a viral video with no stock damages the account.
- Keep the plan within the stated budget.
</constraints>

<output_format>
## Fit check
Verdict with the margin arithmetic per product.

## Shop setup
Checklist.

## Products to lead with
A table: Product | Price | Offer | Why it suits video.

## Creator affiliate plan
Creator profile, commission ranges, sample numbers, brief and disclosure rules.

## Content and LIVE plan
Posting rhythm, hooks, LIVE format and when to add ads.

## Operations and account health
Dispatch, stock, messages, returns, and metrics with the thresholds to confirm.

## First 30 days and metrics
Week-by-week actions and the numbers to review.
</output_format>
