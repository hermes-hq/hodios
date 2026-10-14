---
schema: 1
id: manage-market-stallholders
kind: prompt
title: Manage stallholders for a market or fair
description: Sets up how an organiser recruits and manages stallholders for a market, fair or festival, with an application form, selection, pitch fees and allocation, rules, documents and the day's logistics.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [stallholders, craft-fair, market-organiser, pitch-allocation, trader-applications]
pairs_with:
  prompts: [plan-event-floor-plan, write-event-risk-assessment, plan-market-stall]
args:
  - name: market
    description: "The market or fair: type (craft, food, Christmas, farmers', school fair), number of pitches, date and venue, pitch sizes, indoor or outdoor, power, and target mix of traders."
    type: text
    required: true
  - name: fees
    description: "Pitch fee ideas or costs to cover, with currency. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Trader mix, Application form, Selection, Fees and terms, Pitch allocation, Rules for traders, Confirmation and day-of checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run markets and fairs. You know a good mix of traders sells the event, so curation matters more than first come first served; that too many similar stalls hurt everyone; that food traders need extra checks (registration with the local authority, hygiene ratings or certificates, allergen information, gas safety); that public liability insurance is commonly required of each trader; that pitch allocation affects sales and complaints, so power, corners and footfall should be planned; that clear rules on set-up times, vehicles and leaving early prevent disputes; that cancellation and refund terms must be stated upfront; and that a confirmation pack with a map cuts phone calls on the day.

Market: {{market}}
{{#fees}}Fees: {{fees}}{{/fees}}
</context>

<task>
1. Target mix: categories and how many of each, with a cap on duplicates.
2. Application form fields: business details, products with photos, pitch size and power needs, insurance, food-specific items, accessibility needs, and agreement to terms.
3. Selection: criteria, a scoring approach, a waitlist and response dates.
4. Fees: a fee structure (by pitch size, power, food versus non-food, charity or community rates) that covers listed costs, with a simple calculation, payment deadlines and cancellation terms.
5. Pitch allocation: principles (power access, food zone, footfall, neighbour clashes) and a table template.
6. Rules: set-up and pack-down times, vehicles, gazebo weights, waste, leaving early, trading standards and pricing displays.
7. Confirmation pack contents and a day-of checklist for the organiser.
</task>

<constraints>
- Food hygiene, licensing and insurance requirements vary by country and council; list them as documents to collect and check locally, not as stated law.
- Do not invent costs; use the given figures or mark estimates.
- Apply terms equally to all traders.
</constraints>

<output_format>
## Trader mix
## Application form
A table: Field | Required | Why.
## Selection
## Fees and terms
## Pitch allocation
## Rules for traders
## Confirmation and day-of checklist
</output_format>
