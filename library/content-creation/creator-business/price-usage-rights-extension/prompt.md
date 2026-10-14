---
schema: 1
id: price-usage-rights-extension
kind: prompt
title: Price a usage rights extension
description: Prices a brand's request to use a creator's content beyond the original deal - more months, paid ads, new channels or regions, perpetual use - with options, terms to put in writing and the reply.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [message, notes]
output: [table, message, checklist]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [usage-rights, content-licensing, paid-usage, perpetual-rights, rights-extension]
pairs_with:
  prompts: [evaluate-whitelisting-request, build-creator-rate-card, review-sponsorship-contract]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: request
    description: "What the brand wants to add: which content, which uses (organic reposts, paid ads, website, email, in-store, TV or out-of-home), how long, which countries, and whether they want to edit it."
    type: text
    required: true
  - name: original
    description: "What the original agreement covered (fee, usage and its end date), your rate card or usage pricing if you have one, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is being added, Value to the brand, Pricing method, Options to offer, Terms to put in writing, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Usage rights decide what a brand can do with a creator's content after it is made, and they are often worth more than the content fee. Organic reposting on the brand's own channels for a short time is the lightest use; paid advertising, longer terms, more regions, offline media (in-store, print, outdoor, TV) and the right to edit or cut the content each add value to the brand and risk to the creator, whose face and voice keep selling a product long after the deal ended. Perpetual or 'in all media worldwide' rights are the most valuable and the hardest to price, and many creators refuse them or price them as a buyout. Common pricing approaches charge per period of paid usage as a share of the original fee, step up for broader media and regions, and quote buyouts as a large multiple; the exact numbers vary widely and should come from the creator's own rates. Terms need dates, media, regions, edit rights and what happens when usage ends.
</context>

<task>
<request>
{{request}}
</request>

<original>
{{original}}
</original>

1. **What is being added:** a table of current rights versus requested rights (media, duration, regions, editing, exclusivity), marking anything vague.
2. **Value to the brand:** in plain words, why the brand wants it and what it is worth to them (paid ads, broader reach), and the risk to the creator (likeness used for longer, edits, association).
3. **Pricing method:** a method using their own rates or placeholders: price per period for paid usage, uplifts for extra media and regions, and a separate buyout figure for perpetual use. Show arithmetic and label assumptions.
4. **Options to offer:** two or three packages (for example 3 months paid social, 6 months paid social plus website, buyout), each with price and limits.
5. **Terms to put in writing:** start and end dates, media, regions, edit and approval rights, takedown at the end, renewal pricing, and no new claims added under the creator's name.
6. **Reply:** a short reply with the options and a deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not present market rates or multiples as fact; show the method and use their numbers.
- Do not advise accepting perpetual rights without a price and a clear note of the trade-off.
- Mark contract wording questions for a lawyer when the deal is significant.
- Use the original agreement terms they give; do not assume what it said.
</constraints>

<output_format>
## What is being added
Table: right | original | requested.

## Value to the brand
## Pricing method
## Options to offer
Table: option | scope | price.

## Terms to put in writing
Checkbox list.

## Reply
</output_format>
