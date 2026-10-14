---
schema: 1
id: recommend-price-reduction
kind: prompt
title: Recommend a price reduction to a seller
description: Builds an estate agent's evidence-based case for reducing an asking price, or for holding it, with the size of cut that changes buyer behaviour and a call script for the seller conversation.
category: real-estate
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep]
subject: [real-estate]
requires: [none]
inputs: [dataset, notes]
output: [report, script, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [estate-agent, asking-price, seller-communication, home-selling, portal-data]
pairs_with:
  prompts: [summarize-viewing-feedback-for-seller, analyze-property-comparables, write-real-estate-market-update]
  personas: [real-estate-agent]
  workflows: [property-sale-track]
args:
  - name: listing
    description: Asking price, date listed, any previous reductions, portal views and saves over time, enquiries, viewings, second viewings, offers and feedback themes.
    type: text
    required: true
  - name: market
    description: Competing listings and recent sales nearby with prices, sizes and days on market, plus any change in the market since launch.
    type: text
    required: true
  - name: seller
    description: The seller's situation - why selling, deadline, onward purchase, lowest acceptable price if known, and how they reacted to pricing advice before. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Hold or reduce, Size of the change, Seller conversation, Follow-up message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an agent tell a seller the truth about price. The funnel tells you where the problem is. Low views mean the price or the listing fails online and buyers searching in the right band never see it; many views but few viewings mean the photos, description or price-to-presentation ratio is wrong; many viewings and no offers mean buyers see it and judge it overpriced against what else they saw. Buyers search in price bands, so a reduction that does not move the price into a lower common search band often changes little, and small repeated cuts make a listing look stale. A single, meaningful, well-timed change usually does more than three small ones. Sometimes the honest advice is to hold, because the market is seasonal or the marketing itself is the problem.

<listing>
{{listing}}
</listing>

<market>
{{market}}
</market>
{{#seller}}

<seller>
{{seller}}
</seller>
{{/seller}}
</context>

<task>
1. Diagnose where the funnel breaks (views, viewings, offers) using the figures given, and compare the listing with competing stock and recent sales.
2. Decide: hold, fix the marketing first, or reduce. Give the reason in two or three sentences.
3. If reducing, recommend one figure: show the price bands buyers commonly search in, where the new price lands, how it compares with the evidence, and what the seller would net versus waiting another month (state the assumptions). Mention that a lower price can also bring competing offers.
4. Write a call script for the seller conversation: open with the activity facts, show the evidence, make the recommendation, handle the three most likely objections (we will lose money, the last agent said more, let us wait), and agree a next review date.
5. Write a short follow-up message confirming what was agreed.
</task>

<constraints>
- Use only the figures given. Do not invent viewings, feedback, offers, sales or market statistics.
- Do not overstate risk to scare the seller into a cut, and do not recommend a reduction to win a quick sale if the evidence supports holding.
- If the evidence is too thin to justify any recommendation, say what data to collect and by when.
- Keep the script conversational, under 350 words.
</constraints>

<output_format>
## Diagnosis
Funnel figures and the weak point.

## Hold or reduce
The recommendation and reason.

## Size of the change
The figure, the search-band logic, the comparison with evidence.

## Seller conversation
Script with objection handling.

## Follow-up message
Under 120 words.
</output_format>
