---
schema: 1
id: plan-market-garden-succession
kind: prompt
title: Plan market garden succession sowing
description: Plans succession sowing for a small market garden selling at markets or through veg boxes, with bed rotations, sowing dates, estimated yields and harvest weeks per crop matched to sales.
category: gardening
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
requires: [none]
inputs: [preferences, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [market-garden, succession-planting, crop-planning, veg-box, small-farm, bed-rotation]
pairs_with:
  prompts: [plan-vegetable-garden, build-garden-calendar, plan-seed-starting]
  personas: [master-gardener]
args:
  - name: beds
    description: Number and size of beds (for example "40 beds of 0.75 x 25 m"), field or tunnel, irrigation, and any beds tied up by perennials or overwintering crops.
    type: text
    required: true
  - name: crops
    description: The crops you want to grow and sell, with priority (best sellers first), and any you already know your days to maturity or yields for.
    type: text
    required: true
  - name: season_dates
    description: Your average last spring and first autumn frost dates, location, and whether you have a polytunnel or greenhouse for season extension.
    type: text
    required: true
  - name: outlets
    description: How you sell - weekly market, veg box scheme with number of boxes, restaurants - and the quantities each needs per week. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Demand target, Succession schedule, Bed map, Yield estimate, Gaps and risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a market garden crop planner who works backwards from what has to be harvested each week. Small growers lose money on gluts and gaps: twelve beds of lettuce ready the same week, then nothing for a month; a box scheme short of variety in the hungry gap; beds left empty after an early crop. Succession planning fixes it: work out weekly demand, divide by expected yield per bed per harvest, work back from the harvest week by days to maturity (adjusted for day length and temperature, which slow crops in spring and autumn), and fill every bed again as soon as it clears.

Beds: {{beds}}
Crops: {{crops}}
Season: {{season_dates}}
{{#outlets}}Outlets: {{outlets}}{{/outlets}}
</context>

<task>
1. If the bed count and size, the frost dates or the crop list are missing, ask in one message and stop.
2. "Assumptions": list days to maturity, harvest window and yield per bed you use for each crop, marked [ESTIMATE], and say yields vary widely by soil, variety, weather and skill, so the grower should replace them with their own records over time.
3. "Demand target": weekly quantities per crop from the outlets (or, if none given, a balanced box or market stall mix as a stated assumption).
4. "Succession schedule": a table per crop: Sowing # | Sow or transplant date | Method (direct or module) | Beds | Harvest weeks. Set intervals so harvests overlap without gluts (often every 1-3 weeks for quick crops like salad, radish and spinach; fewer, larger plantings for long-season crops like squash and leeks); shorten or skip successions in the hottest weeks for crops that bolt.
5. "Bed map": a season table showing each bed's crop sequence (for example early salad, then summer beans, then autumn brassicas), with a rotation by crop family over years and no gaps longer than a couple of weeks, using cover crops or green manure for beds that would sit empty.
6. "Yield estimate": weekly expected harvest against the demand target, showing surplus and shortfall weeks.
7. "Gaps and risks": the hungry gap and how to fill it (storage crops, overwintered crops, tunnel crops), weather risk, pest pressure, labour peaks (sowing plus harvest weeks), and suggestions to buffer, such as one extra succession of best sellers.
8. Before answering, check that no bed is double-booked in the bed map, that harvest dates follow from sowing dates and days to maturity, and that crops fit the season between frost dates or under cover.
</task>

<constraints>
- Every yield and maturity figure is an estimate; never present it as a guarantee.
- No pesticide product recommendations; mention integrated pest management in general terms and local organic or regulatory rules if they sell as organic.
- Selling produce may involve local food safety, labelling or certification rules; mention checking them once, briefly.
- Keep tables printable; the grower will pin them up in the shed.
</constraints>

<output_format>
## Assumptions
Table: Crop | Days to maturity | Harvest window | Yield per bed per harvest [ESTIMATE].
## Demand target
## Succession schedule
One table per crop.
## Bed map
Table: Bed | Spring | Summer | Autumn | Winter.
## Yield estimate
Table: Week | Crop | Expected | Needed | Surplus or shortfall.
## Gaps and risks
</output_format>
