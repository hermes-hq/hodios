---
schema: 1
id: compare-student-loan-repayment
kind: prompt
title: Compare student loan repayment options
description: Compares student loan repayment options in the borrower's country with monthly payments, total cost, write-off or forgiveness rules to verify, and whether overpaying makes sense.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [student-loans, loan-forgiveness, income-driven-repayment, overpayment, refinancing]
pairs_with:
  prompts: [plan-debt-payoff, budget-for-university, plan-first-job-finances, compare-loan-offers]
  personas: [personal-finance-coach]
args:
  - name: loans
    description: Each loan - lender type (government or private), plan or scheme name if known, balance, interest rate, when repayment started or starts, and what you pay now.
    type: text
    required: true
  - name: income
    description: Current gross income and how you expect it to change (rises, career breaks, a partner's income if it counts for your plan).
    type: string
    required: true
  - name: country
    description: Country whose loan system applies (where the loans were issued).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How your loan system works, Your loans, Options compared, Should you overpay, Rules to verify, Questions for your loan servicer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Student loans behave very differently by country, and the right question depends on the system. In **income-contingent** systems (for example the UK, Australia and New Zealand), repayments are a percentage of income above a threshold and any balance left after a set period is written off, so many borrowers never repay in full and overpaying can be money thrown away. In **amortising** systems with options (for example US federal loans), the borrower chooses between fixed payment plans and income-driven plans, with forgiveness after a number of years under some plans and public-service routes; private loans have fewer protections. The rules change often, so every threshold, rate and forgiveness term must be checked on the official source.

Country: {{country}}
Income: {{income}}

<loans>
{{loans}}
</loans>
</context>

<task>
1. How your loan system works: classify the loans as income-contingent, amortising with plan choices, or private, and explain the mechanics in plain words for this country. State thresholds, repayment percentages and write-off periods only where you are confident, labelled "check the current figure"; otherwise ask the person to supply them from their statement.
2. Your loans: table each loan with balance, rate, type and current payment.
3. Options compared, with their numbers:
   - Income-contingent: annual and monthly repayment = rate x (income - threshold); project whether the balance would be repaid before write-off under their expected income path (state the income growth and interest assumptions), and estimate total repaid.
   - Amortising: monthly payment for the standard term (show the formula), alternative plans available (extended, graduated, income-driven) with the payment and total paid for each, and any forgiveness timing and whether forgiven amounts may be taxable.
   - Private: the fixed schedule, and the trade-off of refinancing (lower rate versus losing government protections such as income-driven plans, deferment or forgiveness).
4. Should you overpay: give the decision logic for their system. For income-contingent loans, show the scenario where overpaying saves money (likely to repay in full anyway) versus where it does not (likely write-off). For amortising loans, compare the loan rate with other uses: employer pension match, high-interest debt, emergency fund. Present it as trade-offs, not an instruction.
5. Rules to verify: a list of the specific figures and rules the person must confirm on the official website or with their servicer.
6. Questions for your loan servicer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person to stop paying, default, or ignore letters. If they are struggling, explain hardship options such as income-driven plans, deferment or forbearance where they exist, and their costs.
- Label every assumption (income growth, inflation, interest rate path). Projections over decades are rough; give ranges.
- Do not recommend lenders or refinancing companies.
- If the plan type is unclear, ask for the statement details that identify it before projecting.
{{> output/uncertainty}}
</constraints>

<output_format>
## How your loan system works
Short paragraphs.

## Your loans
Table.

## Options compared
Table: option | monthly payment now | years to clear or write-off | total paid | forgiven or written off | notes. Then the formulas.

## Should you overpay
Decision logic with their numbers.

## Rules to verify
Checklist.

## Questions for your loan servicer
Numbered.
</output_format>
