---
schema: 1
id: review-diff-for-resource-leaks
kind: prompt
title: Review a diff for resource leaks
description: Reviews a change for unclosed files, connections and streams, listeners never removed, unbounded caches and timers, threads or goroutines left running, before profiling is needed.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, frontend-engineer, mobile-engineer]
stack: []
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
tags: [resource-leaks, connection-pools, event-listeners, caching, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, find-memory-leak, review-error-handling]
args:
  - name: diff
    description: The change, with file paths and the code that creates and owns the resources it uses (pools, clients, listeners, caches).
    type: text
    required: true
  - name: context
    description: Language and runtime, whether the code runs in a long-lived process (server, worker, desktop or mobile app) or a short script, and pool sizes or memory limits.
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
Leaks rarely fail a test; they fail on day three of uptime, or after the hundredth navigation. Catching them in review is cheaper than profiling later. Every acquired resource needs a release on every path, and the paths that matter are the unhappy ones: an exception thrown between open and close, an early return, a cancelled task, a timeout. The safe shapes are the language's scoped constructs (`try-with-resources`, `using`, `with`, `defer`, RAII, `finally`); manual `close()` calls at the end of a function are the warning sign. Resources include more than files: database connections and transactions (an unreleased one exhausts the pool, and then every request hangs), HTTP response bodies that must be read or closed for the connection to be reused, sockets, locks and semaphores, child processes, and temp files. Listener and subscription leaks keep whole object graphs alive: an event listener, observer, `setInterval`, subscription or callback registered on something long-lived (window, a singleton, a global bus) for every component instance, request or call, and never removed. Unbounded growth is a leak too: a cache or map keyed by user id, request id or URL with no size limit or expiry, a memoised function over unbounded inputs, a list that only gets appended. Background work leaks when nothing stops it: threads, goroutines, timers and tasks started per request or per screen with no cancellation tied to the owner's lifetime.
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

1. If you can read the repository, open each changed file in full and find who owns each resource the change acquires and when that owner ends (request, component, process), before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. List every resource the change acquires: files, connections, transactions, response bodies, sockets, locks, processes, temp files, listeners, subscriptions, timers, threads, tasks and cache entries.
3. For each, find the release and check it runs on every path: normal return, early return, exception, timeout and cancellation. Flag manual releases that an exception can skip, and propose the language's scoped construct.
4. For each listener, subscription, timer or callback, name the object it is registered on and the owner that should remove it. Flag registrations repeated per call, request or render without removal.
5. For each cache, map, list or memo that grows, name what bounds it (size limit, expiry, owner lifetime). Flag growth keyed by unbounded values such as user ids, URLs, request ids or timestamps.
6. For each thread, goroutine, task or scheduled job started, name what stops it, and flag those started per request or per screen without cancellation or a shutdown path.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (pool or file-descriptor exhaustion that takes the service down, growth that leads to out-of-memory in a long-lived process), medium (leaks per user action in apps, slow growth with a restart cadence that hides it), low (leaks in short-lived scripts).
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Each finding names the path that leaks (which exception, return or event) and how fast it accumulates under realistic load.
- Do not flag resources in a short-lived script or ones the runtime reliably cleans up at exit unless the context says the process is long-lived.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the resource, the path where it is not released, the rate of accumulation and its eventual failure, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
