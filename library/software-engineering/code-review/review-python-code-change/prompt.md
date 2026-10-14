---
schema: 1
id: review-python-code-change
kind: prompt
title: Review a Python code change
description: Reviews a Python diff for mutable defaults, late-binding closures, broad excepts, truthiness bugs, misleading type hints, import-time side effects and lost asyncio tasks.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer, data-engineer]
stack: [python]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [type-hints, exceptions, asyncio, closures, pull-request]
pairs_with:
  personas: [python-engineer]
  prompts: [review-pull-request, review-error-handling]
  rules: [python-style-rules]
args:
  - name: diff
    description: The diff with file paths, including callers of changed functions and module-level code in touched modules.
    type: text
    required: true
  - name: context
    description: Python version, whether the code runs under a type checker (mypy, pyright) in CI, frameworks in use, and whether it runs in a long-lived process, a script or a serverless function.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Python's traps are small and repeatable. A mutable default argument (`def f(items=[])`) is created once and shared by every call. Closures bind names, not values, so lambdas built in a loop all see the last value. `except Exception:` with `pass` or a log line hides real failures, and a bare `except:` also catches `KeyboardInterrupt` and `SystemExit`. Truthiness checks treat `0`, `0.0`, `""` and `[]` as missing, so `if not quantity:` rejects a valid zero and `x or default` replaces it. `is` compares identity, so `x is 1000` or `s is "yes"` works by accident in one interpreter and fails in another. Type hints are not enforced at runtime: a hint saying `str` on a value that can be `None` lies to every reader, and `Any` or `cast` silences the checker where the bug is. Module-level code runs at import: opening a database connection, reading required environment variables or calling the network there breaks tests, CLI help and cold starts. Generators and iterators are exhausted after one pass. Mutating a list while iterating skips items, and a dict changing size during iteration raises. Class attributes that are mutable are shared by all instances. `open()` without `encoding=` uses the platform's locale. `assert` statements vanish under `python -O`, so they cannot validate input. In asyncio, a task created with `create_task` and not referenced can be garbage-collected mid-run, and an exception in it is never seen. Defining `__eq__` without `__hash__` makes instances unhashable.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed module in full, including its module-level code, and the callers of changed functions, before judging any hunk. Run the type checker and tests the project uses if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. Check function definitions: mutable default arguments, closures or lambdas created in loops that capture the loop variable, mutable class attributes used as per-instance state, and `__eq__` without `__hash__` on objects used in sets or as dict keys.
3. Check conditions and comparisons: truthiness tests where 0, empty string or empty list are valid values, `or` used for defaults on such values, `is` used for value comparison, `== None`, and chained comparisons or float equality that change results.
4. Check exceptions: bare `except:`, `except Exception` that swallows or only logs, exceptions re-raised without `from` losing the cause, `assert` used for validation, and `finally` blocks that return.
5. Check typing and data flow: hints that disagree with what the code returns (including missing `Optional`), `Any`, `cast` or `# type: ignore` that hide a mismatch, iterators or generators consumed twice, and lists or dicts mutated while being iterated.
6. Check module and runtime effects: work at import time (connections, network, required env vars, heavy computation), `open` without an encoding, `subprocess` with `shell=True` on interpolated input, and in asyncio code tasks without references, blocking calls in coroutines, and `await` missing on coroutines.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (data shared between calls or requests, failures swallowed on writes, wrong results from truthiness on valid zero values, lost background tasks), medium (exceptions on rare inputs, type hints that mislead callers, import-time failures in tests), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Python version you assumed for version-dependent syntax (`match`, `X | None`, `TaskGroup`).
- Each finding includes a concrete call or input that triggers it, such as `f()` called twice or `quantity=0`.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the function or module, the defect, the triggering call or input, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
