---
schema: 1
id: contract-review-track
kind: workflow
title: Contract review track
description: Reviews a contract in gated steps, from a plain summary to risk flags by severity, questions for the other side, redline priorities and a brief for a lawyer.
category: contracts
version: 1.0.1
status: incubating
aliases: [legal-document-review]
stage: [discover, review, build, ship]
role: [founder, consultant, operations-manager, legal-professional]
subject: [law]
requires: [none]
inputs: [document, preferences]
output: [summary, report, questions, diff]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contract-negotiation, redlining, risk-review, lawyer-brief]
pairs_with:
  prompts: [summarize-contract, redline-contract, review-freelance-contract, review-nda]
  personas: [paralegal]
args:
  - name: contract_text
    description: The full contract with clause numbers, plus any schedule, order form or policy it incorporates. Remove bank details and ID numbers.
    type: text
    required: true
  - name: your_side
    description: Which party you are and the deal in a sentence, for example "the supplier, selling 12 months of support for 40,000" or "the tenant of a small shop".
    type: string
    required: true
steps:
  - {id: summary, file: steps/01-summary.md, stage: discover, gate: approve, artifact: "contract-review/01-summary.md"}
  - {id: risks, file: steps/02-risks.md, stage: review, gate: approve, artifact: "contract-review/02-risk-flags.md"}
  - {id: questions, file: steps/03-questions.md, stage: review, gate: approve, artifact: "contract-review/03-questions.md"}
  - {id: redlines, file: steps/04-redlines.md, stage: build, gate: approve, artifact: "contract-review/04-redline-priorities.md"}
  - {id: brief, file: steps/05-brief.md, stage: ship, gate: none, artifact: "contract-review/05-lawyer-brief.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id legal-document-review."}
---
Reviews one contract for one party in the order a careful reviewer works: understand the deal, rank the risks, ask the other side what is unclear, decide what to change, then hand a lawyer a tight brief so their time goes on judgement, not reading. Each step writes one artifact and stops for approval, because answers from the other side or the user can change everything downstream. Later steps build only on approved artifacts.

<contract>
{{contract_text}}
</contract>

Acting for: {{your_side}}

{{> guardrails/professional-limits}}

Rules for every step:
- Quote the contract exactly with clause numbers. Never invent clauses, laws, case law or market figures; write "not stated" for anything absent.
- Do not predict enforceability or outcomes. Where they matter, write "check under the governing law" and carry the point into the lawyer brief.
- Read from the user's side. The same clause can be a protection or a risk depending on who you act for.
- If the user's party is ambiguous or a referenced document is missing, ask in step 1 before going further.
- If the user asks to skip a step, say in one line what the skipped step usually catches, and continue once they confirm.
- Keep every artifact short enough to read in five minutes. Detail goes in tables, not paragraphs.
