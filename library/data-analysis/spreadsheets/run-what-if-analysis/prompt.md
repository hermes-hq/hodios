---
schema: 1
id: run-what-if-analysis
kind: prompt
title: Run a what-if analysis
description: Builds a scenario and sensitivity analysis for a decision (best, base and worst cases, a tornado chart and breakevens) as a spreadsheet layout with exact formulas. Use before committing to a plan.
category: spreadsheets
version: 1.0.0
status: experimental
stage: [plan]
role: [business-analyst, financial-analyst, founder, data-analyst]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scenario-analysis, sensitivity-analysis, tornado-chart, breakeven]
pairs_with:
  prompts: [build-kpi-tree]
args:
  - name: decision
    description: The decision and the outcome that matters, for example "whether to open a second café; outcome is 3-year cumulative profit".
    type: text
    required: true
  - name: variables
    description: The uncertain inputs, each with a base value and, if you have them, a low and high value and where the numbers come from.
    type: text
    required: true
  - name: app
    description: The spreadsheet app the formulas should work in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Model, Inputs sheet, Calculation sheet, Scenarios, Sensitivity, Breakevens, How to read it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A what-if model is useful when it shows which assumptions the decision actually depends on. That takes three views: coherent scenarios (best, base and worst cases built from assumptions that would plausibly happen together, not every input at its extreme at once), one-way sensitivity (swing each input from low to high with the others at base, sorted by impact in a tornado chart), and breakevens (the value of each key input at which the decision flips). The model must keep inputs separate from calculations, so changing an assumption never means editing a formula.
</context>

<task>
Build a what-if analysis in {{app}} for this decision:
<decision>
{{decision}}
</decision>
Uncertain inputs:
<variables>
{{variables}}
</variables>

1. Define the output metric and the decision rule (for example "go if 3-year profit is above zero").
2. Write the model as a short chain of formulas from inputs to output, and state every structural assumption (time horizon, what is fixed versus variable, timing of cash flows, discounting).
3. Lay out an Inputs sheet: one row per input with name, unit, low, base, high, source, plus a scenario selector cell. Give each input a named range.
4. Lay out a Calculation sheet that references only the live input cells, with exact cell addresses and formulas.
5. Scenarios: define best, base and worst as coherent sets of input values, explain why each set hangs together, and drive the live inputs from the selector (for example with `CHOOSE` or `INDEX` on the scenario number). In Excel, also mention Scenario Manager as an option.
6. Sensitivity: for each input, compute the output at its low and high value with the others at base, and the swing. In Excel, use a one-variable Data Table or a LAMBDA of the model; in Google Sheets, which has no Data Table feature, wrap the model in a named function or LAMBDA, or give one row per input that recomputes the output with the overridden value. Sort by swing and describe how to chart it as a tornado (a bar chart of low and high deltas from base).
7. Breakevens: for the two or three most sensitive inputs, solve for the value at which the decision rule flips, algebraically where possible, or with Goal Seek (built into Excel; an add-on in Google Sheets).
8. Compute the base, best and worst outputs and the sensitivity table from the numbers given, showing the arithmetic.
</task>

<constraints>
- Use only the user's numbers. If an input has no low or high value, propose a range, label it "[assumed range]" with the reasoning, and list it under How to read it.
- If an important input seems to be missing from the list (for example taxes, ramp-up time or one-off costs), name it and ask whether to add it rather than silently inventing a value.
- Every formula must work in {{app}} as written; use function names and separators for an English-locale setup and say so.
- Present the model as a decision aid, not a recommendation: the decision belongs to the user, and the model is only as good as its ranges.
- Keep it auditable: no hard-coded numbers inside formulas, and no circular references.
</constraints>

<output_format>
## Model
The output metric, decision rule, formula chain and structural assumptions.
## Inputs sheet
A table: cell | name | unit | low | base | high | source.
## Calculation sheet
A table: cell | label | formula.
## Scenarios
A table: input | worst | base | best, then the output for each scenario and the selector formula.
## Sensitivity
A table sorted by swing: input | output at low | output at high | swing; then the formulas and the tornado chart steps.
## Breakevens
Each input's breakeven value and how it was found.
## How to read it
Three to five bullets: which assumptions matter most, which ranges were assumed, and what to verify before deciding.
</output_format>
