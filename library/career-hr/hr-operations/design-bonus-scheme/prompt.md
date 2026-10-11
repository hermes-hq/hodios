---
schema: 1
id: design-bonus-scheme
kind: prompt
title: Design an employee bonus scheme
description: Designs an annual or periodic bonus scheme with eligibility, company and individual measures, pool funding, a payout curve, worked examples and rules for leavers, joiners and edge cases.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, executive, operations-manager]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, dataset]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [variable-pay, bonus-pool, incentive-design, payout-curve, compensation]
pairs_with:
  prompts: [build-merit-increase-matrix, design-salary-bands, check-kpi-for-perverse-incentives, write-total-rewards-statement]
  personas: [hr-business-partner]
args:
  - name: purpose
    description: What the bonus should reward or change (company profit, team targets, retention, individual performance) and who it is for (all staff, some roles, managers only).
    type: text
    required: true
  - name: business_context
    description: Country or countries, headcount in scope, total payroll, what the business can afford in a bad, normal and good year, the metrics you already track reliably, and any existing bonus or commission arrangements.
    type: text
    required: true
  - name: constraints
    description: Any rules you must respect (existing contract wording, union agreements, sales commission plans that stay separate) and preferences such as target bonus percentages. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Eligibility, Measures and weights, Funding and payout curve, Worked examples, Edge-case rules, Communication and governance, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design bonus schemes the way a reward specialist does. What experts know: a bonus changes behaviour only if people understand it, can influence the measures, and see the link within a year; schemes funded as a pool from a company result (profit, revenue, margin) protect affordability, with a threshold below which nothing pays, a target and a cap; individual measures invite gaming and bias unless they are few and verifiable; a measure people cannot see during the year motivates no one; the written rules decide disputes, so the scheme must say whether it is discretionary or contractual, what happens to leavers, joiners, people on leave and part-time staff, and whether bonus counts towards holiday pay or pensions (which varies by country). Paying bonus to everyone at the same percentage regardless of results turns it into deferred salary. Sales commission is usually a separate plan.

<purpose>
{{purpose}}
</purpose>

<business_context>
{{business_context}}
</business_context>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Design choices: say whether a bonus is the right tool for the stated purpose (or whether a pay rise, recognition or profit share fits better), then choose the scheme type (company pool, team, individual, or a blend), period and payment timing, with the trade-off of each.
2. Eligibility: who is in, minimum service, treatment of part-time staff, and anyone excluded with the reason.
3. Measures and weights: two to four measures, each with a definition, data source, who owns it, threshold, target and stretch. Prefer measures the business already tracks reliably. Name how each could be gamed and the safeguard.
4. Funding and payout curve: how the pool is funded, the target bonus as a percentage of salary by level if appropriate, payout at threshold, target and cap, and the total cost in a bad, normal and good year against the affordability figures given. Show the arithmetic.
5. Worked examples: three employees at different levels and outcomes, with the calculation.
6. Edge-case rules: joiners, leavers (good and bad), parental and sick leave, transfers, promotions mid-year, misconduct, restatement of results, and the discretion clause.
7. Communication and governance: who approves the scheme and the payouts, how progress is shown during the year, and when the scheme is reviewed.
8. Questions for advisers: employment law, tax, payroll and accounting points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; mark anything missing as [X]. Never invent payroll, profit or market figures.
- Do not state tax treatment, whether bonus counts for holiday pay or pensions, or contractual status as fact; mark them "confirm with a payroll or employment adviser locally".
- Treat protected leave consistently with the law where the scheme operates; do not cut bonus for maternity, parental or disability-related absence without flagging the legal risk.
- Show every calculation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design choices
## Eligibility
## Measures and weights
Table: Measure | Definition | Source | Threshold | Target | Stretch | Weight | Gaming risk and safeguard.
## Funding and payout curve
Table: Scenario | Result | Pool | Cost as % of payroll.
## Worked examples
## Edge-case rules
Table: Situation | Rule.
## Communication and governance
## Questions for advisers
Numbered.
</output_format>
