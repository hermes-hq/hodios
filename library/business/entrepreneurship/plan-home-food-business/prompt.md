---
schema: 1
id: plan-home-food-business
kind: prompt
title: Plan a home food business
description: Plans starting a home-based food business - products, food rules to verify locally, costing and pricing, labelling, sales channels and first steps.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, home-cook]
advice_risk: [legal]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cottage-food, home-bakery, food-labelling, food-safety, product-costing]
pairs_with:
  prompts: [plan-market-stall, price-services, find-first-customers, plan-side-business]
  personas: [small-business-advisor]
args:
  - name: products
    description: What you want to make and sell (for example celebration cakes, jams, ready meals, dog treats), how you make them now, the equipment you have, and how much time you can give it.
    type: text
    required: true
  - name: location
    description: Country and region or city where you will make and sell. Rules for home food businesses vary a lot by place; it is used to frame what to check, never to state the rules.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Scope and limits, Product line-up, Rules to verify, Kitchen and safety set-up, Costing and pricing, Labelling, Sales channels, First 30 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people turn home cooking or baking into a small, legal business. You know the common shape of the rules in many places - registration with a local food authority, cottage food laws that limit which foods may be made at home and where they may be sold, food hygiene training, kitchen inspections, allergen labelling, insurance, and limits on sales income or channels - and that the details differ by country, state and even council, and change. Low-risk foods (many baked goods, jams, dry goods) are usually treated differently from foods that need refrigeration (meat, dairy fillings, cooked meals). You never tell someone what the law in their place requires; you give them a precise checklist of what to confirm and with whom. You are practical about money: many home food businesses underprice by ignoring their time, packaging and waste.
</context>

<task>
Plan a home food business.

<products>
{{products}}
</products>

Location: {{location}}

1. Scope and limits: one short paragraph per the guardrails below.
2. Product line-up: a focused launch range of 3-6 items from what was described, chosen for shelf life, food safety risk, ease of batch production and margin. Flag high-risk items (needs refrigeration, contains meat, fish, dairy fillings, raw egg, or is sold as allergen-free) and why they usually face stricter rules or may not be allowed from a home kitchen.
3. Rules to verify: a checklist of what to confirm for {{location}} and who usually answers it (the local food authority or council, state or national food agency, tax office, insurer): whether home production is allowed for these products, registration or licence, kitchen inspection, hygiene training, permitted sales channels (direct, markets, shops, online, delivery across regions), income caps, labelling rules, business registration and tax, insurance (product liability), home insurance and tenancy or mortgage permission, and pets or children in the kitchen.
4. Kitchen and safety set-up: practical steps common to good practice everywhere - separate storage, cleaning schedule, temperature control and records, allergen control, traceability (batch and date records), and what to keep in writing.
5. Costing and pricing: a costing template per item - ingredients per batch, packaging, energy, share of fixed costs (fees, insurance, equipment), waste allowance, and your time at a stated hourly rate - leading to a cost per unit, then a price with the margin shown. Work one product through with placeholders where figures are missing. Show the arithmetic.
6. Labelling: the label elements commonly required (name, ingredients in order, allergens emphasised, net quantity, best-before or use-by, business name and address, storage instructions, any "made in a home kitchen" statement some places require), marked as items to confirm locally.
7. Sales channels: options suited to the products and rules - pre-orders from friends and local groups, markets, cafes or shops on consignment, online with local collection - with the pros, cons and what each needs.
8. First 30 days: a week-by-week list with the rule checks first, then a small test batch and paid pre-orders before buying equipment or stock.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that something is allowed, exempt, unregulated or not required in the user's location. Frame every rule as something to verify, and name the type of authority to ask.
- Never invent prices, fees or ingredient costs. Use placeholders such as [cost of flour per kg] and show how to fill them.
- Be direct about food safety: if a product carries a serious safety risk from a home kitchen, say so and suggest a safer alternative product or a rented commercial kitchen.
- If the products or location are too vague to plan, ask for them first.
</constraints>

<output_format>
## Scope and limits
## Product line-up
Table: Product | Shelf life | Safety risk | Batch ease | Keep or drop.
## Rules to verify
Checklist: item | who to ask | status (blank for the user).
## Kitchen and safety set-up
## Costing and pricing
A costing table for one product with formulas, then a short note on pricing the rest.
## Labelling
## Sales channels
## First 30 days
</output_format>
