---
schema: 1
id: build-net-worth-statement
kind: prompt
title: Build a net worth statement
description: Builds a personal net worth statement from assets and debts with consistent valuation rules, a liquid versus illiquid split and a quarterly update template that separates saving from market moves.
category: financial-planning
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [net-worth, balance-sheet, financial-tracking, quarterly-review]
pairs_with:
  prompts: [plan-financial-independence, plan-debt-payoff]
  workflows: [financial-checkup-track]
  personas: [personal-finance-coach]
args:
  - name: assets
    description: What you own with rough values - cash and savings, investments, pensions, home and other property, vehicles, money owed to you, business stakes. Note anything held jointly.
    type: text
    required: true
  - name: debts
    description: What you owe - mortgage, car finance, student loans, credit cards, overdrafts, buy-now-pay-later, family loans - with balances (and rates if you know them).
    type: text
    required: true
  - name: currency
    description: Currency to report in, and exchange rates to use if some items are in other currencies. Optional; the main currency in your input is used.
    type: string
output_contract:
  format: markdown
  sections: [Net worth at a glance, Statement, Valuation notes, What the numbers show, Quarterly update template, What moves it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A net worth statement is a personal balance sheet: what you own minus what you owe, on a given date. Its value comes from repeating it with the same rules, so the trend is real. That means consistent, conservative valuations (resale value, not purchase price; a cautious home estimate; pensions at their current statement value), and separating what is liquid (reachable within weeks) from what is locked away (pensions, home equity). Tracked quarterly, it shows whether progress comes from saving and paying down debt or from markets doing the work.

{{#currency}}Reporting currency and rates: {{currency}}{{/currency}}

<assets>
{{assets}}
</assets>

<debts>
{{debts}}
</debts>
</context>

<task>
1. Classify assets: cash and savings; investments outside pensions; pensions and retirement accounts; home; other property; vehicles; money owed to you; business interests; other. Personal belongings are excluded unless the person lists something with a real resale market.
2. Classify liabilities: mortgage; other secured loans; student loans; credit cards and overdrafts; personal and family loans; other.
3. Apply valuation rules and note each one: vehicles at likely resale value, home at a cautious estimate (optionally minus about 5% selling costs as a "net realisable" line), pensions at statement value, shares at current value, joint items at the person's share if they want an individual statement. Convert other currencies at the stated rate, or at a rate you state and label.
4. Exclude things that are not assets yet: expected inheritances, unvested employer shares (list separately as a memo item), future salary. Explain briefly why.
5. Compute: total assets, total liabilities, net worth; liquid net worth (cash plus non-pension investments minus non-mortgage debt); and, if rates are given, the cost of debt per year.
6. What the numbers show: three or four observations in plain words (for example most wealth is home equity; high-interest debt is costing X a year; liquid net worth covers N months if spending is known). A negative net worth early in a career is common; say so without judgement.
7. Quarterly update template: a table the person can copy with a column per quarter and two derived lines, "change from saving and debt repayment" and "change from market and valuation moves", plus a three-step routine.
8. What moves it: the four drivers (saving, debt repayment, investment returns, depreciation and revaluation) in one line each.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. If a value is missing, show [X] and ask; do not guess.
- Keep the arithmetic exact and visible in the totals.
- No investment or product recommendations; observations only.
- Do not ask for account numbers or provider names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Net worth at a glance
Total assets, total liabilities, net worth, liquid net worth.

## Statement
Two tables (assets, liabilities): item | category | value | valuation basis. Totals.

## Valuation notes
Bullets, including exclusions and memo items.

## What the numbers show
Three or four bullets.

## Quarterly update template
Copyable table plus the routine.

## What moves it
Four lines.
</output_format>
