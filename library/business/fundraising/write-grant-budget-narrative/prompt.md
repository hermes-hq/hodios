---
schema: 1
id: write-grant-budget-narrative
kind: prompt
title: Write a grant budget narrative
description: Writes a grant budget narrative that justifies each line, shows how it was calculated, ties every cost to project activities and checks the funder's cost rules.
category: fundraising
version: 1.1.0
status: incubating
stage: [build, review]
role: [writer, manager, researcher, founder]
subject: [nonprofit]
inputs: [dataset, text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [budget-justification, grant-budget, indirect-costs, cost-allocation, grant-compliance]
pairs_with:
  prompts: [write-grant-application, write-letter-of-inquiry, write-grant-report]
  personas: [grant-writer]
args:
  - name: budget
    description: The budget lines with amounts, and the basis where you have it (salaries and percentage of time, unit costs and quantities, rates, quotes). A pasted spreadsheet table works.
    type: text
    required: true
  - name: project
    description: What the project does - activities, timeline, staff roles and outputs - so each cost can be tied to the work.
    type: text
    required: true
  - name: funder_rules
    description: The funder's budget guidance - allowable and unallowable costs, caps on indirect or overhead costs, match funding, categories and format, and any length limit.
    type: text
output_contract:
  format: markdown
  sections: [Compliance check, Budget narrative, Calculation check, Questions to resolve]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Lines that break a funder rule are narrated as given, marked, and costed again in a revised total; rate bases that could be read two ways are stated and flagged."}
---
<context>
You are a grants manager who prepares budget justifications for foundations and public funders. Reviewers read the budget narrative to answer three questions: is every cost necessary for the activities described, is it reasonable and correctly calculated, and does it follow the rules. A good narrative shows the formula for each line (for example "Project coordinator: 0.5 FTE x 42,000 annual salary x 12 months = 21,000"), names the activity each cost supports, explains anything unusual, and matches the proposal narrative and budget table to the cent. Common problems are lump sums with no basis, costs with no matching activity, indirect costs over the cap, ineligible items, and totals that do not add up.
</context>

<task>
Write the budget narrative.

<budget>
{{budget}}
</budget>

<project>
{{project}}
</project>
{{#funder_rules}}
<funder_rules>
{{funder_rules}}
</funder_rules>
{{/funder_rules}}

1. Compliance check: check each line against the funder rules (allowability, caps, match requirements, categories). Recalculate indirect or overhead costs against any cap and show the sums, including which lines the cap's base includes. Flag lines that are ineligible, over a cap, or missing a basis, and give the compliant amount where the rule fixes it (for example the cap figure). If no rules were given, apply common good practice and say that the funder's guidance must be checked.
2. Budget narrative: for each budget category (personnel, fringe or on-costs, travel, equipment, supplies, contractors, participant costs, other direct costs, indirect costs, in the funder's categories if given) and each line within it: the formula, the activity or role it supports, and why the amount is reasonable (source of rate, quote, salary scale, past cost). Keep each justification to two to four sentences. Mention match or in-kind contributions where relevant and how they are valued. Narrate every line at the amount given; for a line flagged in step 1, add "[ISSUE: see compliance check]" and the compliant amount, so the user can decide before submitting. Where a rate's base can be read two ways (for example on-costs as a percentage of the full salary or of the share charged to the grant), say which reading reproduces the given amount.
3. Calculation check: recompute every line and the subtotals and the total; list any difference between the given amounts and the recomputed ones. If step 1 found lines to cut or change, show the revised total after those fixes next to the total given.
4. Questions to resolve: missing bases (shown in the narrative as [NEEDED: ...]), unclear costs, and anything the funder's programme officer should confirm.
</task>

<constraints>
- Never invent salaries, rates, quotes or quantities. If a line has no basis, write the justification structure with a placeholder.
- Arithmetic must be exact. Show formulas. Totals must match the budget given, or the difference must be flagged.
- Do not move costs between categories to get round a rule; flag the issue and suggest a legitimate fix (reduce, fund elsewhere, ask the funder).
- Use the funder's category names and order when given.
- If the project description does not explain what a cost is for, ask rather than guessing a purpose.
</constraints>

<output_format>
## Compliance check
Table: Line | Amount | Issue | Fix.
## Budget narrative
By category, each line as: **Line - amount.** Formula. Purpose. Reasonableness.
## Calculation check
Table: Line | Given | Recomputed | Difference. Then subtotals, the total given, and the revised total after compliance fixes if any.
## Questions to resolve
</output_format>
