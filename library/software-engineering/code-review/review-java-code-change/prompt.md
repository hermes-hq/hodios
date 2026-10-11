---
schema: 1
id: review-java-code-change
kind: prompt
title: Review a Java code change
description: Reviews a Java diff for broken equals and hashCode contracts, Optional and null misuse, stream side effects, swallowed exceptions and shared mutable collections.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
stack: [java]
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
tags: [equals-hashcode, optional, streams, collections, pull-request]
pairs_with:
  personas: [java-spring-engineer]
  prompts: [review-pull-request, review-spring-boot-change]
  rules: [java-style-rules]
args:
  - name: diff
    description: The diff with file paths, including any classes used as map keys or set members and the callers of changed methods.
    type: text
    required: true
  - name: context
    description: Java version (records, `Stream.toList()` and pattern matching depend on it), frameworks in use, and whether the code runs on multiple threads.
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
Java's language contracts fail quietly. A class used in a `HashMap` or `HashSet` must override `equals` and `hashCode` together, consistently, and only over fields that do not change while it is stored; mutate a key and the entry becomes unreachable. `compareTo` inconsistent with `equals` makes `TreeSet` drop elements. `==` on boxed `Integer` works only inside the cached range of -128 to 127, so tests pass and production fails; `==` on strings compares references. Auto-unboxing a null `Integer` into an `int` throws NPE on a line with no visible dereference. `Optional` is for return values: `Optional.get()` without a check is a NPE with extra steps, a method returning `Optional` must never return null, and `orElse(expensiveCall())` evaluates the call even when the value is present (`orElseGet` does not). Streams should be free of side effects: mutating shared state from `map`, `peek` or a parallel stream gives wrong or nondeterministic results. `Collectors.toMap` throws on duplicate keys and on null values. `Stream.toList()`, `List.of` and `Arrays.asList` return lists that cannot be modified (or resized), and `List.of` rejects nulls. Catching `Exception` and logging hides failures; catching `InterruptedException` without restoring the interrupt flag breaks shutdown; `return` inside `finally` discards exceptions. Removing from a collection inside a for-each throws `ConcurrentModificationException`. `HashMap` and `SimpleDateFormat` are not thread-safe. `BigDecimal.equals` compares scale, so 1.0 is not equal to 1.00.
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

1. If you can read the repository, open each changed class in full, its callers, and any class it puts into maps, sets or sorted collections, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check object contracts: `equals` without `hashCode` or the reverse, equality over mutable or lazily loaded fields, objects mutated while inside hash-based collections, `compareTo` or comparators inconsistent with `equals`, and `==` on boxed numbers, strings or enums-from-strings.
3. Check null and Optional handling: unboxing of possibly null values, `Map.get` results used without a null check, `Optional.get()` without `isPresent`, methods returning `Optional` that can return null, Optional used for fields or parameters, and `orElse` with side effects or expensive calls.
4. Check streams and collections: side effects inside stream stages, parallel streams over shared state, `toMap` without a merge function where duplicates are possible, modification of unmodifiable or fixed-size lists, removal during iteration, and collections exposed from getters that callers can mutate.
5. Check exceptions and resources: broad catches that log and continue, swallowed `InterruptedException`, `return` or `throw` in `finally`, checked exceptions wrapped without the cause, and closeable resources outside try-with-resources.
6. Check thread safety where the code is shared: non-thread-safe classes (`HashMap`, `SimpleDateFormat`, `ArrayList`) in static or singleton fields, check-then-act on concurrent maps instead of `computeIfAbsent`, and lazy initialisation without proper publication.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (lost entries, wrong results, NPE on a common path, swallowed failures in writes, data races), medium (exceptions under rare inputs such as duplicate keys or nulls), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Java version you assumed for version-dependent APIs; do not suggest records or `Stream.toList()` below Java 16.
- Every finding includes a concrete input (a value, a duplicate key, a null, an interleaving) that triggers it.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the class and method, the defect, the triggering input or thread interleaving, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
