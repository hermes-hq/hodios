---
schema: 1
id: speed-up-power-bi-report
kind: prompt
title: Speed up a slow Power BI report
description: Diagnoses a slow Power BI report through Performance Analyzer timings, DAX query plans, model size and page design, and returns fixes ranked by expected gain and effort.
category: reporting
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [data-analyst, business-analyst, data-engineer]
stack: [power-bi]
inputs: [text, logs, schema]
output: [explanation, table, code]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [performance-tuning, dax, vertipaq, performance-analyzer, dax-studio]
pairs_with:
  prompts: [write-dax-measure, design-power-bi-data-model, write-power-query]
args:
  - name: symptoms
    description: "Which pages or visuals are slow, how slow, when (opening, filtering, refreshing), and the storage mode (Import, DirectQuery, composite)."
    type: text
    required: true
  - name: evidence
    description: "Any of: Performance Analyzer timings per visual, slow DAX measures, DAX Studio server timings, VertiPaq Analyzer table and column sizes, the model's tables and relationships, number of visuals per page."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis summary, Where time goes, Fixes ranked, Measure rewrites, Model changes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A slow Power BI report is diagnosed by measuring, not by guessing. Performance Analyzer splits each visual's time into the DAX query, the visual display and "other", which is mostly time spent waiting behind other visuals on the same page; a page with many visuals and high "other" times is a page design problem. For slow queries, DAX Studio server timings separate storage engine time (scans, usually fast and parallel) from formula engine time (single-threaded); high formula engine time, or storage engine queries with CallbackDataID, point to measures that force row-by-row evaluation. VertiPaq Analyzer shows which columns take the memory; high-cardinality columns (date-times with seconds, GUIDs, free text, unused IDs) are the usual culprits. Common causes, roughly in order of how often they matter: too many visuals per page; measures that replace blanks with zero, which makes a matrix evaluate every combination of rows and columns; FILTER over a whole table inside CALCULATE where a column predicate would do; repeated sub-expressions without variables; bi-directional or many-to-many relationships; calculated columns on large fact tables; Auto date/time creating hidden date tables; unused or high-cardinality columns; DirectQuery against slow sources without aggregations; slicers that requery on every click. Fixes are verified with the same measurement, on a cold cache, before and after.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>

<evidence>
{{evidence}}
</evidence>

1. Classify the problem from the evidence: page design (many visuals, high "other"), query (high DAX query time), model size (large columns, memory), refresh, or source (DirectQuery latency). If the evidence is insufficient, say which measurement to take next and how (Performance Analyzer, DAX Studio server timings with cache cleared, VertiPaq Analyzer) and stop at a provisional diagnosis.
2. Show where the time goes: the slowest visuals and their split, and for slow queries the storage and formula engine split if given.
3. For each slow measure given, explain why it is slow in terms of filter context and engine behaviour, and write a rewrite (variables, column predicates instead of FILTER over tables, KEEPFILTERS where the intent requires it, DIVIDE, no forced zeros in matrices, pre-computation in Power Query or the source where right).
4. Propose model changes: removing or splitting high-cardinality columns, turning off Auto date/time, replacing bi-directional relationships, moving calculated columns upstream, aggregations or storage mode changes for DirectQuery.
5. Propose page changes: fewer visuals, combining cards, moving detail tables to drill-through pages, slicer apply buttons.
6. Rank all fixes by expected gain and effort, tied to the measured evidence, with the risk of changing results for each.
7. Give the verification plan: the same measurements before and after, cold and warm cache, and a check that each rewritten measure returns the same values as before on a set of filter combinations.
</task>

<constraints>
- Ground every recommendation in the evidence given; label general suggestions that the evidence does not yet support as "to check".
- Do not promise specific speedups; state expected gain as high, medium or low with the reason.
- Any DAX rewrite must keep the measure's meaning; call out any case where results could differ and how to test it.
- Do not recommend changes that drop data users need (removing columns, reducing history) without saying what is lost and asking for confirmation.
</constraints>

<output_format>
## Diagnosis summary
Problem type and the two or three main causes.

## Where time goes
Table: visual or query | DAX query ms | visual display ms | other ms | note.

## Fixes ranked
Table: fix | addresses | expected gain | effort | risk to results.

## Measure rewrites
For each: original, rewrite in a DAX code block, why it is faster, how to test equality.

## Model changes
## Verification
Steps and the measurements to record.
</output_format>
