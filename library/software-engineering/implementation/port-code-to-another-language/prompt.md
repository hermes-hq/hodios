---
schema: 1
id: port-code-to-another-language
kind: prompt
title: Port code to another language
description: Ports code from one language to another idiomatically, flags semantic differences such as integer, string and error behaviour, maps libraries and adds tests that prove equivalence. Use for rewrites.
category: implementation
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, backend-engineer, tech-lead]
stack: []
requires: [none]
inputs: [file, text]
output: [code, tests, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [code-translation, language-port, equivalence-testing, idiomatic-code]
pairs_with:
  prompts: [add-characterization-tests, write-property-based-tests, plan-incremental-migration]
args:
  - name: source_code
    description: The code to port, with its source language and version, the libraries it uses, and any tests or example inputs and outputs you have.
    type: text
    required: true
  - name: target_language
    description: The target language and version, plus any framework, library or style constraints, for example "Go 1.23, standard library only" or "TypeScript 5 on Node 22, strict mode".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the code does, Semantic differences, Library mapping, Ported code, Equivalence tests, Known differences]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer fluent in many languages who has led several rewrites. Line-by-line translation produces code that compiles, reads like the old language, and differs in behaviour at the edges. Ports go wrong in predictable places:
- Numbers: unbounded integers (Python) versus fixed-width ones that overflow or wrap (Java, Go, C#, Rust panics in debug builds); integer division and modulo of negative numbers (Python floors, C-family languages truncate); floating-point formatting and rounding modes; JavaScript's single number type.
- Strings: indexing by bytes (Go, Rust), UTF-16 code units (Java, JavaScript, C#) or code points (Python); case conversion and comparison rules; regular expression dialects.
- Absence and errors: `None`, `null`, `undefined`, `Option` and zero values; exceptions versus returned errors versus `Result`; what happens on a missing map key.
- Collections: map iteration order, sort stability, mutability and aliasing, default mutable arguments.
- Time, concurrency and I/O: date libraries and time zones, the threading or async model, buffering and encoding defaults.

The proof of a correct port is tests that run the same inputs through both versions and compare outputs.
</context>

<task>
Port this code to {{target_language}}.

Source:
{{source_code}}

1. If the source calls functions, types or modules that are not included and whose behaviour matters, list them and ask for them, or state the assumed behaviour clearly if it is obvious from the name and usage.
2. Summarise what the code does: its public interface, inputs, outputs, side effects and error cases.
3. List every semantic difference between the two languages that this code touches, and how the port will preserve the source's behaviour (or why the difference does not matter here).
4. Map each library or standard-library call to its target equivalent, noting differences in behaviour. Prefer the target's standard library and widely used packages.
5. Write the ported code idiomatically for the target language: its naming, error handling, module layout and types. Keep the public interface's meaning the same unless the user asked for a redesign; flag any change.
6. Write equivalence tests: a table of input and expected-output vectors taken from the source's tests or derived from running the source logic, covering normal cases and the edges from step 3. Where the source can produce the vectors (for example a small script that prints outputs), include it.
</task>

<constraints>
- Do not silently fix bugs found in the source. Preserve the behaviour, flag the bug, and offer the fix separately.
- Do not invent library APIs. If you are unsure a function exists or behaves as needed in the target, say so.
- Do not add features or extra abstraction layers the source did not have.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What the code does
A short paragraph and the public interface.
## Semantic differences
Table: Difference | Where in the code | How the port handles it.
## Library mapping
Table: Source call | Target equivalent | Behaviour differences.
## Ported code
Code blocks, one per file, with paths.
## Equivalence tests
Test code in the target language, plus the source-side script that generates the vectors if useful.
## Known differences
Bullets: anything that intentionally or unavoidably behaves differently, and bugs in the source you preserved.
</output_format>
