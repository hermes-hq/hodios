---
schema: 1
id: review-diff-for-null-handling-bugs
kind: prompt
title: Review a diff for null handling bugs
description: Reviews a change for null, undefined and None paths, such as missing checks, defaults that hide bad data, and optional chaining or safe calls that silently skip work that had to happen.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, frontend-engineer]
stack: []
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
depth: specific
tags: [null-safety, missing-values, defaults, optional-chaining, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, review-diff-for-boundary-bugs, review-error-handling]
args:
  - name: diff
    description: The change, with file paths and the code that produces the values it reads (API responses, database rows, function returns).
    type: text
    required: true
  - name: context
    description: Language and its null-safety settings (TypeScript strict, Kotlin, C# nullable reference types, Python type checking), and which fields the business treats as optional.
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
Missing values cause two kinds of bug, and reviewers usually look only for the first. The loud kind is a crash: a property read on `null`, `undefined` or `None`. The quiet kind is worse: code that "handles" the missing value by doing the wrong thing without telling anyone. `price ?? 0` charges nothing when the price failed to load. `user?.sendReceipt()` skips the receipt when the user lookup failed, and the order still shows as complete. `getOrDefault(key, "")` turns a missing translation into a blank button. A `||` default in JavaScript also replaces valid falsy values (0, "", false), where `??` would not. The review question for every value is what "missing" means here: not loaded yet, failed to load, not applicable, unknown, or deliberately empty, because each needs different handling. Absent and null are also different in JSON PATCH-style updates: a missing field means "leave it", an explicit null means "clear it", and code that merges with `{...old, ...input}` or deserialises both to null gets it wrong. Values can be missing in places the type system does not see: a LEFT JOIN column, an optional field in a third-party payload, a map lookup, `find` or `first` on an empty collection, platform types from Java in Kotlin, Go's zero values standing in for "not set", or non-null assertion operators that silence the checker.
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

1. If you can read the repository, open each changed file in full and trace where each value the change reads comes from (request, database, API, cache, map lookup), before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. List every value the change reads that can be null, undefined, None, absent or a zero value standing in for "not set", and where that can happen (failed lookup, empty result, optional payload field, LEFT JOIN, partial update).
3. For each, decide what the code does when the value is missing: crashes, throws a clear error, uses a default, or skips work. Then decide what it should do given the business meaning of missing in that place.
4. Flag silent skips: optional chaining or safe calls on calls with side effects (send, charge, save, log, audit), early returns that report success, and filters that drop records with missing fields from totals.
5. Flag hiding defaults: `??`, `||`, `or`, `getOrDefault`, `COALESCE` or `fillna` that substitute a value which changes the result (zero prices, empty permissions, a default country or currency), and `||` used where valid falsy values exist.
6. Flag absent versus null confusion in updates and serialisation, non-null assertions (the TypeScript and Kotlin assertion operators, `.get()`, `.unwrap()`, `.Value`) on values that can be missing, and zero values treated as real data.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (money, permissions or required side effects silently wrong or skipped, data cleared by a partial update), medium (crash on a realistic missing value, wrong display), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Do not recommend null checks everywhere; each finding names the realistic source of the missing value and the specific input that produces it.
- Do not decide the business meaning of a missing value yourself when it is ambiguous; ask in Questions.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the value, where it can be missing, what the code does versus what it should do, the triggering input, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
