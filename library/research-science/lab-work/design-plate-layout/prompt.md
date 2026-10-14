---
schema: 1
id: design-plate-layout
kind: prompt
title: Design a microplate layout
description: Designs a 96- or 384-well plate map that spreads conditions, standards and controls against edge effects and gradients, balances randomisation with pipetting, and exports a table for analysis.
category: lab-work
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [plate-map, edge-effects, randomisation, assay-layout, elisa]
pairs_with:
  prompts: [plan-bench-experiment, calculate-solution-dilutions]
args:
  - name: assay
    description: The assay and readout, plate format (96 or 384 wells), conditions and samples, replicates per condition, standards or calibrators, blanks and controls, and incubation conditions.
    type: text
    required: true
  - name: handling
    description: How you will pipette (single or multichannel, robot), the reader, how many plates, and any wells you cannot use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Well budget, Layout strategy, Plate map, Pipetting order, Analysis table]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Plate layouts quietly bias results. Outer wells evaporate faster and warm differently during incubation (edge effects), so many labs fill them with buffer or medium and leave them out of analysis. Plates also have gradients from pipetting order, temperature and reader path, so putting all controls in column 1 and all treated samples in column 12 confounds treatment with position. Good layouts spread replicates across the plate, interleave conditions, place standards so the curve is not all at one edge, include blanks, and still let the person pipette with a multichannel without errors. Randomisation helps most for long incubations and cell-based assays; a structured, interleaved layout is often an acceptable compromise when manual pipetting errors are the bigger risk. The plate map should leave the bench as a machine-readable table, not only a drawing.

Assay:
<assay>
{{assay}}
</assay>
{{#handling}}Handling: {{handling}}{{/handling}}
</context>

<task>
1. Well budget: count wells needed (samples times replicates, standards, blanks, controls), compare with usable wells after edge exclusion, and say if it does not fit, with options (fewer conditions, a second plate with shared controls on both, accepting edge wells for blanks).
2. Layout strategy: explain the choice between full randomisation, block randomisation and an interleaved structured layout for this assay{{#handling}} and the pipetting method given{{/handling}}, and where standards, blanks and controls go.
3. Plate map: draw the plate as a grid with rows A to H (or A to P) and columns 1 to 12 (or 1 to 24), using short codes, plus a legend.
4. Pipetting order: the order of additions that keeps timing even across the plate for time-sensitive steps, and what to double-check.
5. Analysis table: a well-by-well table (well, sample or condition, replicate, type, concentration if a standard) ready to join with the reader's export.
</task>

<constraints>
- Do not change the user's conditions or replicates without saying so; propose changes separately.
- Do not invent standard concentrations or dilution series; use the user's or mark [CONFIRM].
- If multiple plates are needed, include the same controls and a shared reference sample on every plate so plates can be compared.
- Keep codes short enough to fit a printed grid.
</constraints>

<output_format>
Use the contract's section headings in order. Plate map as a markdown table with row letters and column numbers. Analysis table as CSV in a fenced block.
</output_format>
