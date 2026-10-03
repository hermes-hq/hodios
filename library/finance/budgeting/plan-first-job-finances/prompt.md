---
schema: 1
id: plan-first-job-finances
kind: prompt
title: Plan your first-job finances
description: Sets up a young adult's money for a first job - reading the payslip, a budget, an emergency fund, workplace pension or retirement enrolment questions and debt priorities.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, student, job-seeker]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-job, young-adults, emergency-fund, workplace-pension, student-loans]
pairs_with:
  prompts: [explain-payslip, build-monthly-budget, compare-retirement-accounts, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: pay_and_costs
    description: Your offer or salary (gross and take-home if known, pay frequency), benefits offered (pension or retirement plan, employer match, health cover), living costs, any debts (student loan, cards, family) and savings.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you will work, so payslip lines and account types are framed correctly. Optional; asked for if it matters.
    type: string
output_contract:
  format: markdown
  sections: [Your first payslip, First month set-up, Starter budget, Emergency fund, Workplace retirement plan, Debt priorities, Next 90 days, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone set up their money for their first proper job. The habits set in the first three paychecks tend to last for years. Common mistakes: budgeting on the gross salary, letting spending rise to match the new income before any saving is automatic, missing the employer's retirement match (free money left on the table), skipping the enrolment window for benefits, and treating every debt the same when a student loan and a credit card behave very differently. Your job is a simple, automatic system and a short list of things to check, explained so a first-time earner understands why.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Pay, benefits and costs:

<pay_and_costs>
{{pay_and_costs}}
</pay_and_costs>

1. Your first payslip: list the lines they should expect (gross pay, income tax, social contributions, pension or retirement contributions, student loan deductions where these come through payroll, other deductions, net pay), what each means, and three checks to make on the first payslip (tax code or withholding status, correct salary, pension deduction matching what they chose). If take-home pay is not given, estimate it only as a labelled range and tell them to confirm it with the first payslip.
2. First month set-up: a checklist in order. Separate account or pot for bills, an automatic transfer to savings on payday, benefits enrolment by its deadline, emergency contact and bank details with payroll, and a note of when the first pay actually arrives (often later than expected, so plan the gap).
3. Starter budget: monthly table using take-home pay. Apply a simple split (for example needs, wants, saving and debt) adjusted to their real costs; if rent makes needs above 50%, show the realistic split.
4. Emergency fund: a starter target (for example one month of essential costs) and a full target (three to six months, adjusted for job security and dependants), with the monthly amount and months to reach each.
5. Workplace retirement plan: explain enrolment, employee and employer contributions and any match in plain words, with a worked example on their salary if the match is stated. List what to check in the plan documents. Do not recommend funds.
6. Debt priorities: rank their debts by cost and risk, explain why expensive card debt usually comes before investing beyond the match, and how student loans work differently where repayment depends on income (say "check the terms of your loan").
7. Next 90 days: a short dated list.
8. Questions to ask HR or payroll and, if relevant, the loan servicer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Missing numbers become questions or clearly labelled placeholders, never facts.
- Tax rates, contribution rates, matches and loan rules differ by country, employer and year. Do not state a rate or threshold as current unless you are confident; otherwise mark it "verify".
- Explain every term the first time it appears in one plain sentence.
- No specific banks, apps, funds or products.
- Encourage enjoying some of the first salary; a plan with zero fun money is a plan that gets abandoned.
- If key facts are missing (salary or country when it matters), ask for them first and give only the general set-up.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your first payslip
Table: line | what it means | what to check.

## First month set-up
Numbered checklist.

## Starter budget
Table: category | monthly amount | % of take-home. Totals row with arithmetic.

## Emergency fund
Starter and full targets, monthly amount, months to reach each.

## Workplace retirement plan
Short explanation plus the worked match example.

## Debt priorities
Ranked table: debt | rate | why this rank | monthly amount.

## Next 90 days
Dated bullets.

## Questions to ask
Numbered, grouped by who to ask.
</output_format>
