---
schema: 1
id: plan-relocation-finances
kind: prompt
title: Plan the finances of a move
description: Plans the money side of moving to another city or country - moving costs, deposits, a cost-of-living comparison, banking and currency, pensions and the tax questions - with a timeline.
category: financial-planning
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, parent]
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
tags: [relocation, moving-abroad, cost-of-living, expat-finances, currency-transfer]
pairs_with:
  prompts: [plan-tax-move-abroad, build-monthly-budget, build-emergency-fund-plan]
  workflows: [international-move-track]
  personas: [personal-finance-coach]
args:
  - name: from_location
    description: Where you are moving from (city and country).
    type: string
    required: true
  - name: to_location
    description: Where you are moving to (city and country).
    type: string
    required: true
  - name: household
    description: Who is moving (adults, children, pets), income before and after the move, whether you will rent or buy, current monthly spending, and what you own that has to move. Optional.
    type: text
  - name: timeline
    description: When you plan to move and whether a job, visa or school start fixes the date. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The short version, Moving budget, Cost of living compared, Money timeline, Banking and currency, Pensions benefits and tax, Cash reserve, Questions to answer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Links the international move track, which covers shipping, housing and admin beyond the money side."}
---
<context>
A move usually costs more and earlier than people expect: deposits and the first month's rent land before the first salary, there is often a month of double rent, a new country may require proof of address to open a bank account and a bank account to rent a flat, and credit history rarely travels. International moves add currency costs (exchange-rate margins are often the biggest hidden fee), pensions and benefits left behind, health cover gaps, and tax residency questions. A good plan prices every one-off cost as a range, compares monthly costs line by line with the person's real budget, and puts the money tasks on a timeline.

From: {{from_location}}
To: {{to_location}}
{{#timeline}}Timeline: {{timeline}}{{/timeline}}
{{#household}}<household>
{{household}}
</household>{{/household}}
</context>

<task>
1. Say whether this is a domestic or an international move and skip sections that do not apply (for example currency and tax residency for a domestic move).
2. Moving budget: one-off costs as low-high ranges - removals or shipping, travel, temporary accommodation, rental deposit and first rent (or purchase costs), agency or broker fees, double rent overlap, visas and document fees, pet transport, furniture and setup, school or childcare deposits, a contingency of 10%. Label every figure as an estimate to verify with quotes.
3. Cost of living compared: if they gave current spending, compare line by line (housing, utilities, transport, food, childcare, health cover, phone, leisure) with an estimate for the destination, giving direction and rough size rather than precise figures you cannot know. Compute the income needed in the new place to keep the same lifestyle and compare with their new income if given.
4. Money timeline: tasks by stage - three months before, one month before, moving month, first three months - covering notice periods, cancelling contracts, deposits back, address changes, opening accounts, setting up salary, registering for local systems.
5. Banking and currency: keep one home account open for a while, how to open an account in the destination (documents, the proof-of-address loop and common workarounds), how to compare currency transfer costs (total cost versus the mid-market rate, not just the fee), splitting large transfers, and building a local credit history.
6. Pensions, benefits and tax: what happens to workplace and state pensions left behind, child or social benefits that stop or start, health cover from day one, and the tax residency and departure questions to take to a tax adviser (point to a dedicated tax-move checklist for depth).
7. Cash reserve: a target to hold on arrival, typically the moving budget's unpaid part plus two to three months of destination living costs, given the gap before the first salary.
8. Questions to answer before committing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent precise local rents, salaries or prices. Give ranges or directions and say where to verify (local listings, employer relocation packages, official statistics).
- Do not name banks, money transfer services or moving companies.
- Never help hide income or assets from tax authorities in either country; if asked, decline and explain that reporting rules often follow residents across borders.
- If no household details are given, ask for spending, income and who is moving, and give a skeleton plan meanwhile.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short version
Three lines: one-off cost range, monthly cost direction, reserve to hold.

## Moving budget
Table: item | low | high | notes and how to verify.

## Cost of living compared
Table: category | now | destination estimate | difference. Then income needed.

## Money timeline
Checklist grouped by stage.

## Banking and currency
Bullets.

## Pensions benefits and tax
Bullets, ending with questions for a tax adviser.

## Cash reserve
Target with the calculation.

## Questions to answer
Numbered.
</output_format>
