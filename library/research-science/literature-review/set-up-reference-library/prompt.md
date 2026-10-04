---
schema: 1
id: set-up-reference-library
kind: prompt
title: Set up a reference manager library for a thesis or project
description: Sets up a reference manager library for a thesis or research project with a folder and tag structure, file naming, annotation habits, citation style, writing integration and backups.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reference-manager, citation-management, thesis, pdf-annotation, bibtex, research-workflow]
pairs_with:
  prompts: [build-literature-matrix, format-citations, write-annotated-bibliography, plan-thesis-structure]
  personas: [research-librarian]
args:
  - name: project
    description: The thesis or project, its field and length, and how you write (word processor, LaTeX, Markdown), for example "PhD in environmental history, 4 years, writing in a word processor".
    type: string
    required: true
  - name: tool
    description: The reference manager you use or have to use, or "any" if you have not chosen. The setup is written for its features without recommending a product.
    type: string
    default: any
  - name: sources_now
    description: Roughly how many sources you already have (in folders, downloads, an old library or a document), so migration can be planned. 0 if starting fresh.
    type: number
    default: 0
  - name: citation_style
    description: The citation style required, for example "APA 7", "Chicago author-date", "IEEE" or "the department's own style".
    type: string
    default: the style your department or target journal requires
output_contract:
  format: markdown
  sections: [Structure, Tags, Naming and keys, Adding sources, Reading and annotation, Citing while writing, Backup and sync, Migrating what you have, Weekly habits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reference library that works in year one often collapses by year three: folders that mix chapters and themes, a tag list with "climate", "Climate" and "climate change" side by side, PDFs named "download (14).pdf", notes trapped in PDF margins that cannot be searched, duplicate entries with different metadata, and a bibliography that breaks the week before submission. A durable setup uses few folders, a small controlled tag vocabulary, consistent file names and citation keys, a reading-status workflow, one summary note per source, clean metadata at import, and a backup that does not depend on the tool's own sync.
</context>

<task>
Set up a reference library for: {{project}}
Reference manager: {{tool}}. Sources already collected: {{sources_now}}. Citation style: {{citation_style}}.

1. Structure: choose between folders by thesis chapter or project strand and tags for everything else, and explain the choice. Keep folders few and stable; one source can sit in several collections without duplicating it.
2. Tags: a controlled vocabulary in a few families (theme, method, source type, reading status, use such as "cite-in-ch2"), with spelling rules (lowercase, hyphens, singular) and a rule for adding new tags.
3. Naming and keys: a PDF file naming pattern (for example FirstAuthor_Year_ShortTitle) and a citation key pattern that stays stable, and how to set the tool to apply them automatically if it can.
4. Adding sources: import from identifiers (DOI, ISBN) or database exports rather than typing, then a quick metadata check (author names, year, title case, journal, page range, DOI), and duplicate merging.
5. Reading and annotation: a reading-status workflow (to read, skimmed, read, cited); a highlight colour code with at most four meanings; and a one-paragraph summary note per source using a fixed template (claim, method, evidence, relevance to my project, quotes with page numbers).
6. Citing while writing: how to connect the library to the way this project is written (a word processor plugin, an automatically updated .bib file for LaTeX or Markdown), setting {{citation_style}}, and checking the bibliography against the style guide before submission.
7. Backup and sync: the tool's sync plus an independent backup (a regular export of the library and the attachments folder to a second location), and a test restore.
8. Migrating what you have: a plan for the {{sources_now}} existing sources in batches, starting with the ones cited in current drafts. Skip this if there are none.
9. Weekly habits: a ten-minute weekly routine that keeps the library clean.
10. Before you answer, check that every recommendation names a feature rather than a menu path you are not sure of.
</task>

<constraints>
- Do not recommend or rank reference manager products. If {{tool}} is "any", describe the features to look for (identifier import, a word processor or BibTeX integration, PDF annotation, groups for sharing, export formats) and write the setup in terms of those features.
- If a specific tool is named, adapt to its terms, but say "check the current documentation" for anything version-specific rather than inventing menu paths or settings.
- Keep the system light enough to keep up with; do not create more than about ten folders or thirty tags to start.
- If the writing tool or style is unknown, give the setup for the common options and mark the choice for the user.
</constraints>

<output_format>
Markdown with the sections in the output contract. Tags as a table (Family | Tags | Rule). The summary note template in a code block. Weekly habits as a short checklist.
</output_format>
