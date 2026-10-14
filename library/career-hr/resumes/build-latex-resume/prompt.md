---
schema: 1
id: build-latex-resume
kind: prompt
title: Build a LaTeX resume
description: Builds a clean, compilable LaTeX resume from your content using only standard packages, laid out so applicant tracking systems can still read the PDF, with notes on compiling and checking it.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
stack: [latex]
tags: [typeset-resume, ats-safe-pdf, resume-template, pdf-resume]
pairs_with:
  prompts: [check-resume-ats-readiness, proofread-resume-consistency, debug-latex-errors]
args:
  - name: content
    description: The finished resume text - contact details or placeholders, sections, roles with dates and bullets, education, skills. Content should be final; this step handles layout.
    type: text
    required: true
  - name: preferences
    description: Page size (A4 or US letter), page limit, font or style preferences, one or two columns, accent colour, and whether you compile locally or in an online editor. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Layout decisions, LaTeX source, Compile and check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You typeset resumes in LaTeX and know where LaTeX resumes go wrong. Many popular templates look good but cause problems: two-column layouts and tables that tracking systems read in the wrong order; icons from font packages that extract as garbage characters; ligatures (fi, fl) and some fonts that extract as broken words; custom document classes or obscure packages that fail to compile elsewhere; header text placed with absolute positioning that parsers skip; and text drawn as graphics. Safer practice: a single-column layout in the standard article class; a small set of common packages (geometry for margins, enumitem for list spacing, titlesec for headings, hyperref for links, and font packages only if widely available); glyph-to-Unicode mapping for the PDF so copied text is clean (for pdfLaTeX, fontenc with T1 plus the glyphtounicode mapping turned on with \pdfgentounicode=1, so ligatures and accented letters copy out as normal text; or compiling with XeLaTeX or LuaLaTeX with a standard font); plain-text contact details rather than icons; and simple, reusable commands for role headers so the source stays maintainable. The final check is always to copy all text out of the PDF and see that it reads in the right order.

<content>
{{content}}
</content>
{{#preferences}}
<preferences>
{{preferences}}
</preferences>
{{/preferences}}
</context>

<task>
1. Layout decisions: state page size, margins, font approach, compiler, and section order, with one line on why each is safe for parsing.
2. Write one complete, compilable .tex file: preamble with standard packages only; small custom commands for a role header (title, employer, location, dates) and for bullet lists; all the person's content placed in the right sections; links with readable text. Comment the preamble briefly so the person can adjust spacing and fonts.
3. Escape LaTeX special characters in the content (such as percent, ampersand, dollar, hash and underscore) correctly.
4. Compile and check: how to compile (locally or in an online editor), how to fix the two or three most likely errors, how to bring it onto the page limit by adjusting spacing, and the copy-paste text check for parsing.
</task>

<constraints>
- Do not change, add or remove content; layout only. If content will not fit the page limit, say so instead of cutting it silently.
- Use only widely available packages from a standard TeX distribution; no custom class files, no font icon packages, no shell escape.
- Single column unless the person insists; if they do, explain the parsing risk.
- The file must compile as given; avoid untested macros.
</constraints>

<output_format>
## Layout decisions
## LaTeX source
## Compile and check
</output_format>
