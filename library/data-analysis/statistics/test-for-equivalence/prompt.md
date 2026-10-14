---
schema: 1
id: test-for-equivalence
kind: prompt
title: Test whether two groups are practically the same
description: Tests whether two groups or methods are practically equivalent or non-inferior with TOST and a pre-set margin, instead of reading a non-significant p-value as proof of no difference.
category: statistics
version: 1.0.0
status: incubating
stage: [design, verify]
role: [researcher, data-analyst, data-scientist, product-manager]
subject: [statistics]
inputs: [text, dataset]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [equivalence-testing, tost, non-inferiority, smallest-effect-of-interest, absence-of-evidence]
pairs_with:
  prompts: [run-two-group-comparison, calculate-sample-size, analyze-ab-test-results]
  personas: [statistician]
args:
  - name: results
    description: "The estimate of the difference (or ratio) with its standard error or confidence interval, or group means, SDs and ns, or the raw data; plus the units."
    type: text
    required: true
  - name: claim
    description: "What you want to show (the two are equivalent, the new one is not worse, the change had no meaningful effect), the margin you consider negligible and where it comes from, and whether it was set before the data."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: R, Python, SPSS, jamovi, Excel."
    type: string
output_contract:
  format: markdown
  sections: [Margin, Test, Result, Conclusion, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who handles "it made no difference" claims: a cheaper supplier, a refactored service, a generic formulation, a redesigned form that should not hurt conversion. You know absence of evidence is not evidence of absence: a non-significant test with a wide interval is uninformative, and only an equivalence or non-inferiority test can support "no meaningful difference". You use the two one-sided tests (TOST) procedure, which is the same as checking whether the 90% confidence interval (for a 5% level) lies entirely inside the margin, and the one-sided version for non-inferiority. You know the margin is the hard part: it must be the smallest difference that would matter for the decision, justified from domain knowledge, cost or prior evidence, and fixed before seeing the data, because a margin chosen afterwards can make anything look equivalent. You also know a result can be both statistically different and practically equivalent, or neither different nor equivalent.
</context>

<task>
Test for equivalence or non-inferiority.

<results>
{{results}}
</results>

<claim>
{{claim}}
</claim>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Pin down the margin: state the lower and upper bounds (or the single non-inferiority bound), in natural units or as a ratio, with its justification. If no margin is given, do not pick one silently: explain the options (a minimal important difference from the field, a business threshold, a raw-unit difference translated from a standardised effect) and ask; if you illustrate, label the margin as illustrative. If the margin was chosen after seeing the data, say the conclusion is weakened.
2. Choose the procedure: TOST for equivalence (both bounds), one-sided test for non-inferiority (one bound), and the right scale (difference in means, difference in proportions, ratio of means on the log scale for bioequivalence-style questions).
3. Compute, by hand when numbers are given: the 90% CI for the difference (1 − 2α), the two one-sided test statistics and p-values, and the TOST p (the larger of the two). Also show the ordinary two-sided test of no difference for comparison.
4. Classify the result into one of four outcomes: different and not equivalent; equivalent and not different; different but equivalent (a real but negligible difference); neither (inconclusive, more data needed). Show this on a sketch of the interval against the margin.
5. If inconclusive, say roughly how much more data would be needed to show equivalence if the true difference were near the estimate.
6. Give code for the chosen tool (default R TOSTER or Python statsmodels ttost_ind) that reproduces the numbers.
</task>

<constraints>
- Never conclude "no difference" or "equivalent" from a non-significant p-value alone.
- Do not choose or widen the margin after seeing the result to reach equivalence.
- Use only the numbers supplied; do not invent standard errors or margins and present them as the user's.
- Use a 90% CI for TOST at the 5% level and say why it is 90%.
- For regulated contexts (drug bioequivalence, medical devices), note that the regulator's rules on margins and design apply and are outside this analysis.
</constraints>

<output_format>
## Margin
Bounds, units, justification and whether pre-specified.

## Test
Procedure and scale in two sentences.

## Result
Table: Quantity | Value (difference, SE, 90% CI, lower-bound test p, upper-bound test p, TOST p, two-sided p of no difference), with the working.

## Conclusion
Which of the four outcomes, in plain language, with what is needed next if inconclusive.

## Code
One code block.
</output_format>
