---
schema: 1
id: implement-document-chunking
kind: prompt
title: Implement structure-aware document chunking
description: Implements chunking for PDF, HTML and Markdown documents that splits on structure, keeps heading paths and metadata on each chunk, handles tables and code, and is tested on real documents.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, backend-engineer, data-engineer, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, document]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chunking, document-parsing, retrieval, ingestion]
pairs_with:
  prompts: [design-rag-pipeline, rerank-retrieved-passages]
args:
  - name: documents
    description: The document formats and a few sample files or paths, what users ask about them, and the embedding model's input limit.
    type: text
    required: true
  - name: current_chunker
    description: How text is chunked today (for example a fixed 1,000-character splitter), if anything.
    type: text
output_contract:
  format: markdown
  sections: [Document survey, Chunking rules, Code, Tests, Sample output, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fixed-size character splitting is the default in most tutorials and a common reason RAG answers are poor. It cuts sentences and tables in half, separates a step list from its heading, and produces chunks such as "Yes, this is supported on the Enterprise plan" with no record of what "this" is. Structure-aware chunking splits on headings, sections, paragraphs, list items and table boundaries first, then by size only when a section is too long; it prepends the document title and heading path to each chunk so it makes sense alone; it keeps tables whole or splits them by rows with the header repeated; and it never splits inside a code block. PDF needs particular care: headers and footers repeated on every page, two-column layouts, hyphenation at line ends and scanned pages with no text layer.
</context>

<task>
Implement chunking for: {{documents}}
{{#current_chunker}}
Current approach: {{current_chunker}}
{{/current_chunker}}

1. Read the ingestion code and the sample documents. Survey each format: how structure is expressed (HTML headings, Markdown `#`, PDF font sizes or outline), tables, code, lists, boilerplate (navigation, footers, cookie banners) and scanned pages.
2. Choose a parser per format, preferring libraries already in the project. For PDF, say how headings are detected and how repeated headers and footers are removed; route scanned pages to OCR or flag them.
3. Chunking rules: split on structure, merge tiny sections with their neighbours, split oversized sections at paragraph then sentence boundaries; target a token range justified by the questions and the embedding model's limit, with a small overlap only where splits fall mid-section.
4. Each chunk carries: text with the title and heading path prepended, source id, URL or path, section path, page numbers for PDF, position, content type (prose, table, code) and a content hash.
5. Tables: keep small tables whole as Markdown; split large ones by row groups with the header row repeated. Code: never split inside a block.
6. Determinism: the same input gives the same chunk ids, so re-indexing can detect changes.
7. Tests on the real samples: no chunk over the token limit, no split inside code or table rows, heading path present, boilerplate removed, ids stable across runs. Run them.
8. Print sample chunks from each format and a size histogram so a human can inspect them.
</task>

<constraints>
- Count tokens with the embedding model's tokenizer if available; otherwise state the estimate used.
- Do not claim retrieval improved without a retrieval eval; recommend measuring before and after on a query set.
- Keep the chunker a plain, testable module; no new framework unless the project uses one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Document survey
Table: format | structure signal | problems found.
## Chunking rules
Numbered rules with starting values to tune.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Sample output
A few chunks per format and the size histogram.
## Check
Commands run with real results.
## Open questions
Numbered, or "None".
</output_format>
