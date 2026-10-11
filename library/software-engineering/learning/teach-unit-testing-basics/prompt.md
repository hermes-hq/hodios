---
schema: 1
id: teach-unit-testing-basics
kind: prompt
title: Teach me to write my first unit tests
description: Teaches a beginner to write their first unit tests on their own code, covering what to test, arrange-act-assert, choosing edge cases, running the test runner and reading a failure.
category: learning
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student, software-engineer]
stack: []
requires: [none]
inputs: [text]
output: [explanation, tests]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [unit-tests, test-frameworks, edge-cases, arrange-act-assert]
pairs_with:
  prompts: [write-unit-tests, coach-coding-kata, review-code-for-learner]
args:
  - name: code
    description: A function or small module you wrote and want to test.
    type: text
    required: true
  - name: language
    description: The language, and the test framework if you already have one (pytest, Jest, Vitest, JUnit, Go testing, RSpec).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Why and what to test, Setting up, Your first test, Your turn, Feedback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Beginners usually meet testing as a rule ("write tests") without the skill behind it. The skill is mostly choosing cases: one ordinary case, then the boundaries (empty input, zero, one element, the largest allowed value, exactly at a threshold), then invalid input and what the code should do with it. Tests are easiest to learn on the learner's own small, pure functions, where inputs go in and a value comes out. Beginner mistakes are predictable: testing that the code does what it does instead of what it should do (copying the output into the assertion), many asserts in one test so a failure is unclear, tests that depend on each other or on the current date, and not watching a test fail first, so a test that can never fail goes unnoticed.
</context>

<task>
Teach the learner to unit test this {{language}} code:

```
{{code}}
```

1. Explain in a few sentences why tests help them (catching their own mistakes, changing code without fear) and what a unit test is, using this function as the example.
2. Help them decide what to test: list the behaviours of the function in plain words, then the cases worth testing (ordinary, boundary, invalid input). Ask the learner what the function should do for any case where the code's intent is unclear.
3. Show the setup: install or locate the test framework for the language, where the test file goes and how it is named, and the exact command to run tests.
4. Write the first test together, for the ordinary case, using arrange-act-assert with each part labelled. Then show how to make it fail on purpose (change the expected value) and how to read the failure output.
5. Hand over: ask the learner to write the next two tests themselves, for a boundary case and an invalid input, and to paste them and the run output back.
6. When they reply, give feedback: does each test check the intended behaviour, is the name descriptive, is there one reason to fail, would it catch a real bug. If a test exposes a bug in their function, celebrate that as the point of testing and let them fix it.
7. Close with three habits to keep and what to learn next (parametrised tests, test doubles), one line each.
</task>

<constraints>
- Write only the first test. The learner writes the rest; give hints, not the tests, unless they ask after trying.
- Expected values come from what the function should do, not from running the current code. If the function has a bug, do not encode the bug in a test.
- Use the standard framework for the language and its current syntax; give exact commands.
</constraints>

<output_format>
First turn:
## Why and what to test
Short explanation and the list of cases.
## Setting up
Commands and file layout.
## Your first test
The test with arrange, act, assert labelled, then how to watch it fail.
## Your turn
The two tests to write.
After the learner replies:
## Feedback
Per test, then next steps.
</output_format>
