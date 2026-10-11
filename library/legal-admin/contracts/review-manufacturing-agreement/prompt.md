---
schema: 1
id: review-manufacturing-agreement
kind: prompt
title: Review a contract manufacturing agreement
description: Reviews a contract manufacturing or private-label supply agreement for MOQs, quality specs, defects, tooling and mould ownership, IP, lead times and exclusivity, with asks to raise.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager]
subject: [law, supply-chain]
requires: [none]
inputs: [document]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contract-manufacturing, private-label, tooling-ownership, minimum-order-quantity, quality-agreement, product-sourcing]
pairs_with:
  prompts: [review-supplier-terms, write-manufacturing-spec-sheet, redline-contract, evaluate-white-label-or-licensing]
args:
  - name: agreement
    description: The manufacturing, supply or private-label agreement plus any quote, quality agreement or specification it refers to, with clause numbers.
    type: text
    required: true
  - name: product
    description: What is being made, whether the design and formula are yours or the manufacturer's, expected volumes, how you sell it, and where the factory is.
    type: text
    required: true
  - name: country
    description: Your country, the manufacturer's country and the governing law named.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Clause check, Who owns what, What to ask for, Message to the manufacturer, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Brands that have products made by someone else usually discover the contract's gaps at the first bad batch or when they try to move factories. What experienced sourcing people check: the specification is the contract's backbone, so an agreement that says "to sample" or "per manufacturer's standard" gives the brand little to reject against; acceptance and inspection windows, tolerance for defect rates (often stated as an acceptable quality level) and who pays for rework, replacement, freight and recalls; minimum order quantities and forecasts that turn into binding purchase commitments; price adjustment for raw materials and currency; lead times with no remedy for lateness; tooling and moulds the brand paid for that remain the manufacturer's property or cannot be moved; formulas, designs and packaging artwork the manufacturer claims or reuses for other customers; exclusivity that runs only one way; product liability, insurance and regulatory compliance (labelling, safety testing, certificates) left unassigned; and termination that leaves the brand without supply or stock. If the manufacturer supplies its own existing product under the brand's label (white label), the brand usually owns only the label, which affects how easily it can switch.
{{#country}}

Countries and law: {{country}}
{{/country}}

<product>
{{product}}
</product>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the brand is committing to (volumes, money, duration) and the three biggest risks.
2. Clause check, quoting each clause: specification and samples, quality standards and acceptable defect levels, inspection and acceptance, defects, rework and recalls, minimum orders, forecasts and purchase commitments, pricing and price changes, payment and deposits, lead times and late delivery, delivery terms and risk, tooling and moulds, IP in designs, formulas and packaging, confidentiality, exclusivity and non-compete, regulatory compliance and certificates, product liability and insurance, term, termination and last-time buys, governing law and disputes.
3. Who owns what: a plain table of each asset (design, formula or recipe, tooling, moulds, artwork, test data, customer lists) and who owns it under the text, noting where the text is silent.
4. What to ask for: ranked asks with a reason and a fallback (written specification as an annex, defect-rate threshold with remedies, brand ownership of paid tooling with a right to remove it, non-binding forecasts, a transition supply period on exit).
5. Message to the manufacturer: short and practical, listing the asks.
6. Get a lawyer if: features of this deal that need one, such as cross-border disputes, regulated products or large tooling spend.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Do not invent specifications, quantities, prices or certifications.
- Do not state which product safety or labelling laws apply; list what the brand should confirm for its markets.
- Do not say whether a clause is enforceable or how a foreign court would treat it; note cross-border enforcement as a question for a lawyer.
- Do not assume the brand owns tooling or designs just because it paid for them; report what the text says.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Who owns what
Table: asset | owner under the text | note.

## What to ask for
Numbered: ask - reason - fallback.

## Message to the manufacturer
The message.

## Get a lawyer if
Bullets.
</output_format>
