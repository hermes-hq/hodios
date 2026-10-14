---
schema: 1
id: write-welcome-series
kind: prompt
title: Write a welcome email series for new subscribers
description: Writes a three to five email welcome series that takes a new shop or business subscriber from the sign-up promise to a first purchase, with incentive rules, timing and exits.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [welcome-flow, first-purchase, lifecycle-marketing, email-automation, sign-up-incentive]
pairs_with:
  prompts: [write-double-opt-in-emails, write-abandoned-cart-emails, map-email-automation-flows]
args:
  - name: business
    description: What the business sells, price range and margin, brand voice, what makes it different, and real proof (review rating and count, press, guarantees, returns policy).
    type: text
    required: true
  - name: signup_promise
    description: What people were promised when they signed up (a discount code, a guide, early access, "news and offers") and where they signed up (popup, checkout, footer, quiz).
    type: text
    required: true
  - name: bestsellers
    description: Bestsellers or best starting products and the common questions or doubts new customers have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Series map, Emails, Incentive and exit rules, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retention marketer writing the welcome series for a shop or small business. The welcome series is usually the highest-earning automated email a business has, because new subscribers are at peak interest for a few days. What experienced marketers know: the first email must deliver exactly what the sign-up form promised, immediately, or trust drops and the code gets hunted for in the spam folder. After that, each email has one job (story, proof, help choosing, objection, last reminder of the offer), and people who buy must leave the "persuade to buy" part of the series straight away, or new customers get "still thinking about it?" emails after paying. Discount codes need an honest expiry and rules, or they leak to coupon sites and train everyone to wait for a code.
</context>

<task>
Write a welcome series for this business.

<business>
{{business}}
</business>

Sign-up promise and source: {{signup_promise}}
{{#bestsellers}}
<bestsellers>
{{bestsellers}}
</bestsellers>
{{/bestsellers}}

1. **Series map:** choose three to five emails and justify the number from the price point and buying cycle (an impulse product needs fewer and faster emails; a considered purchase needs more help choosing). For each: send delay, the single job, the call to action, and whether it goes to buyers, non-buyers or both.
2. **Email 1** sends immediately and delivers the promise in the first lines (the code, the guide link, the access), then sets expectations: what they will receive and roughly how often.
3. **Later emails:** brand story or why it exists, real proof, help choosing (bestsellers or a short guide by need), the most common doubt answered with supplied facts, and a final reminder before the code expires if there is one.
4. For every email write two or three subject lines, a preheader, the body, one primary call to action and a short plain-text version.
5. **Incentive and exit rules:** code expiry and reminder timing, one use per customer, what happens to buyers (move them to a post-purchase flow), how to stop overlap with abandoned-cart or browse flows, and what happens if someone is already a customer when they sign up.
6. **Measurement:** what to watch (placed-order rate from the series, revenue per recipient, unsubscribe and complaint rate per email), and the first test to run.
</task>

<constraints>
- Use only the facts supplied about products, reviews, guarantees and policies. Mark anything missing as `[NEEDED: ...]` instead of inventing it.
- No fake urgency: only state a code expiry or stock limit that is real.
- Keep each email short and readable on a phone; one main call to action per email.
- Every email has an unsubscribe link and a postal address placeholder. Add one line telling the user to check the consent and unsubscribe requirements that apply where their subscribers live; do not state legal rules as fact.
</constraints>

<output_format>
## Series map
A table: Email | Send delay | Job | Call to action | Goes to.

## Emails
For each email: subject options, preheader, body, call to action, plain-text version.

## Incentive and exit rules
Bullets.

## Measurement
Bullets, including the first test.
</output_format>
