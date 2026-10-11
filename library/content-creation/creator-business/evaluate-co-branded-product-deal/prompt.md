---
schema: 1
id: evaluate-co-branded-product-deal
kind: prompt
title: Evaluate a co-branded product deal
description: Evaluates an offer to launch a co-branded or licensed product with a creator's name - royalty versus flat fee, royalty base, minimum guarantee, approvals and quality, IP and name use, and exit terms.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [document, message, notes]
output: [report, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [co-branded-product, licensing-deal, royalties, minimum-guarantee, creator-collab-product]
pairs_with:
  prompts: [plan-creator-digital-product, review-sponsorship-contract]
  workflows: [merch-drop-track]
  personas: [creator-business-manager]
args:
  - name: offer
    description: "The proposal: product, who makes and sells it, fee, royalty percentage and on what (gross, net, wholesale), minimum guarantee or advance, term, territories, your promotion obligations, approvals, and who owns what."
    type: text
    required: true
  - name: context
    description: "Your audience size and how much they buy from you now (merch, codes), how closely the product fits your content, your country, and what you want from the deal."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Deal structure, Money scenarios, Promotion load, Control and quality, IP and name use, Terms to ask for, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A co-branded product (a creator's flavour, a signature product, a collection) usually pays through a royalty on sales, sometimes with an advance or a minimum guarantee, rather than a sponsorship fee. The headline percentage means little without the base: a percentage of retail revenue, of net sales after returns and discounts, or of wholesale price can differ several times over, and 'net' definitions with broad deductions can shrink it further. The creator's audience usually drives most of the launch sales, so the creator carries much of the marketing work while the company controls price, quality and stock. Experienced creators ask for a minimum guarantee or advance against royalties, clear sales reporting and audit rights, approval of product, packaging and claims, a quality and safety standard (their name is on it), limits on how their name and likeness are used, a defined term and territory, and what happens to unsold stock and the name when the deal ends. Product liability and regulated categories (food, cosmetics, supplements) add legal risk.
</context>

<task>
<offer>
{{offer}}
</offer>

<your_situation>
{{context}}
</your_situation>

1. **Deal structure:** the structure in plain words, what the royalty is calculated on, and what is unclear.
2. **Money scenarios:** a table of low, likely and high unit sales using their audience and past sales or placeholders, showing royalty income, the effect of the base definition, and the guaranteed amount if any. Show arithmetic and assumptions.
3. **Promotion load:** the posts, appearances and launch work expected, in hours, compared to what they earn.
4. **Control and quality:** product, packaging and claims approval, quality and safety standards, and the risks in regulated categories.
5. **IP and name use:** who owns the product, design and name, limits on use of their name and likeness, and what happens at the end of the term.
6. **Terms to ask for:** minimum guarantee or advance, clear royalty base, reporting and audit, approvals, term and territory, stock run-off, and exit.
7. **Questions for a lawyer:** the clauses to review, including liability and indemnities.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give legal opinions on the contract; route specifics to a lawyer.
- Do not predict sales; use scenarios built on their numbers with assumptions labelled.
- Do not quote typical royalty percentages as fact.
- Flag regulated product categories for specialist advice.
</constraints>

<output_format>
## Deal structure
## Money scenarios
Table: scenario | units | base | royalty | guaranteed.

## Promotion load
## Control and quality
## IP and name use
## Terms to ask for
Checkbox list.

## Questions for a lawyer
</output_format>
