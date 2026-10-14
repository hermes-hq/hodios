---
schema: 1
id: convert-document-to-markdown
kind: prompt
title: Convert a document to Markdown notes
description: Converts pasted text from a Word file, PDF or web page into clean Markdown for a notes app, rebuilding headings, lists, tables and links and removing page clutter without changing the content.
category: note-taking
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, researcher, writer]
stack: [markdown]
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
depth: specific
tags: [markdown-conversion, pdf-text, word-documents, web-clipping, formatting-cleanup]
pairs_with:
  prompts: [structure-messy-notes, split-note-into-atomic-notes, set-up-obsidian-vault, migrate-notes-between-apps]
args:
  - name: text
    description: The text copied from the document, PDF or web page, as it pasted (broken lines and all).
    type: text
    required: true
  - name: source
    description: Where it came from and anything to keep, for example "PDF of a policy, keep section numbers" or "blog post, with its web address".
    type: string
    required: true
  - name: app
    description: Optional - the notes app it is going into (Obsidian, Notion, Logseq, Bear, plain files), so links and frontmatter suit it.
    type: string
output_contract:
  format: markdown
  sections: [Markdown, Changes made, Check these]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Text copied out of PDFs and Word files arrives damaged in predictable ways: hard line breaks in the middle of sentences, words split with hyphens at line ends, headers, footers and page numbers repeated through the body, numbered lists turned into plain lines, tables flattened into runs of words, footnote markers stuck to words, smart quotes and odd bullets. Web pages bring navigation, cookie text, share buttons and "related posts". A good conversion repairs structure without editing meaning: it rebuilds heading levels from the original numbering or styling cues, rejoins paragraphs, restores lists and tables, keeps links and footnotes, and drops clutter. Where structure cannot be recovered with confidence (a mangled table), it is better to flag it than to guess.

Source: {{source}}
{{#app}}
Destination app: {{app}}
{{/app}}

Text:
{{text}}
</context>

<task>
1. Identify the structure: title, heading levels, lists, tables, quotes, code, footnotes and links.
2. Remove clutter: repeated headers and footers, page numbers, navigation and cookie text, share prompts. List what you removed.
3. Repair text: rejoin broken lines into paragraphs, fix words split across lines, normalise bullets and quotes, keep the original wording.
4. Rebuild headings with one top-level title and nested levels that follow the original numbering or emphasis.
5. Rebuild tables as Markdown tables when columns can be recovered with confidence; otherwise keep the content as a list and flag it.
6. Keep links and convert footnotes to Markdown footnotes or a sources list at the end.
7. Add a short frontmatter block suited to the destination app with title, source and date added (leave the date as a placeholder if not given).
8. Before answering, compare against the input to check that no sentence was dropped, reworded or summarised.
</task>

<constraints>
- Do not summarise, shorten, translate or rewrite content; only repair formatting.
- Do not invent a URL, author or date that is not in the input.
- Flag anything you could not recover rather than guessing.
- If the text is very long, convert it in order and say where you stopped.
</constraints>

<output_format>
## Markdown
The converted note in one fenced code block with the language set to markdown.
## Changes made
Bullets: what was removed and repaired.
## Check these
Places where structure was uncertain, or "None".
</output_format>
