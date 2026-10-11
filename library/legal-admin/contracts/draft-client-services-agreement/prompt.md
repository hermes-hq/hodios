---
schema: 1
id: draft-client-services-agreement
kind: prompt
title: Draft a reusable client services agreement
description: Drafts a reusable master services agreement with an order form or SOW structure for a small service business, covering payment, scope changes, IP, liability caps and termination.
category: contracts
version: 1.0.0
status: incubating
stage: [build]
role: [founder, consultant, operations-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [master-services-agreement, client-terms, order-form, change-requests, limitation-of-liability, service-business]
pairs_with:
  prompts: [write-statement-of-work, negotiate-client-payment-terms, set-kill-fee-and-cancellation-terms, review-freelance-contract]
args:
  - name: business
    description: What your business does, typical clients (businesses or consumers), typical project size and length, how you price (fixed, hourly, retainer), and problems you have had with clients before.
    type: text
    required: true
  - name: positions
    description: The terms you want - payment timing and deposits, late payment, how scope changes work, who owns the work and your reusable tools, cancellation, liability limit, non-solicit, and anything else that matters to you.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region whose law should apply. Consumer clients usually get rights that a contract cannot remove.
    type: string
output_contract:
  format: markdown
  sections: [Before you use this, Master services agreement, Order form template, Drafting notes, Gaps to decide, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Service businesses that write a new contract for every client end up with inconsistent terms and slow deals. The structure experienced commercial lawyers use: one master agreement holding the terms that never change (payment, IP, confidentiality, liability, termination), plus a short order form or statement of work per project holding what does change (scope, deliverables, price, dates), with a clear order of precedence between them. What makes these work in practice: scope defined by deliverables and exclusions, with a written change-request process so extra work is paid; acceptance with a deemed-acceptance period so projects can close; deposits or milestone billing and a right to pause work on late payment; ownership of deliverables passing on full payment, while the provider keeps its pre-existing tools, templates and know-how and licenses them as needed; a liability cap linked to fees paid, with exclusions for indirect loss; client duties (timely feedback, access, approvals) and what happens when the client delays; termination for convenience with payment for work done; and balanced terms, because one-sided paper slows sales and may not hold against consumers.
{{#jurisdiction}}

Jurisdiction: {{jurisdiction}}
{{/jurisdiction}}

<business>
{{business}}
</business>
</context>

<task>
<positions>
{{positions}}
</positions>

1. Check the positions against what a services master agreement needs: parties and structure, order of precedence, services and order forms, client responsibilities, change requests, acceptance, fees, expenses, invoicing, late payment and suspension, IP and pre-existing materials, licence of tools, confidentiality, data protection (as a placeholder if personal data is handled), warranties, liability cap and exclusions, indemnities if any, insurance, non-solicit, term and termination, effects of termination, force majeure, subcontracting, notices, governing law and disputes, entire agreement.
2. Draft the master agreement in plain English with numbered clauses and defined terms, using only the positions given, with [BRACKETS] for anything not stated.
3. Draft a one-page order form template that plugs into the master agreement: client, project, deliverables, exclusions, timeline, fees and payment schedule, client dependencies, special terms, signatures.
4. Add drafting notes explaining each clause's purpose and choices, and which clauses clients most often push back on, with a reasonable fallback.
5. List gaps to decide with options and trade-offs.
6. List questions for a lawyer, including points that depend on the jurisdiction and on whether clients are consumers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Label it clearly as a draft for review by a lawyer before use.
- Never fill commercial terms that were not given (rates, percentages, days, caps); use [BRACKETS] and list them in gaps.
- Keep it balanced and readable; avoid clauses so one-sided that clients reject them or that may not hold against consumers.
- If clients are consumers, add a note that consumer protection rules (such as cancellation rights) may apply and cannot be contracted out of, as a point to check.
- Do not add a data processing agreement as complete; mark it as needed if personal data is processed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you use this
Three lines: draft status, what to review, when a lawyer is most worth it.

## Master services agreement
The full draft with title, parties block, numbered clauses and signature block.

## Order form template
The template.

## Drafting notes
Bullets keyed to clause numbers, with common pushback and fallback.

## Gaps to decide
Table: gap | options | trade-off.

## Questions for a lawyer
Numbered.
</output_format>
