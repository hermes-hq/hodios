---
schema: 1
id: build-search-and-filter-sheet
kind: prompt
title: Build a search and filter sheet
description: Builds a search page in Excel or Google Sheets where users type a word or pick dropdowns and a FILTER-based results list updates instantly, without touching or sorting the source data.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, data-analyst, business-analyst, individual]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [search-box, filter-function, dropdown-criteria, lookup-page, dynamic-arrays]
pairs_with:
  prompts: [set-up-data-validation, write-spreadsheet-formula, build-sheets-dashboard]
args:
  - name: data
    description: The source table - sheet name, columns with types, number of rows and how it grows, and sample rows.
    type: text
    required: true
  - name: criteria
    description: What users should be able to search or pick - free-text search on which columns, dropdowns for which fields, date or number ranges, sort order, which columns to show in results.
    type: text
    required: true
  - name: tool
    description: Excel 365, Excel 2019 or older, or Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Layout, Criteria cells, Results formula, Dropdown lists, Edge cases, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build search pages in spreadsheets so people can find rows without filtering, sorting or breaking the shared data. The core is one FILTER formula whose conditions each read a criteria cell and switch themselves off when that cell is blank or set to "All". Conditions combine with `*` for AND and `+` for OR; a blank-means-everything condition is written `((crit="") + (condition))>0` so it stays the same size as the data, which Google Sheets FILTER requires. Free-text search uses `ISNUMBER(SEARCH(text, column))`, which is case-insensitive; searching several columns at once means searching their concatenation joined with a separator. Excel FILTER takes a third argument for "no results"; in Google Sheets an empty FILTER returns #N/A and needs IFNA. Open-ended ranges in Google Sheets (A2:A) include blank rows, so add a not-blank condition. Dropdown lists should come from UNIQUE of the data so they stay current. Excel 2019 and older have no FILTER; the fallback is AutoFilter, Advanced Filter, or helper columns with INDEX and AGGREGATE.
</context>

<task>
Build the search sheet in {{tool}}.

<data>
{{data}}
</data>

<criteria>
{{criteria}}
</criteria>

1. Layout: a Search tab, separate from the data, with labelled criteria cells at the top, a results count, a "clear criteria" note, and the results below. Point the formulas at the source as an Excel Table (structured references) or a bounded or open-ended range in Google Sheets.
2. Criteria cells: each input with its type (free text, dropdown with "All", date from and to, minimum and maximum) and a name for it (named ranges such as `SearchText`, `PickRegion`), so formulas read clearly.
3. Results formula: one formula in the results cell, with each condition from the criteria and the user's sort order, for example in Excel 365:
   `=SORT(FILTER(Data[[Date]:[Amount]], ((SearchText="")+ISNUMBER(SEARCH(SearchText, Data[Customer]&" "&Data[Notes])))*((PickRegion="All")+(Data[Region]=PickRegion))*((FromDate="")+(Data[Date]>=FromDate)), "No matches"), 1, -1)`
   and the Google Sheets version with IFNA and a not-blank condition. Use the user's actual columns. Show only the columns they asked for (CHOOSECOLS, or a column array in the FILTER range).
4. Dropdown lists: a Lists tab with `=SORT(UNIQUE(...))` per field plus "All" at the top, and data validation pointing at the spilled list (Excel `=Lists!A2#` style reference; Google Sheets a dropdown from a range).
5. Edge cases: blank criteria, text that matches nothing, numbers stored as text, dates entered as text, a criteria value with trailing spaces, new rows added to the data, and the results area colliding with content below it (#SPILL! in Excel). For older Excel, give the Advanced Filter or helper-column fallback instead.
6. Test: three searches the user runs with expected counts, using the sample rows.
</task>

<constraints>
- Use only functions in the stated version; do not give FILTER, SORT, UNIQUE or CHOOSECOLS for Excel 2019 or older.
- Do not let the search sheet edit, sort or filter the source data.
- Keep one results formula rather than one per row, unless the version requires helper columns.
- Avoid full-column references in Excel for performance; use a Table.
- Explain each condition in one line so the user can add another later.
</constraints>

<output_format>
## Layout
A small grid sketch of the Search tab.
## Criteria cells
Table: Cell or name | Input type | Allowed values.
## Results formula
Code block, then a line per condition.
## Dropdown lists
## Edge cases
## Test
Table: Search | Expected rows.
</output_format>
