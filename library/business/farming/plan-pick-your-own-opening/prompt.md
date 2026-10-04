---
schema: 1
id: plan-pick-your-own-opening
kind: prompt
title: Plan a pick-your-own opening
description: Plans a pick-your-own season with opening dates by crop, pricing by weight or container, parking and paths, staff stations, hygiene and safety, signage and a washed-out weekend plan.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, operations-manager]
subject: [agriculture, hospitality]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [pick-your-own, farm-visitors, visitor-flow, farm-diversification, signage]
pairs_with:
  prompts: [price-farm-gate-produce, plan-farm-open-day, plan-signage, write-farm-safety-induction]
args:
  - name: crops
    description: The crops and varieties, rough area, expected picking dates and yield, and whether any are already sold elsewhere, for example "strawberries 1 ha June-July, raspberries 0.5 ha July-Sept, pumpkins 2 ha October".
    type: text
    required: true
  - name: site
    description: Site layout and facilities - road access, where parking could go, distance from car park to fields, toilets and handwashing, shed or shop, card reader, staff available.
    type: text
    required: true
  - name: expected_visitors
    description: Optional. Expected visitors on a busy day.
    type: number
output_contract:
  format: markdown
  sections: [Season calendar, Pricing, Site layout and flow, Staff stations, Hygiene and safety, Signage, Washed-out weekend plan, Opening checklist, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a fruit, veg or flower farm plan a pick-your-own season. PYO goes wrong in predictable places: opening announced before the crop is ready, then a weekend of picked-over rows; queues at a single till; cars parking on verges and blocking the road; visitors eating as they pick and families wandering into machinery yards; pricing that is unclear at the weighing point; and a wet weekend after a big social-media push with no plan. A good plan opens fields in rotation so there is always fruit, separates cars, tractors and pedestrians, sizes checkout to the busiest hour, makes hygiene and safety easy, and has a call-off and rain plan.

{{#expected_visitors}}Expected visitors on a busy day: {{expected_visitors}}{{/expected_visitors}}
</context>

<task>
<crops>
{{crops}}
</crops>

<site>
{{site}}
</site>

1. Season calendar: likely open window per crop from the dates given, with a field or row rotation so picked areas rest; a rule for announcing opening (only once there is enough ripe fruit for the expected visitors) and a daily "picking report" for website and social media.
2. Pricing: by weight with scales at checkout, or by container (punnet, basket, pumpkin by size), with the pros and cons for each crop; a container charge or deposit; a fair rule on eating while picking; price board wording. Scales used for selling by weight may need to be approved or verified locally; mark it `[CHECK locally]`.
3. Site layout and flow: entrance, one-way traffic where possible, car park sized for the busiest hour (assume 2.5-3 people per car unless told otherwise), pedestrian route kept apart from tractors and the yard, field entry and exit points, accessible route and parking.
4. Staff stations and numbers for a busy day: car park marshal, welcome and containers, field supervisors, checkout and weighing, toilets and cleaning, with breaks. Checkout capacity: estimate customers per hour per till and add tills or a separate pay point for peak.
5. Hygiene and safety: handwashing with soap and running water near toilets and any animal areas, clear message to wash fruit before eating, no pets in the crop, children supervised, no-go areas (yard, machinery, ponds, reservoirs), first aid, sun and heat, lost child procedure, a written risk assessment.
6. Signage: entrance, prices, field directions, rules in pictures plus words, closing time.
7. Washed-out weekend plan: the decision time for closing, how to tell people, what to do with ripe fruit (pick for the shop, jam, wholesale), and a rain-check offer.
8. Opening checklist for the week before.
</task>

<constraints>
- Use only the site and crop details given; mark missing items `[CONFIRM]`.
- Do not state insurance, food hygiene, planning, road or weights-and-measures rules as fact; list them as `[CHECK locally]`.
- If crops or site are not described, ask and stop.
</constraints>

<output_format>
## Season calendar
Table: crop | likely window | field or rows by week | notes.

## Pricing
Table: crop | method | price basis | container charge | notes. Then price board wording.

## Site layout and flow
Numbered route from road to field and back, with a text sketch if helpful.

## Staff stations
Table: station | people on a busy day | job | breaks covered by.

## Hygiene and safety
Checklist.

## Signage
Table: sign | location | wording.

## Washed-out weekend plan
Bullets with decision times.

## Opening checklist
Checklist for the week before opening.

## Questions
Every `[CONFIRM]` and `[CHECK locally]` item.
</output_format>
