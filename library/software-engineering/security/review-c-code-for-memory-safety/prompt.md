---
schema: 1
id: review-c-code-for-memory-safety
kind: prompt
title: Review C or C++ code for memory safety
description: Reviews C or C++ code for buffer overflows, use-after-free, integer overflow, uninitialised reads and format string bugs, with fixes and sanitizer and compiler settings that catch more.
category: security
version: 1.0.0
status: incubating
stage: [review, verify]
role: [embedded-engineer, software-engineer, security-engineer]
stack: [c, cpp]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [report, diff, config]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [memory-safety, buffer-overflow, use-after-free, sanitizers, compiler-hardening]
pairs_with:
  prompts: [write-fuzz-harness, debug-native-crash, review-cpp-diff-for-undefined-behaviour]
  personas: [security-auditor]
args:
  - name: target
    description: The files, module or function to review, and where its input comes from (network, files, IPC, trusted config).
    type: text
    required: true
  - name: build
    description: Compiler, build system and platform, e.g. "GCC 13, CMake, Linux x86-64" or "arm-none-eabi, no OS". Leave empty to detect.
    type: string
output_contract:
  format: markdown
  sections: [Input boundaries, Findings, Fixes, Build hardening, Verification, Not reviewed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Memory-safety bugs cluster at the places where untrusted lengths and offsets meet pointers: parsers for network packets and file formats, string handling, and code that computes a buffer size. The classic patterns are a length read from input and trusted for `memcpy`; `size * count` or `len + 1` overflowing before `malloc`; signed and unsigned comparisons that let a negative length pass a bounds check; off-by-one on the terminator with `strncpy` (which does not always terminate) or `snprintf` return values used as lengths; `sprintf` and `strcat` without bounds; freeing in an error path and using or freeing again later; pointers into a container kept across a resize in C++ (`vector` iterator invalidation, `string_view` to a temporary); uninitialised stack variables returned on early exits; and user data passed as a format string. Reading code finds many of these, but AddressSanitizer, UndefinedBehaviorSanitizer and fuzzing find the ones that reading misses, and compiler warnings plus hardening flags (`-D_FORTIFY_SOURCE`, stack protector, `-Wformat-security`) are cheap defence in depth.
</context>

<task>
Review {{target}} for memory safety.
{{#build}}Build: {{build}}{{/build}}

1. Identify the input boundaries: functions that receive data from outside the trust boundary, and trace each length, index and offset from there to the memory operations that use it.
2. Review those paths for the bug classes in the context. For each suspected bug, write the input that triggers it and the exact line, and rate it by reachability from untrusted input.
3. Check allocation arithmetic for overflow and use checked helpers (`__builtin_mul_overflow`, `reallocarray`, or explicit limits). Check every error path for double free, leaks and use after free.
4. Fix confirmed bugs with the smallest correct change, following the codebase's existing helpers. Prefer bounded APIs and explicit length checks; in C++ prefer `std::span`, `std::vector::at` at boundaries or owning types over raw pointers where the codebase already uses them.
5. Add or extend a test that reproduces each fix. If the project has a fuzzer, add a seed for each case; if not, recommend where a fuzz harness would pay off most.
6. Propose build settings for a sanitizer job (`-fsanitize=address,undefined -fno-omit-frame-pointer` in a debug or CI build) and hardening flags for release builds that fit the compiler and target (some do not apply to bare-metal targets).
7. Build and run the tests, under sanitizers if the platform supports them.
</task>

<constraints>
- Report only bugs you can point to with a line and a triggering input; mark anything else as "needs confirmation".
- Do not rewrite modules in another language or style as part of the fix.
- Do not claim the code is safe; list what was not reviewed.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Input boundaries
List of entry points and the untrusted values they receive.
## Findings
Table: severity, file:line, bug class, triggering input, reachable from untrusted input (yes or no).
## Fixes
One line per file: `path`, what changed, and the test that covers it.
## Build hardening
Sanitizer job and release flags in a code block, with notes on target support.
## Verification
Commands run and actual results, including sanitizer output.
## Not reviewed
Files and paths outside the review.
</output_format>
