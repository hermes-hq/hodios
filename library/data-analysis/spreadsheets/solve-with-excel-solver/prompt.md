---
schema: 1
id: solve-with-excel-solver
kind: prompt
title: Solve an optimisation problem with Excel Solver
description: Sets up Excel Solver, or a solver add-on in Google Sheets, for allocation, product mix, staffing or shipping problems, with objective, constraints and method, and explains failed or odd results.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, business-analyst, data-analyst, student]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [solver, linear-programming, product-mix, resource-allocation, integer-constraints]
pairs_with:
  prompts: [run-what-if-analysis, design-spreadsheet-model]
args:
  - name: problem
    description: The decision in plain words - what you choose (quantities, shifts, routes, budgets), what you want to maximise or minimise, and every limit (capacity, budget, minimums, whole numbers, either-or rules).
    type: text
    required: true
  - name: data
    description: The numbers involved - costs, profits, capacities, demands, resource use per unit - or a description of where they are in the workbook.
    type: text
    required: true
  - name: tool
    description: Excel (Windows, Mac, web) or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The model in words, Sheet layout, Solver settings, Running it, Reading the result, If it fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up optimisation models in spreadsheets. Excel Solver needs three things on the sheet: decision cells (the quantities Solver may change), one objective cell computed from them, and constraint cells whose formulas compare a used amount with a limit, almost always with SUMPRODUCT. The choice of method matters: Simplex LP is fast and finds the true optimum, but only if every formula linking the decision cells to the objective and constraints is linear; IF, MAX, MIN, ROUND, lookups on decision cells, or multiplying two decision cells break linearity. GRG Nonlinear handles smooth curves but can stop at a local optimum; Evolutionary handles anything but is slow and approximate. Whole-number and yes-or-no decisions use int and bin constraints, and the Integer Optimality setting (1% by default) can stop Solver at a near-best answer unless set to 0. "Could not find a feasible solution" usually means a constraint has the wrong sign, a unit mismatch, or limits that truly cannot all be met; "objective cell values do not converge" means a missing limit. The Sensitivity report (shadow prices, allowed ranges) is available for linear models without integer constraints. Google Sheets has no built-in Solver; an add-on from the Workspace Marketplace is needed.
</context>

<task>
Set up the optimisation in {{tool}}.

<problem>
{{problem}}
</problem>

<data>
{{data}}
</data>

1. The model in words: decision variables with units, the objective, and each constraint as a sentence and as an inequality. Flag assumptions (for example that profit per unit is constant at any volume) and ask about any missing limit that would make the problem unbounded.
2. Sheet layout: a grid with input tables (unit data, capacities, demands), the decision cells highlighted and set to a starting value, the objective cell formula, and for each constraint a "used" cell with SUMPRODUCT next to its "limit" cell. Give every formula with its cell, using the user's data.
3. Solver settings: enabling the add-in (File > Options > Add-ins > Manage Excel Add-ins > Solver Add-in) where needed; Set Objective, Max or Min, By Changing Variable Cells, each Subject to the Constraints entry (range, sign, limit, int or bin), Make Unconstrained Variables Non-Negative, and the solving method with the reason. For Google Sheets, the equivalent fields in the add-on.
4. Running it: save first, solve, Keep Solver Solution or Restore Original Values, generate the Answer and (if linear without integers) Sensitivity reports, and save the model with Load/Save so it can be rerun.
5. Reading the result: what the solution says in business terms, which constraints are binding (used equals limit), and, from the Sensitivity report, what an extra unit of a binding resource is worth and over what range. Check the result by hand against two constraints.
6. If it fails: the cause and fix for each message (infeasible, unbounded, stopped at a local optimum, integer answer looks wrong), including running without int constraints first to check feasibility.
</task>

<constraints>
- Keep the model linear where the problem allows and say when it cannot be; do not use IF or lookups on decision cells with Simplex LP.
- Never type numbers into constraint dialogs that belong in cells; every limit lives in a labelled cell.
- Do not present the optimum as a recommendation without the assumptions; the model is only as good as its data.
- Standard Solver has size limits on decision cells and constraints; if the problem is large, say so and mention dedicated optimisation tools.
- For Google Sheets, do not name a specific add-on as guaranteed available; tell the user to check the Marketplace for a solver add-on.
</constraints>

<output_format>
## The model in words
Decision variables, objective and constraints as a list.
## Sheet layout
Table: Cell | Content | Formula or value.
## Solver settings
Table: Field | Setting.
## Running it
## Reading the result
## If it fails
Table: Message | Likely cause | Fix.
</output_format>
