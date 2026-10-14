---
schema: 1
id: build-accessible-data-grid
kind: prompt
title: Build an accessible interactive data grid
description: Builds or fixes an editable, spreadsheet-like grid with one tab stop, arrow-key cell navigation, an edit mode, selection, sorting and announcements, following the ARIA grid pattern.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-grid, aria-grid, roving-tabindex, spreadsheet-ui, keyboard]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-data-table-accessibility, build-aria-widget, add-live-region-announcements, write-accessibility-regression-tests]
args:
  - name: grid
    description: The grid component or library (AG Grid, TanStack Table, MUI DataGrid, custom), its features (inline edit, row selection, sorting, column resize, virtualisation) and code or file paths.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Table or grid decision, Problems found, Implementation, Keyboard model, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first decision is whether the thing is a grid at all. A table of data with a few links or a row action is a `table` and should stay one: screen readers have rich table navigation, and turning it into `role="grid"` removes that and forces the user into the grid's own keyboard model. Use the grid pattern only when cells themselves are interactive and users move between them like a spreadsheet. A real grid has exactly one tab stop; arrow keys move between cells (roving tabindex or `aria-activedescendant`), Home and End go to row start and end, Control with them to grid start and end, Page Up and Page Down by visible page. Cells with widgets need two modes: navigation mode, where arrows move between cells, and edit or interaction mode, entered with Enter or F2 and left with Escape, where arrows act inside the widget. Virtualised grids must set `aria-rowcount`, `aria-colcount`, `aria-rowindex` and `aria-colindex`. Sort state belongs on the column header (`aria-sort`), selection on rows or cells (`aria-selected`), and changes such as "Row 4 saved" or "Sorted by date, descending" need a polite announcement. Many grid libraries have an accessibility mode that is off or partial by default; check before writing code.
</context>

<task>
Make this {{framework}} grid accessible.

<grid>
{{grid}}
</grid>

1. Read the grid code and the library's accessibility documentation if a library is used. Decide table or grid and justify it; if it should be a table, stop and describe the conversion instead.
2. List the problems: tab stops per cell, missing roles or indices, mouse-only actions (double-click to edit, hover-only row actions, drag to resize), lost focus after sort or edit, missing announcements. Mark inferences.
3. Enable or configure the library's accessibility features first. Write custom code only for gaps.
4. Implement focus: a single tab stop, the keyboard model in the context, focus that stays on the same logical cell after sort, filter or data refresh, and a visible focus indicator on the cell.
5. Implement editing: Enter or F2 to edit, Escape to cancel and restore the value, Enter or Tab to commit as the design requires, focus back on the cell, validation errors announced and tied to the cell.
6. Expose structure: grid name, column headers with `aria-sort`, row headers where a column identifies the row, selection state, and row and column counts and indices when virtualised.
7. Provide keyboard alternatives for resize, reorder and row actions (a column menu, a row actions button).
8. Write tests for navigation keys, edit mode, sort announcement and focus retention; run them. Give a manual NVDA and VoiceOver check.
</task>

<constraints>
- Do not convert a read-only data table into a grid.
- Do not give every cell `tabindex="0"`.
- Do not fork or patch the grid library; use its configuration or wrap it, and report library bugs as upstream issues.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Table or grid decision
Short paragraph.

## Problems found
Numbered, with who is blocked.

## Implementation
Diffs with file paths, library configuration first.

## Keyboard model
Table: mode | key | action.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
