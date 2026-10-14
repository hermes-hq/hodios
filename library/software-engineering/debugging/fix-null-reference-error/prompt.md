---
schema: 1
id: fix-null-reference-error
kind: prompt
title: Fix a null or undefined reference error
description: Fixes "cannot read properties of undefined", NullPointerException and NoneType errors by tracing where the missing value comes from instead of adding null checks.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [stack-trace, logs, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [null-safety, undefined, null-pointer, root-cause]
pairs_with:
  prompts: [explain-stack-trace, find-root-cause]
  personas: [debugger]
args:
  - name: error
    description: "The error and stack trace, for example \"TypeError: Cannot read properties of undefined (reading 'email')\", \"NullPointerException\" or \"'NoneType' object has no attribute\"."
    type: text
    required: true
  - name: context
    description: "When it happens (always, some users, after a deploy), and any inputs or request data that trigger it."
    type: text
output_contract:
  format: markdown
  sections: [Where it fails, Where the missing value comes from, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who knows that a null reference error is a symptom reported far from its cause. The crash line only tells you which variable was empty; the bug is wherever that value was supposed to be produced. Common origins:
- A lookup that can miss: `Array.find`, `Map.get`, dict `.get`, an ORM `findOne`/`first()`, a cache read, returning null or None when nothing matches.
- Data shape assumptions: an API field that is optional, renamed or nested differently; a JSON response that is an error object; a database column that allows NULL.
- Timing: reading state before an async load completes, a React or UI component rendering before data arrives, an object used before initialisation (Java field injection, Python attributes set later in `__init__`).
- Functions that return nothing on one branch (a missing `return` gives `undefined` or `None`).
- Optional chaining or `?.` upstream that turned an earlier failure into a silent undefined.
- Python methods that mutate in place and return None (`list.sort()`, `dict.update()`).
The right fix depends on whether absence is legitimate. If it is, handle it explicitly where it is meaningful (a default, a 404, an empty state). If it is not, fail early with a clear error at the boundary where the bad data enters, and fix whatever produced it.
</context>

<task>
Error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read the frame where it fails and identify the exact expression that was null, undefined or None. If there are several candidates on the line, say how to tell which one (the property name in the message, a temporary log).
2. Trace that value backwards through the code: its assignment, the function that returned it, the data source behind that. Stop at the earliest point where it can become missing.
3. Decide whether absence is legitimate (a user with no email, a record that may not exist) or a bug (a missing return, a renamed field, a race).
4. Reproduce it: write a failing test or a minimal input that triggers the error, if the project has tests.
5. Fix at the origin: return the value on every branch, map the renamed field, await the load, handle the not-found case explicitly with a meaningful result, or validate input at the boundary with a clear error message.
6. Run the reproduction and the surrounding tests.
</task>

<constraints>
- Do not make the fix a bare `?.`, `if x is not None`, `Optional.ofNullable` or try/catch at the crash line unless you have shown absence is legitimate there and the fallback behaviour is correct.
- Do not invent the data shape of an external API; read the types, schema or a real response, or ask.
- If the origin is outside the code (bad data in the database, an upstream API change), say so and recommend both the guard and the upstream fix.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where it fails
The exact expression that dereferenced the missing value (`path:line`).
## Where the missing value comes from
The chain back to the origin: where it should have been set, and why it is missing in this case.
## Fix
The diff at the origin or at the boundary, with what now happens when the value is legitimately absent.
## Verification
The test or reproduction run and its result.
</output_format>
