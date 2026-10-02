---
schema: 1
id: interpret-regression-output
kind: prompt
title: Interpret regression output
description: Explains regression output in plain language (coefficients, intervals, p-values, fit) and what it does and does not let you conclude. Use when you have a model summary and need to explain it.
category: statistics
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, researcher, student, business-analyst]
subject: [statistics]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [regression, p-values, causal-inference, coefficients]
pairs_with:
  prompts: [check-analysis-for-pitfalls, choose-statistical-test]
args:
  - name: output
    description: The regression summary as printed (statsmodels, R summary, Stata, Excel or similar), including the model formula and the number of observations.
    type: text
    required: true
  - name: research_question
    description: What the model was built to answer, and how the data was collected. Leave empty if you just need the output explained.
    type: text
output_contract:
  format: markdown
  sections: [Bottom line, Model, Coefficients, Fit and diagnostics, What you can conclude, What you cannot conclude, Next checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician explaining a regression to a smart non-specialist. Regression output invites three misreadings: treating coefficients as causal effects, reading "not significant" as "no effect", and reading R-squared as a grade for the model. You translate each number into a sentence in the units of the data, and you are as clear about what the output cannot show as about what it does.
</context>

<task>
Explain this regression output.

<output>
{{output}}
</output>

<research_question>
{{research_question}}
</research_question>

1. Identify the model: type (OLS, logistic, Poisson, mixed, other), outcome and its units, predictors, transformations (logs, standardisation, interactions, dummies and their reference categories), number of observations, and whether standard errors are robust or clustered. If the output is truncated or the model type is unclear, say what you need.
2. Interpret each coefficient that matters for the question in the data's units, holding the other predictors constant:
   - Linear: a one-unit increase in X is associated with a change of b in Y.
   - Log outcome: about 100 × b percent per unit (use exp(b) − 1 when b is large); log predictor: b / 100 units of Y per 1% increase in X.
   - Logistic: odds ratio exp(b); explain odds versus probability, and give a probability change at a typical baseline if possible.
   - Poisson or negative binomial: rate ratio exp(b).
   - Dummies: the difference from the reference category. Interactions: the main effect applies only where the other variable is zero.
3. Explain uncertainty with the confidence interval first, then the p-value in one sentence (how surprising the data would be if the true coefficient were zero). Note where an interval is wide enough to include both trivial and important effects.
4. Interpret fit: R-squared or pseudo R-squared, residual standard error, and what they say about prediction versus explanation. Note visible warnings (multicollinearity, condition number, convergence, separation).
5. State conclusions in two lists: what the output supports, and what it does not. Address causation directly: unless the design was randomised or a credible identification strategy is described, coefficients are associations, and omitted variables, reverse causality and selection could explain them.
</task>

<constraints>
- Do not recompute or invent numbers that are not in the output; when you derive one (an odds ratio from a log-odds coefficient), show the arithmetic.
- Do not call a coefficient "insignificant" or "no effect"; say the data is consistent with zero and with the range in the interval.
- Do not compare the size of coefficients measured in different units as if they were comparable.
- Do not judge the model by R-squared alone.
- Keep the language plain; define any term you must use in a few words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bottom line
Two or three sentences answering the research question as far as the output allows.

## Model
Bullets: type, outcome, predictors and reference categories, n, standard errors.

## Coefficients
A table: term | estimate | plain-language meaning | 95% CI | how sure.

## Fit and diagnostics
Short paragraph, plus any warnings in the output.

## What you can conclude
Bullets.

## What you cannot conclude
Bullets, starting with causation if relevant.

## Next checks
Up to four: residual plots, alternative specifications, variables to add, or a design that would support a causal claim.
</output_format>
