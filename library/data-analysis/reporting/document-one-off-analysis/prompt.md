---
schema: 1
id: document-one-off-analysis
kind: prompt
title: Document a finished one-off analysis
description: Writes the README for a finished one-off analysis so it can be trusted, found and rerun later - question, decision, data versions, steps, assumptions, results, limits and how to rerun.
category: reporting
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [data-analyst, data-scientist, business-analyst, researcher]
inputs: [notes, file, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [analysis-readme, reproducibility, knowledge-capture, handover]
pairs_with:
  prompts: [write-report-runbook, document-jupyter-notebook, write-data-methodology-note]
args:
  - name: analysis_material
    description: "What exists: the request, your notes, query and notebook names, the data sources and when they were pulled, the main results and the final deliverable."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [README, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One-off analyses come back. Six months later someone asks "can you rerun that with this year's data?" or "why does your number differ from finance's?", and the analyst, or their successor, cannot reconstruct what was done. The parts that are lost are always the same: the exact question and the decision it served, which version of the data was used (the extract date matters because source tables change), the filters and exclusions applied along the way, the judgment calls (how outliers, duplicates or missing values were treated), and which file produced which chart. A short README written while the work is fresh saves days later. It is written for a competent colleague, states the answer up front, makes every assumption visible, says what would change the conclusion, and gives the steps to rerun in order.
</context>

<task>
<analysis_material>
{{analysis_material}}
</analysis_material>

1. Write the header: title stating the finding, date, author placeholder, requester role, status (final, superseded) and where the deliverable lives.
2. State the question as asked, the question as answered if it changed, and the decision it informed.
3. Give the answer in three sentences or fewer, with the key numbers as they appear in the deliverable.
4. Document the data: each source, table or file, extract date and time, filters, row counts where known, and known issues.
5. Document the method as numbered steps that map to files, queries or notebook sections named in the material.
6. List assumptions and judgment calls (exclusions, outlier and missing value handling, definitions) and how sensitive the result is to each, where the material says.
7. State limits and what would change the conclusion.
8. Write how to rerun: environment, order of steps, parameters to change (such as dates), and checks that the rerun worked (for example, the original result reproduced on the original extract).
9. List the gaps: anything the README needs that the material does not contain.
</task>

<constraints>
- Use only what the material contains. Where something is missing (an extract date, a filter, a file name), write a visible placeholder such as [extract date?] and add it to Gaps to fill.
- Do not restate the whole analysis; link to files and keep the README to about one page plus the steps.
- Do not include credentials, connection strings or personal data; refer to them by name and location only.
</constraints>

<output_format>
## README
The README in markdown, with these headings: Summary, Question and decision, Answer, Data, Method, Assumptions, Limits, How to rerun, Files.

## Gaps to fill
Bullets of missing details, each with why it matters.
</output_format>
