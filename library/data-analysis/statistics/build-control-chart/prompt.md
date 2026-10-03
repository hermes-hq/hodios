---
schema: 1
id: build-control-chart
kind: prompt
title: Build a control chart
description: Builds a statistical process control chart with the right chart type, control limits, special-cause rules and an interpretation that separates signal from noise. Use to monitor a process over time.
category: statistics
version: 1.0.0
status: incubating
stage: [operate, verify]
role: [operations-manager, data-analyst, manager, business-analyst]
subject: [statistics]
inputs: [dataset, text]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [spc, control-limits, process-control, quality-improvement]
pairs_with:
  prompts: [detect-anomalies, analyze-process-cycle-times, map-business-process]
args:
  - name: data
    description: "The measurements in time order with dates or sequence numbers, the unit, and for p or c charts the sample size or inspection area per point. Include any known process changes and their dates."
    type: text
    required: true
  - name: chart_type
    description: "individuals (single measurements, I-MR), xbar-r (subgroups of 2 to 10 measurements), p (proportion defective, sample sizes may vary) or c (count of defects in a constant area of opportunity)."
    type: enum
    enum: [individuals, xbar-r, p, c]
    default: individuals
output_contract:
  format: markdown
  sections: [Chart choice, Limits, Signals, Interpretation, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a quality engineer who teaches statistical process control in the tradition of Shewhart and Deming. You know the two expensive mistakes: reacting to ordinary variation as if each wobble had a cause (tampering), and missing a real shift because no one drew the limits. You also know the frequent technical errors: limits computed from the overall standard deviation instead of within-subgroup variation, limits recalculated with every new point, and specification limits confused with control limits.
</context>

<task>
Build a {{chart_type}} control chart for this data.

<data>
{{data}}
</data>

1. Check the data: time order, number of points, the measurement unit, and any gaps. If points are not in time order or have no sequence, ask for it and stop. With fewer than 20 points (or 20 subgroups), compute provisional limits and label them as such.
2. Check that {{chart_type}} fits the data. Individual continuous values suit individuals (I-MR); rational subgroups of 2 to 10 suit xbar-r; defective or not per unit with a sample size per period suits p; defect counts over a constant area of opportunity suit c. If it does not fit, say which chart fits and why, and build that one.
3. Choose the baseline period: the points used to compute limits, ideally a stable stretch before a known change. If a known process change occurred, compute separate limits before and after it.
4. Compute the centre line and limits, showing the working:
   - Individuals: X̄ and the average moving range MR̄; limits X̄ ± 2.66 × MR̄; moving range chart upper limit 3.267 × MR̄.
   - Xbar-R: grand mean and R̄; limits X̄ ± A2 × R̄; range chart D3 × R̄ and D4 × R̄, with A2, D3, D4 for the subgroup size (n = 2: 1.880, 0, 3.267; n = 3: 1.023, 0, 2.574; n = 4: 0.729, 0, 2.282; n = 5: 0.577, 0, 2.114).
   - p: p̄ = total defectives ÷ total inspected; limits p̄ ± 3 × √(p̄(1 − p̄) / nᵢ) per point when sizes vary, floored at 0.
   - c: c̄ ± 3 × √c̄, floored at 0.
5. Apply the detection rules and name them: one point beyond 3 sigma; eight consecutive points on one side of the centre line; six points steadily increasing or decreasing; two of three consecutive points beyond 2 sigma on the same side; four of five beyond 1 sigma on the same side. Say that each extra rule raises the false-alarm rate, and recommend the first two or three for routine monitoring.
6. Interpret: is the process stable (only common-cause variation) or are there special causes? For each signal, give the date, the rule and the questions to ask about what happened then. If stable, say what the limits predict for future performance and that improving it needs a change to the system, not a reaction to individual points.
7. Provide code to compute and plot the chart in Python (pandas and matplotlib), with the centre line, limits and flagged points.
</task>

<constraints>
- Compute sigma for individuals charts from the moving range, never from the standard deviation of all points; say why if the user's previous chart did otherwise.
- Do not recalculate limits on every new point; recalculate only after a deliberate, confirmed process change.
- Keep control limits and specification or target limits separate. A stable process can still fail to meet the specification, and that is a capability question.
- For heavily skewed data (waiting times, counts near zero), note the risk of false signals and suggest a transformation or a chart suited to rare events, such as time between events.
- Do not invent causes for signals; give questions and checks instead.
</constraints>

<output_format>
## Chart choice
Two or three sentences: the chart used, why, and the baseline period.

## Limits
Table: Chart | Centre line | Lower limit | Upper limit | Working. One row per chart (for example I and MR).

## Signals
Table: Point or date | Value | Rule triggered | Questions to investigate. Write "No signals" if none.

## Interpretation
One short paragraph on stability and what to do next.

## Code
One Python code block.
</output_format>
