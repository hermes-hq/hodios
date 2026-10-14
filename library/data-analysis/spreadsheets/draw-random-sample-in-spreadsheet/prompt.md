---
schema: 1
id: draw-random-sample-in-spreadsheet
kind: prompt
title: Draw a fair random sample in a spreadsheet
description: Draws random winners or an audit sample without repeats in Excel or Google Sheets, optionally weighted or stratified, then freezes and documents the draw so it cannot change on recalculation.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, marketer, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [random-selection, prize-draw, audit-sampling, stratified-sample, randarray]
pairs_with:
  prompts: [write-spreadsheet-formula, clean-messy-spreadsheet]
args:
  - name: list
    description: What you are drawing from - layout (columns, range, number of rows), whether there are duplicate entries, and any groups or weights (extra entries, regions, value bands).
    type: text
    required: true
  - name: draw
    description: What you need - how many, with or without repeats, per group quotas, reserves, and who needs to trust the result (entrants, auditors, a manager).
    type: text
    required: true
  - name: tool
    description: Excel (365, 2021 or older) or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Prepare the list, Draw formula, Freeze the result, Record of the draw, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run random draws in spreadsheets that people can defend afterwards. The common mistakes: using RANDBETWEEN for row numbers, which can pick the same row twice; leaving RAND or RANDARRAY live, so the "winners" change the next time anyone edits the sheet (and Google Sheets can recalculate them on every change); drawing before removing duplicate or ineligible entries; and having no record of how the draw was made. A clean method gives every eligible row one random key, sorts by it, takes the top n, then pastes the result as values with a timestamp. Weighted draws without repeats use the key RAND()^(1/weight) and take the largest keys. Stratified samples rank rows by key within each group and take each group's quota. For audits, systematic sampling (every k-th item from a random start) is also accepted and easy to explain. Spreadsheet random functions cannot be seeded, so reproducibility comes from freezing and saving the keys, not from re-running.
</context>

<task>
Set up the draw in {{tool}}.

<list>
{{list}}
</list>

<draw>
{{draw}}
</draw>

1. Prepare the list: steps to remove ineligible rows and collapse duplicate entries by the user's rule (one entry per person, or allowed extra entries as weights), and to count the eligible rows. Recommend doing this on a copy of the data.
2. Draw formula: the formula for this case in {{tool}}.
   - Simple draw without repeats: Excel 365 `=TAKE(SORTBY(range, RANDARRAY(ROWS(range))), n)`; Google Sheets `=ARRAY_CONSTRAIN(SORT(range, RANDARRAY(ROWS(range)), TRUE), n, COLUMNS(range))`; Excel 2021 has no TAKE, so use `=INDEX(SORTBY(range, RANDARRAY(ROWS(range))), SEQUENCE(n), SEQUENCE(1, COLUMNS(range)))`; for older Excel, a helper column of `=RAND()` pasted as values first (sorting recalculates live RAND keys, so the record would not match the order), then sort by it, or `=INDEX(range, MATCH(LARGE(helper, k), helper, 0))` for the k-th pick.
   - Weighted: helper key `=RAND()^(1/weight)`, take the n largest.
   - Stratified: helper key, then a within-group rank such as `=COUNTIFS(group_col, group, key_col, ">"&key)+1`, select where rank is at most the group's quota.
   - Systematic: interval k = eligible count / n, a random start between 1 and k, then every k-th row.
   Reserves are the next rows in the same random order.
3. Freeze the result: copy the drawn rows and the key column and paste as values only (Excel Paste Special > Values; Google Sheets Paste special > Values only), onto a new tab named with the date and time; then delete or stop the live formula.
4. Record of the draw: what to write down: date and time, who ran it, eligible count, method, the formula used, and where the frozen keys are stored. For a public prize draw, suggest running it with a witness or screen recording.
5. Check: confirm no duplicates among winners, counts per group match quotas, and every winner is in the eligible list.
</task>

<constraints>
- Use only functions available in the stated version; give the older-Excel route if the version is unclear.
- Never use RANDBETWEEN on row numbers for draws without repeats.
- Do not call the method certified or compliant; prize draws and audit sampling may be governed by rules (competition law, audit standards) the user must check.
- Do not choose a sample size for statistical inference; if asked, say it depends on confidence, tolerable error and population, and suggest an auditor or statistician.
</constraints>

<output_format>
## Prepare the list
## Draw formula
Code block with the exact formula and the cell it goes in, then a line on how it works.
## Freeze the result
## Record of the draw
A short template the user fills in.
## Check
</output_format>
