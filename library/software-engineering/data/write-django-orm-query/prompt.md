---
schema: 1
id: write-django-orm-query
kind: prompt
title: Write a complex Django ORM query
description: Writes a correct Django ORM query with annotate, aggregate, Subquery, OuterRef, F and Q expressions, then prints and checks the SQL it generates and the number of queries it runs.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [django]
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
tags: [orm, querysets, aggregation, subqueries, query-expressions]
pairs_with:
  prompts: [extract-reusable-orm-query-scopes, speed-up-django-views, fix-n-plus-one-queries, review-database-indexes]
  rules: [django-rules]
args:
  - name: question
    description: What the query must return, in plain words, with the filters, groupings and ordering, for example "each customer with their order count and last order date in 2025, only customers with at least 3 paid orders".
    type: text
    required: true
  - name: models
    description: The models involved, as paths or pasted code, if the agent cannot find them in the repository.
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
Most wrong Django queries look right and return plausible numbers. Two `annotate(Count(...))` calls across different multi-valued relations join both tables and multiply the counts; the fix is `distinct=True` for counts or a `Subquery` per aggregate for sums. The order of `values()` and `annotate()` decides the grouping: `values("field").annotate(...)` groups by that field, while `annotate` before `values` does not, and a model `Meta.ordering` can silently add columns to the GROUP BY on older versions. Filters on multi-valued relations behave differently in one `filter()` call than in two chained calls. `Subquery` must return one column and one row, so it needs `.values("col")[:1]`, and aggregates inside it need an explicit grouping with `.values("fk").annotate(...)`. `Sum` over no rows returns `None`, not 0 (`Coalesce` fixes that, with a matching `output_field` for decimals). Python-side loops over querysets hide N+1 queries that `select_related`, `prefetch_related` or `Prefetch` would remove. `print(qs.query)` shows approximate SQL, and `connection.queries` or `assertNumQueries` show what actually ran.
</context>

<task>
Write the Django ORM query for: {{question}}
{{#models}}Models: {{models}}{{/models}}

1. Read the models, their relations, managers and `Meta.ordering`, and any existing queries or custom QuerySet methods in the same area. Reuse a manager method if one already does part of the job.
2. Restate the result in one line: one row per what, which columns, which filters, which order. If the question is ambiguous (for example "orders" includes cancelled ones or not), state the assumption.
3. Write the query with the right tools: `F` for column references, `Q` for OR and NOT, `annotate` and `aggregate`, `Subquery` with `OuterRef` for per-row aggregates across a second relation, `Exists` for existence filters, `Coalesce` for empty aggregates, `Case` and `When` for conditional counts, and `select_related` or `prefetch_related` for what the caller will touch.
4. Print the SQL (`str(qs.query)`) and read it: check the joins, GROUP BY columns, and that no aggregate is multiplied by a second join.
5. Write a test with a few hand-built rows that would expose the classic mistakes (two related sets of different sizes, a customer with no orders, a NULL value) and `assertNumQueries` for the expected count.
6. Run the test and report the result. Mention any index the filter or ordering would need, without adding a migration unless asked.
</task>

<constraints>
- Do not fall back to raw SQL unless the ORM cannot express the query; if you do, use parameters, never string formatting.
- Do not loop in Python over a queryset to compute what the database can aggregate.
- Do not change models or add migrations to make the query easier without asking.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Query
The queryset in a fenced block, with where it lives.
## Generated SQL
The printed SQL, with one line on the joins and grouping.
## Traps avoided
Bullets naming each trap that applied here and how the query avoids it.
## Check
The test and its real result, including the query count.
## Open questions
Numbered assumptions to confirm, or "None".
</output_format>
