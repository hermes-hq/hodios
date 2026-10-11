---
schema: 1
id: build-drf-api
kind: prompt
title: Build a Django REST Framework API
description: Builds a Django REST Framework API with explicit serializers, viewsets, object permissions, filtering, pagination and N+1-free queries. Use when adding resources to a DRF project.
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
tags: [django-rest-framework, rest-api, serializers, permissions, n-plus-one]
pairs_with:
  prompts: [build-rest-endpoint, implement-list-filtering-and-sorting, implement-pagination]
  personas: [python-engineer, backend-engineer]
  rules: [django-rules]
args:
  - name: api_spec
    description: The resources, fields, operations and who may do what, for example "Projects and Tasks; members read, owners write".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Django engineer building API resources with Django REST Framework (DRF). DRF makes a working API fast and a leaky or slow one just as fast. The traps:
- `fields = "__all__"` exposes every new model column automatically, including internal ones. List fields explicitly, and mark server-controlled ones in `read_only_fields`. Set the owner in `perform_create` from `request.user`, never from the request body.
- Object permissions: `has_object_permission` is only called by `get_object()`, so it protects detail routes but not lists. Scope `get_queryset()` to what the user may see; this is the main defence.
- Set a safe `DEFAULT_PERMISSION_CLASSES` (for example `IsAuthenticated`) so a new view is not public by accident.
- N+1 queries: nested serializers and `SerializerMethodField` trigger a query per row. Use `select_related` for foreign keys and `prefetch_related` (with `Prefetch` objects for filtered sets) in `get_queryset`, and assert query counts in tests with `assertNumQueries` or `django_assert_num_queries`.
- Nested writes are not automatic; write `create` and `update` explicitly and wrap them in `transaction.atomic`.
- Filtering with django-filter: declare `filterset_fields` or a `FilterSet`. `OrderingFilter` allows ordering by any serializer field when `ordering_fields` is unset; set it explicitly.
- Set a default pagination class and page size, or lists return every row.
- Validation lives in serializers (`validate_<field>`, `validate`) and model constraints; error responses keep DRF's format unless the project customises it.
- Schema generation with drf-spectacular, if present, needs `extend_schema` where it cannot infer types.
</context>

<task>
Build this API in the project's DRF setup:
{{api_spec}}

1. Read settings (`REST_FRAMEWORK`), existing serializers, viewsets, permissions, routers, filters and tests. Follow their patterns.
2. Write the contract: routes, methods, fields per action, permissions, filters, ordering, pagination.
3. Implement serializers with explicit fields, viewsets with scoped `get_queryset` and query optimisation, permission classes, filter and ordering configuration, and router registration. Add migrations only if the models change.
4. Write tests with `APIClient` or the project's test client: permissions per role, scoping, validation, filters, and query counts on list endpoints.
5. Run the tests, `python manage.py check`, and the project's linter or type checker.
</task>

<constraints>
- Never use `fields = "__all__"` or `exclude` on API serializers.
- Never rely on `has_object_permission` alone for list endpoints.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Route | Methods | Who may call | Notes.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers, including query count assertions.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>
