---
schema: 1
id: modernize-javascript-syntax
kind: prompt
title: Modernise old JavaScript syntax
description: Rewrites dated JavaScript to modern syntax (const and let, arrow functions, destructuring, optional chaining, classes) without changing behaviour, minding this, hoisting and falsy values.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [es2015, legacy-javascript, codemods, modern-syntax]
pairs_with:
  prompts: [convert-callbacks-to-async-await, migrate-commonjs-to-esm]
  personas: [typescript-engineer]
args:
  - name: target
    description: The files or folder to modernise, as paths or pasted code, and the runtimes and browsers it must still run on.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Targets and limits, Transformations, Diff, Skipped, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a JavaScript engineer modernising legacy code. Most of the work is mechanical and safe, but each transformation has a trap that changes behaviour:

- **var to const/let:** `var` is function-scoped and hoisted; a variable used before its declaration, redeclared, or captured in a loop closure behaves differently with `let`. A `var` in a `for` loop captured by callbacks actually changes from buggy to correct, which is still a behaviour change.
- **function to arrow:** arrows have no own `this`, `arguments` or `prototype` and cannot be constructors. Functions used as methods, constructors, event handlers that read `this`, or callbacks for libraries that bind `this` (jQuery, Mocha) must stay `function`.
- **`||` defaults to `??` or default parameters:** `x || 10` replaces `0`, `''` and `false`; `x ?? 10` does not; default parameters only apply for `undefined`, not `null`. Each swap changes behaviour for some inputs.
- **`a && a.b` to `a?.b`:** returns `undefined` instead of the falsy value of `a`.
- **Prototype constructors to class:** class bodies are strict mode, classes are not hoisted, and calling a class without `new` throws.
- **string concatenation to template literals, `Object.assign` to spread, `indexOf` to `includes`:** `includes` finds `NaN`, `indexOf` does not; spread does not trigger setters.

Check the target runtimes first: optional chaining, nullish coalescing and class fields need a recent engine or a transpiler. Where an established codemod or lint autofix exists (`prefer-const`, `no-var`, `prefer-template`), use it, then review its output.
</context>

<task>
Modernise {{target}}.

1. Confirm the runtimes and browsers the code must support and whether there is a build step, and list which syntax is allowed.
2. Make sure tests cover the code you will change; if coverage is thin, add characterisation tests for the riskiest functions (those with `this`, defaults or hoisting).
3. Apply safe transformations with lint autofixes or codemods where available, file by file, then the manual ones. For each `||` default, `&&` chain and `function` with `this`, decide individually and keep the old form where the modern one would change behaviour.
4. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}, the linter and the build, and report results.
5. List what you skipped and why, and any place where the old code had a bug the new syntax would fix (report it, do not fix it silently).
</task>

<constraints>
- No behaviour change; every `||` to `??`, `this` and hoisting change is checked individually.
- Do not use syntax the stated targets do not support without a transpiler.
- Do not mix in module system changes, TypeScript conversion or formatting churn outside touched lines.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Targets and limits
Runtimes, build step and allowed syntax.
## Transformations
Table: transformation, files, method (autofix, codemod, manual), cases kept old.
## Diff
The change.
## Skipped
What was not changed and why; bugs noticed.
## Check
Tests, lint and build results.
</output_format>
