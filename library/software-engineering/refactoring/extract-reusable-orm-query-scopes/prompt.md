---
schema: 1
id: extract-reusable-orm-query-scopes
kind: prompt
title: Extract reusable ORM query scopes
description: Pulls repeated ORM filter chains into named scopes, custom managers or query methods (Django, Rails, Laravel, SQLAlchemy and similar), proving the generated SQL is identical before and after.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [django, rails, laravel]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [orm, query-scopes, duplicate-queries, sql-equivalence]
pairs_with:
  prompts: [reduce-duplication, restructure-sql-query]
  personas: [backend-engineer]
args:
  - name: target
    description: The models and the places where the same query conditions repeat, as paths or pasted code, and the ORM and framework.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Repeated conditions, Scopes, Diff, SQL comparison, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer. Business definitions hide in repeated filter chains: "active customer" is `status='active', deleted_at IS NULL, trial_ends_at > now()` in one view and forgets the trial check in another, so reports and screens disagree. Named, chainable query pieces fix this: Django custom `QuerySet` methods exposed through `Manager.from_queryset`, Rails `scope` or class methods returning relations, Laravel local scopes (`scopeActive`), SQLAlchemy reusable `select` filters or hybrid properties.

Equivalence must be proven, not assumed, because small rewrites change SQL: chaining `.filter()` twice across a multi-valued relation in Django is not the same as one `.filter()` with both conditions (separate joins); Rails `merge` and `or` change grouping; a scope that calls `now()` when the class loads freezes time (Rails scopes need a lambda; module-level timestamps in Python are evaluated once); a default scope or default manager affects every query including related lookups, admin and deletes, and is usually a trap to avoid. Print the SQL (`str(qs.query)`, `.to_sql`, `toSql()`, `compile()`) before and after for each call site and compare. When the copies disagree, one encodes the intended definition; ask instead of picking silently.
</context>

<task>
Extract scopes from {{target}}.

1. Find the repeated conditions across call sites (views, services, jobs, reports, admin) and group them by business meaning. For each group, list the variants and where they differ.
2. Propose the named scopes, chainable and composable, and where they live (model, custom queryset, query object) following the project's conventions. For groups whose variants disagree, show the difference and ask which definition is intended. Do not propose a default scope.
3. Capture the generated SQL for every affected call site before changing it.
4. Add the scopes with tests on representative data, then replace the call sites. Capture the SQL again and compare; explain any difference and keep it only if agreed.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and report results.
</task>

<constraints>
- Generated SQL and results stay the same per call site unless a definition change was agreed.
- No default scopes or default manager changes.
- Time-dependent conditions are evaluated at query time, not at load time.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Repeated conditions
Table: business meaning, condition, call sites, variants.
## Scopes
Names, definitions and composition.
## Diff
The change.
## SQL comparison
Before and after SQL per call site, with differences explained.
## Check
Tests run and results.
</output_format>
