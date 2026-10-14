---
schema: 1
id: run-framework-analysis
kind: prompt
title: Run framework analysis
description: Runs framework analysis on interview or focus group data through familiarisation, an analytical framework, indexing, charting into a case-by-theme matrix, then mapping and interpretation.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [transcript, document]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [framework-method, qualitative-analysis, framework-matrix, applied-research, interview-data, health-services-research]
pairs_with:
  prompts: [build-qualitative-codebook, prepare-interview-transcripts, plan-qualitative-rigour, run-thematic-analysis]
  personas: [research-methodologist]
args:
  - name: data
    description: The transcripts or excerpts with participant codes and any participant characteristics relevant to comparison (role, site, group).
    type: text
    required: true
  - name: aims
    description: The research questions and any a priori topics (for example from the interview guide or a policy framework) that the analysis must cover.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Familiarisation notes, Working analytical framework, Indexing sample, Framework matrix, Mapping and interpretation, Audit notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Framework analysis (developed by Ritchie and Spencer for applied policy research, and described step by step by Gale and colleagues for health research) suits studies with defined questions, a team, and a need to compare across cases or groups. Its signature is the matrix: rows are cases, columns are codes or categories, and each cell holds a summary of what that participant said with references to the transcript, so patterns can be read across a case and down a theme. It combines deductive topics from the aims with inductive codes from the data. Common errors are charting by pasting long quotes into cells (losing the summary that makes comparison possible), losing the link back to the source, freezing the framework too early, and stopping at a descriptive matrix without the interpretation stage that explains patterns, typologies and associations. The analyst's interpretations must be grounded in the data, not in what the participant group "should" think.
</context>

<task>
Run framework analysis on:
<data>
{{data}}
</data>
Aims and a priori topics: {{aims}}

1. Familiarisation: note initial impressions, recurring ideas and surprises per transcript, kept separate from coding.
2. Develop a working analytical framework: categories and codes combining the a priori topics with inductive codes from the data, each with a short definition. Ask the user to confirm or edit the framework before full charting if the data are large.
3. Index: show how the framework applies to a sample of the data with line or turn references, and revise codes where they do not fit.
4. Chart: build the matrix with participants as rows and categories as columns; each cell is a brief summary in the analyst's words with a reference and, where valuable, a short verbatim phrase in quotation marks. Mark empty cells as "not discussed" rather than leaving them blank.
5. Map and interpret: read down columns and across rows to describe the range of views, compare by participant characteristics, identify associations, typologies and deviant cases, and offer explanations grounded in the matrix.
6. Keep audit notes on framework changes and analytic decisions.
</task>

<constraints>
- Every summary and quote must trace to the provided data with a reference; never invent quotes or paraphrase beyond what was said.
- Do not report counts as if the sample were representative; use frequency only to describe patterns within the sample.
- Keep interpretations tentative where data are thin, and say so.
- If transcripts contain identifiers, warn and use participant codes only.
</constraints>

<output_format>
## Familiarisation notes
Bullets per transcript.
## Working analytical framework
A table: category | code | definition | source (a priori or inductive).
## Indexing sample
A short excerpt showing codes applied with references.
## Framework matrix
The case-by-category table with summaries and references.
## Mapping and interpretation
Patterns, comparisons, typologies, deviant cases and explanations.
## Audit notes
Dated bullets on decisions and framework changes.
</output_format>
