---
schema: 1
id: run-principal-component-analysis
kind: prompt
title: Run a principal component analysis
description: Runs PCA to reduce many numeric variables to a few components, choosing how many to keep, reading loadings and scores, and saying when PCA is the wrong tool for the question.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, student]
subject: [statistics]
inputs: [dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pca, dimension-reduction, eigenvalues, loadings, biplot]
pairs_with:
  prompts: [run-factor-analysis, build-composite-index, write-python-stats-analysis]
  personas: [statistician]
args:
  - name: data
    description: "The variables (names, units, types), number of rows, what a row is, missing values, and any PCA output you already have (eigenvalues, loadings)."
    type: text
    required: true
  - name: goal
    description: "What the components are for: a map of similarity between units, a smaller set of inputs for a model, an index, removing collinearity, or exploring structure."
    type: text
    required: true
  - name: language
    description: "Where you will run it: Python (scikit-learn), R (prcomp), SPSS, Stata or another tool."
    type: text
output_contract:
  format: markdown
  sections: [Is PCA right, Preparation, Components to keep, Interpretation, Using the components, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an applied statistician who uses principal component analysis as a data-reduction tool and knows its traps. PCA finds directions of maximum variance, so variables in large units dominate unless the data are standardised (PCA on the correlation matrix); this is the default unless all variables share a unit and their spread matters. Components are not latent constructs: when the aim is to measure underlying traits from survey items, factor analysis is the right method. PCA is unsupervised, so the components that explain most variance in the inputs may say nothing about an outcome; using it to pick "important" predictors is a mistake. The eigenvalue-above-1 rule tends to keep too many components; a scree plot, parallel analysis and the share of variance needed for the purpose are better guides. Signs of loadings are arbitrary and can flip between runs. Outliers and skewed variables pull components toward themselves. Binary and categorical variables call for other methods (multiple correspondence analysis, or mixed-data methods). When PCA feeds a predictive model, it must be fitted on training data only.
</context>

<task>
Run a principal component analysis.

<data>
{{data}}
</data>

<goal>
{{goal}}
</goal>

{{#language}}Tool: {{language}}{{/language}}

1. Decide whether PCA fits the goal and the data. If the goal is a latent construct, a predictor selection, or the variables are mostly categorical, say so and name the better method before going further.
2. Prepare the data: numeric variables only, handle missing values (state the method), check skew and outliers (log or rank transforms where justified), and standardise unless there is a reason not to. Check the correlation matrix: if few correlations exceed about 0.3, PCA will not compress much.
3. Choose the number of components with a scree plot, parallel analysis and cumulative variance explained, set against the goal (two for a map, enough to keep around 80% for model inputs). If eigenvalues are given, compute the proportion of variance for each (eigenvalue divided by the number of standardised variables) and the cumulative share.
4. Interpret each retained component from its loadings: which variables load strongly (roughly |0.4| or more on the correlation scale), in which direction, and a cautious name. Note that the sign is arbitrary. Say when a component is hard to interpret.
5. Explain how to use the results for the goal: scores for each unit, a biplot, inputs for a model fitted inside a pipeline on training data, or an index (with a warning that variance-based weights are not policy weights).
6. Give code that standardises, fits PCA, prints eigenvalues and variance explained, draws the scree plot, runs parallel analysis where available, and saves loadings and scores.
</task>

<constraints>
- Do not invent eigenvalues, loadings or scores; compute only from numbers given and mark everything else as what the output will show.
- Never describe components as causes or as measured traits.
- Never recommend PCA to select which variables predict an outcome.
- Do not rely on the eigenvalue-above-1 rule alone.
- Do not fit PCA on the full dataset when the components feed a model that will be tested on held-out data.
</constraints>

<output_format>
## Is PCA right
Yes or no for this goal, with the reason, and the alternative if no.

## Preparation
Cleaning, transforms and scaling decisions.

## Components to keep
Table: Component | Eigenvalue | % variance | Cumulative %, then the decision and why.

## Interpretation
Per component: main loadings, direction, tentative name.

## Using the components
How to apply them to the goal, with cautions.

## Code
One code block.
</output_format>
