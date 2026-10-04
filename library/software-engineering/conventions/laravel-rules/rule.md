---
schema: 1
id: laravel-rules
kind: rule
title: Laravel rules
description: Standing rules for Laravel code covering thin controllers, form requests, policies, Eloquent relations and eager loading, queues, config caching and feature tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: [laravel]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [eloquent, form-requests, authorization, queues, n-plus-one]
applies_to: ["app/**/*.php", "routes/**/*.php", "config/**/*.php", "database/**/*.php", "tests/**/*.php", "resources/views/**"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Laravel application:

**Know the project first**
- Check the Laravel version in `composer.lock` and follow that version's structure (for example where middleware and exception handling are registered) and the conventions already in this codebase. Use artisan generators (`make:model`, `make:request`, `make:policy`) so files land in the expected places.

**Controllers**
- Keep controllers thin: authorise, take validated input, call domain code, return a response or API resource. Move multi-step business logic into action or service classes (whichever the project already uses).
- Return API responses through API resources, not raw models, so hidden and computed fields are controlled in one place.

**Validation and authorisation**
- Validate input in Form Request classes, and use `$request->validated()` (or `safe()`) to read it. Never pass `$request->all()` to `create` or `update`.
- Authorise with policies and gates: in the Form Request's `authorize()`, with `$this->authorize()` or `can` middleware. Hiding a link is not authorisation.
- Define `$fillable` (or the project's chosen guarding approach) on every model, and never make server-owned fields such as `is_admin`, `user_id` or `price` mass assignable from user input.
- Scope lookups to the current user or tenant (`$request->user()->projects()->findOrFail($id)`), or rely on route model binding with scoped bindings, not a bare `find` on a user-supplied id.

**Eloquent**
- Define relations with return types and use them instead of manual foreign-key queries.
- Eager load every relation a view, resource or loop touches (`with`, `load`, `withCount`). Keep `Model::preventLazyLoading()` enabled outside production if the project has it, and fix violations rather than disabling it.
- Never query inside a loop. Use `whereIn`, `upsert`, `chunkById` or `lazyById` for large sets, and database aggregates instead of counting collections in PHP.
- Wrap multi-step writes in `DB::transaction`. Use the query builder's bindings for all input; never concatenate user input into `DB::raw` or `whereRaw`.
- Back uniqueness rules with unique indexes and relations with foreign keys in migrations. Migrations have a working `down` method or are explicitly irreversible.

**Queues and side effects**
- Put slow or failure-prone work (mail, notifications, third-party calls, exports) in queued jobs implementing `ShouldQueue`. Make jobs idempotent, set `tries`, `backoff` and `timeout`, and handle failure in `failed()`.
- Dispatch jobs and events that depend on a database write after the transaction commits (`afterCommit`).

**Configuration**
- Call `env()` only inside `config/*.php` files. Everywhere else use `config('...')`; once config is cached in production, `env()` outside config returns null.
- Add new settings to a config file with a sensible default and document them in `.env.example`. Never commit `.env` or real secrets.

**Views and output**
- Echo values with Blade's escaped double-brace syntax. Use the raw, unescaped echo only for trusted, already-sanitised HTML, and say why in a comment next to it.

**Tests**
- Write feature tests (Pest or PHPUnit, whichever the project uses) that hit routes, using `RefreshDatabase` and model factories. Fake external effects with `Http::fake`, `Queue::fake`, `Mail::fake` and `Storage::fake`.
- Cover validation errors, the forbidden case for another user, and the happy path for every endpoint you add or change.
- Before finishing, run the tests and the static analysis or formatter the project uses (for example Larastan or Pint).
