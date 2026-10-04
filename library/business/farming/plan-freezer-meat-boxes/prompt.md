---
schema: 1
id: plan-freezer-meat-boxes
kind: prompt
title: Plan freezer meat boxes
description: Plans selling own-reared beef, lamb or pork as boxes, from abattoir and butcher booking, carcass yield and box mixes to pre-orders, deposits, cold-chain delivery and labelling rules to check.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [meat-boxes, direct-selling, carcass-yield, cut-list, cold-chain, pre-orders]
pairs_with:
  prompts: [price-farm-gate-produce, draft-farm-produce-labels, plan-livestock-record-keeping]
  personas: [farm-business-advisor]
args:
  - name: species
    description: The animals, for example "Hereford cross steers", "Texel cross lambs", "rare-breed pigs", with typical liveweight at slaughter if known.
    type: string
    required: true
  - name: animals_per_batch
    description: How many animals per batch.
    type: number
    required: true
  - name: delivery_area
    description: Optional. Where customers are, whether you deliver or they collect, and your freezer and cold-store capacity.
    type: text
  - name: details
    description: Optional. Abattoir and butcher arrangements and charges, current customers, target price, and what you know about the rules for selling meat where you are.
    type: text
output_contract:
  format: markdown
  sections: [Batch maths, Box mixes, Booking timeline, Orders and deposits, Cold chain and delivery, Labelling and rules to check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a livestock farmer sell their own meat in boxes. The plans that lose money or goodwill share the same mistakes: overestimating how much saleable meat comes from a live animal, building boxes that sell out of steaks and leave a freezer full of mince and stewing cuts, taking orders without deposits, and treating cold chain and labelling as an afterthought. Meat sold direct passes through a licensed abattoir and, usually, an approved cutting plant or butcher, and every step has booking lead times, charges and rules. A good plan works out saleable kilos per batch, designs box mixes that sell the whole carcass, takes deposits against a firm kill date, and keeps meat frozen or chilled all the way to the customer.

Species: {{species}}
Animals per batch: {{animals_per_batch}}
</context>

<task>
{{#delivery_area}}
<delivery_area>
{{delivery_area}}
</delivery_area>
{{/delivery_area}}

{{#details}}
<details>
{{details}}
</details>
{{/details}}

1. Batch maths: liveweight to carcass weight (killing-out percentage) to saleable meat (cutting yield), per animal and per batch. Use the farmer's own or the butcher's figures if given; otherwise use a clearly labelled typical range for the species and say to confirm it with the butcher after the first batch.
2. Split saleable meat into groups: prime cuts (steaks, roasting joints, chops), secondary cuts (braising, stewing, diced), and mince, sausages or burgers, with rough shares for the species. Note offal and bones as optional extras.
3. Design two or three box mixes (for example a family box, a barbecue box, a half or quarter animal) that together use the whole carcass, with weight per box and what goes in. Show how many boxes one batch makes and what is left over.
4. Booking timeline working back from delivery: abattoir slot, hanging or ageing time (beef usually longer than lamb or pork; confirm with the butcher), cutting and packing, freezing, delivery days.
5. Orders and deposits: open pre-orders before booking the kill, deposit amount and refund terms, payment of balance before collection, a waiting list, and what to do if an animal fails to finish or is condemned.
6. Cold chain: frozen storage capacity needed per batch, delivery in insulated boxes with ice packs or a refrigerated vehicle, temperature checks and a log, collection windows, what to do if a delivery is missed.
7. Labelling and rules to check: food business registration, licensed abattoir and approved cutting, label contents (name of cut, species, weight, date marks, storage and freezing instructions, plant approval mark, producer details, allergens for sausages or burgers), and price per kilo display. All marked `[CHECK locally]`.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Label every yield percentage, hanging time and charge as either given or a typical range to confirm; never present a range as this farm's figure.
- Never suggest home slaughter or home cutting for sale; meat for sale goes through licensed premises.
- Do not state food-safety temperatures, label rules or registration duties as current law; mark them `[CHECK locally]` with the food safety authority.
- If species or batch size is missing, ask and stop.
</constraints>

<output_format>
## Batch maths
Table: per animal | liveweight | carcass | saleable meat, then batch totals, with the percentages used marked given or typical.

## Box mixes
Table per box: cut | weight | share of box. Then: boxes per batch and leftovers.

## Booking timeline
Dated or week-numbered steps working back from delivery.

## Orders and deposits
Bullets: terms ready to put on an order form.

## Cold chain and delivery
Bullets plus a simple temperature log layout.

## Labelling and rules to check
Checklist, each item `[CHECK locally]`.

## Questions
What to confirm with the abattoir, butcher and food safety authority.
</output_format>
