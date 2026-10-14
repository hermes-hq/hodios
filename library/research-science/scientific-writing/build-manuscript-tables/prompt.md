---
schema: 1
id: build-manuscript-tables
kind: prompt
title: Build publication-ready manuscript tables
description: Builds publication-ready manuscript tables such as baseline characteristics and regression results, with clear titles, units, consistent decimals, footnotes and the journal's table style.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [manuscript-tables, table-one, regression-table, apa-style, journal-submission]
pairs_with:
  prompts: [write-results-section, report-statistical-results, design-scientific-figures]
  personas: [statistician]
args:
  - name: data
    description: The numbers to tabulate (summary statistics, model output, counts), what each table should show, and the variables with their units.
    type: text
    required: true
  - name: style
    description: Optional. The journal or style guide for tables, for example "APA 7", "AMA", or "Lancet style", and any limit on the number of tables.
    type: string
output_contract:
  format: markdown
  sections: [Tables, Footnotes and abbreviations, Consistency checks, Decisions and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tables are often what statistical reviewers read first. Good tables are self-contained: a title that says what, who and when; column headings with units; consistent decimal places by variable type (percentages to one decimal, p values by the style's rules); n per group in the header; abbreviations and the statistics used defined in footnotes; and missing data shown, not hidden. Conventions to know: a baseline characteristics table in a randomised trial should not include p values for between-group differences (CONSORT advises against them, since differences are due to chance); regression tables should say whether coefficients are unadjusted or adjusted and list the adjustment set in a footnote, report the reference category, and give confidence intervals rather than only standard errors or stars; mean (SD) for roughly symmetric variables and median (IQR) for skewed ones. Common failures are copying software output with every column, mixing decimals, and tables that duplicate the text.
</context>

<task>
Build the tables from:
<data>
{{data}}
</data>
{{#style}}
Style: {{style}}
{{/style}}

1. Decide how many tables are needed and what each shows; suggest moving any table that duplicates the text or a figure to supplementary material.
2. For each table, write a numbered title, then the table in Markdown with column headings including units and group sizes.
3. Apply consistent formatting: summary statistic type per variable, decimals, how categories are listed (indented under the variable), reference categories marked, confidence intervals in a consistent format.
4. Add footnotes: abbreviations, statistics used, adjustment variables, missing data per variable, and symbols.
5. Check the numbers: percentages against counts and denominators, group totals against the overall N, CIs containing the estimate.
6. List decisions you made and anything the author must confirm.
</task>

<constraints>
- Use only the numbers given. Do not compute new statistics except percentages from given counts, and label those as computed.
- Do not add p values to a randomised trial's baseline table; explain why if the author asked for them.
- Do not use asterisks for significance unless the style requires them; prefer exact p or CIs.
- If the style is unknown, use a neutral style compatible with APA and medical journals, and name it.
</constraints>

<output_format>
## Tables
Each table with its numbered title, in Markdown.
## Footnotes and abbreviations
Footnotes per table.
## Consistency checks
Each check and its result; problems first.
## Decisions and questions
Bullets.
</output_format>
