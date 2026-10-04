---
schema: 1
id: write-back-in-stock-emails
kind: prompt
title: Write back in stock emails
description: Writes back-in-stock and low-stock alerts for people who asked to be notified, with fair first-come wording, true quantities, a sold-out-again follow-up and subject lines that say what is back.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [copy, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [back-in-stock, waitlist, restock-alert, staggered-send, honest-scarcity]
pairs_with:
  prompts: [write-collection-drop-emails, write-browse-abandonment-emails, map-email-automation-flows]
args:
  - name: product
    description: What is back - product name, variants or sizes restocked, price, any purchase limit, whether it is online, in store or both, and how many people are on the waitlist.
    type: text
    required: true
  - name: store_name
    description: The shop's name as customers know it.
    type: string
    required: true
  - name: stock_level
    description: How many units came back, per variant if possible (for example "60 units, 12 in size S"). Optional; without it the emails avoid quantity claims.
    type: string
output_contract:
  format: markdown
  sections: [Send plan, Emails, Fairness rules, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write restock alerts for {{store_name}}. People on a waitlist asked for this email, so it is the most welcome message a shop sends, and also the easiest to get wrong. When 2,000 people are told at once about 50 units, most of them hit a sold-out page and feel tricked. Vague subject lines ("Good news!") get missed. And "low stock" warnings are often invented, which customers notice. A good alert says exactly what is back in the subject line, is honest about quantities, sends in a fair order when demand outstrips stock, and looks after the people who still miss out.
</context>

<task>
<product>
{{product}}
</product>

{{#stock_level}}Stock: {{stock_level}}{{/stock_level}}

1. **Send plan:** compare waitlist size with units. If the waitlist is less than about three times the stock, notify everyone at once. If it is larger, send in batches in sign-up order (earliest first), with gaps of 1-2 hours and a pause rule when stock falls below the next batch's likely demand. Send per variant: only notify people waiting for the size or colour that came back.
2. **Back-in-stock email:** two subject lines that name the product and variant ("The linen shirt in size M is back"), a preheader with price or limit, a 40-90 word body, one "Buy now" or "Reserve in store" button, and the purchase limit if any.
3. **Low-stock email** (only if stock data supports it, for example under 20% of the restock left after 24 hours): to waitlisters who did not buy, with the true remaining level in words ("fewer than 10 left in M").
4. **Sold-out-again email:** to those who missed it: an apology without drama, whether they stay on the list automatically, the next expected restock only if known, and one alternative product if the user gave one.
5. **In-store variant:** if the product is in a physical shop too, a version with hold or reserve instructions.
</task>

<constraints>
- Do not invent quantities, restock dates or limits. Without stock data, use no quantity claims at all.
- Never send a low-stock email that is not true, and never countdown timers.
- Only email people who joined the waitlist or otherwise agreed to receive these alerts.
- If the product name or which variants returned is unclear, ask and stop.
</constraints>

<output_format>
## Send plan
Rule chosen (all at once or batches), batch size and gaps if batching, per-variant targeting.

## Emails
Back-in-stock, low-stock (or "Skip: no stock data"), sold-out-again and in-store variant (or "Not needed"), each with subject lines, preheader, body and button.

## Fairness rules
Bullets: order of sending, limits, what waitlisters are told.

## Checks
Checklist: links go to the right variant, inventory sync, limit applied in checkout, waitlist cleared for buyers.
</output_format>
