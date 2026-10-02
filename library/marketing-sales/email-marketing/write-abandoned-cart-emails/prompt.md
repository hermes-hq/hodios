---
schema: 1
id: write-abandoned-cart-emails
kind: prompt
title: Write abandoned cart emails
description: Writes an abandoned-cart email series with send timing, subject lines, objection handling, incentive rules, exit conditions and plain-text versions. Use for e-commerce stores.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
subject: [ecommerce]
stack: [shopify]
requires: [none]
inputs: [text, spec]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [abandoned-cart, cart-recovery, lifecycle-marketing, email-automation]
pairs_with:
  prompts: [write-email-sequence, write-promo-email, write-win-back-campaign]
  personas: [copywriter]
args:
  - name: store
    description: What the store sells, average order value and margin, brand voice, shipping costs and times, the returns policy, guarantees, and real proof (review rating and count, press).
    type: text
    required: true
  - name: products
    description: Typical carted products and the common reasons people hesitate (price, sizing, shipping cost, delivery time, trust, comparing options). Optional.
    type: text
  - name: incentive_policy
    description: Whether you will offer an incentive (discount, free shipping, gift), how much, and any limits (first-time buyers only, minimum order). Optional; no incentive if empty.
    type: text
    default: no incentive
output_contract:
  format: markdown
  sections: [Flow, Emails, Incentive rules, Setup and measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce retention marketer. People abandon carts for ordinary reasons: they were distracted, comparing prices, surprised by shipping costs, unsure about size or fit, not ready to pay, or did not trust the store yet. A good recovery series reminds first, then answers the likely objection, and offers an incentive last and only when the policy allows, because discounting the first email trains customers to abandon on purpose and gives away margin to people who would have bought anyway. Every email shows the actual cart contents and links straight back to a restored cart.
</context>

<task>
Write an abandoned-cart email series for this store.

<store>
{{store}}
</store>

{{#products}}<products>
{{products}}
</products>{{/products}}
Incentive policy: {{incentive_policy}}

1. **Flow:** three emails as a default (adjust and explain if the store's price point or buying cycle suggests otherwise), for example:
   - Email 1, about 1 hour after abandonment: a helpful reminder with the cart and one reassurance.
   - Email 2, about 24 hours: answer the most likely objection for these products (shipping, returns, sizing, proof from reviews, how it works).
   - Email 3, about 48 to 72 hours: last reminder, with the incentive only if the policy allows; otherwise a reason to decide (stock levels only if true, popular alternatives, a direct reply option).
   State the trigger (checkout started with an email captured), the exit conditions (purchase, unsubscribe, a new cart replacing this one), and frequency limits (no more than one series per customer in a set period, for example 14 days).
2. **Emails:** for each one, three subject line options, a preheader, the body with a placeholder for the dynamic cart block (`{cart_items}`), one primary call to action that returns to the restored cart, and a plain-text version.
3. **Incentive rules:** when the incentive appears, who gets it (for example first-time customers only, not people who abandoned in the last 30 days), code expiry, and how to keep it from leaking. If no incentive is allowed, say how the series persuades without one.
4. **Setup and measurement:** the platform settings to check, what to A/B test first, and the metrics (recovered revenue per recipient, recovery rate, incremental revenue against a small holdout).
</task>

<constraints>
- Use only facts supplied about shipping, returns, guarantees and reviews; use `[NEEDED: …]` placeholders for anything missing.
- No fake urgency: do not claim low stock, expiring carts or price rises unless they are true.
- Short emails: the first one under about 80 words of body copy. Friendly and helpful, never guilt-tripping or creepy ("We saw you looking…" is acceptable; detailed browsing surveillance is not).
- Include an unsubscribe link and the store's postal address placeholder in each email, and note under setup that sending these emails to people who have not consented to marketing depends on local law (for example stricter consent rules in the EU and UK) and should be checked.
</constraints>

<output_format>
## Flow
A table: Email | Delay | Job | Incentive | Exit if. Then trigger and frequency rules.

## Emails
For each email: subject options, preheader, body, call to action, plain-text version.

## Incentive rules
Bullets.

## Setup and measurement
Bullets, including the first test and the metrics.
</output_format>
