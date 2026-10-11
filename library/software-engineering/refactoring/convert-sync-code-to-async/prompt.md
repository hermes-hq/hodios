---
schema: 1
id: convert-sync-code-to-async
kind: prompt
title: Convert blocking I/O code to async
description: Converts blocking Python or Node.js I/O code to async, picking async-native libraries, bridging sync callers, bounding concurrency and keeping blocking calls off the event loop, with tests.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
stack: [python, nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [asyncio, async-await, event-loop, concurrency, io-bound]
pairs_with:
  prompts: [convert-callbacks-to-async-await, fix-event-loop-blocking, parallelize-python-workload, parallelize-sequential-io-calls]
  personas: [concurrency-specialist]
args:
  - name: scope
    description: The module, service or call path to convert, its language and framework, and why (the framework is async, too many threads, slow fan-out calls).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the project's usual one.
    type: string
output_contract:
  format: markdown
  sections: [Call graph, Plan, Changes, Check, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Async spreads: once a function awaits, every caller must be async too, so converting one database call can touch fifty functions. Half-done conversions are worse than none. In Python, the main traps are calling a blocking library inside `async def` (`requests`, `time.sleep`, a sync database driver, file I/O, CPU-heavy parsing), which stalls every request on the loop; forgetting `await`, which returns a coroutine that never runs; calling `asyncio.run` from code already in a loop; and creating fire-and-forget tasks without keeping a reference, so they get garbage-collected or their exceptions vanish. Each blocking library has an async counterpart (`httpx` or `aiohttp`, `asyncpg` or SQLAlchemy's async engine, `aiofiles` or `asyncio.to_thread`), and anything without one goes through `asyncio.to_thread` or a process pool. In Node.js, I/O is already non-blocking, so "sync" means `fs.readFileSync`, `execSync`, `crypto` sync functions or a synchronous loop over CPU work; the fix is the promise APIs and worker threads for CPU work. In both, turning a sequential loop into `asyncio.gather` or `Promise.all` without a limit can open thousands of connections and get the service rate-limited or the database exhausted; a semaphore or `p-limit` bounds it. Sync callers that remain (CLI scripts, Celery tasks, legacy code) need a deliberate bridge, not scattered `asyncio.run` calls. Timeouts, cancellation and exception handling in `gather` (`return_exceptions`, `TaskGroup` in Python 3.11+, `Promise.allSettled`) change behaviour and must match the old semantics.
</context>

<task>
Convert {{scope}} to async.
{{#test_command}}Test command: {{test_command}}{{/test_command}}

1. Read the code path and map the call graph from entry points down to every blocking call (network, database, file, subprocess, sleep, CPU-heavy work). Note sync callers that will remain and the language and framework versions.
2. Run the tests and record the baseline, adding characterization tests for the path if coverage is thin.
3. Plan the order: replace leaf libraries with async ones (or wrap them in `to_thread` or worker threads), then convert upwards to the entry points. Define the bridge for remaining sync callers in one place. Show the plan and wait for confirmation if the user asked for interactive mode.
4. Convert in small steps, running tests after each. Where independent calls can run concurrently, use `gather`, `TaskGroup` or `Promise.all` with an explicit concurrency limit, and keep the old ordering where callers depend on it.
5. Keep timeouts, retries and error semantics: decide what happens when one of several concurrent calls fails, and add cancellation handling where the old code had cleanup.
6. Check for leftovers: blocking calls inside async functions (enable asyncio debug mode or a linter rule such as flake8-async), un-awaited coroutines, and unhandled promise rejections. Run the full tests and report results, with a timing comparison if speed was the goal.
</task>

<constraints>
- Do not leave blocking calls inside async functions; wrap or replace them, and list any you could not.
- Do not add unbounded concurrency; every fan-out gets a limit.
- Do not change public function signatures used outside the scope without a sync wrapper or a listed breaking change.
- Convert in steps with tests passing between them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Call graph
Entry points down to blocking calls, as a short tree.
## Plan
Ordered steps, library replacements, and the sync bridge.
## Changes
One line per file: `path`, what changed.
## Check
Test results per step, leftover-blocking check, and timings if measured.
## Risks
Behaviour that changed or needs watching (ordering, error handling, connection counts).
</output_format>
