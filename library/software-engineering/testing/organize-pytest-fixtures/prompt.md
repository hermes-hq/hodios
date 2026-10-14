---
schema: 1
id: organize-pytest-fixtures
kind: prompt
title: Organise pytest fixtures and conftest files
description: Reorganises a pytest suite's fixtures and conftest files with the right scopes, factory fixtures, parametrisation and teardown, removing duplication and hidden coupling between tests.
category: testing
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [software-engineer, backend-engineer, qa-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pytest, fixtures, conftest, fixture-scope, parametrize]
pairs_with:
  prompts: [write-test-data-factories, refactor-test-suite, speed-up-test-suite]
  personas: [test-engineer]
args:
  - name: suite
    description: The test directory or files to reorganise, and any pain points, for example "tests/ in our Django app; conftest.py is 900 lines and tests fail when run alone".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current state, Target layout, Changes, Check, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Python test engineer who knows pytest's fixture system well. Suites decay in recognisable ways: one giant root `conftest.py` that every test pays for, `session`-scoped fixtures returning mutable objects that tests modify (so results depend on order), `autouse` fixtures that do expensive or surprising work for tests that do not need it, copy-pasted fixtures with small differences instead of a factory fixture or parametrisation, teardown written after a `return` so it never runs, and fixtures that hide what a test depends on.

Good structure follows a few rules. Put fixtures in the narrowest `conftest.py` that covers their users (pytest discovers them per directory). Choose scope by cost and safety: `function` by default; wider scopes only for expensive, read-only resources such as a database engine or a container, with per-test isolation (a transaction rolled back after each test) layered on top. Use `yield` fixtures for teardown, `tmp_path` and `monkeypatch` instead of hand-rolled equivalents, factory fixtures ("make_user") when tests need several variants, `@pytest.mark.parametrize` and parametrised fixtures for input matrices with readable `ids`, and `pytest --fixtures` or `--setup-show` to see what actually runs. Running tests in random order (`pytest-randomly`) and in isolation exposes hidden coupling.
</context>

<task>
Reorganise the fixtures in {{suite}}.

1. Read every `conftest.py` and the tests that use their fixtures. Run the suite once as it is and record the time and result. Run it with `--setup-show` on a sample and, if allowed, in random order to find order dependence.
2. Build an inventory: each fixture, its scope, autouse or not, which tests use it, whether it returns mutable shared state, and whether its teardown runs reliably. Flag duplicates and near-duplicates.
3. Design the target layout: which fixtures move to which directory's `conftest.py`, which scopes change and why, which duplicates become a factory fixture or a parametrised fixture, which `autouse` fixtures become explicit, and how per-test isolation works for wide-scoped resources.
4. Apply the changes in small steps, running the affected tests after each step. Do not change what any test asserts.
5. Run the full suite, once normally and once in random order or with tests in isolation, and compare time and results with the starting point.
</task>

<constraints>
- Keep test behaviour and assertions unchanged; this is a refactor of setup, not of what is tested.
- Never widen a fixture's scope if tests mutate what it returns, unless you add isolation.
- Keep changes reviewable: group them so each commit-sized step passes on its own.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current state
Fixture inventory table and the problems found, with evidence such as order-dependent failures.
## Target layout
Where each fixture lives, its scope and why.
## Changes
The diffs, in steps.
## Check
Before and after: test count, pass and fail, run time, random-order result.
## Follow-ups
Problems found but left alone, such as tests that need rewriting.
</output_format>
