---
schema: 1
id: update-finances-after-marriage
kind: prompt
title: Update your finances after marriage
description: Builds the money admin checklist after marrying or registering a partnership - beneficiaries, wills, insurance, accounts, tax status, name changes and joint debt - most important first.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, questions, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [newlyweds, beneficiaries, life-events, joint-accounts]
pairs_with:
  prompts: [plan-couple-money-conversation, build-financial-emergency-file, build-net-worth-statement, prioritize-financial-goals]
  personas: [personal-finance-coach]
args:
  - name: couple
    description: When you married or registered, whether either of you is changing name, your rough finances (accounts, pensions, insurance, property, debts, children from earlier relationships), and what you have already done.
    type: text
    required: true
  - name: country
    description: Country (and state or region) where you live, and any other country either of you has assets or citizenship in.
    type: string
output_contract:
  format: markdown
  sections: [Do first, Checklist by area, Decisions to make together, Questions for professionals, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help newly married couples or registered partners update their money admin. Marriage changes more than people expect, and the defaults differ by country. In some places marriage revokes an existing will; in others it does not. Pension and life insurance beneficiary nominations usually do not update themselves, so an ex-partner or parent may still be named. Tax treatment can change (joint filing, transferable allowances, spouse exemptions), as can eligibility for benefits. Property law varies between community-property and separate-property systems, which affects who owns what and who is liable for which debts. Joint accounts and joint loans make each person liable for the whole debt, which is different from simply sharing costs. Blended families need extra care because default inheritance rules may not match what the couple wants for children from earlier relationships.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The couple:

<couple>
{{couple}}
</couple>

1. List what to do first: the items with real consequences if left (beneficiary nominations on pensions and life cover, the effect of marriage on any existing will in their country, insurance that covers the household), each with why.
2. Give a checklist by area: identity and name change (in a sensible order of documents), bank accounts and cards, pensions and retirement accounts, insurance (life, health, home, car), wills and powers of attorney, tax status and allowances to check, benefits, property and mortgage, debts and credit files, and employer HR records.
3. List decisions to make together: joint versus separate accounts or a hybrid, whether to take on joint debts, how to share costs, emergency fund, and whether a written agreement about property makes sense for them (as a question for a lawyer).
4. List questions for a lawyer, tax adviser or financial adviser, especially for cross-border couples, blended families, business owners, or anyone with significant assets.
5. State the assumptions you made about their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state country rules (wills, tax, property regimes) as fact unless confident; mark them "verify locally" and never invent rule names.
- Do not tell the couple to merge or keep finances separate; show the options and trade-offs.
- Explain that a joint loan or joint account makes each person liable for the whole amount, without alarm.
- Keep it practical and warm; it is a happy event.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do first
Numbered list, three to five items with why.

## Checklist by area
Headed groups of checkbox items.

## Decisions to make together
Bullets with the trade-off for each.

## Questions for professionals
Bullets grouped by professional.

## Assumptions
Bullets.
</output_format>
