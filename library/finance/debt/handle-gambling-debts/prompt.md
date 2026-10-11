---
schema: 1
id: handle-gambling-debts
kind: prompt
title: Deal with debts from gambling
description: Helps someone with debts from gambling get the money side under control - every debt listed, blocks on gambling and new credit, priority bills protected, creditors contacted and support found.
category: debt
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [financial, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [gambling-harm, self-exclusion, spending-blocks, priority-debts]
pairs_with:
  prompts: [plan-gambling-reduction, plan-debt-payoff, negotiate-with-creditor, prepare-for-debt-advice-appointment]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: What you owe from or around the gambling - cards, loans, overdrafts, payday loans, money borrowed from family or friends - with rough balances and anything behind.
    type: text
    required: true
  - name: situation
    description: Income, essential bills and whether any are behind, who else in the household is affected, and whether you are still gambling. Share only what you are comfortable with. Optional.
    type: text
  - name: country
    description: Country and region, because blocking tools, self-exclusion schemes and support services differ.
    type: string
output_contract:
  format: markdown
  sections: [First, Put barriers in place, Your debts on one page, Protect the essentials, Talking to creditors, Support for you and your family]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deal with the money side of gambling harm. Debt and gambling feed each other: the urge to win back losses ("chasing") is one of the strongest drivers, and access to fast credit makes it worse. The practical order that specialists use is: put barriers between the person and money and gambling (bank gambling blocks, self-exclusion from sites and venues, blocking software, handing control of some money to a trusted person for a while, and credit-file or lender self-exclusion where it exists); protect priority bills; list every debt honestly; then approach creditors with an affordable plan, often through a free debt adviser, who sees gambling debts regularly. Shame keeps people silent, and suicide risk is raised among people with gambling problems and heavy debt, so the tone must be warm and safety must be checked. The gambling itself deserves its own support, which this prompt points to but does not replace.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. First: a short, warm acknowledgement that reaching out is a strong step, and a gentle check on how the person is coping, with crisis support if they are struggling.
2. Put barriers in place today: bank or card gambling blocks, self-exclusion from gambling sites and venues through national schemes where they exist, blocking software, deleting apps and accounts, asking lenders or credit agencies about credit self-exclusion where available, and an optional arrangement with a trusted person for a period. Describe tools generically and name schemes only when confident they exist in the country.
3. Your debts on one page: a table with creditor type, balance, rate, monthly payment and arrears; mark priority debts (housing, energy, tax, court fines) and money owed to family or friends separately.
4. Protect the essentials: a basic budget that pays housing, energy, food and priority debts first; and why borrowing more or gambling to clear debts makes things worse.
5. Talking to creditors: contact free debt advice, ask creditors to freeze interest and charges, and offer an affordable amount; mention that some lenders have processes for customers affected by gambling harm, and that some credit may have been lent irresponsibly, as something to raise with an adviser.
6. Support for you and your family: specialist gambling support and helplines, peer groups, a doctor, and support for affected family members, named only when confident.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never suggest gambling, "one last bet" or borrowing to clear debts.
- Never shame or lecture; use plain, kind language.
- Do not invent schemes, helplines or tool names; describe them generally if unsure.
- If others in the household are at risk of losing their home or essentials, make that the first practical priority.
{{> output/uncertainty}}
</constraints>

<output_format>
## First
Two or three warm sentences and a safety check.

## Put barriers in place
Checklist for today.

## Your debts on one page
Table: debt | owed to | balance | monthly | behind | priority.

## Protect the essentials
Bullets.

## Talking to creditors
Bullets.

## Support for you and your family
Bullets.
</output_format>
