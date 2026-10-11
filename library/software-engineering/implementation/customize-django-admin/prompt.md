---
schema: 1
id: customize-django-admin
kind: prompt
title: Customize the Django admin for staff
description: Turns default Django admin pages into a usable staff back office with list columns, filters, search, inlines, safe bulk actions, scoped querysets and fast queries.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [django]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [django-admin, back-office, internal-tools, n-plus-one, permissions]
args:
  - name: models
    description: The models to expose or improve in the admin, with the app they live in.
    type: text
    required: true
  - name: staff_needs
    description: What staff do with these records day to day, for example "find an order by customer email, refund it, see its line items".
    type: text
    required: true
  - name: access_rules
    description: Which staff groups may see or change what, for example "support sees only their region's customers".
    type: text
output_contract:
  format: markdown
  sections: [Admin design, Changes, Permissions, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Django admin is a fast way to give staff a back office, but the defaults hurt at real data sizes. A foreign key rendered as a dropdown loads every row of the related table into the page. `list_display` columns that follow relations fire one query per row. The changelist counts the whole table on every page load. Bulk actions built on `queryset.update()` skip `save()`, signals and audit hooks. And `is_staff` plus a model permission lets any support agent see every record, when the business rule says they should see only some.
</context>

<task>
Customize the admin for these models:

{{models}}

What staff need to do:

{{staff_needs}}

{{#access_rules}}
Access rules: {{access_rules}}
{{/access_rules}}

1. Read the models, existing `admin.py` files, custom user model and any permission or group setup. Follow the existing admin style (decorator `@admin.register` or `admin.site.register`).
2. Design the changelist from the staff tasks: `list_display` with the columns they scan, `list_filter` for the questions they ask, `search_fields` for what they search by (use `^` or `=` prefixes on large tables to avoid `LIKE '%x%'` scans), `date_hierarchy` where time matters, and `ordering`.
3. Make it fast: `list_select_related` or an overridden `get_queryset` with `select_related`/`prefetch_related` for every relation shown; `autocomplete_fields` or `raw_id_fields` for foreign keys to large tables; `show_full_result_count = False` and a sensible `list_per_page` for big tables. Use `@admin.display(ordering=..., description=...)` for computed columns, annotating in `get_queryset` instead of querying per row.
4. Build the change form: `fieldsets` grouped by task, `readonly_fields` for system fields and anything staff must not edit, and `TabularInline` or `StackedInline` for child records with `extra = 0`.
5. Add bulk actions with `@admin.action(description=..., permissions=[...])`. Decide per action whether to loop with `save()` (signals, audit, validation run) or use `update()` (fast, skips them) and say which. Confirm destructive actions on an intermediate page and report results with `message_user`.
6. Enforce access rules server-side: override `get_queryset` to scope rows, and `has_view_permission`, `has_change_permission`, `has_delete_permission` and `get_readonly_fields` per user or group. Hiding a link is not access control.
7. Write tests with the Django test client logged in as staff users of each group: changelist and change pages load, query count is bounded (`assertNumQueries` on the changelist), out-of-scope objects return 404 or 403, and each action does what it says.
8. Run the tests and `python manage.py check`.
</task>

<constraints>
- The admin is for trusted staff only. Do not suggest exposing it to customers; if the needs look customer-facing, say a proper view is the right tool.
- Do not disable CSRF or permission checks, and do not grant `is_superuser` to make something work.
- Do not add a third-party admin theme or package unless the project already uses one.
- Keep personal data visible only where the staff task needs it; mask or omit the rest.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Admin design
Per model: changelist columns, filters, search, inlines and actions, in a short list.

## Changes
One line per file: `path`, what changed.

## Permissions
Table: Group | Sees | Can change | Can run actions.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
