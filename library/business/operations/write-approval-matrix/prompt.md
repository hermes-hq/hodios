---
schema: 1
id: write-approval-matrix
kind: prompt
title: Write an approval matrix
description: Writes a delegation-of-authority matrix stating who can approve spend, contracts, hires, refunds, discounts and payments at which limits, with backups and the rules around it.
category: operations
version: 1.0.0
status: incubating
stage: [design, build]
role: [founder, operations-manager, executive, manager]
requires: [none]
inputs: [notes, text]
output: [table, docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [delegation-of-authority, approval-limits, spending-authority, governance, decision-rights]
pairs_with:
  prompts: [set-up-purchase-order-process, build-raci-matrix, set-up-internal-controls]
args:
  - name: organisation
    description: Size, roles and reporting lines, typical spend and deal sizes, and how approvals work today (including where they get stuck or skipped).
    type: text
    required: true
  - name: decisions
    description: Optional list of the decision types to cover. Leave empty to propose a standard set.
    type: text
  - name: fixed_limits
    description: Anything fixed already - board or owner reserved matters, investor or bank covenants, budget rules, limits already set.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Approval matrix, Reserved matters, Absence and backups, Rules of use, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An approval matrix (delegation of authority) lets work move without the owner signing everything, while keeping big or unusual commitments with the right person. Good matrices are organised by decision type, not just by amount, because a 5,000 software contract with auto-renewal and data processing is riskier than a 5,000 stock order. They state whether limits apply per transaction, per contract total over its whole term, or per year; they ban splitting a purchase to stay under a limit; they separate approving a commitment from releasing a payment; they name a backup for every approver; and they say what is outside the matrix entirely (reserved for the owner or board). Limits should be set so that most routine decisions sit with the people closest to the work, typically checked against how many approvals each level would actually receive per week.
</context>

<task>
Organisation:
<organisation>
{{organisation}}
</organisation>

{{#decisions}}Decisions to cover:
<decisions>
{{decisions}}
</decisions>{{/decisions}}

{{#fixed_limits}}Fixed constraints:
<fixed_limits>
{{fixed_limits}}
</fixed_limits>{{/fixed_limits}}

1. State the principles: limits by decision type, whole-contract value, no splitting, approval separate from payment, no self-approval, conflicts of interest declared.
2. Cover decision types relevant to this organisation (if none given): budgeted and unbudgeted spend, capital purchases, supplier contracts and renewals, customer contracts, discounts and pricing exceptions, refunds and credit notes, write-offs, hiring and pay changes, payments release, bank and supplier detail changes, legal claims, public statements.
3. Propose limits for each role level using the spend and deal sizes given. Where you lack information, propose a placeholder tier and mark it `[CONFIRM]`, explaining the logic (for example a level that keeps routine items with team leads).
4. Mark items needing two approvers or the owner regardless of value (for example contracts with personal guarantees, unlimited liability, data sharing, or terms over a set length).
5. List reserved matters kept with the owner or board.
6. Set out absence cover: backup for each approver and how emergency approvals are recorded.
7. Write rules of use: where approvals are recorded, how to check the limit, what happens with a breach, and when the matrix is reviewed.
8. List points to confirm.
</task>

<constraints>
- Do not invent the business's actual limits as decided facts; present them as proposals with the reasoning.
- Never allow anyone to approve their own expenses, pay or a payment to themselves or a related party.
- Where company law, articles, funder or bank terms may reserve decisions to directors or members, flag it to confirm rather than stating the law.
- Keep the matrix to one page where possible; move detail into the rules.
</constraints>

<output_format>
## Principles
## Approval matrix
Table: Decision type | Role level 1 | Role level 2 | Role level 3 | Owner or board | Notes (two approvers, conditions).
## Reserved matters
## Absence and backups
## Rules of use
## Points to confirm
</output_format>
