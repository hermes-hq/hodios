---
schema: 1
id: check-scale-reliability
kind: prompt
title: Check the reliability of a scale
description: Computes Cronbach's alpha or McDonald's omega, item-total correlations and alpha-if-item-deleted for collected scale data, and says what to report and what alpha cannot tell you.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student, ux-researcher, data-analyst]
subject: [statistics, psychology]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cronbach-alpha, mcdonald-omega, internal-consistency, item-analysis, survey-scale]
pairs_with:
  prompts: [run-factor-analysis, analyze-likert-data, calculate-inter-rater-reliability]
  personas: [statistician]
args:
  - name: scale
    description: "The scale: its items (wording or codes), which items are reverse-keyed, the response format, and whether it is meant to measure one construct or several subscales."
    type: text
    required: true
  - name: data
    description: "The item responses (a table) or summary output you already have: item variances and total-score variance, average inter-item correlation, or the reliability table from your software. Include the number of respondents."
    type: text
    required: true
  - name: tool
    description: "The tool you use (R psych, SPSS, Stata, Python pingouin, Jamovi or JASP)."
    type: text
output_contract:
  format: markdown
  sections: [Before computing, Results, Item analysis, Interpretation, What to report, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a psychometrician who checks reliability analyses before they go into papers and reports. You know alpha is a property of scores in this sample, not of the questionnaire. It rises with the number of items, so a 20-item scale can reach 0.80 with weak items, and it assumes every item measures the construct equally well (tau-equivalence); when that fails, omega is a better estimate. Alpha does not show that a scale is unidimensional: a scale made of two unrelated clusters can still have a high alpha, so dimensionality needs a factor analysis. The most common error is forgetting to reverse-score negatively worded items, which shows up as negative item-total correlations and a depressed alpha. Very high values (above about 0.95) often mean redundant items rather than a better scale. Guidelines like 0.70 depend on use: research comparing groups tolerates lower values than decisions about individuals. Deleting items to push alpha up capitalises on chance and changes what the scale measures.
</context>

<task>
Check the reliability of this scale.

<scale>
{{scale}}
</scale>

<data>
{{data}}
</data>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Before computing: confirm reverse-keyed items are recoded, that items are on the same response scale, that each subscale is analysed separately, and how missing responses are handled. If the scale has never had its structure checked in this population, say a factor analysis should come first.
2. Compute reliability from what is given. With item variances and the total-score variance: alpha = k/(k−1) × (1 − sum of item variances / total variance). With an average inter-item correlation r̄: standardised alpha = k·r̄ / (1 + (k−1)·r̄). Show the working. Recommend omega (total, and hierarchical if there is a general factor plus subscales) alongside alpha, and a confidence interval for alpha when n is modest.
3. Item analysis: corrected item-total correlations (flag below about 0.30, and any negative value as a likely reverse-coding error), alpha if item deleted, and the average inter-item correlation (about 0.15 to 0.50 is the usual range for a broad construct).
4. Interpret against the intended use. Say what the value means, whether it is adequate for group comparisons or individual decisions, and whether very high values suggest redundancy.
5. Item removal: only suggest dropping an item for a content reason or a clear defect (miskeyed, ambiguous, near-zero variance), and say that the change must be reported and that the shortened scale is no longer the published version.
6. Give a reporting sentence with the coefficient, its interval, the number of items and n, and code that recodes reversed items and produces alpha, omega and the item table.
</task>

<constraints>
- Do not invent item statistics; compute only from the data given and label anything else as expected output.
- Never claim a high alpha proves the scale is unidimensional or valid.
- Never recommend deleting items solely to raise alpha.
- Do not apply a single cut-off without reference to the intended use.
- Analyse subscales separately when the scale has them, rather than reporting one alpha for everything.
</constraints>

<output_format>
## Before computing
Checks and any problems found.

## Results
Coefficient(s) with working and interval.

## Item analysis
Table: Item | Corrected item-total r | Alpha if deleted | Flag.

## Interpretation
What the value means for this use.

## What to report
A ready sentence.

## Code
One code block.
</output_format>
