---
schema: 1
id: speed-up-text-search-queries
kind: prompt
title: Speed up slow text search queries in SQL
description: Speeds up slow LIKE '%term%', ILIKE and full-text searches in Postgres or MySQL with trigram or full-text indexes, query rewrites and result limits, checked with query plans before and after.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, dba, fullstack-engineer]
stack: [postgres, mysql]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, logs, text]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [full-text-search, trigram-index, like-query, query-plan, indexing]
pairs_with:
  prompts: [optimize-sql-query, design-search-index, implement-search-autocomplete]
  personas: [database-administrator, performance-engineer]
args:
  - name: query
    description: The slow search query or ORM code, the table and columns searched, row count, what users type, and the timing seen.
    type: text
    required: true
  - name: plan
    description: EXPLAIN (ANALYZE, BUFFERS) or EXPLAIN ANALYZE output, and the table's current indexes.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Approach, Changes, Verification, Trade-offs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A B-tree index cannot serve `LIKE '%term%'` or `ILIKE` with a leading wildcard, so the database scans the whole table and the search slows down linearly as data grows. The right fix depends on what users expect. For substring and typo-tolerant matching in Postgres, a trigram index (pg_trgm, GIN or GiST) makes `ILIKE '%term%'` and similarity searches indexable, but very short terms (one or two characters) still match too much to be fast. For word-based search with stemming and ranking, full-text search fits: a stored or generated tsvector column with a GIN index in Postgres, or a FULLTEXT index with MATCH ... AGAINST in MySQL, each with its own rules on stop words and minimum word length. Prefix search (`LIKE 'term%'`) can use a B-tree, but only with a matching collation or operator class. Wrapping the column in `lower()` without an expression index, searching many columns with OR, and counting all matches for pagination are common extra costs. Beyond a few million rows with relevance tuning, faceting or many languages, a dedicated search engine is often the better tool.
</context>

<task>
Search: {{query}}
{{#plan}}
Plan and indexes:
{{plan}}
{{/plan}}

1. Find the search code and the SQL it produces. Confirm from the plan that it is a sequential scan or an unusable index, with rows scanned versus returned and time. If no plan is given, run or ask for `EXPLAIN` with realistic data, and mark conclusions as unverified until then.
2. Decide what search behaviour users need: exact prefix, substring, whole words with stemming, ranking, typo tolerance, language. Ask if the code does not make this clear, because it decides the index type.
3. Choose the approach and explain why: B-tree with the right operator class for prefixes, trigram index for substring or fuzzy matching, full-text index for word search with ranking. Note the minimum term length and other behaviour differences users would notice.
4. Write the change: a migration creating the index in a non-blocking way where the database supports it, the query rewritten to use it (matching expression, operator and column), a cap on results, and a cheaper count or no total count for pagination.
5. Run the migration on a development or staging copy, compare the plan and timings before and after on realistic data, check results match the old behaviour or document the differences, and run the tests.
</task>

<constraints>
- Do not run migrations against production; produce them for the user's normal deploy process and flag index build time and locking on large tables.
- State the write and disk cost of each new index.
- If results change (stemming, stop words, minimum word length), list the differences and get the user's agreement.
- Do not claim a speed-up without a plan or timing that shows it.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
The plan nodes and numbers that show why it is slow.
## Approach
Index type and query form chosen, and why, given the search behaviour needed.
## Changes
The migration and query diff.
## Verification
Plans and timings before and after, and result comparison.
## Trade-offs
Index size and write cost, behaviour differences, and when to move to a search engine.
</output_format>
