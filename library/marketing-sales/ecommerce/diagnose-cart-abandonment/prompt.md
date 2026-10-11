---
schema: 1
id: diagnose-cart-abandonment
kind: prompt
title: Diagnose cart and checkout abandonment
description: Finds why shoppers leave a live store's cart and checkout from step-by-step funnel data and a test-purchase walkthrough, ranks causes (surprise costs, account walls, payment, errors, trust) and fixes.
category: ecommerce
version: 1.0.0
status: incubating
stage: [review, operate]
role: [founder, marketer, product-manager]
subject: [ecommerce]
requires: [none]
inputs: [dataset, notes]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cart-abandonment, checkout-funnel, checkout-errors, shipping-costs, guest-checkout, conversion-rate]
pairs_with:
  prompts: [design-checkout-flow, write-abandoned-cart-emails, optimize-product-page-conversion, set-free-shipping-threshold]
  personas: [online-store-manager]
args:
  - name: funnel
    description: Step-by-step numbers for a recent period - sessions with add to cart, checkout started, contact or shipping step, delivery method, payment step, orders - split by device if possible, plus a comparison period.
    type: text
    required: true
  - name: checkout
    description: How the checkout works today - platform, steps, whether guest checkout exists, when shipping and tax appear, payment methods, discount code field, any recent changes - and notes from your own test purchase.
    type: text
    required: true
  - name: feedback
    description: Customer messages, exit survey answers, payment decline reasons or error logs, if you have them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Funnel reading, Walkthrough findings, Likely causes, Fixes in order, Tests and tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a checkout conversion specialist. Published research puts average cart abandonment around 70 percent, and much of it is people browsing or saving items for later, so the goal is not zero; the goal is to find the avoidable drop-off. Shoppers who reached checkout most often leave because of extra costs shown late (shipping, tax, fees), being forced to create an account, delivery that is too slow or unclear, not trusting the site with card details, a long or confusing form, being unable to see the total up front, errors or crashes, an unattractive returns policy, and missing preferred payment methods.

The funnel tells you where to look. A big drop from cart to checkout start points to costs or trust on the cart page; from the shipping step, to delivery costs and times revealed there; from the payment step, to missing methods, declines, 3-D Secure failures or a broken payment form. A gap that exists on mobile but not on desktop usually means a layout, keyboard or wallet problem. A sudden change after a date usually means a release, an app or a payment configuration change. A visible discount code field sends shoppers off to search for codes.

Nothing replaces a real test purchase on a phone, with a new account and with a guest, through each payment method and to a few addresses.
</context>

<task>
Diagnose the abandonment.

<funnel>
{{funnel}}
</funnel>

<checkout>
{{checkout}}
</checkout>

{{#feedback}}
<feedback>
{{feedback}}
</feedback>
{{/feedback}}

1. If the funnel has only one overall abandonment figure, explain which step-level numbers to pull and where, then continue with what can be learned from the checkout description.
2. Read the funnel: drop-off rate at each step, by device, against the comparison period. Name the step with the largest avoidable loss.
3. Go through the checkout description and test notes step by step, and list every friction point you can see (when total cost appears, forced account, field count, address lookup, errors, payment options, trust signals, delivery promise).
4. Rank the likely causes by how well they fit the weakest step and the evidence, marking each as supported or hypothesis.
5. Recommend fixes in order of impact and effort, starting with anything broken.
6. Set up the tests and tracking: which fixes to A/B test and which to just ship, the metric per step, a test purchase checklist to repeat after every change, and how long to wait for a readable result at this traffic.
</task>

<constraints>
- Do not treat the overall abandonment rate as the problem; locate the step.
- Do not invent benchmark figures per step; use the comparison period or label any benchmark as a rough published range.
- Fix broken things before testing optimisations.
- Do not recommend dark patterns (hidden costs revealed late, pre-ticked add-ons, fake countdown timers, confirm-shaming).
</constraints>

<output_format>
## Funnel reading
A table: Step | Users | Drop-off | Mobile | Desktop | Change from comparison, then the weakest step.

## Walkthrough findings
A checklist of friction points by checkout step.

## Likely causes
Ranked, with evidence and supported or hypothesis.

## Fixes in order
A table: Fix | Cause it addresses | Impact | Effort | Ship or test.

## Tests and tracking
Metrics per step, the test purchase checklist, and the test duration estimate.
</output_format>
