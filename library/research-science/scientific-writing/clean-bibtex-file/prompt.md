---
schema: 1
id: clean-bibtex-file
kind: prompt
title: Clean a BibTeX file
description: Cleans a BibTeX file by finding duplicates, missing required fields, inconsistent keys, unprotected capitals, special characters and inconsistent journal names, flagging what it cannot verify.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
requires: [none]
inputs: [file, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
stack: [latex]
tags: [bibtex, biblatex, reference-list, citation-keys, thesis]
pairs_with:
  prompts: [format-citations, debug-latex-errors, set-up-reference-library]
args:
  - name: bib
    description: The contents of the .bib file, or the part to clean.
    type: text
    required: true
  - name: conventions
    description: Optional. Key format you want (for example authorYEARword), BibTeX or biblatex with Biber, whether journal names should be full or abbreviated, and fields to drop.
    type: text
output_contract:
  format: markdown
  sections: [Problems found, Cleaned file, Key changes, Cannot verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bibliography files grow by export from reference managers, publisher pages and colleagues, and become inconsistent: the same paper under two keys (one from the preprint, one from the journal), entries of the wrong type (@misc for articles), missing required fields (journal, year, volume, pages), titles whose acronyms and proper nouns turn lowercase because they are not protected with braces in styles that change case, special characters and accents that break pdfLaTeX, journal names in mixed full and abbreviated forms, and stray fields (abstract, file paths, keywords) that bloat the file or expose local information. Changing keys breaks \cite commands in the document, so every key change needs a mapping. Duplicates are usually found by DOI, then by normalised title and year.
</context>

<task>
Clean this BibTeX file.
<bib>
{{bib}}
</bib>
{{#conventions}}
Conventions: {{conventions}}
{{/conventions}}

1. Parse every entry and report syntax problems (unbalanced braces, missing commas, duplicate keys).
2. Find likely duplicates by DOI, then by normalised title and year; for each pair, propose which to keep (published version over preprint unless told otherwise) and note the key to map.
3. Check entry types and the required fields for each type (for @article: author, title, journal, year), plus expected ones such as volume and pages; list missing fields without filling them from memory.
4. Protect capitals in titles where case matters (acronyms, proper nouns, gene or chemical names) with braces, and escape & as \& in titles and journal names, and convert accented and special characters to LaTeX commands when the file is processed by BibTeX, which handles UTF-8 poorly (biblatex with Biber handles UTF-8, so keep them there).
5. Make journal names consistent in the requested form; where you are not certain of an abbreviation, keep the full name and flag it.
6. Normalise keys only if conventions ask for it, and give an old-to-new key mapping.
7. Remove fields the conventions say to drop, and any local file paths.
8. Output the cleaned file.
</task>

<constraints>
- Never invent DOIs, page numbers, volumes or years; mark missing data and list it under Cannot verify.
- Do not change titles or author names beyond case protection, character encoding and obvious export errors you list.
- Keep keys unchanged unless asked, because changes break citations; when changed, give the full mapping.
- If the file is long, process it completely and say how many entries were read; do not silently skip entries.
</constraints>

<output_format>
## Problems found
Table: key, problem, action.
## Cleaned file
A bibtex code block with every entry.
## Key changes
Old key to new key mapping, or "No keys changed".
## Cannot verify
Entries needing the author to check fields against the source.
</output_format>
