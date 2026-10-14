---
schema: 1
id: evaluate-brand-ambassador-offer
kind: prompt
title: Evaluate a brand ambassador offer
description: Evaluates a long-term brand ambassador offer - annualised value per deliverable, exclusivity cost, payment schedule, product or commission pay, exit and conduct clauses - and writes a counter.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [document, message, notes]
output: [report, table, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [brand-ambassador, long-term-partnership, exclusivity, retainer-deal, contract-terms]
pairs_with:
  prompts: [build-creator-rate-card, review-sponsorship-contract]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: offer
    description: "The ambassador offer or contract summary: length, monthly or total fee, deliverables per month, exclusivity scope and length, usage rights, commission or affiliate parts, payment schedule, termination, conduct or morals clauses."
    type: text
    required: true
  - name: context
    description: "Your rate card or typical one-off fees, other brands in the same category you work with or might, audience size and platforms, how you feel about the brand, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Deal in plain words, Annualised value, Exclusivity cost, Terms to check, Counter, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ambassador deals trade a lower price per deliverable for steady income over months, which can be worth it, but the discount is often larger than it looks once everything is added up: monthly content quotas, event appearances, long paid usage, and category exclusivity that blocks other sponsors for the term and sometimes after it. Experienced creators annualise the deal, compare the effective price per deliverable to their one-off rates, put a price on the deals exclusivity will block, and read the clauses that matter most for long agreements: how either side can end it and with what notice, whether payment is monthly or back-loaded, whether part of the pay is product or commission that may not materialise, approval and revision rules, conduct or morals clauses that let the brand end the deal or claw back fees, and what happens to content and usage after the term. These clauses need a lawyer when the money or length is significant.
</context>

<task>
<offer>
{{offer}}
</offer>

<your_situation>
{{context}}
</your_situation>

1. **Deal in plain words:** what the creator must do, for how long, and what they get, including commission or product, and what is unclear.
2. **Annualised value:** a table totalling the deal over its term, the effective price per deliverable compared to their one-off rates, and how much of the pay is guaranteed cash versus variable or product.
3. **Exclusivity cost:** what the exclusivity blocks (categories, competitors, platforms, after-term period), an estimate of lost deals using their own history or placeholders, and a narrower scope to propose.
4. **Terms to check:** termination and notice, payment schedule and late payment, approval and revisions, usage during and after the term, conduct clauses and clawbacks, performance targets, and ownership of content.
5. **Counter:** two or three asks ranked by value (narrower exclusivity, higher base, monthly payment, shorter usage, mutual termination), and a short email.
6. **Questions for a lawyer:** the clauses to have reviewed and what to ask.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give legal opinions on clauses; describe what they usually mean and send the specifics to a lawyer.
- Do not invent market rates; use their numbers or placeholders.
- Show all arithmetic and label assumptions.
- Do not dismiss variable pay; show the guaranteed and the uncertain parts separately.
</constraints>

<output_format>
## Deal in plain words
## Annualised value
Table: item | per month | over term | guaranteed?

## Exclusivity cost
## Terms to check
Checkbox list.

## Counter
## Questions for a lawyer
</output_format>
