---
schema: 1
id: review-training-data
kind: prompt
title: Review a training dataset sample
description: Audits a sample of a labelled dataset for label noise, leakage, duplicates, class imbalance and representation gaps, and gives a concrete fix for each problem. Use before training or fine-tuning.
category: ai-ml
version: 1.0.0
status: experimental
stage: [review]
role: [ml-engineer, data-scientist, data-engineer]
requires: [none]
inputs: [dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [label-noise, data-leakage, deduplication, class-imbalance]
pairs_with:
  prompts: [plan-ml-experiment, plan-fine-tuning]
  personas: [ml-engineer]
args:
  - name: dataset_sample
    description: A sample of rows as CSV, JSONL or a table, with the label column. A random sample of 100 to 500 rows works best.
    type: text
    required: true
  - name: task
    description: What the model will learn to do, the label definitions or labelling guideline, and how the sample was drawn.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Findings, Suspected mislabels, Guideline changes, Checks on the full dataset]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A model cannot be more consistent than its labels. Most dataset problems are systematic: a guideline that two labellers read differently, a source whose rows are all one class, a field that leaks the label, or thousands of near-identical rows that inflate test scores. Reading a sample row by row finds these problems far more cheaply than training a model and wondering why it plateaus. The aim is to find the patterns behind individual errors, not to relabel the sample.
</context>

<task>
Audit this sample for the task below.

Task: {{task}}

Sample:
{{dataset_sample}}

1. Identify what one row represents, which column is the label, and the label set. If the label column or a label's meaning is unclear, ask before auditing.
2. Read every row and check for:
   - label noise: rows whose label contradicts their content. Separate clear errors from ambiguous rows that reveal a guideline gap;
   - inconsistency: near-identical rows with different labels;
   - duplicates and near-duplicates, and across splits if there is a split column;
   - leakage: fields or text that give away the label (label words in the text, status tags, identifiers, timestamps recorded after the outcome, boilerplate unique to one source);
   - class balance: counts per label in the sample;
   - representation gaps: languages, lengths, sources, time periods or user groups that are missing or rare, and the edge cases the task implies but the sample lacks;
   - formatting defects: truncation, encoding errors, HTML or template residue, empty values;
   - personal data that should not be in training data.
3. For each issue, give the evidence rows, the count in the sample, the likely effect on the model, and a concrete fix: relabel with a guideline change, deduplicate by exact hash or by near-duplicate detection, split by group, drop or mask a leaking field, collect or reweight under-represented slices, or scrub personal data.
4. Propose specific wording changes to the labelling guideline for every ambiguity you found.
5. List the checks to run on the full dataset, such as cross-validated predictions to surface likely mislabels, near-duplicate detection across splits, and label distribution by source and by time.
</task>

<constraints>
- Refer to rows by id, or by row number if there is no id. Do not copy personal data into the report.
- Report counts as "n of N in the sample". Do not extrapolate a prevalence to the full dataset without saying it is an estimate from a sample of that size.
- If the sample is too small or clearly not random, say what it can and cannot show.
- Suggest a relabel only when you can say why. Mark your confidence as high, medium or low.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The three issues that matter most, one line each.

## Findings
Table: issue | evidence rows | count in sample | effect on the model | fix.

## Suspected mislabels
Table: row | current label | suggested label | reason | confidence.

## Guideline changes
Bullets with the proposed wording.

## Checks on the full dataset
Numbered, each with what it detects.
</output_format>
