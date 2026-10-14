---
schema: 1
id: write-laravel-feature-tests
kind: prompt
title: Write Laravel feature tests
description: Writes Laravel feature tests with Pest or PHPUnit using database refresh, model factories, actingAs, and the Mail, Queue, Event, Notification, Storage and Http fakes.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer]
stack: [laravel]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pest, phpunit, model-factories, feature-tests, laravel-fakes]
pairs_with:
  prompts: [write-api-endpoint-tests, write-test-data-factories]
  personas: [php-laravel-engineer, test-engineer]
args:
  - name: feature
    description: The routes, controllers, form requests, jobs or Livewire components to test, as paths or pasted code.
    type: text
    required: true
  - name: runner
    description: Pest or PHPUnit, if not obvious from the project.
    type: string
output_contract:
  format: markdown
  sections: [Behaviours, Setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Laravel engineer who writes feature tests that go through routing, middleware, form requests, policies and the database. Laravel's testing helpers make this fast when used well: `RefreshDatabase` (or `LazilyRefreshDatabase`) migrates once and wraps each test in a transaction; model factories with states (`User::factory()->admin()->create()`) build data; `actingAs($user)` authenticates; `getJson`, `postJson` and friends with `assertStatus`, `assertJsonPath`, `assertJsonValidationErrors`, `assertRedirect` and `assertSessionHasErrors` check responses; `assertDatabaseHas` and `assertDatabaseMissing` check side effects.

The fakes are where tests usually go wrong. `Mail::fake()`, `Notification::fake()`, `Queue::fake()`, `Bus::fake()`, `Event::fake()`, `Storage::fake('s3')` and `Http::fake()` must be called before the action, and assertions should check what matters (`Mail::assertQueued(WelcomeMail::class, fn ($m) => $m->hasTo($user->email))`), not just that something happened. `Event::fake()` without a list also stops model event listeners, which can silently break the feature under test. `Http::preventStrayRequests()` catches accidental real calls. Tests should run on the same database engine as production when queries use engine-specific features; SQLite in-memory is fast but differs from MySQL and PostgreSQL.
</context>

<task>
Write feature tests for this Laravel code{{#runner}} using {{runner}}{{/runner}}:

{{feature}}

1. Read the routes, controllers, form requests, policies, models, factories and existing tests. Check the database configured for testing in `phpunit.xml` and whether it matches production.
2. List behaviours: success for each action, validation errors per rule, unauthenticated, forbidden by policy including other users' records, not found, and side effects (rows, mail, notifications, jobs, events, files, outbound HTTP).
3. Set up: `RefreshDatabase`, factories with the states needed (add missing states rather than building data by hand), and the fakes the feature needs, called before the action, with `Http::preventStrayRequests()` when HTTP is faked.
4. Write the tests, one behaviour each, asserting the response, the database state, and the faked side effects with closures that check recipients and payloads. Check that a failed validation creates nothing and sends nothing.
5. Run `php artisan test` or `vendor/bin/pest` and report results.
</task>

<constraints>
- Fake external effects before acting; never send real mail or call real external APIs from tests.
- Fake only the events you mean to, so model listeners the feature relies on still run.
- Do not bypass policies or middleware in tests to make them pass.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours
Table: route or action, case, expected response, side effects asserted.
## Setup
Traits, factories and fakes used, and any factory states added.
## Tests
The test files.
## Check
Commands run and results.
</output_format>
