---
schema: 1
id: fix-rust-borrow-checker-error
kind: prompt
title: Fix a Rust borrow checker error
description: Explains a Rust borrow checker or lifetime error and fixes it by restructuring ownership and borrows, not by cloning everything or reaching for unsafe.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [borrow-checker, lifetimes, ownership, compiler-errors]
pairs_with:
  prompts: [explain-stack-trace]
  personas: [rust-engineer]
args:
  - name: error
    description: "The full rustc or cargo error, including the error code (E0499, E0502, E0505, E0597, E0716...) and every labelled span."
    type: text
    required: true
  - name: context
    description: "The Rust edition, whether this is async code, and what the code is meant to do."
    type: text
output_contract:
  format: markdown
  sections: [What the borrow checker sees, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rust engineer who treats borrow errors as design feedback. The compiler's three labels tell the whole story: where a borrow starts, where a conflicting use happens, and where the first borrow is still used later. Fixes come from a known set of patterns:
- Shorten the borrow: copy out the small value you need (`let len = v.len();`) before mutating, end the borrow before the conflicting use, or split one long expression into steps.
- Borrow disjoint parts: borrow distinct struct fields separately instead of calling a `&mut self` method, use `split_at_mut`, `iter_mut`, or index-based loops when mutating while iterating.
- Use the entry API for "get or insert" on maps, instead of a lookup followed by an insert.
- Take ownership where the data moves: `std::mem::take`, `Option::take`, `mem::replace`, or pass by value and return the result.
- Fix lifetimes at the signature: return owned data when a reference cannot outlive its source (E0597, E0716 temporary dropped), tie output lifetimes to the right input, avoid self-referential structs (store indices or use an arena).
- Async and threads: `'static` bounds on `tokio::spawn` and `thread::spawn` need owned or `Arc`-shared data; a `MutexGuard` held across `.await` breaks `Send`.
- Interior mutability (`RefCell`, `Mutex`, `Cell`) and `Rc`/`Arc` are correct when shared mutable state is the real design, not as a first reflex.
`.clone()` is a valid fix for small or cheap data and a smell for large collections cloned in a loop.
</context>

<task>
Compiler error:
{{error}}
{{#context}}

Context:
{{context}}
{{/context}}

1. Read the function and the types involved. Run `cargo check` (or `cargo build`/`cargo test` for the failing target) to get the current errors; fix the first one first.
2. Explain the three spans: the borrow, the conflicting use, and the later use that keeps the borrow alive.
3. Name the ownership problem: overlapping mutable and shared borrows, a reference outliving its owner, a move out of borrowed content, a `'static` requirement, or a non-`Send` guard across an await.
4. Pick the pattern from the list that fixes it with the least change in behaviour and cost, and apply it. If the error reveals a real design problem (a struct that wants to hold a reference to its own data), say so and propose the restructure.
5. Run `cargo check`, `cargo clippy` if the project uses it, and the relevant tests.
</task>

<constraints>
- Do not use `unsafe`, raw pointers or `std::mem::transmute` to bypass the borrow checker.
- Do not add `.clone()` on large data, `Rc<RefCell<_>>` or `'static` lifetimes everywhere just to compile; when you use one, say what it costs.
- Do not add `Box::leak` to satisfy a lifetime.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the borrow checker sees
Which borrow starts where, which use conflicts with it, and where the borrow is still needed (from the labelled spans).
## Cause
The ownership problem in one paragraph.
## Fix
The diff, and why it is correct without extra clones or runtime cost, or what cost it adds and why it is acceptable.
## Verification
The cargo commands run and their results.
</output_format>
