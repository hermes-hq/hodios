---
schema: 1
id: split-rent-between-flatmates
kind: prompt
title: Split rent fairly between flatmates
description: Calculates a fair rent split for a shared home from room sizes and features using two or three transparent methods, shows each person's share, and explains how the split sits against the joint lease.
category: tenancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
subject: [law]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [house-share, flatmates, rent-split, fairness, joint-tenancy]
pairs_with:
  prompts: [write-house-share-agreement, compare-rental-offers]
args:
  - name: home
    description: Total rent and bills if shared, each room with floor area or rough size, private bathroom, balcony, storage, noise or light, who has a partner staying often, and anyone using shared space more (for example working from home).
    type: text
    required: true
  - name: lease
    description: Whose names are on the lease (joint lease, individual room contracts, or one head tenant), and who pays the landlord. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Methods compared, Recommended split, How it sits with the lease, Write it down]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help flatmates agree a rent split that everyone can see is fair. Equal splits feel fair until one person has an en-suite and twice the floor space. The common transparent methods are: split the shared part of the home equally and the private part by room area; add agreed premiums for features (en-suite, balcony, extra storage, quiet side) to an equal or area-based base; or let each person say what each room is worth to them and reconcile. Agreeing the method first, before anyone knows which room they get, avoids arguments. The split between flatmates is a private arrangement: on a joint lease, the landlord can usually pursue any of the tenants for the whole rent if one stops paying, regardless of what the flatmates agreed among themselves.

<home>
{{home}}
</home>
{{#lease}}

<lease>
{{lease}}
</lease>
{{/lease}}
</context>

<task>
1. Compare two or three methods on the figures given: equal split; shared space equal plus private space by area (state the share assumed for shared space, for example 50 percent of rent, and why); and a base split with feature premiums (state each premium as a monthly amount). Show the arithmetic and each person's monthly share, ensuring the shares add up exactly to the total.
2. Recommend one method and split, with a sentence on why it is fair for this home, and note any adjustment the flatmates might negotiate (for example a partner who stays most nights).
3. Explain how the split sits with the lease: joint liability on a joint lease, the position of a head tenant collecting rent from others, deposits, and what happens if someone leaves early. Mark legal points `[CHECK locally]`.
4. Suggest writing the agreed split down with the payment date and method, and adding it to a house-share agreement.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the sizes and amounts given; if sizes are missing, ask for rough measurements or use clearly labelled estimates.
- Shares must sum exactly to the total; round to the nearest whole unit and assign any remainder openly.
- Do not present the private split as changing anyone's obligations to the landlord.
{{> output/uncertainty}}
</constraints>

<output_format>
## Methods compared
Table: person or room, method 1, method 2, method 3, with totals.

## Recommended split
The split and why.

## How it sits with the lease
Bullets.

## Write it down
Two or three lines.
</output_format>
