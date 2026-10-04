---
schema: 1
id: decide-in-house-or-outsource
kind: prompt
title: Decide in-house or outsource
description: Decides whether a small business should do an activity itself or outsource it - baking, laundry, bookkeeping, delivery, marketing - on full cost, quality control, capacity, skills and risk.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [make-or-buy, outsourcing, supplier-choice, total-cost, core-activities]
pairs_with:
  prompts: [build-supplier-scorecard, test-capacity-before-growth, reduce-owner-dependence]
  personas: [procurement-specialist, small-business-advisor]
args:
  - name: activity
    description: The activity in question, how it is done today (who, how many hours, equipment, space), what matters most about it (quality, speed, cost, control), and why you are reconsidering.
    type: text
    required: true
  - name: current_cost
    description: What it costs to do now - wages and hours, materials, equipment, space, software - or what you estimate it would cost to bring in-house. Optional.
    type: text
  - name: quotes
    description: Quotes or prices from outside providers, with what they include, minimums, contract length and notice. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Is it core, Full cost compared, Quality and control, Capacity and flexibility, Risks and exit, Decision and trial, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner decide whether to keep an activity in-house or buy it in: a cafe baking its own cakes, a guest house doing its own laundry, a firm doing its own books, delivery or social media. Owners compare a supplier's price with wages alone and miss the rest: owner and manager time, equipment and its replacement, space that could earn money, holiday cover, and wastage; or they outsource something that is part of why customers choose them and lose control of it. The questions are: is this activity part of what makes customers choose us, what is the full cost each way, can a supplier meet the standard reliably, and how easy is it to switch back.
</context>

<task>
<activity>
{{activity}}
</activity>

{{#current_cost}}
<current_cost>
{{current_cost}}
</current_cost>
{{/current_cost}}

{{#quotes}}
<quotes>
{{quotes}}
</quotes>
{{/quotes}}

1. Is it core: does the activity shape why customers choose the business (signature product, the customer relationship, a skill competitors lack), is it support work that must be done well, or is it routine? Core activities need a strong reason to outsource.
2. Full cost compared: in-house = wages with on-costs and cover + owner or manager time (valued at a stated rate) + materials and wastage + equipment depreciation and repairs + space + software and other. Outsourced = supplier price at your volume + delivery and minimums + management time + transition costs. Show both per month and per unit (per cake, per kilo of laundry, per month of books).
3. Quality and control: the standard that matters, how you would check it with a supplier (spec, samples, service levels), and what you lose (flexibility, recipes, customer contact).
4. Capacity and flexibility: what doing it in-house blocks (space, staff hours, the owner's time) and whether a supplier copes with peaks and short notice.
5. Risks and exit: supplier dependence, price rises, data or confidentiality (bookkeeping, customer data), and how hard it is to bring back in-house later.
6. Decision and trial: recommend in-house, outsource, or a hybrid (outsource the routine part, keep the signature part), and a trial with measures and a review date.
7. Check the arithmetic before answering.
</task>

<constraints>
- Use only the costs and quotes given; mark gaps [X] and label estimates. Never invent supplier prices.
- Value the owner's time explicitly; ask for a rate if none is given and state the one you use.
- For bookkeeping, payroll or tax work, note that responsibility for filings usually stays with the business; check engagement terms with the provider and an accountant.
- If the activity or what matters about it is unclear, ask and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Is it core
One short paragraph and the label core, support or routine.
## Full cost compared
Table: Cost line | In-house per month | Outsourced per month. Totals and per-unit rows.
## Quality and control
Bullets.
## Capacity and flexibility
Bullets.
## Risks and exit
Table: Risk | In-house | Outsourced.
## Decision and trial
Recommendation, trial length, measures and review date.
## Assumptions and questions
Bullets.
</output_format>
