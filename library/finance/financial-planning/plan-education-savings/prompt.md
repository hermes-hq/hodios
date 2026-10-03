---
schema: 1
id: plan-education-savings
kind: prompt
title: Plan saving for a child's education
description: Plans saving for a child's education with cost estimates to verify, monthly amounts under several return scenarios, account types to research and trade-offs with other goals.
category: financial-planning
version: 1.1.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [table, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [education-savings, college-fund, university-costs, children, sinking-funds]
pairs_with:
  prompts: [plan-savings-goal, compare-retirement-accounts, teach-kids-about-money, plan-financial-independence]
  personas: [personal-finance-coach]
args:
  - name: child_age
    description: The child's current age in years (0 for a newborn).
    type: number
    required: true
  - name: target_and_country
    description: "What you want to cover (tuition, living costs, a share of either), the kind of education and where (home country or abroad, public or private), the age it starts, what you have saved already, your country, and how much you could save each month."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The answer, Cost estimate to verify, Monthly saving scenarios, Account types to research, Trade-offs, If plans change, Questions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Defines the planning case and a full return-by-cost-inflation grid, inflates each year of study separately, and gives the monthly-compounding formulas."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents plan saving for a child's education with honest numbers. The usual mistakes: using today's prices for costs ten or fifteen years away, aiming for "everything" when a partial target is realistic, starting late because the total looks impossible, and putting education savings ahead of the parents' own retirement and emergency fund (students can usually borrow or get aid for education; parents cannot borrow for retirement). Many countries offer tax-advantaged education accounts or government top-ups, each with rules on who controls the money and what happens if the child does not study.

Child's age now: {{child_age}}
</context>

<task>
Target and country:

<target_and_country>
{{target_and_country}}
</target_and_country>

1. Time horizon: years until education starts (start age minus {{child_age}}; assume 18 if no start age is given and say so) and how many years of costs. Note that money needed within about five years usually should not be in volatile investments.
2. Cost estimate to verify: if the person gave a cost, use it. Otherwise do not invent a precise figure: describe the cost components (tuition, accommodation, living costs, travel, books) and ask them to look up current figures from official or institutional sources, using a clearly labelled placeholder to keep the plan moving. Inflate each year of study's cost to the year it is paid, at education-cost inflation of 3% and of 5% (labelled scenarios): cost x (1 + i)^(years until that year). Total the years of study. Treat each total as needed when education starts; this slightly overstates the target because later years have longer to grow, so say so.
3. Monthly saving scenarios: a grid of three returns after fees (0% cash, 3%, 5% a year) against the two cost totals. For each cell: amount already saved grows to S x (1 + r/12)^m, where m is the months until the start; the gap is the target minus that; the monthly saving needed is gap x (r/12) / ((1 + r/12)^m - 1), or gap / m when r is 0. Show the substitution once, for the planning case: 3% return against the 5% cost-inflation total. Then show what their stated monthly budget would reach in the planning case, and that as a share of the target.
4. Account types to research in their country: name the general categories (tax-advantaged education accounts, child savings accounts with government top-ups, general investment accounts in the parent's name, children's accounts held for the child) and give specific scheme names only when confident, labelled "verify". For each category, list the questions that matter: tax treatment, contribution limits, top-ups, who controls the money and when it passes to the child, what happens if it is not used for education, and effect on financial aid.
5. Trade-offs: whether the parents' emergency fund, high-interest debt and retirement saving are on track first; partial targets (for example one half of costs) and the monthly saving each needs; involving grandparents.
6. If plans change: what the money could do if the child takes a different path, given each account type's rules.
7. Questions to check with the account provider, the government's official guidance or a financial planner.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Returns and cost inflation are hypothetical assumptions; say so once. Show arithmetic and keep results consistent across tables.
- Never state a scheme's limits, top-up rates or tax rules as current fact unless confident; mark them "verify".
- Do not recommend specific providers, funds or products.
- If child_age is above the start age, or the horizon is very short, say the plan is about cash saving and cost reduction rather than investing.
- If essential information is missing (country, rough target), ask for it and give only the structure.
{{> output/uncertainty}}
</constraints>

<output_format>
## The answer
Monthly amount needed in the planning case (3% return, 5% cost inflation), the range across the grid, and the share of the target their budget covers, in two or three lines.

## Cost estimate to verify
Table: year of study | today's cost (source or placeholder) | inflated at 3% | inflated at 5%. Total row.

## Monthly saving scenarios
Grid: rows are returns, columns are the 3% and 5% cost totals, each cell the monthly amount needed. Planning case marked. Substitution below, then what their budget reaches.

## Account types to research
Table: account type | key questions | names to verify (if confident).

## Trade-offs
Bullets, including partial targets with monthly amounts.

## If plans change
Short bullets.

## Questions to check
Numbered.
</output_format>
