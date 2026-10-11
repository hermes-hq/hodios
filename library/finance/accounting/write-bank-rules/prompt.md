---
schema: 1
id: write-bank-rules
kind: prompt
title: Write bank feed rules
description: Writes bank-feed categorisation rules for accounting software from past transactions - match conditions, account, tax code and exceptions - so routine lines code themselves correctly.
category: accounting
version: 1.0.0
status: incubating
stage: [build]
role: [individual, founder, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bank-feeds, automation, transaction-coding, bookkeeping-software]
pairs_with:
  prompts: [set-up-chart-of-accounts, reconcile-bank-account, convert-bank-csv-for-import]
  personas: [bookkeeper]
args:
  - name: transactions
    description: Two or three months of past bank lines with how each was coded - date, description as the bank shows it, amount, account used, tax code if any. Remove account numbers.
    type: text
    required: true
  - name: chart_of_accounts
    description: Your account names or codes and tax codes, and the software you use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Patterns found, Rules to create, Lines to keep manual, Conflicts and order, Monthly rule review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write bank rules the way an experienced bookkeeper does to cut coding time without baking in mistakes. Good rules match on a stable part of the bank description (the merchant name, not the changing reference), add an amount or direction condition where one payee covers different things, and set the account, tax code and a clean description. Rules go wrong in predictable ways: a broad "contains" condition catches unrelated lines ("AMZN" covering stock, office supplies and personal purchases), a rule auto-codes a payment that should be matched to an open bill or invoice (creating duplicates), transfers between own accounts get coded as income or expense, a supplier whose costs must be split (phone partly personal, loan repayment partly interest) gets one account, and rules for VAT or sales tax apply the wrong code. Rules for customer receipts and supplier payments that have invoices in the system should usually be avoided; those lines should be matched instead.

Chart and software:

<chart_of_accounts>
{{chart_of_accounts}}
</chart_of_accounts>
</context>

<task>
Past transactions:

<transactions>
{{transactions}}
</transactions>

1. Group the lines by payee and pattern. For each group, note how consistently it was coded and any inconsistencies (same payee, different accounts).
2. Write a rule for each group that is regular and consistent: name, match conditions (description contains or equals a stable token, money in or out, amount range if needed), account, tax code, description to set, and whether it auto-confirms or only suggests.
3. For payees that need splitting (loan repayments, mixed-use phone or vehicle), write a split rule with fixed amounts or percentages only where the user's data supports it; otherwise keep them manual.
4. List lines to keep manual: customer receipts and supplier payments with invoices or bills to match, transfers between own accounts (use the transfer function), one-off or irregular items, and payees used for mixed purposes.
5. Point out conflicts (two rules that could match one line) and give the order to set them in.
6. Flag inconsistencies in past coding that should be corrected before rules lock them in.
7. Give a monthly rule review: spot-check auto-coded lines, look for new payees, retire rules for ended subscriptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Base every rule on the lines given. Do not invent payees or accounts; use only accounts and tax codes from the user's chart.
- Do not decide tax codes as fact where the past coding is inconsistent; flag it for the accountant.
- Describe rule fields generically and tell the user to check exact field names in their software's help pages.
- Prefer "suggest" over "auto-confirm" for any rule with variable amounts or mixed use.
</constraints>

<output_format>
## Patterns found
Table: payee or pattern | lines | coded as | consistent or not.

## Rules to create
Table: rule name | conditions | account | tax code | description | auto or suggest.

## Lines to keep manual
Bullets with reasons.

## Conflicts and order
Numbered.

## Monthly rule review
Checklist.
</output_format>
