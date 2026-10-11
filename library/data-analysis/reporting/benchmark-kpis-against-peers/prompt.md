---
schema: 1
id: benchmark-kpis-against-peers
kind: prompt
title: Benchmark KPIs against peers
description: Compares an organisation's KPIs with industry or peer benchmarks after checking definitions, sample, period and survivorship, and reports gaps that are real rather than artefacts.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, business-analyst, executive, founder]
inputs: [dataset, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [benchmarking, peer-comparison, comparability, industry-data]
pairs_with:
  prompts: [define-metric, build-metrics-glossary, write-insight-report]
args:
  - name: our_kpis
    description: "Our KPI values with their exact definitions, period, and the size and type of the organisation (sector, country, revenue band, business model)."
    type: text
    required: true
  - name: benchmarks
    description: "The benchmark figures with their source, what they measure, the sample (how many and which organisations), the period and how they were collected (survey, public filings, vendor data)."
    type: text
    required: true
  - name: question
    description: What the comparison is for, for example a board question, target setting or choosing where to improve. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Comparability check, Comparison, Gaps worth acting on, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Benchmarks are quoted with more confidence than they deserve. Analysts who use them well check comparability before reading the gap: the same name often hides a different definition (churn by logo or by revenue, monthly or annual; "conversion" from visit or from session), the benchmark sample may be small, self-selected (the companies proud enough to answer a vendor survey) or survivorship-biased, the period may predate a market shift, and a median from a mix of sizes and models says little about one firm. A gap within the benchmark's own spread is often not a gap at all; the useful comparison is against the quartile range of a well-matched peer set. The output should separate gaps that survive these checks from gaps that are artefacts of definition or sample.

{{#question}}Purpose: {{question}}{{/question}}
</context>

<task>
<our_kpis>
{{our_kpis}}
</our_kpis>

<benchmarks>
{{benchmarks}}
</benchmarks>

1. Comparability check, KPI by KPI: definition match (numerator, denominator, time basis), population match (size, sector, model, geography), period match, sample size and selection, statistic reported (mean, median, quartiles). Rate each comparison as comparable, comparable after adjustment, or not comparable.
2. Where an adjustment is possible from the data supplied (for example converting monthly churn to annual, or restating our KPI on the benchmark's definition), make it and show the arithmetic.
3. Compare our value with the benchmark's central figure and, where given, its spread. Place us in a quartile or say it cannot be done.
4. Judge which gaps are real and material: outside the benchmark's spread, on a comparable definition, and large enough to matter for the purpose.
5. For real gaps, name the likely drivers to investigate internally (not causes to assert) and what better benchmark data would settle the question.
</task>

<constraints>
- Use only benchmark figures supplied; never quote industry averages from memory as if they were data.
- Do not present a gap as meaningful when definitions or populations do not match; say "not comparable" plainly.
- Mean and median are not interchangeable; flag when the benchmark reports a mean of a skewed metric.
- Keep the source of every benchmark number next to it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: where we are clearly ahead, clearly behind, and where the benchmark cannot tell us.

## Comparability check
Table: KPI | Definition match | Population match | Period | Sample | Verdict.

## Comparison
Table: KPI | Ours (restated if adjusted) | Benchmark central | Spread | Position | Source.

## Gaps worth acting on
Numbered list with the gap, why it is real, and what to investigate.

## Caveats
Bullets, including better benchmark sources to look for.
</output_format>
