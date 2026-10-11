---
schema: 1
id: plan-garage-sale
kind: prompt
title: Plan a garage or yard sale
description: Plans a garage or yard sale from start to finish - what to sell there versus online, pricing, local rules, signs and listings, layout, cash and payment safety, and clearing what is left.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [garage-sale, yard-sale, selling-secondhand, price-stickers, decluttering-sale, community-sale]
pairs_with:
  prompts: [plan-decluttering, dispose-of-household-items, buy-secondhand-safely, organise-garage-or-shed]
args:
  - name: items
    description: What you want to sell (types and rough amounts, any valuable or large items), and your goal (clear space fast or make as much as possible).
    type: text
    required: true
  - name: situation
    description: Country and area type (suburb, apartment block, rural), date or season in mind, helpers available, whether neighbours might join, and space (driveway, garage, lawn). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Sort your items, Rules and timing, Pricing, Signs and listings, Layout and the day, Payments and safety, Leftovers, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone run a garage or yard sale that actually clears their stuff. What experienced sellers know: the goal decides the pricing. Garage sale buyers expect bargains, so low prices and willingness to bundle clear the most; valuable items (furniture in good condition, electronics, collectables, tools, branded baby gear) often fetch more listed online separately. Most buyers come early, so the first hours sell the most and early birds will arrive before the start time. Some places require a permit or limit how many sales a home can hold, and many restrict where signs can go. Safety items need care: car seats past their expiry date or with unknown history, cribs and cots that do not meet current standards, and recalled products should not be sold. Cash handling is where people lose money: a small float in small notes and coins, money kept on a person not in an unattended box, and payment-app transfers confirmed in the app rather than from a screenshot. A plan for the leftovers (donation drop-off or pickup booked in advance) stops the boxes going back into the garage.

Items: {{items}}
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. Sort the items into: sell at the sale, sell online separately (and why), donate or recycle without trying, and do not sell (safety or recall concerns), based on what they listed.
2. Rules and timing: check local permit, HOA or building rules and signage rules (with "check with your council, city or building management"); pick a day and start time; consider a joint street or block sale for more buyers; a weather backup.
3. Pricing: a simple pricing approach for their goal, coloured dots or price stickers, bundles and "fill a bag" deals, a haggling stance, and when to cut prices (for example half price after midday).
4. Advertising: sign wording (big, few words, arrows, date), where to post online listings and what to include (photos of the best items, start time, "no early birds" if wanted), and taking signs down afterwards.
5. Layout and the day: tables at waist height, clothes on rails, electrics with a socket to test, a checkout spot near the exit, helpers' roles, keeping the house locked and the bathroom off-limits, and a float.
6. Payments and safety: cash handling, confirming app payments, large items collected on the day, and not letting strangers into the house.
7. Leftovers: donation pickup or drop-off booked ahead, what charities often will not take, and responsible disposal for the rest.
8. Give a timeline from two weeks before to the day after.
</task>

<constraints>
- Do not invent local permit rules, fees, or charity names; tell them to check locally.
- Do not suggest selling recalled, expired or unsafe items such as old car seats or non-compliant cots.
- Do not give specific price figures as fact for items; give relative guidance and suggest checking recent sold listings for valuable items.
</constraints>

<output_format>
## Sort your items
## Rules and timing
## Pricing
## Signs and listings
## Layout and the day
## Payments and safety
## Leftovers
## Timeline
Table: When | Task.
</output_format>
