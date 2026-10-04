---
schema: 1
id: recruit-resellers
kind: prompt
title: Recruit resellers
description: Plans how a small manufacturer or software company recruits resellers or distributors, with an ideal partner profile, margin and territory terms, first outreach, an enablement pack and warning signs.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, sales-rep]
requires: [none]
inputs: [text, notes]
output: [plan, table, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reseller-program, distributors, channel-margins, territory-terms, partner-enablement]
pairs_with:
  prompts: [plan-sales-territory, build-sales-playbook, write-cold-outreach]
  personas: [deal-desk-analyst]
args:
  - name: product_and_margins
    description: What you sell, list price, your cost or gross margin, typical order size, how it is installed or supported, and how you sell today (direct, online, a few existing partners).
    type: text
    required: true
  - name: target_markets
    description: Countries, regions or sectors where you want partners, and why (demand you have seen, enquiries you cannot serve, language or regulation barriers).
    type: text
    required: true
  - name: partner_types
    description: The kinds of partner you have in mind - value-added resellers, distributors or wholesalers, installers, consultants, marketplaces, referral partners. Optional; options are compared if empty.
    type: text
output_contract:
  format: markdown
  sections: [Partner model, Ideal partner profile, Terms to propose, Finding partners, First outreach, Enablement pack, First 90 days and warning signs]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small manufacturer, product company or software founder build a reseller or distributor channel. Most first channel programmes disappoint because the company signs many partners who never sell, gives away exclusive territories before a partner has proven anything, sets margins that leave the partner nothing for selling effort, or expects partners to create demand rather than serve it. A workable channel starts with a few partners who already sell to the right customers, offers a margin that pays for the work the partner does (selling, installing, supporting), ties exclusivity to performance, and supports the first deals closely.
</context>

<task>
<product_and_margins>
{{product_and_margins}}
</product_and_margins>

<target_markets>
{{target_markets}}
</target_markets>

{{#partner_types}}<partner_types>
{{partner_types}}
</partner_types>{{/partner_types}}

1. Partner model: compare the relevant types (referral partner, reseller, value-added reseller, distributor) on what the partner does, typical margin logic, your control over price and customer, and support load. Recommend one or two for this product and say why.
2. Ideal partner profile: who they already sell to, complementary products they carry, size, technical ability, geography, and what makes a partner a bad fit (sells a direct competitor, no sales staff, wants exclusivity up front).
3. Terms to propose: discount or margin structure (show the arithmetic from list price and your cost, and check your own margin stays acceptable), deal registration to avoid channel conflict with your direct sales, minimum commitments, territory (non-exclusive at first; exclusivity only after agreed targets are met for a set period), payment terms, marketing and demo support, training requirements, and termination. Mark each figure as a proposal.
4. Finding partners: where to look (your existing customers' suppliers, trade associations, trade shows, marketplaces, enquiries you could not serve) and how to qualify them with five questions.
5. First outreach: a message under 120 words that leads with what is in it for the partner (demand you have seen in their area, margin, support), and a 20-minute call agenda.
6. Enablement pack outline: product training, pitch and demo, price list, objection handling, case examples, co-branded materials, lead handover process, support escalation.
7. First 90 days and warning signs: a joint plan for the first deals, and signs a partner will not perform (no pipeline after 60 days, skipping training, discounting below agreed levels).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the prices and costs given; arithmetic shown; missing figures are [X].
- Do not invent named partners, trade shows or market sizes.
- Flag for legal review: exclusivity, minimum resale prices (fixing a reseller's resale price is restricted under competition law in many countries, so recommend a suggested price instead), territorial restrictions, agency versus distribution status, and termination and compensation rights, which differ by country.
- If the product, price or target markets are missing, ask for them and stop.
</constraints>

<output_format>
## Partner model
Table: Type | What they do | Margin logic | Your control | Support load. Then the recommendation.

## Ideal partner profile
Fit and bad-fit bullets.

## Terms to propose
Table: Term | Proposal | Rationale. Then the margin arithmetic.

## Finding partners
Sources and the five qualifying questions.

## First outreach
The message and the call agenda.

## Enablement pack
Outline as a checklist.

## First 90 days and warning signs
A short joint plan by month and the warning signs.
</output_format>
