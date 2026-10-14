---
schema: 1
id: design-api-filtering-and-sorting
kind: prompt
title: Design an API's collection query conventions
description: Designs one filtering, sorting, field selection and expansion convention for every list endpoint in an API, with a query syntax, allowed fields, cost limits and stable pagination.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, fullstack-engineer]
requires: [none]
inputs: [spec, text, repo]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-design, query-syntax, sparse-fieldsets, pagination, api-conventions]
pairs_with:
  personas: [api-designer]
  prompts: [implement-list-filtering-and-sorting, implement-pagination, design-api-contract, review-api-design]
args:
  - name: api
    description: The API's resources and list endpoints, the clients (own UI, customers' integrations, BI tools) and what they need to filter, sort or search by.
    type: text
    required: true
  - name: data_layer
    description: The databases or search engines behind the lists, table sizes and the indexes that exist.
    type: text
  - name: existing_conventions
    description: How list endpoints filter and paginate today, including inconsistencies between them.
    type: text
output_contract:
  format: markdown
  sections: [Convention, Syntax reference, Per-resource allowlists, Cost limits, Migration, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
APIs usually grow list endpoints one at a time, each with its own idea of filtering (status=, filter[status]=, q=, statusIn=), and clients then need a different parser per endpoint. Designing the convention once, API-wide, is cheaper than fixing it later. The options range from simple equality parameters, through bracket or suffix operators (created_at[gte]=, price_lt=), to a full expression language (OData-like or RSQL); the more expressive the syntax, the more queries the database must serve fast, so every filterable and sortable field should be declared per resource and backed by an index or a search engine. Sorting needs a unique tiebreaker for stable cursor pagination. Field selection (sparse fieldsets) and expansion of related resources reduce round trips but multiply cost, so they need depth and count limits. Free-text search is a different feature from filtering and usually belongs to a search index.
</context>

<task>
<api>
{{api}}
</api>

{{#data_layer}}
<data_layer>
{{data_layer}}
</data_layer>
{{/data_layer}}

{{#existing_conventions}}
<existing_conventions>
{{existing_conventions}}
</existing_conventions>
{{/existing_conventions}}

1. If a repository is available, read the existing list endpoints, their parameter parsing and the indexes behind them, and summarise the current conventions and inconsistencies. Say what you read.
2. Choose the level of expressiveness from what clients actually need (equality only, comparison operators, OR and nesting) and say what you deliberately leave out.
3. Define the syntax: filter parameter shape and operators, multiple values, null handling, date and time format with time zone, sort parameter with direction and multiple keys, field selection, expansion of related resources, and free-text search if needed.
4. Define how unknown fields, unsupported operators and malformed values are rejected (status code and error format), rather than silently ignored.
5. Write per-resource allowlists: filterable fields with operators, sortable fields, expandable relations, each tied to an index or search field, and the default sort with a unique tiebreaker.
6. Set cost limits: maximum page size, maximum filters and expansion depth, rejected combinations that cannot use an index, and when to route a query to search or an export job instead.
7. Plan migration from the existing conventions: support old parameters during a deprecation window, document the change, and add contract tests per endpoint.
</task>

<constraints>
- Never pass client-supplied field names or operators into queries without an allowlist.
- Every sortable field must have a deterministic tiebreaker for pagination.
- Do not promise filters on fields that have no index on large tables without stating the cost.
- Keep the syntax consistent across resources; exceptions must be justified.
{{> output/uncertainty}}
</constraints>

<output_format>
## Convention
Short summary and the expressiveness level chosen.
## Syntax reference
Table: feature, parameter syntax, example request.
## Per-resource allowlists
Table: resource, filterable fields and operators, sortable fields, expansions, backing index.
## Cost limits
## Migration
Numbered steps.
## Open questions
Numbered.
</output_format>
