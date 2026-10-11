---
schema: 1
id: format-book-endnotes
kind: prompt
title: Format endnotes for a nonfiction book
description: Turns a chapter's inline citations or rough source notes into consistent endnotes for a trade nonfiction book, keyed by page phrase or number, and lists every note with missing details.
category: nonfiction
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, editor]
requires: [none]
inputs: [document, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [endnotes, citations, back-matter, references, book-production]
pairs_with:
  prompts: [build-book-index, write-note-on-sources]
  workflows: [manuscript-fact-check-track]
args:
  - name: chapter_with_sources
    description: The chapter text with sources inline or in brackets, for example (Smith 2019, p. 45) or [source - interview with author, March 2024].
    type: text
    required: true
  - name: note_style
    description: numbered (superscript numbers in the text) or keyed (no numbers in the text; notes keyed to page and a short quoted phrase, common in trade books).
    type: enum
    enum: [numbered, keyed]
    default: keyed
  - name: citation_style
    description: The citation style or publisher's house style, for example Chicago notes, or a short description.
    type: string
    default: Chicago notes and bibliography
output_contract:
  format: markdown
  sections: [Clean chapter text, Notes, Missing details]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare endnotes for trade nonfiction. Trade publishers often prefer notes that do not interrupt the reader: keyed notes (no superscripts; each note starts with a page number and a short phrase from the text) or sparse numbered notes. Each note gives enough for a reader to find the source: author, title, publisher or outlet, date, page or URL, and for interviews, who and when. Repeated sources get shortened forms after the first full citation in each chapter. Notes that sneak in extra argument belong in the text or a footnote, not hidden at the back.

<chapter_with_sources>
{{chapter_with_sources}}
</chapter_with_sources>
Note style: {{note_style}}. Citation style: {{citation_style}}.
</context>

<task>
1. Find every citation or source marker in the chapter, in order.
2. Produce the clean chapter text: inline citations removed; for numbered style, superscript numbers placed after the punctuation at the end of the clause they support.
3. Write the notes: for keyed style, the key phrase (the first few words of the sentence or quote being sourced) and a page placeholder "[p. __]" since page numbers come from proofs; for numbered style, the numbers. Format each citation to {{citation_style}} using only the details given, full form at first mention in the chapter, shortened after.
4. Group several citations supporting one sentence into one note.
5. List every note with missing details (no page, no date, no publisher, unclear source) and what is needed.
</task>

<constraints>
- Never invent bibliographic details (page numbers, publishers, dates, URLs, DOIs). Leave a bracketed gap and list it.
- Do not change the chapter's wording other than removing citations and placing note markers.
- If {{citation_style}} is not one you know reliably, say which conventions you followed.
- Flag sources that look like they may not support the claim attached (for example a citation to a book's title for a precise statistic) as worth checking.
</constraints>

<output_format>
## Clean chapter text

## Notes
Chapter heading, then notes in order.

## Missing details
Table: Note | What is missing | Where to find it.
</output_format>
