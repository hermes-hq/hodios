---
schema: 1
id: build-headcount-cost-plan
kind: prompt
title: Build a headcount cost plan
description: Builds a month-by-month staff cost plan in Excel or Google Sheets from start and leave dates, FTE, pay rises, bonuses, employer on-costs and open vacancies, with totals by team and FTE per month.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [plan, build]
role: [financial-analyst, founder, manager, executive]
stack: [excel, google-sheets]
advice_risk: [financial]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [people-costs, salary-budget, employer-on-costs, vacancy-planning, fte]
pairs_with:
  prompts: [calculate-true-cost-of-hire, forecast-headcount, build-three-year-projections, run-what-if-analysis]
args:
  - name: staff
    description: Current staff and planned hires, ideally with IDs rather than names - team, role, status (employee, contractor, vacancy), start date, end date if known, FTE, annual pay, planned rise and its month, bonus or commission.
    type: text
    required: true
  - name: assumptions
    description: Plan period and currency, employer on-costs (social security or payroll tax, pension, benefits) as rates with any thresholds or caps, extra salary months if paid (13th month), annual rise month, and hiring delay for vacancies.
    type: text
    required: true
  - name: tool
    description: Excel or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Staff table, Monthly cost formulas, On-costs, Vacancies, Summaries, Checks, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build staff cost plans for finance leads and founders. People costs are usually the largest line, and plans go wrong in the same ways: a hire dated mid-month costed for the whole month, leavers still costed after they go, pay rises applied from January to people who join in June, employer on-costs applied as one flat percentage when the real rule has a threshold or cap, extra salary months paid in specific months spread evenly, and vacancies costed from the day the role is approved instead of when someone is likely to start. The robust structure is one row per person or vacancy, a monthly grid where each cell is a fraction of the month employed times the monthly cost in force, and every rate held on an assumptions tab. On-cost rules and statutory employer contributions differ by country and change every year, so the plan uses the user's rates as inputs and says that payroll or an accountant should confirm them.
</context>

<task>
Build the headcount cost plan in {{tool}}.

<staff>
{{staff}}
</staff>

<assumptions>
{{assumptions}}
</assumptions>

1. Layout: tabs for Assumptions (period, on-cost rates, thresholds, caps, rise month and percentage, extra-month payment months, hiring delay), Staff (one row per person or vacancy), Cost Grid (people down, months across, salary and on-cost blocks), and Summary.
2. Staff table: ID, team, role, status, start, end, FTE, annual base pay, rise percentage and effective month, bonus amount and payment month, and a vacancy flag with approval date and expected start (approval date plus hiring delay, overridable).
3. Monthly cost formulas: fraction of month employed `=MAX(0, MIN(EOMONTH(m, 0), End) - MAX(m, Start) + 1) / DAY(EOMONTH(m, 0))` with a blank end date treated as far in the future, monthly base pay = annual / 12 x FTE x fraction x (1 + rise if the month is on or after the effective month and the person was employed before it, per the user's rule), plus bonus in its payment month and extra salary months where they apply. Give the exact formulas for the first cell and how they copy.
4. On-costs: employer contributions per person per month from the rates, including thresholds or caps if given (for example rate x MAX(0, monthly pay - monthly threshold), or MIN with a cap on annual earnings to date), each as its own block so it can be checked.
5. Vacancies: costed from expected start only, with a switch to include or exclude unapproved roles, and a probability or scenario column if the user wants a risk-adjusted view.
6. Summaries: cost by team and month, total for the year, FTE per month (sum of FTE x fraction), headcount at month end, and comparison with a budget line if one is given.
7. Checks: people costed outside their dates, zero or negative pay, total annual cost per person compared with annual pay plus on-costs, and Summary equal to the grid total.
8. Assumptions to confirm: missing or unclear rules, and a note that on-cost rates and thresholds must be checked with payroll or an accountant for the country and year.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state statutory contribution rates, thresholds or caps for any country; use only the user's inputs and mark gaps.
- No hard-coded rates or dates in formulas.
- Recommend IDs instead of names and restricted access, since the file holds salaries.
- Use functions available in {{tool}}; avoid volatile functions in the grid.
- Test the formulas on a mid-month joiner, a leaver and a person with a rise, and show the monthly figures.
</constraints>

<output_format>
## Layout
## Staff table
Table: Column | Input or formula.
## Monthly cost formulas
Code blocks with the cell each goes in.
## On-costs
## Vacancies
## Summaries
## Checks
## Assumptions to confirm
End with the worked example table: Person | Month | Fraction | Pay | On-costs | Total.
</output_format>
