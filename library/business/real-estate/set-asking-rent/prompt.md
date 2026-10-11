---
schema: 1
id: set-asking-rent
kind: prompt
title: Set the asking rent for a rental
description: Sets an asking rent for a long-term let from comparable listings and lets, adjusting openly for size, condition and features, with a range, a launch price and a rule for when to reduce.
category: real-estate
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager, sales-rep]
subject: [real-estate]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [landlord, rental-pricing, comparables, letting, market-rent]
pairs_with:
  prompts: [write-rental-listing, analyze-rental-property, analyze-property-comparables]
  personas: [property-manager]
args:
  - name: property
    description: The home to let - type, bedrooms, bathrooms, floor area, condition, furnished or not, outside space, parking, energy rating, bills included or not, and location detail.
    type: text
    required: true
  - name: comparables
    description: Comparable rentals - for each, rent, size, bedrooms, condition, furnishing, distance, and whether it is an asking rent or an achieved let, with date and days on market if known.
    type: text
    required: true
  - name: goals
    description: What matters most - fastest let, highest rent, longest-staying tenant - and the date the property is available. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Evidence quality, Adjusted comparables, Rent range, Recommended launch, Reduction rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You price a rental the way an experienced lettings manager does. Asking rents on portals overstate the market; achieved rents on recent lets are better evidence, and how long a listing has sat tells you whether its price is working. Adjustments should be explicit and modest: an extra bedroom, a garden, parking, furnishing or bills included move the figure, but no single feature justifies a big premium. The real trade-off is between rent and time: a price set 5 percent too high that adds three empty weeks loses more than it gains in the first year, and a well-priced home attracts more applicants, which means a better tenant to choose from.

<property>
{{property}}
</property>

<comparables>
{{comparables}}
</comparables>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Grade the evidence: how many comparables, how many are achieved lets versus asking rents, how recent and how close. Say how much confidence the range deserves.
2. Adjust each comparable to the subject property, one line per adjustment with the amount and reason, and give an adjusted figure. Weight achieved, recent, close comparables more heavily; treat listings that have sat a long time as a ceiling.
3. Give a rent range (low, likely, high) per month.
4. Recommend a launch rent for the stated goal, and show the trade-off: annual income at the launch rent with an assumed void, compared with one step higher and one step lower with their likely voids (state the assumptions).
5. Set a reduction rule: after how many days or how few viewings or applications the rent should be reviewed, and by how much.
</task>

<constraints>
- Use only the comparables supplied. Do not invent market rents, averages or demand data.
- If fewer than three usable comparables are given, say the range is weak and list what evidence to gather before committing.
- State every assumption (void lengths, adjustment amounts) so the user can change it.
- If rent control, registration or local caps could affect the rent that can be charged, mention that this must be checked locally; do not state the rule.
- Do not use the characteristics of likely tenants (families, students, nationality) as a pricing factor.
{{> output/uncertainty}}
</constraints>

<output_format>
## Evidence quality
Two or three lines.

## Adjusted comparables
Table: comparable, rent, type of evidence, adjustments, adjusted rent, weight.

## Rent range
Low, likely, high.

## Recommended launch
The figure, why, and the trade-off table.

## Reduction rule
One or two lines.
</output_format>
