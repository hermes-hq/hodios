---
schema: 1
id: write-experiment-readout
kind: prompt
title: Write an experiment readout
description: Turns a finished experiment's results into a one-page decision record for stakeholders, with a forwardable summary, the result against the prediction, trust checks, the decision and limits.
category: product-metrics
version: 2.0.0
status: incubating
stage: [review]
role: [product-manager, data-scientist, data-analyst, marketer]
requires: [none]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [statistics]
tags: [ab-test-results, experiment-readout, confidence-intervals, sample-ratio-mismatch, decision-memo]
pairs_with:
  prompts: [analyze-ab-test-results, design-ab-test, design-holdout-experiment, review-launch-results]
args:
  - name: results
    description: The tool's output or an analyst's numbers. Dates, population, planned split, users and metrics per variant, intervals and checks reported, segment cuts, weekly traffic for business terms, and the decision rule set before launch.
    type: text
    required: true
  - name: hypothesis
    description: The hypothesis as written before the experiment, including the expected direction and size of the effect.
    type: text
    required: true
  - name: audience
    description: Who reads the readout, which sets the level of statistical detail.
    type: string
    default: product and leadership stakeholders
output_contract:
  format: markdown
  sections: [TL;DR, What we tested and why, What happened, Can we trust it, Decision, What we learned, What this does not tell us, Next steps, Appendix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 2.0.0, note: "Rewritten as the stakeholder decision record: judges the result against the predicted effect, explains it in plain words and business terms, says what the test cannot tell, and leaves full statistical analysis to the analysis step."}
---
<context>
You write the experiment readout: the one-page record that people outside the analytics team read to learn what was tested, what happened and what the team will do, and that someone will find in the experiment log a year from now. Executives read the first three lines; product and design read the page; analysts check the appendix. The statistics are an input you report faithfully, not the point of the document.

Readouts mislead in familiar ways: "significant" used as a synonym for "big", a relative lift with no base rate, a winner declared when the effect is smaller than the change was predicted to produce, a segment found after the fact presented as a finding, a flat result written up as a failure, and a success metric that quietly changed after launch. A good readout says the decision first, compares the result with what the team predicted, separates planned from exploratory, and is plain about what the test cannot show.
</context>

<task>
<hypothesis>
{{hypothesis}}
</hypothesis>

<results>
{{results}}
</results>

Audience: {{audience}}.

If the results lack the numbers needed to compare variants (users and outcomes per variant, or the tool's effect estimate with its interval), ask for them and stop.

1. **Trust checks.** Use the checks the tool reports. If only raw counts are given, do the minimum yourself and show the arithmetic in the appendix: a sample ratio check against the planned split (chi-square goodness of fit; p below 0.001 means assignment or logging is broken) and, for a rate, a 95% interval for the difference with the normal approximation. Do not compute an interval for a mean metric without standard deviations; report the tool's or say it is missing. Also note early stopping, a run shorter than one weekly cycle, and tracking changes. If a check fails, the decision is "Do not use this result", and the readout explains in plain words why and what happens next.
2. **Result against the prediction.** State the primary metric for each variant, the absolute change with its base rate, the relative change and the 95% range. Then compare with the hypothesis: did the effect reach the size the team predicted, and does the range include effects too small to be worth it? A result can clear zero and still fall short of the prediction; say so.
3. **Business terms.** If traffic or value per conversion is given, translate the change and its range into units leaders care about (extra purchases per week, revenue per month) and show the sum. Otherwise skip it; do not assume traffic.
4. **Guardrails and segments.** Report each guardrail as held, breached or unclear. Report pre-planned segments; list any others under "What this does not tell us" as ideas for a future test.
5. **Decision.** Apply the decision rule set before launch, quoting it. If there was none, recommend a decision, say that it was made after seeing the data, and suggest setting the rule in advance next time. Use one word first: Ship, Iterate, Stop, Extend, or Do not use this result.
6. **What we learned.** What the result says about customers and about the reason behind the hypothesis, not only about the variant. A flat result is evidence too: the change did not move the metric by the amount the test could detect.
7. **What this does not tell us.** For example long-term or novelty effects, users outside the test population, effects smaller than the test could detect, and exploratory segments.
8. **Next steps** with [OWNER] and [DATE] placeholders.
9. **TL;DR** of three lines a reader could forward: what we tested, what happened in plain words, what we are doing.
</task>

<constraints>
- Use only the numbers in the input or computed from them, with the arithmetic in the appendix. Never invent p-values, intervals, traffic or sample sizes.
- Write "statistically significant" only when the interval excludes zero, and pair it with the size of the effect. For leadership audiences, prefer plain phrasing such as "a real but modest lift" or "no change we could detect".
- Never present an exploratory segment as a finding or claim it caused anything.
- The body fits on one page (about 400 words before the appendix). Statistical detail goes in the appendix.
{{> output/uncertainty}}
</constraints>

<output_format>
# [Experiment name]: readout
One line: Decision | Confidence (high, medium, low) | Dates | Owner [OWNER].
## TL;DR
Three lines.
## What we tested and why
The hypothesis, the predicted effect, the population and the split.
## What happened
| Metric | Control | Variant | Change | 95% range | Predicted | Read |
Business-terms line if traffic or value was given.
## Can we trust it
| Check | Result |
## Decision
The decision word, the rule it was judged against, and why.
## What we learned
## What this does not tell us
## Next steps
| Action | Owner | By |
## Appendix: calculations
</output_format>
