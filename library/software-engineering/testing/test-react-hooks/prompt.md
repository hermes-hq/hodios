---
schema: 1
id: test-react-hooks
kind: prompt
title: Test custom React hooks
description: Tests custom React hooks with renderHook and act, wrapping the providers they need and covering async updates, re-renders with new props, cleanup on unmount and race conditions.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [custom-hooks, render-hook, testing-library, async-state, act-warnings]
pairs_with:
  prompts: [write-component-tests, test-time-dependent-code]
  personas: [test-engineer]
args:
  - name: hook
    description: The custom hook or hooks to test, as a path or pasted code.
    type: text
    required: true
  - name: test_runner
    description: The runner and setup if not obvious, for example "Vitest with jsdom and MSW" or "Jest with React Native Testing Library".
    type: string
output_contract:
  format: markdown
  sections: [Hook contract, Setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who tests hooks as units with a clear contract: inputs (arguments and context), outputs (returned values and functions) and effects (network calls, subscriptions, timers, storage). Use `renderHook` from `@testing-library/react` (the separate `@testing-library/react-hooks` package is deprecated for React 18 and later), pass a `wrapper` for the providers the hook reads (router, query client, store, theme), call returned functions inside `act`, and wait for asynchronous results with `waitFor`. Use `rerender` with new props to test how the hook reacts to changed arguments, and `unmount` to test cleanup.

The bugs worth catching in hooks: a stale closure that uses an old value, an effect missing a dependency or re-running in a loop, a fetch that resolves after the arguments changed and overwrites newer data (race condition), a subscription, interval or event listener not removed on unmount, and state updates after unmount. Each test should create a fresh query client or store so cache does not leak between tests. A hook used by only one component is often better tested through that component; say so if that is the case.
</context>

<task>
Write tests for {{hook}}{{#test_runner}} using {{test_runner}}{{/test_runner}}.

1. Read the hook and its callers. Write its contract: arguments, context it reads, values and functions it returns, and side effects.
2. Set up: a `wrapper` that provides a fresh instance of each provider per test, network mocking at the HTTP boundary with the project's tool (for example MSW), and fake timers if the hook uses timers or debouncing.
3. Write tests for: the initial return value; each returned function changing state, called inside `act`; loading, success and error states for async work; re-rendering with new arguments, including a slow earlier request resolving after a faster later one so stale data does not win; and unmounting, checking that listeners, intervals and subscriptions are removed and no update happens afterwards.
4. Run the tests with React's `act` warnings treated as failures if the project allows it, and report results. Fix warnings by awaiting the right thing, not by wrapping everything in `act`.
5. If the hook is better tested through its component, say so and explain which tests you would move.
</task>

<constraints>
- Do not mock React itself or the hook's own internals; mock only at external boundaries.
- No fixed timeouts; use `waitFor` or fake timers.
- Do not change the hook's behaviour to make it easier to test unless asked; propose the change instead.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Hook contract
Inputs, outputs and side effects.
## Setup
Wrapper, network mocks and timers.
## Tests
The test code.
## Check
Commands run, results and any warnings.
</output_format>
