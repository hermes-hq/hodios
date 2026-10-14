---
schema: 1
id: write-total-rewards-statement
kind: prompt
title: Write a total rewards statement
description: Writes a total rewards statement template showing the full value of pay, employer contributions, benefits, leave and development, with every figure traced to its source and method.
category: hr-operations
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [dataset, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [total-rewards, employee-benefits, compensation-statement, employer-contributions, pay-communication]
pairs_with:
  prompts: [design-benefits-package, write-pay-review-letters]
args:
  - name: reward_elements
    description: Every element to include and how its value is calculated, for example base salary, bonus target, employer pension percentage, health premium per head, allowances, leave days, learning budget, equity. Use example figures, not real personal data.
    type: text
    required: true
  - name: audience
    description: Who receives it (all staff, one country, hourly workers), the language and tone, and how it is delivered (PDF with payslip, HR system, letter). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Statement template, How each figure is calculated, Worked example, Cover note, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A total rewards statement shows employees what their employment is worth beyond the salary line, because most people underestimate employer pension contributions, insurance premiums and the value of paid leave. It only builds trust if every number is right and explainable: an inflated statement (counting statutory costs as generosity, valuing a perk at list price nobody pays, or including equity at an optimistic valuation without saying so) does more harm than none. Experts keep the statement to one or two pages, separate cash from non-cash, label estimates and statutory items honestly, use one consistent period (annual), and avoid anything that reads like a contractual promise.

<reward_elements>
{{reward_elements}}
</reward_elements>
{{#audience}}
<audience>
{{audience}}
</audience>
{{/audience}}
</context>

<task>
1. Data check: for each element, confirm how its value is calculated and over what period, flag elements without a clear method, mixed periods (monthly versus annual), statutory employer costs presented as benefits, and equity or bonus values that are targets or estimates rather than amounts paid. If an element has no method, mark it [METHOD NEEDED].
2. Statement template: a one- to two-page layout with merge fields in square brackets (for example [Base salary]) grouped as Cash pay, Employer contributions, Benefits, Time off, Growth, then a total. Label statutory items as required by law and estimates as estimates.
3. How each figure is calculated: a table HR or payroll can use to fill the fields consistently, with the data source for each.
4. Worked example: fill the template once with the example figures given, showing the arithmetic, so HR can check the method.
5. Cover note: a short message to send with the statement, in the requested tone, that explains what it is, that it is informational and not a contract, and whom to ask.
6. Questions for payroll, finance or HR.
</task>

<constraints>
- Use only the figures and methods given; never invent values, rates or premiums.
- Do not value equity as cash. If it is included, say whether it is a grant value, a current estimate or unvested, and that its value can go down.
- Include the statement that the document is for information and does not change the contract or plan rules, which govern.
- Do not include protected or health information in the template.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
## Statement template
The template with [merge fields].
## How each figure is calculated
Table: Field | Calculation | Period | Source | Label (cash, contribution, statutory, estimate).
## Worked example
## Cover note
## Questions
</output_format>
