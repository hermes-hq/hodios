---
schema: 1
id: write-data-analysis-prompt
kind: prompt
title: Write a data analysis prompt
description: Writes a prompt for an assistant with code execution to analyse an uploaded CSV or spreadsheet correctly - inspect first, state assumptions, show code, reconcile totals, flag dirty data.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [data-analyst, business-analyst, operations-manager, individual]
requires: [none]
inputs: [text, dataset]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [code-interpreter, csv-analysis, data-quality, reproducibility, reusable-prompt]
pairs_with:
  prompts: [explore-dataset, write-spreadsheet-ai-prompts, build-ai-output-review-checklist]
  personas: [prompt-engineer]
args:
  - name: question
    description: What you want to learn from the data and what decision it feeds, for example "which product lines lost margin last quarter, for the pricing review".
    type: text
    required: true
  - name: data_description
    description: What the file is - columns and their meaning, rows per what (order, customer, day), date range, source system and any known quirks. Paste the header row and five sample rows with personal data removed.
    type: text
    required: true
  - name: known_totals
    description: Optional figures you already trust (total revenue for the period, row count from the source system) so the analysis can be reconciled against them.
    type: text
output_contract:
  format: markdown
  sections: [Data risks, Prompt, Reconciliation checks, Reading the result]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts for chat assistants that can run code on an uploaded file. Asked "analyse this", they usually jump straight to a chart and a confident paragraph. The common failures are quiet: the header row is misread or a second header sits mid-file, numbers stored as text with thousands separators or currency symbols are dropped, European dates are parsed as US dates, totals rows and subtotals are double counted, duplicates and returns are summed as sales, blanks are treated as zero, a filter applied in step two silently carries into step five, and the written summary quotes numbers the code never produced. A good analysis prompt makes the assistant inspect before analysing, state the unit of a row and every assumption, show the code, reconcile against figures the user trusts, and separate what the data shows from what it suggests.

Question: {{question}}

<data_description>
{{data_description}}
</data_description>
{{#known_totals}}

Known totals: {{known_totals}}
{{/known_totals}}
</context>

<task>
1. Read the data description and list the specific risks in this file: parsing (dates, decimals, currency, text numbers), structure (multiple header rows, totals rows, merged cells, several tables on one sheet), meaning (what one row is, refunds or cancellations, duplicates, test records) and coverage (missing periods, partial months). If the question or the unit of a row is unclear, ask up to three questions and stop.
2. Write the prompt, ready to paste with the file attached. It must tell the assistant to: (a) load the file with code and report row count, column names, types, date range, blanks per column and a few sample rows before any analysis; (b) state what one row represents and list every assumption and cleaning step, with the number of rows each step removes or changes; (c) answer the question with code shown for each step, keeping the filtered dataset explicit; (d) only quote numbers that appear in code output; (e) reconcile against known totals or say none were given; (f) end with findings, caveats, and what the data cannot tell.
3. Include stop rules: if parsing fails, totals do not reconcile within a stated tolerance, or more than a set share of rows is dropped, the assistant must stop and report instead of continuing.
4. Write reconciliation checks the user can run on the answer: row counts before and after each step, a total that matches the source, a hand-checked example row, and a re-run of the key figure in a second way (pivot versus code, for example).
5. Explain how to read the result: which parts to trust, which to verify in the source system, and the follow-up questions to ask next.
</task>

<constraints>
- Do not invent column meanings, business rules or totals; mark assumptions as such in the prompt and ask the user to confirm them.
- Keep the prompt tool-agnostic: any assistant with a code sandbox, with no feature names tied to one vendor.
- Remind the user to remove or mask personal and confidential data before uploading, and to check their organisation's rules on uploading company data to an AI tool.
- Correlation must not be presented as cause; the prompt says so.
- Keep the written prompt under about 450 words.
</constraints>

<output_format>
## Data risks
Bullets specific to this file.
## Prompt
In a fenced code block, with [QUESTION] and any other variable parts as placeholders.
## Reconciliation checks
Numbered checklist.
## Reading the result
Short bullets.
</output_format>
