---
schema: 1
id: write-elasticsearch-query
kind: prompt
title: Write an Elasticsearch query
description: Writes an Elasticsearch or OpenSearch query DSL request with filters kept out of scoring, relevance clauses, aggregations and deep pagination, and explains why results rank as they do.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, fullstack-engineer]
stack: [elasticsearch]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [query-dsl, relevance-tuning, aggregations, search-after, bool-query]
pairs_with:
  prompts: [design-search-index, implement-search-autocomplete]
args:
  - name: need
    description: What the search must do, for example "product search box with category and price filters, brand facets, sorted by relevance, 24 per page".
    type: text
    required: true
  - name: mapping
    description: The index mapping (or the relevant fields with types and analyzers) and a sample document.
    type: text
    required: true
  - name: engine
    description: Optional. Elasticsearch or OpenSearch and the version, and the client library used.
    type: string
output_contract:
  format: markdown
  sections: [Mapping check, Query, Why it ranks this way, Pagination, Client code, Test queries]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Search queries go wrong in ways that look fine in a demo. Filters (category, price, tenant, visibility) belong in `bool.filter`, which is cached and does not affect score; putting them in `must` changes ranking and is slower. Full-text matching runs on `text` fields; exact filters, sorting and terms aggregations need `keyword` (or numeric/date) fields, and a `term` query on an analysed text field usually matches nothing. `multi_match` type matters: `best_fields` for one field matching well, `cross_fields` for names split across fields, `phrase_prefix` or `bool_prefix` for typeahead. Field boosts and `minimum_should_match` control precision. Deep paging with `from`+`size` is capped (10,000 by default) and gets slow; `search_after` with a tiebreaker sort (plus a point-in-time for consistency) is the fix. Facet counts usually need post_filter so selecting one brand does not hide the other brand counts. Elasticsearch and OpenSearch have diverged since 7.10, so some features and client APIs differ.
</context>

<task>
Need: {{need}}

<mapping>
{{mapping}}
</mapping>
{{#engine}}Engine: {{engine}}{{/engine}}

1. Check the mapping against the need: which fields are text versus keyword, missing subfields (for example `name.keyword` for sorting), analyzers, and anything the query cannot do without a mapping change. Say what needs reindexing.
2. Write the query DSL as JSON: `bool` with `must`/`should` for relevance, `filter` for hard constraints, sensible boosts, fuzziness only where typos matter, and highlighting if useful.
3. Add aggregations for facets, using `post_filter` where facet counts must ignore their own selection.
4. Explain ranking in plain words: which clause contributes score, what the boosts do, and how to inspect a surprising result with `explain` or the profile API.
5. Pagination: `from`/`size` for shallow paging with its limit, or `search_after` with a tiebreaker field and point-in-time for deep or export use.
6. Give client code in the stated client, or a curl-free plain request body if none is given, with user input passed as values, never spliced into query strings.
7. Give a few test queries with expected behaviour (typo, multi-word, filter only, empty query).
</task>

<constraints>
- Never put user input into a `query_string` query without escaping or a safer alternative such as `simple_query_string`.
- Use only features that exist in the stated engine and version; say when Elasticsearch and OpenSearch differ.
- Do not invent fields that are not in the mapping.
{{> output/uncertainty}}
</constraints>

<output_format>
## Mapping check
Bullets, with any reindex needed.

## Query
JSON request body.

## Why it ranks this way
Three to six lines.

## Pagination
Approach and example.

## Client code
Code block.

## Test queries
Table: input | expected behaviour.
</output_format>
