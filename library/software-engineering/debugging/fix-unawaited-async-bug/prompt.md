---
schema: 1
id: fix-unawaited-async-bug
kind: prompt
title: Fix a missing await or async ordering bug
description: Finds and fixes missing awaits, unhandled promise rejections, fire-and-forget calls and wrong ordering in JavaScript, TypeScript or Python async code.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, fullstack-engineer]
stack: [javascript, typescript, python]
requires: [repo-read, file-write, shell]
inputs: [logs, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [async-await, promises, asyncio, unhandled-rejection]
pairs_with:
  prompts: [debug-race-condition, convert-callbacks-to-async-await]
  personas: [debugger]
args:
  - name: symptom
    description: "What goes wrong: an unhandled rejection warning, \"coroutine was never awaited\", a value that is a Promise object, work that happens out of order, a response sent before data is saved, a test that passes before its assertions run."
    type: text
    required: true
  - name: code
    description: "The function or files involved, or the paths to read in the repo."
    type: text
output_contract:
  format: markdown
  sections: [The async defect, Fix, Other spots with the same pattern, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has chased many async bugs. They look random because the effect shows up later than the mistake. The common ones:
- A missing `await`: the code gets a Promise or coroutine object instead of a value (`if (await isAllowed())` written without await is always truthy), or work runs after the caller returned.
- `forEach` with an async callback: `array.forEach(async x => ...)` does not wait for anything. Use `for...of` with await for sequential work or `Promise.all(array.map(...))` for parallel work.
- Fire-and-forget calls whose rejection goes unhandled, crashing Node (unhandled rejections terminate the process by default since Node 15) or losing the error.
- Async work in a request handler or serverless function that continues after the response is sent and is cut off when the runtime freezes or exits.
- `Promise.all` where one rejection abandons the others mid-flight; `Promise.allSettled` when each outcome matters.
- Python: calling a coroutine without `await` ("coroutine ... was never awaited"), `asyncio.create_task` whose task is not kept and can be garbage collected, blocking calls (`requests`, `time.sleep`) inside async code stalling the event loop, `asyncio.gather` swallowing errors with `return_exceptions=True`.
- Tests that do not await or return the promise, so assertions run after the test finished.
Lint rules catch most of these: `@typescript-eslint/no-floating-promises`, `no-misused-promises`, `require-await`; Python's asyncio debug mode and RuntimeWarnings.
</context>

<task>
Fix this async bug.

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the code path from the entry point (handler, job, test) down. List every call that returns a Promise or coroutine and check each is awaited, returned, or deliberately detached with error handling.
2. Find the defect that explains the symptom, and say how it produces it (the order things actually run in).
3. If you can, reproduce it with a test that awaits correctly and fails, or a log of the actual order.
4. Fix it: add the await, replace `forEach` with `for...of` or `Promise.all`, return the promise, keep a reference to created tasks, catch and log detached work, move work before the response, or replace a blocking call with its async equivalent. Choose sequential or parallel deliberately and say which.
5. Search the same files for the same pattern and list what you find.
6. Run the tests. If the project has a linter, say which rule would catch this and whether it is enabled.
</task>

<constraints>
- Do not add sleeps, timeouts or retries to paper over ordering.
- Do not convert sequential work to parallel (or the reverse) without checking it is safe: rate limits, shared state, required ordering.
- Do not silence unhandled rejections globally.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## The async defect
The exact call that is not awaited or runs in the wrong order (`path:line`), and what that causes.
## Fix
The diff.
## Other spots with the same pattern
Matching patterns found nearby, listed but changed only if they are the same bug.
## Verification
Tests or the reproduction run and the result, plus the lint rule that would catch it next time.
</output_format>
