---
schema: 1
id: write-gift-guide
kind: prompt
title: Write a gift guide
description: Writes a shop's seasonal gift guide by recipient and budget, with short reasons to buy from real product details, delivery cutoffs, and versions for the website, an email and an in-store card.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [retail, ecommerce]
requires: [none]
inputs: [text, dataset]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gift-guide, seasonal-campaign, merchandising, independent-shop]
pairs_with:
  prompts: [write-product-description, write-promo-email, plan-promotional-offer, write-shelf-talkers]
args:
  - name: products
    description: The products to feature - name, price, a line or two on what makes each special, stock level, and any gift-friendly details (wrapping, personalisation, gift cards). A pasted product list or spreadsheet rows are fine.
    type: text
    required: true
  - name: occasion
    description: The occasion and dates (for example "Christmas 2026, last UK delivery 18 Dec", "Mother's Day", "Lunar New Year", "Eid").
    type: string
    required: true
  - name: budget_bands
    description: Price bands to group by, in your currency (for example "under 15, 15-40, 40 and up"). Optional; bands are proposed from the price list otherwise.
    type: string
output_contract:
  format: markdown
  sections: [Guide plan, Website guide, Email version, In-store card, Dates and stock notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write gift guides for independent shops, makers, bookshops and delis. Gift buyers are shopping for someone else, often in a hurry and unsure, so a guide sells by removing doubt: who it suits, why they will love it, what it costs and whether it arrives in time. Weak guides are catalogues in a new order, sort people by stereotypes ("for him", "for her"), feature items that sell out on day two, and forget delivery cutoffs, which are the real deadline for online buyers.

Occasion: {{occasion}}
{{#budget_bands}}Budget bands: {{budget_bands}}{{/budget_bands}}
</context>

<task>
<products>
{{products}}
</products>

1. If there are no prices or no product details to write reasons from, ask for them and stop.
2. Plan the guide: four to six recipient sections based on interests and situations ("the one who cooks", "new parents", "the impossible-to-buy-for", "secret Santa"), each with three to six picks spread across the budget bands. If no bands are given, propose three from the price list. Leave out or downplay items marked low stock, and include a fallback for late buyers (gift cards, in-store collection, digital gifts) if the shop offers one.
3. For each pick, write a reason to buy of at most 25 words from the supplied details: what it is, why this recipient will like it, and one concrete detail (origin, maker, material, taste). Add price and any gift-friendly note.
4. Website guide: a short intro, sections with picks, and a dates box near the top.
5. Email version: subject line options, a preheader, and a shortened guide with one pick per section and a link per section.
6. In-store card: a printable card or poster with the sections and one or two picks each, sized for a counter or shelf, and a line pointing to wrapping or gift help at the till.
7. List delivery and collection cutoffs from the input. If no dates are given, mark them [date] and say they must be set before publishing.
</task>

<constraints>
- Use only supplied product facts and prices. No invented awards, reviews, ingredients or origins; mark gaps as [X].
- No gender stereotypes or age jokes in section names or reasons.
- For food and drink, do not claim allergen-free, vegan or health benefits unless the input says so; for alcohol, keep it to adult recipients and add any age-check note the shop uses.
- Do not invent delivery dates, shipping prices or courier names.
- Respect the occasion: write for those who celebrate it without assuming everyone does or that it is joyful for everyone.
</constraints>

<output_format>
## Guide plan
Table: Section | Picks | Price range | Notes.

## Website guide
Intro, dates box, then each section with picks (name, price, reason, gift note).

## Email version
Three subject lines, a preheader, and the short guide.

## In-store card
The card text laid out by section, under 120 words.

## Dates and stock notes
Bullets: cutoffs, low-stock items left out or flagged, and [X] items to confirm.
</output_format>
