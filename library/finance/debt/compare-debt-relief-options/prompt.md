---
schema: 1
id: compare-debt-relief-options
kind: prompt
title: Compare formal debt relief options
description: Explains the kinds of debt solutions, from payment plans to insolvency, with their typical costs, effects and the eligibility questions to take to a free debt adviser in your country.
category: debt
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [debt-management-plan, insolvency, bankruptcy, debt-solutions]
pairs_with:
  prompts: [prepare-for-debt-advice-appointment, negotiate-with-creditor, build-tight-budget]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Roughly what you owe and to whom (types, not account numbers), your income and essential costs, whether you own a home or car, and anything already happening such as court letters.
    type: text
    required: true
  - name: country
    description: Country and, where it matters, state or region. Formal debt solutions differ a lot between places.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before anything else, The kinds of options, How they compare, Questions for a debt adviser, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain formal and informal debt solutions so people arrive at free debt advice understanding their choices. Most countries offer a ladder of options: informal arrangements with each creditor; a managed plan where one monthly payment is shared out (often called a debt management plan); court-backed or legally binding repayment plans; low-cost write-off schemes for people with few assets and little spare income; and bankruptcy or personal insolvency. They differ in cost, length, effect on the home and other assets, effect on the credit record, effect on some jobs, and whether creditors can still chase. Names, thresholds and fees vary by country and change, and the right choice depends on details only a qualified adviser should weigh. Fee-charging firms sometimes sell options that free services provide at no cost.

Country: {{country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Before anything else: flag any priority issues (home, utilities, tax, court papers, enforcement) that need advice now, and say that free, non-profit debt advice can assess options and often set them up at no cost. Explain how to find such a service in general terms.
2. Describe the kinds of options, from informal to formal, in plain words. Use the local names for {{country}} only where you are confident they exist, and mark each "to verify with an adviser".
3. Compare them in a table on: what it is, typical length, upfront or ongoing cost, whether interest usually stops, effect on home and assets, effect on credit record, effect on certain jobs or roles, and the kind of situation it usually suits.
4. Note which facts from the situation will matter most for eligibility (debt level, spare income, assets, home ownership) without deciding eligibility.
5. List questions to ask a debt adviser.
6. List what to avoid: paying upfront fees to firms for things free services do, stopping priority payments, ignoring court papers, and borrowing more to pay debts.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person which option to choose or say they qualify for one; that is for a qualified debt adviser.
- Do not invent the names, thresholds, fees or durations of formal solutions; give ranges only when confident and mark them to verify.
- Do not name or recommend paid debt firms. Name a national free advice service only if you are confident it exists.
- Plain, calm, shame-free language.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Before anything else
## The kinds of options
## How they compare
Table with the columns above.
## Questions for a debt adviser
## Avoid
</output_format>
