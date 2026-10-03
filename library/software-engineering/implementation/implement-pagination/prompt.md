---
schema: 1
id: implement-pagination
kind: prompt
title: Implement pagination
description: Implements cursor or offset pagination for an API and its UI with a stable sort order, enforced limits, a matching index and tests for the boundary cases. Use when a list endpoint returns too much.
category: implementation
version: 1.0.1
status: incubating
stage: [build, design]
role: [backend-engineer, fullstack-engineer, frontend-engineer]
stack: []
requires: [none]
inputs: [file, spec, schema]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pagination, keyset-pagination, cursor, api-design, infinite-scroll]
pairs_with:
  prompts: [build-rest-endpoint, optimize-sql-query, build-ui-component]
  personas: [backend-engineer]
args:
  - name: endpoint
    description: The list endpoint or query to paginate, its filters and sort options, roughly how many rows it can return, how often rows are inserted or deleted, and how the UI shows the list (infinite scroll, load more, numbered pages). Paste the current code if it exists.
    type: text
    required: true
  - name: data_store
    description: Where the data lives and how it is accessed, for example "Postgres 16 via Prisma", "MongoDB", "DynamoDB", "Elasticsearch 8".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Decision, API contract, Query and index, Implementation, UI, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Handles nullable sort columns explicitly and tests rows with a null sort value across a page boundary."}
---
<context>
You are a backend engineer who has fixed many pagination bugs. Most of them come from three mistakes: sorting by a column that is not unique, so rows with equal values shuffle between pages and appear twice or never; using `OFFSET` on large or fast-changing tables, so deep pages get slow and inserts shift items between pages; and trusting the client's `limit`, so one request asks for a million rows.

Two approaches fit most cases:
- Cursor (keyset) pagination: `WHERE (sort_col, id) < (:last_sort, :last_id) ORDER BY sort_col DESC, id DESC LIMIT :n + 1`. Fetching one extra row tells you whether there is a next page. It stays fast at any depth and is stable under inserts, but it cannot jump to page 37. The cursor is opaque to clients (for example base64url-encoded JSON of the last row's sort values) and is only valid for the same sort and filters.
- Offset pagination: simple and supports page numbers, acceptable for small or slowly changing data and for admin tables where people jump to a page.

Stores have their own idioms: DynamoDB returns `LastEvaluatedKey`; Elasticsearch uses `search_after`, with a point in time for consistency, because deep `from` is capped; MongoDB uses a range query on an indexed field plus `_id`. Total counts are expensive on large tables; make them optional, estimated or cached.
</context>

<task>
Implement pagination for this endpoint on {{data_store}}.

Endpoint:
{{endpoint}}

1. If the sort options, the filters or the UI pattern are unclear and they change the design, ask up to three questions and stop.
2. Choose cursor or offset pagination and justify it from the data size, change rate and UI. Default to cursor unless the UI needs to jump to arbitrary page numbers.
3. Define a total order for every sort option by appending a unique tiebreaker (usually the primary key) in the same direction. If a sort column can be NULL, keyset comparisons silently skip those rows; make the order explicit (`NULLS LAST` or a `COALESCE` to a sentinel), use the same expression in the cursor comparison and the index, and say which you chose.
4. Define the API contract: request parameters (`limit` with a default of 20 and a maximum of 100 unless the brief says otherwise, `cursor` or `page`), the response shape (`items`, `next_cursor` or `page` info, `has_more`, optional `total`), and errors for an invalid or expired cursor or a changed filter.
5. Write the query and the index that serves it. The index columns must match the filter and the order, including the tiebreaker.
6. Write the endpoint code, including cursor encoding and decoding with validation, and limit clamping.
7. Write the UI side for the chosen pattern: request the next page, append without duplicates, stop at the end, show loading and error states, and for "load more" move focus sensibly and announce new items to screen readers.
8. Write tests.
</task>

<constraints>
- Never accept an unbounded `limit`, and never build the cursor into SQL by string concatenation.
- The cursor must not let a client read rows it could not see through the normal filters.
- Follow the existing code's framework, naming and error style when code is provided.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Decision
Cursor or offset, and why, in three to five sentences.
## API contract
Request parameters and an example response, as a code block.
## Query and index
The query and the `CREATE INDEX` (or the store's equivalent).
## Implementation
The endpoint code.
## UI
The client code for the chosen pattern.
## Tests
Test code covering: an empty result, exactly `limit` rows, ties on the sort column across a page boundary, rows with a null sort value if the column is nullable, a row inserted between two page requests, a malformed cursor, and a `limit` above the maximum.
</output_format>
