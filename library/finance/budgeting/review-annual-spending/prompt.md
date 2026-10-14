---
schema: 1
id: review-annual-spending
kind: prompt
title: Review a year of spending
description: Reviews a year of spending by category, separates trends and lifestyle creep from one-offs, works out the savings rate and sets next year's category targets.
category: budgeting
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
requires: [none]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [year-end-review, lifestyle-creep, savings-rate, spending-trends]
pairs_with:
  prompts: [review-budget-vs-actual, categorize-expenses, set-up-sinking-funds]
  personas: [personal-finance-coach]
args:
  - name: spending
    description: A year of spending, either monthly totals by category or a categorised transaction export, plus take-home income for the year. Remove account numbers.
    type: text
    required: true
  - name: previous_year
    description: "Optional: last year's category totals or this year's budget, for comparison."
    type: text
  - name: goals
    description: "Optional: what you want next year to look like (save more, pay off a debt, a big purchase, work less)."
    type: text
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [The year in numbers, By category, Trends and creep, One-offs versus recurring, What went well, Next year's targets, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review a household's spending over a full year and turn it into next year's plan. A year shows what a single month hides: seasonal patterns, small habits that add up to large annual totals, costs that rose gradually (lifestyle creep), and "one-off" costs that are really irregular but recurring (car repairs, gifts, a holiday every summer). Experts separate three causes of any increase: prices rising, using more, and a genuine one-off. They compare spending growth with income growth, look at the savings rate (income not spent, as a share of income) rather than raw totals, and set next year's targets from what is realistic rather than from wishful cuts.

{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
The year's spending and income:

<spending>
{{spending}}
</spending>

{{#previous_year}}
Previous year or budget:

<previous_year>
{{previous_year}}
</previous_year>

{{/previous_year}}
{{#goals}}
Goals for next year:

<goals>
{{goals}}
</goals>

{{/goals}}
1. Summarise the year: total income, total spending, amount saved or debt added, and savings rate with arithmetic.
2. By category: yearly total, monthly average, share of spending and, if a comparison was given, the change in money and percent. Rank by size.
3. Trends and creep: categories that grew steadily during the year or versus the comparison. For each, suggest which cause is likely (price rises, more use, a new habit) and mark it as a likely cause, not a fact. Highlight small recurring items whose yearly total is surprisingly large.
4. One-offs versus recurring: list the large irregular costs and classify each as truly one-off or likely to recur in some form. Recurring ones become sinking-fund lines next year.
5. What went well: categories that fell or stayed flat, and any goal met.
6. Next year's targets: for each main category, three options (keep at this year's level adjusted for expected price rises stated as an assumption, trimmed, stretch), then a recommended target that fits the goals. Add sinking-fund amounts for recurring irregular costs. Show the resulting savings rate.
7. Close with the three changes with the biggest yearly effect.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. If months are missing, say which and annualise only with a clear label.
- Mark every interpretation of why spending changed as an inference and turn it into a question where it matters.
- Use one inflation assumption, stated, and never present it as an official figure.
- Do not recommend specific products, banks or investments.
- Non-judgemental: describe spending, do not moralise about it.
{{> output/uncertainty}}
</constraints>

<output_format>
## The year in numbers
Table: income, spending, saved or borrowed, savings rate.

## By category
Table: category | yearly total | monthly average | share | change.

## Trends and creep
Bullets: category, the change, likely cause.

## One-offs versus recurring
Table: cost | amount | one-off or recurring | next year's treatment.

## What went well
Short bullets.

## Next year's targets
Table: category | this year | keep | trim | stretch | recommended. Then the projected savings rate and the top three changes.

## Questions
Bullets.
</output_format>
