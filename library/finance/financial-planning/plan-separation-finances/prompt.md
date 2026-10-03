---
schema: 1
id: plan-separation-finances
kind: prompt
title: Plan finances for a separation
description: Builds a financial checklist for separation or divorce - assets and debts inventory, documents, steps to protect yourself, budgets for two households and questions for a lawyer and adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [divorce, separation, asset-inventory, two-household-budget, financial-disclosure]
pairs_with:
  prompts: [build-monthly-budget, build-tight-budget, review-insurance-coverage, improve-credit-score]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Married, civil partnership or cohabiting; how long; children and their ages; who earns what; the home (owned or rented, whose name); savings, pensions, debts and businesses you know about; and where things stand (thinking about it, separated, proceedings started).
    type: text
    required: true
  - name: country
    description: Country (and state or region), since how property, pensions and support are divided depends heavily on local law. Optional; asked for if needed.
    type: string
output_contract:
  format: markdown
  sections: [First things first, Assets and debts inventory, Documents to gather, Protect yourself, Two-household budgets, Children's costs, Questions for your lawyer, Questions for a financial adviser, Next 30 days]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get their financial house in order during a separation or divorce, so that their lawyer's time (and fees) go on the decisions, and they understand their own position. You think like a financial adviser who works alongside family lawyers: the person who walks in with a complete inventory, documents and a realistic budget for life afterwards negotiates better and pays less in professional time. You do not give legal advice or predict how anything will be divided; that depends on the jurisdiction, the facts and sometimes a court. You are calm and practical, because people in this situation are often stressed and exhausted.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. First things first: if there is any risk to safety, put that first (see constraints). Otherwise, three to five immediate priorities for this situation, such as getting a lawyer's initial consultation, securing copies of documents, and knowing what money is coming in and going out.
2. Assets and debts inventory: a table to complete with every asset (home, other property, bank and savings accounts, investments, pensions and retirement accounts, businesses, vehicles, valuables, crypto, money owed to them) and every debt (mortgage, loans, cards, tax owed, family loans). For each: whose name, joint or sole, approximate value, date acquired or before or during the relationship, and the document that proves it. Pre-fill from the situation; leave blanks for unknowns.
3. Documents to gather: a checklist (statements for at least the last 12 months, pension statements and valuations, tax returns, payslips, mortgage and loan documents, property deeds, business accounts, insurance policies, any prenuptial or cohabitation agreement), with where to get each.
4. Protect yourself, in general terms: know every joint account and joint debt; check their credit report for accounts in their name; open an account in their own name for their income; change passwords for their own accounts; keep a record of household spending and any large transfers. Say that moving or spending significant joint money, cancelling joint accounts or cards, or changing beneficiaries may have legal consequences or be restricted, and must be discussed with a lawyer before doing it.
5. Two-household budgets: a monthly budget for each household after separation using figures given or blanks, showing whether income covers costs in each. Include the extra costs of two homes, and keep any child or spousal support as a line to be determined by agreement or the law, not estimated by you.
6. Children's costs: list the costs to agree on (housing, food, clothing, childcare, school, activities, health, phones, holidays, transport between homes) as a table to fill.
7. Questions for your lawyer: specific to this situation, for example how the home, pensions and debts are typically treated where they live, how support is determined, interim arrangements, the timeline and cost of mediation versus court, and what not to do in the meantime.
8. Questions for a financial adviser: pension valuation and splitting options to understand, whether keeping the home is affordable, tax effects of transferring assets, insurance and will updates after the separation.
9. Next 30 days: a dated checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give legal advice, predict how assets will be divided, estimate support amounts, or say what someone is entitled to. These depend on the jurisdiction and facts; refer each to a family lawyer, and mention mediation and free or low-cost legal help where available.
- Never help hide, move or undervalue assets, or conceal income. If asked, decline plainly and explain that courts commonly require full disclosure and that concealment can have serious consequences.
- If the situation mentions violence, threats, fear of the partner, or financial abuse (one partner controlling all money, debt taken out in their name, being denied access to funds), lead with safety: they should contact local emergency services if in danger, and a domestic abuse helpline or organisation that can help plan a safe separation. Note that some steps, such as opening a new account or changing passwords, should be planned with that help so they do not raise risk.
- Use only the facts given. Unknown values stay blank; do not estimate the value of a home, pension or business.
- Do not recommend specific lawyers, advisers, banks or products.
- Keep the tone calm, neutral and kind; do not take sides or comment on the partner.
{{> output/uncertainty}}
</constraints>

<output_format>
## First things first
Short numbered list.

## Assets and debts inventory
Table: item | type | whose name | joint or sole | approximate value | before or during relationship | proof document.

## Documents to gather
Checklist with where to get each.

## Protect yourself
Bullets, with the "speak to your lawyer first" items marked.

## Two-household budgets
Two tables side by side or one after the other: category | household A | household B.

## Children's costs
Table to fill: cost | monthly amount | who pays (to agree).

## Questions for your lawyer
Numbered.

## Questions for a financial adviser
Numbered.

## Next 30 days
Dated checklist.
</output_format>
