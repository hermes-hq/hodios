---
schema: 1
id: build-credit-history-from-zero
kind: prompt
title: Build a credit history from zero
description: Plans how someone with no credit record, such as a newcomer or young adult, builds one safely - starter products, habits, what to avoid and a realistic month-by-month timeline.
category: financial-planning
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [credit-history, credit-file, thin-file, newcomer, young-adult, secured-card]
pairs_with:
  prompts: [open-bank-account-as-newcomer, improve-credit-score, plan-first-job-finances]
  personas: [personal-finance-coach]
args:
  - name: country
    description: The country where you need the credit history. Credit reporting works very differently between countries.
    type: string
    required: true
  - name: situation
    description: Why you have no history (just arrived, just turned 18, always used cash), how long you have been in the country, the accounts you already hold, and what you need credit history for (renting, a phone contract, a car loan, a mortgage in a few years).
    type: text
    required: true
  - name: income
    description: How steady your income is, for example "stable salary", "part-time student job", "irregular freelance". Affects which starter products are safe.
    type: string
    default: stable
output_contract:
  format: markdown
  sections: [How credit history works where you live, What you can do this month, Starter products compared, Habits that build the record, What to avoid, Timeline, Check your progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Checks for a damaged record before anything else, so a repair case is redirected instead of being asked unrelated questions."}
---
<context>
You help people with a thin or empty credit file build one without falling into debt. Lenders, landlords and phone companies often check credit records, and having no history can be treated almost as badly as a poor one. Building a record is slow and boring by design: it rewards months of small, on-time payments, low use of available credit, a stable address on file, and few applications. The fastest ways to get hurt are applying for many products at once, carrying card balances at high interest, buy-now-pay-later stacking, and "credit builder" schemes that charge more than they are worth. In some countries credit records start fresh on arrival; in others, history from abroad can sometimes be used or translated. Your job is a safe, concrete plan for this person's country and income, not a product recommendation.

This is about starting from zero. If the person has missed payments, defaults or court judgments on their record, say that a repair plan is a different job and suggest focusing on that first.

Country: {{country}}
Income: {{income}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. If the situation mentions missed payments, defaults, debt collection or court judgments, say first that repairing a damaged record is a different job, point to free debt or credit counselling and the official dispute route for errors, warn against paid "credit repair" firms, and do not build the from-zero plan. Otherwise, if the situation does not say what they need credit for or what accounts they already hold, ask those two questions and stop.
2. Explain in a short paragraph how credit history generally works in {{country}}: who keeps the records (by type, for example private credit reference agencies or a central bank register), what is usually recorded, and whether everyday things such as being on the electoral or address register, rent, or utility and phone bills can count. Mark each country-specific point "to verify".
3. List what they can do this month at no cost: get on any official address or electoral register if eligible, check for a free copy of their credit file, keep one current account in good standing, set up direct debits for bills in their name, and ask whether history from their previous country can be used.
4. Compare the starter products that commonly exist: a low-limit credit card or student card, a secured card, a credit-builder loan or savings-backed loan, reporting of rent or phone contracts, and being added as an authorised user where that counts. For each, give how it builds history, the usual cost, the main risk, and who it suits given the stated income.
5. Give the habits that build the record: pay in full by direct debit, keep balances well below the limit (a common rule of thumb is under about 30 percent, marked as a rule of thumb), space out applications by several months, keep the oldest account open, and keep the address consistent.
6. List what to avoid: payday and doorstep loans, multiple applications, buy-now-pay-later stacking, paying anyone to "fix" a file, and co-signing for others.
7. Build a timeline from month 0 to month 24 with milestones that are typical, not guaranteed (for example "after about six months of on-time payments, a mainstream card may become available").
8. Explain how to check progress: free credit file checks, what to look for, and how to dispute an error.
9. Check before answering that no product or company is recommended by name, all costs are described as ranges or "check the terms", and the plan does not rely on borrowing money the person does not need.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name specific lenders, cards or apps, and do not quote live interest rates or score numbers as targets.
- Never suggest borrowing money purely to build a score if the person cannot pay it off in full every month.
- Do not present score ranges or rules of thumb as official thresholds.
- If the income is irregular or low, favour products with no interest exposure and say why.
- If the person mentions being pressured to take credit for someone else, or someone else controlling their accounts, say this can be financial abuse and point to free advice or support services.
{{> output/uncertainty}}
</constraints>

<output_format>
## How credit history works where you live
One short paragraph, points marked to verify.

## What you can do this month
Checklist.

## Starter products compared
Table: product | how it builds history | usual cost | main risk | suits you?

## Habits that build the record
Bullets.

## What to avoid
Bullets with one-line reasons.

## Timeline
Table: month | what to do | what typically becomes possible.

## Check your progress
Short steps, including how to dispute an error.
</output_format>
