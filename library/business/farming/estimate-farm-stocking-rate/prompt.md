---
schema: 1
id: estimate-farm-stocking-rate
kind: prompt
title: Estimate a farm's stocking rate
description: Estimates a sustainable stocking rate from grazing area, grass growth, forage needs and livestock units, and shows how a dry or wet year changes it and where the farm is over or under-stocked.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stocking-rate, livestock-units, grass-growth, feed-budget, drought-planning]
pairs_with:
  prompts: [budget-winter-forage-stocks, plan-paddock-grazing-rotation, plan-tupping-calendar]
  personas: [farm-business-advisor]
args:
  - name: land
    description: Grazing and forage land - total hectares or acres, how much is grazed, cut for silage or hay, rough grazing or hill, soil type, and any land rented in or out.
    type: text
    required: true
  - name: livestock
    description: All stock through the year - species, class, numbers, liveweights, and how long each group is on the farm (for example "450 ewes all year, lambs sold by October, 30 suckler cows housed November to April").
    type: text
    required: true
  - name: region_climate
    description: Region and climate, and grass growth figures if you know them (for example from a local grass growth network).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Feed demand, Feed supply, Stocking rate, Dry and wet years, What this means, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a livestock farmer judge whether the farm carries the right amount of stock. Advisers do this as a whole-year feed balance: how much dry matter (DM) the land grows and can be used, against how much the stock need, rather than a headline "stock per hectare" figure. The common failures: using another region's typical stocking rate, ignoring utilisation (not all grass grown is eaten), forgetting that young stock and sale timing change demand through the year, and planning for an average year when it is the dry year that breaks the farm.

Region and climate: {{region_climate}}
<land>
{{land}}
</land>
<livestock>
{{livestock}}
</livestock>
</context>

<task>
1. Assumptions, each labelled as given or rule of thumb: livestock unit (LU) factors by class (for example dairy cow about 1.0, suckler cow about 0.8-1.0 with calf, ewe about 0.1-0.15 with lambs, following the convention used in the country where known); DM intake per LU per year (often about 4.5-5.5 t); grass grown per hectare per year for the land and region (a range, since it varies widely); and utilisation (often about 60-80% under good rotational grazing and cutting, lower under set stocking or on hill land).
2. Feed demand: LU-months or tonnes DM needed per year by group, from numbers, weights and time on farm.
3. Feed supply: hectares × grass grown × utilisation by land type, plus bought-in feed and forage if any.
4. Stocking rate: LU per hectare now and the sustainable range from the balance, plus where the pressure falls in the year (spring surplus, summer gap, winter deficit).
5. Dry and wet years: rerun the supply with lower and higher growth (for example 20-30% less and 10-15% more, or local figures) and show the shortfall or surplus in tonnes DM and what stock change it equals.
6. What this means: whether the farm is over, under or about right, and the levers in order of cost (improve utilisation and grazing management, fix soil fertility, time sales or lambing or calving to the grass curve, keep a forage reserve, reduce or increase numbers), with the trade-offs for income and workload in general terms.
7. Questions whose answers would change the estimate most.
</task>

<constraints>
- Show every calculation with its units.
- Mark all factors and growth figures as rules of thumb and suggest local sources (grass growth networks, advisory services) to check them.
- Do not give financial projections or recommend selling or buying specific numbers of stock as a firm decision; show the effect of options and suggest talking to an adviser for a business decision.
- If land area or stock numbers are missing, ask and stop.
</constraints>

<output_format>
## Assumptions
Table: Item | Value | Given or rule of thumb.
## Feed demand
Table: Group | Head | LU each | Months on farm | t DM per year.
## Feed supply
Table: Land | Hectares | t DM grown per ha | Utilisation | t DM used.
## Stocking rate
LU per hectare now and the sustainable range, with one paragraph on seasonal pressure.
## Dry and wet years
Table: Scenario | Supply | Demand | Balance | Stock change equivalent.
## What this means
Bullets.
## Questions
At most three.
</output_format>
