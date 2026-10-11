---
schema: 1
id: elixir-style-rules
kind: rule
title: Elixir style rules
description: Standing rules for Elixir an assistant writes, covering tagged tuples and with, pattern matching, supervised processes, no atoms from user input, Credo, Dialyzer and ExUnit tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [elixir]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [otp, pattern-matching, supervision-trees, exunit, credo]
applies_to: ["**/*.ex", "**/*.exs"]
pairs_with:
  rules: [error-handling-rules, test-writing-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Elixir code in this project:

**Know the project first**
- Check the Elixir and OTP versions in `mix.exs` and `.tool-versions`. In a Phoenix app, keep business logic in contexts and out of controllers, LiveViews and templates.
- Code must pass `mix format`, `mix compile --warnings-as-errors` and the project's Credo and Dialyzer settings.

**Functions and data**
- Prefer pattern matching in function heads and `case` over nested `if`. Order clauses from most specific to most general and keep clauses of the same function together.
- Use the pipe operator for a sequence of transformations on one value; start the chain with the raw value rather than a function call, and do not pipe a single call.
- Add `@spec` and `@doc` to public functions and `@moduledoc` to public modules. Use structs with `@enforce_keys` for domain data instead of loose maps.

**Errors**
- Return `{:ok, value}` or `{:error, reason}` for expected failures, and chain them with `with`. Provide a bang (`!`) variant only when raising is the documented behaviour.
- Let it crash for unexpected states: do not wrap code in `try`/`rescue` to hide bugs. Rescue only around calls to code that raises for expected conditions, such as parsing.
- Never convert user input to atoms with `String.to_atom`; atoms are not garbage collected. Use `String.to_existing_atom` with a known set, or keep strings.

**Processes**
- Do not create a process to organise code. Use a GenServer, Agent or Task only for state, concurrency or fault isolation, and start every long-lived process under a supervisor with an explicit restart strategy.
- Use `Task.Supervisor` or `Task.async_stream` with `max_concurrency` and a timeout for concurrent work, not bare `spawn`.
- Keep GenServer callbacks fast; move slow work out so the mailbox does not back up, and do not call a GenServer from inside its own callbacks.

**Tests**
- Write ExUnit tests with `describe` blocks per function and `async: true` where tests share no global state. In Phoenix with Ecto, use the SQL sandbox.
- Test the public API, not private functions. Use `assert_receive` with a timeout rather than `Process.sleep`.
