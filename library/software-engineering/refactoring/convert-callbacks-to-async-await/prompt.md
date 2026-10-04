---
schema: 1
id: convert-callbacks-to-async-await
kind: prompt
title: Convert callbacks to async/await
description: Converts callback-style and promise-chain code to async/await across a module or repo without changing behaviour, keeping error handling, ordering and concurrency, with tests run before and after.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [async-await, promises, callbacks, modernization, concurrency]
pairs_with:
  prompts: [add-characterization-tests, simplify-function]
args:
  - name: scope
    description: Files, directories or globs to convert, for example "src/storage/" or "lib/legacy/*.js".
    type: text
    required: true
  - name: language
    description: Language of the code. Each has its own async model and pitfalls.
    type: enum
    enum: [javascript, typescript, python, csharp]
    default: typescript
  - name: test_command
    description: The command that runs the relevant tests, for example "npm test -- src/storage" or "pytest tests/storage".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Inventory, Changes, Behaviour notes, Not converted, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mechanical async/await conversions break code in quiet ways. Work that ran in parallel becomes sequential because each call is awaited in a loop. Errors that a callback swallowed now reject and crash the process, or errors that rejected now vanish because a promise is no longer returned or awaited. A callback that fired twice, or synchronously, now behaves differently. `finally`-style cleanup runs at a different time. Public APIs that accepted a callback lose it and break callers outside the scope. The goal is the same behaviour with clearer code, proven by the same tests passing before and after.
</context>

<task>
Convert the asynchronous code in {{scope}} ({{language}}) to async/await.

1. Run `{{test_command}}` before changing anything and record the result. If it fails, stop and report the failures; do not refactor on a red baseline. If the scope has little or no test coverage of the async paths, say so and propose characterization tests before converting; add them only if they stay inside the scope.
2. Inventory every asynchronous construct in scope: callback-taking functions, promise chains (`then`, `catch`, `finally`), event-based APIs, and for Python or C# the equivalent (callbacks, futures, `ContinueWith`, blocking `.Result` or `.Wait()`). For each, note who calls it and whether it is a public API used outside the scope.
3. Convert from the leaves inward, one function or small group at a time, running the tests after each group:
   - Wrap callback-only dependencies once, with the platform's promisify helper or a small hand-written wrapper, rather than inside every caller.
   - Preserve concurrency. Independent operations that ran in parallel stay parallel (`Promise.all` or `Promise.allSettled`, `asyncio.gather` or a task group, `Task.WhenAll`). Use a sequential loop only where order or rate limits require it, and say which.
   - Preserve error semantics exactly: what was passed to the callback's error argument now rejects or raises; errors that were deliberately ignored stay ignored with an explicit `try`/`catch` and a comment; every promise is awaited or returned, with no floating promises.
   - Preserve ordering and cleanup: code that ran after a callback runs after the `await`, and cleanup moves into `finally`.
   - Keep public signatures that callers outside the scope depend on. Where a public function took a callback, keep a callback-compatible wrapper around the new async implementation, or list it under Not converted with the callers that would need to change.
4. Language specifics: in {{language}}, follow its rules. In JavaScript and TypeScript, never pass an async function where the caller ignores the returned promise (such as `forEach` or event emitters) without handling rejection. In Python, do not call blocking I/O inside a coroutine, and do not create nested event loops. In C#, avoid `async void` except for event handlers, propagate `CancellationToken`s, and follow the codebase's `ConfigureAwait` convention.
5. Run `{{test_command}}`, the type checker and the linter at the end, and compare with the baseline.

If {{scope}} is too large to convert safely in one pass (as a rough guide, more than about 30 functions or several public APIs), convert the most self-contained part, then stop and propose the order for the rest.
</task>

<constraints>
- Change how the code is written, not what it does. No new features, renamed exports, changed log messages or reformatting of untouched lines.
- Do not remove error handling to make code shorter.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
The test command and its result before changes.

## Inventory
| Function | File | Construct | Public? | Converted? |

## Changes
A unified diff, grouped by file.

## Behaviour notes
Every place where concurrency, error propagation, ordering or timing needed a deliberate decision, and what you chose.

## Not converted
Items left alone and why (public callback APIs, missing tests, out of scope), with the callers affected.

## Verification
Commands run after the change and their real results, compared with the baseline.
</output_format>
