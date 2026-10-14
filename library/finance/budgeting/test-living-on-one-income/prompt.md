---
schema: 1
id: test-living-on-one-income
kind: prompt
title: Test living on one income before you need to
description: Plans a trial run of a two-income household living on one income before a baby, study or career break, with the budget, the dry run, what it teaches and where the second income goes.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [single-income, dry-run, career-break, household-planning]
pairs_with:
  prompts: [plan-parental-leave-finances, build-monthly-budget, stress-test-budget, split-shared-expenses]
  personas: [personal-finance-coach]
args:
  - name: household
    description: Both take-home incomes, current monthly costs, savings and debts.
    type: text
    required: true
  - name: reason
    description: Why one income may stop and roughly when and for how long (baby, study, caring, illness, one partner starting a business).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The gap, The one-income budget, The dry run, What changes in real life, Where the second income goes now, Questions to settle together]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Households planning to drop to one income often build a spreadsheet that looks fine and then find real life costs more. A dry run, living on one income for two to three months while banking the other, tests the budget with real spending and builds savings at the same time. Things that change when one partner stops paid work: work costs fall (commuting, lunches, work clothes) but home costs rise (energy, food at home), childcare may fall or rise, tax on the remaining income may change, benefits, credits or allowances may start, and pension contributions for the person not earning often stop. The emotional side matters too: the earning partner can feel pressure and the other can feel they have lost financial independence, so agreeing personal spending money for both is part of a workable plan.

<household>
{{household}}
</household>

Reason and timing: {{reason}}
</context>

<task>
1. The gap: current income minus the income that stops, against current costs. Show the monthly gap if nothing changes.
2. The one-income budget: rebuild the budget for the new situation, listing costs that fall, costs that rise and new costs (for example baby costs), with their figures or labelled estimates. Include personal spending money for both partners. Show the result: balanced, or the remaining gap and how many months savings would cover it.
3. The dry run: a plan for two to three months: which income they live on, where the other goes, the rules (no topping up from the second income), what to track weekly, and what counts as pass or fail.
4. What changes in real life: points the dry run cannot test (sleep and energy, unexpected costs, tax and benefit changes) as questions to check locally, including the non-earning partner's pension and any credits for carers or parents.
5. Where the second income goes now: a priority order (buffer for the gap, sinking funds for known costs, expensive debt), as an approach not an instruction.
6. Questions to settle together: a short list for the couple (how money is shared, personal spending, who decides what, when to review).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state benefit, tax or leave entitlements as fact; frame them as things to check for their country.
- Use their figures; mark estimates.
- Stay neutral about who works and who does not.
- If the one-income budget cannot cover essentials even with cuts, say so plainly and show what length of break savings can support.
{{> output/uncertainty}}
</constraints>

<output_format>
## The gap
Short calculation.

## The one-income budget
Table: line | now | on one income | note. Then the result.

## The dry run
Numbered plan with pass or fail tests.

## What changes in real life
Bullets.

## Where the second income goes now
Ordered list.

## Questions to settle together
Bullets.
</output_format>
