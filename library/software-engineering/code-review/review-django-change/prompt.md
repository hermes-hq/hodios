---
schema: 1
id: review-django-change
kind: prompt
title: Review a Django change
description: Reviews a Django diff for ORM query mistakes, missing atomic blocks or row locks, migrations out of step with models, signal side effects and unsafe serializer or settings use.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
stack: [django]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [orm, schema-migrations, transactions, signals, pull-request]
pairs_with:
  personas: [python-engineer]
  prompts: [review-pull-request, review-sql-query-change, review-database-migration]
  rules: [django-rules]
args:
  - name: diff
    description: The diff with file paths, including models, migrations, views, serializers, tasks and settings it touches.
    type: text
    required: true
  - name: context
    description: Django and database versions, whether Django REST Framework and Celery (or another queue) are used, table sizes for any migrated tables, and the business rule the change implements.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Django makes the common path short, which hides where data goes wrong. A queryset is lazy, so a filter built in one place can run many times, once per loop iteration, or after the data changed. Reading a value, changing it in Python and calling `save()` loses concurrent updates; the fixes are `F()` expressions for counters or `select_for_update()` inside `transaction.atomic()` for read-then-decide logic, and `select_for_update()` outside an atomic block raises an error under autocommit. `QuerySet.update()`, `bulk_create()` and `bulk_update()` skip `save()`, model signals and `auto_now`, so anything that relied on them silently stops. Work that must only happen if the transaction commits (sending email, enqueueing a Celery task that reads the new row) belongs in `transaction.on_commit`, otherwise the worker can run before the row exists or after it was rolled back. Migrations must match models (`makemigrations --check`), data migrations must use `apps.get_model` rather than importing the model, and adding a constraint or a non-null column to a large table can lock it or fail on existing rows. In DRF, `fields = "__all__"` or a writable serializer field for `owner`, `is_staff` or `price` lets clients set what they should not. `get_or_create` without a unique constraint creates duplicates under concurrency.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full, the models and migrations it touches, and any signal receivers, serializers and tasks connected to those models, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check queries: queryset evaluated inside loops (missing `select_related` or `prefetch_related`), `.get()` without handling `DoesNotExist` or `MultipleObjectsReturned`, filters missing the tenant or owner, and querysets evaluated twice where the data can change between.
3. Check concurrency and transactions: read-modify-write on counters or balances without `F()` or a row lock, `select_for_update` outside `transaction.atomic`, multi-step writes without an atomic block, `get_or_create` without a backing unique constraint, and side effects (emails, tasks, webhooks) not deferred with `transaction.on_commit`.
4. Check bypassed behaviour: `update()`, `bulk_create()`, `bulk_update()` or raw SQL on models whose `save()`, signals or `auto_now` fields carry business logic; signal receivers that do slow or external work, recurse by saving the sender, or run during fixture loading (`raw=True`).
5. Check migrations against models: missing migration for a model change, data migrations importing models directly, `RunPython` without a reverse or without `elidable` thought, non-null columns or unique constraints added to tables that already have rows violating them, and operations that lock a large table.
6. Check input and exposure: serializers or ModelForms with `__all__`, writable fields for ownership or permission flags, views without permission classes or object-level checks, and settings read at import time or secrets added to settings files.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (lost or duplicated writes, data leaked across users or tenants, migration that fails or locks production), medium (side effects that fire on rollback, signals silently skipped, N+1 on a hot page), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Name the Django and database version you assumed for anything version-dependent (for example `db_default` and lock behaviour of adding columns).
- Use the project's existing patterns (service functions, custom managers) in fixes rather than introducing new layers.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the model or view affected, the defect, the triggering request or concurrent sequence, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
