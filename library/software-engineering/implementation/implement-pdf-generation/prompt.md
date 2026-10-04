---
schema: 1
id: implement-pdf-generation
kind: prompt
title: Implement PDF generation
description: Implements PDF generation for invoices, reports or certificates from templates, with embedded fonts, controlled page breaks, accessibility tags where possible and output tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, schema]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pdf, document-templates, page-layout, tagged-pdf, fonts]
pairs_with:
  prompts: [implement-background-job, write-visual-regression-tests, implement-transactional-email]
args:
  - name: document_type
    description: The document to produce and its use, for example "customer invoice, emailed and archived" or "course completion certificate".
    type: string
    required: true
  - name: stack
    description: Language, framework and where generation runs, for example "Node.js service on Linux containers".
    type: string
    required: true
  - name: data_shape
    description: The data that fills the document, as a schema, type definition or example JSON, including any repeating sections such as line items.
    type: text
    required: true
  - name: approach
    description: html-to-pdf renders HTML and CSS templates; programmatic draws with a PDF library; auto picks what fits the stack and document.
    type: enum
    enum: [auto, html-to-pdf, programmatic]
    default: auto
output_contract:
  format: markdown
  sections: [Approach, Template and layout, Changes, Tests, Operational notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PDF features look done in a demo and then fail in production: a headless browser launched per request exhausts memory under load; the server has none of the fonts the template uses, so text falls back or non-Latin names show as empty boxes; a long table splits a row across pages and its header does not repeat; amounts and dates are formatted for the developer's locale; customer data inserted into an HTML template is not escaped, and the renderer happily fetches any URL in it, including internal addresses; an invoice is regenerated months later from changed data and no longer matches what the customer received; screen readers get an untagged PDF with no title or language; and the tests either do not exist or compare bytes that change on every run because of timestamps.
</context>

<task>
Implement PDF generation for:

Document type: {{document_type}}
Stack: {{stack}}
Approach: {{approach}}

<data_shape>
{{data_shape}}
</data_shape>

1. Inspect the code: any existing PDF, templating or email-rendering code, the libraries already installed, where generation would run (request, background job, separate service) and where files are stored. If the document has legal or archival requirements you cannot infer (for example a required archival PDF format, mandatory invoice fields for a country, or a signature), ask and stop rather than guessing.
2. Choose the approach. With auto, prefer HTML and CSS templates rendered by an HTML-to-PDF engine when the layout is document-like and designers will edit it, and a programmatic PDF library when the layout is fixed, the volume is high, or no headless browser can run in the environment. Prefer libraries the project already uses. Explain the choice and its trade-offs in two or three sentences.
3. Build the template from the data shape: the template engine's auto-escaping for all data; locale-aware money, number and date formatting, with the locale and currency passed in, not assumed; margins and page size suited to the document's region (A4 or Letter); a header and footer with page numbers ("page X of Y" where the engine supports it); and repeating sections such as line items that break cleanly (`break-inside: avoid` on rows, repeated table headers, keep-with-next for headings and totals).
4. Embed fonts: ship font files with the code (checking their licences allow embedding), cover every script the data can contain, and never depend on fonts installed on the server. If the data can contain right-to-left or complex scripts (Arabic, Hebrew, Devanagari, Thai), confirm the engine does text shaping and bidirectional layout; many programmatic PDF libraries do not, which is a reason to prefer an HTML-to-PDF engine.
5. Lock down rendering: load images and styles from local files or inline data only, disable or allow-list network access in the renderer, set a timeout and memory limit, and reuse a browser instance or pool rather than launching one per document.
6. Accessibility and metadata: set the document title, language, author or producer and subject; produce a tagged PDF with a logical reading order and alt text for meaningful images where the engine supports it; and state plainly if the chosen engine cannot tag.
7. Run it where it belongs: in a background job for batches or large documents. For documents that must not change once issued, such as invoices, generate once, store the file with a content hash and serve the stored copy.
8. Test the output: generate PDFs from fixture data and extract their text to assert on key content (names, totals, line items, page numbers); assert the page count for a long multi-page fixture; check the metadata; and add a rasterise-and-compare visual test with a tolerance if the project has that tooling. Make output deterministic by fixing the clock and the creation-date metadata in tests. Run the tests and report the real result.
</task>

<constraints>
- Never insert unescaped data into an HTML template, and never let the renderer fetch arbitrary URLs.
- Do not launch a new headless browser per request in a web process.
- Ask before adding a large dependency such as a headless browser, and say how it affects image size and memory.
- Do not invent legal content (tax wording, registration numbers, terms); leave clearly marked fields for it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Approach
The engine or library chosen and why, in two or three sentences.
## Template and layout
Page size, fonts, header and footer, page-break rules and locale handling, in bullets.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Operational notes
Where generation runs, resource limits, storage of issued documents, and accessibility limits of the engine.
</output_format>
