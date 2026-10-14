---
schema: 1
id: write-beamer-slides
kind: prompt
title: Write LaTeX Beamer slides
description: Writes a compilable LaTeX Beamer presentation with a clean theme, sensible overlays, equations, figures, tables and a bibliography, for academic and technical talks.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student, teacher, data-scientist]
stack: [latex]
requires: [none]
inputs: [notes, document]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [beamer, academic-talk, overlays, bibliography, equations, slides-as-code]
pairs_with:
  prompts: [build-thesis-defence-slides, write-latex-table, write-markdown-slide-deck, outline-presentation]
  personas: [presentation-designer]
args:
  - name: content
    description: The talk outline or notes, slide by slide if you have it, including equations, figures (file names) and citations (BibTeX keys).
    type: text
    required: true
  - name: setting
    description: Talk type and length, such as a 15-minute conference talk, a seminar or a lecture, and the language.
    type: text
    required: true
  - name: requirements
    description: Anything fixed, such as an institution theme, aspect ratio, engine (pdfLaTeX, XeLaTeX, LuaLaTeX), handout version or Overleaf. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Source, Build and check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Beamer decks that compile first time and read well from the back of a lecture hall. Common Beamer problems: copying paper text onto slides, the default theme's navigation symbols and crowded headlines, overlays on every bullet that slow the talk, `\pause` inside environments where it misbehaves, verbatim code in a frame without `[fragile]`, figures sized in absolute units that overflow, and citations that print a full bibliography line on the slide. Experts use 16:9 (`aspectratio=169`) unless told otherwise, a restrained theme (for example `metropolis` if available, or `default` with navigation symbols removed), one message per frame with a sentence title, overlays only where order matters (`<+->`, `\only`, `\alert<2>`), figures scaled to `\textwidth` or `\textheight`, short author-year citations on the slide with the full list in a final frame, and `\appendix` with backup frames after the conclusion. A `handout` class option builds a printable version without overlays.

<content>
{{content}}
</content>
Setting: {{setting}}
{{#requirements}}Requirements: {{requirements}}{{/requirements}}
</context>

<task>
1. State assumptions: engine, theme, aspect ratio, bibliography tool (biblatex with biber, or natbib with BibTeX), and packages used. Use only widely available packages.
2. Plan the frames to fit the time (roughly one frame per minute for a talk, fewer for dense maths) and say the count.
3. Write the full source: preamble, title frame, optional outline frame only for talks over 20 minutes, content frames with sentence titles, conclusion frame with the take-home message, references frame, and an appendix with backup frames if the content suggests likely questions.
4. Use overlays only where step-by-step reveal helps, and mark `[fragile]` on any frame with verbatim or listings.
5. Put figures with `\includegraphics[width=...\textwidth]` using the given file names, and leave a clearly marked placeholder where a figure is mentioned but not named.
6. Add speaker notes with `\note{}` when the content includes things to say rather than show.
7. Give the compile commands and a short check list.
</task>

<constraints>
- The source must compile with a standard TeX Live or Overleaf setup; do not use obscure packages or invent package options.
- Do not invent citations, BibTeX keys, results or numbers; use placeholders such as `\cite{TODO}` and list them.
- Keep text on frames short; move paper-style paragraphs into `\note{}`.
- Escape special characters (%, &, _, #) in text.
</constraints>

<output_format>
## Assumptions
Bullets.

## Source
One `latex` code block with the complete .tex file.

## Build and check
Compile commands, the handout option, and a list of placeholders to fill.
</output_format>
