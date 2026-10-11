---
schema: 1
id: document-jupyter-notebook
kind: prompt
title: Document a Jupyter notebook
description: Adds a summary, section headings, explanations, stated assumptions and conclusions to a Jupyter notebook so a colleague can follow its reasoning and rerun it top to bottom.
category: docs
version: 1.0.0
status: incubating
stage: [build, review]
role: [data-scientist, data-analyst, researcher]
stack: [jupyter]
requires: [repo-read, file-write]
inputs: [file]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [markdown-cells, analysis-narrative, rerunnable]
pairs_with:
  prompts: [convert-notebook-to-pipeline, write-reproducibility-readme]
args:
  - name: notebook
    description: Path to the notebook.
    type: string
    required: true
  - name: audience
    description: Who will read it, for example "analysts on the growth team" or "a reviewer checking the method".
    type: string
    default: a colleague who knows the domain but not this analysis
output_contract:
  format: markdown
  sections: [Changes made, Rerun issues, Questions for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notebooks are written as a conversation with oneself: cells run out of order, variables named `df2`, filters applied without saying why, and the conclusion lives in the author's head. A documented notebook reads top to bottom: a header with the question, data sources and date, a short summary of findings, a setup section with parameters in one place, headed sections that each say what they do and why, an explanation of each non-obvious transformation (filters, joins, exclusions, imputation), and markdown that interprets each key chart or table rather than repeating it. Hidden state is the main rerun killer: cells that depend on a variable defined in a deleted cell, execution counts out of order, hard-coded local paths, and outputs that were produced by an earlier version of the code.
</context>

<task>
Document the notebook at `{{notebook}}` for {{audience}}.

1. Read every cell and its saved output. Note the execution order, data sources, parameters, filters, joins and the charts or tables that carry the conclusions.
2. Add a header cell: title, question being answered, data sources with dates, author placeholder, and how to run it.
3. Add a "Summary" cell with the key findings, based only on the saved outputs, and clearly marked as to confirm by the author if outputs look stale.
4. Add section headings that follow the analysis steps, and a short markdown cell before each section saying what it does and why.
5. Before each non-obvious transformation, explain the choice (what is excluded and why, how missing values are handled).
6. After each key chart or table, add an interpretation and its caveats.
7. Add an "Assumptions and limitations" cell and a "Next steps" cell if the analysis implies them.
8. Do not change code cells, except to add brief comments; report rerun problems (out-of-order execution, hidden state, local paths) instead of fixing them silently.
</task>

<constraints>
- Every claim in markdown must match the code and the saved outputs. Do not state findings the outputs do not show.
- Do not rename variables, reorder cells or change logic.
- Keep markdown concise; avoid repeating what a chart already shows.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Edit the notebook. Then reply with:
## Changes made
Cells added, by section.
## Rerun issues
Out-of-order execution, hidden state, local paths or stale outputs, with cell numbers. Write "None" if there are none.
## Questions for the author
Choices you could not explain from the notebook.
</output_format>
