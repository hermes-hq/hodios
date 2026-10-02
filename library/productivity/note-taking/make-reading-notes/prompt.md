---
schema: 1
id: make-reading-notes
kind: prompt
title: Make reading notes
description: Turns highlights from an article or book into atomic, linkable notes written as claims in plain words, with source references, link suggestions and prompts for the reader's own takeaways.
category: note-taking
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, researcher, writer]
stack: [obsidian, notion]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
tags: [zettelkasten, evergreen-notes, highlights, personal-knowledge-base]
pairs_with:
  prompts: [summarize-book]
args:
  - name: highlights
    description: Your highlights and any comments you wrote, plus the title, author and, if you have them, page or location numbers.
    type: text
    required: true
  - name: app
    description: Optional - the notes app you use, such as Obsidian, Logseq, Notion or plain Markdown, so links and metadata fit it.
    type: string
output_contract:
  format: markdown
  sections: [Notes, Map note, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Highlights on their own are rarely reread. Notes become useful when each one holds a single idea, is written in the reader's own words, has a title that states the idea as a claim, and links to related notes, so it can be found and reused later. The reader's own reaction is what makes a note theirs, so you prompt for it instead of inventing it.

<highlights>
{{highlights}}
</highlights>
{{#app}}
Notes app: {{app}}
{{/app}}
</context>

<task>
1. If the highlights are empty or unreadable, ask for them and stop. If the source title or author is missing, use "Source: unknown" and mention it once at the end.
2. Group highlights that express the same idea. Drop ones that are only colour or repetition.
3. Write one note per idea:
   - Title: a short complete claim ("Spacing practice beats cramming for long-term recall"), not a topic ("Spacing").
   - Body: the idea in plain words, at most about 120 words, explaining why it matters or how it works. Paraphrase; keep at most one short direct quote, marked as a quote, with its location if given.
   - Source: title, author and location.
   - Links: two or three suggested links to other notes from this set, and concept names that could link to the reader's existing notes, each with a few words on why.
   - My take: if the reader's own comment appears next to the highlight, rewrite it here in first person. Otherwise write one specific prompt question for the reader to answer (for example "Where in your week do you cram instead of spacing?"). Never invent the reader's opinion.
4. Write a short map note that lists all notes in a sensible order with one line each.
5. Add two or three questions that connect the ideas or challenge them.
</task>

<constraints>
- One idea per note. If a note needs "and also", split it.
- Format links and metadata for the app: wikilinks such as [[Note title]] and tags for Obsidian or Logseq, property lines for Notion, plain Markdown headings otherwise. If no app is given, use plain Markdown with [[wikilinks]].
- Keep the author's meaning; do not add claims that are not in the highlights. Mark any added context as "(added context)".
- Use the source's terminology for its key concepts so notes are searchable.
</constraints>

<output_format>
## Notes
Each note as its own block, ready to paste:
### Title as a claim
Body.
Source: ...
Links: ...
My take: ...
## Map note
## Questions for you
</output_format>
