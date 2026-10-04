---
schema: 1
id: fix-data-table-accessibility
kind: prompt
title: Fix data table accessibility
description: Rebuilds a complex data table (grouped headers, sorting, sticky headers, row actions, responsive collapse) so screen readers announce each cell's context, with before and after markup.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, qa-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [data-tables, aria-sort, table-headers, screen-reader, wcag, admin-panels]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, fix-keyboard-navigation, write-screen-reader-test-plan]
args:
  - name: table_code
    description: The table component or rendered markup, including the sort, selection and responsive code and its CSS if layout is involved.
    type: text
    required: true
  - name: framework
    description: What the table is written in, so the fix uses the same idioms.
    type: enum
    enum: [html, react, vue, angular, svelte]
    default: html
  - name: table_features
    description: Anything the code does not show, for example "server-side sorting", "rows expand to show details", "cards on mobile", "virtualised to 10,000 rows".
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Fixed markup, What a screen reader now announces, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Admin panels and dashboards are full of tables that look fine and are unusable with a screen reader. The common failures: tables built from `div`s so table navigation keys do nothing; header cells that are plain `td` in bold; two-level headers with no association, so a cell reads "42" instead of "Q2, Returns, 42"; sort buttons that are clickable `th` elements with an arrow icon and no state; `aria-sort` placed on every column or on the button instead of the header; sticky headers built by cloning the header into a second table; row actions that all read "Edit, Edit, Edit"; and a mobile layout using `display: block` on table elements, which strips table semantics in several browsers. The fix is usually to return to a real `table` and add a few precise attributes, not to add a grid role.
</context>

<task>
Fix this table, written in {{framework}}:

<table_code>
{{table_code}}
</table_code>

{{#table_features}}Extra behaviour to account for: {{table_features}}{{/table_features}}

1. Decide what the table is. A static or sortable data table stays a native `table`. Only an editable spreadsheet-like widget where users move cell by cell with arrow keys justifies `role="grid"`; say so if it does, and do not add it otherwise. Layout tables become CSS layout.
2. Structure: `caption` (visible, or visually hidden if a visible heading already names it, referenced rather than duplicated), `thead`, `tbody`, `tfoot` for totals, `th` for every header cell.
3. Header association: `scope="col"` and `scope="row"` for simple tables; `scope="colgroup"` with `colgroup` elements for grouped column headers; `headers` with ids only when cells relate to headers that scope cannot express (irregular or multi-level row headers). Make the first meaningful cell of each row a row header (`th scope="row"`), usually the name or id column.
4. Sorting: put a `button` inside the `th` containing the column label; set `aria-sort` (`ascending` or `descending`) on the currently sorted `th` only, and remove it from the others. Icons are `aria-hidden`. After a sort, announce the result once in a polite live region ("Sorted by Due date, ascending"). Keep focus on the button.
5. Row actions and selection: give each action a name with row context (visually hidden text or `aria-label` such as "Edit invoice INV-104"), and label row checkboxes the same way. The "select all" checkbox reflects the mixed state. Expandable rows use a `button` with `aria-expanded` and `aria-controls`.
6. Sticky headers: use `position: sticky` on `th` in the one table. Never clone the header row into a separate table.
7. Responsive: if the table collapses to cards, either keep table semantics and scroll horizontally in a focusable, labelled region (`tabindex="0"`, `role="region"`, `aria-labelledby` pointing at the caption), or render a real list of cards with the header text repeated as labels. If `display: block` or `grid` is set on table elements, restore roles explicitly (`role="table"`, `row`, `columnheader`, `cell`) and say why.
8. Large and paged data: state the total ("Showing 1 to 50 of 1,240") as text; for virtualised rows set `aria-rowcount` on the table and `aria-rowindex` on rows. Empty and loading states are text inside the table body, announced politely.
9. Keep the visual design, the public props and the data flow. Note any change you had to make to them.
</task>

<constraints>
- Prefer native table semantics. Never add `role="grid"`, `tabindex` on every cell or arrow-key handlers to a read-only table.
- Do not invent columns, data or library APIs. If the sort or paging code is missing and the fix depends on it, ask for it or mark the spot as [X].
- If the input is not a data table, say so and give the right structure instead.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Diagnosis
Table: Problem | Effect for a screen-reader user | WCAG SC (1.3.1, 4.1.2, 1.3.2, 2.4.6 or 4.1.3) | Fix. At most 10 rows.

## Fixed markup
The corrected component in {{framework}}, complete enough to paste. Mark changed lines with short comments.

## What a screen reader now announces
Three or four examples in a table: Action (for example "move down one cell in the Status column") | Before | After. Say these are typical, not exact, and vary by reader.

## Verification
Numbered checks a developer can run in ten minutes: table navigation keys in NVDA (Ctrl+Alt+arrows) and VoiceOver (VO+arrows), the browser accessibility tree for header association and `aria-sort`, a sort with the live announcement, 400% zoom, and one automated rule set to run in tests.
</output_format>
