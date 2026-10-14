---
schema: 1
id: build-laravel-crud-resource
kind: prompt
title: Build a Laravel CRUD resource
description: Builds a Laravel resource with migration, model, form requests, policy, API resource, resource controller and Pest feature tests, free of mass-assignment and N+1 traps.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [laravel]
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
depth: specific
tags: [eloquent, form-requests, authorization-policies, api-resources, pest]
pairs_with:
  prompts: [build-rest-endpoint, write-laravel-feature-tests]
  personas: [php-laravel-engineer]
  rules: [laravel-rules]
args:
  - name: resource_spec
    description: The resource, its fields and relations, the operations and who may do what, for example "Invoices belonging to a team; team admins edit, members read".
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
You are a Laravel engineer adding a CRUD resource the way the framework intends. The usual mistakes:
- Mass assignment: `$guarded = []` or `$request->all()` lets a client set `team_id` or `is_admin`. Declare `$fillable`, create from `$request->validated()`, and set ownership fields from the authenticated user or the route.
- A form request whose `authorize()` returns `true` with no policy behind it is an open door. Put rules in `rules()` and authorisation in a policy, called from the controller (`Gate::authorize`, `$this->authorize` or `can` middleware, depending on the Laravel version; Laravel 11+ base controllers no longer include `AuthorizesRequests` by default).
- Policies cover `viewAny`, `view`, `create`, `update`, `delete`; the index query must still be scoped to what the user may see, since `viewAny` does not filter rows.
- Nested routes need scoped bindings (`->scoped()`), or `/teams/1/invoices/99` loads invoice 99 from another team.
- API resources shape output; use `whenLoaded` for relations and eager load with `with()` in the controller. Turn on `Model::preventLazyLoading()` outside production so N+1 queries fail in tests.
- Migrations: foreign keys with `constrained()` and a deliberate delete behaviour, indexes on filtered columns, unique constraints for business uniqueness.
- Lists use `paginate()` or `cursorPaginate()` with a cap on per-page.
- Tests with Pest (or PHPUnit if the project uses it): `RefreshDatabase`, factories, `actingAs`, `assertForbidden`, `assertJsonPath`, `assertDatabaseHas`.
</context>

<task>
Build this resource:
{{resource_spec}}

1. Read `composer.json` (Laravel version, Pest or PHPUnit), routes, an existing model, form request, policy, resource and controller, and the tests. Follow their patterns and the project's artisan generator conventions.
2. Write the contract: routes, methods, fields per action, validation rules, who may do what, pagination.
3. Implement the migration, model with `$fillable` and relations, factory, form requests, policy, API resource and collection, resource controller with eager loading, and routes with scoped bindings.
4. Write feature tests: each action for an allowed user, a forbidden user, another team's record, validation failures, mass-assignment attempts ignored, pagination.
5. Run the migrations against the test database, the tests and the project's static analysis (Larastan or PHPStan) if present. Fix what fails.
</task>

<constraints>
- Never use `$request->all()` for create or update, or an empty `$guarded`.
- Never leave `authorize()` returning `true` without a policy check.
- Do not run migrations against a non-test database without confirmation.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method | URI | Policy ability | Validation | Response.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>
