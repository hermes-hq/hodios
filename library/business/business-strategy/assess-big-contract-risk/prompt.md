---
schema: 1
id: assess-big-contract-risk
kind: prompt
title: Assess big contract risk
description: Assesses taking on a contract that would become a large share of revenue - concentration, payment terms, capacity and what happens if it ends - and sets the conditions to accept it safely.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, executive, operations-manager]
advice_risk: [financial]
requires: [none]
inputs: [text, document, dataset]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-concentration, anchor-client, payment-terms, working-capital, exit-scenario, contract-terms]
pairs_with:
  prompts: [forecast-cash-flow, test-capacity-before-growth, price-commercial-cleaning-contract]
  personas: [small-business-advisor]
args:
  - name: contract
    description: The contract on offer - client, work, value per month or year, length, notice and termination terms, payment terms, price review, penalties, start date and what you would need to add (staff, vehicles, equipment).
    type: text
    required: true
  - name: current_revenue_mix
    description: Your current revenue by client or client type, margins if known, cash in the bank, overdraft or facilities, and your team and capacity.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Short answer, Concentration, Cash and payment terms, Capacity and existing clients, If it ends, Conditions to accept, Questions for advisers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the owner of a small service firm (cleaning, logistics, trades, facilities, IT support, catering) decide on a contract that would make one client a big share of revenue. Big contracts feel safe and are often the riskiest thing a small firm signs. The dangers: one client above roughly a quarter to a third of revenue (a rule of thumb, not a law) gains pricing power and makes the business hard to sell or finance; long payment terms mean paying wages and suppliers for months before cash arrives; hiring for the contract creates fixed costs that stay when the client gives short notice; and existing smaller clients get worse service. You do not say yes or no for the owner; you show the risks in numbers and the conditions under which yes is safe.
</context>

<task>
<contract>
{{contract}}
</contract>

<current_revenue_mix>
{{current_revenue_mix}}
</current_revenue_mix>

1. Short answer: whether the contract looks safe to accept as offered, acceptable with conditions, or too risky, and the deciding factors.
2. Concentration: the client's share of revenue and of gross profit after the contract starts, and the share of the largest three clients. Explain what that level means for negotiating power and for a future sale or loan.
3. Cash and payment terms: the working capital gap - monthly costs of serving the contract x months until first payment arrives (payment terms plus invoicing delay) plus set-up costs. Compare with cash and facilities. Show a simple month-by-month cash line for the first six months.
4. Capacity and existing clients: what has to be added (people, vehicles, supervision), how long recruitment and training take, and the risk to service levels for current clients.
5. If it ends: model the client giving the shortest notice allowed at month 6 and month 18 - revenue lost, fixed costs left (leases, staff, vehicles), and how long cash lasts. Name the costs that could be flexible (agency staff, short leases) to reduce this exposure.
6. Conditions to accept: terms to negotiate (shorter payment terms or a mobilisation payment, minimum term or notice that matches your commitments, indexation, volume bands, a clear scope and change process), operating conditions (cash buffer, flexible resourcing, a target date to bring concentration down by winning other clients), and walk-away points.
7. Questions for an accountant, a solicitor and the bank.
8. Check the arithmetic before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; mark gaps as [X] and say what to find.
- Do not interpret the contract's legal meaning or recommend financing products; list the clauses for a solicitor to review and the questions for an accountant or bank.
- If the contract value, payment terms or current revenue are missing, ask for them and stop.
- Label any concentration threshold as a rule of thumb.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Concentration
Table: Measure | Before | After. Then two sentences on what it means.
## Cash and payment terms
Arithmetic for the gap, then a table: Month | Cash in | Cash out | Balance.
## Capacity and existing clients
Bullets.
## If it ends
Table: Scenario | Revenue lost | Fixed costs left | Months of cash.
## Conditions to accept
Checklist grouped as terms to negotiate, operating conditions, walk-away points.
## Questions for advisers
Grouped by accountant, solicitor, bank.
</output_format>
