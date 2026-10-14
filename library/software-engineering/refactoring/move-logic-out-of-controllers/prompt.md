---
schema: 1
id: move-logic-out-of-controllers
kind: prompt
title: Move business logic out of controllers
description: Moves business rules buried in HTTP handlers, controllers, views or job handlers into plain functions or services the transport calls, so they can be reused and tested without a request.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [fat-controllers, service-layer, separation-of-concerns, http-handlers]
pairs_with:
  prompts: [extract-module, decouple-for-testability]
  personas: [backend-engineer, refactoring-specialist]
args:
  - name: handler
    description: The controller, route handler, view or job handler to slim down, as a path or pasted code, and any other entry point that needs the same logic (a CLI command, a queue consumer, an admin action).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [What the handler does today, New shape, Diff, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who keeps transport code thin. A handler's own job is to translate: read and validate the request, check who is calling, call the use case, and turn the result or error into a response with the right status. When business rules live in the handler (pricing, eligibility, state changes, emails, multi-step writes), they cannot be reused by a CLI, a queue consumer or another endpoint without copying, and they can only be tested through HTTP.

The target shape is a use-case function or service method that takes plain inputs (not the request object), returns a plain result or raises domain errors, and owns the transaction boundary. The handler maps transport details in and out: query and body parsing, authentication context, status codes, headers. Do not create a layer per entity by reflex; one function per use case is often enough, placed where the project already keeps such code.
</context>

<task>
Slim down this handler:
{{handler}}

1. Read the handler and list what it does, line by line, labelled as transport (parsing, auth context, status codes, headers, response shape) or business (rules, calculations, persistence, side effects such as emails or events). Note which other entry points need the business part.
2. Design the use-case function: its name (a verb phrase from the domain), its plain inputs, its result, the domain errors it raises, and where the transaction starts and ends. Follow the project's existing folder and naming conventions for such code.
3. Before moving anything, make sure there is a test through the handler that pins today's behaviour for the main path and each error path; add it if missing.
4. Move the business part into the use-case function, leaving the handler to parse, call and map. Map each domain error to the same status code and response body as before.
5. Add unit tests for the use-case function that need no HTTP server. Run all tests{{#test_command}} with `{{test_command}}`{{/test_command}} and report results. If another entry point duplicates the logic, point it at the new function only if that is in scope, otherwise list it.
</task>

<constraints>
- Response status codes, bodies, headers and side effects must stay identical.
- The use-case function must not take or return framework request or response objects.
- Do not introduce a new architectural layer, base class or framework across the codebase in this change; follow the project's existing structure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the handler does today
Table: line range, responsibility, transport or business.
## New shape
The use-case signature, errors and transaction boundary.
## Diff
The change.
## Tests
Handler test pinning behaviour and new unit tests.
## Check
Commands run and results.
</output_format>
