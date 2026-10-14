---
schema: 1
id: write-active-record-query
kind: prompt
title: Write a complex ActiveRecord query
description: Writes a correct Rails ActiveRecord query with joins, includes, group, subqueries and Arel only where needed, then checks the SQL it generates with to_sql and the query count.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [rails]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [activerecord, orm, aggregation, subqueries, eager-loading]
pairs_with:
  prompts: [extract-reusable-orm-query-scopes, speed-up-rails-endpoint, fix-n-plus-one-queries, review-database-indexes]
  rules: [rails-rules]
args:
  - name: question
    description: What the query must return, in plain words, with filters, grouping and ordering, for example "projects with the count of open tasks, only projects updated this month".
    type: text
    required: true
  - name: models
    description: The models and associations involved, as paths or pasted code, if the agent cannot find them.
    type: text
output_contract:
  format: markdown
  sections: [Query, Generated SQL, Traps avoided, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
ActiveRecord queries go wrong in ways that pass a quick look. `includes` decides between separate queries and one big JOIN depending on whether you reference the association in `where` or `references`, so the same code can change shape; use `preload` for separate queries, `eager_load` for a JOIN and `joins` when you only filter. `joins` on a has_many returns duplicate parent rows, and `.count` on that counts the duplicates; `distinct` or an `EXISTS` subquery (`where(id: Child.select(:parent_id))` or `where.associated` in Rails 7+) fixes it. `group(...).count` returns a Hash, not records, and `select` with aggregates needs every non-aggregated column in the GROUP BY on Postgres. Default scopes and `order` clauses leak into subqueries and counts (`unscope(:order)` or `reorder`). `where("name = '#{x}'")` is SQL injection; use placeholders or hash conditions, and `Arel.sql` only for trusted fragments. `pluck` skips model instantiation and is right for ids and columns, while `find_each` is right for large batch iteration. `to_sql` shows the query before it runs, and `assert_queries_count` (Rails 7.2+) or a query-count helper shows how many ran.
</context>

<task>
Write the ActiveRecord query for: {{question}}
{{#models}}Models: {{models}}{{/models}}

1. Read the models, associations, scopes (including `default_scope`) and existing query objects or scopes in the same area, and reuse what fits.
2. Restate the result in one line: one row per what, which columns, which filters, which order, and state assumptions for anything ambiguous.
3. Write the query: hash conditions or placeholders for filters, `joins` or `where.associated` and `where.missing` for existence, `left_joins` with `group` and `select` for counts per row, a subquery with `select` for per-row aggregates across a second association, and `preload` or `eager_load` for associations the caller will read. Use Arel only when the relation API cannot express it.
4. Print `to_sql` and read it: joins, GROUP BY, duplicates from has_many joins, and default scope or order leaking in.
5. Write a model or request test with a few records that expose the traps (a parent with several children, one with none, a soft-deleted or default-scoped row) and assert the query count.
6. Run the test and report the result. Mention an index the query needs, without adding a migration unless asked.
</task>

<constraints>
- Never interpolate user input into SQL strings; use placeholders or hash conditions.
- Do not load records into Ruby to filter or count what the database can do.
- Do not add or remove a `default_scope` or change associations without asking.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Query
The query or scope in a fenced block, with where it lives.
## Generated SQL
The `to_sql` output, with one line on joins and grouping.
## Traps avoided
Bullets naming each trap that applied and how the query avoids it.
## Check
The test and its real result, including the query count.
## Open questions
Numbered, or "None".
</output_format>
