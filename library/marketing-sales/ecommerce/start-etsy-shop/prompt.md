---
schema: 1
id: start-etsy-shop
kind: prompt
title: Start an Etsy shop
description: Plans opening an Etsy shop - what to sell, prices that survive Etsy's fees, shop setup, listing photos, titles and tags, shipping profiles and the first 20 listings.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, artist, individual]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [etsy, handmade, craft-business, marketplace-fees, product-pricing, shop-launch]
pairs_with:
  prompts: [write-marketplace-listing, price-products-for-online-store, diagnose-marketplace-listing-ranking, plan-marketplace-ads]
args:
  - name: products
    description: What you make or sell (handmade, vintage, craft supplies, digital downloads), materials and time per item, how many you can make a week, and a few example items.
    type: text
    required: true
  - name: costs
    description: Materials and packaging per item, postage costs you know, what you would like to earn per hour, and any prices you have in mind.
    type: text
    required: true
  - name: country
    description: Your country and where you plan to ship. Fees, taxes, payment and shipping options differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Is it a fit, Price check after fees, Shop setup, Listings that get found, Shipping profiles, First 20 listings plan, First 90 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a maker or small seller open an Etsy shop that makes money rather than just sales. Etsy suits handmade, vintage, craft supplies and digital items; buyers search with specific, long phrases ("personalised dog name necklace"), so titles, tags, attributes and the first photo decide whether a listing is seen and clicked. New sellers lose money mainly through pricing: Etsy charges several fees (listing fee per item and renewal, a transaction fee on the item price and shipping, payment processing, sometimes currency conversion and a fee on sales from Etsy's offsite ads), and these change over time, so the price must cover materials, packaging, labour, fees, postage and a profit, with room for occasional sales. Other common mistakes: too few listings for search to find the shop (sellers often start with 20 or more so each tag set covers different searches), no shipping profiles or underestimated postage, slow processing times, ignoring policies and the "About" section, copying popular designs (which risks intellectual property takedowns), and mixing personal and business money without tracking tax. Fees, rules and tax treatment must be checked on Etsy's current seller pages and with local tax guidance.

Location: {{country}}

<products>
{{products}}
</products>

<costs>
{{costs}}
</costs>
</context>

<task>
1. Assess fit: whether the products are allowed and suit Etsy, whether to sell made-to-order or ready stock, and any product rules to check (personalised items, cosmetics or food, children's products safety, digital file rights, trademarked characters). Mark rules "[check current Etsy policy]".
2. Build a price check for two or three example items: materials, packaging, labour at the user's hourly rate, each fee as a formula with the current rate to fill in from Etsy's fee page, postage, and profit; show the minimum price and a suggested price, and flag any item that loses money.
3. List shop setup steps: shop name (with a quick trademark search), banner and logo, About section, policies (returns, processing times), payment and bank details, tax and business registration to check locally, and a separate account for business money.
4. Explain listings that get found: titles that lead with what the buyer types, all available tags used on distinct phrases, attributes filled in, ten photos with the first on a clean background and others showing scale and detail, video if possible, and descriptions that answer size, materials, care and personalisation.
5. Set up shipping profiles: weights and packaging, domestic and international choices, processing times the user can meet, and whether free shipping thresholds make sense, as items to check.
6. Plan the first 20 listings: variations of the best products across different search phrases, with a table of item, main search phrase and price.
7. Give a first-90-days plan: listing cadence, reviews from the first buyers, when to test Etsy Ads with a small budget, using stats to fix listings with views but no sales, and seasonal dates to prepare for.
</task>

<constraints>
- Do not state Etsy fee rates, ad fee rates or policies as fact; give formulas and tell the user to fill in current rates from Etsy's seller fee pages.
- Never suggest copying another seller's designs or using trademarked characters and brands without a licence.
- Do not invent search volumes or sales estimates.
- Tax and registration: describe what to check locally; do not give tax advice.
</constraints>

<output_format>
## Is it a fit
Bullets.

## Price check after fees
Table per item: Line | Amount or formula. Then minimum and suggested price.

## Shop setup
Checklist.

## Listings that get found
Bullets with a title and tag example for one item.

## Shipping profiles
Bullets.

## First 20 listings plan
Table: # | Item or variation | Main search phrase | Price.

## First 90 days
Week-by-week or month-by-month bullets.
</output_format>
