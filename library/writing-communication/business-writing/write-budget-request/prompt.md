---
schema: 1
id: write-budget-request
kind: prompt
title: Write a department budget request
description: Writes a department's annual budget submission with line changes against last year, the justification for each, cut scenarios and the risks of underfunding, in the form finance teams review.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, operations-manager, engineering-manager, executive]
requires: [none]
inputs: [dataset, notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [budget-submission, annual-budget, cost-justification, budget-cuts, finance-review]
pairs_with:
  prompts: [explain-budget-variance, write-decision-memo, write-headcount-request]
args:
  - name: budget_lines
    description: Last year's budget and actuals by line, and what you want for next year, as a table or list with currency. Include headcount if it sits in your budget.
    type: text
    required: true
  - name: plans_and_reasons
    description: What the department will deliver next year, what is changing (new work, price rises, contracts ending), and why each increase is needed.
    type: text
    required: true
  - name: guidance
    description: Finance's instructions for this round, such as a flat-budget target, required format, inflation assumption or deadline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Budget submission, Questions finance will ask, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Finance teams reviewing budget submissions look for the same things: a reconciliation from last year's budget to the request, every material change explained by a driver (volume, price, new activity, one-off), last year's underspend or overspend accounted for, and evidence that the manager has thought about what gets cut if the number is not approved. Submissions that lose money for their department are vague ("increased costs due to growth"), ignore the finance guidance, pad every line, or make everything a must-have. Submissions that win are specific, separate run costs from new investment, offer ranked cut options with honest consequences, and tie spending to outcomes the organisation cares about.
</context>

<task>
Write a budget submission.

<budget_lines>
{{budget_lines}}
</budget_lines>

<plans_and_reasons>
{{plans_and_reasons}}
</plans_and_reasons>
{{#guidance}}
<guidance>
{{guidance}}
</guidance>
{{/guidance}}

1. If there are no figures to work with, ask for them in one short message and stop.
2. If guidance is given, follow its format, targets and assumptions and say where the request departs from them.
3. Build a bridge from last year's budget to next year's request: start figure, then each change grouped by driver (inflation or price, volume, new activity, one-off items ending, savings), then the total. Check the arithmetic and flag any line where the numbers given do not add up.
4. For every line that changes materially (more than about 5 percent or a large absolute amount), write a two- or three-sentence justification: driver, evidence from the input, and what happens if it is not funded.
5. Comment on last year's actuals versus budget: explain under- or overspends that the input explains, and mark others `[NEEDED: reason]`.
6. Separate the request into "run the department" and "new or growth" spending.
7. Write two cut scenarios (for example flat budget and 5 percent below last year, or the levels in the guidance): what would be cut, in what order, and the consequence for service, risk or revenue.
8. Write a short summary for the finance reviewer: total, change against last year, the top three drivers, and the one item you most need approved.
</task>

<constraints>
- Use only the figures given. Never invent prices, inflation rates, salaries or quotes; mark gaps `[NEEDED: …]`.
- Show calculations for totals and percentages.
- No padding language. Each justification names a concrete driver and consequence.
- Cut scenarios must be real: do not offer cuts to things that are contractually committed unless the input says they can be cut, and flag that.
</constraints>

<output_format>
## Budget submission
Summary; Bridge table (Item · Driver · Amount); Line-by-line table (Line · Last year budget · Last year actual · Request · Change % · Justification); Run vs new; Cut scenarios (table per scenario: What is cut · Saving · Consequence); Risks of underfunding.
## Questions finance will ask
Five likely challenges with a prepared answer or what to find out.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
