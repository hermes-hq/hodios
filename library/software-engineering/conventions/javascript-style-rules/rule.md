---
schema: 1
id: javascript-style-rules
kind: rule
title: JavaScript style rules
description: Standing rules for plain modern JavaScript without TypeScript covering ES modules, const by default, strict equality, async error handling, JSDoc types and safe built-in use.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [javascript]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: beginner
tags: [esm, jsdoc, async-await, strict-equality, modern-javascript]
applies_to: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsx"]
pairs_with:
  rules: [error-handling-rules, test-writing-rules]
  prompts: [migrate-eslint-to-flat-config]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change JavaScript in this project (no TypeScript):

**Know the environment first**
- Check `package.json` for `"type": "module"`, the Node version in `engines` or `.nvmrc`, and the browser targets. Use only syntax and APIs the targets support, or the build step already transpiles.
- Follow the project's ESLint and Prettier config. Do not add a different formatter or reformat files you did not change.

**Modules**
- Use ES modules (`import` and `export`) in new code unless the project is CommonJS; do not mix `require` and `import` in one file. Prefer named exports so renames are caught by tooling.
- Import Node built-ins with the `node:` prefix (`import fs from 'node:fs/promises'`).
- Keep side effects out of module top level except in entry files.

**Variables and values**
- `const` by default, `let` when reassigned, never `var`.
- Use `===` and `!==`. The one accepted exception is `x == null` to test for both null and undefined, if the project allows it.
- Use `??` for defaults when `0`, `''` or `false` are valid values; `||` replaces them. Use optional chaining instead of long `&&` chains.
- Do not rely on implicit coercion: convert with `Number()`, `String()` or `Boolean()` explicitly, and check `Number.isNaN` after parsing.
- Copy instead of mutating inputs (`{ ...obj }`, `[...arr]`, `structuredClone` for deep copies, `toSorted` where supported). `sort()` and `reverse()` mutate the array in place.

**Functions and types**
- Document exported functions with JSDoc including `@param` and `@returns` types, and `@typedef` for object shapes. If the project has `// @ts-check` or `checkJs`, keep the file type-clean.
- Validate input at the boundary (request handlers, CLI args, `JSON.parse` results) instead of trusting its shape.
- Use default parameters and object destructuring for options objects; avoid boolean positional flags.

**Async code**
- Use `async`/`await`. Every promise is awaited, returned, or deliberately handled with `.catch`; no floating promises.
- Run independent work with `Promise.all` (or `Promise.allSettled` when partial failure is fine), not sequential awaits in a loop.
- Catch errors where you can handle them or add context; rethrow with `new Error('context', { cause: err })`. Never swallow an error with an empty `catch`.
- Throw `Error` objects (or subclasses), never strings.

**Safety**
- Never use `eval`, `new Function` or `setTimeout` with a string. Never extend or modify built-in prototypes.
- Do not build HTML from user data with `innerHTML`; use `textContent` or the framework's escaping.
- Do not use objects as maps for untrusted keys (prototype pollution via `__proto__`); use `Map` or `Object.create(null)`.

**Before you finish**
- Run the linter and the tests the project uses and fix what you introduced. Say what you ran.
