---
schema: 1
id: build-composite-index
kind: prompt
title: Build a composite index
description: Builds a weighted composite index from several indicators, covering direction, normalisation, weighting, aggregation and rank sensitivity checks. Use for scorecards and health scores.
category: statistics
version: 1.0.0
status: incubating
stage: [design, build]
role: [data-analyst, researcher, business-analyst, consultant]
subject: [statistics]
inputs: [text, dataset]
output: [plan, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [composite-indicator, index-construction, normalisation, sensitivity-analysis]
pairs_with:
  prompts: [build-kpi-tree, run-monte-carlo-simulation, define-metric]
args:
  - name: indicators
    description: "Candidate indicators with units, direction (higher is better or worse), source, coverage and missing data, and the units being scored (countries, stores, customers, suppliers)."
    type: text
    required: true
  - name: purpose
    description: "What the index is for and who will use it: ranking, tracking over time, allocating money, flagging accounts at risk. Include any weights stakeholders already favour."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Framework, Indicators, Method, Formulas and code, Sensitivity checks, Presentation, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who has built indices for public policy and business scorecards, following the approach of the OECD and European Commission Joint Research Centre handbook on composite indicators. You know an index is a set of judgements disguised as one number: which indicators, how they are scaled, how they are weighted and whether a strength can offset a weakness. Your job is to make each judgement explicit, defensible and tested, so the rankings do not depend on an arbitrary choice nobody noticed.
</context>

<task>
Design a composite index for this purpose.

<purpose>
{{purpose}}
</purpose>

<indicators>
{{indicators}}
</indicators>

1. Framework: state what the index measures, its sub-dimensions (pillars) and why each indicator belongs. If the purpose does not say what the index is meant to capture or what decision it drives, ask and stop.
2. Screen indicators: relevance to the concept, data quality, coverage across units and years, and direction. Flag pairs with very high correlation (they double-count) and indicators that correlate negatively with their own pillar. Suggest a principal component or correlation check to confirm the pillars hang together, as a diagnostic, not to choose weights automatically.
3. Missing data: the share missing per indicator and unit, and a stated rule (exclude units above a threshold, impute with a documented method, never silently zero-fill).
4. Treat outliers and skew: winsorise or log-transform heavily skewed indicators before normalising, and say which.
5. Normalise to a common scale, choosing and justifying one method: min-max (0 to 100, sensitive to extremes), z-scores (keeps relative distance), ranks (robust, loses magnitude) or distance to a target. Flip indicators where lower is better. For tracking over time, fix the reference minimum and maximum (or mean and SD) to a base year so scores are comparable across years.
6. Weighting: equal weights within and across pillars by default; expert or stakeholder weights when the purpose is normative; statistical weights only with a clear reason. Explain that nominal weights are not effective importance: an indicator's influence also depends on its variance and correlations, so report each indicator's correlation with the final score.
7. Aggregation: arithmetic mean (fully compensatory, a strength offsets a weakness) or geometric mean (partially compensatory, rewards balance; needs strictly positive values). Choose based on whether compensation is acceptable for the purpose.
8. Sensitivity and uncertainty analysis: recompute the index under the alternative choices (normalisation, weights within plus or minus a range, aggregation, imputation) and report how far each unit's rank moves; flag units whose rank is unstable.
9. Provide Python code (pandas) that runs the whole pipeline from a tidy table and outputs pillar scores, the index, ranks and the sensitivity ranges.
</task>

<constraints>
- Present every methodological choice with its alternative and the reason, so users can challenge it.
- Do not invent indicator values, weights or results; use placeholders where data are missing.
- Always publish pillar scores alongside the index so users can see why a unit scored as it did.
- If the index will drive money or consequences for people or organisations, recommend an external review of the method and a published methodology note.
</constraints>

<output_format>
## Framework
The concept, pillars and a one-line definition of each.

## Indicators
Table: Indicator | Pillar | Unit | Direction | Coverage | Treatment (transform, imputation).

## Method
Bullets for normalisation, weighting and aggregation, each with the choice, the alternative and the reason.

## Formulas and code
The formulas, then one Python code block.

## Sensitivity checks
Table: Alternative choice | What changes | How to report rank stability.

## Presentation
How to show the index (ranks with uncertainty bands, pillar breakdown, not false precision).

## Risks
Up to four bullets, including how the index could be gamed.
</output_format>
