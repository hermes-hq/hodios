---
schema: 1
id: write-markdown-slide-deck
kind: prompt
title: Write a slide deck in Markdown
description: Writes a deck as Markdown source for a slide tool such as Marp, Slidev, reveal.js or Quarto, with front matter, slide separators, speaker notes and code or image placeholders.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, developer-advocate, researcher, teacher]
stack: [markdown]
requires: [none]
inputs: [notes, document]
output: [code, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [marp, slidev, reveal-js, quarto, slides-as-code, tech-talk]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, outline-tech-talk-with-live-demo]
  personas: [presentation-designer]
args:
  - name: content
    description: The outline or notes for the talk, slide by slide if you have it.
    type: text
    required: true
  - name: tool
    description: The Markdown slide tool you will render with.
    type: enum
    enum: [marp, slidev, reveal-js, quarto, unsure]
    default: unsure
  - name: needs
    description: Anything special such as code highlighting, maths, two-column layouts, a theme name or 16:9 ratio. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Tool and assumptions, Deck source, What to check when rendering]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write slide decks as Markdown source for slides-as-code tools. These tools are popular with developers and academics because decks live in version control, diff cleanly and reuse code snippets. Their syntax differs in details that break rendering: Marp uses front matter with `marp: true` and `---` between slides, with speaker notes in HTML comments; Slidev uses `---` separators with optional per-slide front matter, layouts, and notes in a trailing HTML comment; reveal.js Markdown typically uses `---` for horizontal slides and a configured separator for vertical ones, with notes after a `Note:` line; Quarto revealjs uses `##` headings to start slides and `::: {.notes}` blocks. Features such as columns, fragments and themes are tool-specific and version-dependent, so when you use one you say so. Good slides still follow the basics: an assertion title per slide, little text, and code samples short enough to read from the back of the room (about 10 to 15 lines).

<content>
{{content}}
</content>

Tool: {{tool}}
{{#needs}}Needs: {{needs}}{{/needs}}
</context>

<task>
1. If {{tool}} is unsure, recommend one in a sentence based on the needs (for example Marp for simple decks and PDF export, Slidev for code-heavy developer talks, Quarto for academic work with maths and citations, reveal.js for web-hosted decks) and write the deck for it.
2. State the assumptions: tool, aspect ratio, theme, and any feature you rely on that depends on the tool version or a plugin.
3. Write the complete deck source in one fenced Markdown block with valid front matter, correct slide separators for the chosen tool, assertion-style titles, short bullets, and speaker notes in the tool's notes syntax.
4. Keep code blocks short with a language tag for highlighting; split long code across slides or show only the relevant lines. Use image placeholders with descriptive alt text, such as `![Architecture diagram: three services behind a gateway](images/architecture.png)`, and never invent image URLs.
5. List what to check when rendering: separators, notes showing in presenter view only, code overflowing the slide, fonts and export to PDF.
</task>

<constraints>
- Use only the syntax of the chosen tool; do not mix conventions from different tools in one file.
- Do not invent content beyond the outline; put [add detail] where the notes are thin.
- No external URLs, remote scripts or embedded tracking; reference local image paths only.
</constraints>

<output_format>
## Tool and assumptions
Bullets.

## Deck source
One fenced block containing the whole deck.

## What to check when rendering
Checklist.
</output_format>
