---
schema: 1
id: extract-module
kind: prompt
title: Extract a module
description: Moves one responsibility out of a large file or class into its own module in small, test-verified steps, without changing behaviour or the public API. Use when a file does too many things.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [modularity, separation-of-concerns]
pairs_with:
  prompts: [write-characterization-tests, plan-large-refactor]
args:
  - name: source
    description: The file, class or module to extract from.
    type: text
    required: true
  - name: responsibility
    description: What to extract, for example "the CSV export logic" or "everything that talks to the payment provider".
    type: text
    required: true
  - name: destination
    description: Where the new module should live. Leave empty to follow the project's layout conventions.
    type: string
output_contract:
  format: markdown
  sections: [Boundary, Steps, Diff, Verification, Follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Extracting a module is a refactor: the program must behave the same before and after. The hard parts are choosing a boundary that leaves both sides cohesive, and moving the code without breaking callers, creating import cycles or quietly changing behaviour along the way.
</context>

<task>
Extract {{responsibility}} from {{source}} into its own module{{#destination}} at {{destination}}{{/destination}}.
1. **Check the safety net.** Find the tests that cover the code to move. If coverage is thin, stop and report which behaviours need tests first. Do not refactor untested code silently.
2. **Draw the boundary.** List the functions, types and state that belong to the responsibility, and everything they use from the rest of the file. Choose the boundary that minimises what crosses it. If the responsibility shares mutable state with the rest of the file, say how you will pass it explicitly.
3. **Move in small steps**, running the tests after each:
   1. create the new module and move the code unchanged;
   2. import it back into the original file, re-exporting what external callers use so they keep working;
   3. update internal callers to import from the new module;
   4. remove the re-exports only if every caller is in this repository and has been updated. For a public library API, keep them and mark them deprecated.
4. Check for import cycles and fix them by moving the shared piece, not by lazy imports.
5. Run the full test suite, the type checker and the linter.
</task>

<constraints>
- No behaviour changes: no bug fixes, renames of public symbols, signature changes or "improvements" inside moved code. List those under follow-ups instead.
- Keep the diff reviewable: moved code should appear as a move, not a rewrite.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Boundary
What moved, what stayed, and what crosses the boundary, in a short list.
## Steps
The steps you took, each with its test result.
## Diff
The full diff.
## Verification
Test, type-check and lint commands with results.
## Follow-ups
Improvements you noticed but did not make, or "None".
</output_format>
