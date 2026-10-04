---
schema: 1
id: build-buyer-business-case
kind: prompt
title: Build a business case for the buyer
description: Builds the business case a seller's champion takes to the budget holder, with cost of the problem from the buyer's own figures, conservative and expected value, payback, risks and a one-page summary.
category: sales
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, consultant, founder]
requires: [none]
inputs: [notes, text]
output: [docs, table, summary]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-case, champion-enablement, payback, value-selling, budget-approval, roi]
pairs_with:
  prompts: [prepare-discovery-call, write-sales-proposal, write-mutual-action-plan]
  personas: [deal-desk-analyst, sales-coach]
args:
  - name: discovery_notes
    description: What you learned in discovery - the problem, who feels it, how often, what it costs them today in time, money or risk, what they tried, their goals and deadline, and who approves spend. Rough notes are fine.
    type: text
    required: true
  - name: pricing
    description: Your price and terms - licence or fees, implementation or setup costs, contract length, payment terms - and the buyer's internal costs you know of (staff time to implement, training).
    type: text
    required: true
  - name: buyer_figures
    description: Numbers the buyer has stated or shared (headcount, hours lost, error rates, volumes, revenue per unit, salary bands). Optional but strongly preferred; the case is weaker without them.
    type: text
output_contract:
  format: markdown
  sections: [Gaps to close, Cost of the problem, Value model, Cost and payback, Risks and mitigations, One-page summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a B2B seller, consultant or agency build the business case their champion will present internally to the person who controls the budget. The champion will be asked hard questions when the seller is not in the room, so the case must be in the buyer's language and stand on the buyer's own numbers. Business cases fail when they use the vendor's marketing statistics, count the same saving twice, ignore the buyer's internal costs (staff time, migration, training), present one optimistic number instead of a range, and never say what happens if the project slips. A credible case is conservative by default, shows every assumption, and leaves the finance reviewer nothing to unpick.
</context>

<task>
<discovery_notes>
{{discovery_notes}}
</discovery_notes>

<pricing>
{{pricing}}
</pricing>

{{#buyer_figures}}<buyer_figures>
{{buyer_figures}}
</buyer_figures>{{/buyer_figures}}

1. List the gaps: every figure the case needs that the buyer has not given. Mark each [X] and write the question the seller should ask the champion to fill it.
2. Cost of the problem today: per value driver (time saved, cost avoided, revenue gained, risk reduced), the formula and the result from the buyer's figures, labelled "stated" or "assumption". Annualise.
3. Value model: a conservative case (lower bound inputs, adoption ramp: for example 50% of the benefit in the first year) and an expected case. No best case unless asked. Avoid double counting: one saving per hour or unit.
4. Costs: the seller's price plus the buyer's internal costs (implementation hours, training, running costs). Total cost over the contract term.
5. Payback in months and net value over the term for both cases; show the arithmetic.
6. Risks: adoption, implementation delay, data or integration, dependency on key people, and the cost of doing nothing or waiting six months. Give a mitigation for each.
7. One-page summary for the budget holder, written as the champion would present it: the problem in one sentence, the recommendation, the numbers, the risks, the decision needed and by when.
</task>

<constraints>
- Use only the buyer's and seller's figures. Never invent benchmarks, industry averages or customer results. If the seller wants to cite another customer's result, mark it [verify and get permission].
- Show every formula; totals must add up.
- Write the summary in the buyer's terms (their goals, their metrics), not product features.
- No exaggeration: if the conservative case does not pay back within the term, say so plainly and suggest what would change that (smaller scope, phasing, a different value driver).
- If the problem or the price is missing, ask for it and stop.
</constraints>

<output_format>
## Gaps to close
Table: Missing figure | Why it matters | Question for the champion.

## Cost of the problem
Table: Value driver | Formula | Annual amount | Source (stated or assumption).

## Value model
Table: Driver | Conservative | Expected, with the adoption assumptions listed below.

## Cost and payback
Table: Cost item | Year 1 | Over term. Then payback months and net value for each case, with arithmetic.

## Risks and mitigations
Table: Risk | Likelihood (low, medium, high) | Mitigation | Owner.

## One-page summary
Under 300 words, headed for the budget holder, ready for the champion to paste into an internal memo.
</output_format>
