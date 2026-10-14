---
schema: 1
id: analyze-standard-curve
kind: prompt
title: Analyse a standard curve
description: Fits a standard curve for a plate or spectrophotometric assay, picks a sensible model, checks back-calculated standards, sets the working range and limits, and interpolates samples honestly.
category: lab-work
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [dataset, text]
output: [table, explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [standard-curve, calibration-curve, four-parameter-logistic, limit-of-quantification, interpolation]
pairs_with:
  prompts: [troubleshoot-elisa, design-plate-layout, calculate-solution-dilutions]
args:
  - name: standards
    description: Standard concentrations with units and their raw readings, including replicates and blanks.
    type: text
    required: true
  - name: samples
    description: Sample readings with replicates and the dilution each was run at. Optional; without it you get the curve analysis only.
    type: text
  - name: assay
    description: The assay type, for example "BCA protein assay", "sandwich ELISA" or "absorbance of a coloured product at 540 nm", and any fit the kit or lab specifies.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Model choice, Fit and back-calculation, Working range, Sample results, Flags, How to reproduce]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A high R squared does not make a good standard curve. What matters is whether each standard, read back through the fitted curve, lands close to its nominal value (back-calculated recovery), and whether samples fall inside the range where that holds. Colorimetric protein assays are often close to linear only over part of their range; immunoassays are sigmoidal and usually need a four- or five-parameter logistic fit, often weighted, because variance grows with signal. Forcing a line through zero, subtracting blanks inconsistently, or fitting a line to a curve's plateau gives confident wrong answers. Samples outside the validated range are re-run at another dilution, not extrapolated, and results are multiplied back by their dilution factor.
</context>

<task>
Assay: {{assay}}

<standards>
{{standards}}
</standards>
{{#samples}}

<samples>
{{samples}}
</samples>
{{/samples}}

1. Model choice: inspect the shape of the data (blank-corrected) and choose linear over a restricted range, quadratic, 4PL or 5PL, following the kit's specified model if given. Say why, and whether weighting is advisable.
2. Fit and back-calculation: give the fitted parameters if you can compute them reliably from the data, otherwise say which tool to use and how. Back-calculate each standard and give percent recovery; flag standards outside about 80 to 120% recovery (or the lab's criterion), and replicates that disagree.
3. Working range: the lowest and highest standards that back-calculate acceptably define the quantifiable range. Explain how a lower limit of quantification would be formally set and that one plate does not establish it.
4. Sample results: interpolate each sample inside the range, multiply by its dilution factor, give the mean and replicate spread, and mark samples below or above the range with what to do (re-run at another dilution).
5. Flags: outliers, plateau compression, blank problems, too few points in the steep part of the curve.
6. How to reproduce: steps to redo the fit in a spreadsheet or analysis tool so the user can verify.
</task>

<constraints>
- Do arithmetic carefully and show it; if a fit needs iterative software (4PL, 5PL), do not pretend to precision you cannot compute. Give approximate values clearly labelled, or the method only.
- Never extrapolate beyond the range of acceptable standards.
- Do not drop a standard point just to improve the fit unless there is a documented reason; mark any exclusion.
- Keep units on every concentration.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model choice
## Fit and back-calculation
| Standard | Nominal | Mean reading | Back-calculated | Recovery % |
## Working range
## Sample results
| Sample | Dilution | Interpolated | Final concentration | Note |
## Flags
## How to reproduce
</output_format>
