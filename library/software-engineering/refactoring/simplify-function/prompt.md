---
schema: 1
id: simplify-function
kind: prompt
title: Simplify a complex function
description: Rewrites a hard-to-follow function into a clearer one with identical behaviour, using guard clauses, named steps and simpler conditions, verified by tests. Use on long or deeply nested code.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [readability, cognitive-complexity, clean-code]
pairs_with:
  prompts: [add-characterization-tests]
args:
  - name: target
    description: The function or method to simplify, with its file.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What made it hard, Diff, Behaviour check, Before and after]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A function is hard to change when a reader has to hold too much in mind at once: deep nesting, flags that switch behaviour, long stretches doing several jobs, conditions that need a truth table. Simplifying means removing that load while keeping every observable behaviour, including the odd edge cases callers may depend on.
</context>

<task>
Simplify {{target}}.
1. Read the function and its callers. Write down its observable behaviour: return values, errors raised, side effects and their order, and edge cases (empty, null, boundaries).
2. Make sure tests pin that behaviour. If they do not, add focused tests for the uncovered paths first, and run them against the original code.
3. Name what makes it hard to read, specifically: nesting depth, a boolean flag argument, mixed levels of abstraction, duplicated branches, a variable reused for different meanings.
4. Apply the smallest set of changes that addresses those points. Typical moves:
   - guard clauses and early returns instead of nested conditions;
   - extract a well-named helper for each distinct step;
   - split a flag argument into two functions when the flag selects different behaviour;
   - simplify boolean expressions and name complex conditions;
   - replace a long if/else chain over one value with a lookup table, when that is clearer.
5. Run the tests after each change. Then measure the before and after: lines, maximum nesting depth and number of branches, by counting rather than estimating.
</task>

<constraints>
- Behaviour stays identical, including error types and messages, side-effect order and edge-case results. If you believe an edge case is a bug, keep it and report it.
- Do not change the function's signature or public name unless asked.
- Prefer clear over clever: no dense one-liners, no new abstractions with a single use.
- Match the surrounding code's style and idioms.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What made it hard
Two to four bullets.
## Diff
The diff, including any tests added first.
## Behaviour check
The test command and result, and the tests added to pin behaviour.
## Before and after
A table: Metric | Before | After, for lines, maximum nesting depth and branches.
</output_format>
