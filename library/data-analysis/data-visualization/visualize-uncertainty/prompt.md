---
schema: 1
id: visualize-uncertainty
kind: prompt
title: Visualise uncertainty in estimates
description: Shows uncertainty in estimates such as poll results, model coefficients or group means with intervals, gradients or quantile dots and wording that lay readers interpret correctly.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, data-scientist, researcher, writer]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [uncertainty, confidence-intervals, error-bars, chart-design]
pairs_with:
  prompts: [present-forecast-uncertainty, compute-survey-margin-of-error, choose-chart-type, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: estimates
    description: "The estimates to show with their uncertainty: values and intervals (or standard errors), what kind of interval (95% confidence, credible, min-max, standard error), sample sizes, and what is being compared."
    type: text
    required: true
  - name: audience
    description: "Who will read the chart and what they will decide with it (for example 'general public reading a news article', 'executives choosing which region to invest in')."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the uncertainty means here, Recommended encoding, Design spec, Wording, Alternatives rejected, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who specialises in showing uncertainty honestly. You know that readers ignore error bars or misread them as the full range of the data; that "error bars" without a label could be standard errors, 95% confidence intervals or standard deviations, which differ by a factor of two or more; that overlapping 95% intervals do not mean "no significant difference"; that a bar chart with error bars invites "within-the-bar" bias where values inside the bar seem more likely; and that research shows quantile dotplots, gradient intervals and hypothetical outcome plots help lay readers reason about probability better than plain intervals. You also know that uncertainty that changes the decision must be visible, not in a footnote.
</context>

<task>
Design a chart that shows these estimates and their uncertainty.

<estimates>
{{estimates}}
</estimates>

<audience>
{{audience}}
</audience>

1. State what the uncertainty is (sampling error, measurement error, model uncertainty) and what it does not include (for example non-response bias in a poll). Convert intervals to a single consistent type and level if they are mixed; if the interval type is not stated, ask.
2. Decide what comparison the reader must make: each estimate against a threshold, estimates against each other, or a ranking. If intervals overlap heavily, the honest message may be "these are indistinguishable"; say so.
3. Choose the encoding for the audience and comparison:
   - point estimate with interval lines (dot-and-whisker) for analysts and many estimates;
   - gradient or multiple nested intervals (50%, 80%, 95%) to stop readers treating the edge as a hard boundary;
   - quantile dotplots for one or a few estimates when a lay audience must judge probabilities ("8 in 20 chance");
   - interval of the difference when the decision is about which is larger;
   - never bars with error bars for means unless zero is meaningful and the audience expects it.
4. Specify the design: order (by estimate, not alphabetically, unless there is a natural order), reference line for the threshold or zero, labels with the interval type and level, colour or opacity for intervals, and handling of estimates with small samples (wider intervals visible, or flagged).
5. Write the wording: title that states the finding with its uncertainty, a subtitle or legend explaining the interval in plain words, and one sentence a reader could repeat correctly.
6. List encodings rejected and why.
7. Give plotting code in the user's tool, or ggplot2 (ggdist) or Python (matplotlib) by default.
</task>

<constraints>
- Do not invent intervals; if only point estimates were given, say the uncertainty must be computed and how.
- Never label intervals only as "error bars"; always state type and level.
- Do not say non-overlapping or overlapping intervals prove or disprove a difference; show the interval of the difference when that is the question.
- Do not hide uncertainty that would change the reader's decision.
- Keep axis ranges honest: include the full intervals and the reference value.
</constraints>

<output_format>
## What the uncertainty means here
Two to four sentences.

## Recommended encoding
The chart and why it fits this audience and comparison.

## Design spec
Table: Element | Choice | Reason.

## Wording
Title, subtitle or legend text, and the one-sentence takeaway.

## Alternatives rejected
Bullets.

## Code
One code block.
</output_format>
