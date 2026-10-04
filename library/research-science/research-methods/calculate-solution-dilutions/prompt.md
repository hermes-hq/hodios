---
schema: 1
id: calculate-solution-dilutions
kind: prompt
title: Calculate dilutions, molarity and buffer recipes
description: Calculates dilutions, serial dilutions, molarity and buffer recipes step by step from the stocks on the shelf, showing every unit and a back-calculation check before anything is pipetted.
category: research-methods
version: 1.0.1
status: incubating
stage: [build, verify]
role: [researcher, student]
subject: [chemistry]
requires: [none]
inputs: [text]
output: [explanation, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [dilutions, molarity, serial-dilution, buffer-recipe, bench-calculations]
pairs_with:
  prompts: [write-lab-protocol, write-lab-notebook-entry, calculate-measurement-uncertainty]
args:
  - name: target
    description: What you need - concentration, volume and solvent, for example "500 ml of 50 mM Tris-HCl pH 7.5 with 150 mM NaCl" or "a 1:10 serial dilution series, 6 tubes of 1 ml".
    type: text
    required: true
  - name: stock
    description: What is on the shelf - stock solutions with their concentration, solids with formula weight from the label (including any hydrate form), and the pipettes and volumetric glassware you have.
    type: text
    required: true
  - name: units
    description: Unit system for the answer, for example "metric", "metric, show masses in mg" or "percent w/v". Molar quantities are always shown in SI units.
    type: string
    default: metric
output_contract:
  format: markdown
  sections: [Recipe, Working, Pipetting plan, Checks, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Checks report the final carrier-solvent concentration when a stock is not aqueous."}
---
<context>
Bench calculation errors are usually unit slips, not hard maths: millimolar read as molar, the anhydrous formula weight used for a hydrate, percent w/v confused with v/v, a 10X stock diluted as if it were 1X, or a pipetting step below the pipette's accurate range. The fix is to write every quantity with its unit, carry units through every line, use the formula weight printed on the actual bottle, and check the answer by calculating backwards. The person at the bench verifies the result before using it.
</context>

<task>
Work out how to make this.

<target>
{{target}}
</target>

<stock>
{{stock}}
</stock>

Units: {{units}}.

1. Identify the calculation type for each component: simple dilution (C1V1 = C2V2), mass from molarity (mass = concentration x volume x formula weight), percent solutions, dilution of an X stock, serial dilution (dilution factor per step and cumulative), or a buffer (component amounts, then pH adjustment).
2. For each component, write the formula, substitute values with units on every line, convert units explicitly, and give the result rounded to a precision that matches the glassware and balance available.
3. For a buffer, give the amounts of each component, the order of addition, the volume to dissolve in before pH adjustment (typically about 80% of the final volume), which acid or base to adjust with, and bringing to final volume afterwards. If the pH depends on temperature (as with Tris), say so.
4. Pipetting plan: the step-by-step volumes in order, with the pipette for each. If a volume is below the accurate range of the smallest pipette available, propose an intermediate dilution and recalculate. For serial dilutions, give a table with tube, transfer volume, diluent volume and resulting concentration, and add extra volume for pipetting losses if the final tube volume matters.
5. Checks: back-calculate the final concentration of every component from the volumes and masses you gave, confirm the volumes add up to the target, give the final concentration of any carrier solvent that comes in with a non-aqueous stock (for example DMSO or ethanol) so the user can check it against the tolerance of their cells or assay, flag any solubility concern if the concentration looks high for the compound, and note any safety step that matters for the procedure (for example add concentrated acid to water, not water to acid).
6. Assumptions: list every assumption, especially formula weights and stock concentrations.
</task>

<constraints>
- Use the formula weight from the user's label. If it is not given, ask for it, or give the commonly listed value clearly marked as "verify against your bottle", and say whether hydrate and anhydrous forms differ.
- Never drop a unit from a line of working, and never mix mM and M in one expression without converting.
- If the target is ambiguous (for example "10%" with no w/v or v/v, or no final volume), ask before calculating and stop.
- Do not give instructions for preparing hazardous materials beyond ordinary lab solutions; refer to the lab's protocols and safety data sheets.
- End with one line telling the user to verify the numbers before pipetting.
</constraints>

<output_format>
## Recipe
A table: Component | Stock or solid | Amount to add | Final concentration. Then the final volume and solvent.
## Working
The calculation for each component, one line per step, units throughout.
## Pipetting plan
Numbered steps, or a serial dilution table.
## Checks
The back-calculations and any warnings.
## Assumptions
A short list, then the verify line.
</output_format>
