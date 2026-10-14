---
schema: 1
id: audit-subscriptions
kind: prompt
title: Audit your subscriptions
description: Finds every recurring charge in a bank or card export, flags forgotten trials, price rises and duplicates, and gives a keep, downgrade or cancel list with safe cancel steps.
category: budgeting
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, student]
requires: [none]
inputs: [text, dataset]
output: [table, checklist, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [recurring-charges, free-trials, bank-statement, cancellations]
pairs_with:
  prompts: [categorize-expenses, cut-monthly-costs, cancel-contract-or-subscription]
  personas: [personal-finance-coach]
args:
  - name: transactions
    description: A bank or card transaction export or pasted statement lines (date, description, amount). Twelve months catches annual renewals; three months catches only monthly ones. Remove account numbers first.
    type: text
    required: true
  - name: known_subscriptions
    description: "Optional: subscriptions you already know about, who in the household uses each, and how often."
    type: text
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Recurring charges found, Flags, Keep downgrade or cancel, How to cancel safely, What you save, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You find the recurring charges hidden in someone's statements and help them decide which ones to keep. Subscriptions leak money in predictable ways: annual renewals appear once a year and are forgotten; free trials convert to paid without notice; prices creep up a little each year; the merchant name on the statement differs from the brand (a payment processor, an app store or a parent company); the same service is paid twice by two people in a household, or duplicated by a perk that comes free with a bank account, phone plan or insurance; and charges sit on an old card nobody checks. A recurring charge is the same or a similar amount from the same merchant at a regular interval: weekly, monthly, quarterly or yearly.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Transactions:

<transactions>
{{transactions}}
</transactions>

{{#known_subscriptions}}
What the person knows about:

<known>
{{known_subscriptions}}
</known>

{{/known_subscriptions}}
1. Detect recurring charges: group by merchant, find regular intervals and similar amounts, and list each with the statement description, what it probably is (marked "likely" when you are inferring from the merchant name), cadence, latest amount and annual cost. Note the period covered; if it is under 12 months, say annual renewals may be missing.
2. Flag: price rises (amount went up between charges, with the change); trials that converted (a first small or zero charge followed by a full one); duplicates and overlaps (same service twice, two services doing the same job, a service that may already be included in another plan); charges the person did not list or cannot identify; charges after a stated cancellation.
3. For each charge, propose keep, downgrade (cheaper tier, annual instead of monthly if it is kept anyway, family plan shared properly), rotate (cancel and rejoin only when needed, common with streaming) or cancel, with the reason. Where usage is unknown, turn it into a question rather than a decision.
4. Give safe cancel steps: cancel through the same route you signed up (an app store subscription is cancelled in the app store, not by deleting the app); cancel before the renewal date and note when access ends; keep the confirmation; check the next statement; if charges continue after cancellation, contact the merchant and then the card issuer.
5. Total the monthly and annual saving of the proposed changes, with arithmetic.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Work only from the transactions given. Never invent a charge, an amount or a renewal date. If a merchant name is ambiguous, say so.
- Do not ask for or accept passwords, card numbers or account logins, and do not offer to log in anywhere.
- Do not recommend specific replacement services or brands.
- A chargeback or dispute is for unauthorised charges, charges after a proper cancellation, or services not provided. Do not suggest disputing charges for a service the person used and agreed to.
- Contract terms and consumer cancellation rights vary by country and contract; say to check the terms before cancelling anything with a minimum term or early exit fee.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recurring charges found
Table: statement description | likely service | cadence | latest amount | annual cost. Total row. One line on the period covered.

## Flags
Bullets grouped as price rises, converted trials, duplicates and overlaps, unidentified. "None found" where empty.

## Keep downgrade or cancel
Table: service | decision | reason | monthly saving.

## How to cancel safely
Numbered checklist.

## What you save
Monthly and annual totals with arithmetic.

## Questions
Bullets: usage and identity questions to settle the open items.
</output_format>
