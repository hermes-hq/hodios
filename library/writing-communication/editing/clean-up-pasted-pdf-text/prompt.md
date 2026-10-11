---
schema: 1
id: clean-up-pasted-pdf-text
kind: prompt
title: Clean up text pasted from a PDF or scan
description: Repairs text copied from a PDF or an OCR scan by rejoining broken lines, fixing hyphenation, misread characters, stray headers and lost paragraphs, and marks every guess.
category: editing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, researcher, writer]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ocr, pdf, text-cleanup, line-breaks, hyphenation]
pairs_with:
  prompts: [proofread-text, format-document-for-scanning]
args:
  - name: text
    description: The text exactly as pasted, broken lines and all.
    type: text
    required: true
  - name: source
    description: Where it came from. pdf-copy is text copied from a digital PDF; ocr-scan is text recognised from a scan or photo; unknown lets the prompt infer it.
    type: enum
    enum: [pdf-copy, ocr-scan, unknown]
    default: unknown
  - name: language_variety
    description: The language and spelling variety of the text, for example "British English" or "German". Optional; inferred if empty.
    type: string
output_contract:
  format: markdown
  sections: [Cleaned text, Repairs, Uncertain spots]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text copied from PDFs breaks in predictable ways. Each visual line ends in a hard line break, so paragraphs fall apart. Words split across lines keep their hyphen ("infor- mation"), but some of those hyphens are real ("long-term"). Running headers, footers, page numbers and footnote numbers land in the middle of sentences. Two-column layouts interleave. Ligatures such as "fi" and "fl" can drop out ("ofce", "efcient"), and encoding faults turn apostrophes into strings like "â€™". OCR adds its own family of errors: rn read as m, cl as d, l and 1 and I swapped, O and 0 swapped, "tbe" for "the", and spaces lost or inserted inside words. The skill is fixing these without "fixing" what the author actually wrote: names, numbers, technical terms and quotations must survive untouched unless the error is certain.

Source: {{source}}
{{#language_variety}}Language and variety: {{language_variety}}{{/language_variety}}
<text>
{{text}}
</text>
</context>

<task>
1. If the text is missing, ask for it and stop. If the source is unknown, infer it from the error pattern (encoding and ligature faults suggest PDF copy; character confusions suggest OCR) and say which.
2. Remove page furniture: running headers and footers, page numbers, repeated document titles, "continued" lines and watermark text. If a header carries information (a chapter title the body lacks), keep it once as a heading.
3. Rejoin lines inside paragraphs. Treat a line as a paragraph end when it ends with terminal punctuation and the next line starts a new thought, is indented, starts with a list marker or heading, or follows a short line.
4. Resolve line-end hyphens: join the word when the hyphen only splits it ("infor- mation" to "information"); keep the hyphen when the compound is normally hyphenated ("long-term", "self-employed"). If the text uses the same word elsewhere, follow that form.
5. Fix character errors: missing ligatures, encoding garbage, smart-quote debris, OCR confusions and broken spacing, using the surrounding words to confirm each fix.
6. Untangle interleaved columns or flattened tables when the order can be recovered; rebuild a simple table as a markdown table only if every cell is clear.
7. Keep footnote markers and move footnote text to the end under "Notes" when it appeared mid-text.
8. Do not edit for style, grammar or spelling choices the author made. This is a repair, not a proofread.
9. Mark every repair you are not sure of inline as [?original] right after your reading, and list it under Uncertain spots.
</task>

<constraints>
- Never change numbers, dates, amounts, names, citations, formulas or code unless the error is unambiguous (for example "2O24" in a date); otherwise flag it.
- Never fill in text that is missing from the paste. Mark gaps as [missing text].
- Preserve the original paragraph order and headings.
- For long pastes (over about 3,000 words), clean the first part fully and ask before continuing.
</constraints>

<output_format>
## Cleaned text
The repaired text.
## Repairs
A table: Type of repair | Count | Example (before to after). Types include line joins, hyphenation, page furniture, character fixes, column order.
## Uncertain spots
Bullets: the original fragment, your reading, and why it is uncertain. "None" if none.
</output_format>
