---
schema: 1
id: estimate-harvest-labour-needs
kind: prompt
title: Estimate harvest labour needs
description: Calculates how many pickers, packers and supervisors a fruit, veg or flower harvest needs week by week from yield, pick rates and the harvest window, with a poor-week sensitivity.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [harvest-crew, pick-rates, labour-planning, seasonal-workers, pack-house]
pairs_with:
  prompts: [build-staff-schedule, plan-peak-season-operations]
  workflows: [seasonal-crew-track]
args:
  - name: crop
    description: The crop and how it is picked and packed, for example "strawberries, table-top, picked into punnets in the field" or "cut tulips, bunched in the shed".
    type: string
    required: true
  - name: expected_yield
    description: Area and expected yield, ideally as a week-by-week profile (for example "4 ha, about 30 t total, peak in weeks 3-5"). Last year's weekly figures are best.
    type: text
    required: true
  - name: harvest_window
    description: Start and end of the harvest and picking days per week, for example "early June to mid July, 6 days a week".
    type: string
    required: true
  - name: pick_rate
    description: Optional. Your own pick and pack rates (kg, punnets or stems per person per hour, for new and experienced workers), paid hours per day, and current supervisor ratio.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Weekly volume, Crew by week, Sensitivities, Recruitment timing, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a grower work out how many people the harvest needs, week by week, before recruiting. Crew plans usually go wrong in four ways: they divide the total crop evenly over the season and miss the peak; they use experienced pick rates for a crew that is half new starters; they count paid hours as picking hours (walking, breaks, weighing and rain stops eat 10-20%); and they size pickers but forget packers, runners, quality checkers and supervisors. A good plan sizes the crew for the peak week, shows the ramp-up and ramp-down, and says what a bad week does to it.

Crop: {{crop}}
Harvest window: {{harvest_window}}
</context>

<task>
<expected_yield>
{{expected_yield}}
</expected_yield>

{{#pick_rate}}
<pick_rate>
{{pick_rate}}
</pick_rate>
{{/pick_rate}}

1. Build the weekly volume. Use the grower's weekly profile if given. If only a total is given, spread it over a typical bell-shaped profile for the crop, show the percentage per week, and label it an assumption to replace with their own records.
2. Set the rates. Use the grower's own pick and pack rates. If none are given, do not invent a figure as fact: ask for them, and meanwhile show the table with the rate as a clearly labelled planning assumption the grower must replace. Use a productive-hours factor (default 0.85 of paid hours) and a new-starter factor (default 60% of the experienced rate in week one, 80% in week two).
3. Calculate pickers per week: weekly volume / (rate x productive hours per day x picking days). Show the formula once and the arithmetic for the peak week.
4. Add the other roles: packers (from pack rate and the share packed on the day), runners or tractor drivers, quality checkers, and supervisors (default one per 15-20 pickers; say to adjust for crop complexity and language mix).
5. Add an absence and turnover buffer (default 10% in a normal season, 15-20% if many workers are new) and round up to whole people.
6. Run sensitivities: a poor picking week (two days lost to rain and rates down 20%), a peak 20% bigger or a week earlier than planned, and what the crew can catch up the following week before fruit goes over.
7. Work back from the start date to recruitment and accommodation deadlines.
</task>

<constraints>
- Use only the figures given; label every assumption and keep it adjustable.
- Show arithmetic so the grower can check it; totals must add up.
- Do not state legal minimum wages, visa rules, working-time limits or accommodation standards as fact; list them as items to check locally.
- If the crop, total yield or harvest window is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets: rates, hours, factors and buffers used, each marked "given" or "assumption".

## Weekly volume
Table: week | dates | share of crop % | volume.

## Crew by week
Table: week | pickers | packers | runners and drivers | supervisors | total heads. Bold the peak week. Arithmetic for the peak week underneath.

## Sensitivities
Table: scenario | extra people or hours needed | how to cover it (overtime, extra day, agency, delay a block).

## Recruitment timing
Dated bullets working back from the first picking day.

## Questions
What to confirm to tighten the estimate.
</output_format>
