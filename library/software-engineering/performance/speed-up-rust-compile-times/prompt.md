---
schema: 1
id: speed-up-rust-compile-times
kind: prompt
title: Cut Rust compile times
description: Cuts Rust build and incremental rebuild times using cargo timings and self-profiling, then splits crates, trims dependencies, generics and proc macros, and picks a faster linker and dev profile.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, backend-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [compile-time, cargo-timings, workspace, linker, incremental-builds]
pairs_with:
  prompts: [speed-up-rust-code, speed-up-ci-pipeline, speed-up-monorepo-builds]
  personas: [rust-engineer, performance-engineer]
args:
  - name: project
    description: Workspace layout, Rust version, which build is slow (clean, incremental after a small edit, `cargo check`, release, tests) with times, OS, and the heaviest dependencies.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Where time goes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rust's unit of parallelism and incremental reuse is the crate. `cargo build --timings` draws a per-crate timeline showing which crates are on the critical path and whether codegen is serial; a giant single crate leaves cores idle and recompiles everything on any edit. For the usual edit-compile loop, the costs are: the crate being edited and everything that depends on it; monomorphisation of generic code in each downstream crate (heavy generic APIs, `impl Trait` everywhere, serde derives on huge types); proc macros, which are compiled and run as separate programs (derive-heavy crates, and `syn` with `full` features built more than once); and the linker, which often dominates incremental builds of binaries and tests. Fast fixes: use `lld` or `mold` as the linker (recent stable Rust already defaults to `lld` on x86-64 Linux, and macOS's newer default linker is already fast, so check what is in use first); lower debug info in dev (`debug = "line-tables-only"` or `0` for dependencies) and build dependencies with `opt-level` that suits the work; avoid duplicate versions of big crates (`cargo tree -d`); disable unused default features; split a large crate along stable boundaries so edits invalidate less; and consolidate many integration test binaries into one, since each links separately. `cargo +nightly rustc -- -Zself-profile` and `cargo llvm-lines` find heavy functions within a crate. Use sccache or CI caching for clean builds.
</context>

<task>
Cut compile times for: {{project}}

1. Read `Cargo.toml` files, profiles, workspace members, features, build scripts, and the test layout.
2. Measure the slow scenario on a fixed machine: clean build, incremental rebuild after a typical one-line edit in the most-edited crate, `cargo check`, and test build. Capture `--timings` output.
3. Identify the critical path crates, duplicate dependency versions, heavy proc macros, monomorphisation hot spots (`cargo llvm-lines`), and the linker's share of incremental time.
4. Apply the cheapest high-value fixes first: faster linker, dev profile debug info and dependency optimisation levels, trimming features and duplicates, merging test binaries. Re-measure after each.
5. If still slow, propose structural changes with expected gains: splitting the hot crate, moving generic code behind dynamic dispatch at crate boundaries, reducing derive load. Implement only what is agreed.
6. Run the full test suite and a release build to confirm nothing changed in behaviour.
</task>

<constraints>
- Do not change release profile settings that affect runtime performance (LTO, codegen-units, opt-level) without stating the runtime trade-off.
- Linker choice must be per-platform and must not break CI or teammates' platforms; document setup.
- Report times on the same machine and scenario, and say whether the cache was warm.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Times per scenario and the timings summary.
## Where time goes
Critical path crates, linker share, proc macros, generic hot spots.
## Changes
One line per file: `path`, what changed, time saved.
## Results
Times after, tests and release build status, structural proposals.
</output_format>
