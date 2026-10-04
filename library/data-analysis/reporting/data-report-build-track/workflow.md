---
schema: 1
id: data-report-build-track
kind: workflow
title: Build a data report file end to end
description: Builds a data report file end to end, confirming the question, scripting analysis and charts, drafting traceable findings and exporting a document or deck after review. Use to answer a data question.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, build, review, ship]
role: [data-analyst, business-analyst, data-scientist]
requires: [repo-read, file-write, shell]
inputs: [dataset, text]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reproducible-analysis, traceable-numbers, report-export, analysis-script]
pairs_with:
  prompts: [build-report-deck-from-analysis, generate-docx-report-from-template, write-insight-report, write-data-methodology-note]
  workflows: [analysis-project-track]
  rules: [chart-design-rules]
args:
  - name: question
    description: The question the report must answer and the decision it feeds, in the requester's words.
    type: text
    required: true
  - name: data_path
    description: Path to the data in the project (files, a folder, or a database connection already configured in the project).
    type: string
    required: true
  - name: output
    description: The file format of the finished report.
    type: enum
    enum: [docx, pptx, html, pdf]
    default: docx
  - name: audience
    description: Who reads it and how much statistics they are comfortable with.
    type: string
    default: managers who will act on it, not analysts
steps:
  - {id: question, file: steps/01-question.md, stage: plan, gate: approve, artifact: "report-build/01-question.md"}
  - {id: analysis, file: steps/02-analysis.md, stage: build, gate: none}
  - {id: findings, file: steps/03-findings.md, stage: review, gate: approve, artifact: "report-build/03-findings.md"}
  - {id: export, file: steps/04-export.md, stage: ship, gate: none, artifact: "report-build/04-report-log.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Produces a finished {{output}} report that answers a real question for {{audience}}, where every number can be traced to the script that computed it. Reports built by hand drift: a number pasted from an old run, a chart from a different filter, a finding the data does not support. This track pins down the question first, keeps all computation in a script that writes its results to a file, drafts findings that cite those results, pauses for review, and only then builds the file.

Rules for every step:
- Every number in the report comes from the results file written by the analysis script. No number is typed by hand, rounded differently in different places, or recalled from memory.
- Use the language and libraries already in the project; otherwise use Python with standard data and document libraries.
- Claim only what the analysis shows. Correlation is not presented as cause; small samples, missing data and excluded rows are stated where they affect a finding.
- Do not send, upload or share the report anywhere. Write it to the project.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
