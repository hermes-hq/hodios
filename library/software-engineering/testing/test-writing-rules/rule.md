---
schema: 1
id: test-writing-rules
kind: rule
title: Test-writing rules
description: Standing rules for tests an assistant writes, covering behaviour over implementation, no sleeps, deterministic data, mocks only at boundaries and one reason to fail per test.
category: testing
version: 1.0.0
status: experimental
stage: [verify, build]
role: [software-engineer, qa-engineer, backend-engineer, frontend-engineer]
requires: [none]
risk: read-only
tags: [deterministic-tests, mocking, flaky-tests, test-design]
applies_to: ["**/*.test.*", "**/*.spec.*", "**/*_test.*", "**/test_*.py"]
pairs_with:
  rules: [python-style-rules, go-style-rules, rust-style-rules, react-component-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change tests in this project:

**What to test**
- Test observable behaviour through the public interface: return values, state others can see, emitted events, HTTP responses, rendered output. Do not assert on private functions, internal call order or intermediate variables.
- Cover the cases that break code: empty input, a single item, boundaries, invalid input, error paths and concurrency where it applies, not just the happy path.
- Every bug fix comes with a test that fails without the fix.

**Shape**
- Each test checks one behaviour and has one reason to fail. Several assertions are fine when they describe the same behaviour.
- Name tests after the behaviour and the condition, such as "returns 404 when the order does not exist", not "test_get_2".
- Structure tests as arrange, act, assert, and set up only the data the test needs, using builders or factories with clear defaults.
- Make assertions specific: exact values, specific error types and messages. Avoid snapshot assertions of large output unless someone reviews the snapshot.

**Determinism**
- Never use sleeps to wait for something. Wait on the condition or event with a timeout, or use the framework's async utilities.
- Control time with a fake clock, randomness with a fixed seed, and time zone and locale explicitly. Never depend on the current date.
- Tests must not depend on execution order or on state left by other tests. Clean up files, records and global state, and give each test its own data.
- No real network calls to third parties in unit tests.

**Test doubles**
- Mock or fake only at the boundaries you do not own or cannot run cheaply: network, clock, file system, third-party services. Do not mock the unit under test or its internal collaborators.
- Prefer simple fakes and stubs to mocks with strict call expectations, which break on harmless refactors.

**Integrity**
- Follow the project's test framework, file layout and helpers. Do not add a new test library without asking.
- Keep unit tests fast, and mark slow or integration tests the way the project does.
- Run the tests you wrote and report the real result. If you could not run them, say so.
{{> guardrails/no-hardcoding-to-pass-tests}}
