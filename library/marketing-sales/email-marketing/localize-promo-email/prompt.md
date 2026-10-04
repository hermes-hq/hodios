---
schema: 1
id: localize-promo-email
kind: prompt
title: Localise a promotional email
description: Adapts a promotional email for another country or language community - offer fit, currency, formats, holidays, tone and footer items to check - instead of translating it word for word.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build, review]
role: [marketer, copywriter, founder]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [rewrite, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [localisation, transcreation, cross-border-selling, currency-formats, cultural-fit]
pairs_with:
  prompts: [write-promo-email, post-edit-machine-translation, check-email-marketing-compliance]
args:
  - name: email
    description: The original email - subject, preheader, body, offer terms, prices, dates, footer - and the country it was written for.
    type: text
    required: true
  - name: target_market
    description: The country or community it is for, for example "Germany", "Quebec", "Mexico", "Turkish-speaking customers in the Netherlands".
    type: string
    required: true
  - name: language
    description: The language to write in if not the main language of the market, or if the market has several (for example French or Dutch for Belgium). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Market fit, Localised email, Changes made, Footer and legal items to check, Native review notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You adapt a promotional email so it works for customers in another market, the way a transcreator would. A word-for-word translation of a good email usually makes a poor one: the offer may make no sense there (a holiday nobody celebrates, free shipping that is standard anyway), prices converted at today's rate look odd, dates and sizes confuse, the tone misses (informal "you" where formal is expected, or the reverse), and the footer lacks items the market expects. Pricing and promotion rules also differ, for example in the EU a "was" price for a discount generally has to be the lowest price of the previous 30 days.

Target market: {{target_market}}
{{#language}}Language: {{language}}{{/language}}
</context>

<task>
<email>
{{email}}
</email>

1. **Market fit:** check whether the offer, occasion and promise make sense in the target market (holiday timing, shopping seasons, delivery times and costs from where the shop ships, return expectations, payment methods customers expect). Say what to keep, adapt or drop.
2. **Localise the email:** write the subject line (two options), preheader and body in the target language, adapting rather than translating: currency with a set local price rather than a converted one (use [LOCAL PRICE] if not supplied), date and time formats, decimal and thousands separators, size and measurement units, formal or informal address, idioms and humour, and examples that fit local life.
3. **Changes made:** list every meaningful change and why, so the marketer can approve it.
4. **Footer and legal items to check:** for example sender identity and postal address, company or imprint details where expected, unsubscribe wording, price display (tax included or not), reference-price rules for discounts, and consent requirements for the market. Present these as items to confirm, not legal conclusions.
5. **Native review notes:** phrases where nuance matters, words with risky double meanings, and anything a native speaker must check before sending.
</task>

<constraints>
- Do not change the offer's substance (discount size, end date, eligibility) without flagging it as a recommendation; never silently alter terms.
- Do not invent local prices, delivery times, holidays dates or legal requirements; mark them [CHECK: ...] when unsure.
- If you are not confident writing natural copy in the target language, say so and recommend a native copywriter rather than presenting the text as final.
- If the original email or target market is missing, ask and stop.
</constraints>

<output_format>
## Market fit
Table: Element | Original | Recommendation (keep, adapt, drop) | Reason.

## Localised email
Subject options, preheader, body and call to action, ready to paste.

## Changes made
Bullets: change and reason.

## Footer and legal items to check
Checklist.

## Native review notes
Bullets with the phrase and the concern.
</output_format>
