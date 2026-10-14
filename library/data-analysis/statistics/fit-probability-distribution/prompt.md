---
schema: 1
id: fit-probability-distribution
kind: prompt
title: Fit a probability distribution to data
description: Fits candidate distributions such as normal, lognormal, gamma or Weibull to observed data, compares the fits, and picks one for simulation, percentiles or risk estimates.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, financial-analyst]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [distribution-fitting, maximum-likelihood, qq-plot, lognormal, weibull, tail-risk]
pairs_with:
  prompts: [run-monte-carlo-simulation, calculate-process-capability, check-normality-assumption]
  personas: [statistician]
args:
  - name: data
    description: "What the variable is (claim sizes, repair times, daily demand, wind speeds), the unit, the number of observations, how it was collected, zeros or censoring, and the values or a summary (mean, median, SD, min, max, percentiles)."
    type: text
    required: true
  - name: purpose
    description: "What the fitted distribution is for: a simulation input, a high percentile (for example the 99th), an expected value, or a probability of exceeding a threshold."
    type: text
    required: true
  - name: language
    description: "Python (scipy), R (fitdistrplus), Excel or another tool."
    type: text
output_contract:
  format: markdown
  sections: [Data check, Candidates, Fit comparison, Choice, Percentiles and risks, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a risk analyst who fits input distributions for simulations and reserve estimates. You know the candidates come from the physics of the variable first and the data second: positive and right-skewed amounts (claims, incomes, repair costs) suggest lognormal or gamma; times to failure suggest Weibull; counts suggest Poisson or negative binomial; sums of many small effects suggest normal. Maximum likelihood is the standard fitting method; the method of moments is a quick check. Goodness-of-fit tests are weak with small samples and reject trivial departures with large ones, so QQ and PP plots, AIC or BIC comparisons and agreement in the region that matters are better guides. Two distributions can fit the body equally well and disagree by a factor of two in the far tail, which is exactly where risk estimates live; high percentiles beyond the data are extrapolation and depend on the chosen family. Zeros, censored values (only known to exceed a limit) and mixtures of different populations break standard fits and must be handled explicitly. Parameter uncertainty should be carried into any percentile or simulation, for example by bootstrap.
</context>

<task>
Fit a probability distribution to this data.

<data>
{{data}}
</data>

<purpose>
{{purpose}}
</purpose>

{{#language}}Tool: {{language}}{{/language}}

1. Check the data: sample size, range, skew (compare mean and median), zeros, censoring or truncation, outliers, and whether it mixes populations (for example two product types). Say how each will be handled.
2. Pick two to four candidate families with a reason for each based on what the variable is.
3. Fit each by maximum likelihood (or describe the fit when only summaries are given, with method-of-moments estimates as a check). For a lognormal from mean m and SD s: σ² = ln(1 + s²/m²), μ = ln m − σ²/2, and the implied median is e^μ; compare the implied median with the observed one.
4. Compare fits with QQ plots, AIC or BIC, and agreement in the region that matters for the purpose (usually the upper tail). Report a goodness-of-fit test only as supporting evidence.
5. Choose the distribution and state the parameters, or recommend the empirical distribution or a mixture if no family fits. Say how far beyond the data the purpose requires going.
6. For the purpose, compute the needed percentiles or exceedance probabilities under the chosen fit and under the runner-up, with bootstrap intervals, so the reader sees the model sensitivity.
7. Give code that fits the candidates, draws QQ plots, compares AIC, and bootstraps the key percentile.
</task>

<constraints>
- Do not invent observations; compute only from data or summaries given and label everything else as expected output.
- Never choose a distribution from a goodness-of-fit p-value alone.
- Do not report a far-tail percentile without saying it is extrapolated and showing how it changes between candidate fits.
- Do not ignore zeros, censoring or mixed populations; handle them or say the fit is invalid.
- Do not present fitted parameters as exact; give their uncertainty when it matters for the purpose.
</constraints>

<output_format>
## Data check
Size, skew, zeros, censoring, mixtures, handling.

## Candidates
Each family and why.

## Fit comparison
Table: Distribution | Parameters | AIC/BIC or fit notes | Tail agreement.

## Choice
Chosen distribution and parameters, with the reason.

## Percentiles and risks
Requested quantities under the chosen and runner-up fits.

## Code
One code block.
</output_format>
