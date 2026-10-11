---
schema: 1
id: set-up-budgeting-app
kind: prompt
title: Set up a budgeting app
description: Plans how to set up a budgeting app from your method and real spending - accounts to link, a lean category list, auto-categorisation rules, targets and a first-month routine.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [budgeting-apps, categories, money-routine, zero-based-budget]
pairs_with:
  prompts: [design-budget-spreadsheet, categorize-expenses, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: method
    description: How you want to budget in the app - zero-based (give every unit of income a job), envelope (fixed limits per category), 50-30-20, or tracking-only (watch spending without a plan).
    type: enum
    enum: [zero-based, envelope, 50-30-20, tracking-only]
    default: zero-based
  - name: spending
    description: Your accounts and cards (types only, no numbers), pay frequency, and roughly what you spend each month by area. A summary or a categorised export both work.
    type: text
    required: true
  - name: app
    description: "Optional: the app you chose, or the kind of app (bank's built-in tool, bank-syncing app, manual-entry app). Leave blank for generic steps."
    type: string
  - name: household
    description: "Optional: who shares the budget and how money is split (joint account, separate accounts, one person runs it)."
    type: text
output_contract:
  format: markdown
  sections: [Setup order, Accounts to connect, Category list, Auto-categorisation rules, Targets, First-month routine, Common pitfalls, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone set up a budgeting app so they are still using it in three months. Most app set-ups fail in the first few weeks for the same reasons: linking every account at once and facing hundreds of uncategorised transactions; copying a default list of 60 categories; transfers between the person's own accounts and credit card payments counted as spending, so totals double; budgeting money that has not arrived yet; bank-sync delays and duplicate imports that make balances wrong; and no fixed time to review, so the app drifts out of date. A good set-up starts lean (15 to 25 categories grouped into a few headings), connects the main accounts first, and spends ten minutes a week keeping it true.

Method: {{method}}
{{#app}}App: {{app}}{{/app}}
</context>

<task>
Accounts and spending:

<spending>
{{spending}}
</spending>

{{#household}}
Household:

<household>
{{household}}
</household>

{{/household}}
1. Give the setup order as numbered steps: choose the start date (ideally the next payday), connect or add accounts, set starting balances, create categories, add rules, set targets, run a first weekly review.
2. Accounts: which to connect first (the main current account and the card used most), which later, and how to treat each type: credit cards (payments to the card are transfers, purchases are spending), savings accounts (transfers, or goal tracking), loans, cash (manual entries or a cash category), shared or joint accounts.
3. Category list: build 15 to 25 categories from the person's real spending, grouped under headings such as Bills, Everyday, Irregular, Goals and Debt. Add sinking-fund categories for irregular costs they will face. Fit the list to the method: zero-based needs a home for every unit of income, envelope needs limits on variable categories, 50-30-20 needs each category tagged need, want or saving, tracking-only can be shorter.
4. Auto-categorisation rules: rules for the recurring merchants and patterns visible in the input, a rule to mark transfers between own accounts, and a note on reviewing new merchants by hand for the first month.
5. Targets: monthly amounts or limits per category from the spending given, with sinking-fund targets as yearly cost / 12. For zero-based, budget only income already received.
6. First-month routine: a weekly 10-minute review (approve imports, fix categories, check for duplicates, compare balances with the bank) and an end-of-month reset; what to adjust after month one and month three.
7. If an app was named, describe steps in terms of features most budgeting apps share (accounts, categories, rules, targets) and tell the person to check the app's own help pages for exact menu names.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific app, bank or paid product. If the person has not chosen, describe the trade-offs between bank-syncing, manual-entry and bank built-in tools in general terms.
- Do not invent menu paths, button names or features for a named app. Describe the action generically.
- Never ask for account numbers, logins or passwords. Mention that linking a bank usually goes through the bank's own approval screen, and that the person should check what access the app gets and how to remove it.
- Use the person's spending figures; if a figure is missing, mark the target as a placeholder to fill in.
{{> output/uncertainty}}
</constraints>

<output_format>
## Setup order
Numbered steps.

## Accounts to connect
Table: account type | connect now or later | how to treat it.

## Category list
Grouped list of 15 to 25 categories, each with a one-line note on what goes in it.

## Auto-categorisation rules
Table: matches | category | note.

## Targets
Table: category | monthly target | basis.

## First-month routine
Weekly checklist and month-end checklist.

## Common pitfalls
Up to five bullets, each with the fix.

## Questions
Bullets: anything to confirm.
</output_format>
