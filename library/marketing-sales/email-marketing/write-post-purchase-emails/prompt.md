---
schema: 1
id: write-post-purchase-emails
kind: prompt
title: Write a post-purchase email flow
description: Writes a post-purchase email flow (confirmation, getting value, check-in, review request, cross-sell or replenishment) with triggers, timing, suppression rules and metrics.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [post-purchase, lifecycle-email, email-flow, review-request, repeat-purchase]
pairs_with:
  prompts: [write-email-sequence, write-abandoned-cart-emails, write-win-back-campaign, request-customer-testimonials]
  personas: [copywriter]
args:
  - name: product_and_customer
    description: What you sell, typical order value, how long delivery takes, how and when customers start using the product, how long before they could reorder, common problems or questions after purchase, related products, your review platform, and your email platform if relevant.
    type: text
    required: true
  - name: store_voice
    description: How the brand sounds (for example "warm and expert, never cutesy", "short and dry"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Flow map, Emails, Branching and suppression, Metrics, Information still needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle email marketer for online stores. The weeks after a first purchase decide whether a customer buys again: they need reassurance that the order is on its way, help getting value from the product, a chance to raise a problem before it becomes a return or a bad review, and a well-timed reason to come back. Each email's timing follows the customer's experience of the product, not the store's calendar: a review request before the product has been used is wasted, and a replenishment reminder before the product runs out is noise.

Transactional emails (order and shipping confirmations) should stay transactional, so they stay deliverable and do not need marketing consent; promotional content belongs in later emails sent only to customers who can receive marketing.
</context>

<task>
Write a post-purchase email flow for this store.

<product_and_customer>
{{product_and_customer}}
</product_and_customer>

{{#store_voice}}Voice: {{store_voice}}{{/store_voice}}

1. If you cannot tell what the product is, how long delivery takes, or how soon a customer uses it, ask in one message and stop. Fill other gaps with labelled assumptions.
2. Map the customer's timeline: order, dispatch, delivery, first use, the point the result shows, and when they could run out or need an accessory. Time each email to a moment on this timeline.
3. Design the flow, usually five or six emails:
   - Order confirmation (transactional): what they bought, what happens next and when, how to get help. At most a light brand touch.
   - Shipping or "getting ready" (if the platform's notifications do not cover it): set expectations and prepare them to use the product.
   - Get value: timed for just after delivery; the one thing to do first, the most common mistake and how to avoid it, a link to a guide or video.
   - Check-in: asks how it is going and makes it easy to get help; replies go to a real inbox.
   - Review request: after the customer has had time to see a result; one click to the review form; asks every customer, not only happy ones.
   - Cross-sell or replenishment: timed to the usage cycle; one relevant product or a reorder, with the reason it helps.
4. Write each email: trigger and delay, three subject lines under about 45 characters, a preheader, the body (short, scannable, one main call to action) and the call-to-action text.
5. Add branches: first-time versus repeat customers, and any product categories that need a different "get value" email.
6. Define suppression and exit rules and the metrics to watch per email.
</task>

<constraints>
- Use only product facts, policies and timings supplied; mark gaps [NEEDED: …].
- Do not filter review requests to likely-positive customers or offer rewards for positive reviews; most review platforms and consumer protection rules forbid it. If an incentive is offered, it must be for any honest review and disclosed.
- Marketing emails (cross-sell, replenishment offers) go only to customers with marketing consent or a lawful basis such as a soft opt-in where the user's market allows it; note this rather than ruling on the law.
- No fake urgency or scarcity. Discounts only if the user supplied them.
- Keep every email focused on one job; no newsletter-style digests.
</constraints>

<output_format>
## Flow map
A table: # | Email | Trigger and delay | Job | Transactional or marketing.

## Emails
Each email with trigger, subject lines, preheader, body and call to action.

## Branching and suppression
Branches, exit rules (refund, return, open support ticket, unsubscribe, repeat purchase), and which emails pause for whom.

## Metrics
Per email: the metric that shows it works and a sensible alert.

## Information still needed
Placeholders and assumptions to confirm. Write "None" if complete.
</output_format>
