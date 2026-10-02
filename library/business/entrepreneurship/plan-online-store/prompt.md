---
schema: 1
id: plan-online-store
kind: prompt
title: Plan an online store launch
description: Plans launching an online store - products and suppliers, platform, unit economics, store pages, payments and shipping, launch marketing and a 90-day plan. Use when starting to sell online.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual, artist]
subject: [ecommerce]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [shop-launch, dropshipping, fulfilment, contribution-margin, store-setup]
pairs_with:
  prompts: [model-unit-economics, plan-inventory, find-first-customers]
  personas: [small-business-advisor]
args:
  - name: products
    description: What you plan to sell, how you make or source it, rough costs per unit, who buys it, and any sales so far (markets, Instagram, friends).
    type: text
    required: true
  - name: budget
    description: Money available to launch and how much time you can give it each week (for example "3k, 15 hours a week").
    type: string
  - name: platform
    description: A platform you already use or prefer (a hosted store builder, a marketplace, a website plugin). Leave empty to get a recommendation.
    type: string
output_contract:
  format: markdown
  sections: [Store concept, Products and sourcing, Platform choice, Unit economics, Store pages, Payments shipping and returns, Legal and admin checks, Launch marketing, 90-day plan, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help first-time sellers launch an online store that makes money on each order. The common mistakes are a broad catalogue with no focus, prices that ignore shipping, payment fees, returns and ad costs, and a launch that assumes traffic will arrive by itself. You plan a focused store, check the margin per order before anything is built, and plan where the first hundred customers will come from.
</context>

<task>
Plan this store.

<products>
{{products}}
</products>
{{#budget}}
Budget and time: {{budget}}
{{/budget}}
{{#platform}}
Preferred platform: {{platform}}
{{/platform}}

1. Store concept: the target customer, the reason to buy here rather than elsewhere, and a launch range of a few hero products. Cut the range if it is too broad for the budget.
2. Products and sourcing: for each product, the sourcing model (make, wholesale, print-on-demand, dropship, private label), minimum order quantities, lead times, sample checks and quality risks. Suggest questions to ask suppliers.
3. Platform choice: compare a hosted store builder, a marketplace and selling through social channels for this case on monthly cost, transaction fees, control, traffic and effort. If the user named a platform, check it fits and say what to watch. Do not quote exact fees; tell the user to check current pricing.
4. Unit economics per hero product: price, cost of goods, packaging, shipping cost versus shipping charged, payment fees, platform fees, expected returns allowance, and contribution margin per order. Then the break-even customer acquisition cost and the orders needed per month to cover fixed costs. Use the user's numbers and mark assumptions.
5. Store pages: home page structure, product page checklist (photos, benefit-led description, size or spec details, shipping and returns summary, reviews), about page, and FAQ.
6. Payments, shipping and returns: payment methods to offer, shipping zones and options, free-shipping threshold logic, packaging, a returns policy, and how orders will be fulfilled day to day.
7. Legal and admin checks: business registration, sales tax or VAT on online sales, consumer rights for distance selling (cancellation periods, refunds), product safety and labelling rules for the category, privacy policy and cookie consent, terms of sale. Phrase these as items to confirm locally.
8. Launch marketing: pre-launch list building, launch week plan, and two or three channels that fit the product and budget (social content, creators, marketplaces, local markets, search, paid ads with a capped test budget), each with the first action.
9. 90-day plan: weekly for the first four weeks, then fortnightly, with targets for traffic, conversion, orders and repeat purchase.
</task>

<constraints>
- Arithmetic must be exact. If a product loses money per order after all costs, say so first and suggest fixes (price, bundle, shipping threshold, cheaper packaging or a different product).
- Do not invent supplier names, platform fees, conversion rates or market data. Mark typical ranges as assumptions to verify.
- Fit the plan to the budget and time; if they are empty, assume a small budget and part-time effort, and say so.
- Legal and tax items are a checklist to confirm with the relevant authority or an accountant, not legal advice.
</constraints>

<output_format>
## Store concept
## Products and sourcing
Table: Product | Sourcing model | MOQ | Lead time | Risks. Then supplier questions.
## Platform choice
Table: Option | Monthly cost | Fees | Control | Traffic | Effort. Then the recommendation.
## Unit economics
Table per hero product, then break-even CAC and monthly orders to cover fixed costs.
## Store pages
## Payments shipping and returns
## Legal and admin checks
Checklist.
## Launch marketing
## 90-day plan
Table: Week | Focus | Targets.
## Questions
</output_format>
