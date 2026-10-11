---
schema: 1
id: write-latex-table
kind: prompt
title: Write a publication-quality LaTeX table
description: Writes clean LaTeX table code with booktabs rules, number alignment, merged cells, notes and a caption from data or a pasted table, sized to fit the page or column.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [dataset, text]
output: [code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
stack: [latex]
tags: [latex-tables, booktabs, siunitx, journal-templates, thesis]
pairs_with:
  prompts: [build-manuscript-tables, debug-latex-errors]
args:
  - name: table
    description: The data or table to typeset (pasted from a spreadsheet, CSV or software output), the caption, and which columns are numbers, text or estimates with intervals.
    type: text
    required: true
  - name: setting
    description: Optional. Document class or journal template, one- or two-column layout, packages you can or cannot use, and whether it must fit a column, the page width or landscape.
    type: text
output_contract:
  format: markdown
  sections: [Preamble, Table code, Layout choices, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good LaTeX tables follow typographic conventions that many templates and default habits break: no vertical rules and few horizontal ones (booktabs \toprule, \midrule, \bottomrule, and \cmidrule for grouped headers); numbers aligned on the decimal point (siunitx S columns, or dcolumn), with units in headers rather than cells; caption above the table for most journals; notes below with threeparttable or a simple footnote line; and width controlled with tabularx, column spacing or a smaller font, rather than \resizebox, which scales fonts inconsistently. Wide tables can go in a two-column span (table*) or landscape. Common errors: special characters (%, &, _, $, #) not escaped; < and > typed in text, which print as ¡ and ¿ under the default OT1 font encoding (use $<$ or \textless, or load fontenc with T1); text or dashes in siunitx S columns not wrapped in braces; a mismatch between the number of columns and the column specification, multirow cells overlapping rules, and journal templates that forbid certain packages.
</context>

<task>
Write the LaTeX for this table.
<table>
{{table}}
</table>
{{#setting}}
Setting: {{setting}}
{{/setting}}

1. Decide the column types: text left-aligned, numbers decimal-aligned, estimates with intervals in a format that aligns (for example separate columns or a fixed format), and say why.
2. List the packages needed with their purpose; if the setting forbids one, use an alternative.
3. Write the table environment with caption and label, booktabs rules, grouped headers with \cmidrule where useful, multirow or multicolumn only where needed, and units in headers.
4. Escape special characters, keep the numbers exactly as given, and use consistent decimals only if the author asks.
5. Add notes for abbreviations and symbols below the table.
6. Make it fit: estimate the width and choose tabularx, reduced \tabcolsep, \small, table* or landscape as appropriate, avoiding \resizebox unless the author insists.
7. Check that every row has the right number of cells.
</task>

<constraints>
- Do not change, round or reorder values unless asked; flag apparent errors instead.
- Use only standard, widely available packages and name each one.
- No vertical rules unless the template or author requires them.
- If the data is ambiguous (merged headers, missing cells), show your assumption in a comment in the code.
</constraints>

<output_format>
## Preamble
A code block with the \usepackage lines and a comment per package.
## Table code
A complete code block that compiles with that preamble.
## Layout choices
Bullets explaining alignment, width and placement.
## Checks
Cell counts per row and any flagged data issues.
</output_format>
