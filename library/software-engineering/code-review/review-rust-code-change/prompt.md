---
schema: 1
id: review-rust-code-change
kind: prompt
title: Review a Rust code change
description: Reviews a Rust diff for panicking unwraps and indexing, unjustified unsafe blocks, clones and leaks used to dodge the borrow checker, and async Send or blocking mistakes.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer]
stack: [rust]
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
tags: [unsafe-code, ownership, panics, tokio, pull-request]
pairs_with:
  personas: [rust-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs]
  rules: [rust-style-rules]
args:
  - name: diff
    description: The diff with file paths, including any `unsafe` blocks, trait implementations and the callers of changed public functions.
    type: text
    required: true
  - name: context
    description: Whether this is a library or a binary, the async runtime if any, the minimum supported Rust version, and whether panics are acceptable in this code (for example a CLI versus a server).
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
The compiler catches memory errors in safe Rust, so review effort goes where it cannot help. Panics: `unwrap()`, `expect()`, slice indexing, `RefCell::borrow_mut` and integer division by zero all panic, and in a server a panic in a request handler drops the request or poisons a mutex. Arithmetic overflow panics in debug builds and wraps silently in release, and `as` casts truncate without warning (`u64 as u32`). `unsafe` turns off checks the compiler would otherwise do, so each block needs a `// SAFETY:` comment naming the invariant it relies on, and the reviewer checks that the invariant holds on every path: aliasing `&mut`, lengths passed to `from_raw_parts`, alignment, initialised memory, lifetimes extended by `transmute`, and `unsafe impl Send` or `Sync` on types holding raw pointers or `Rc`. Code that fights the borrow checker shows up as `.clone()` on large values in loops, `Rc<RefCell<..>>` everywhere (runtime borrow panics instead of compile errors), `Box::leak` or `'static` bounds added to make something compile. In async code, a `std::sync::MutexGuard` held across `.await` makes the future non-`Send` or deadlocks, blocking calls (`std::fs`, `std::thread::sleep`, heavy CPU) stall the runtime's worker, and futures dropped inside the `tokio::select` macro must be cancellation-safe or data is lost. `let _ = fallible()` discards a `Result` that `#[must_use]` was trying to surface.
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

1. If you can read the repository, open each changed file in full, the types involved in any `unsafe` block, and the callers of changed public functions, before judging any hunk. Run `cargo clippy` and the tests if you can (and `cargo miri test` for unsafe code if available), and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. List every way the changed code can panic (`unwrap`, `expect`, indexing, `borrow_mut`, overflow in debug, division) and decide for each whether the input can reach it. Flag the reachable ones and propose returning an error or proving the invariant.
3. For every `unsafe` block or `unsafe impl`, state the invariant it depends on, check whether a `SAFETY` comment documents it, and check each caller path for a way to break it. Flag unsafe that has a safe equivalent with acceptable cost.
4. Check borrow-checker workarounds: clones of large values in hot loops, `Rc<RefCell>` or `Arc<Mutex>` added where ownership could be restructured, `Box::leak`, `'static` bounds or lifetime transmutes added to satisfy the compiler, and `Cow` or borrowing opportunities in public APIs.
5. Check async code: guards from `std::sync` held across `.await`, blocking calls inside async functions without `spawn_blocking`, `select` macro branches whose futures are not cancellation-safe, spawned tasks whose `JoinHandle` is dropped while their errors matter, and unbounded channels.
6. Check errors and conversions: `Result`s discarded with `let _ =`, `?` conversions that lose context, `Box<dyn Error>` in library APIs where callers need to match, and `as` casts that can truncate or change sign.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (undefined behaviour in unsafe code, reachable panics in a server or library, data loss on cancellation, deadlock), medium (silent truncation or overflow in release, runtime borrow panics, blocked runtime threads), low (needless clones off the hot path).
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Do not ask for `unsafe` to be removed when there is no safe alternative; ask for the invariant to be documented and enforced.
- Treat a panic as acceptable only where the context says so (tests, build scripts, a CLI on impossible states) and say so explicitly.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the function or unsafe block, the defect, the triggering input or task interleaving, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
