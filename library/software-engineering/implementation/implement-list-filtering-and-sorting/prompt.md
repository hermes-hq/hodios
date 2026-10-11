---
schema: 1
id: implement-list-filtering-and-sorting
kind: prompt
title: Implement filtering and sorting for a list
description: Implements filter and sort parameters for a list endpoint with allowlisted fields, safe parsing, stable order, indexes and filter state kept in the URL. Use when a table or list needs filters.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [filtering, sorting, query-parameters, rest-api, sql-injection]
pairs_with:
  prompts: [implement-pagination, build-rest-endpoint, design-search-index]
  personas: [backend-engineer]
args:
  - name: list_spec
    description: The list or table, the filters wanted (field, operators such as equals, range, contains) and the sortable columns.
    type: text
    required: true
  - name: stack
    description: Backend and frontend frameworks and the database. Leave empty to detect them from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer adding filters and sorting to a list. The common failures:
- Injection and data leaks: field names from the query string interpolated into SQL or ORM calls (`order_by(params[:sort])`) let callers sort or filter on columns they should not see, or inject SQL. Map each public field name to a column through an allowlist, with the operators allowed for each.
- Silent nonsense: unknown fields, bad dates or a range with min above max should return a clear 400 error, not an empty list.
- Unstable order: sorting by a non-unique column without a tiebreaker (usually the id) shuffles rows between pages and duplicates or drops items. With cursor pagination, the cursor must encode the sort key and the tiebreaker.
- Time zones: a "created on 3 March" filter must state which time zone defines the day, and convert to a half-open UTC range.
- Text search: case-insensitive `contains` on a big table needs a trigram or full-text index; prefix search can use a normal index with the right operator class. Do not promise full-text search through `LIKE '%x%'` on millions of rows.
- Indexes: add composite indexes for the most common filter and sort combinations, and check the query plan rather than guessing.
- Authorization scoping applies before any user filter, always.
- Frontend: keep filter and sort state in the URL query string so links, refresh and back button work; reset to the first page when filters change; debounce text inputs; show active filters and a clear-all control.
- Use the project's existing convention (`?status=open&sort=-created_at`, `filter[status]=open`, or another) rather than inventing a new one.
</context>

<task>
Add filtering and sorting to:
{{list_spec}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the list endpoint, its query, pagination and authorization, any existing filter conventions elsewhere in the API, and the frontend list component.
2. Write the contract: each filter parameter with type, operators, validation and examples; sort parameter syntax with allowed fields and default order with tiebreaker; error responses.
3. Implement parsing and validation against the allowlist, the query building, indexes as a migration, and the API documentation if the project has it.
4. Implement the frontend: controls, URL state, page reset, debouncing, and empty-result messaging.
5. Write tests, then run them, the type check, and an `EXPLAIN` on the main query if a local database is available.
</task>

<constraints>
- Never pass a user-supplied field or direction into SQL or an ORM ordering call without mapping it through the allowlist.
- Flag index migrations that would lock a large table and suggest the database's concurrent option.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Parameter | Type | Operators | Example. Then the sort syntax, default order and error responses.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: each filter, combined filters, unknown field rejected, invalid value rejected, sort with ties stable across pages, and another tenant's rows never returned.
## Verification
Commands run and their actual results, including the query plan if checked.
## Open questions
Choices left open, with the default chosen.
</output_format>
