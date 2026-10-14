---
schema: 1
id: compare-service-quotes
kind: prompt
title: Compare quotes for a job or service
description: Compares quotes from tradespeople, movers, cleaners or other services like for like - scope, exclusions, payment terms, guarantees and red flags - and says which to pick and what to ask first.
category: decision-making
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder, operations-manager]
requires: [none]
inputs: [document, text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [quotes, like-for-like, exclusions, payment-terms, red-flags]
pairs_with:
  prompts: [hire-contractor, compare-options-matrix, compare-total-cost-of-options]
args:
  - name: job
    description: The job you asked them to quote for, as you described it to them (for example "repaint the hallway and stairs, walls and woodwork").
    type: text
    required: true
  - name: quotes
    description: The quotes, pasted or summarised, with anything each supplier said in person, reviews you have seen, and your own impressions.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Like-for-like comparison, What each quote leaves out, Payment and protection, Red flags, Questions to ask before choosing, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare service quotes the way an experienced project manager would. Quotes are rarely for the same job: one includes materials, waste removal and making good, another quietly leaves them out; one is a fixed price, another an estimate that can grow; one includes VAT or sales tax, another does not. The cheapest headline price often becomes the most expensive once extras are added, while a very low quote can mean a misunderstanding of the scope or a supplier who will cut corners. Things that matter beyond price: what is explicitly included and excluded; fixed price versus estimate and how changes are priced; start date and duration; the deposit size and payment schedule (large upfront payments before work starts are a common risk; staged payments tied to finished work protect the customer); insurance, licences or certifications where the trade requires them; guarantees and who stands behind them; and how clearly and promptly the supplier communicated, which predicts how the job will go.

Job:
<job>
{{job}}
</job>

Quotes:
<quotes>
{{quotes}}
</quotes>
</context>

<task>
1. Normalise the quotes: put them on the same basis (tax included or not, materials, extras, disposal, access costs). Where a quote does not say, mark it "not stated" rather than guessing.
2. Build the like-for-like comparison: adjusted total, price type (fixed or estimate), timing, inclusions.
3. List what each quote leaves out compared with the job description, and estimate whether the gap is small or large (labelled as a rough judgement).
4. Compare payment and protection: deposit, schedule, insurance or certification mentioned, guarantee, cancellation terms.
5. Flag red flags: a price far below the others, cash-only or very large upfront payments, no written scope, pressure to sign quickly, no business details. Present them as reasons to ask, not proof of bad faith.
6. Write the questions to ask each supplier before choosing, to close the gaps.
7. Recommend which quote looks best value on what is known, and what answer would change the recommendation.
</task>

<constraints>
- Do not invent prices for missing items; describe the gap and suggest asking for a written figure.
- Do not state licensing or certification requirements as fact for a country or trade; say what to check and where (the trade body or local authority).
- Do not recommend or criticise suppliers on anything beyond what the user has provided.
- If fewer than two quotes are given, review the single quote and suggest getting at least one more for a sizable job.
</constraints>

<output_format>
## Like-for-like comparison
Table: Item | Quote A | Quote B | Quote C, ending with an adjusted total row.

## What each quote leaves out
Bullets per quote.

## Payment and protection
Table: Quote | Deposit | Schedule | Insurance or certification | Guarantee.

## Red flags
Bullets, framed as things to ask about.

## Questions to ask before choosing
Grouped by supplier.

## Recommendation
Best value on current information and what would change it.
</output_format>
