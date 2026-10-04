---
schema: 1
id: plan-product-end-of-life
kind: prompt
title: Plan the end of life of a physical product
description: Plans discontinuing a physical product with a last-time buy, stock run-down, spare parts and repair support, obligations to check, firmware or app support, take-back and customer communication.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [product-manager, operations-manager, founder]
subject: [engineering, retail]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [discontinuation, last-time-buy, spare-parts, connected-devices, take-back, warranty]
pairs_with:
  prompts: [rationalize-product-line, plan-feature-sunset, write-customer-change-notice]
args:
  - name: product_and_install_base
    description: The product, how many are in use and where, how long ago units were sold, whether it relies on firmware, an app or a cloud service, current stock, and key components or suppliers.
    type: text
    required: true
  - name: reason_and_replacement
    description: Why it is being discontinued (component end of life, low sales, replaced by a new model) and what replaces it, if anything.
    type: text
    required: true
  - name: region
    description: Optional. Countries or regions where it was sold, since obligations differ.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Obligations to check, Timeline, Stock and spares plan, Connected service plan, Communication plan, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the end of life of physical products: appliances, electronics, connected devices, tools and equipment. Unlike a software sunset, the product stays in people's homes and workplaces for years after the last sale. Customers still have warranty and consumer-law rights, repairers need parts, connected devices need security updates or a safe way to keep working, and old units need to be collected and recycled. Discontinuations go wrong when the last-time buy of parts is missed, when a cloud shutdown turns working devices into waste, and when retailers and support staff hear about it from customers.
{{#region}}
Regions sold: {{region}}
{{/region}}
</context>

<task>
Product and install base:

<product>
{{product_and_install_base}}
</product>

Reason and replacement:

<reason>
{{reason_and_replacement}}
</reason>

1. List the obligations to check, as questions for legal and compliance, not as statements of law: remaining warranty periods and statutory consumer guarantees; any minimum period for spare parts or repair information that applies to this product type in the regions sold; any security update support period that was promised or must be stated for connected products; product take-back, electronic waste and battery recycling duties; contracts with retailers, distributors and business customers; and data held about users or devices.
2. Plan the last-time buy: components and sub-assemblies needed for production of final units, warranty replacements and spares for the support period. Size it from the install base, failure or claim rates if given, and the support period, with the arithmetic and a labelled buffer.
3. Plan the stock run-down: final production run, sell-through by channel, the last order date for retailers, and what happens to leftover stock (clearance, refurbish, donate, recycle).
4. Plan spares and repair: which parts to keep, for how long, how repairers get them, and when repair switches to replacement or a trade-in offer.
5. For connected products, plan the service: how long app, cloud and security updates continue, whether devices can keep working locally after shutdown, data export and deletion for users, and the last firmware release. Flag any loss of promised features as a high risk to review with legal before announcing.
6. Write the communication plan by audience and timing: retailers and distributors first, support and repair partners, customers (what changes, what does not, what you offer), and public pages.
7. Put everything on a timeline from decision to end of support.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state what the law requires in a region; frame each obligation as an item to confirm with a lawyer or compliance adviser, and say what to bring (sales dates and volumes by region, warranty terms, marketing claims about support).
- Use only the numbers given; label assumed failure rates, buffers and periods.
- Do not promise customers anything the company has not decided; mark such items [decision needed].
- If the install base, connected-service status or regions are unknown, ask for them, because they change the obligations; mark them [X] meanwhile.
</constraints>

<output_format>
## Summary
Three to five bullets: the key dates, the biggest obligation to confirm, and the riskiest item.

## Obligations to check
Table: area | question for legal or compliance | why it matters | what to bring.

## Timeline
Table: milestone | date or offset from decision | owner placeholder.

## Stock and spares plan
Last-time buy arithmetic, run-down by channel, spares holding and duration.

## Connected service plan
Bullets, or "not applicable" with the reason.

## Communication plan
Table: audience | message | channel | timing.

## Risks and questions
Bullets.
</output_format>
