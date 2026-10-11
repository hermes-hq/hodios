---
schema: 1
id: modernize-python-idioms
kind: prompt
title: Modernise dated Python idioms
description: Rewrites dated Python to current idioms (f-strings, pathlib, dataclasses, comprehensions, context managers, enumerate, type hints) for the project's Python version, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer, data-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pythonic-code, legacy-python, pyupgrade, ruff]
pairs_with:
  prompts: [modernize-python-packaging, replace-print-statements-with-logging]
  personas: [python-engineer]
  rules: [python-style-rules]
args:
  - name: target
    description: The files or package to modernise, as paths or pasted code, and the lowest Python version it must run on.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one (for example "pytest -q").
    type: string
output_contract:
  format: markdown
  sections: [Version and tools, Transformations, Diff, Skipped, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Python engineer modernising old code. The minimum supported Python version decides what is allowed: f-strings (3.6), dataclasses (3.7), the walrus operator (3.8), built-in generics like `list[int]` in annotations (3.9), `X | None` (3.10, or earlier with `from __future__ import annotations` in annotations only), `match` (3.10). Tools do much of the mechanical work: `pyupgrade` or Ruff's `UP` rules for syntax, Ruff's `SIM`, `C4` and `PTH` rules for simplifications, comprehensions and pathlib. Use them first, then review.

Where modernisation changes behaviour:
- **`%` or `.format` to f-strings:** fine, except format strings built at runtime or reused as templates (logging calls should keep `%s` lazy arguments, not f-strings).
- **`os.path` to `pathlib`:** `Path` objects are not strings; code that concatenates, compares or JSON-serialises them breaks. Convert at boundaries with `str()` where needed.
- **Class with `__init__` to `@dataclass`:** adds `__eq__` and `__repr__`, and removes hashability when `eq=True` and not frozen, which breaks objects used as dict keys or in sets.
- **Loops to comprehensions:** only when the loop builds a collection; loops with side effects or early exits stay loops.
- **Manual open and close to `with`:** a file kept open on purpose across calls must not be closed early.
- **`dict.has_key`, `type(x) == T`, mutable default arguments:** `isinstance` also accepts subclasses; fixing a mutable default changes behaviour for callers that relied on the shared state (a bug, but report it).
</context>

<task>
Modernise {{target}}.

1. Confirm the minimum Python version (from `pyproject.toml`, `setup.cfg`, CI matrix or the user) and list the idioms allowed.
2. Make sure tests cover the code; add characterisation tests for risky spots (path handling, objects used as dict keys, mutable defaults) where coverage is thin.
3. Run the automated fixers with rules matched to the minimum version, file by file, and review the output. Then do the manual changes: dataclasses where a class is a plain record, context managers, `enumerate` and `zip` instead of index loops, comprehensions where clearer.
4. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}, the linter and the type checker if configured, and report results.
5. List what you skipped and why, and any bugs the old idioms hid (report them, do not fix silently).
</task>

<constraints>
- No behaviour change, including hashing, equality, string versus Path types and logging laziness.
- Do not use syntax newer than the minimum supported Python version.
- Keep formatting changes to touched lines unless the project already runs a formatter on all files.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Version and tools
Minimum version, allowed idioms, fixers and rules used.
## Transformations
Table: transformation, files, automated or manual, cases kept old.
## Diff
The change.
## Skipped
What was not changed and why; bugs noticed.
## Check
Tests, lint and type check results.
</output_format>
