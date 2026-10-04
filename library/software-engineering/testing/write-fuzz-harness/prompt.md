---
schema: 1
id: write-fuzz-harness
kind: prompt
title: Write a fuzz harness
description: Writes a coverage-guided fuzz harness for a parser or decoder with a seed corpus, dictionary, sanitizers, a CI time budget and crash triage. Use for code that reads untrusted input.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [software-engineer, security-engineer, maintainer]
stack: []
requires: [none]
inputs: [file, text]
output: [tests, code, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [fuzzing, libfuzzer, sanitizers, parsers, crash-triage, coverage-guided]
pairs_with:
  prompts: [write-property-based-tests]
  personas: [security-auditor]
args:
  - name: target_code
    description: The function to fuzz (parser, decoder, deserializer, protocol handler) with its signature, what input it accepts, and any example inputs or format spec.
    type: text
    required: true
  - name: language
    description: The language of the target, which decides the fuzzing engine.
    type: enum
    enum: [c, cpp, rust, go, python, java, other]
    required: true
output_contract:
  format: markdown
  sections: [Target and invariants, Harness, Corpus and dictionary, Build and run, CI budget, Triage]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants to fuzz code that handles untrusted or complex input. Coverage-guided fuzzing finds crashes, hangs, memory errors and logic bugs that hand-written tests miss, but only with a good harness: one that is fast (thousands of executions per second), deterministic, free of global state between runs, reaches deep code instead of failing at the first checksum or length check, and turns silent bugs into crashes with sanitizers and assertions.

Engines by language ({{language}}): libFuzzer or AFL++ for C and C++ (with AddressSanitizer and UndefinedBehaviorSanitizer); cargo-fuzz for Rust; native `go test -fuzz` for Go; Atheris for Python; Jazzer for Java. For other languages, name the closest maintained option and say how mature it is.
</context>

<task>
<target_code>
{{target_code}}
</target_code>

1. Define the target and invariants: the entry function, the input it takes, and what must always hold besides "does not crash" (round-trip: decode(encode(x)) == x; parse never returns success with an inconsistent object; output length bounds; two implementations agree).
2. Write the harness:
   - Take the fuzzer's bytes and feed them to the target with minimal setup; for structured input, use the engine's structured helper (for example a data provider or `arbitrary`) rather than hand-parsing bytes.
   - Reset or avoid global state; no file, network or clock access; no randomness the fuzzer does not control.
   - Bound input size and recursion so hangs and out-of-memory reports are meaningful; set a per-input timeout.
   - Assert the invariants so logic bugs crash.
   - Work around blockers that stop deep coverage (checksums, magic numbers, signatures) with a fuzzing build flag, and say so.
3. Build a seed corpus: small valid inputs from tests and examples, one per feature of the format, plus a few edge files (empty, one byte, maximum nesting). Write a dictionary of format tokens (magic bytes, keywords, delimiters).
4. Give the build and run commands with sanitizers, the flags for timeout, memory limit and maximum input length, and how to read the coverage and executions-per-second output.
5. Set a CI budget: a short run (for example 5-10 minutes) on pull requests that touch the target, longer runs on a schedule, corpus kept as an artefact between runs, and regressions: every crash input added to the corpus and to a normal unit test.
6. Explain triage: reproduce with the crash file, minimise it (the engine's minimise mode), deduplicate by stack, classify (out-of-bounds, use-after-free, overflow, assertion, timeout, out-of-memory), fix, and add the regression test. Mention continuous fuzzing services suitable for open-source projects as an option.

If the target code's input contract is unclear, ask what a valid input looks like and stop.
</task>

<constraints>
- The harness must be deterministic and must not write files or open sockets.
- Do not invent APIs of the user's code; mark assumptions [ASSUMED].
- Never fuzz production services or third-party systems; harnesses run locally or in CI.
- Do not claim the code is safe because a short run found nothing; state what coverage and duration were reached.
</constraints>

<output_format>
## Target and invariants
Bullets.
## Harness
Code.
## Corpus and dictionary
Seed file list with what each exercises, and the dictionary file.
## Build and run
Commands with flags explained in one line each.
## CI budget
Pull-request and scheduled jobs, durations, corpus storage.
## Triage
Numbered steps.
</output_format>
