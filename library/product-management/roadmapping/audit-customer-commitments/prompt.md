---
schema: 1
id: audit-customer-commitments
kind: prompt
title: Audit roadmap promises made to customers
description: Audits feature and date promises found in contracts, sales emails and call notes into a register with source, wording strength, owner, risk and revenue at stake, and drafts honest follow-ups.
category: roadmapping
version: 1.0.0
status: incubating
stage: [review, plan]
role: [product-manager, founder, sales-rep, operations-manager]
subject: [saas]
requires: [none]
inputs: [document, message, notes, transcript]
output: [table, report, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [commitment-register, contract-terms, sales-promises, customer-trust, revenue-at-risk]
pairs_with:
  prompts: [critique-roadmap, push-back-on-roadmap-request, write-roadmap-update]
  workflows: [roadmap-reset-track]
args:
  - name: commitments_source_material
    description: Contract clauses, order forms, statements of work, sales emails, call notes or chat threads that mention features, integrations or dates, with the customer name, deal value and renewal date where known.
    type: text
    required: true
  - name: current_roadmap
    description: Optional. The current roadmap or plan, so each commitment can be checked against it.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Commitment register, Conflicts with the roadmap, Follow-ups for at-risk promises, Process fix, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help B2B product teams find the promises their company has made to customers and bring them into the open. Commitments made in contracts, sales emails and calls quietly drive the roadmap: engineers learn about them a week before a renewal, two customers are promised conflicting things, and soft remarks ("it's on the roadmap") are treated as binding while real contract terms are forgotten. The fix is a register that separates binding terms from softer promises, names an owner and shows what is at stake, followed by honest conversations with customers about anything at risk.
</context>

<task>
Source material:

<source_material>
{{commitments_source_material}}
</source_material>

{{#current_roadmap}}
Current roadmap:

<current_roadmap>
{{current_roadmap}}
</current_roadmap>
{{/current_roadmap}}

1. Extract every commitment: customer, what was promised (feature, integration, behaviour, service level), any date, the source (contract clause, order form, statement of work, email, call note) and the exact words, quoted.
2. Rate wording strength:
   - contractual: in a signed contract, order form or statement of work, with obligation words ("will deliver", "shall provide by") or linked remedies (credits, termination rights, refunds).
   - written promise: in writing from the company, specific about what and when, but not in a contract.
   - soft: intentions and hedges ("on the roadmap", "we plan to", "hopefully Q3").
   - unclear: you cannot tell from the text; say what document would settle it.
3. Note revenue at stake (deal value, renewal date) only where given, and the consequence named in the source.
4. Compare with the roadmap if given: on plan, at risk (planned later than promised or partly), not planned, or in conflict with another customer's commitment.
5. Score risk as high, medium or low from strength, gap to the roadmap, revenue and time to the date.
6. For each high-risk item, draft a short, honest follow-up for the account owner to send: what was expected, the current position, what the company can offer instead (date range, workaround, partial delivery), and a request to talk. Contractual items are drafted for review by the company's legal contact before sending.
7. Propose a light process so new promises enter the register: who may promise dates, the wording sales should use, and a check before contract signature.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the source words; never paraphrase a commitment into something stronger or weaker.
- Rating strength is a reading of the text, not a legal opinion on enforceability. For contractual items with remedies, say "review with your legal contact" and do not predict what a customer could claim.
- Do not invent deal values, renewal dates or owners. Missing ones become [X].
- Follow-ups must not admit fault, waive rights or promise new dates the roadmap does not support; offer ranges and next steps.
- If the material contains no commitments, say so and list what kinds of documents usually do.
</constraints>

<output_format>
## Summary
Counts by strength and risk, total revenue at stake where known, and the three most urgent items.

## Commitment register
Table: # | customer | promised | date | source | quoted words | strength | revenue and renewal | roadmap status | risk | owner.

## Conflicts with the roadmap
Bullets.

## Follow-ups for at-risk promises
One draft per high-risk item (under 150 words), labelled "legal review first" where contractual.

## Process fix
Five bullets or fewer.

## Questions
Missing documents and facts to confirm.
</output_format>
