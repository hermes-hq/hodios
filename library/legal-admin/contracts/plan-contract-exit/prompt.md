---
schema: 1
id: plan-contract-exit
kind: prompt
title: Plan how to exit a business contract
description: Works out how a business can get out of a supplier, customer or service contract - termination rights, notice dates, break costs, breach routes and negotiated exits - and the safest order of steps.
category: contracts
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, manager, executive]
subject: [law]
requires: [none]
inputs: [document, text]
output: [plan, table, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contract-termination, notice-period, break-clause, exit-costs, negotiated-exit]
pairs_with:
  prompts: [build-contract-obligations-register, explain-contract-clause, summarize-contract]
args:
  - name: contract
    description: The contract's term, renewal, termination, notice, payment on termination, breach, force majeure and exit assistance clauses, with clause numbers and the start date.
    type: text
    required: true
  - name: reason
    description: Why you want out - poor service, cost, no longer needed, a better alternative, the other side breaching - with dates and evidence of any problems.
    type: text
    required: true
  - name: country
    description: Governing law of the contract.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Exit routes, Key dates, Cost of each route, Recommended order of steps, Draft message, Get a lawyer if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are usually four ways out of a business contract, and choosing the wrong one is expensive. Using a termination right in the contract (for convenience with notice, at a break date, or at the end of the term by stopping renewal) is the cleanest, but notice must follow the contract's rules exactly: the right person, address, method and timing, often months before a renewal date. Terminating for the other side's breach depends on the breach being serious enough under the contract's wording (a "material breach", a failure to fix within a cure period, missed service levels triggering a right) and on following the procedure; getting it wrong can turn the terminating party into the one in breach. Doctrines such as frustration or force majeure are narrow and wording-dependent. A negotiated exit, often for a fee or a shorter wind-down, is frequently the cheapest overall. Practical exit matters as much as legal exit: data return, transition help, final invoices, equipment, and not paying for overlapping services.
{{#country}}

Governing law: {{country}}
{{/country}}

<reason>
{{reason}}
</reason>
</context>

<task>
<contract>
{{contract}}
</contract>

1. In brief: the realistic exit routes, the earliest exit date, and the main cost or risk.
2. Exit routes: for each route that may apply (end of term or non-renewal, termination for convenience, break clause, termination for breach, force majeure or similar, negotiated exit), quote the clause, state the conditions, and assess how well the facts given fit. Be honest when a breach route looks weak.
3. Key dates: notice deadlines, renewal dates, cure periods, and the latest date to act for each route.
4. Cost of each route: termination fees, payment for the remaining term, early termination charges, refunds, and the risk of a counterclaim if a breach route fails.
5. Recommended order of steps: for example document problems, send a formal breach notice with a cure period, open a negotiated exit discussion while keeping the contractual route available, then serve notice correctly. Include practical exit tasks.
6. Draft message: the most appropriate first letter or email (breach notice, non-renewal notice, or an opening for a negotiated exit), following the notice clause's requirements.
7. Get a lawyer if: features that warrant it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where missing.
- Do not say a breach is "material" or that termination will be valid; assess the fit and recommend advice where the route is contested.
- Do not invent notice periods or legal doctrines' requirements under any specific law.
- Warn against stopping payment or performance unilaterally before the exit route is secure.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three bullets.

## Exit routes
Table: route | clause | conditions | fit with the facts.

## Key dates
Table: date | what | action.

## Cost of each route
Table: route | cost | risk.

## Recommended order of steps
Numbered.

## Draft message
The message, with notice-clause requirements noted.

## Get a lawyer if
Bullets.
</output_format>
