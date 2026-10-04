---
schema: 1
id: calculate-measurement-uncertainty
kind: prompt
title: Build a measurement uncertainty budget
description: Builds a measurement uncertainty budget for a lab or calibration measurement with sources, distributions, sensitivity coefficients, combined and expanded uncertainty, showing all the maths for review.
category: statistics
version: 1.0.0
status: incubating
stage: [verify, build]
role: [researcher, operations-manager]
subject: [statistics, physics]
requires: [none]
inputs: [text, dataset]
output: [table, explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [measurement-uncertainty, gum, uncertainty-budget, calibration, metrology, iso-17025]
pairs_with:
  prompts: [build-control-chart, calculate-solution-dilutions, plan-acceptance-sampling]
  personas: [statistician, lab-manager]
args:
  - name: measurement
    description: The measurand and how the result is obtained - the measurement equation if there is one, the instrument, the procedure, the typical value and units, for example "density = mass / volume, mass on an analytical balance, volume by a 25 ml pipette".
    type: text
    required: true
  - name: sources
    description: Known sources of uncertainty with their values - repeated readings or their standard deviation and count, calibration certificate values with coverage factor, resolution, temperature effects, reference material uncertainty, drift.
    type: text
    required: true
  - name: coverage
    description: Coverage factor k for the expanded uncertainty (2 gives roughly 95% coverage when degrees of freedom are large).
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Measurand and model, Uncertainty budget, Combined and expanded uncertainty, Reported result, Checks and dominant contributors, Assumptions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An uncertainty budget following the GUM approach (the Guide to the Expression of Uncertainty in Measurement) is a transparent chain: define the measurand and the model equation, evaluate each input's standard uncertainty (Type A from repeated observations, Type B from certificates, specifications, resolution or judgement), convert each to the same units through its sensitivity coefficient, combine them in quadrature (adding correlation terms where inputs are correlated), and expand by a coverage factor. Typical errors: using a certificate's expanded uncertainty as if it were a standard uncertainty, dividing a full resolution step instead of a half-width by the root of three, counting repeatability twice, leaving out the reference standard, mixing units, and reporting the result with more digits than the uncertainty justifies. Accredited labs must also meet their accreditation body's policy, which the lab's quality manager owns.
</context>

<task>
Build the uncertainty budget for this measurement.

<measurement>
{{measurement}}
</measurement>

<sources>
{{sources}}
</sources>

Coverage factor: k = {{coverage}}.

1. Measurand and model: define the measurand precisely (including conditions such as temperature) and write the model equation y = f(x1, x2, ...). If there is no equation, treat the result as the reading plus correction terms, each with an expected value of zero and its own uncertainty.
2. For each input, evaluate the standard uncertainty and show the working:
   - Type A: standard deviation of the readings divided by the square root of the number of readings when the result is their mean; degrees of freedom n - 1.
   - Calibration certificate: expanded uncertainty divided by its stated coverage factor.
   - Resolution or a stated tolerance of plus or minus a: a divided by the square root of 3 (rectangular), a divided by the square root of 6 (triangular) or a divided by the square root of 2 (U-shaped), choosing the distribution with a reason. For digital resolution, a is half the last digit.
   - Other Type B sources (temperature, drift, reference material) with the assumed distribution.
3. Sensitivity coefficients: the partial derivative of f with respect to each input, evaluated at the input values, with units; or use relative uncertainties for purely multiplicative models and say so.
4. Combine: u_c(y) as the square root of the sum of (c_i u_i) squared, adding correlation terms if inputs share a source (for example the same reference used twice), and state whether correlations were assumed zero.
5. Degrees of freedom: if a Type A component with few readings dominates, compute effective degrees of freedom with the Welch-Satterthwaite formula and say whether k = {{coverage}} still gives the intended coverage or a larger factor from the t-distribution is needed.
6. Expanded uncertainty: U = k u_c(y), and the reported result: value with U, rounded so U has at most two significant figures and the value to the same decimal place, with the coverage statement.
7. Checks: list each component's share of the combined variance, name the dominant contributors and what would reduce them, and check for double counting (for example repeatability already including resolution effects), consistent units and plausibility against the instrument's specification.
8. Before you answer, recompute every number in the budget table and confirm the final expanded uncertainty matches it.
</task>

<constraints>
- Show every formula and intermediate value; the user will review the maths.
- Do not invent values for sources the user did not give; list possibly missing sources (for example temperature, reference standard, operator) as questions with the information needed.
- State the coverage probability as approximate unless the distribution and degrees of freedom justify it.
- If the measurand or the main inputs are too vague to build a model, ask for them and stop.
- End with one line noting that the lab's quality manager should review the budget against the accreditation body's requirements where these apply.
</constraints>

<output_format>
## Measurand and model
Definition and equation.
## Uncertainty budget
Table: Source | Type | Value and units | Distribution | Divisor | Standard uncertainty u_i | Sensitivity c_i | c_i u_i | Degrees of freedom | Share of variance.
## Combined and expanded uncertainty
The working, step by step.
## Reported result
One line, for example "y = 10.42 g, U = 0.22 g (k = 2, approximately 95% coverage)".
## Checks and dominant contributors
Bullets.
## Assumptions to confirm
Bullets, then the review line.
</output_format>
