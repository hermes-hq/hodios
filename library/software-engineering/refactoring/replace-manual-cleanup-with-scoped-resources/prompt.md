---
schema: 1
id: replace-manual-cleanup-with-scoped-resources
kind: prompt
title: Replace manual cleanup with scoped resources
description: Converts manual close, release and finally cleanup into with, using, try-with-resources, defer or RAII scopes so resources are released on every path.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [resource-management, context-managers, try-with-resources, leaks]
pairs_with:
  prompts: [find-memory-leak, simplify-function]
args:
  - name: code
    description: The files or functions with manual cleanup, as paths or pasted code, with the language.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Resources found, Conversion plan, Diff, Behaviour changes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Manual cleanup (`f.close()` at the end, `conn.release()` in some branches, `finally` blocks that grow with every resource) leaks on early returns and exceptions, and closes in the wrong order. Every mainstream language has a scoped form: Python `with` and `contextlib.ExitStack`, Java try-with-resources, C# `using` declarations, Go `defer` right after a successful acquire, Rust `Drop`, C++ RAII, JavaScript and TypeScript `try/finally` or `using` with `Symbol.dispose` where the runtime supports it, Kotlin `use {}`, Swift `defer`.

The conversion is mostly mechanical, but changes behaviour in edge cases: scoped forms close in reverse order of acquisition, which can differ from the old order; an exception thrown by close is suppressed (Java) or chained (Python) differently from the old code; `defer` in a Go loop runs at function exit, not per iteration, so long loops hold every file open; a resource returned to the caller or stored on an object must not be closed at scope exit; cleanup that was intentionally skipped on success (a transaction that commits) needs explicit commit and rollback. Pools and connections released in the wrong place are a common source of exhaustion under load.
</context>

<task>
Convert {{code}}.

1. Read the code and list every acquired resource (files, sockets, connections, locks, transactions, temp files, subprocesses) with where it is acquired and every path where it is or is not released, including early returns and exceptions.
2. Propose the scoped form for each, using the language's idiom and the project's existing helpers. Flag resources that escape the scope (returned, stored) and leave them alone or document the owner. Flag paths that leak today as bugs being fixed. Wait for approval if a release order or exception behaviour changes.
3. Convert function by function. For loops in Go, move the body into a function so `defer` runs per iteration.
4. Add a test for at least one leaking path (exception or early return) that now releases, then run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}.
5. Show the diff and list each behaviour change: release order, suppressed or chained close errors, fixed leaks.
</task>

<constraints>
- Do not close a resource that the caller or another object still owns.
- Do not change transaction semantics: commit and rollback stay where they were meant to happen.
- Keep error messages and exception types the same, except where a close error was previously lost or masked; report those.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Resources found
Table: resource, acquired at, paths that leak today.
## Conversion plan
Per resource, the scoped form.
## Diff
The change.
## Behaviour changes
Release order, error handling and fixed leaks.
## Check
Tests run and results.
</output_format>
