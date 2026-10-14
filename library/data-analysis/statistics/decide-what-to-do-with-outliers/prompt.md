---
schema: 1
id: decide-what-to-do-with-outliers
kind: prompt
title: Decide what to do with outliers
description: Decides whether extreme values in an analysis are errors or real, sets a rule you can defend, and reports results with and without them using robust methods where they fit.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [data-analyst, researcher, student, data-scientist]
subject: [statistics]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [outliers, influential-points, robust-statistics, winsorizing, sensitivity-analysis, data-quality]
pairs_with:
  prompts: [check-normality-assumption, run-regression-analysis, check-analysis-for-pitfalls]
  personas: [statistician]
args:
  - name: values
    description: "The extreme values and their context: the variable, units, how many there are, how extreme (for example compared with the median or the next-largest value), and anything known about how they were recorded."
    type: text
    required: true
  - name: analysis
    description: "The analysis they affect (mean comparison, regression, correlation, forecast, KPI) and how results change with and without them, if you know."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: Excel, R, Python, SPSS."
    type: string
output_contract:
  format: markdown
  sections: [Classification, Rule, Analysis approach, Reporting, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who has to sign off on what was removed from a dataset. You know there are three kinds of extreme value and each needs a different response: errors (a typo, a unit mix-up, a test account, a sensor fault), which are corrected or removed with a documented reason; legitimate values from a different population than the one studied (a bulk wholesale order in a retail analysis), which are excluded by a scope rule written in advance; and genuine extremes of the population of interest (a very large customer), which belong in the data and call for a method that handles them. You know that "beyond 3 SD" or "outside 1.5 × IQR" are screening rules, not reasons to delete, that removing points after seeing how they change the p-value is a form of p-hacking, and that in regression the question is influence (Cook's distance, leverage), not just extremeness. Robust methods (medians, trimmed means, Huber regression, log scales, rank methods) often beat deletion.
</context>

<task>
Decide how to handle these extreme values.

<values>
{{values}}
</values>

<analysis>
{{analysis}}
</analysis>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Classify each extreme value or group of values as a likely error, out-of-scope, or genuine, with the evidence for each and what to check to confirm (source records, units, timestamps, test or internal accounts, device logs, duplicates). If the evidence is not enough to tell, say what would settle it.
2. Write a rule that could have been written before seeing the results: what is corrected, what is excluded by scope and why, and how genuine extremes are handled. If a pre-registered or prior rule exists, follow it.
3. Recommend the analysis approach for genuine extremes: keep them with a method that is not dominated by a few points (median or trimmed mean, log scale, robust regression, rank-based test, winsorising at a stated percentile) or keep the original method if the extremes are part of what matters (total revenue depends on big customers). For regression, check influence with Cook's distance and leverage, not only residual size.
4. Plan the sensitivity analysis: results with and without the questionable points (and with the robust method), shown side by side. If the conclusion flips, say that the conclusion depends on a few observations and must be reported that way.
5. Draft the reporting text: how many values were changed or excluded, why, and how results differ.
6. Give code for the chosen tool to flag candidates (IQR or robust z-score with median and MAD; Cook's distance for models), apply the rule and run the sensitivity comparison.
</task>

<constraints>
- Never recommend deleting values only because they are extreme or because removal makes a result significant.
- Do not apply a removal rule chosen after seeing how it changes the result without saying so.
- Do not silently change or impute values; every change must be listed.
- Do not invent the cause of an outlier; mark causes as hypotheses until checked.
- Keep results with and without the questionable values in the report when they differ.
</constraints>

<output_format>
## Classification
Table: Value or group | Likely type | Evidence | How to confirm.

## Rule
The handling rule in numbered points.

## Analysis approach
Method for genuine extremes and the influence check.

## Reporting
Sensitivity table layout and a draft paragraph.

## Code
One code block.
</output_format>
