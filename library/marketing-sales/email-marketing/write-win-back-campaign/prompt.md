---
schema: 1
id: write-win-back-campaign
kind: prompt
title: Write a win-back campaign
description: Writes a win-back campaign for lapsed customers or subscribers with segments, a 3-4 email series, offer logic and a sunset rule for those who stay inactive. Use to recover revenue and clean a list.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, copywriter]
requires: [none]
inputs: [text, dataset]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [win-back, re-engagement, list-hygiene, sunset-policy, churn]
pairs_with:
  prompts: [write-abandoned-cart-emails, write-email-sequence, audit-email-deliverability]
  personas: [copywriter]
args:
  - name: business
    description: What you sell, the normal purchase or usage cycle, brand voice, what has changed or improved recently, and any data on why customers lapse (surveys, cancellation reasons, reviews).
    type: text
    required: true
  - name: lapsed_definition
    description: Who counts as lapsed (for example "no purchase in 180 days" or "no opens or clicks in 120 days"), how many contacts that is, and whether they are past buyers, subscribers who never bought, or cancelled subscribers.
    type: text
    required: true
  - name: offer
    description: What you can offer to win them back (discount, credit, free shipping, a free month, a new product) and limits. Optional; the series can run without one.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Segments, Series, Offer logic, Sunset rule, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle marketer who runs win-back and re-engagement programmes. A win-back campaign has two jobs: bring back the people who can still be won, and stop mailing the ones who cannot, because continued sends to unengaged addresses hurt deliverability for the whole list. "Lapsed" must be defined against the business's normal cycle: someone who buys coffee monthly is lapsed after about three cycles, someone who buys a mattress is not lapsed after a year. The strongest win-back emails acknowledge the gap honestly, give a real reason to return (something new, something fixed, something valuable), make returning easy, and let people choose to leave or receive less.
</context>

<task>
Write a win-back campaign.

<business>
{{business}}
</business>

<lapsed_definition>
{{lapsed_definition}}
</lapsed_definition>

{{#offer}}<offer>
{{offer}}
</offer>{{/offer}}

1. **Diagnosis:** check the lapsed definition against the purchase or usage cycle and say if it seems too early or too late. Name the most likely reasons these people lapsed, marking which come from the user's data and which are assumptions.
2. **Segments:** two or three segments that deserve different messages, built from data the user likely has (for example past high-value buyers, one-time buyers, subscribers who never bought, cancelled subscribers by reason). Skip segmentation if the list is small, and say why.
3. **Series:** three or four emails over two to four weeks:
   - Email 1: we have not seen you in a while, here is what is new or improved (real changes only), with an easy way back.
   - Email 2: the strongest reason to return for this segment (best sellers, a solved complaint, social proof supplied by the user), plus the offer if the logic below says so.
   - Email 3: the offer or last call, and a preference choice (fewer emails, specific topics, pause).
   - Email 4 (optional): a clear "should we stop emailing you?" message with one-click options to stay or leave.
   For each: delay, three subject lines, preheader, body, one call to action and the segment variations.
4. **Offer logic:** who gets an offer and when (for example high-value lapsed buyers in email 2, others only in email 3), the size relative to margin if known, expiry, and why it will not train customers to lapse for a discount. If no offer is given, persuade without one.
5. **Sunset rule:** what happens to people who do not engage after the series (for example suppress from regular campaigns, move to a low-frequency list, or remove after a final notice), with the window and the reason (deliverability, cost, consent).
6. **Measurement:** reactivation rate, revenue per recipient, unsubscribe and complaint rates, and a holdout group to measure incremental effect.
</task>

<constraints>
- Use only facts supplied. Do not invent product changes, reviews or survey results; mark gaps with `[NEEDED: …]`.
- No guilt-tripping, fake urgency or misleading subject lines ("Your account will be deleted" unless true).
- Opens are unreliable because of privacy features; base engagement rules on clicks, purchases or logins where possible, and say so.
- Respect consent: only email people with a valid basis to receive marketing, and make unsubscribing easy in every email.
</constraints>

<output_format>
## Diagnosis
Bullets: definition check, likely lapse reasons (data or assumption).

## Segments
A table: Segment | Definition | Size if known | Message angle.

## Series
For each email: delay, subject options, preheader, body, call to action, segment variations.

## Offer logic
Bullets.

## Sunset rule
The rule, the window and the reason.

## Measurement
Metrics, the holdout and when to review.
</output_format>
