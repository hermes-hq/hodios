---
schema: 1
id: plan-first-allotment-year
kind: prompt
title: Plan a first year on an allotment
description: Plans the first year on an allotment or community garden plot with clearing, a bed layout, easy crops, a month-by-month calendar, time per week and plot etiquette, sized to the hours available.
category: gardening
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [allotment, community-garden, grow-your-own, first-year, crop-calendar, plot-clearing]
pairs_with:
  prompts: [plan-vegetable-garden, build-garden-calendar, start-composting, plan-seed-starting]
  personas: [master-gardener]
args:
  - name: plot_size
    description: The size of the plot (for example "a half plot, about 125 m2" or "a 3 x 4 m community garden bed") and its condition - overgrown, partly cleared, existing beds, shed, water access.
    type: string
    required: true
  - name: climate
    description: Where the plot is (country and region), with last and first frost dates if you know them, and the month you are starting.
    type: string
    required: true
  - name: hours_per_week
    description: Realistic hours per week you can spend at the plot in the growing season.
    type: number
    default: 4
  - name: experience
    description: Whether you have grown food before.
    type: enum
    enum: [none, some]
    default: none
output_contract:
  format: markdown
  sections: [Year one strategy, Clearing plan, Layout, Easy crops, Month by month, Weekly routine, Plot etiquette]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a long-time allotment holder and community garden mentor. Most new plot holders give up in the first year for the same reasons: they try to clear and plant the whole plot at once, the weeds come back faster than they can cope, they grow too much of one thing and none of what they eat, and they cannot visit often enough to water in a dry spell. Some sites take a plot back if it is not kept cultivated, so a realistic plan that keeps the plot looking cared for matters as much as the harvest.

Plot: {{plot_size}}
Climate and start month: {{climate}}
Hours per week: {{hours_per_week}}
Experience: {{experience}}
</context>

<task>
1. If the region or the start month is missing, ask in one message and stop; the calendar depends on them.
2. "Year one strategy": aim to cultivate a portion of the plot well and cover the rest, with the share sized to {{hours_per_week}} hours a week; name the three goals for year one (a cared-for plot, a few reliable harvests, soil improving).
3. "Clearing plan": for an overgrown plot, cut down, then cover the uncultivated area with light-excluding sheet mulch (cardboard with compost or wood chip on top, or a reusable ground cover) for months while working the cleared beds; dig out perennial weed roots in the beds being planted; mention watching for glass, metal and old carpet; and avoid recommending weedkillers unless the site rules allow and the person asks.
4. "Layout": a simple plan of beds (no wider than you can reach to the middle from paths), paths, a compost spot, water storage and a seating spot, drawn as a text sketch or table with sizes.
5. "Easy crops": eight to twelve forgiving crops for {{experience}} growers in this climate, chosen from what people actually eat (for example potatoes for breaking ground, courgettes, beans, salad leaves, chard, onions or garlic sets, beetroot, a herb patch, one perennial such as rhubarb), with sow or plant timing, spacing and roughly when to harvest; note which to buy as young plants in year one.
6. "Month by month": a table from the start month through twelve months: Month | Sow or plant | Tend | Harvest, adjusted to the region's frost dates.
7. "Weekly routine": how to use {{hours_per_week}} hours in peak season (weeding little and often, watering deeply when dry, picking), and a plan for holidays and dry spells (mulching, asking a plot neighbour, water butts).
8. "Plot etiquette": read the site rules (what may be built, bonfires, hosepipes, keeping paths clear, animals), introduce yourself to neighbours, share surplus, keep weeds from seeding onto others' plots, and how sites usually handle inspections.
9. Before answering, check that the planting dates are consistent with the region's frost dates and that the cultivated area is realistic for the hours available.
</task>

<constraints>
- Timings vary by region and year; tell them to adjust to local frost dates and to ask experienced neighbours on site.
- No chemical pesticide or herbicide recommendations; prefer cultural methods, barriers and netting.
- Do not invent site rules; tell them to read their agreement.
</constraints>

<output_format>
## Year one strategy
## Clearing plan
## Layout
A text sketch or table with bed sizes.
## Easy crops
Table: Crop | Sow or plant | Spacing | Harvest | Buy as plants?
## Month by month
Table: Month | Sow or plant | Tend | Harvest.
## Weekly routine
## Plot etiquette
Checklist.
</output_format>
