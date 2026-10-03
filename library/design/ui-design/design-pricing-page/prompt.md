---
schema: 1
id: design-pricing-page
kind: prompt
title: Design a pricing page
description: Designs a pricing page layout with plan cards, a recommended plan, billing toggle, comparison table, FAQs and trust signals, plus copy slots and what to test. Use for SaaS and subscriptions.
category: ui-design
version: 1.1.0
status: incubating
stage: [design]
role: [designer, product-manager, marketer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [pricing-page, plan-comparison, conversion, subscription, page-layout]
pairs_with:
  prompts: [write-landing-page-copy, review-design-for-dark-patterns, run-willingness-to-pay-study, create-wireframe-spec]
  personas: [product-designer, ux-writer]
args:
  - name: plans_and_prices
    description: Each plan with its name, monthly and annual prices, currency, what is included and its limits, trial or free tier terms, cancellation terms, and which plan the business wants most people on.
    type: text
    required: true
  - name: audience
    description: Who visits the page and how they buy (self-serve, sales-assisted, procurement), if not obvious from the plans. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Page goals, Page structure, Plan cards, Billing toggle, Comparison table, FAQ, Trust signals, Mobile and accessibility, Copy slots, What to test]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Adapts the page to usage-based pricing with a rate table, a cost calculator and worked monthly bills."}
---
<context>
You are a product designer who has designed and tested pricing pages for subscription products. Visitors arrive with one question: which plan is right for me, and what will I actually pay? Pages fail when plan cards list 25 features each so differences disappear, when the "annual" price is shown per month without the total billed, when every plan says "Most popular", when the enterprise plan hides all information behind a form, and when taxes, seat minimums or renewal terms surface only at checkout. A clear page helps people choose, and a well-chosen plan reduces refunds and churn as well as raising conversion.
</context>

<task>
<plans_and_prices>
{{plans_and_prices}}
</plans_and_prices>
{{#audience}}

Audience: {{audience}}
{{/audience}}

If prices, what each plan includes, or the currency are missing, ask for them and stop.

Fit the page to the pricing model. For usage-based or pay-as-you-go pricing, replace plan cards with a rate table and a cost calculator, add two or three worked monthly bills for typical usage levels (computed from the given rates, free allowance first), and skip the billing toggle. If there is no annual option, skip the toggle and say so. Leave out any section that does not apply rather than forcing it.

1. **Page goals.** The primary conversion (start trial, buy, contact sales), the plan the business wants to steer to and whether that is also the right plan for most visitors, and the questions visitors bring.
2. **Page structure.** The sections in order with the purpose of each: headline and subhead, billing toggle, plan cards, logos or social proof, comparison table, FAQ, final call to action. Say what sits above the fold on desktop.
3. **Plan cards.** Three or four cards at most (enterprise can be a card or a strip). For each: plan name, who it is for in one line, price display, primary call to action with exact wording, three to five differentiating inclusions ("Everything in Starter, plus…"), and limits that matter. Mark a recommended plan only if it fits most visitors, and say why. Specify the visual emphasis (border, label, position) without hiding the other plans.
4. **Billing toggle.** Default state and why, how the saving is expressed (a percentage or months free, computed from the given prices with the working shown), and the price display rule: when annual is selected, show the monthly equivalent and the amount billed per year ("€16/month, billed €192 yearly"). Taxes: say whether prices include tax.
5. **Comparison table.** Feature groups, which rows to include (only those that differ or that buyers ask about), how limits are written (numbers, not just ticks), tooltips for jargon, a sticky plan header with calls to action, and an expand control if it is long.
6. **FAQ.** Six to ten questions buyers actually ask (billing, trial, cancellation, plan changes, refunds, seat or usage limits, data, security, payment methods, invoices). Draft answers only from the given terms; otherwise write [confirm: …].
7. **Trust signals.** What to show and where: customer logos or reviews (only real, with permission), security and compliance badges the company actually holds, guarantees, contact options.
8. **Mobile and accessibility.** Card order on small screens, how the comparison table collapses (per-plan accordions or a plan switcher), toggle as a labelled radio group or switch with its state announced, ticks and crosses with text alternatives, contrast and focus states.
9. **Copy slots.** A table of every text slot with its purpose, a draft based on the input, and a character limit.
10. **What to test.** Two or three experiments with hypothesis and primary metric (for example default billing period, recommended plan position, comparison table expanded or collapsed).
</task>

<constraints>
- No dark patterns: no pre-selected add-ons, no fake "Most popular" or countdown timers, no hidden renewal price, no "cancel anytime" unless the terms say so, and the cancellation terms are as easy to find as the price.
- Use only the prices and inclusions given; compute savings exactly and show the arithmetic once.
- Do not invent testimonials, customer logos, ratings or certifications; use labelled placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Page goals
## Page structure
Numbered sections with purpose.
## Plan cards
| | Plan A | Plan B | Plan C |
Rows: for whom, price display, CTA, key inclusions, limits, emphasis.
## Billing toggle
## Comparison table
## FAQ
## Trust signals
## Mobile and accessibility
## Copy slots
| Slot | Purpose | Draft | Max characters |
## What to test
</output_format>
