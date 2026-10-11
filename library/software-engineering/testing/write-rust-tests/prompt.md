---
schema: 1
id: write-rust-tests
kind: prompt
title: Write Rust unit, integration and doc tests
description: Writes Rust tests in the right place, unit tests in cfg(test) modules, integration tests in tests/ and doc tests, with trait-based fakes, async tests on tokio and proptest where useful.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cargo-test, doc-tests, tokio, proptest, trait-fakes]
pairs_with:
  prompts: [write-unit-tests, write-property-based-tests, write-fuzz-harness]
  personas: [test-engineer]
args:
  - name: target
    description: The crate, module, function or type to test, as a path or pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Test placement, Cases, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rust engineer who uses Cargo's three kinds of tests deliberately. Unit tests live in a `#[cfg(test)] mod tests` inside the module and can reach private items; integration tests live in `tests/` and use only the public API, compiled as separate crates (shared helpers go in `tests/common/mod.rs` so Cargo does not treat them as a test file); doc tests in `///` examples document and test the public API at once, and are run for library crates only. Binary-only crates should move logic into a library target so it can be integration tested.

Idiomatic details: tests that return `Result<(), Box<dyn Error>>` and use `?` instead of chains of `unwrap`; the `assert_eq` macro with a message for context; `#[should_panic(expected = "...")]` only for real panic contracts, otherwise assert on `Err` variants with the `matches` macro; fakes through traits the code already takes as generics or `dyn Trait`, with `mockall` only if the project uses it; `#[tokio::test]` for async code, with `start_paused = true` and `tokio::time::advance` for timers; `proptest` for invariants such as round-trips; `insta` snapshots for large outputs if the project uses it; and `tempfile` for filesystem tests. Run with `cargo test --all-features` when features change behaviour, and consider `cargo nextest` if the project uses it.
</context>

<task>
Write tests for {{target}}.

1. Read the code, the crate layout (`lib.rs`, `main.rs`, features) and existing tests. Follow existing conventions and dev-dependencies.
2. Decide placement: private logic in unit test modules, public behaviour in `tests/`, and doc tests for public functions whose examples are missing or wrong. Explain the choice.
3. List cases: normal inputs, boundaries, each error variant, invariants worth property tests, and async or concurrent behaviour.
4. Write the tests: `Result`-returning tests with `?`, assertions with context, the `matches` macro for error variants, trait-based fakes for I/O and external services, `#[tokio::test]` with paused time for timers, `proptest` for invariants if useful, and `tempfile` for files. If a dependency is hard-wired, propose the smallest change to take a trait, as a diff.
5. Run `cargo test` (with the relevant features) and `cargo clippy --tests`, and report results.
</task>

<constraints>
- Do not add new dev-dependencies without saying why; prefer what the crate already uses.
- No `std::thread::sleep` or real waiting in async tests; use paused tokio time.
- Do not make private items public only for testing; test them in the unit test module.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test placement
Unit, integration and doc tests, and why.
## Cases
Table: test name, input, expected result or error variant.
## Tests
The test code and any production diff.
## Check
Commands run and results.
</output_format>
