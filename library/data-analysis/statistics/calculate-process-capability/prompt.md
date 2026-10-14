---
schema: 1
id: calculate-process-capability
kind: prompt
title: Calculate process capability
description: Calculates Cp, Cpk, Pp and Ppk against specification limits after checking stability and normality, estimates the defect rate, and says what to fix, centring or spread.
category: statistics
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [operations-manager, qa-engineer, data-analyst, researcher]
subject: [statistics, engineering]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [process-capability, cpk, ppk, six-sigma, quality-control, specification-limits]
pairs_with:
  prompts: [build-control-chart, run-gauge-r-and-r-study, plan-acceptance-sampling]
  personas: [statistician]
args:
  - name: data
    description: "The measurements in production order (with subgroups if you collect them), the unit, the number of values, and any summary already computed (mean, within and overall standard deviation)."
    type: text
    required: true
  - name: specification
    description: "The lower and/or upper specification limits and the target, where they come from (drawing, customer, regulation), and any capability the customer requires (for example Cpk ≥ 1.33)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Prerequisites, Indices, Expected defects, Interpretation, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a quality engineer who signs off capability studies for customers. Capability indices only mean something for a stable process: if the control chart shows special causes, the next batch may look nothing like this one, so stability comes first. Cp and Cpk use the within-subgroup (short-term) standard deviation, usually estimated from the average range or moving range; Pp and Ppk use the overall standard deviation of all the data. A large gap between Cpk and Ppk means the process drifts between subgroups. Cp compares the spec width with the spread; Cpk also accounts for centring, so Cp much higher than Cpk means re-centring would help more than reducing spread. Defect-rate estimates from indices assume normality and are very sensitive to the tails; skewed characteristics (flatness, roundness, impurity, anything bounded at zero) need a transformation or a fitted distribution, and one-sided specs only use the relevant side. Thirty values give a wide confidence interval on Cpk; around 100 or more are usual for a study. The measurement system must be adequate, or the measured spread overstates the process spread.
</context>

<task>
Calculate process capability for this characteristic.

<data>
{{data}}
</data>

<specification>
{{specification}}
</specification>

1. Check prerequisites: stability (control chart, no special causes), sample size, subgrouping, normality (probability plot or test, plus the physical nature of the characteristic), and measurement system adequacy. If the process is not stable, say the indices are not meaningful and stop at a provisional estimate clearly labelled.
2. Compute the indices with the working. Cp = (USL − LSL) / 6σ_within; Cpk = min(USL − mean, mean − LSL) / 3σ_within; Pp and Ppk the same with σ_overall. For one-sided specs, compute only Cpu or Cpl (and Ppu or Ppl). Give an approximate confidence interval for Cpk when n is known.
3. Estimate the expected out-of-spec rate (ppm) beyond each limit from the normal model with the overall σ, or from the fitted non-normal distribution, and compare with observed out-of-spec counts.
4. Interpret: is the process capable against the required level, is the issue centring (Cp ≫ Cpk) or spread, and is there drift (Cpk ≫ Ppk)? Name the next actions in order.
5. Give code (Python or R, or Minitab steps if asked) that checks stability, normality, computes all four indices with confidence intervals and draws the capability histogram with spec limits.
</task>

<constraints>
- Do not invent measurements or standard deviations; compute only from what is given.
- Never report capability as final for a process that is not shown to be stable.
- Do not mix within and overall standard deviations between Cp/Cpk and Pp/Ppk.
- Do not use normal-theory ppm for a clearly skewed or bounded characteristic without saying so.
- Do not change specification limits to make the numbers pass; specs come from the customer or design.
</constraints>

<output_format>
## Prerequisites
Stability, normality, sample size, measurement system.

## Indices
Table: Index | Value | Working, with a confidence interval for Cpk.

## Expected defects
Ppm below LSL, above USL, total, versus observed.

## Interpretation
Capable or not, centring vs spread vs drift, next actions.

## Code
One code block.
</output_format>
