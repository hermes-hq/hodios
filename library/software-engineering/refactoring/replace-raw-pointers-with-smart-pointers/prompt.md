---
schema: 1
id: replace-raw-pointers-with-smart-pointers
kind: prompt
title: Replace raw owning pointers with smart pointers
description: Converts owning raw pointers and manual new and delete in C++ code to unique_ptr, shared_ptr and RAII, making ownership explicit without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, embedded-engineer, game-developer]
stack: [cpp]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [smart-pointers, ownership, raii, memory-safety]
pairs_with:
  personas: [cpp-engineer]
  rules: [cpp-style-rules]
  prompts: [find-memory-leak]
args:
  - name: code
    description: The files or classes to convert, as paths or pasted code, with the C++ standard in use (C++11, 14, 17, 20) and any rules (no exceptions, custom allocators, ABI to keep).
    type: text
    required: true
  - name: build_and_test
    description: The commands that build and run the tests, ideally including a sanitizer build (for example cmake --preset asan and ctest).
    type: string
output_contract:
  format: markdown
  sections: [Ownership map, Conversion plan, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You convert C++ to explicit ownership, and you decide ownership before you touch a type. For each raw pointer the question is: does this pointer own the object (it is responsible for `delete`), or does it only observe it? Owning pointers become `std::unique_ptr` by default; `std::shared_ptr` only where ownership is genuinely shared and lifetimes cannot be ordered, since it adds atomic reference counting and hides who keeps objects alive; cycles need `std::weak_ptr`. Observing pointers stay raw pointers or become references (`T&` when never null). Arrays become `std::vector` or `std::unique_ptr<T[]>`; C resources (`FILE*`, handles) get a `unique_ptr` with a custom deleter or a small RAII class.

Traps: a class holding a `unique_ptr` becomes move-only, which breaks code that copies it; the destructor of a class with `unique_ptr<Incomplete>` must be defined in the .cpp (pimpl); `std::make_unique` needs C++14 (write a helper on C++11); APIs that hand ownership to C libraries need `release()`; calling `shared_from_this` requires `enable_shared_from_this` and an existing `shared_ptr`; changing function signatures from `T*` to `unique_ptr<T>` changes ownership transfer at every call site and the ABI. Double deletes and leaks hidden in the old code surface during conversion and are bugs to report, not preserve silently.
</context>

<task>
Convert {{code}}.

1. Read the code and build an ownership map: every raw pointer member, local and parameter, who allocates it, who deletes it, and whether it owns or observes. Note copy constructors, assignment operators and destructors that manage memory by hand.
2. Propose the conversion per pointer (unique_ptr, shared_ptr with the reason, reference, raw observer, container) and the signature changes: take `unique_ptr` by value to transfer ownership, `T&` or `T*` to observe. Flag existing leaks, double deletes or unclear ownership as findings. Wait for approval.
3. Convert one class or ownership chain at a time. Delete hand-written destructors, copy and assignment code that the smart pointers make redundant (rule of zero), and mark the class move-only where copying no longer makes sense.
4. Build and run the tests after each step{{#build_and_test}} with `{{build_and_test}}`{{/build_and_test}}; run with AddressSanitizer and LeakSanitizer if available, and report what they found.
5. Show the diff and list call sites whose ownership semantics changed.
</task>

<constraints>
- Keep public behaviour the same; where the old code leaked or double freed, report it and say which way you fixed it.
- Do not use shared_ptr as a default to avoid deciding ownership.
- Do not change a public or exported API's signature or ABI without saying so and getting approval.
- Respect the project's standard version and rules such as no exceptions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Ownership map
Table: pointer, owner, observers, new type.
## Conversion plan
Per class, with signature changes and findings.
## Steps
Numbered steps, each with its build and test check.
## Diff
The change.
## Check
Build, tests and sanitizer results.
</output_format>
