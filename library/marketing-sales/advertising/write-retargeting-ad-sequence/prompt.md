---
schema: 1
id: write-retargeting-ad-sequence
kind: prompt
title: Write a retargeting ad sequence
description: Writes retargeting ads by stage (visited, viewed product, carted, lead not converted, past buyer) with timing windows, message order, frequency caps, exclusions and measurement.
category: advertising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [marketer, founder, copywriter]
requires: [none]
inputs: [text]
output: [copy, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [remarketing, audience-windows, frequency-caps, abandoned-cart, cross-sell, objection-handling]
pairs_with:
  prompts: [define-ad-audiences, plan-dynamic-product-ads, write-display-banner-set, write-social-ad-variations]
  personas: [paid-media-specialist, ad-creative-strategist]
  workflows: [ad-campaign-launch-track]
args:
  - name: business
    description: What you sell, price, typical time to decide, main objections, and proof available (reviews, guarantees, case studies).
    type: text
    required: true
  - name: stages
    description: The behaviours you can track (site visit, product or pricing page view, add to cart, checkout start, lead form, trial, purchase) and audience sizes if known.
    type: text
    required: true
  - name: platforms
    description: Where retargeting runs, for example Meta, Google display or YouTube, LinkedIn.
    type: string
    required: true
  - name: offer_rules
    description: Whether discounts are allowed and when, and any margin limits. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Audience stages, Sequence, Ad copy, Frequency and exclusions, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to bring back people who showed interest but did not act. Retargeting is easy to set up and easy to get wrong: the same "still thinking about it?" ad shown twenty times a week to everyone who ever visited, a discount handed to people who would have paid full price, and buyers still seeing ads for what they bought. What experts know: segment by intent and recency (a cart abandoner yesterday is not a homepage visitor from last month); change the message as time passes (reminder, then answer the main objection, then proof, then an offer only if margin allows); match windows to the buying cycle; cap frequency because small audiences burn fast; exclude converters promptly; and avoid "creepy" copy that names what the person browsed, especially for sensitive products. Retargeting also over-claims in attribution, so a holdout tells you its real value.
</context>

<task>
Business: {{business}}
Trackable stages: {{stages}}
Platforms: {{platforms}}
{{#offer_rules}}Offer rules: {{offer_rules}}{{/offer_rules}}

1. Audience stages: define 3 to 5 audiences by intent and recency, with lookback windows fitted to the decision time, and merge stages whose audiences are too small to run alone.
2. Sequence: for each audience, the message order over time (days 1 to 3, 4 to 10, 11 to 30, for example), the objective of each step and the format.
3. Ad copy: for each step, primary text, headline and call to action (two variants each), using only proof the user gave. Offer-led ads only where the offer rules allow, and later in the sequence.
4. Frequency and exclusions: frequency caps or targets per audience where the platform supports them, budget share by audience, exclusions (converters by window, employees, existing customers for acquisition offers), and how to move people between stages automatically.
5. Measurement: metrics per stage, a recommendation to run a holdout to measure retargeting's true lift, and decision rules.
</task>

<constraints>
- Use only the proof and offers the user provided; never invent reviews, stock levels or deadlines.
- Do not write copy that reveals sensitive browsing (health, finance, intimate products) or uses fake urgency.
- Do not state platform window limits or frequency settings as fact; tell the user to check current options.
- Keep retargeting budget proportionate to audience size; say when audiences are too small to support a sequence.
</constraints>

<output_format>
## Audience stages
A table: Audience | Definition | Window | Estimated size | Budget share.

## Sequence
A table per audience: Days | Message goal | Format.

## Ad copy
Per audience and step: primary text, headline, CTA, two variants.

## Frequency and exclusions
Checklist.

## Measurement
Metrics, holdout recommendation, decision rules.
</output_format>
