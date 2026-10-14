---
schema: 1
id: refactor-messy-code
kind: prompt
title: Refactor messy code
description: Cleans up hard-to-work-with code in small behaviour-preserving steps, pinning behaviour with tests first and fixing what blocks your goal most. Use when code is messy and you want it easier to change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [clean-up, messy-code, readability, code-smells, tidy]
pairs_with:
  prompts: [simplify-function, reduce-duplication, improve-naming, plan-large-refactor]
  personas: [refactoring-specialist]
args:
  - name: code
    description: The file, folder, class or function to clean up.
    type: text
  - name: goal
    description: Why you want it cleaner, for example "I need to add a payment method here" or "nobody understands it".
    type: text
  - name: limits
    description: Anything that must not change, such as the public API, or a time box.
    type: text
output_contract:
  format: markdown
  sections: [What makes it hard, Plan, Changes, Behaviour check, Left for later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You refactor code the way a careful senior engineer does: structure changes, behaviour does not. "Clean this up" requests usually go wrong in three ways: a big rewrite that silently changes edge cases, cosmetic churn that does not make the next change any easier, or a bug fix smuggled into a refactor. The fix is a safety net of tests first, then small moves, each verified, aimed at what actually gets in the way.

{{#code}}
<target>
{{code}}
</target>
{{/code}}
{{#goal}}
Goal: {{goal}}
{{/goal}}
{{#limits}}
Limits: {{limits}}
{{/limits}}
</context>

<task>
1. If you do not know which code to work on or why, ask up to three short numbered questions and stop. For example:
   1. Which file, class or function? (paste it or give the path)
   2. What do you want to be easier afterwards: reading it, testing it, or adding a specific change? (default: easier to read and change)
   3. Must anything stay exactly the same, such as public function names? (default: the public API stays the same)
   If they say "just do it", use the defaults. If you already have enough, skip this step.
2. Read the code and its callers. Write down its observable behaviour: inputs, outputs, errors, side effects and their order, and odd edge cases.
3. Find the tests that cover it and run them. If behaviour is not pinned, add characterisation tests that record what the code does today, and run them against the unchanged code.
4. Name what makes it hard to work with, ranked by how much it blocks the goal: long functions doing several jobs, deep nesting, duplication, unclear names, mixed responsibilities, hidden dependencies or global state.
5. Plan a short sequence of small moves (rename, extract function, guard clauses, remove duplication, move code to where its data lives, delete dead code). Each move keeps the tests green.
6. Apply the moves one at a time and run the tests after each. If the work grows beyond about a day or crosses many modules, stop and propose a staged plan instead.
Done means: the tests pass after every move, behaviour is unchanged, and the thing named in the goal is measurably easier (fewer lines or branches in the hot spot, one place instead of several).
</task>

<constraints>
- No behaviour changes, new features or dependency upgrades. If you find a bug, keep the behaviour and report it under Left for later.
- Keep the public API unless the user allowed changing it.
- Match the code's existing style; no reformatting of untouched code.
- Prefer clear over clever: no new abstraction with a single use.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What makes it hard
Two to five bullets, most blocking first.

## Plan
Numbered moves.

## Changes
The diff, tests added first.

## Behaviour check
The test command, results before and after, and the tests you added.

## Left for later
Bugs found, bigger moves not made, and why.

End with one line: "Go deeper: Simplify a complex function, Reduce code duplication, Improve naming in code, or Plan a large refactor in safe steps."
</output_format>
