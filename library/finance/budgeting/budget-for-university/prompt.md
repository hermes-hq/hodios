---
schema: 1
id: budget-for-university
kind: prompt
title: Build a student budget
description: Builds a student budget for a term or year with loans, grants and part-time income against rent, food, books and social costs, plus pinch points and cheap swaps.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [student-budget, student-finance, university, weekly-allowance]
pairs_with:
  prompts: [compare-student-loan-repayment, build-monthly-budget, plan-first-job-finances]
  personas: [personal-finance-coach]
args:
  - name: income_sources
    description: Every source of money and when it arrives - loan or grant instalments with dates, bursaries or scholarships, family support, part-time work (hours and pay), savings you can use.
    type: text
    required: true
  - name: costs
    description: Known costs - rent (and whether bills are included), deposit, tuition you pay directly, travel, phone, course materials, plus your guess at food and social spending. Say the period (term, semester or year).
    type: text
    required: true
  - name: country
    description: Country where you study, so funding, student discounts and support options are framed correctly. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The short version, Cash flow by term, Weekly spending allowance, Budget, Pinch points, Cheap swaps, Support to check, Rules for the year]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Student money has a shape that monthly budgets miss: large lump sums (loan or grant instalments) arrive at the start of each term, while rent and life costs run every week. The classic failure is a well-funded first month followed by a broke final month of term, covered by an overdraft or a credit card. A student budget therefore works term by term, turns what is left after fixed costs into a **weekly allowance**, and plans for known spikes (deposits, books, start-of-year socials, travel home).

{{#country}}Country: {{country}}{{/country}}

<income_sources>
{{income_sources}}
</income_sources>

<costs>
{{costs}}
</costs>
</context>

<task>
1. Lay out a cash flow by term (or semester): money in with dates, fixed costs due in that period (rent, bills, travel passes, phone, tuition paid directly), and what remains for flexible spending.
2. Turn what remains into a weekly allowance for food, socialising, personal items and small course costs. Show the arithmetic: remaining / weeks until the next instalment. Keep a buffer of about 5-10% unallocated.
3. Build the budget table for the period with fixed and flexible lines. Where the person gave no figure for food or social spending, use a labelled modest estimate and ask them to adjust it.
4. Pinch points: identify the weeks or months where money runs tight (gap between instalments, summer if rent continues, deposit and first-month spikes, exam periods with less work). For each, give the amount short and a fix.
5. Cheap swaps specific to student life: batch cooking and shared shopping, second-hand or library textbooks, student discount schemes and travel cards, cheaper phone plans, free campus events. Estimate the weekly saving of the top swaps.
6. Support to check: university hardship or support funds, bursaries, scholarships, means-tested grants, and the student advice or money service. Mention country-specific schemes only when confident and tell them to verify eligibility.
7. Borrowing: if there is a shortfall, explain the difference between an interest-free student overdraft (where it exists), a credit card, and payday or buy-now-pay-later debt, and say which to avoid. Never present high-cost credit as a solution.
8. Part-time work: if income includes work, check the hours against the course load and mention any visa limits on hours for international students as something to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the figures given; label every estimate. Do not invent loan amounts, grant rates or rents.
- Totals must reconcile: income minus fixed costs minus flexible budget equals the buffer for each term.
- If the year does not add up, say so in the first section and show the size of the gap before any tips.
- Keep it encouraging and practical. No lectures about coffee.
- Do not recommend specific banks, cards, apps or lenders.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short version
Three lines: weekly allowance, biggest pinch point, surplus or gap for the year.

## Cash flow by term
Table: term | money in | fixed costs | left for flexible spending | weeks | per week.

## Weekly spending allowance
Table: food | social | personal | course extras | buffer.

## Budget
Table: line | per term | per year, with totals.

## Pinch points
Bullets with amounts and fixes.

## Cheap swaps
Table: swap | estimated weekly saving.

## Support to check
Bullets.

## Rules for the year
Five rules at most, such as moving each instalment to savings and paying yourself weekly.
</output_format>
