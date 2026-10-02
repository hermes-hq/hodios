---
schema: 1
id: design-spreadsheet-model
kind: prompt
title: Design a spreadsheet model
description: Designs a spreadsheet model for a business calculation with separate inputs, calculations, outputs, checks and named ranges. Use before building a pricing, capacity or unit-economics model.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [design]
role: [business-analyst, financial-analyst, founder, operations-manager]
stack: [excel, google-sheets]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [financial-modelling, named-ranges, model-checks, scenarios]
pairs_with:
  prompts: [write-spreadsheet-formula, define-metric]
args:
  - name: purpose
    description: The decision or question the model supports, who will use it, and the time horizon (for example "monthly unit economics for a subscription product over 24 months").
    type: text
    required: true
  - name: inputs
    description: The assumptions and data you already have, with values and units if known.
    type: text
  - name: app
    description: Spreadsheet application the model will be built in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Model logic, Sheet structure, Inputs, Calculations, Outputs, Checks, Build order, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a modelling practitioner who follows the conventions used in good financial and operational modelling (the FAST standard and similar): inputs separate from calculations, one formula per row consistent across columns, no hard-coded numbers inside formulas, flows that read left to right and top to bottom, and checks that turn red when something breaks. A model is a decision tool that other people will audit and change; structure matters more than cleverness.
</context>

<task>
Design a model in {{app}} for this purpose:

<purpose>
{{purpose}}
</purpose>

<known_inputs>
{{inputs}}
</known_inputs>

1. State the model logic: the one output that drives the decision, and the chain of drivers that produces it, written as equations (for example `Revenue = Active customers × ARPU`; `Active customers = Opening + New − Churned`). Keep the driver tree as shallow as the decision allows.
2. Lay out the sheets: Cover (purpose, version, how to use), Inputs, Calculations (one or more by topic), Outputs, Checks. For time-based models, use a single timeline (one column per period) shared by every calculation sheet, with period flags (for example a 1/0 flag for "is forecast period").
3. List every input: name, unit, value or "needed", source, and whether it is a scenario lever. Give each a named range following one convention (for example `inp_churn_rate_monthly`). Group scenario levers so a scenario switch can choose between Base, Downside and Upside values.
4. List the calculation rows in order: name, unit, formula in words or in {{app}} syntax using the named ranges, and which rows feed it. Each row has one formula copied across all periods.
5. Define outputs: the decision metric, a small summary table, and one sensitivity on the two or three inputs that move the answer most.
6. Define checks: balance or reconciliation checks, sign checks, totals that must match, and a master check cell that shows OK or ERROR on the cover.
7. Give a build order that lets the user test each block before the next.
</task>

<constraints>
- No number appears inside a calculation formula except 0, 1 and unit conversions such as 12 months; everything else is an input.
- Do not invent input values. Use what was given; mark everything else "needed" and say what a sensible source would be. When an illustrative value helps, label it clearly as a placeholder.
- Keep units explicit and consistent (monthly vs annual rates, currency, thousands). Flag any conversion.
- Use colour conventions only as a suggestion (for example inputs in one fill colour) and never rely on colour alone to convey meaning.
- If the purpose is too vague to choose an output metric, ask what decision the model informs and stop.
- This is a structure for a calculation, not financial, tax or investment advice. If the purpose depends on tax or accounting treatment, mark that input for review by a qualified accountant.
</constraints>

<output_format>
## Model logic
The output metric and the driver equations.

## Sheet structure
A table: sheet | purpose | key contents.

## Inputs
A table: named range | description | unit | value or "needed" | source | scenario lever (yes/no).

## Calculations
A table in calculation order: row name | unit | formula | depends on.

## Outputs
The decision metric, the summary table layout, and the sensitivity design.

## Checks
A table: check | formula or rule | expected result.

## Build order
Numbered steps, each with what to test before moving on.

## Open questions
Assumptions that most affect the answer and still need confirming.
</output_format>
