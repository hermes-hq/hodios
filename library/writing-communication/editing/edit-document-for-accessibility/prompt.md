---
schema: 1
id: edit-document-for-accessibility
kind: prompt
title: Edit a document for accessibility
description: Edits a Word, Google Docs, PDF-bound or web document for accessible reading, covering heading structure, link text, plain language, tables, reading order and alt-text placeholders.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, technical-writer, teacher, operations-manager]
requires: [none]
inputs: [document, text]
output: [rewrite, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [document-accessibility, wcag, screen-readers, alt-text, link-text, inclusive-design]
pairs_with:
  prompts: [format-document-for-scanning, simplify-to-plain-language, review-document-for-ambiguity]
  personas: [editor]
args:
  - name: document
    description: 'The document text. Describe non-text parts where they appear, for example "[image: chart of sales by region]", "[two-column layout]", "[text box on the right]", "[table with merged header cells]".'
    type: text
    required: true
  - name: format
    description: Where the document will be read or what it will be exported to.
    type: enum
    enum: [word, google-docs, pdf, web]
    default: word
  - name: audience_needs
    description: "Optional, known reader needs, for example \"screen reader users\", \"readers with dyslexia\", \"low vision, will zoom to 200%\", \"English as a second language\"."
    type: text
output_contract:
  format: markdown
  sections: [Edited document, Changes made, Alt text to write, Do in the app, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An accessible document can be navigated and understood by people who use screen readers, magnification, keyboard-only navigation or reading aids, and by readers with cognitive or language differences. Most failures are editorial, which is why an editor can fix them: bold text pretending to be headings, skipped heading levels, "click here" links, tables used for layout or with merged cells, meaning carried only by colour or position ("the items in red", "see the box on the right"), images with no text alternative, and dense prose. Some fixes can only be made in the app: applying real heading styles, marking table header rows, setting the document title and language, and checking reading order in a tagged PDF. The relevant standard is WCAG 2.2, which most public-sector accessibility rules reference.
</context>

<task>
Edit this document for accessibility, for {{format}}{{#audience_needs}}, with these reader needs in mind: {{audience_needs}}{{/audience_needs}}.

<document>
{{document}}
</document>

1. If the document is empty, ask for it and stop.
2. Structure: identify the title and the real sections. Mark headings as levels (`#` for the title, `##` for sections, `###` for subsections) with no skipped levels and one title. Turn fake headings (bold or capitals on their own line) into headings. Turn manual lists (lines starting with dashes or numbers typed by hand) into real lists.
3. Links: rewrite link text so it makes sense out of context ("Download the 2026 fee schedule (PDF, 2 MB)" rather than "click here" or a bare URL). Keep the URL. Note file type and size if given.
4. Images and non-text content: at each image, insert an `[ALT: …]` placeholder that says what the alt text must convey for its purpose in this document (for a chart, the key finding and where the data lives; for a decorative image, `[ALT: decorative, mark as decorative]`). Do not describe what you cannot see; base it only on the document's description and surrounding text.
5. Tables: keep tables for data only. Give each a short caption or introductory sentence, a single header row, and no merged or empty cells; if a table is used for layout, turn it into headings and paragraphs.
6. Sensory and colour-only meaning: rewrite instructions that depend on colour, shape or position so they also work in words ("items marked 'Overdue'" instead of "items in red").
7. Plain language: shorten sentences over about 25 words, expand abbreviations at first use, replace jargon where a common word works, and avoid long passages in capitals or italics. Do not change the meaning, legal wording or required terms.
8. Reading order: if the document mentions columns, text boxes, sidebars or floating elements, put the content in a logical linear order and note what must be fixed in the app.
9. List the checks that must be done in the app for {{format}}: for Word, apply built-in heading styles, mark table header rows, add alt text, set the document title and language, and run Review > Check Accessibility; for Google Docs, use the Styles menu for headings and add alt text to each image; for PDF, author it accessibly first, export with document structure tags, then verify reading order and tags in an accessibility checker; for web, use semantic HTML headings, lists, table headers and alt attributes.
</task>

<constraints>
- Preserve the content and meaning. Edits are structural and for clarity, not a rewrite of the author's argument.
- Do not invent image content, data or link destinations; use placeholders.
- Do not claim the document is "WCAG compliant". You can only fix what is in the text; say what still needs checking.
</constraints>

<output_format>
## Edited document
The edited document with heading levels marked, real lists, rewritten links, `[ALT: …]` placeholders and fixed tables.
## Changes made
Bullets grouped by type: structure, links, images, tables, sensory language, plain language, reading order. Give before → after for links and sensory instructions.
## Alt text to write
A table: Location | Purpose of the image | What the alt text should say, or "decorative".
## Do in the app
A checklist of steps for {{format}} that cannot be done in text.
## Open questions
Anything the author must confirm, such as image content or link targets. "None" if none.
</output_format>
