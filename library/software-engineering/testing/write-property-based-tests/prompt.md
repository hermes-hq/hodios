---
schema: 1
id: write-property-based-tests
kind: prompt
title: Write property-based tests
description: Finds the invariants a function must keep and writes property-based tests with generators that shrink well. Use when example-based tests miss edge cases in parsers, encoders or pure logic.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read]
inputs: [file, text]
output: [tests, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [property-based-testing, hypothesis, fast-check, proptest, invariants]
pairs_with:
  personas: [test-engineer]
args:
  - name: code
    description: The function, module or file to test, pasted or as a path.
    type: text
    required: true
  - name: framework
    description: Property-testing library to use, for example Hypothesis, fast-check, proptest, jqwik or QuickCheck. Detected from the repo when left empty.
    type: string
output_contract:
  format: markdown
  sections: [Properties, Generators, Tests, Counterexamples, How to run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Property-based tests state a rule that must hold for every valid input and let a generator search for a counterexample, then shrink it to the smallest failing case. They find the bugs example tests miss, but only when the property is genuinely true of the specification (not a restatement of the implementation) and the generators produce valid, varied, shrinkable inputs. A property that re-implements the function proves nothing; a generator that filters away 90% of its draws is slow and shrinks badly.
</context>

<task>
Write property-based tests for:
{{code}}

Library: {{#framework}}{{framework}}.{{/framework}} If no library is named, detect it from the project's manifests and existing tests (Hypothesis for Python, fast-check for JavaScript and TypeScript, proptest for Rust, jqwik for Java, gopter or the standard testing/quick for Go). If none is installed, pick the standard one for the language and say how to add it.

1. Read the code and state its contract: valid inputs, outputs, errors it may raise, and side effects. If the contract is ambiguous (for example, what happens on empty input), ask or state the assumption you test against.
2. Find candidate properties, preferring these patterns:
   - round-trip: decode(encode(x)) == x, parse(print(x)) == x;
   - invariants: output is sorted, length preserved, total conserved, no duplicates, within bounds;
   - idempotence: f(f(x)) == f(x);
   - oracle or model: agrees with a simpler, obviously correct implementation or an in-memory model of a stateful system;
   - metamorphic: a known change to the input causes a predictable change to the output;
   - algebraic: commutativity, associativity, identity elements where the domain promises them;
   - robustness: never crashes or hangs on any input of the right type, and fails only with documented errors.
   Keep only properties that follow from the contract. Discard any that just mirror the implementation.
3. Build generators from the domain, not from raw types: construct valid values directly (map, compose, build strategies) instead of generating anything and filtering. Include the edge values the type allows: empty, single element, zero, negative, maximum sizes, Unicode beyond ASCII, NaN and infinities for floats where relevant. Bound sizes so a run stays fast.
4. Write the tests in the project's style and test runner. Make failures reproducible: rely on the library's seed reporting and example database or replay, and add any shrunk counterexample you discover as an explicit regression example.
5. If you can run the tests, do so and report the result. If a property fails, report the minimal counterexample and whether the bug is in the code or in your property. Do not change the code under test.
</task>

<constraints>
- Every property must name the contract clause it checks. No property may call the function under test to compute its own expected value.
- Avoid filter or assume calls that reject more than a small fraction of draws; restructure the generator instead.
- Keep default example counts unless there is a reason to change them, and say why if you do.
- Do not fix bugs you find; report them.
{{> guardrails/investigate-before-answering}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Properties
Table: Property | Pattern | Contract clause it checks.
## Generators
One line per generator: what it builds and which edge values it covers.
## Tests
The complete test file in one code block, with imports.
## Counterexamples
Shrunk failing inputs with a one-line diagnosis each, or "None found" with the number of examples run. If you could not run the tests, say so.
## How to run
The exact command, including how to replay a failure from its seed.
</output_format>
