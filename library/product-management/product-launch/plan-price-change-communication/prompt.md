---
schema: 1
id: plan-price-change-communication
kind: prompt
title: Plan a price change communication
description: Plans how to communicate a price change, covering impact by segment, grandfathering options, notice timeline, the customer email, support macros, account talk tracks and churn monitoring.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, founder, marketer, executive]
subject: [saas]
requires: [none]
inputs: [text, dataset]
output: [plan, message, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [price-increase, grandfathering, customer-communication, churn-monitoring, support-macros]
pairs_with:
  prompts: [design-pricing, analyze-cancellation-feedback, write-launch-faq]
  personas: [product-marketing-manager]
args:
  - name: change
    description: The price or packaging change - old and new prices or limits per plan, effective date if decided, and who it applies to.
    type: text
    required: true
  - name: customer_segments
    description: Customer counts and revenue by plan, billing cycle (monthly or annual), tenure, region and account size, plus any contract terms on pricing. Optional.
    type: text
  - name: rationale
    description: The honest reason for the change (for example added value, rising costs, aligning price with usage) and what customers get now that they did not before. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Impact by segment, Grandfathering options, Timeline, Customer email, In-product and web copy, Support macros, Account talk track, Churn monitoring, Risks and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product and pricing lead who has run several price changes. Price increases cause the most damage when customers learn about them from an invoice, when the reason sounds like corporate spin, when long-standing customers feel punished, when support has no answers, and when nobody watches churn closely afterwards. Price changes that go well give generous notice, explain the reason honestly in terms of value, treat segments differently where impact differs, make the options clear (including how to downgrade or leave), and monitor the effect with a plan to respond.
{{#customer_segments}}

Customer segments:

<customer_segments>
{{customer_segments}}
</customer_segments>
{{/customer_segments}}
{{#rationale}}

Rationale:

<rationale>
{{rationale}}
</rationale>
{{/rationale}}
</context>

<task>
Change:

<change>
{{change}}
</change>

1. Summarise the change and the communication strategy in three sentences.
2. Assess impact by segment: old price, new price, absolute and percentage change, number of customers and revenue affected (from the input), and churn risk (higher for large percentage increases, low-usage accounts, price-sensitive plans and monthly billing). If segment data is missing, list what to pull and continue with the structure.
3. Compare grandfathering options: none; time-limited (old price for a stated period); permanent for existing customers; a stepped increase over several renewals; or offering a plan that preserves the old price with fewer features. For each, the revenue effect, the fairness perception and the operational cost. Recommend one, possibly different per segment.
4. Build the timeline relative to the effective date (E): decision and internal briefing, support and sales enablement, notice to customers with annual contracts or high spend first, general notice, reminders, effective date, first renewals at the new price, and review points. Recommend notice periods (commonly at least 30 days for monthly plans and at least one renewal cycle or the contractual notice for annual plans) and state that contract terms and consumer protection rules in the relevant regions must be checked before setting dates.
5. Draft the main customer email: a clear subject line, the change and the date in the first two sentences, the honest reason and the value customers get, what it means for them specifically (with merge fields such as [current_price], [new_price], [effective_date]), their options (stay, change plan, switch billing cycle, cancel), and how to ask questions. No euphemisms like "price update" for an increase without saying it is an increase.
6. Write in-product and web copy: a banner or notice for affected users and a pricing page note.
7. Write four to six support macros for the most likely questions: why the price is going up, can I keep my old price, can I get a discount, how do I downgrade or cancel, will it go up again, and an angry reply.
8. Write a talk track for account managers of large or strategic accounts, including what exceptions they can and cannot offer, and who approves them.
9. Plan churn monitoring: metrics (cancellations, downgrades, failed renewals, support contacts, refund requests, sentiment), the baseline period, thresholds that trigger a review, cadence for the first 90 days, and the actions available (extended grandfathering, targeted offers, revisiting packaging).
10. List risks and pre-send checks: billing system configured and tested, emails tested with merge fields, legal review of terms and notice, sales and support briefed, and contradictions removed from public pages.
</task>

<constraints>
- Be honest: never describe a price increase as anything else, and never imply the change is forced on you if it is not.
- Do not invent customer counts, revenue, churn rates or legal notice requirements. Mark assumptions and recommend a legal review rather than giving a legal opinion.
- Every customer must be able to find how to downgrade or cancel easily; no obstruction.
- Keep the customer email under about 200 words.
</constraints>

<output_format>
## Summary

## Impact by segment
Table: segment | old | new | change (abs, %) | customers | revenue | churn risk.

## Grandfathering options
Table: option | revenue effect | fairness | operational cost. Then the recommendation per segment.

## Timeline
Table: when (relative to E) | action | audience | owner.

## Customer email
Subject line and body.

## In-product and web copy
The banner and the pricing page note.

## Support macros
Each with a title and the reply.

## Account talk track
Bullets, including allowed exceptions and approver.

## Churn monitoring
Table: metric | baseline | threshold | cadence | response.

## Risks and checks
A checklist.
</output_format>
