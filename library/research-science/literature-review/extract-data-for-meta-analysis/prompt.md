---
schema: 1
id: extract-data-for-meta-analysis
kind: prompt
title: Extract effect-size data for a meta-analysis
description: Builds a data-extraction form and extracts effect-size inputs from study reports with their locations, logging every conversion and flagging missing statistics. For meta-analysis teams.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [meta-analysis, data-extraction, effect-size, evidence-synthesis, systematic-review]
pairs_with:
  prompts: [plan-meta-analysis, appraise-study-quality, build-literature-matrix, write-systematic-review-protocol]
  personas: [statistician]
args:
  - name: study_texts
    description: The methods and results text of each included study (tables pasted as text), separated and labelled with a study ID such as "Smith 2021".
    type: text
    required: true
  - name: outcome
    description: The outcome to extract, with the preferred measure and time point, for example "depressive symptoms at end of treatment, continuous" or "30-day mortality, events".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Extraction form, Extracted data, Conversions log, Missing or unclear, Effect sizes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Extraction errors are common in meta-analyses and often go unnoticed: a standard error copied as a standard deviation, a change score mixed with a final value, the wrong time point, a per-protocol number used where intention-to-treat was planned, or a cluster trial treated as individually randomised. Good practice is a piloted form, duplicate extraction, a recorded source location for every number, and an explicit log of every derived value and the formula used, so a second extractor and the reader can check it. Missing statistics are requested from authors or handled by a pre-specified method, never filled in by guesswork.
</context>

<task>
Extract data for the outcome "{{outcome}}" from these studies.
<studies>
{{study_texts}}
</studies>

1. Build the extraction form for this outcome: study identifiers, design and unit of randomisation, population, arms and their definitions, time point, analysis population (ITT or per protocol), measure and direction (whether higher is better), and the statistics needed for the outcome type (continuous: n, mean, SD per arm or a between-group difference with its CI or SE; binary: events and n per arm; time-to-event: HR with CI), plus adjusted or unadjusted, and notes.
2. Extract every field for each study, quoting the location (section, table or figure) for each number. Use "not reported" when absent. When several candidates exist (time points, scales, analysis sets), list them and say which matches the outcome definition and why.
3. Where the needed statistic is not reported directly but can be derived, derive it and log it: SD from SE (SD = SE × √n), SD from a 95% CI of a mean (for large samples, SD = √n × (upper − lower) / 3.92, using the t distribution for small samples), SE of a difference from its CI or from an exact p value and test statistic, and standardised mean differences from t or F for two groups. For medians with IQR or range, flag skew, name the estimation method if one is used, and recommend a sensitivity analysis excluding the estimated values.
4. Flag unit-of-analysis issues: cluster designs (needs the ICC or a design effect), crossover trials, multi-arm trials sharing a control group, and multiple outcomes from the same participants.
5. Where inputs are complete, compute the effect size the user's outcome implies (for example Hedges' g with its variance, mean difference, log odds ratio or log risk ratio) and show the inputs. Mark these as needing verification in statistical software.
</task>

<constraints>
- Never estimate, impute or "approximately read" a number that the text does not give or that cannot be derived exactly from given numbers. Graph-only data are marked "figure only; digitise with a plot-digitising tool and record it".
- A p value reported as "p < 0.05" cannot be used to derive a statistic; say so.
- Keep the direction of effect consistent across studies and record when a scale had to be reversed.
- Show every calculation with its inputs so a second extractor can check it.
- If a study's text is too partial to extract from, say what is missing rather than extracting from the abstract alone without saying so.
</constraints>

<output_format>
## Extraction form
A table: field | definition | allowed values.
## Extracted data
One table per outcome: study | design | arm | n | statistic(s) | time point | analysis set | location.
## Conversions log
Numbered: study | derived value | formula | inputs | result.
## Missing or unclear
Per study: what is missing, whether to contact authors, and the exact request to send.
## Effect sizes
A table of computed effects with variance or CI, or "not computable" with the reason.
</output_format>
