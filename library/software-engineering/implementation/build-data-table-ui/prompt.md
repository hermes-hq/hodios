---
schema: 1
id: build-data-table-ui
kind: prompt
title: Build a sortable, filterable data table
description: Builds a data table UI with column config, sorting, filtering, pagination, row selection, URL-synced state, loading, empty and error states and keyboard support.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-grid, sorting, filtering, pagination, url-state, aria]
args:
  - name: table_spec
    description: What rows the table shows, the columns, which are sortable or filterable, row actions, and roughly how many rows exist.
    type: text
    required: true
  - name: data_source
    description: Where rows come from, for example "GET /api/users with page, sort and q params" or "array already in memory".
    type: text
output_contract:
  format: markdown
  sections: [Design, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most data tables need the same decisions and most get some wrong. Sorting and filtering in the browser works for a few thousand rows; beyond that, or when the data is paginated on the server, it silently sorts only the current page. Table state kept only in component state is lost on refresh and cannot be shared as a link. Filters that fire a request per keystroke flood the API. "Select all" is ambiguous with pagination (this page or all matching rows). Clickable `div` grids break screen readers and keyboard users, and missing empty, loading and error states make a slow or empty result look like a bug.
</context>

<task>
Build this table:

{{table_spec}}

{{#data_source}}
Data source: {{data_source}}
{{/data_source}}

1. Read the project: UI framework, component library, any existing table component or library (TanStack Table, AG Grid, MUI DataGrid), data-fetching pattern and router. Reuse what exists; do not add a table library if one is already in use.
2. Decide client-side or server-side sorting, filtering and pagination from the row count and data source, and state it. If server-side, map table state to the API's query parameters.
3. Define columns in one config: id, header, accessor, cell renderer, sortable, filter type, width hints, alignment (numbers right-aligned), and formatting for dates, money and nulls.
4. Keep sort, filters, page and page size in the URL query string so refresh, back button and shared links work. Debounce text filters (about 300 ms) and reset to page 1 when filters change.
5. Implement row selection with stable row ids, a header checkbox with indeterminate state, and an explicit choice between "select this page" and "select all N matching", shown to the user.
6. Render loading (skeleton rows or keep previous rows with a busy indicator), empty (no data vs no matches for filters, with a clear-filters action) and error (message plus retry) states.
7. Use a semantic `<table>` with `<th scope="col">`, sort controls as buttons inside headers with `aria-sort`, a caption or `aria-label`, labelled filter inputs and selection checkboxes, and visible focus. Make the table scroll horizontally on small screens instead of overflowing the page.
8. If rows can reach thousands on the client, add virtualization and say so.
9. Write tests for sorting, filtering (including URL sync), pagination, selection and each state. Run tests, type check and lint.
</task>

<constraints>
- Do not sort or filter only the current page while presenting it as the whole dataset.
- Do not use `div`-based grids with click handlers on rows as the only way to act on a row.
- Keep row actions that change data behind confirmation when they are destructive.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Client or server mode and why, column list, URL parameters, selection semantics.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
