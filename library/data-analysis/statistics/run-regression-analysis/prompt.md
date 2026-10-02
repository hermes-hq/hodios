---
schema: 1
id: run-regression-analysis
kind: prompt
title: Run a regression analysis
description: Builds a regression analysis for a question, covering model choice, variables, diagnostics, interpretation and limits, with runnable code in Python, R or Excel. Use as an analyst or student.
category: statistics
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, data-scientist, student, researcher]
subject: [statistics]
inputs: [dataset, text]
output: [code, explanation, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regression, model-diagnostics, linear-models, glm]
pairs_with:
  prompts: [interpret-regression-output, choose-statistical-test, estimate-causal-effect]
  personas: [statistician]
args:
  - name: question
    description: The question the regression should answer, and whether the goal is to explain a relationship, estimate the effect of one variable, or predict an outcome.
    type: text
    required: true
  - name: data_description
    description: The dataset (columns with types and units, number of rows, how it was collected, missing values, whether rows are grouped such as repeated measures or users within accounts), or a sample.
    type: text
    required: true
  - name: tool
    description: Where the analysis will be run.
    type: enum
    enum: [python, r, excel]
    default: python
output_contract:
  format: markdown
  sections: [Question and goal, Model choice, Variables, Code, Diagnostics, How to interpret, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an applied statistician who builds regressions that answer the question asked and survive review. You choose the model from the outcome type and the data's structure, choose variables from subject knowledge rather than automated stepwise selection, check diagnostics before interpreting anything, and keep three goals apart: describing an association, estimating the effect of one variable, and predicting well. Each goal needs different choices.
</context>

<task>
Build a regression analysis in {{tool}} for this question.

<question>
{{question}}
</question>

<data_description>
{{data_description}}
</data_description>

1. Restate the goal: association, effect of a specific variable (and note that observational data only supports a causal reading under strong assumptions), or prediction. If the outcome variable or the goal is unclear, ask up to three questions and stop.
2. Choose the model from the outcome type and structure, and say why:
   - Continuous outcome: linear regression (OLS), with a log transform if the outcome is positive and right-skewed and effects are multiplicative.
   - Binary outcome: logistic regression. Counts: Poisson, or negative binomial if overdispersed, with an exposure offset where relevant. Ordered categories: ordinal logistic. Time to event: Cox regression.
   - Grouped or repeated observations: mixed-effects models or cluster-robust standard errors.
3. Choose variables: the outcome, the predictor of interest, and covariates justified by subject knowledge. For effect estimation, include confounders and exclude mediators and colliders, and explain each choice. For prediction, plan for held-out validation instead. Handle categorical variables (reference level), non-linearity (splines or polynomials when plausible), and interactions only when hypothesised in advance.
4. Write complete, runnable code for {{tool}}: load data, prepare variables, fit the model, and print a summary. In Python use pandas and statsmodels' formula API (or scikit-learn only for prediction); in R use `lm`, `glm` or `lme4`; in Excel use `LINEST` or the Analysis ToolPak, and state what Excel cannot do (logistic regression, robust standard errors, mixed models) so the user can choose another tool.
5. Diagnostics, with code: residuals versus fitted, a Q-Q plot, heteroskedasticity (use robust standard errors if present), multicollinearity (variance inflation factors), influential points (Cook's distance), and for logistic models separation and calibration. Say what each looks like when it is fine and what to do when it is not.
6. Explain how to interpret the output for this model in the units of the question (for example "each extra year of tenure is associated with a 3.2% higher salary, holding role and region constant"), including how to interpret log transforms, odds ratios and interactions, and to report confidence intervals before p-values.
7. List the limits: sample size relative to the number of parameters (as a rough guide at least 10 to 20 observations, or events for logistic models, per parameter), missing data handling, extrapolation outside the data range, and what the model cannot tell us.
</task>

<constraints>
- Do not report coefficients, p-values or fit statistics unless you computed them from the user's data. With only a description, provide code and an interpretation template.
- Do not use automated stepwise selection for inference, and say why if the user asks for it.
- Do not use causal language for coefficients unless the goal is effect estimation and the assumptions are stated.
- Keep code self-contained with assumed column names marked as comments.
</constraints>

<output_format>
## Question and goal
## Model choice
## Variables
A table: variable | role (outcome, predictor of interest, confounder, control, excluded) | type | transformation | reason.
## Code
## Diagnostics
A table: check | how to run it | what good looks like | what to do if it fails.
## How to interpret
## Limits
</output_format>
