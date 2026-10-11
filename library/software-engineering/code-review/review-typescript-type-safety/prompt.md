---
schema: 1
id: review-typescript-type-safety
kind: prompt
title: Review a TypeScript change for type safety
description: Reviews a TypeScript diff for any, unsafe casts, non-null assertions, unvalidated JSON at boundaries, lying type guards and unsound generics that hide real runtime bugs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [type-safety, type-assertions, runtime-validation, strict-mode, pull-request]
pairs_with:
  personas: [typescript-engineer]
  prompts: [review-pull-request, replace-loose-types]
  rules: [typescript-strict-rules]
args:
  - name: diff
    description: The diff with file paths, plus the `tsconfig.json` compiler options if they are not in the repository you can read.
    type: text
    required: true
  - name: context
    description: TypeScript version, the strict flags enabled (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`), and the runtime validation library in use, if any.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
TypeScript only checks what it is told is true, so the review question is where the change tells it something false. `any` disables checking for everything it touches and spreads through assignments; `JSON.parse`, `response.json()`, `catch (e)` without `useUnknownInCatchVariables`, and untyped libraries all produce it silently. `as User` on data from the network, local storage or a message queue is a claim, not a check: when the API changes, the type still compiles and the crash happens three calls later. `as unknown as T` is a deliberate override and needs a reason. The non-null assertion (a postfix exclamation mark) turns a compile error into a runtime `undefined`. A type guard (`function isUser(x): x is User`) that checks one field vouches for all of them. Without `noUncheckedIndexedAccess`, `arr[0]` and `record[key]` are typed as present when they may be `undefined`. `Object.keys` returns `string[]`, which tempts casts. Union handling without an exhaustive `never` check lets a new variant fall through silently. Generic defaults of `any`, `Function`, `object` and `{}` accept almost anything. `@ts-ignore` hides the next error forever, while `@ts-expect-error` at least fails once the error is gone. The fix at a boundary is to parse into `unknown` and validate with the codebase's validator (zod, valibot, io-ts or hand-written guards), then narrow.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full and `tsconfig.json`, and check the types of values the change receives from outside the program (network, storage, environment, user input), before judging any hunk. Run the type checker if you can and report the result. If you only have the diff, say which conclusions depend on code you could not see.
2. List every value that enters the changed code from outside the program and check it is validated before it is given a specific type. Flag `as` casts, typed `fetch` wrappers and generic `parse<T>()` helpers that assert a type without checking it.
3. List every `any` (explicit or inferred), `as` assertion, non-null assertion (postfix exclamation mark), `@ts-ignore` and `@ts-expect-error` the change adds, and for each say what runtime value would make the claim false and what then breaks.
4. Check type guards and narrowing: guards that check fewer properties than the type has, narrowing lost across callbacks or awaits, `switch` over unions without an exhaustive `never` default, and `in` or `typeof` checks that do not narrow what the author thinks.
5. Check indexing and optionality given the enabled flags: array and record access assumed present, optional properties versus `| undefined`, `Object.keys` or `Object.entries` with casts, and `Partial<T>` passed where the full type is later assumed.
6. Check generics and API types: `any` defaults, `Function`, `object` or `{}` parameter types, return types widened so callers lose information, overloads or conditional types that accept invalid combinations, and exported types that promise more than the implementation delivers.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (unvalidated external data typed as trusted, assertions that hide a reachable undefined or wrong shape in a critical path), medium (escape hatches that will hide future breakage, non-exhaustive unions), low (looser types with no current runtime effect).
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Judge against the project's actual compiler flags; do not report errors that its configuration does not produce, but do point out flags whose absence hides a found bug.
- Use the validation library already in the project for boundary fixes; if there is none, propose a small hand-written guard rather than adding a dependency.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the expression, the false claim it makes, the runtime value that breaks it and the resulting failure, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
