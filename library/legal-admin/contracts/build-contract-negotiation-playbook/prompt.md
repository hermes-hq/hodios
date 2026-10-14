---
schema: 1
id: build-contract-negotiation-playbook
kind: prompt
title: Build a negotiation playbook for your standard contract
description: Builds a negotiation playbook for a business's standard contract, with preferred, fallback and walk-away positions per clause, ready replies to common pushback and approval rules.
category: contracts
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, sales-rep, operations-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [document, text]
output: [table, docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [negotiation-playbook, fallback-positions, contract-approvals, sales-contracts, clause-library, deal-desk]
pairs_with:
  prompts: [redline-contract, draft-clause-options, write-negotiation-email]
  personas: [in-house-contract-manager]
args:
  - name: contract
    description: Your standard customer or supplier contract (or the key clauses), with clause numbers.
    type: text
    required: true
  - name: context
    description: Which side you are on, typical deal sizes, who negotiates (sales, founders, ops), the clauses customers or suppliers push back on most, what has gone wrong before, and your risk appetite.
    type: text
    required: true
  - name: jurisdiction
    description: Countries you contract in and the governing law of your standard contract.
    type: string
output_contract:
  format: markdown
  sections: [How to use this playbook, Clause positions, Replies to common pushback, Approval rules, Never agree, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Once a business sends the same contract to many customers or suppliers, the same dozen clauses get negotiated again and again, and each deal is handled differently depending on who is on the call. In-house legal teams solve this with a playbook: for each clause, the standard position, one or two pre-approved fallbacks, a walk-away point, the reason behind each (so negotiators can explain it), and who must approve anything beyond the fallbacks. What makes a playbook usable: positions tied to deal size (a bigger deal can justify a higher liability cap); fallbacks that are real contract wording, not principles; short replies a salesperson can paste; a short "never agree" list (uncapped liability, assigning core IP, unlimited audits, most-favoured pricing, open-ended indemnities, whatever the business has decided); and approval levels that are quick for low-risk changes. A playbook written by someone who has not seen which clauses actually get challenged ends up long and ignored, so it should be built from the real pushback.
{{#jurisdiction}}

Jurisdiction: {{jurisdiction}}
{{/jurisdiction}}

<context_notes>
{{context}}
</context_notes>
</context>

<task>
<contract>
{{contract}}
</contract>

1. Identify the clauses that are actually negotiated, starting with the ones the context names, then the usual pressure points for this type of contract (liability cap and exclusions, indemnities, payment terms, IP, warranties, service levels and credits, termination, renewal, confidentiality, data protection, audit, insurance, governing law). Skip clauses that rarely move.
2. For each negotiated clause: the standard position quoting the clause, one or two fallbacks as contract wording, the walk-away point, the reason in one sentence, and any deal-size condition. Base the standard position on the contract; mark fallbacks and walk-away points as proposals for the business to approve.
3. Write short replies to the most common pushback requests, ready to paste into an email.
4. Propose approval rules: who can agree what (negotiator, manager, founder or legal), with deal-size thresholds left as [BRACKETS] unless stated.
5. A short "never agree" list with the reason for each.
6. Questions for a lawyer before the playbook is used, including clauses whose effect depends on the governing law.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers. Do not invent the business's risk appetite, thresholds or numbers; use [BRACKETS] and mark proposals as proposals.
- Keep it short enough to use during a deal: no more than about twelve clauses unless the contract demands more.
- Fallback wording must be specific contract language, not a principle.
- Do not claim any position is "market standard" as a fact; say what is commonly asked and let the business decide.
{{> output/uncertainty}}
</constraints>

<output_format>
## How to use this playbook
Three or four lines.

## Clause positions
Table: clause | standard position | fallback 1 | fallback 2 | walk-away | reason | approver.

## Replies to common pushback
Numbered: request - reply.

## Approval rules
Table: change | who approves | threshold.

## Never agree
Bullets with reasons.

## Questions for a lawyer
Numbered.
</output_format>
