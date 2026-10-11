---
schema: 1
id: check-contracts-for-change-of-control
kind: prompt
title: Check contracts for change of control and assignment
description: Screens a company's key contracts before a sale, investment or restructure for change of control, assignment and consent clauses, and lists which counterparties to approach, in what order.
category: contracts
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, executive, legal-professional, financial-analyst]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [change-of-control, assignment-clause, consent-to-assign, m-and-a, contract-due-diligence]
pairs_with:
  prompts: [build-contract-obligations-register, review-business-purchase-agreement, review-letter-of-intent]
args:
  - name: clauses
    description: For each key contract, its name or type, the counterparty type (not names if you prefer), value, and the text of its assignment, change of control, termination and consent clauses.
    type: text
    required: true
  - name: transaction
    description: What is planned - share sale, asset sale, merger, new investor taking a stake, group reorganisation, transfer of a contract to another company - and the rough timetable.
    type: text
    required: true
  - name: country
    description: Governing laws of the contracts and of the transaction.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Contract by contract, Consents needed, Approach plan, Questions for the deal lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Buyers and investors ask early which contracts could be lost because of the deal. The structure matters: in a share sale the company stays the contracting party, so only change of control clauses usually bite; in an asset sale or business transfer each contract has to be moved to the buyer, which normally needs the counterparty's consent or a novation; a group reorganisation may trigger assignment restrictions even between related companies. Clauses vary: a flat ban on assignment, assignment with consent "not to be unreasonably withheld", free assignment to affiliates or to a buyer of the whole business, change of control defined by voting rights or board control, a right to terminate on change of control, a duty to notify, or price or exclusivity changes triggered by a change. Some counterparties use a consent request to renegotiate, so the order and timing of approaches, and confidentiality before the deal is public, need planning with the deal lawyers.
{{#country}}

Laws involved: {{country}}
{{/country}}

<transaction>
{{transaction}}
</transaction>
</context>

<task>
<clauses>
{{clauses}}
</clauses>

1. In brief: how many contracts reviewed, how many need consent or notice, and the highest-value contracts at risk.
2. Contract by contract: for each, quote the relevant clauses and classify the effect of this transaction: no issue, notice required, consent required, counterparty may terminate, other consequence (price change, exclusivity lost), or unclear. Explain why given the deal structure.
3. Consents needed: a ranked table by value and risk, with what exactly must be obtained (consent letter, novation, waiver) and any timing rules in the clause.
4. Approach plan: order of approaches, what to say and not say before the deal is public, who in the business owns each relationship, and fallback if consent is refused.
5. Questions for the deal lawyer, including any contracts where the wording or governing law makes the effect unclear.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the clause wording; if a clause is missing, write "no clause supplied" and do not assume free assignment.
- Do not say how a court would interpret a clause; classify on the wording and mark unclear ones.
- Do not draft announcements or approaches that would break confidentiality obligations in the deal documents.
- This screens the supplied clauses only; note that a full due diligence review by lawyers covers more.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three bullets.

## Contract by contract
Table: contract | value | clause and short quote | effect of this deal | why.

## Consents needed
Table: rank | contract | what is needed | timing.

## Approach plan
Numbered.

## Questions for the deal lawyer
Numbered.
</output_format>
