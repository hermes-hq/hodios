---
schema: 1
id: replace-rust-unwraps-with-error-types
kind: prompt
title: Replace Rust unwraps with proper error handling
description: Replaces unwrap and expect calls in Rust code with typed errors via thiserror in libraries or anyhow in binaries, the ? operator and added context, keeping only the unwraps that are true invariants.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-handling, thiserror, anyhow, panics, result-type]
pairs_with:
  prompts: [unify-error-handling, untangle-rust-ownership, audit-unsafe-rust]
  personas: [rust-engineer]
  rules: [rust-style-rules]
args:
  - name: scope
    description: The crate, module or files to fix, whether it is a library or a binary (or both), and any error types that already exist.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Error design, Changes, Kept unwraps, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`unwrap()` and `expect()` turn every error into a panic, which in a server kills the task or the process and in a library takes the decision away from the caller. The fix is not mechanical replacement with `?`; it needs an error design. The settled convention: libraries expose a typed error enum (usually with `thiserror`), with variants callers can match on and `#[from]` or `#[source]` to keep the cause chain; binaries and application glue use `anyhow::Result` with `.context("reading config from {path}")` so the final error message explains what was being done. Mixing them is fine at the boundary: the binary wraps library errors with context. Common mistakes: one giant error variant holding a `String`, which loses the cause and stops matching; `map_err(|e| e.to_string())`, same problem; `#[from]` on two variants of the same source type (does not compile) or on a generic `io::Error` that then lacks which file failed; and `Box<dyn Error>` without `Send + Sync`, which breaks across async tasks. Some unwraps are fine and should stay as `expect` with a message stating the invariant: a regex literal compiled once, a mutex lock where poisoning means a bug already panicked, an index proven in bounds, or startup configuration where crashing early is the intent. `Option` needs `ok_or` or `ok_or_else` to become a `Result`. `main` can return `Result` (or `anyhow::Result`) so errors print instead of panicking. Clippy has `unwrap_used` and `expect_used` lints that keep new ones out.
</context>

<task>
Replace unwraps in {{scope}}.

1. Read the code and its public API, existing error types, and `Cargo.toml` to see whether `thiserror` or `anyhow` is already used. Find every `unwrap()`, `expect(`, `panic!(...)`, `unreachable!(...)` and indexing that can panic in the scope.
2. Classify each one: a recoverable error that should propagate, a true invariant (keep as `expect` with a message), test code (leave alone), or startup code where failing fast is intended.
3. Design errors: for library code, an error enum per module or crate with meaningful variants, sources preserved and no stringly typed catch-all; for binary code, `anyhow` with context strings that name the operation and its key input.
4. Replace call by call: `?` with `From` conversions or `map_err` into a variant, `.context()` or `.with_context()` in binaries, `ok_or_else` for options, and function signatures changed to return `Result`. Update callers up to the point where the error is handled or reported.
5. Make `main` return a `Result` if it does not, and enable `clippy::unwrap_used` for non-test code if the team agrees.
6. Run `cargo build`, `cargo clippy` and `cargo test`, and report results, including any public API change that is a breaking change for library users.
</task>

<constraints>
- Do not change behaviour beyond turning panics into returned errors; keep messages and exit codes callers rely on, or list the change.
- Do not convert errors to strings where a typed source can be kept.
- Do not add `thiserror` or `anyhow` to a crate without saying so in the report; follow what the project already uses.
- Flag public API signature changes in a library as breaking.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: location, call, classification (propagate, keep, test, startup).
## Error design
The error types or the anyhow approach, in a fenced block.
## Changes
One line per file: `path`, what changed.
## Kept unwraps
Each kept call with the invariant that justifies it.
## Check
`cargo build`, `clippy` and `test` results, and any breaking API change.
</output_format>
