---
schema: 1
id: typescript-strict-rules
kind: rule
title: TypeScript strict rules
description: Keeps TypeScript code fully type-safe under strict mode, with no any, no unchecked casts, validated external data and exhaustive unions. Use in any TypeScript project.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [type-safety, strict-mode]
applies_to: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change TypeScript:

- Do not loosen the compiler settings. Never turn off `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` or other checks in `tsconfig.json` to make an error go away; fix the code.
- Do not use `any`. Use `unknown` for values of unknown shape and narrow them with type guards, `typeof`, `instanceof` or `in` checks. If a third-party type forces `any`, contain it in one small, typed wrapper.
- Do not silence errors with `@ts-ignore` or `@ts-nocheck`. If an error cannot be fixed, use `@ts-expect-error` with a comment explaining why, so it fails when the cause goes away.
- Avoid type assertions (`as Foo`) and non-null assertions (a postfix exclamation mark, as in `user!.name`). Prefer narrowing. Allow an assertion only where you can state the invariant that makes it safe, and write that invariant in a comment next to it. Never write `as unknown as Foo` to force a type.
- Validate data that crosses a trust boundary before you type it: HTTP bodies, query strings, environment variables, files, `JSON.parse` results and third-party API responses. Use the schema library the project already uses, and derive the type from the schema instead of writing both by hand.
- Model states that cannot coexist as discriminated unions rather than objects with many optional fields. Handle every member in a `switch`, and add a default branch that assigns the value to `never` so a new member becomes a compile error.
- Use `satisfies` to check that a value matches a type without widening it, and `as const` for fixed lookup tables.
- Mark data that should not change as `readonly` (`readonly T[]`, `Readonly<T>`), especially function parameters.
- Give exported functions explicit parameter and return types. Let inference handle local variables.
- Use `import type` and `export type` for type-only imports and exports.
- Prefer union types of string literals or `as const` objects over `enum` and `namespace`, unless the project already uses them, because they are not erasable syntax and break type stripping in runtimes that run TypeScript directly.
- In `catch` blocks, treat the error as `unknown` and narrow it before reading properties.
- Never leave a promise floating. `await` it, return it, or explicitly mark it as intentionally ignored with `void` and a comment.
- Index access may return `undefined`. Handle that case instead of asserting it away.
- Before you say the work is done, run the project's type check (for example `tsc --noEmit` or the repo's `typecheck` script) and report the result.
