---
schema: 1
id: review-reseller-agreement
kind: prompt
title: Review a reseller or distribution agreement
description: Reviews a reseller, distributor or agency agreement for exclusivity, territory, targets, pricing, stock, IP use, liability and termination compensation, from the supplier's or the reseller's side.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, sales-rep, executive, operations-manager]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [distribution, reseller, exclusivity, minimum-purchase, commercial-agent]
pairs_with:
  prompts: [redline-contract, explain-contract-clause, summarize-contract]
  workflows: [contract-review-track]
args:
  - name: agreement
    description: The agreement text with clause numbers. Remove names and personal details.
    type: text
    required: true
  - name: your_side
    description: "supplier: you make or own the product. reseller: you buy and resell it, or sell it on commission as an agent."
    type: enum
    enum: [supplier, reseller]
    default: reseller
  - name: deal
    description: The product, the territory, expected volumes, and what each side most wants from the deal.
    type: text
  - name: country
    description: Countries involved and the governing law named in the agreement. Rules on agent compensation and competition law differ by place.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, What to negotiate, Leaving the deal, Questions, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reading from the {{your_side}} side. Reseller and distribution deals fail most often at the edges: exclusivity granted without targets, or targets so high that missing them lets the supplier walk away after the reseller has built the market; vague territory or channel definitions (online sales, marketplaces, key accounts kept by the supplier); minimum purchase commitments that leave the reseller with stock; prices the supplier can change at will; who owns the customer relationship and data; trademark use rules; product liability, recalls and warranty handling between the parties; and what happens on termination, including stock buy-back and, for commercial agents in some countries, mandatory compensation or indemnity that cannot be excluded. It also matters whether the reseller is a distributor (buys and resells, takes stock risk) or an agent (sells in the supplier's name on commission), because the law treats them differently. Exclusivity and resale price restrictions can also raise competition law issues in many places.
{{#country}}

Countries and law: {{country}}
{{/country}}
{{#deal}}

<deal>
{{deal}}
</deal>
{{/deal}}
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: distributor or agent, parties, products, territory and channels, exclusivity, term, and the biggest issue for the user's side.
2. Clause check, quoting each clause: appointment and exclusivity, territory and channels, targets and minimum purchases, pricing and payment, ordering and delivery, stock and returns, marketing obligations, trademark and IP use, customer data, warranties, product liability and recalls, liability caps and indemnities, confidentiality, non-compete, term and termination, post-term stock and customers, governing law and disputes.
3. Rate each fine, check or negotiate for the user's side, with one line on why.
4. What to negotiate: the asks, most important first, with fallback positions and short replacement wording where useful.
5. Leaving the deal: how each side can end it, notice, what happens to stock, customers and outstanding orders, and whether compensation on termination may arise under local law (to check).
6. Questions for the other side and a list of points for a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" for anything missing.
- Rate from the user's side; exclusivity is a benefit for one side and a constraint for the other.
- Do not say whether exclusivity, resale price rules or non-competes are lawful; say "check competition law and the governing law".
- Do not invent statutes or compensation formulas; describe agent compensation regimes only as something that exists in some countries.
- Recommend a lawyer for cross-border deals, exclusivity, long terms or significant minimum commitments.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Five bullets.

## Clause check
Table: topic | clause and short quote | rating | why, for your side.

## What to negotiate
Numbered: clause - ask - fallback - reason to give.

## Leaving the deal
Bullets.

## Questions
Numbered.

## Get a lawyer if
Bullets tied to this agreement.
</output_format>
