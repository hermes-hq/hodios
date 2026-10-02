---
schema: 1
id: financial-checkup-track
kind: workflow
title: Yearly financial check-up
description: Runs a yearly personal finance check-up across net worth, cash flow, debt, emergency fund, insurance, retirement and goals, pausing between steps and ending with a ranked action list.
category: financial-planning
version: 1.0.0
status: incubating
stage: [discover, review, plan]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [report, table, plan, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [net-worth, cash-flow, emergency-fund, annual-review]
pairs_with:
  prompts: [build-monthly-budget, plan-debt-payoff, review-insurance-coverage, plan-retirement-scenarios, compare-retirement-accounts, cut-monthly-costs]
  personas: [personal-finance-coach]
args:
  - name: finances
    description: "Your household's money picture: take-home income, regular costs, savings and investment balances, pensions, debts with rates, property, insurance policies. Rough figures are fine; say who is included (you, a partner)."
    type: text
    required: true
  - name: goals
    description: Goals for the next 1, 5 and 20+ years with rough amounts and dates, such as a house deposit, a sabbatical, children's education or retiring at 60.
    type: text
  - name: country
    description: Country of residence, so rules of thumb, account types and protections are framed for the right place.
    type: string
steps:
  - {id: snapshot, file: steps/01-snapshot.md, stage: discover, gate: approve, artifact: "financial-checkup/01-snapshot.md"}
  - {id: debt-and-buffer, file: steps/02-debt-and-buffer.md, stage: review, gate: approve, artifact: "financial-checkup/02-debt-and-buffer.md"}
  - {id: protection, file: steps/03-protection.md, stage: review, gate: approve, artifact: "financial-checkup/03-protection.md"}
  - {id: retirement-and-goals, file: steps/04-retirement-and-goals.md, stage: plan, gate: approve, artifact: "financial-checkup/04-retirement-and-goals.md"}
  - {id: action-list, file: steps/05-action-list.md, stage: plan, gate: none, artifact: "financial-checkup/05-action-list.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs this household's yearly money check-up the way a good financial planner runs an annual review: get an honest snapshot, test the foundations (debt and emergency buffer), check protection, check progress toward retirement and goals, then turn everything into a short, ranked action list. Each step writes one artifact and stops for approval; later steps reuse the approved figures instead of asking again.

<finances>
{{finances}}
</finances>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}
{{#country}}

Country: {{country}}
{{/country}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only the figures the person gave or confirmed. Mark estimates as estimates and missing numbers as [X] with a question; never fill a gap with a typical figure without saying so.
- Show the arithmetic so the person can check it and redo it next year.
- Describe options and trade-offs; do not name specific products, providers, funds or lenders, and do not tell the person to buy, sell or cancel a specific investment or policy.
- If no country is given, ask once in step 1 and keep country-specific points general until it is known.
- If essentials or minimum debt payments cannot be covered, say so plainly in the step where it shows up and point to free, non-profit debt or money advice before continuing.
- Do not ask for account numbers, logins or identity numbers, and tell the person to leave them out.
- Keep a running list of open questions and of items for a professional (financial adviser, tax adviser, insurance broker), carried into step 5.
