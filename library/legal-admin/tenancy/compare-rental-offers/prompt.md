---
schema: 1
id: compare-rental-offers
kind: prompt
title: Compare rental homes before you commit
description: Compares two to four rental homes a tenant is choosing between on true monthly cost, upfront money, lease terms, condition and commute, flags red flags and scams, and says which to pick and why.
category: tenancy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [table, report, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [flat-hunting, total-cost, lease-terms, rental-scams, decision]
pairs_with:
  prompts: [build-house-viewing-checklist, review-lease, prepare-rental-application]
  workflows: [first-apartment-track]
args:
  - name: options
    description: For each home - rent, deposit, fees, what bills are included, estimated utilities, size and layout, condition notes from the viewing, lease length and key terms offered, commute time and cost, landlord or agent impression, and anything odd.
    type: text
    required: true
  - name: priorities
    description: What matters to you - budget ceiling, commute, space, pets, quiet, flexibility to leave, move-in date. Optional.
    type: text
  - name: country
    description: Country or city, for typical lease terms and fees to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [True monthly cost, Upfront money, Terms compared, Red flags, Recommendation, Questions to ask before signing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help renters choose between homes the way a sensible friend who has rented for years would. The cheapest rent is often not the cheapest home: bills included or not, heating type and energy efficiency, commute costs, parking, service or amenity fees and furniture needed can swing the true monthly cost by a lot. Upfront money (deposit, first month, fees, holding deposit, moving) decides what is affordable now. Lease terms decide flexibility and risk: length, break options, who handles repairs, rent review terms. Viewing impressions about damp, noise, security and how responsive the landlord seems matter more than décor. And some red flags point to scams or problem landlords: pressure to pay before viewing or signing, payment by untraceable methods, no proof the person can let the property, a price far below similar homes, refusal to put things in writing.

<options>
{{options}}
</options>
{{#priorities}}

<priorities>
{{priorities}}
</priorities>
{{/priorities}}
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
1. Calculate the true monthly cost of each home: rent, bills not included (using the user's estimates or a labelled placeholder), commute, parking and other recurring costs. Show the arithmetic.
2. Calculate the upfront money for each: deposit, advance rent, fees, holding deposit, furniture or moving. Flag any fee that may be restricted locally `[CHECK locally]`.
3. Compare the terms: lease length, break clause, notice, rent review, repairs responsibility, pets, subletting, and anything unusual.
4. List red flags for each home, including possible scam signs and condition concerns from the viewing.
5. Recommend one home against the user's priorities, with the runner-up and what would change the decision.
6. List questions to ask the landlord or agent before signing for the recommended home.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures given; label every estimate. Do not invent local average bills or rents.
- Do not state which fees are legal or illegal as fact; mark them `[CHECK locally]`.
- If any option shows strong scam signs (payment before viewing, untraceable transfer, no proof of ownership), say plainly not to pay until verified, regardless of price.
{{> output/uncertainty}}
</constraints>

<output_format>
## True monthly cost
Table: cost line by home, with totals.

## Upfront money
Table by home.

## Terms compared
Table by home.

## Red flags
Bullets per home.

## Recommendation
Pick, runner-up, and what would change it.

## Questions to ask before signing
Numbered list.
</output_format>
