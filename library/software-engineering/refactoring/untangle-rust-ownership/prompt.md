---
schema: 1
id: untangle-rust-ownership
kind: prompt
title: Untangle ownership workarounds in Rust
description: Removes needless clone calls, shared RefCell and Mutex wrappers and lifetime workarounds from compiling Rust code by restructuring ownership and borrowing, with behaviour unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ownership, borrowing, interior-mutability, clone-reduction]
pairs_with:
  prompts: [fix-rust-borrow-checker-error, remove-shared-mutable-state]
  personas: [rust-engineer]
  rules: [rust-style-rules]
args:
  - name: target
    description: The module or types to clean up, as a path or pasted code, and what hurts (clones everywhere, runtime borrow panics, Arc<Mutex> in single-threaded code).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not "cargo test".
    type: string
output_contract:
  format: markdown
  sections: [Workarounds found, Ownership design, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rust engineer. Code that fought the borrow checker and won by workaround compiles but carries the scars: `.clone()` on large strings and vectors to escape a borrow, `Rc<RefCell<T>>` graphs with runtime `BorrowMutError` panics, `Arc<Mutex<T>>` in code that never crosses threads, `'static` bounds and `Box::leak` to dodge lifetimes, and indices passed around next to the data they index.

The usual structural fixes: borrow instead of own in function parameters (`&str` and `&[T]` instead of `String` and `Vec<T>`); pass the specific fields a function needs instead of `&mut self`, so disjoint borrows work (split borrows); return owned values from builders instead of mutating shared state; replace object graphs with an arena or a `Vec` plus typed indices; move ownership into the single place that mutates and pass messages or results to others; use `Cow` when data is usually borrowed and sometimes owned; use `std::mem::take` or `Option::take` to move out of a `&mut`.

Not every clone is bad: cloning an `Rc` or `Arc` is cheap, cloning small `Copy`-like data is fine, and a clone that keeps the code simple in a cold path is a reasonable trade. Measure or reason about hot paths before calling a clone a problem. Changing `pub` signatures from owned to borrowed parameters is an API change for a library crate. `Arc<Mutex>` that is actually shared across threads or tasks stays; replacing it with `RefCell` would break `Send` and `Sync`.
</context>

<task>
Clean up ownership in {{target}}.

1. List the workarounds: each clone (with the size of what it copies and whether it is on a hot path), each `Rc<RefCell>`, `Arc<Mutex>` or `RwLock` (and whether it actually crosses threads), each `'static` bound, leak or unsafe added to escape lifetimes.
2. For each, say why it was needed (which borrow conflict) and propose the structural fix, or keep it with a reason. Note any `pub` signature changes for library crates.
3. Make sure tests cover the affected behaviour; add tests for the borrow-panic paths if `RefCell` is involved.
4. Apply changes one area at a time, running `cargo clippy` and the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each. If a benchmark exists for the hot path, run it before and after.
5. Report the diff, what was kept and why, and the results.
</task>

<constraints>
- No behaviour change; public API changes in library crates are listed and agreed.
- No new `unsafe` code.
- Do not replace thread-safe types with non-thread-safe ones where values cross threads or async tasks.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Workarounds found
Table: location, workaround, reason it was added, hot path, action.
## Ownership design
The new ownership and borrowing structure.
## Diff
The change.
## Check
Clippy, tests and benchmarks.
</output_format>
