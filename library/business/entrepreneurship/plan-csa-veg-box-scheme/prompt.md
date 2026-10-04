---
schema: 1
id: plan-csa-veg-box-scheme
kind: prompt
title: Plan a CSA or veg box scheme
description: Plans a community-supported agriculture or veg box scheme with a land capacity check, share sizes, pricing built from real costs, a crop outline, member communication and delivery logistics.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, individual]
subject: [agriculture]
requires: [none]
inputs: [notes, preferences, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [community-supported-agriculture, veg-box, market-garden, small-farm, subscription-pricing]
pairs_with:
  prompts: [plan-market-garden-succession, plan-subscription-business, plan-delivery-routes, model-unit-economics]
  personas: [farm-business-advisor]
args:
  - name: land
    description: The growing area - cultivated beds or hectares, polytunnels or glasshouse, soil, water, storage and packing space, and the grower's experience and hours available per week.
    type: text
    required: true
  - name: members_target
    description: How many member households or box subscriptions you want to supply in the first full season.
    type: number
    required: true
  - name: season_weeks
    description: How many weeks a year boxes or shares are delivered.
    type: number
    default: 30
  - name: scheme_model
    description: CSA with shared risk and upfront or instalment payments, a subscription veg box with weekly billing and buying-in allowed, or undecided to compare both.
    type: enum
    enum: [csa-shared-risk, box-subscription, undecided]
    default: undecided
  - name: costs
    description: Optional. Your yearly costs or estimates - land rent, the grower's wage, other labour, seeds and plants, compost and inputs, packaging, delivery, equipment, insurance, admin. Without them a cost template is produced to fill in.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Scheme model, Shares and box contents, Pricing from costs, Crop outline, Member journey, Delivery and packing, Launch timeline, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small growers set up community-supported agriculture (CSA) and veg box schemes. The two models differ: in a CSA, members commit for the season, pay in advance or by instalment and share the harvest and its risks, which gives the grower cash at the start of the year and a fair wage built into the price; a box subscription is a retail product that members can pause or cancel, usually topped up with bought-in produce to keep the box consistent. Schemes fail most often because the price was set by looking at supermarket prices instead of real costs including the grower's own pay, because the land cannot fill the promised boxes in the spring hungry gap, or because members drift away when communication stops.

Target members: {{members_target}}
Season length: {{season_weeks}} weeks
Model: {{scheme_model}}

<land>
{{land}}
</land>
{{#costs}}
<costs>
{{costs}}
</costs>
{{/costs}}
</context>

<task>
1. If the growing area or the grower's available hours are missing, ask for them and stop.
2. Capacity check: estimate how many standard shares the land can supply across {{season_weeks}} weeks, using a stated rule-of-thumb yield per bed or area for a mixed vegetable system and labelling it an assumption to replace with the grower's own records. Compare with {{members_target}} and say whether the target is realistic, and where the hungry gap falls.
3. Recommend the scheme model, or compare both if undecided, for this grower: cash flow, risk, workload, member commitment and whether buying-in fits their values.
4. Define share sizes (for example small and standard): number of items per week, typical weights, and how contents change through the season with an early, peak and late example box.
5. Build pricing from costs: total yearly costs (from the costs given or a template with every line), add the grower's wage and a contingency, divide by shares and weeks, and show the price per share per week and per season. Then compare with what members are likely to pay and suggest options such as a sliding scale, working shares or a deposit plus instalments. Show the arithmetic.
6. Outline the crop plan by month for the share: staple crops, the crops that make a box feel generous, storage crops for the shoulder months, and the gaps to plan for. Keep it at outline level and point to succession planning for detail.
7. Plan the member journey: sign-up and payment, a members' agreement covering shared risk or pause rules, the weekly message (what is in the box, storage tips, a recipe, farm news), how to tell members about crop failures honestly, farm days, and renewal.
8. Plan delivery and packing: pickup points versus home delivery, packing day routine, cool storage, route time, and costs per box.
9. Give a launch timeline from now to the first box.
10. List checks: food business registration or hygiene rules, insurance, labelling if anything is processed, rules if buying in produce, and tax treatment of upfront payments, each marked `[CHECK]`.
11. Before writing the final version, recheck the pricing arithmetic and confirm the capacity estimate is clearly labelled as an assumption.
</task>

<constraints>
- Never set the price from supermarket comparisons alone; real costs including the grower's wage come first.
- Do not present yield, price or demand figures as facts. Label every assumption and say how to replace it.
- Keep the plan sized to one grower or a small team; say when the target needs extra labour or land.
- Regulatory points are items to check, not statements of law.
</constraints>

<output_format>
## Capacity check
## Scheme model
## Shares and box contents
Include a table: Season stage | Example small share | Example standard share.
## Pricing from costs
Table: Cost line | Yearly amount | Source (given or assumed). Then the calculation step by step.
## Crop outline
Table: Month | Main crops | Gaps.
## Member journey
## Delivery and packing
## Launch timeline
Table: When | Task.
## Checks
Bullets with `[CHECK: …]`.
</output_format>
