---
schema: 1
id: stress-test-budget
kind: prompt
title: Stress-test a household budget
description: Tests a household budget against realistic shocks such as a rent or mortgage rise, energy price jump, reduced hours or a lost income, shows which ones break it, and plans the defences now.
category: budgeting
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, report, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scenario-testing, financial-resilience, rate-rise, cost-of-living]
pairs_with:
  prompts: [build-monthly-budget, build-emergency-fund-plan, cut-monthly-costs, plan-finances-after-job-loss]
  personas: [personal-finance-coach]
args:
  - name: budget
    description: Take-home income for each earner, and monthly costs, including housing (and whether a mortgage rate is fixed and until when), energy, debts, childcare.
    type: text
    required: true
  - name: worries
    description: Specific changes you expect or fear, such as a fixed rate ending, a contract renewal, parental leave or a rent review. Optional.
    type: text
  - name: savings
    description: Cash savings available. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your baseline, Scenarios, What breaks first, Defences to set up now, Trigger points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Banks stress-test borrowers before lending; households rarely test themselves. A simple stress test applies plausible shocks to the current budget and asks two questions: what is the monthly surplus or gap after the shock, and how many months could savings cover that gap. The shocks that most often hit households are a mortgage fix ending at a higher rate or a rent review, energy and food price jumps, reduced hours or overtime ending, one earner losing income or going on leave, and a big one-off repair. Combined scenarios matter because shocks cluster (a recession brings both job risk and higher costs). The value is in deciding defences while things are calm: building cash, fixing costs, cutting the right lines in advance and knowing the trigger point for action.

<budget>
{{budget}}
</budget>
{{#worries}}Worries: {{worries}}{{/worries}}
{{#savings}}Savings: {{savings}}{{/savings}}
</context>

<task>
1. Your baseline: monthly income, costs, surplus or gap, and savings in months of essential costs.
2. Scenarios: test at least five, sized from their figures: housing cost up (for a fixed rate ending, show the payment at two or three illustrative rates and say they must get a real quote), energy and food up by a stated percentage, income down (reduced hours, overtime gone), one income lost, and a one-off cost; plus their own worries and one combined scenario. For each, the new monthly surplus or gap and the months of runway from savings.
3. What breaks first: rank scenarios by damage and say which are most likely given their situation.
4. Defences to set up now: concrete actions sized to the worst likely scenario (a cash buffer target, lines to cut first in a shock, fixing or locking costs to look into, protection cover to review, income options), each with the effect in money.
5. Trigger points: the signs that should start each defence (for example "if the remortgage quote is above X, start plan B three months before").
</task>

<constraints>
{{> guardrails/professional-limits}}
- Interest rates used for mortgage scenarios are illustrative, not forecasts; state them as such and show the arithmetic or the approximate payment method.
- Do not predict interest rates, prices or job markets.
- Do not recommend specific lenders, tariffs or insurance products.
- If the baseline already shows a gap, say so first and point to a survival budget and free advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your baseline
Short table.

## Scenarios
Table: scenario | change | new monthly surplus or gap | months of runway.

## What breaks first
Ranked bullets.

## Defences to set up now
Table: action | effect per month | effort.

## Trigger points
Bullets: if this, then that.
</output_format>
