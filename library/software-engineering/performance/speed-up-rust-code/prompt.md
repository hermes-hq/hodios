---
schema: 1
id: speed-up-rust-code
kind: prompt
title: Speed up a slow Rust program
description: Speeds up a Rust program from profiles and criterion benchmarks by removing needless clones and allocations, choosing better collections and hashers, and setting release profile options.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [software-engineer, backend-engineer, embedded-engineer]
stack: [rust]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [criterion, cargo-profile, lto, allocations, flamegraph]
pairs_with:
  prompts: [profile-hot-path, write-microbenchmark, read-flame-graph]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow binary, function or crate, how it is run and how slow it is.
    type: text
    required: true
  - name: evidence
    description: Benchmark results, a flame graph or perf output, and the Cargo.toml profile settings, if available.
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time goes, Changes, Benchmark evidence, Left alone]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
First check how it was built: debug builds are often ten or more times slower, and "Rust is slow" reports are frequently cargo run without --release. In release code the usual costs are: clone() and to_string() used to satisfy the borrow checker on hot paths (borrowing, Cow or Arc often remove them), collecting into intermediate Vecs between iterator steps, Vec growth without with_capacity, HashMap with the default SipHash on hot integer keys (a faster non-cryptographic hasher is fine when keys are not attacker-controlled), String formatting in loops, Box<dyn Trait> dispatch in tight loops, unbuffered I/O (wrap files and stdout in BufReader and BufWriter, lock stdout once), and Mutex contention. Release profile options such as lto, codegen-units = 1 and panic = "abort" trade build time or behaviour for speed and must be measured. Criterion gives statistically sound comparisons; cargo flamegraph or perf shows where time goes.
</context>

<task>
Target: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Confirm the build mode and the Cargo profile. Measure the baseline in release mode on realistic input; add a criterion benchmark for the hot function if there is none.
2. Profile (cargo flamegraph, perf, or the platform profiler) with debug symbols in release and name the top functions by self and total time.
3. Fix the biggest costs one at a time: remove clones and intermediate collections, preallocate, buffer I/O, pick a fitting collection (Vec over HashMap for small dense keys, a faster hasher where safe, BTreeMap only when order is needed), avoid dynamic dispatch in tight loops, and reduce lock scope.
4. After each change, rerun the benchmark; keep it only if criterion shows a real improvement.
5. Then consider profile settings (lto, codegen-units, opt-level, target-cpu) with measured gains and their costs (build time, portability of target-cpu=native, panic=abort removing unwinding).
6. Run cargo test and clippy. Report the results.
</task>

<constraints>
- No unsafe code unless the user asks for it and the gain is measured; if used, document the invariant.
- Do not swap in a non-cryptographic hasher for maps keyed by untrusted input without saying so.
- Report measured numbers from release builds only.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Time (and memory if relevant) before and after, in release mode, with the input.
## Where the time goes
Top functions from the profile with `path:line`.
## Changes
The diff with one sentence per change.
## Benchmark evidence
Criterion output or a summary of runs.
## Left alone
Ideas not applied and why, or "None".
</output_format>
