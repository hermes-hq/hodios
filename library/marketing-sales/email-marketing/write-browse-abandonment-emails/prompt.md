---
schema: 1
id: write-browse-abandonment-emails
kind: prompt
title: Write browse abandonment emails
description: Writes a two-email browse abandonment flow for an online shop, with trigger rules, exclusions for buyers and cart abandoners, helpful content instead of instant discounts, and frequency caps.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [copy, plan, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [browse-abandonment, triggered-flow, product-views, frequency-cap, no-discount]
pairs_with:
  prompts: [write-abandoned-cart-emails, map-email-automation-flows, write-back-in-stock-emails]
args:
  - name: store
    description: What the shop sells, price range, delivery and returns terms, brand voice, and the email platform if known.
    type: text
    required: true
  - name: product_types
    description: The main product types people browse and what usually stops them buying each (sizing, compatibility, price, gifting doubts), plus any helpful content you already have (size guides, reviews, comparison pages).
    type: text
    required: true
  - name: discount_policy
    description: Whether this flow may offer a discount and on what terms, for example "no discount" or "10% only on the second email for first-time visitors".
    type: string
    default: no discount
output_contract:
  format: markdown
  sections: [Flow rules, Exclusions and caps, Emails, Discount stance, Measurement]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build browse abandonment flows: emails to known subscribers who looked at products but did not add anything to the cart. These people are earlier in the decision than cart abandoners, so the email's job is to help them decide, not to push a discount. Three things go wrong: the trigger is too loose (one 5-second view fires an email, which feels like surveillance and floods people); the flow collides with cart abandonment, welcome and campaign emails so the same person gets four emails in a day; and every flow ends in a discount, which teaches customers to browse and wait.

Discount policy: {{discount_policy}}
</context>

<task>
<store>
{{store}}
</store>

<product_types>
{{product_types}}
</product_types>

1. **Flow rules:** trigger on an identified subscriber viewing a product page, with a meaningful-interest filter (for example two or more views of the same product, or one view plus a size or variant selection, within 24 hours). Email 1 about 2-4 hours after the last view; email 2 about 48 hours later only if no purchase, cart or click. Exit on purchase, add to cart or unsubscribe.
2. **Exclusions and caps:** exclude anyone who bought in the last 7-14 days (or the same product ever, for one-time products), anyone in the cart flow, anyone who received a browse email in the last 7-14 days, and contacts without marketing consent. Cap total marketing plus flow emails per person per day (for example two) and set the flow priority below cart abandonment.
3. **Emails:** for each, two subject lines, a preheader, a body of 50-110 words and one call to action. Show the viewed product (name, image, price as dynamic blocks) without saying "we saw you looking". Email 1 answers the likely question for that product type using the user's own content (size guide, compatibility, reviews, delivery and returns). Email 2 offers alternatives (similar items, best sellers in the category) or social proof the user supplied. Give one variation per main product type.
4. **Discount stance:** follow the policy. If a discount is allowed, put it only in email 2, restrict it (first purchase, expiry, excluded items) and say what to watch for (people waiting for it).
5. **Measurement:** placed-order rate and revenue per recipient against a 10% holdout that receives no browse emails, unsubscribes and complaints per send, and when to review (after about 4 weeks or 1,000 recipients).
</task>

<constraints>
- Use only store facts supplied: no invented reviews, ratings, delivery promises or return windows. Mark gaps as [NEEDED: ...].
- No creepy wording that tells people they were tracked; describe the product, not the person's behaviour.
- Do not set up the flow for anonymous visitors whose email you do not have with consent.
- If the store or product types are too vague to know what blocks a purchase, ask one round of questions and stop.
</constraints>

<output_format>
## Flow rules
Trigger, filter, timings and exits as a short table: Step | Timing | Condition.

## Exclusions and caps
Bullets.

## Emails
Email 1 and email 2 with subject lines, preheader, body, call to action and the product-type variations.

## Discount stance
Two to four bullets.

## Measurement
Metrics, holdout and review point.
</output_format>
