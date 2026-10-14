---
schema: 1
id: audit-unsafe-rust
kind: prompt
title: Audit unsafe Rust for soundness
description: Audits unsafe blocks and FFI in a Rust crate for soundness, writes SAFETY comments stating each invariant, replaces avoidable unsafe with safe code and runs Miri on the tests.
category: security
version: 1.0.0
status: incubating
stage: [review, verify]
role: [software-engineer, embedded-engineer, security-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [report, diff, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [unsafe-code, soundness, ffi, miri, undefined-behavior]
pairs_with:
  prompts: [review-rust-code-change, write-fuzz-harness, review-c-code-for-memory-safety]
  rules: [rust-style-rules]
args:
  - name: crate
    description: The crate or module to audit and what its unsafe code is for (FFI bindings, performance, custom data structures, embedded registers).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Unsafe inventory, Findings, Changes, Verification, Remaining unsafe]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unsafe Rust is sound only if no sequence of safe calls can cause undefined behaviour, so the question is never "does this block work in our tests" but "can safe code calling this API break it". The common unsound patterns: a safe function that wraps unsafe code without checking the precondition (an index, a length, alignment, a non-null pointer); `slice::from_raw_parts` with a length from untrusted input or a lifetime longer than the data; `transmute` between types with different layout or invalid bit patterns (bool, enums, references); `set_len` before the elements are initialised; `mem::uninitialized` or `assume_init` on data that is not initialised; creating two `&mut` to the same data; `Send` or `Sync` implemented for types holding raw pointers or `Rc`; panics in the middle of an unsafe update leaving a broken invariant observable in `Drop`; and FFI signatures that mismatch the C side or let the C code keep a pointer after Rust frees it. Miri detects many of these when tests exercise the code; it does not support most FFI calls.
</context>

<task>
Audit the unsafe code in {{crate}}.

1. List every `unsafe` block, `unsafe fn`, `unsafe impl` and `extern` block (`grep -rn "unsafe"` and `cargo geiger` if installed). Record what each relies on.
2. For each, write the safety invariant it needs, then check that every safe caller path guarantees it. Mark the block sound, unsound (with a safe-code example that triggers UB), or unclear.
3. Check `unsafe impl Send/Sync`, `Drop` implementations near unsafe code, and panic safety in functions that temporarily break invariants.
4. For FFI, compare Rust signatures with the C headers (types, nullability, ownership, who frees), and check that callbacks cannot unwind across the boundary.
5. Replace unsafe code that has a safe equivalent with the same performance (`split_at_mut`, `chunks_exact`, `bytemuck` or `zerocopy` if already a dependency, `MaybeUninit` APIs used correctly). Make functions with unchecked preconditions `unsafe fn` or add the check.
6. Add a `// SAFETY:` comment to every remaining unsafe block stating the invariant and why it holds, and enable `clippy::undocumented_unsafe_blocks` and `unsafe_op_in_unsafe_fn` if the crate accepts it.
7. Add tests for each unsound case found, then run `cargo test`, `cargo clippy`, and `cargo +nightly miri test` on the crate (skipping FFI tests Miri cannot run, and saying which).
</task>

<constraints>
- An unsound finding needs a concrete safe-code trigger; otherwise mark it "unclear" with the question to resolve.
- Do not change the public API without listing the change and its semver impact.
- Do not add new dependencies to remove unsafe without asking.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Unsafe inventory
Table: location, kind, purpose, invariant, verdict.
## Findings
For each unsound case: location, the safe code that triggers UB, and the fix.
## Changes
One line per file: `path`, what changed.
## Verification
Commands run (tests, clippy, Miri) and actual results, including what Miri skipped.
## Remaining unsafe
Count before and after, and why each remaining block is needed.
</output_format>
