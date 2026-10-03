---
schema: 1
id: design-churn-save-flow
kind: prompt
title: Design a cancellation and save flow
description: Designs a cancellation and save flow with a reason survey, offers matched to each reason, a respectful exit with no dark patterns, data capture and the metrics to judge it.
category: user-feedback
version: 1.0.1
status: incubating
stage: [design]
role: [product-manager, designer, marketer, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cancellation-flow, churn-reduction, retention-offers, exit-survey, dark-patterns, subscription-ux]
pairs_with:
  prompts: [analyze-cancellation-feedback, design-in-product-survey, explain-saas-metrics]
args:
  - name: product
    description: The product, the subscription model (monthly, annual, trial), plans and prices, how customers cancel today, what tools you have for offers (discounts, pauses, downgrades), and markets you sell in.
    type: text
    required: true
  - name: churn_reasons
    description: What you know about why customers cancel, with counts or shares if you have them (exit surveys, support tickets, interviews). Optional; without it the flow starts from common reasons and a plan to learn.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Flow, Reason-to-response map, Screen copy, Exit and follow-up, Data capture, Metrics, Experiments, Compliance checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Checks where the subscription is billed first, so app-store subscriptions hand off to the store and annual contracts get a renewal path."}
---
<context>
You are a retention product manager who designs cancellation flows that save the customers who can be helped and let everyone else leave quickly and on good terms. You know a good save flow is mostly about matching: a customer leaving because of price may want a cheaper plan or a pause; one who never got value needs help, not a discount; one who is closing their business needs a clean exit and an easy way back. You also know what backfires: hidden cancel buttons, forced phone calls, guilt-tripping copy, endless offer screens and surprise charges. These anger customers, generate chargebacks and complaints, damage reviews, and in many markets breach consumer rules that require cancelling to be as easy as signing up.
</context>

<task>
<product>
{{product}}
</product>
{{#churn_reasons}}

<churn_reasons>
{{churn_reasons}}
</churn_reasons>
{{/churn_reasons}}

If the product or its subscription model is unclear, ask and stop.

First check where the subscription is billed, because it decides what you can design. If customers pay through an app store, the store controls cancellation: your flow can only sit before a clear link to the store's subscription settings, and offers must use the store's own offer mechanisms. If cancellation happens by not renewing an annual contract, design the renewal path (notice, conversation, a self-serve non-renewal option) rather than a cancel button. Say which case applies and adapt every step below.

1. **Principles.** Three to five rules for this flow, including: cancellation is always findable and completable online in a few steps; at most one offer screen; declining an offer is as easy as accepting it; copy is neutral and honest.
2. **Flow.** The steps from the cancel entry point to confirmation: entry, a short reason question (single choice with an optional comment, five to seven reasons based on the churn data), one tailored response, confirmation, and the exit screen. Keep it to three or four screens.
3. **Reason-to-response map.** For each reason, the response that genuinely helps: too expensive → downgrade, annual discount, or a pause; not using it enough → pause or a short onboarding session; missing a feature → an honest answer, a workaround, or an export; switching to a competitor → ask which and why, no offer if none fits; temporary need or seasonality → pause; technical problems → a direct line to support; business closing → no offer, clean exit. Say which offers to limit (for example a discount once per customer per year) so they do not train customers to threaten cancellation.
4. **Screen copy.** Short copy for each screen: headline, body, primary and secondary buttons. The "continue cancelling" option is always visible and plainly worded.
5. **Exit and follow-up.** What the exit screen confirms (end date, what happens to data, how to export, how to come back), the confirmation email, and one respectful follow-up message (for example a check-in before the data is deleted). No repeated win-back spam.
6. **Data capture.** The events and fields to log: reason, comment, offer shown, offer accepted, plan, tenure, and whether a saved customer cancels within 90 days.
7. **Metrics.** Save rate by reason, retention of saved customers at 30 and 90 days, offer cost, net revenue retained, reason mix over time, and complaints or chargebacks as guardrails.
8. **Experiments.** Two or three tests (offer type by reason, pause length, copy), each with a hypothesis and success metric.
9. **Compliance checks.** Points to confirm with legal for the markets served: online cancellation requirements, renewal and cancellation disclosures, confirmation of cancellation, and refund rules. Do not state legal conclusions.
</task>

<constraints>
- No dark patterns: no confirmshaming, hidden or disguised cancel options, forced calls or chats, pre-selected offers, or obstacles after the customer has said no.
- Never invent churn data or save rates; use the user's numbers or mark what to measure.
- Offers must be ones the business can honour and the customer can understand in one sentence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
## Flow
Numbered screens.
## Reason-to-response map
| Reason | Response | Offer limits | Why it helps |
## Screen copy
## Exit and follow-up
## Data capture
## Metrics
## Experiments
## Compliance checks
</output_format>
