---
schema: 1
id: design-creator-coaching-offer
kind: prompt
title: Design a creator coaching or consulting offer
description: Designs a paid one-to-one offer a creator sells to their audience - coaching, consulting, portfolio reviews - with scope, who it is not for, pricing from capacity, process, refunds and boundaries.
category: creator-business
version: 1.0.0
status: incubating
stage: [design]
role: [content-creator, consultant]
inputs: [notes, preferences]
output: [plan, table, copy]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coaching-offer, consulting-services, one-to-one-calls, service-pricing, creator-services]
pairs_with:
  prompts: [plan-creator-digital-product, plan-creator-monetization, review-creator-income-mix]
  personas: [creator-business-manager]
args:
  - name: expertise
    description: "What you know that people pay for, your credentials and track record (honest), and what your audience keeps asking you for help with."
    type: text
    required: true
  - name: capacity
    description: "Hours per month you can give without hurting your content, your audience size and platforms, any services you offered before, and your country."
    type: text
    required: true
  - name: idea
    description: "Optional. The offer you have in mind (calls, async video reviews, a small group)."
    type: text
output_contract:
  format: markdown
  sections: [The offer, Who it is for and not, Capacity and price, Process, Boundaries and policies, Launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Services are the fastest way for a creator with real expertise to earn from a small audience, because a handful of clients can pay more than thousands of views. They also eat the creator's scarcest resource, time, and do not scale. Experienced creators define a narrow, productised offer (a fixed deliverable such as a 60-minute call with a written action plan, or an async video review of a portfolio) instead of open-ended 'coaching', price from capacity (how many slots fit in a month and what income they need from them, not from what feels polite), and raise the price when slots sell out. They say clearly who the offer is not for, especially when the topic touches regulated advice (finance, health, legal, mental health), where a creator coach must not act as a licensed professional. Clear booking, payment upfront, rescheduling and refund rules, and boundaries on contact between sessions prevent the common burnout and dispute problems.
</context>

<task>
<expertise>
{{expertise}}
</expertise>

<capacity>
{{capacity}}
</capacity>

{{#idea}}
<idea>
{{idea}}
</idea>
{{/idea}}

1. **The offer:** one productised offer with a name, the exact deliverable, length and format, and what the client leaves with.
2. **Who it is for and not:** the ideal client, and who should not book (including anyone who needs a licensed professional for their situation).
3. **Capacity and price:** slots per month from their hours including prep and follow-up, a price built from capacity and income goal, a table of income at different fill rates, and when to raise the price. Use placeholders where they give no figures.
4. **Process:** booking, intake questions, payment upfront, the session, the follow-up deliverable, and a testimonial request with permission.
5. **Boundaries and policies:** rescheduling, cancellation and refund rules, contact between sessions, confidentiality, and a disclaimer appropriate to the topic.
6. **Launch:** a short announcement for their audience and a soft launch to a few people first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not inflate credentials or promise results (income, followers, health outcomes).
- If the topic is regulated advice, keep the offer clearly outside it and refer to licensed professionals.
- Do not invent prices from the market; show the capacity method.
- Keep the offer narrow; push back on open-ended unlimited access offers.
</constraints>

<output_format>
## The offer
## Who it is for and not
## Capacity and price
Table: slots sold | price | monthly income.

## Process
Numbered steps.

## Boundaries and policies
## Launch
</output_format>
