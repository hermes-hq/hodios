---
schema: 1
id: debug-latex-errors
kind: prompt
title: Debug LaTeX compilation errors and warnings
description: Diagnoses LaTeX compilation errors and warnings from the log and source, explains the real cause, which is often lines above the reported one, and gives the minimal fix.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [logs, file, text]
output: [explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
stack: [latex]
tags: [latex-errors, compile-log, overfull-hbox, bibliography-errors, thesis]
pairs_with:
  prompts: [write-latex-table, clean-bibtex-file]
args:
  - name: log
    description: The relevant part of the .log file or the error output, starting a few lines before the first error, and the engine used (pdfLaTeX, XeLaTeX, LuaLaTeX) and bibliography tool (BibTeX or Biber).
    type: text
    required: true
  - name: source
    description: Optional. The lines of the .tex source around the reported line number, and the preamble if packages may be involved.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Fixes, Warnings worth fixing, If it still fails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
LaTeX error messages are notoriously misleading. The first error is the one that matters; later errors often cascade from it. The reported line is where TeX noticed the problem, not always where it is: a missing closing brace or an unclosed environment can be reported many lines later or at the end of the document ("Runaway argument", "File ended while scanning use of", "\begin{itemize} on input line 12 ended by \end{document}"). Frequent causes: special characters (%, &, _, #, $) unescaped in text or in bibliography fields; math commands outside math mode ("Missing $ inserted"); a package option clash or two packages loading incompatible versions; Unicode characters pdfLaTeX has no definition for ("Unicode character ... not set up for use with LaTeX"); a stale auxiliary file after a package change, fixed by deleting the .aux, .bbl and related files and recompiling; running BibTeX when the document uses biblatex with Biber; and "undefined references" that only need another compile run. Warnings such as overfull boxes and undefined citations do not stop compilation but show up in the PDF.
</context>

<task>
Diagnose this LaTeX failure.
<log>
{{log}}
</log>
{{#source}}
<source>
{{source}}
</source>
{{/source}}

1. Find the first real error in the log and quote it with its line number. Say which later messages are likely cascades.
2. Explain in plain words what TeX was doing when it failed and the most likely cause, and where in the source the cause probably is (which may be above the reported line).
3. Give the minimal fix as a before-and-after code snippet. If several causes are plausible, rank them and say how to tell them apart.
4. If the fix involves the build (engine, BibTeX versus Biber, stale auxiliary files, compile order), give the steps in order.
5. List warnings in the log that will affect the PDF (undefined references or citations, overfull boxes beyond a few points, missing fonts or characters) with a fix for each.
6. If the log does not contain enough to diagnose, say exactly which lines or files to paste.
</task>

<constraints>
- Change the minimum: do not rewrite the preamble or swap packages unless that is the cause.
- Do not suggest suppressing errors (for example batch or nonstop mode, or silencing warnings) as a fix.
- Do not guess package behaviour you are unsure of; say it should be checked in the package documentation.
- Tell the user to keep a copy before deleting auxiliary files; never suggest deleting .tex, .bib or image files.
</constraints>

<output_format>
## Diagnosis
The first error quoted, the cause and where it is.
## Fixes
Ranked fixes with before-and-after code blocks and build steps.
## Warnings worth fixing
Bullets, or "None".
## If it still fails
What to paste next.
</output_format>
