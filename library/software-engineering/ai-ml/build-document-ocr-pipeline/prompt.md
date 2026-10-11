---
schema: 1
id: build-document-ocr-pipeline
kind: prompt
title: Build an OCR pipeline for scanned documents
description: "Builds an OCR pipeline for scanned PDFs and images that uses the text layer when present, keeps layout and tables, scores confidence and routes low-quality pages to review."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, backend-engineer, data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [document, repo, image]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ocr, document-processing, pdf-extraction, table-extraction, layout-analysis]
pairs_with:
  prompts: [build-structured-extraction, redact-personal-data]
args:
  - name: documents
    description: Document types (invoices, contracts, forms, books), languages, scan quality, handwriting or not, volume per day.
    type: text
    required: true
  - name: output_needs
    description: What downstream needs, for example plain text for search, tables as rows, or text with page and box coordinates for an extraction step.
    type: text
    required: true
  - name: constraints
    description: Whether documents may leave the company, hardware, budget and turnaround.
    type: string
output_contract:
  format: markdown
  sections: [Design, Code, Accuracy check, Review routing, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Much "OCR" work is unnecessary: born-digital PDFs already have a text layer that is exact, while OCR on them only adds errors. The real work starts with mixed files where some pages are scanned. Scans need rendering at about 300 DPI, deskewing and sometimes denoising before recognition. Multi-column pages, headers, footers and tables break reading order, so a layout step (or an OCR engine with layout output) must come before plain text is trusted. Tables need structure recognition, not just text. Numbers are where errors cost most (0 and O, 1 and l, 5 and S, dropped decimal points), and checks such as line items summing to a total catch them. Engines differ: classic engines are fast and free but weak on poor scans and tables, deep-learning engines and cloud document services are stronger at a cost, and handwriting needs a dedicated model. Without per-page confidence and a review queue, bad pages flow silently into downstream systems.
</context>

<task>
Build an OCR pipeline for: {{documents}}

Output needs: {{output_needs}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. Read the repository and any existing document handling. Choose the OCR engine and layout tooling from the documents, languages, data rules and budget; state the options considered and the trade-off.
2. Classify each page: text layer present and usable (extract directly), image-only (OCR), or mixed. Detect a usable text layer by checking for real characters, not just its existence.
3. Pre-process image pages: render at about 300 DPI, correct orientation and skew, and apply denoising only when it measurably helps.
4. Run layout analysis and OCR: reading order for columns, header and footer detection, table structure to rows and cells, and word-level boxes and confidences kept with page numbers.
5. Validate content: language-appropriate character checks, number formats, and domain checks such as totals adding up or required fields present, where the document type allows.
6. Score each page and document (mean and low-percentile word confidence, validation failures) and route those under the threshold to human review with the reason.
7. Output in the needed form, always with provenance (file, page, box) so downstream steps can cite where text came from.
8. Measure accuracy on 20-50 representative pages with hand-checked text: character error rate, field accuracy for key fields, and table cell accuracy; set the review threshold from it.
9. Make processing resumable and idempotent; run on sample documents and report real results and pages per minute.
</task>

<constraints>
- Do not OCR pages that have a usable text layer.
- Do not send documents to an external service unless allowed; ask when unsure.
- Never silently "correct" numbers or names; flag uncertain values for review.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Page classification, engine, layout and table handling, validation, outputs.
## Code
Code blocks with file paths.
## Accuracy check
Table: document type | CER | key-field accuracy | table accuracy.
## Review routing
Thresholds and expected share sent to review.
## Check
Commands run, throughput, real results.
## Open questions
Numbered, or "None".
</output_format>
