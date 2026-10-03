---
schema: 1
id: allocate-merit-increases
kind: prompt
title: Allocate merit increases
description: Allocates a merit or pay increase budget across a team using performance, position in range and equity checks, with the reasoning recorded for each person. Use during a pay review cycle.
category: people-management
version: 1.0.0
status: incubating
stage: [plan, review]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [dataset, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [merit-increase, pay-review, compa-ratio, pay-equity, compensation]
pairs_with:
  prompts: [run-calibration-session, write-performance-review]
  personas: [hr-business-partner]
args:
  - name: team_data
    description: One row per person (initials or IDs, not names) with role and level, current salary, the salary range or midpoint for their level, latest performance rating, time in role, any recent increase or promotion, and part-time status. A pasted table or CSV is fine.
    type: text
    required: true
  - name: budget
    description: The total increase budget, as an amount or a percentage of payroll, and the currency.
    type: string
    required: true
  - name: guidelines
    description: Company guidance such as a merit matrix (rating by position in range), minimums or caps, rules for people above range maximum, lump-sum options, promotion budgets, effective date. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Approach, Allocation, Equity checks, Budget reconciliation, Notes for each conversation, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers allocate pay increases fairly and defensibly. A merit allocation balances three things. The first is performance (higher ratings earn more). The second is position in the pay range: the compa-ratio, which is salary divided by the range midpoint, so that people paid low for their level move up faster than people already near or above the top. The third is equity, so that people doing similar work at similar performance are paid similarly regardless of who they are or how hard they negotiated. Common failures include spreading the budget evenly ("everyone gets 3%"), rewarding the loudest negotiators, ignoring people below range, giving large increases to people far above the range maximum, and making decisions that nobody can explain later. A merit matrix makes the logic visible: each cell, combining a rating band and a compa-ratio band, maps to a target percentage.

<team_data>
{{team_data}}
</team_data>
Budget: {{budget}}
{{#guidelines}}
<guidelines>
{{guidelines}}
</guidelines>
{{/guidelines}}
</context>

<task>
1. Data check: compute each person's compa-ratio. Flag missing fields, inconsistent levels, part-time salaries that need annualising or comparing on a full-time-equivalent basis, people above range maximum or below minimum, recent increases or promotions that may affect eligibility, people hired partway through the cycle whose increase may be prorated under policy, and names or protected characteristics in the data that should be removed. If key data is missing (for example, ranges or ratings), say what you cannot do without it and use [X].
2. Approach: if guidelines include a merit matrix, use it. Otherwise propose one: three to five rating bands across three compa-ratio bands (for example, below 0.90, 0.90 to 1.10, above 1.10), with target percentages calibrated so the total roughly fits the budget. Show the matrix and the arithmetic. Explain how you handle people above range maximum (for example, a lump sum instead of a base increase) and people below minimum (an adjustment to reach the minimum, possibly funded separately).
3. Allocation: one row per person with the rating, compa-ratio, matrix target, proposed percentage and amount, new salary, new compa-ratio, and a one-line reason. Adjust from the matrix only with a stated reason.
4. Equity checks: compare people in the same role and level with similar ratings. Flag gaps in new salaries that the allocation does not explain by performance, time in role or a documented factor. Check that the average increase does not differ across groups (for example, by gender or full-time and part-time status) where such data is lawfully available and provided; if it is not, recommend that HR run the check. Flag any case where the proposal widens an existing unexplained gap.
5. Budget reconciliation: the total cost against the budget, the remaining amount or overspend, and options to rebalance, with the trade-off of each.
6. Notes for each conversation: for each person, two or three sentences the manager can use to explain the decision, linking it to performance and position in range, without comparing them to colleagues.
7. Questions: anything that needs a decision from the manager or HR.
</task>

<constraints>
- Show all calculations so they can be checked; round consistently and state the rounding.
- Use only the data given. Do not invent ratings, ranges or market data; say what to obtain.
- Never use protected characteristics, leave, or health to set an increase. Use group data only for equity checks, and only where it is provided and lawful to use.
- This is decision support. Final decisions follow the company's pay policy and approvals, and pay-transparency or equal-pay rules may apply depending on location; flag them for HR.
</constraints>

<output_format>
## Data check
## Approach
The merit matrix as a table, then the rules for edge cases.
## Allocation
Table: Person | Level | Rating | Compa-ratio | Target % | Proposed % | Increase | New salary | New compa-ratio | Reason.
## Equity checks
## Budget reconciliation
## Notes for each conversation
## Questions
</output_format>
