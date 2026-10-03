---
schema: 1
id: write-test-data-factories
kind: prompt
title: Write test data factories
description: Writes test data builders or factories that produce valid objects by default and take short, readable overrides. Use when tests are full of copy-pasted fixtures that break on every model change.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [software-engineer, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [schema, text, repo]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [test-data, factories, test-builders, fixtures]
pairs_with:
  personas: [test-engineer]
  rules: [test-writing-rules]
  prompts: [write-unit-tests, write-integration-tests]
args:
  - name: models
    description: The models, classes or tables to build, with fields, types, validations, unique constraints and relations. Paste model code, a schema or a plain list.
    type: text
    required: true
  - name: language
    description: Language and test framework, plus any factory library already in use, for example "Python, pytest, factory_boy" or "TypeScript, Vitest".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Design, Factories, Usage, Validity test, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Literal fixtures copied between tests fail in three ways: a new required field breaks dozens of tests at once, the reader cannot tell which of twenty fields matters to the test, and unique fields collide when two tests insert the same email. A good factory returns a minimal object that passes every validation and constraint with no arguments, and lets a test state only the fields it cares about. Each language has an idiom for this: factory_boy in Python, factory_bot in Ruby, Fishery or plain builder functions in TypeScript, the Test Data Builder pattern (`aUser().withEmail(...).build()`) in Java, Kotlin and C#, and functional options in Go.
</context>

<task>
Write factories for these models in {{language}}:
<models>
{{models}}
</models>

1. If a field's type, validation or relation is unclear and guessing would produce invalid objects, list it under Open questions and use the most restrictive reasonable reading. If you can read the repository, find the existing test helpers and any factory library first, and follow them; do not add a second library.
2. For each model, define defaults that satisfy every validation, NOT NULL and check constraint, and nothing more. Optional fields stay empty by default unless most tests need them.
3. Unique fields use a sequence (`user-1@example.test`, `user-2@...`), never random values. If fake data libraries are used, seed them once so failures reproduce.
4. Named states become traits or named builders (`suspended`, `paid`, `expired`), each setting the full group of fields that state requires, so a test never sets `status` without the matching `cancelled_at`.
5. Required relations build the smallest valid parent automatically and accept an existing parent instead. Never create more related records than the constraint requires.
6. Separate building in memory from persisting (`build` and `create`, or a builder plus a save helper). Building is the default because it is faster.
7. Dates and times are relative to a fixed reference or the test's fake clock, never the real current time.
8. Show two or three existing-style tests rewritten with the factories so the reader sees the override style.
9. Add one test that builds and, where there is persistence, saves every factory and trait with no overrides and checks it is valid. This is what catches a factory that drifted after a model change.
</task>

<constraints>
- Defaults must not encode business assumptions a test might rely on silently. If a test depends on a value, the test sets it.
- No mutable defaults shared between instances (a list or dict default must be built fresh each time).
- Use obvious fake values (`example.test` domains, `555` phone numbers); never real-looking personal data.
- Keep factories next to the tests in the project's existing layout.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Design
Bullets: library or pattern chosen and why, build versus create, how uniqueness and time are handled.
## Factories
Code blocks with file paths.
## Usage
The rewritten tests, each showing only the fields that matter.
## Validity test
Code block with file path.
## Open questions
Numbered, or "None".
</output_format>
