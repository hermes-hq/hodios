---
schema: 1
id: explain-warranty-terms
kind: prompt
title: Explain what a warranty covers
description: Explains a product or service warranty - what it covers and excludes, how long, what you must do to claim and what voids it - and notes where statutory consumer rights may give more.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [document]
output: [explanation, checklist]
advice_risk: [legal]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [guarantee, consumer-rights, exclusions, making-a-claim, fine-print]
pairs_with:
  prompts: [decide-on-extended-warranty, summarize-what-applies-to-me, interrogate-a-document]
args:
  - name: warranty
    description: The warranty or guarantee text from the box, manual, receipt or website, in full.
    type: text
    required: true
  - name: situation
    description: Optional - your purchase and problem (for example "bought 14 months ago, screen flickers", "want to know before I buy"), and your country.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [In short, What is covered, What is not covered, How to claim, What could void it, Your rights beyond this warranty, Questions to ask the seller or maker]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain a manufacturer's or seller's warranty in plain words. A warranty is a voluntary promise on top of whatever rights the law gives consumers, and in many countries those rights, which run against the seller rather than the maker, can last longer or cover more than the warranty does. Warranties are often narrower than they look: "parts only" means the buyer pays labour, "repair or replace at our discretion" rules out refunds, cover may drop after year one, and conditions like registration within 28 days, use of authorised servicing, keeping the receipt, or no commercial use can quietly void the cover. You read the whole text for these conditions and say what the buyer must do to keep and use their cover.

<warranty>
{{warranty}}
</warranty>

{{#situation}}Buyer's situation: {{situation}}{{/situation}}
</context>

<task>
1. Say in two or three sentences who gives the warranty, for how long, and what it promises (repair, replace, refund; parts, labour, call-out).
2. List what is covered, quoting the key wording.
3. List what is excluded: wear parts, accidental damage, cosmetic damage, misuse, commercial use, consumables, and anything else in the text.
4. Set out how to claim: who to contact, proof needed, time limits, who pays shipping or call-out.
5. List the conditions that could void the cover (registration, servicing, unauthorised repair, modifications, moving country).
6. If a situation is given, say whether it appears to fall inside the stated cover and terms, with the clause, and what is unclear.
7. Note that statutory consumer rights may apply in addition, depending on the country, and suggest where to check (a national consumer body); do not state those rights as certain unless the warranty text itself states them.
8. Draft questions to ask the seller or manufacturer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain the text; do not invent cover, time limits or exclusions it does not contain.
- Do not state specific statutory periods or rights as fact; consumer law differs by country. Say what to check and with whom.
- Do not predict whether a claim will succeed.
- Quote the clauses you rely on.
</constraints>

<output_format>
## In short
Two or three sentences.

## What is covered
Bullets with quotes.

## What is not covered
Bullets with quotes.

## How to claim
Numbered steps.

## What could void it
Bullets.

## Your rights beyond this warranty
Two or three sentences on what to check locally.

## Questions to ask the seller or maker
Numbered.
</output_format>
