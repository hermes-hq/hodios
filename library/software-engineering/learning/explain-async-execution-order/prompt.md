---
schema: 1
id: explain-async-execution-order
kind: prompt
title: Explain the order async code runs in
description: Predicts and explains the order in which async code runs (JavaScript event loop, promises and async/await, Python asyncio, goroutines) with a timeline and the exact output.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, frontend-engineer, backend-engineer, student]
stack: [javascript, python, go]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [event-loop, concurrency, async-await, promises]
pairs_with:
  prompts: [fix-unawaited-async-bug, test-asynchronous-code, drill-code-reading]
args:
  - name: code
    description: The async code, ideally a short self-contained snippet.
    type: text
    required: true
  - name: runtime
    description: Where it runs (browser, Node.js version, Python version with asyncio, Go).
    type: string
  - name: observed
    description: The output you saw, if it surprised you.
    type: text
output_contract:
  format: markdown
  sections: [Predicted output, Timeline, Why this order, Deterministic or not, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Async ordering follows rules that are simple once named and baffling until then. In JavaScript, synchronous code runs to completion first; then all microtasks (promise callbacks, code after `await`, `queueMicrotask`) drain before the next macrotask (`setTimeout`, I/O callbacks, events); in Node, `process.nextTick` runs before promise microtasks, and `setImmediate` versus `setTimeout(0)` order depends on context. An `async` function runs synchronously until its first `await`. In Python asyncio, nothing runs concurrently until the current coroutine awaits, calling a coroutine without awaiting it does nothing, and `create_task` schedules but does not start immediately. In Go, goroutine order is not guaranteed at all; only channels, `sync` primitives and `WaitGroup` create ordering, and `main` returning kills running goroutines. A correct explanation separates guaranteed order from order that merely happened.
</context>

<task>
Explain the execution order of this code{{#runtime}} running on {{runtime}}{{/runtime}}:

```
{{code}}
```
{{#observed}}
The learner observed: {{observed}}
{{/observed}}

1. Identify the language and runtime, and state the assumption if not given, including any version-dependent behaviour.
2. Predict the exact output.
3. Build a timeline table: step, what runs, what it schedules (and onto which queue: call stack, microtask, macrotask or timer, event loop ready queue, goroutine), and the queue contents after the step.
4. Explain why the order is what it is, naming the rule at each surprising point (for example "code after await is a microtask", "the coroutine was created but never awaited", "main exited before the goroutine ran").
5. Say which parts of the order are guaranteed by the language and which depend on timing or scheduling, and how the code would need to change to guarantee an order if that matters.
6. If an observed output was given and differs from the prediction, explain which non-guaranteed part explains it, or what in the environment differs.
</task>

<constraints>
- Never present a scheduling-dependent order as guaranteed. For Go and threads, say plainly that the order is not deterministic without synchronisation.
- Base each step on the runtime's documented rules, not on intuition about speed.
- Keep the explanation on this code; introduce the general model only as far as needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Predicted output
A code block, or the possible outputs if not deterministic.
## Timeline
A table: step, runs, schedules, queues after.
## Why this order
Numbered rules, each tied to a step.
## Deterministic or not
Which parts are guaranteed, and how to enforce an order.
## Questions
Assumptions about runtime or version that would change the answer.
</output_format>
