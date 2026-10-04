---
schema: 1
id: prioritize-market-expansion
kind: prompt
title: Prioritise the next market to enter
description: Scores candidate countries, regions or segments on demand evidence, competition, localisation and regulatory effort, channel access and fit, then recommends a sequence and an entry test.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [market-entry, localisation-effort, expansion-sequence, entry-test, market-scoring]
pairs_with:
  prompts: [write-product-strategy, design-validation-experiment, set-kill-criteria]
args:
  - name: product_and_current_markets
    description: The product, where and to whom you sell today, what makes you win there, team size, and anything already localised (languages, currencies, payment methods).
    type: text
    required: true
  - name: candidate_markets
    description: The countries, regions or customer segments under consideration, with any evidence for each (inbound sign-ups, traffic, waitlist, partner interest, competitor presence, known rules).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Scoring, Cost to adapt, Recommended sequence, Entry test for the first market, Unknowns to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product teams and small exporters choose where to grow next. The usual mistake is to rank markets by size and then discover the cost of adapting the product: languages, currencies, local payment methods, tax registration, data protection rules, product certification, support hours, and channels that work differently. A smaller market that needs almost no product change and already sends inbound demand often beats a big one that needs six months of rework. A good answer scores attractiveness and cost to enter separately, recommends a sequence, and proposes a cheap test with a pass mark before committing.
</context>

<task>
Product and current markets:

<product>
{{product_and_current_markets}}
</product>

Candidate markets:

<candidates>
{{candidate_markets}}
</candidates>

1. Score attractiveness per candidate, 1-5, on: demand evidence (what the user actually has, weighted above estimates), competition and how you would win, ability to pay, and channel access (can you reach buyers with your current go-to-market).
2. Score cost to enter, 1-5 (5 = hardest), on: product localisation (language, units, formats, payment methods, integrations), regulatory and compliance effort (data protection, product rules, licences, tax registration) named as areas to check rather than stated rules, operations (support language and hours, logistics, returns), and team or partner needed.
3. Show both scores side by side with weights and arithmetic. Plot each candidate as attractive and cheap, attractive and costly, cheap but small, or avoid for now.
4. Recommend a sequence for the next one to three markets, with what the first one teaches you for the next.
5. Design an entry test for the first market: the cheapest credible test (localised landing page with paid traffic, a marketplace listing, a distributor or partner pilot, a few hand-served customers), its duration, budget range to set, the pass mark set in advance, and the kill criterion.
6. List the unknowns that could change the ranking and how to resolve each cheaply.
</task>

<constraints>
- Use only the evidence given. Do not invent market sizes, competitor names, prices or regulations; where an estimate would help, say what source to check.
- Every regulatory or tax item is "check with a local adviser or the relevant authority", never a statement of the law.
- Keep demand evidence and opinion separate: label each score's basis (evidence, estimate, unknown).
- If fewer than two candidates are given, say what a comparison needs and offer to score the one against staying focused on current markets.
</constraints>

<output_format>
## Summary
Three to five sentences: recommended first market, why, and the test.

## Scoring
Table: market | demand | competition | ability to pay | channel access | attractiveness total | localisation | regulatory | operations | team | cost total | basis.

## Cost to adapt
Bullets per market: the specific product and operational changes needed.

## Recommended sequence
Numbered list with reasoning.

## Entry test for the first market
Test, duration, budget to set, pass mark, kill criterion, decision date.

## Unknowns to check
Table: unknown | why it matters | cheapest way to find out.
</output_format>
