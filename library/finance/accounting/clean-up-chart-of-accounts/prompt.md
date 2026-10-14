---
schema: 1
id: clean-up-chart-of-accounts
kind: prompt
title: Clean up a chart of accounts
description: Rationalises a messy existing chart of accounts into a lean one, with a merge and mapping plan, archive steps and checks that keep past periods comparable.
category: accounting
version: 1.0.0
status: incubating
stage: [maintain]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chart-of-accounts, account-mapping, ledger-cleanup, management-reporting]
pairs_with:
  prompts: [set-up-chart-of-accounts, switch-accounting-software, review-small-business-pnl]
  personas: [bookkeeper]
args:
  - name: current_chart
    description: Your current accounts - code, name, type, and if possible the balance or year's activity on each. An export from your software is ideal.
    type: text
    required: true
  - name: business
    description: What the business does, the reports you and your accountant actually use, your software, and whether you track by department, location or project.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Problems found, Proposed chart, Mapping table, Cleanup steps, Checks after the change, Questions for your accountant]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You tidy charts of accounts the way an experienced bookkeeper does for a business that has outgrown its setup. Messy charts usually show the same problems: near-duplicate accounts ("Software", "Subscriptions", "SaaS"), accounts per supplier or per customer that belong in contacts, accounts per project or location that belong in tracking categories or classes, unused accounts, generic catch-alls ("Sundry", "Misc", "Ask accountant") with large balances, and inconsistent numbering. A good chart is short enough that people pick the right account without thinking, and detailed enough for the profit and loss your decisions and tax return need. Most software will not let you delete an account with history; you archive it after moving or merging, and merging in some systems rewrites history while in others it only applies going forward. Changes are cleanest at a period start, with a mapping table so last year's figures can be restated on the new basis.

Business: {{business}}
</context>

<task>
Current chart:

<current_chart>
{{current_chart}}
</current_chart>

1. List the problems found, grouped by type (duplicates, should-be-contacts, should-be-tracking, unused, catch-alls, numbering, wrong type), with the accounts affected.
2. Propose a target chart: numbered ranges by type, each account with a one-line rule for what goes in it. Keep system accounts the software requires (receivables, payables, tax control, retained earnings, bank) untouched.
3. Build the mapping table: every current account to its new account and the action (keep, rename, merge into, move to tracking, archive), so nothing is left unmapped.
4. Write the cleanup steps in order: pick the change date (a period start), back up or export reports, create new accounts, update bank rules and integrations, reclassify open-period balances with journals where needed, merge or archive, then lock the prior period if the software allows.
5. Note which actions behave differently by software (merge rewriting history, tax defaults on new accounts) and say to check the vendor's help pages.
6. List checks after the change: trial balance totals unchanged, profit for the period unchanged, tax reports unchanged, no transactions left on archived accounts.
7. List questions for the accountant (accounts their year-end file or tax return depends on).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the accounts given. Do not invent balances.
- Never propose changes to system or control accounts, retained earnings or prior-period figures that have been filed or reported.
- Do not claim exact menu steps for a product; describe the action and point to its help pages.
- Keep the proposed chart lean; justify every account over the minimum.
</constraints>

<output_format>
## Problems found
Bullets by type.

## Proposed chart
Table: code | name | type | what goes here.

## Mapping table
Table: current code | current name | action | new code | note.

## Cleanup steps
Numbered.

## Checks after the change
Checklist.

## Questions for your accountant
Bullets.
</output_format>
