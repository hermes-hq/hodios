---
schema: 1
id: review-letter-of-intent
kind: prompt
title: Review a letter of intent or heads of terms
description: Reviews a letter of intent, MOU or heads of terms to separate binding from non-binding parts, spot exclusivity, costs and gaps, and list what to settle before the full contract.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, consultant, business-analyst]
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
tags: [letter-of-intent, memorandum-of-understanding, heads-of-terms, exclusivity-period, non-binding]
pairs_with:
  prompts: [summarize-contract, explain-contract-clause, review-business-purchase-agreement]
  workflows: [contract-review-track]
args:
  - name: document
    description: The letter of intent, MOU, term sheet for a commercial deal, or heads of terms, with paragraph numbers.
    type: text
    required: true
  - name: deal
    description: What the deal is (a partnership, an acquisition, a supply or licence deal, a joint project), which side you are, and what matters most to you.
    type: text
    required: true
  - name: country
    description: Governing law if stated, and the countries of the parties. Whether a document is binding depends heavily on the law and the wording.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Binding or not, Key commercial terms, What is missing, Risks before the full contract, Questions, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A letter of intent, MOU or heads of terms records a deal in outline before the full contract. People often treat it as a formality and either over-trust it or ignore it. Two things decide its real effect. First, which parts are binding: most say they are "not legally binding" except for listed clauses such as confidentiality, exclusivity, costs, governing law and sometimes a break fee, and those clauses can bind now. Second, whether the document as a whole could be treated as binding anyway because it is detailed, has been acted on, or lacks clear "subject to contract" wording; how courts approach that varies by country. Even the non-binding terms set the anchor for negotiation: points left out or vague now (price adjustments, conditions, warranties, timing, who pays costs) are much harder to win later. An exclusivity or "no-shop" period stops one side talking to anyone else and should be short and tied to progress.
{{#country}}

Law and parties: {{country}}
{{/country}}

<deal>
{{deal}}
</deal>
</context>

<task>
<document>
{{document}}
</document>

1. In brief: parties, deal, headline terms, and whether the document says it is binding.
2. Binding or not: list each clause as stated binding, stated non-binding, or unclear, quoting the wording; note any "subject to contract" wording or its absence, and any signs it could be argued as binding overall (to check under the governing law).
3. Key commercial terms: price or value and how it is calculated, structure, conditions, timing, roles, and how each favours or exposes the user's side.
4. What is missing: terms that should be settled now given this kind of deal (price mechanics, conditions precedent, due diligence scope, key warranties or protections, termination of talks, costs).
5. Risks before the full contract: exclusivity length and scope, confidentiality, costs and break fees, acting on the deal before signing (sharing data, starting work, giving notice to others).
6. Questions for the other side, and a short list of changes to propose before signing.
7. Get a lawyer if: features that warrant it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote paragraph numbers; write "not stated" for missing topics.
- Do not say the document is or is not legally binding; say what the wording indicates and what to check.
- Do not invent market norms for exclusivity periods or break fees.
- Warn against starting work, spending money or giving up other options on the strength of a non-binding document without assessing the risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four bullets.

## Binding or not
Table: paragraph | stated as | wording | note.

## Key commercial terms
Table: term | what it says | effect for your side.

## What is missing
Bullets.

## Risks before the full contract
Bullets.

## Questions
Numbered, then proposed changes.

## Get a lawyer if
Bullets.
</output_format>
