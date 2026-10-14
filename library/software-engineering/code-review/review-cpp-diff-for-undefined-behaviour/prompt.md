---
schema: 1
id: review-cpp-diff-for-undefined-behaviour
kind: prompt
title: Review a C++ diff for undefined behaviour
description: Reviews a C++ diff for undefined behaviour, dangling references and views, ownership confusion, iterator invalidation and exception-safety gaps, naming the input that triggers each.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, game-developer]
stack: [cpp]
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
tags: [undefined-behaviour, memory-safety, dangling-references, raii, pull-request]
pairs_with:
  personas: [cpp-engineer]
  prompts: [review-pull-request, review-firmware-diff, review-diff-for-concurrency-bugs]
  rules: [cpp-style-rules]
args:
  - name: diff
    description: The diff with file paths, including headers for any changed class and the callers of functions whose return type is a reference, pointer, view or span.
    type: text
    required: true
  - name: context
    description: C++ standard and compiler, whether sanitizers or static analysis run in CI, and threading model; for embedded firmware use the firmware review instead.
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
Undefined behaviour in C++ often works in debug builds and tests, then breaks under optimisation, because the compiler may assume it never happens. The reviewer hunts specific shapes. Arithmetic: signed overflow, shifting by the bit width or more, and division by zero. Lifetime: returning a reference, pointer, `std::string_view` or `std::span` to a local or a temporary; a `string_view` built from a temporary `std::string`; `c_str()` of a temporary kept past the statement; lambdas capturing by reference that are stored or run later on another thread. Iterator invalidation: `push_back` or `insert` on a `vector` while holding iterators, pointers or references into it; `erase` in a loop without using its return value; rehashing in `unordered_map`. Ownership: raw `new` without a clear owner, a pointer from `unique_ptr::get()` stored beyond the owner's life, `shared_ptr` cycles that never free, `shared_from_this` in a constructor, two `shared_ptr`s created from one raw pointer. Moved-from objects are valid but unspecified, so reading them is a logic bug. Aliasing: `reinterpret_cast` between unrelated types breaks strict aliasing (use `memcpy` or `std::bit_cast`). Exception safety: a resource acquired before a throwing call and released after it leaks; a move constructor not marked `noexcept` makes `vector` copy on growth; destructors must not throw. Comparisons between signed and unsigned (`int i < v.size()`) flip on negative values.
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

1. If you can read the repository, open each changed file and its header in full, and the callers of any function that returns a reference, pointer, view or span, before judging any hunk. Build with `-Wall -Wextra` and run tests under AddressSanitizer and UndefinedBehaviorSanitizer if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. For every reference, pointer, iterator, `string_view`, `span` and by-reference lambda capture the change creates or returns, name the object it refers to and when that object dies or moves. Flag any use after that point.
3. Check containers: modification while iterators, references or pointers into the container are held, `erase` in loops, and indexing without a bounds check on input-dependent indices.
4. Check ownership: raw `new` and `delete`, pointers stored from `get()`, `shared_ptr` cycles, multiple control blocks from one raw pointer, use of moved-from objects, and rule-of-zero, three or five violations in classes that manage resources.
5. Check arithmetic and conversions: signed overflow, shifts, division by zero, narrowing conversions, signed and unsigned comparisons, `reinterpret_cast` type punning, and uninitialised variables or members read before assignment.
6. Check exception safety: resources not held by RAII across calls that can throw, assignment operators that leave the object half-updated on failure, move operations not marked `noexcept`, and destructors that can throw.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (memory corruption, use-after-free or dangling access reachable from normal input, undefined behaviour the optimiser can exploit), medium (leaks on error paths, wrong results on edge values such as negative sizes), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the C++ standard you assumed; do not propose `std::span`, `std::bit_cast` or `std::expected` below the standard that introduced them.
- Each finding names the concrete input or call sequence that triggers it; say so when a finding is only reachable through misuse by future callers.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the expression, the defect class, the triggering input or call sequence and what the program may do, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
