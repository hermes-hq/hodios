---
schema: 1
id: franchise-purchase-track
kind: workflow
title: Buy a franchise
description: Takes a franchise purchase through gated steps - shortlisting brands, validation calls, territory and numbers, documents to review with a solicitor and accountant, and the decision and opening plan.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan, review, ship]
role: [founder, individual]
requires: [none]
inputs: [text, document, notes]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [franchise, due-diligence, franchise-agreement, territory, unit-economics, buyer-journey]
pairs_with:
  prompts: [prepare-franchisee-validation-calls, plan-franchise-unit-opening, evaluate-buying-a-business, evaluate-franchise-territory, review-commercial-lease]
args:
  - name: budget
    description: Money you can invest (your own cash, borrowing you could get), the income you need from the business and by when, and what you will not risk (your home, all savings).
    type: text
    required: true
  - name: interests
    description: Sectors or brands you are considering, your skills and work history, whether you want to work in the unit or manage it, and the country and area.
    type: text
steps:
  - {id: shortlist, file: steps/01-shortlist.md, stage: discover, gate: approve, artifact: "franchise/01-shortlist.md"}
  - {id: validate, file: steps/02-validation.md, stage: discover, gate: approve, artifact: "franchise/02-validation.md"}
  - {id: numbers, file: steps/03-territory-and-numbers.md, stage: plan, gate: approve, artifact: "franchise/03-numbers.md"}
  - {id: documents, file: steps/04-documents.md, stage: review, gate: approve, artifact: "franchise/04-documents.md"}
  - {id: decide, file: steps/05-decide-and-open.md, stage: ship, gate: none, artifact: "franchise/05-decision.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides someone buying a franchise from a long list of brands to a signed decision and an opening plan, the way a careful buyer with a good adviser would: fit first, then evidence from franchisees, then numbers for the specific territory, then the documents with professionals, then a decision made against rules set in advance. Each step stops for approval.

<budget>
{{budget}}
</budget>
{{#interests}}

<interests>
{{interests}}
</interests>
{{/interests}}

Rules for every step:
- Use only facts the buyer provides or reads from the franchisor's documents. Never invent a brand's fees, sales, failure rates or reputation; mark gaps as [X] and keep a running list of questions for the franchisor.
- Franchise disclosure and cooling-off rules differ by country. Frame them as checks and ask for the country if it is missing.
- Never recommend a specific brand or tell the buyer to buy. Set decision rules early and test against them.
- Treat the franchisor's projections as claims to verify, not evidence.
{{> guardrails/professional-limits}}
- End every step with open questions and the next approval.
