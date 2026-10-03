---
schema: 1
id: format-document-for-scanning
kind: prompt
title: Format a document for scanning
description: Restructures a long unformatted document with headings, lists, tables and a summary line so it can be scanned, without changing the wording beyond joins and labels.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, manager, technical-writer, individual]
requires: [none]
inputs: [document, text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [formatting, scannability, headings, information-design, wall-of-text]
pairs_with:
  prompts: [edit-for-structure, edit-document-for-accessibility, tighten-prose]
  personas: [editor]
args:
  - name: document
    description: The document to format, pasted in full.
    type: text
    required: true
  - name: output_format
    description: markdown uses Markdown headings, lists and tables; plain uses no markup; word-style labels each block with the Word or Google Docs style to apply.
    type: enum
    enum: [markdown, plain, word-style]
    default: markdown
output_contract:
  format: markdown
  sections: [Formatted document, Structure notes, Wording changes, Suggestions not applied]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most readers scan before they read: they look at headings, the first words of paragraphs, lists and tables to decide what matters to them. A wall of text hides steps, deadlines and comparisons that formatting would make obvious. This job is formatting only. The author has approved the words, so the value is in exposing the structure that is already there: steps become numbered lists, parallel items become bullets, attributes compared across items become a table, and each section gets a heading that says what it covers.
</context>

<task>
Format this document for scanning, as {{output_format}}.

<document>
{{document}}
</document>

1. If the document is empty, ask for it and stop. If it is short (under about 150 words) or already well structured, say so, make only the changes that clearly help, and do not add headings for their own sake.
2. Map the content: topics and where each starts and ends, sequences of steps, lists of parallel items, comparisons of several items across the same attributes, and key facts a reader hunts for (dates, deadlines, amounts, contacts, decisions, actions).
3. Plan the structure:
   - headings at no more than three levels, each a short label of what follows ("How to apply", "Fees and deadlines");
   - numbered lists for sequences, bullets for unordered items, a table only when at least two items share at least two attributes;
   - keep the original order of content. If a different order would clearly help, suggest it instead of doing it.
4. Add one summary line at the top that states the document's main point or action, built from the document's own words where possible, labelled "Summary:".
5. Apply the structure. The only wording changes allowed are: headings and table labels, the summary line, and the joins needed to turn prose into list items or table cells (removing "and", "firstly", "also"; splitting a sentence at a list boundary; dropping a lead-in that a heading now replaces).
6. Verify: every sentence and fact in the original appears in the output. Log every wording change.
</task>

<constraints>
- Do not cut, add, reorder or rephrase content beyond the allowed joins and labels. Do not fix grammar or tone; list obvious errors under Suggestions instead.
- Bold only what a scanning reader must not miss (a deadline, a required action), at most once or twice per section.
- Formats:
  - markdown: `#` headings, `-` and `1.` lists, pipe tables;
  - plain: headings on their own line in sentence case followed by a blank line, `-` and `1.` lists, tables as aligned text columns;
  - word-style: start each block with the style to apply in square brackets, such as [Title], [Heading 1], [Heading 2], [List Bullet], [List Number] or [Normal], and give tables as [Table] followed by rows with cells separated by " | ", the first row marked as the header row.
</constraints>

<output_format>
## Formatted document
The document in the chosen format.
## Structure notes
Bullets: what became headings, lists and tables, in one line each.
## Wording changes
A table: Original wording | New wording | Why (heading, join, summary). Include the summary line.
## Suggestions not applied
Bullets: reordering, cuts, unclear passages or errors the author may want to fix. "None" if none.
</output_format>
