---
schema: 1
id: review-franchise-agreement
kind: prompt
title: Review a franchise agreement
description: Reviews a franchise agreement from the franchisee's side for fees, territory, renewal, supply ties, targets, transfer, termination and post-term restrictions, with questions to ask.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, franchisee, territory-rights, royalties, restrictive-covenants]
pairs_with:
  prompts: [evaluate-buying-a-business, summarize-contract, explain-contract-clause]
  workflows: [franchise-purchase-track, contract-review-track]
args:
  - name: agreement
    description: The franchise agreement, or the sections you have, with clause numbers. Include the disclosure or information document if there is one. Remove names and personal details.
    type: text
    required: true
  - name: what_you_were_told
    description: What the franchisor said in sales meetings or brochures about fees, territory, support, earnings and exit, so it can be checked against the document.
    type: text
  - name: country
    description: Country and state or region. Some places have franchise disclosure laws, cooling-off periods or registration rules; others have none.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In brief, The money, Territory and competition, Term renewal and exit, Control and obligations, Said versus written, Questions, Get a lawyer for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A franchise agreement is written by the franchisor, offered largely on a take-it-or-leave-it basis, and usually lasts five to twenty years, so it shapes the whole business. Experienced franchise advisers look first at: the full cost (initial fee, ongoing royalty on turnover rather than profit, marketing fund levy, technology and training fees, mandatory refurbishments, required suppliers with marked-up prices); whether the territory is genuinely exclusive or only a "primary area", and whether online sales, national accounts and new outlets by the franchisor are carved out; performance targets that let the franchisor terminate or shrink the territory; renewal that requires signing the then-current agreement on new terms and paying again; transfer rights, approval and fees when selling the business, and any right of first refusal; termination triggers, cross-default with other agreements, and what happens to the premises and stock at the end; post-term non-competes; personal guarantees from the franchisee as an individual; and dispute resolution far from the franchisee. Promises made in sales meetings rarely appear in the agreement, and "entire agreement" clauses often exclude them.

Country: {{country}}
{{#what_you_were_told}}

<what_you_were_told>
{{what_you_were_told}}
</what_you_were_told>
{{/what_you_were_told}}
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: parties, term, renewal, territory, total fees, and the three most important issues.
2. The money: every fee and cost with how it is calculated, when payable, and whether it can increase; supply obligations and pricing; refurbishment duties. Where figures allow, show the yearly fee burden at an example turnover the person can replace with their own.
3. Territory and competition: exclusivity, carve-outs, online and national accounts, performance conditions on the territory.
4. Term, renewal and exit: renewal conditions and costs, transfer and sale rules, termination rights on each side, cure periods, what happens at the end, post-term restrictions, personal guarantees.
5. Control and obligations: operations manual changes that bind the franchisee, audits and reporting, required hours, staffing, marketing, IP and data ownership.
6. Said versus written: compare what the person was told with the document and note where the entire agreement clause may exclude it.
7. Questions for the franchisor and for existing franchisees, and a list of points for a franchise lawyer and an accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers and wording; write "not stated" when something is missing.
- Do not say whether a clause is enforceable or what local franchise law requires; name the kind of rule to check (disclosure, cooling-off, restraint of trade).
- Do not invent fee benchmarks or "industry standard" numbers.
- Do not forecast the franchise's profitability; point to the accountant and to validation with existing franchisees.
- Always recommend a lawyer with franchise experience before signing, and say what to bring.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Short bullets.

## The money
Table: fee or cost | clause | how calculated | can it rise? Then an example yearly total with stated assumptions.

## Territory and competition
Bullets with clause references.

## Term renewal and exit
Table: topic | clause | what it says | concern.

## Control and obligations
Bullets.

## Said versus written
Table: what you were told | what the agreement says | gap.

## Questions
Grouped: for the franchisor, for existing franchisees.

## Get a lawyer for
Bullets tied to this agreement.
</output_format>
