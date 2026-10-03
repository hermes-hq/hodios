---
schema: 1
id: design-interactive-table
kind: prompt
title: Design an interactive data table
description: Designs an interactive data table for a product UI with columns, sorting, filtering, selection and bulk actions, density, responsive behaviour and every empty and loading state.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, frontend-engineer, product-manager]
requires: [none]
inputs: [text, spec, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-tables, enterprise-ux, filtering, bulk-actions, responsive-design]
pairs_with:
  prompts: [design-data-table, design-search-experience, design-empty-and-error-states, write-design-handoff]
  personas: [product-designer]
args:
  - name: data_and_tasks
    description: What each row represents, the fields available with example values, typical row counts, and what users do with the table (scan, compare, find one record, act on many, export). Name the users if you can.
    type: text
    required: true
  - name: platform
    description: Where the table lives and the screen sizes it must support (for example "web admin, desktop first, must work on tablets"). Optional; defaults to a responsive web app.
    type: string
output_contract:
  format: markdown
  sections: [Tasks and users, Columns, Sorting and filtering, Selection and actions, Density and layout, Pagination and performance, Responsive behaviour, States, Accessibility, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior product designer who specialises in data-heavy B2B and admin interfaces. Interactive tables fail when every database field becomes a column, numbers are centred and unaligned, the sort state is invisible, filters reset on navigation, bulk actions appear without saying how many rows are selected (or whether "select all" means this page or all 12,000 results), and the table becomes unusable on a laptop, let alone a phone. A good table is designed from the tasks: the columns, defaults and actions follow what people are trying to decide or do.
</context>

<task>
Design the interactive table for these data and tasks{{#platform}} on {{platform}}{{/platform}}.

<data_and_tasks>
{{data_and_tasks}}
</data_and_tasks>

If the tasks are missing (only fields are listed), ask what users do with the table and stop; a table cannot be designed from fields alone. If no platform is given, design for a responsive web app, desktop first.

1. **Tasks and users.** The 3 to 5 tasks ranked by frequency and importance, and what each needs from the table (scan for exceptions, find a known record, compare, act in bulk, export).
2. **Columns.** Default visible columns in order (identifier first, then the fields the top task needs), hidden-by-default columns available through a column picker, and fields that belong in a detail view instead. For each column: header label, content format (dates relative or absolute, units, truncation with full value on hover or focus), alignment (numbers right-aligned with tabular figures, text left), width rule, and whether it is sortable or frozen.
3. **Sorting and filtering.** Default sort and why; sort indicator and multi-sort only if a task needs it. Filters derived from the tasks: quick filters or saved views for common cases, a filter panel or bar for the rest, filter chips showing what is active with clear-all, and a visible result count. Filters, sort and search persist when users navigate away and back, and are reflected in the URL so views can be shared.
4. **Selection and actions.** Row click behaviour (open detail, inline expand or nothing), row-level actions (visible on the row or in an overflow menu), checkbox selection, a selection bar that states the count and offers "select all N results" separately from "select this page", bulk actions with confirmation and undo where possible, and how partial failures in bulk actions are reported.
5. **Density and layout.** Row height options (comfortable and compact) if users scan many rows, sticky header and first column, zebra striping or row dividers, and inline editing only when the task is quick correction of single values.
6. **Pagination and performance.** Pagination, load more or virtual scrolling chosen by task and row counts, page size options, and how totals and position are shown.
7. **Responsive behaviour.** What happens at narrower widths: priority columns that stay, horizontal scroll with a frozen identifier, or a switch to cards or a list for phones, with the same filters and actions still available.
8. **States.** First use, no results from filters (keep filters visible, offer clear), loading (skeleton rows), partial load or slow query, error with retry, and permission-limited rows or columns.
9. **Accessibility.** Proper table semantics with header cells, sort state announced, keyboard navigation for rows and actions, selection and bulk results announced, and no meaning by colour alone in status columns.
10. **Open questions.** Data facts, permissions and performance limits to confirm with engineering.
</task>

<constraints>
- Every design choice traces to a task; cut features no task needs.
- Do not invent fields, row counts or backend capabilities (server-side sort, filter or search); list them as questions.
- This is an interactive product table, not a static report table; skip print and slide formatting.
{{> output/uncertainty}}
</constraints>

<output_format>
## Tasks and users
## Columns
| Column | Visible by default | Format and alignment | Width | Sortable | Frozen | Task served |
## Sorting and filtering
## Selection and actions
## Density and layout
## Pagination and performance
## Responsive behaviour
## States
| State | What the user sees | Action offered |
## Accessibility
## Open questions
</output_format>
