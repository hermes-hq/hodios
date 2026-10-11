---
schema: 1
id: analyze-production-defect-data
kind: prompt
title: Analyse production defect and scrap data
description: Analyses inspection, scrap and rework records for defect rates, first-pass yield and cost of poor quality by product, line, shift and supplier, and ranks where to investigate first.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, operate]
role: [operations-manager, manager, data-analyst, business-analyst]
requires: [none]
subject: [engineering]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quality-control, defect-rate, first-pass-yield, scrap, cost-of-poor-quality, manufacturing]
pairs_with:
  prompts: [run-pareto-analysis, build-control-chart, analyze-machine-downtime]
  personas: [data-analyst]
args:
  - name: quality_data
    description: Inspection or quality records with date, product, line or machine, shift, batch or lot, quantity produced and inspected, defects by type, scrap and rework quantities, and material supplier or lot if tracked. Say the period and volume.
    type: text
    required: true
  - name: costs_and_context
    description: Unit cost of scrap and rework, cost of customer returns or complaints, what the defect codes mean, recent changes (new supplier, new operators, tool changes) and the question you want answered.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Quality metrics, Defect Pareto, Stratification, Cost of poor quality, Where to investigate, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a quality engineer analysing defect data. Totals hide the signal: a defect rate that looks stable can mix one line getting worse with another improving, or one supplier lot causing most of a month's scrap. The core tools are rates (never raw counts, because volume differs), first-pass yield (good units the first time, without rework, which shows hidden factory work that final yield hides), a Pareto of defect types by count and by cost, and stratification by line, shift, product, supplier lot and time. Inspection itself varies: a new inspector or a changed gauge can create an apparent spike, so a change in detection should be ruled out before a change in process is assumed.
</context>

<task>
Analyse this quality data.

<quality_data>
{{quality_data}}
</quality_data>

{{#costs_and_context}}Costs and context: {{costs_and_context}}{{/costs_and_context}}

1. Data checks: produced versus inspected quantities (sampling or 100% inspection), defects counted per unit or per defect (one unit can have several), rework later scrapped (avoid double-counting), inconsistent defect codes across shifts, and dates of inspection versus production.
2. Quality metrics by week or month: defect rate (defective units over inspected units) or defects per million opportunities if defects are counted per opportunity, scrap rate, rework rate, first-pass yield and final yield. Trend each.
3. Defect Pareto: defect types ranked by count and, separately, by cost; note where they differ.
4. Stratification: rates by line or machine, shift, product, supplier and material lot, operator crew and before and after recent changes. Mark groups with too few units to trust and use a simple test or confidence interval for the main differences.
5. Cost of poor quality: scrap, rework labour, and customer returns or complaints where data exists, with unit costs stated.
6. Where to investigate: the top three to five problem areas ranked by cost and trend, each with what the data points to (for example a supplier lot, a line after a tool change, a shift with different inspection) and a suggested investigation method (5 whys, fishbone, measurement system check, controlled trial). Suggest a control chart for any key rate going forward.
</task>

<constraints>
- Distinguish association from root cause; the data shows where to look, not why defects happen.
- Do not invent defect codes, costs or volumes; label any assumed unit cost and show its effect.
- Before blaming a supplier, operator or shift, check whether detection or inspection changed; frame findings about people as process questions.
- Product safety defects (that could harm a user) take priority over cost ranking; flag them and say they may need containment and, where relevant, regulatory reporting under the user's local rules.
</constraints>

<output_format>
## Headline
Current defect rate and first-pass yield, the trend, the cost of poor quality and the top area to investigate.

## Data checks
Bullets.

## Quality metrics
Table: Period | Inspected | Defect rate | Scrap rate | Rework rate | First-pass yield.

## Defect Pareto
Table: Defect type | Count | Share | Cost | Cost share.

## Stratification
Tables by line, shift, product and supplier lot, with confidence notes.

## Cost of poor quality
Table with unit cost assumptions.

## Where to investigate
Numbered: area, evidence, investigation method, owner.

## Assumptions
Bullets.
</output_format>
