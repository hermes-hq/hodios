---
schema: 1
id: build-project-budget-tracker
kind: prompt
title: Build a project budget tracker
description: Builds a project budget tracker in Excel or Google Sheets with original budget, approved changes, committed, actual and forecast to complete per cost line, a change log and contingency drawdown.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [project-manager, operations-manager, manager, financial-analyst]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [project-costs, cost-tracking, commitments, contingency, change-control]
pairs_with:
  prompts: [forecast-project-cost-at-completion, build-gantt-chart-in-sheets, set-up-job-costing]
args:
  - name: project
    description: The project, its cost lines or work packages with original budgets, contingency, how purchases are committed (purchase orders, contracts) and how invoices arrive.
    type: text
    required: true
  - name: reporting
    description: Who sees the tracker and how often, the thresholds for flagging overruns, whether client variations change the budget, and Excel or Google Sheets.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout, Cost lines, Commitments and actuals, Forecast at completion, Change log and contingency, Flags, Monthly routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build project budget trackers for projects run on spreadsheets: fit-outs, events, construction jobs, IT rollouts, research grants. The figure that matters is not what has been spent but what the project will cost when finished. Actual spend lags reality because work is ordered weeks before it is invoiced, so a tracker must show commitments (orders and contracts placed) alongside actuals, and a forecast at completion of actual + open commitments + estimate of what is still to be ordered. The current budget is the original budget plus approved changes only; pending changes are a risk, not budget. Contingency is drawn down by logged transfers to the lines that need it, so total budget stays the same and the remaining contingency is visible. Common errors: counting an invoice twice (once as committed, once as actual), invoices with no order behind them, lines whose estimate to complete is never updated, and changes approved verbally but never logged.
</context>

<task>
Build the tracker.

<project>
{{project}}
</project>

<reporting>
{{reporting}}
</reporting>

1. Layout: tabs for Lines (one row per cost line), Commitments (one row per order or contract), Invoices (one row per invoice, linked to an order where there is one), Changes (change log), and Summary.
2. Cost lines: code, description, owner, original budget, approved changes `=SUMIFS(Changes[Amount], Changes[Line], code, Changes[Status], "Approved")`, contingency transfers in, current budget, committed, invoiced to date, open commitment, estimate still to commit (owner input), forecast at completion, variance at completion `= current budget - forecast`.
3. Commitments and actuals: committed per line with SUMIFS on Commitments; invoiced per line from Invoices; open commitment per order = order value - invoiced against that order (never below zero, with a flag if invoices exceed the order); invoices with no order counted directly in actuals and flagged.
4. Forecast at completion: actual + open commitments + estimate still to commit, per line and in total; percent spent versus the owner's percent complete as a sense check.
5. Change log and contingency: columns for ID, date, description, line, amount, type (client variation, internal change, contingency transfer), status (pending, approved, rejected), approved by; approved client variations raise the budget, contingency transfers move budget from the Contingency line to another line with a net zero total; remaining contingency and pending changes shown on the Summary.
6. Flags: forecast over current budget, by amount and percent thresholds; invoices over order value; lines with no estimate update this month; contingency below a set level. Conditional formatting rules for each.
7. Monthly routine: enter orders and invoices, owners update estimates, log changes, review flags, and save a dated snapshot of the Summary so trends can be shown.
</task>

<constraints>
- Budgets, thresholds and contingency levels are inputs; no numbers inside formulas.
- Do not double count: an invoice is either against an order (reducing its open commitment) or a direct cost, never both.
- Only approved changes change the budget; show pending ones separately.
- Use functions available in the user's tool; note where Excel and Google Sheets differ.
- Test with two lines, one order partly invoiced and one approved change, and show the numbers.
</constraints>

<output_format>
## Layout
## Cost lines
Table: Column | Formula or input.
## Commitments and actuals
## Forecast at completion
## Change log and contingency
## Flags
Table: Flag | Formula | Threshold cell.
## Monthly routine
End with the worked example table: Line | Budget | Committed | Invoiced | Open | Forecast | Variance.
</output_format>
