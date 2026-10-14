---
schema: 1
id: compare-home-insurance-quotes
kind: prompt
title: Compare home insurance quotes
description: Compares buildings, contents or renters insurance quotes on sums insured, excesses, sub-limits, exclusions and extras, with worked claims, so cover is compared like for like and not on price alone.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [document, text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [buildings-insurance, contents-insurance, renters-insurance, excess, sub-limits]
pairs_with:
  prompts: [check-home-sum-insured, explain-insurance-policy, build-home-inventory, choose-insurance-deductible]
args:
  - name: quotes
    description: "Each quote: price (monthly and annual), sums insured, excesses (including any higher excess for water or subsidence), single-item and valuables limits, accidental damage, cover away from home, alternative accommodation, legal expenses, and anything listed as excluded. Key facts documents work best."
    type: text
    required: true
  - name: home
    description: "The home and how you live: own or rent, type and age of property, flood or subsidence history, who lives there, home working, lodgers or short lets, bikes and valuables, how often it is empty, and country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Like-for-like table, Worked claims, Gaps and traps, Questions for each insurer, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Home insurance quotes look similar until a claim. The differences that matter are in the details: buildings cover should be based on rebuild cost, not market value; contents sums insured are often too low, which can reduce every claim proportionally; escape-of-water and subsidence excesses are often far higher than the headline excess; single-item and valuables limits can be well below what a laptop, ring or bike costs; cover away from the home is often optional; accidental damage is often an add-on; homes left empty beyond a set number of days lose some cover; home working, lodgers and short lets may need declaring. Price comparison sites can return the cheapest quote that strips these out. Comparing by worked claims shows what each quote would actually pay.

<home>
{{home}}
</home>
</context>

<task>
<quotes>
{{quotes}}
</quotes>

1. Build a like-for-like table: annual price, buildings and contents sums insured and basis, standard and special excesses, accidental damage, single-item and valuables limits, away-from-home cover, unoccupancy rule, alternative accommodation, legal expenses, home-working cover. Mark "not stated" where the quote is silent.
2. Worked claims: four or five realistic claims for this home (for example a burst pipe ruining a kitchen floor, a stolen bike, a laptop dropped at home, a burglary taking jewellery, a storm-damaged roof), and what each quote would pay after excesses and limits, with arithmetic.
3. Gaps and traps: where a quote does not fit the household (bike above the limit, home working equipment excluded, short lets not allowed, flood area exclusions), and where the sum insured looks low against the home described.
4. Questions for each insurer, specific to the gaps found, to ask in writing.
5. Summary: which quote gives the cover this household needs at the lowest price, which are cheaper only because they cover less, and what to confirm before buying. Do not choose for the person.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Compare only what the quotes state; never assume a quote includes cover it does not mention.
- Do not recommend a specific insurer; describe trade-offs and point to a broker for complex homes (listed, non-standard construction, flood risk).
- Do not state legal requirements (for example whether buildings cover is required by a mortgage lender) as fact for the person's country; say it is commonly required and to check.
- Remind the person that undeclared facts (lodgers, business use, previous claims) can lead to refused claims.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three or four sentences.

## Like-for-like table
Table: feature | quote 1 | quote 2 | ...

## Worked claims
Table: claim | quote 1 pays | quote 2 pays | ... with arithmetic notes.

## Gaps and traps
Bullets.

## Questions for each insurer
Grouped by quote.

## Assumptions
Bullets.
</output_format>
