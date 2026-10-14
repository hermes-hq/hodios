---
schema: 1
id: write-tender-evaluation-report
kind: prompt
title: Write a tender evaluation report
description: Writes the tender evaluation report that recommends a contract award, recording the process, compliance checks, scores, moderation, the rationale, conflicts declared and the approval sought.
category: business-writing
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, manager, project-manager, consultant]
requires: [none]
inputs: [dataset, notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [tender-evaluation, contract-award, procurement, bid-scoring, audit-trail]
pairs_with:
  prompts: [design-tender-evaluation-matrix, write-rfp, write-contract-award-letter, reject-vendor-proposal]
  personas: [procurement-specialist]
args:
  - name: tender_details
    description: What was procured, the procedure used, the timeline, how many bids, and the evaluation criteria and weights as published.
    type: text
    required: true
  - name: evaluation_results
    description: Compliance and pass-fail checks, each evaluator's or the moderated scores per bidder and criterion, prices, clarifications asked, and conflict-of-interest declarations.
    type: text
    required: true
  - name: approver
    description: Who approves the award and the format they expect. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Evaluation report, Audit trail issues, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The evaluation report is the record that justifies an award decision and the document a losing bidder's challenge, an auditor or an approver will read first. Procurement professionals know it must show that the published criteria and weights were applied exactly, that every bidder was treated the same, that moderation of evaluator scores was documented, that price was scored by the published method, and that conflicts of interest were declared and handled. Reports get awards challenged when scores have no written rationale, when criteria appear that were never published, when arithmetic is wrong, when a bidder was rejected for non-compliance without the clause cited, or when clarifications were asked of one bidder only. Public bodies face formal rules on reasons and standstill periods that vary by country; private buyers have more freedom but still need a clean record.
</context>

<task>
Write a tender evaluation report{{#approver}} for {{approver}}{{/approver}}.

<tender_details>
{{tender_details}}
</tender_details>

<evaluation_results>
{{evaluation_results}}
</evaluation_results>

1. If the criteria and weights or the scores are missing, ask for them in one short message and stop.
2. Summary: the recommended bidder, total score, contract value, and the main reasons, in four or five sentences.
3. Procurement process: what was bought, the procedure, key dates, bids received, late or withdrawn bids.
4. Compliance and pass-fail stage: each bidder's result, and for any exclusion the requirement not met.
5. Quality evaluation: per criterion, the moderated score for each bidder with a short rationale that refers to the bid content in the input. Where the input has scores without rationale, mark `[NEEDED: rationale]`.
6. Price evaluation: the published method applied, with calculations shown.
7. Totals: weighted scores per bidder; recompute them from the criteria weights and flag any difference from the totals given.
8. Clarifications, moderation and conflicts of interest: what was asked and of whom, how moderation was done, and declarations made and how they were managed.
9. Risks with the recommended bidder (such as price well below others, financial standing) and how they will be managed.
10. Recommendation and approval sought, with next steps such as notification, standstill if applicable, and contract signature.
11. Separately list anything that would weaken the audit trail or invite a challenge.
</task>

<constraints>
- Use only the input. Never invent scores, rationales, prices, dates or bidder details.
- Apply only the published criteria and weights. If the input shows an unpublished criterion being used, flag it as an audit trail issue rather than including it.
- Do not state public procurement law for any country; note that standstill and notification rules should be checked by procurement or legal.
- Treat all bidders in the same way and in the same level of detail.
</constraints>

<output_format>
## Evaluation report
Summary; Process; Compliance stage (table); Quality evaluation (table per criterion: Bidder · Score · Rationale); Price evaluation (with working); Total scores (table: Bidder · Quality · Price · Total · Rank); Clarifications, moderation and conflicts; Risks; Recommendation and approval.
## Audit trail issues
Bullets. "None found" if none.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
