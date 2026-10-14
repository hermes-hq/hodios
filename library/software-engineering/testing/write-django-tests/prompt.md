---
schema: 1
id: write-django-tests
kind: prompt
title: Write Django tests
description: Writes Django tests for models, views, forms and permissions with the test client or pytest-django, factories, assertNumQueries, transactional isolation and on_commit handling.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [django]
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
tags: [pytest-django, factory-boy, test-client, query-count, permissions]
pairs_with:
  prompts: [write-api-endpoint-tests, write-test-data-factories, write-pytest-tests]
  personas: [python-engineer, test-engineer]
args:
  - name: target
    description: The app, models, views, forms or DRF viewsets to test, as paths or pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cases, Setup, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Django engineer who knows its test machinery and its traps:
- `django.test.TestCase` wraps each test in a transaction and rolls it back; `TransactionTestCase` truncates tables instead and is much slower, needed only for code that relies on real commits. `transaction.on_commit` callbacks (often used to enqueue Celery tasks or send email) never fire inside `TestCase` unless the test uses `self.captureOnCommitCallbacks(execute=True)` (or `django_capture_on_commit_callbacks` in pytest-django).
- `setUpTestData` creates data once per class; mutating those objects in a test was unsafe before Django 3.2 deep-copied them. With pytest-django, tests need the `db` marker or fixture, and `django_db_setup` controls the test database.
- `assertNumQueries` (or `django_assert_num_queries`) pins query counts on list views and serialisers so N+1 regressions fail the build.
- `self.client.force_login(user)` skips the login form; test permissions with real users, groups and permissions, including anonymous and other-owner cases. DRF views use `APIClient` and `force_authenticate`.
- Factories (factory_boy, or model_bakery) that set only what each test needs beat large JSON fixtures that rot when models change.
- `mail.outbox` captures sent email under the locmem backend; `override_settings` changes settings per test; `freezegun` or time-machine, if present, controls `timezone.now()`.
- Forms and model `clean()` methods are worth testing directly; template rendering is best checked by response content and `assertTemplateUsed` sparingly.
</context>

<task>
Write Django tests for {{target}}.

1. Read the code, `settings` for tests, existing tests, factories and whether the suite uses Django's runner or pytest-django. Note the Django and DRF versions. Follow what exists.
2. List the cases: model methods, constraints and `clean()` rules; form validation; each view or endpoint's success, validation errors, anonymous access, wrong-user access and missing objects; side effects (email, `on_commit` tasks, signals).
3. Set up data with factories (add factories if missing), `setUpTestData` or fixtures with the right scope, and users with the exact permissions each case needs.
4. Write the tests: client requests with `force_login` or `force_authenticate`, assertions on status, redirects, response content or JSON and database state, `captureOnCommitCallbacks(execute=True)` where callbacks matter, `mail.outbox` for email, and `assertNumQueries` on list endpoints.
5. Run the tests (`python manage.py test <app>` or `pytest`) and report the result, then list gaps.
</task>

<constraints>
- Use `TransactionTestCase` only when the code needs real commits, and say why.
- Do not load large JSON fixtures for new tests when factories exist or can be added.
- Do not mock the ORM; use the test database.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test, scenario, expected outcome.
## Setup
Factories, users and permissions, settings overrides.
## Tests
The test files.
## Check
Commands run and results.
## Gaps
What is not covered and why.
</output_format>
