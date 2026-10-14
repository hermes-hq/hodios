---
schema: 1
id: write-eloquent-query
kind: prompt
title: Write a complex Laravel Eloquent query
description: Writes a correct Laravel Eloquent query with relationships, whereHas, withCount and withSum, subqueries and eager loading, then checks the SQL with toRawSql and counts the queries run.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [laravel]
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
tags: [eloquent, orm, eager-loading, subqueries, aggregation]
pairs_with:
  prompts: [extract-reusable-orm-query-scopes, speed-up-laravel-app, fix-n-plus-one-queries, review-database-indexes]
  rules: [laravel-rules]
args:
  - name: question
    description: What the query must return, in plain words, with filters, grouping and ordering, for example "teams with their member count and latest invoice, only active teams".
    type: text
    required: true
  - name: models
    description: The models and relationships involved, as paths or pasted code, if the agent cannot find them.
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
Eloquent makes queries short and makes some mistakes very easy. An `orWhere` next to other conditions without a closure groups wrongly (`a AND b OR c`), which often leaks rows across tenants or users; wrap OR groups in `where(function ($q) {...})`. `whereHas` runs a correlated EXISTS subquery that can be slow on large tables; a join or `whereIn` with a subquery is sometimes better, and `whereRelation` is shorthand for simple cases. `withCount`, `withSum`, `withMax` and `withExists` add per-row aggregates as subqueries without loading the related rows, which beats loading a relation to count it. Getting the latest related row per parent is a classic N+1 or memory problem: `latestOfMany()`/`ofMany()` relationships or a `addSelect` subquery solve it. Global scopes (soft deletes, tenancy) apply to relations and subqueries too, unless removed on purpose. `DB::raw` and `whereRaw` with concatenated input are SQL injection; bindings are not. Setting `Model::preventLazyLoading()` outside production turns hidden N+1 queries into errors, and `toRawSql()` (Laravel 10.15+) or `toSql()` with bindings shows the query.
</context>

<task>
Write the Eloquent query for: {{question}}
{{#models}}Models: {{models}}{{/models}}

1. Read the models, relationships, global and local scopes, casts and any existing query scopes or repositories in the same area, and reuse what fits.
2. Restate the result in one line: one row per what, which columns, filters and order, and state assumptions for anything ambiguous.
3. Write the query: closures around OR groups, `whereHas` or `whereRelation` for existence, `withCount`/`withSum`/`withExists` for per-row aggregates, `ofMany` relationships or `addSelect` subqueries for "latest per parent", `with()` with constrained eager loads for what the caller reads, and `select` to limit columns where it matters. Use `DB::raw` only with bindings.
4. Print `toRawSql()` and read it: grouping of AND and OR, subqueries, and global scopes applied or removed on purpose.
5. Write a feature or unit test with factories that expose the traps (a soft-deleted row, a parent with no children, a row from another tenant or user) and assert the number of queries.
6. Run the test with the project's runner and report the result. Mention an index the query needs, without adding a migration unless asked.
</task>

<constraints>
- Never concatenate user input into raw SQL; use bindings.
- Do not remove a global scope (soft deletes, tenancy) unless the question requires it, and say so when you do.
- Do not load full collections into PHP to filter, count or sort what the database can do.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Query
The query or scope in a fenced block, with where it lives.
## Generated SQL
The SQL with bindings, with one line on the subqueries and grouping.
## Traps avoided
Bullets naming each trap that applied and how the query avoids it.
## Check
The test and its real result, including the query count.
## Open questions
Numbered, or "None".
</output_format>
