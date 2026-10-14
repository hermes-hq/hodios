---
schema: 1
id: plan-network-meta-analysis
kind: prompt
title: Plan a network meta-analysis
description: Plans a network meta-analysis comparing several treatments, checking transitivity, network geometry, consistency, model choice, ranking with its caveats and CINeMA certainty. For review teams.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, data-scientist]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [network-meta-analysis, indirect-comparison, transitivity, cinema, evidence-synthesis]
subject: [statistics, medicine]
pairs_with:
  prompts: [plan-meta-analysis, extract-data-for-meta-analysis, write-systematic-review-protocol, write-summary-of-findings-table]
  personas: [statistician, research-methodologist]
args:
  - name: question
    description: The population, the set of competing treatments (including comparators such as placebo or usual care) and the outcomes.
    type: text
    required: true
  - name: evidence
    description: Optional. What you know about the trials, such as which comparisons exist and how many trials each, sample sizes, effect modifiers, outcome measures.
    type: text
output_contract:
  format: markdown
  sections: [Is NMA appropriate, Network and nodes, Transitivity, Model and estimation, Consistency and heterogeneity, Ranking and certainty, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Network meta-analysis (NMA) combines direct and indirect evidence to compare several treatments at once, including pairs never compared head to head. Its validity rests on transitivity: the trials for different comparisons must be similar enough in effect modifiers (severity, dose, background therapy, era, outcome definition) that the treatments could in principle have been randomised together. Inconsistency is the statistical sign of a transitivity problem, tested locally (node-splitting, loop-specific) and globally (design-by-treatment interaction), but tests are underpowered, so judgement about effect modifiers comes first. Experienced analysts define nodes carefully (lumping or splitting doses and classes), inspect network geometry (sparse or star-shaped networks rely heavily on indirect evidence), choose frequentist or Bayesian models with a shared heterogeneity variance and sensible priors, report league tables with credible or confidence intervals, and treat rankings (SUCRA, P-scores, probability of being best) as secondary because they hide uncertainty and differences that are not important. Certainty is rated with CINeMA or the GRADE approach for NMA, and reporting follows PRISMA-NMA.
</context>

<task>
Plan a network meta-analysis for:
<question>
{{question}}
</question>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Decide whether NMA is appropriate: enough connected evidence, a decision that needs a comparison of several treatments, plausible transitivity. If not, recommend pairwise meta-analyses or a narrative comparison.
2. Define the nodes (treatments, doses, classes), with the lumping and splitting rules and reasons, and describe the expected network geometry; flag disconnected parts and comparisons informed only indirectly.
3. List the likely effect modifiers and how transitivity will be assessed: tabulate them by comparison, decide on exclusion or adjustment (network meta-regression) in advance.
4. Choose the model: effect measure, frequentist or Bayesian, random effects with a common heterogeneity variance, prior choices if Bayesian, handling of multi-arm trials, and software options to confirm.
5. Plan inconsistency checks (global and local), what you will do if inconsistency is found, and heterogeneity reporting with prediction intervals.
6. Plan outputs and certainty: network plot, league table, forest plot against a common comparator, rankings reported with their uncertainty and with a caution, and CINeMA domains (within-study bias, reporting bias, indirectness, imprecision, heterogeneity, incoherence).
7. Plan sensitivity analyses and reporting (PRISMA-NMA, protocol registration).
</task>

<constraints>
- Do not invent effect estimates or rankings; with no results supplied, describe the outputs only.
- Never present a ranking as the main result or say a treatment is best without the effect sizes and certainty behind it.
- Treat a non-significant inconsistency test as weak reassurance, not proof of consistency.
- Advise involving a statistician experienced in NMA when the user's team has none.
</constraints>

<output_format>
## Is NMA appropriate
Recommendation and reasons.
## Network and nodes
Node definitions and a text sketch of the network.
## Transitivity
A table: effect modifier | why it matters | how assessed | action if imbalanced.
## Model and estimation
Bullets.
## Consistency and heterogeneity
Checks and pre-specified responses.
## Ranking and certainty
Output list, ranking caveats and CINeMA plan.
## Reporting
Sensitivity analyses, PRISMA-NMA and registration.
</output_format>
