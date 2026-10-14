---
schema: 1
id: plan-international-assignment
kind: prompt
title: Plan an international assignment
description: Plans sending an employee to work in another country for a period - assignment type, immigration, tax and social security questions, pay and allowances, family support, the letter and repatriation.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [operations-manager, executive, founder]
advice_risk: [legal, financial]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [global-mobility, secondment, expat-assignment, work-permit, repatriation]
pairs_with:
  prompts: [design-benefits-package, write-workplace-policy, plan-employee-offboarding]
  personas: [hr-business-partner]
args:
  - name: assignment
    description: The role, home and host countries, purpose, start date and expected length, whether the company has an entity in the host country, and whether the person's family is moving.
    type: text
    required: true
  - name: package
    description: Current pay and benefits, any assignment policy, budget, and what the employee has asked for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assignment type, Questions for specialists, Pay and support, Timeline, Assignment letter outline, Repatriation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan international assignments the way an experienced global mobility lead does. Key points experts know: the right structure depends on length and purpose (a business trip, a short assignment of weeks or months, a long-term assignment, a permanent transfer to a local contract), and each has different immigration, tax, social security and employment-law consequences. Business visitor rules rarely allow productive work, and people get caught working on the wrong visa. Sending someone without a local entity can create a taxable presence for the company. Social security may continue in the home country under an agreement, or not. Costs are routinely underestimated: housing, schooling, tax equalisation, home leave and relocation often cost more than the salary uplift. Many assignments fail on family adjustment, and many assignees leave within a year of returning because nobody planned the role they come back to.

<assignment>
{{assignment}}
</assignment>
{{#package}}
<package>
{{package}}
</package>
{{/package}}
</context>

<task>
1. Assignment type: recommend a structure for this length and purpose and say why, and what would change it (a longer stay, no host entity).
2. Questions for specialists: grouped for an immigration adviser, a tax adviser (individual tax, tax equalisation or protection, corporate presence), social security and pensions, employment law in both countries, and data and payroll setup. Do not answer them; frame them precisely.
3. Pay and support: the elements to decide (salary basis, cost of living or hardship allowance, housing, schooling, relocation, home leave, health cover abroad, tax approach, spouse or partner support) with a decision for each from the package, or marked as open. Note which are taxable in principle as a question for the tax adviser.
4. Timeline: working back from the start date, with lead times for permits, tax registrations, payroll, housing and schooling, as estimates to confirm.
5. Assignment letter outline: the clauses to include (duration, home and host employer, pay and allowances, tax approach, return and early termination, what happens to benefits and pension, family support).
6. Repatriation: the return role or process for finding one, timing of the conversation, and how to use the person's experience.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state visa categories, permit processing times, tax rules, social security agreements or thresholds as fact; frame them as questions or estimates to confirm.
- Do not suggest sending someone on a business visitor basis to do productive work.
- Do not invent the company's policy or budget; mark gaps.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assignment type
## Questions for specialists
Grouped by adviser, numbered.
## Pay and support
Table: Element | Decision | Open question.
## Timeline
Table: Weeks before start | Action | Owner.
## Assignment letter outline
## Repatriation
</output_format>
