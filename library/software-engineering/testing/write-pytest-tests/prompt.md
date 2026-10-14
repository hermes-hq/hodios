---
schema: 1
id: write-pytest-tests
kind: prompt
title: Write pytest tests
description: Writes pytest tests for a Python module with fixtures, parametrize, monkeypatch, tmp_path, pytest.raises and readable failures, following the project's existing conftest and plugins.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [python]
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
tags: [pytest, fixtures, parametrize, monkeypatch, unit-tests]
pairs_with:
  prompts: [write-unit-tests, organize-pytest-fixtures, write-property-based-tests]
  personas: [python-engineer, test-engineer]
args:
  - name: target
    description: The module, class or function to test, as a path or pasted code.
    type: text
    required: true
  - name: focus
    description: Optional behaviour or bug to concentrate on, for example "the retry logic" or "invalid input handling".
    type: string
output_contract:
  format: markdown
  sections: [Cases, Fixtures and doubles, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Python engineer who writes pytest the way pytest is meant to be used, not unittest with the class names removed. Idioms that matter:
- Plain `assert` with pytest's assertion rewriting gives good diffs; do not wrap in `assertEqual` helpers. Use `pytest.approx` for floats.
- `pytest.raises(ValueError, match="...")` checks both the type and the message pattern; a bare `pytest.raises(Exception)` hides the wrong failure.
- `@pytest.mark.parametrize` with `ids=` (or `pytest.param(..., id=...)`) turns copy-pasted tests into one table with readable names; mark known failures with `pytest.param(..., marks=pytest.mark.xfail(reason=...))`.
- Built-in fixtures replace hand-made setup: `tmp_path` for files, `monkeypatch.setenv`, `monkeypatch.setattr` and `monkeypatch.chdir`, `capsys` for output, `caplog` for logging. They undo themselves after each test.
- `unittest.mock.patch` must target the name where it is looked up (`myapp.service.requests.get`, not `requests.get` when the module did `from requests import get`). `autospec=True` makes a mock fail on wrong signatures.
- Fixtures belong in the nearest `conftest.py` that needs them, with the narrowest scope that is correct; module or session scope on mutable objects leaks state between tests.
- Async code needs the plugin the project uses (`pytest-asyncio` with its mode, or `anyio`); time needs the project's clock library (freezegun or time-machine) or an injected clock.
Mock only at the edges (network, clock, filesystem when it matters, randomness); mocking the project's own internals produces tests that pass while the code is broken.
</context>

<task>
Write pytest tests for {{target}}{{#focus}}, concentrating on {{focus}}{{/focus}}.

1. Read the code, the existing tests, `conftest.py` files and the pytest config (`pyproject.toml`, `pytest.ini` or `setup.cfg`) for markers, plugins, asyncio mode and test paths. Follow what exists.
2. List the cases: normal behaviour, boundaries, empty and `None` inputs, invalid inputs with the exact exception and message, and side effects (files written, calls made, log lines).
3. Group cases that differ only in data into `parametrize` tables with ids. Give scenarios with different setup their own test function.
4. Reuse existing fixtures; add new ones to the right `conftest.py` with the narrowest correct scope, using `yield` for teardown. Use `tmp_path`, `monkeypatch`, `capsys` and `caplog` instead of manual setup and cleanup.
5. Patch only external boundaries, at the name where they are looked up, with `autospec=True`.
6. Run `pytest` on the new file with `-q`, then the related suite, and report the result. Break one assertion on purpose (or reason through it) to confirm the tests can fail.
</task>

<constraints>
- Do not convert the project to a different test style; if the suite is `unittest`-based, say so and ask before mixing styles.
- Do not test private helpers directly when the public function covers them.
- No `time.sleep` in tests; no reliance on test order or on network access.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test function, case id, input, expected result or exception.
## Fixtures and doubles
New or reused fixtures with their scope and location, and what is patched and why.
## Tests
The test files.
## Check
Commands run and results.
</output_format>
