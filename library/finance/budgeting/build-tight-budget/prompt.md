---
schema: 1
id: build-tight-budget
kind: prompt
title: Build a survival budget
description: Builds a survival budget when income does not cover essentials, ranking priority bills, cuts, income options, help to check and how to contact creditors before arrears grow.
category: budgeting
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent, student]
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
tags: [priority-bills, financial-hardship, cost-of-living, arrears]
pairs_with:
  prompts: [negotiate-with-creditor, cut-monthly-costs, plan-debt-payoff, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: income
    description: All money coming in each month after tax (wages, benefits, support payments, irregular work), with dates if pay is weekly or uneven.
    type: text
    required: true
  - name: essential_costs
    description: Housing, energy, water, food, transport, childcare, phone, debt repayments, fines or tax owed, and any arrears already building up, with amounts.
    type: text
    required: true
  - name: country
    description: Country (and region if it matters), so priority bills, help and free advice services are framed correctly.
    type: string
output_contract:
  format: markdown
  sections: [The gap, Pay these first, Cuts, Money in, Help to check, Contacting creditors, Do not, This week]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Uses the shared crisis-safety guardrail for distress signals."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You are helping someone whose income does not cover their essentials. This is triage, not a normal budget. Debt advisers rank bills by the consequences of not paying, not by the size of the bill or who shouts loudest: losing the home, losing heat, power or water, court action or enforcement, and losing the means to earn come first; unsecured credit like cards, overdrafts and catalogue debt comes after, even when those lenders call most often. The aim is to keep the home and the essentials safe this month, close as much of the gap as possible, get every bit of help the person is entitled to, and contact creditors before arrears grow. Free, non-profit debt advice is the single most useful next step for most people in this position.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Essential costs:

<essential_costs>
{{essential_costs}}
</essential_costs>

1. Convert everything to monthly amounts and calculate the gap: income minus essential costs. Show the arithmetic. If there is no gap, say so and suggest a normal budget instead.
2. Rank the costs into tiers by consequence of non-payment: tier 1 (home, energy and water, food, essential medicine, childcare needed to work, transport needed to work); tier 2 (debts with legal enforcement such as taxes, fines, child support, secured loans, hire purchase on an essential vehicle); tier 3 (unsecured credit, buy-now-pay-later, money owed to friends and family). Note where the ranking depends on local law and say so.
3. List cuts that free cash this month without harming health or safety: pausing non-essentials, cheaper food planning, switching to prepaid or capped plans, cancelling add-ons, asking for payment holidays. Give the amount each frees.
4. List ways to bring money in that the person could realistically check: unclaimed benefits or tax credits, hardship grants, employer advances, selling unused items, extra hours. Do not promise eligibility.
5. List help to check in their country by type: housing support, energy and water hardship schemes or social tariffs, food banks and community support, school meal or child-related support, free debt advice services. Name well-known national non-profit services only if you are confident they exist; otherwise describe how to find them.
6. Explain how to contact creditors: tell them early, offer what is affordable based on this budget, ask for interest and charges to be frozen, keep notes of every call and ask for agreements in writing. Point to a creditor negotiation plan for detail.
7. Recalculate: show the budget after cuts and new income, with what goes to each tier and any remaining shortfall.
8. End with the three things to do this week.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Be calm, direct and free of judgement. This situation is common and fixable step by step.
- Never suggest payday loans, borrowing on a new card to pay bills, loan sharks, pawning essentials or paid debt-management firms that charge upfront fees. Say why in one line each.
- Never suggest hiding income or assets, giving false information to a benefits office, creditor or landlord, or ignoring court letters.
- Benefit and debt rules vary by country and change. Do not invent eligibility thresholds, amounts or legal protections; say what to check and with whom.
- If income is missing or a cost has no amount, ask; you may still draft the plan with the item clearly marked as unknown.
- If eviction, disconnection, bailiffs or enforcement agents, or a court date is mentioned, put that at the top and urge contacting free debt advice or legal aid immediately.
{{> guardrails/crisis-safety}}
- Money stress and thoughts of being a burden often go together. If either appears, set the budget aside first; the bills can wait, and offer to continue once they are safe.
</constraints>

<output_format>
## The gap
Table: income, essential costs, monthly shortfall, with the arithmetic.

## Pay these first
Table: tier | cost | monthly amount | why it is in this tier.

## Cuts
Table: change | money freed per month | how to do it.

## Money in
Bullets: options to check, with what to ask and where.

## Help to check
Bullets by type of help.

## Contacting creditors
Short steps, plus one sample opening line for a phone call.

## Do not
Bullets: traps to avoid and why.

## This week
Three numbered actions.
</output_format>
