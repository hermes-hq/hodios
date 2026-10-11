---
schema: 1
id: replace-event-spaghetti-with-direct-calls
kind: prompt
title: Replace event indirection with direct calls
description: Replaces hidden control flow through in-process events, signals or observers that have only one listener with explicit function calls, keeping order, errors and transactions the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [table, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [event-emitters, observers, signals, control-flow]
pairs_with:
  prompts: [remove-needless-abstraction, untangle-circular-dependencies]
args:
  - name: code
    description: The area using events, as paths, with the mechanism (Node EventEmitter, Django signals, Rails callbacks or ActiveSupport notifications, Spring application events, a custom bus, an Android or browser event bus) and what is hard to follow.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Event map, Decisions, Diff, Behaviour notes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In-process events are useful when a module must not know its listeners: plugins, many independent subscribers, or a boundary between packages. They hurt when an event has exactly one listener that the emitter depends on: "save the order" emits `order_saved`, and the listener sends the invoice, and nobody can find that by reading the save function. Debugging needs a global search for a string, ordering between listeners is undefined or registration-dependent, and a listener registered in a module nobody imports silently never runs.

Replacing an emit with a direct call changes semantics in ways to check first. Synchronous emitters run listeners inline, so exceptions in a listener may propagate to the emitter or be swallowed depending on the library (Node `EventEmitter` propagates; many buses catch and log; Django `send_robust` catches). Listeners may run inside the emitter's database transaction or after commit (Spring `@TransactionalEventListener`, Django `transaction.on_commit`), which decides whether a failed email rolls back an order. Async buses run later, on another thread or tick. Events can also have hidden listeners: other packages, plugins, tests, analytics or audit code that subscribe by name. Keep an event where there are several independent listeners or a real boundary, and say so.
</context>

<task>
Simplify the events in {{code}}.

1. Map every event: name, emitters, listeners (search by event name string and class, including tests, plugins and other packages), registration site, sync or async, transaction phase, and how listener errors are handled.
2. Decide per event: replace with a direct call (one listener, same module or a dependency the emitter may know), keep (several independent listeners, cross-package boundary, plugins), or keep with explicit registration. Wait for approval.
3. For each replacement, write the direct call where the emit was, preserving: order relative to other code, sync or async execution, transaction phase (call after commit if the listener ran after commit), and error behaviour (propagate or catch and log as before).
4. Remove the listener registration and the event definition when nothing else uses it. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each event.
5. Show the diff and note every behaviour detail you preserved or that changed.
</task>

<constraints>
- Execution order, transaction phase, sync or async behaviour and error propagation stay the same unless the user approves a change.
- Do not remove an event that has listeners outside the searched code (plugins, other services, analytics) without confirming.
- Do not introduce a circular import; if the direct call would create one, keep the event and say why.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Event map
Table: event, emitters, listeners, sync or async, transaction phase, error handling.
## Decisions
Per event: replace, keep or keep with explicit registration, and why.
## Diff
The change.
## Behaviour notes
What was preserved and how.
## Check
Tests run and results.
</output_format>
