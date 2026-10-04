---
schema: 1
id: make-generated-pdfs-accessible
kind: prompt
title: Make generated PDFs accessible
description: Changes the code that generates invoices, statements or certificates so the PDFs come out tagged and PDF/UA-ready, with reading order, alt text, language and table headers checked in CI.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer]
requires: [none]
inputs: [file, text]
output: [code, tests, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [pdf-ua, tagged-pdf, document-generation, reading-order, verapdf]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [implement-pdf-generation, write-alt-text, audit-web-accessibility]
args:
  - name: generator_code
    description: The code or template that produces the PDF, plus a description or sample of the output layout.
    type: text
    required: true
  - name: pdf_library
    description: The PDF tool in use, for example "headless Chrome via Puppeteer", "WeasyPrint", "iText 8", "PDFBox", "ReportLab", "wkhtmltopdf". Leave empty to infer from the code.
    type: string
  - name: document_type
    description: What the PDF is, for example "monthly bank statement" or "course certificate". Leave empty to infer.
    type: string
output_contract:
  format: markdown
  sections: [Current state, Library capability, Code changes, Automated check, Manual check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generated PDFs reach many people: every customer gets the statement, every student the certificate. Public-sector, banking and education buyers increasingly require them to be accessible (PDF/UA, ISO 14289, and WCAG 2.x applied to documents). Fixing one file by hand in an editor does not scale; the fix belongs in the generator. Experts know three things a naive answer misses: the library decides what is possible (some emit no tags at all, so the answer is to switch the rendering path, not to tweak markup); tags come from the source structure, so semantic HTML or the library's structure API matters more than visual layout; and an untagged PDF with perfect visual design is still an image of text to a screen reader.
</context>

<task>
Make this generator produce accessible PDFs.

<generator_code>
{{generator_code}}
</generator_code>

Library: {{pdf_library}}. Document: {{document_type}}. If either is empty, infer it from the code and say what you inferred.

1. Current state: identify what the output likely lacks: tag tree, document language, title shown in the window (`DisplayDocTitle`), logical reading order, headings, table headers, alt text, artifact marking for headers, footers and decoration, embedded fonts with Unicode mappings (so text extracts correctly), and form field labels if any.
2. Library capability: say plainly whether the library can emit tagged PDF and how. Typical paths: Chromium printing with tagged output enabled (`tagged: true` in Puppeteer or Playwright), WeasyPrint with its PDF/UA variant, iText or PDFBox with structure elements, PrinceXML or a typesetting engine with PDF/UA support. If the current library cannot tag, propose the smallest migration and its cost. Do not claim a flag or API exists unless you are sure; otherwise mark it [check docs].
3. Structure at the source: one `h1` (document title), headings in order, real `table` with `th` and `scope` for line items, `caption` or heading for each table, lists as lists, `lang` on the root and on any foreign-language passages, reading order equal to DOM order (no absolute positioning that reorders content), meaningful link text.
4. Images and visual content: logos and signatures get short alt text or are marked as artifacts if purely decorative; charts get alt text with the key figure plus a data table; QR codes get alt text that states the destination and a printed URL.
5. Repeating and decorative content: page headers, footers, page numbers, watermarks and rules are artifacts, not body content.
6. Metadata: title, language, PDF/UA identifier where the library supports it.
7. Add an automated check to CI: run veraPDF with the PDF/UA-1 profile (or the library's own validator) on sample outputs for each template, failing the build on errors. Use sample data that exercises page breaks, long names and empty sections.
8. Give the manual check: the PAC (PDF Accessibility Checker) report, reading order in a screen reader, and copying text to confirm characters extract correctly.
</task>

<constraints>
- Only change structure and metadata. Keep the visual layout unless it forces a wrong reading order; note any visual change.
- Never claim PDF/UA or WCAG conformance; automated validators catch only machine-checkable failures.
- Do not write alt text for images whose content you cannot see; add a field for it and say who supplies it.
- Ask for the template or a sample output if the code does not show the document structure.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Current state
Table: Requirement | Likely status (missing, partial, present) | Evidence in the code.

## Library capability
Two to four sentences: can it tag, how, and any migration needed.

## Code changes
The changed template and generator code, with short comments.

## Automated check
The CI step and command, and which sample documents it runs on.

## Manual check
Numbered, five to eight steps, with what "pass" looks like.
</output_format>
