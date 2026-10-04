---
schema: 1
id: decouple-for-testability
kind: prompt
title: Decouple code for testability
description: Breaks hard-wired dependencies such as clocks, network calls, globals and singletons behind seams so a class or module can be unit tested, keeping behaviour and public callers unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer]
requires: [none]
inputs: [file]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dependency-injection, seams, test-doubles, legacy-code, unit-testing]
pairs_with:
  prompts: [add-characterization-tests, write-unit-tests]
args:
  - name: code
    description: The class, module or function to make testable, plus any small helpers it calls. Paste the real code.
    type: text
    required: true
  - name: language
    description: Language and, if relevant, framework or DI container, for example "TypeScript with NestJS", "Python 3.12", "Go", "C# with Microsoft.Extensions.DependencyInjection".
    type: string
    required: true
  - name: test_goal
    description: The behaviour you want to test once it is decoupled, for example "the retry backoff timing" or "that expired trials are downgraded". Leave empty to cover the main logic.
    type: text
output_contract:
  format: markdown
  sections: [Dependencies found, Seams, Refactored code, Example test, Caller impact, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code is hard to unit test when it reaches out to things it does not control: the current time, random numbers, the network, the file system, environment variables, global or static state, singletons, and objects it constructs itself with `new`. The fix is to introduce seams, places where a test can substitute a dependency, using the smallest change that works. Overdoing it is its own failure: an interface for every class, a DI container added to a small module, or a constructor with nine parameters makes the code worse. Callers must keep working without modification wherever possible.
</context>

<task>
Make the code below unit testable in {{language}}.

<code>
{{code}}
</code>

{{#test_goal}}
The behaviour to test: {{test_goal}}
{{/test_goal}}

1. List every hard-wired dependency: time, randomness, I/O (network, file system, database, process), environment and configuration reads, global or static state, singletons, and collaborators created internally. For each, say whether it actually blocks testing the target behaviour. Leave alone the ones that do not.
2. Choose the lightest seam for each blocking dependency, in this order of preference: pass a value as a parameter (a timestamp instead of reading the clock); inject a function or small protocol or interface through the constructor or a parameter; extract the pure logic into a function that takes plain data and keep the I/O in a thin shell around it. Prefer the language's idiom (structural interfaces in Go and TypeScript, protocols or callables in Python, interfaces in C# and Java).
3. Keep existing callers working: give new constructor parameters production defaults, or add a factory that wires the real dependencies, so call sites do not change. If a caller must change, say which and why.
4. Keep behaviour identical: same outputs, side effects, error types and ordering. Do not fix bugs you notice; list them under Risks.
5. Write one example unit test in the project's likely test framework that exercises the target behaviour with fakes or stubs (prefer simple hand-written fakes over mocking libraries when the interface is small), including a deterministic clock or random source where relevant.
6. Before answering, check that every dependency you marked as blocking now has a seam, that production wiring still uses the real implementation, and that the test would fail if the logic under test were broken.

If the code is incomplete (missing a collaborator's definition that changes the approach) or {{language}} is unclear, ask one focused question and stop instead of guessing.
</task>

<constraints>
- No new frameworks, DI containers or mocking libraries unless the project already uses them.
- Do not add an interface with a single implementation unless it is needed as a seam for a test.
- Do not change public names or signatures beyond adding optional parameters or a factory.
- Keep the diff as small as it can be while making the target behaviour testable.
</constraints>

<output_format>
## Dependencies found
| Dependency | Where | Blocks testing? | Seam chosen |

## Seams
One short paragraph per seam explaining the choice.

## Refactored code
The full refactored code in one fenced block, with production wiring.

## Example test
One fenced test file.

## Caller impact
"None" or the call sites that change.

## Risks
Behaviour that could differ, and bugs noticed but not fixed.
</output_format>
