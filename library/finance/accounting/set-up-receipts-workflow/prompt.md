---
schema: 1
id: set-up-receipts-workflow
kind: prompt
title: Set up a receipts and expenses workflow
description: Sets up a receipts and expenses workflow for a small team, covering capture, required fields, approval limits, categorisation, reimbursement, month-end cut-off and a rollout plan.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [expense-management, receipts, reimbursement, approval-workflow]
pairs_with:
  prompts: [track-business-expenses, prepare-month-end-close, set-up-chart-of-accounts]
  personas: [bookkeeper]
args:
  - name: team_size
    description: How many people spend money on behalf of the business.
    type: number
    required: true
  - name: tools
    description: Tools you use now or are considering (bookkeeping software, company cards, an expense app, shared folders, email). Optional.
    type: text
  - name: policy
    description: Any existing expense policy or rules, typical spend types (travel, meals, software, supplies), and current pain points such as lost receipts or late claims. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Workflow at a glance, Policy rules, What every receipt needs, Approval limits, Categories, Reimbursement, Month-end cut-off, Rollout, Gaps in the current setup]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the process by which a small team's spending turns into clean, approved, correctly categorised entries in the books, with the evidence needed for tax and VAT. The usual failures are boring and expensive: receipts lost before anyone records them, card transactions with no explanation at month end, people waiting weeks to be paid back, VAT reclaimed without a valid tax invoice, and the founder approving everything at midnight. A good workflow captures the receipt at the moment of purchase, asks the spender for the few facts only they know, and routes by amount.

Team size: {{team_size}}
</context>

<task>
{{#tools}}Tools: {{tools}}{{/tools}}

{{#policy}}Current policy and pain points:

<policy>
{{policy}}
</policy>{{/policy}}

1. Draw the workflow as numbered steps from purchase to posted entry, with an owner and a time limit for each: capture, submit, approve, categorise, pay or reconcile, archive. Distinguish company card spend from out-of-pocket claims.
2. Write the policy rules in plain language: what is allowed, limits per type, what needs pre-approval, the submission deadline (for example within 7 days and before month end), and what happens with late claims.
3. List what every receipt record needs: date, supplier, amount, tax or VAT amount, a valid tax invoice where VAT is reclaimed, business purpose, project or client if recharged, attendees for meals or entertainment. Explain the lost-receipt process.
4. Set approval limits by amount and role, sized to the team, including who approves the approver's own spending.
5. Map spend types to a short list of categories (or the user's chart of accounts if given), with tax treatment flagged "verify" for meals, entertainment, gifts and mixed-use items.
6. Set the reimbursement cycle and method.
7. Define the month-end cut-off: all card transactions explained, claims in, accruals for unclaimed spend.
8. Give a rollout plan for the first month and list gaps in the current setup.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Size the process to the team: a three-person team does not need a three-level approval chain. Keep every step justified.
- Describe what tools must do rather than recommending a brand, unless the user named tools; then fit the workflow to those tools.
- Mark tax and VAT rules "verify" for the user's country; do not decide what is deductible or reclaimable.
- Nobody approves their own spending; say who covers the founder's or approver's expenses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Workflow at a glance
Numbered steps: step | owner | time limit.

## Policy rules
Bullets the team can read in two minutes.

## What every receipt needs
Checklist, then the lost-receipt process.

## Approval limits
Table: amount | approver | notes.

## Categories
Table: spend type | category | tax note (verify).

## Reimbursement
Two or three bullets.

## Month-end cut-off
Checklist.

## Rollout
Week-by-week list for the first month.

## Gaps in the current setup
Bullets.
</output_format>
