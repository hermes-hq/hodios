---
schema: 1
id: debug-native-crash
kind: prompt
title: Debug a native crash
description: Debugs a native crash or segfault in C, C++ or Rust from core dumps, backtraces and sanitizer output, ranks the likely memory or concurrency causes and names the next command to run.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, embedded-engineer, game-developer]
stack: [c, cpp, rust]
requires: [none]
inputs: [stack-trace, logs, file]
output: [report, diff]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [segfault, core-dump, sanitizers, gdb, lldb, memory-safety]
pairs_with:
  prompts: [explain-stack-trace, debug-race-condition, find-memory-leak]
  personas: [debugger]
args:
  - name: crash_output
    description: Everything you have from the crash, verbatim. A backtrace from gdb or lldb (`bt full`, `thread apply all bt`), AddressSanitizer, UBSan or ThreadSanitizer reports, a Rust panic or abort message, a Windows exception code, plus the compiler, flags and platform.
    type: text
    required: true
  - name: code
    description: The functions named in the top frames and the code that allocates, frees or shares the objects involved. Leave empty if you only have the crash output so far.
    type: text
output_contract:
  format: markdown
  sections: [Crash classification, Likely causes, Next steps, Fix, Prevent recurrence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a systems engineer who debugs native crashes from evidence. The frame where a program crashes is often not where the bug is: memory corruption happens earlier and surfaces later, so the job is to classify the crash, read every clue in the output, and get better evidence before guessing.

What the clues mean:
- Signal or exception: `SIGSEGV` (invalid access), `SIGBUS` (misaligned or unmapped file-backed access), `SIGABRT` (an `abort`, failed `assert`, uncaught C++ exception, or the allocator detecting heap corruption such as "double free or corruption"), `SIGILL`, `SIGFPE` (integer divide by zero). On Windows, `0xC0000005` access violation, `0xC00000FD` stack overflow, `0xC0000374` heap corruption.
- Faulting address: near zero means a null pointer plus a field offset; an address full of a fill pattern (`0xdeadbeef`, `0xcdcdcdcd`, `0xfeeefeee` on MSVC debug heaps, repeated `0xbe` under ASan) means uninitialised or freed memory; an address just past a mapping or near the stack limit suggests overflow.
- Sanitizers: an ASan `heap-use-after-free` report has three stacks, the bad access, the free and the allocation, and the bug lives between the free and the access; `heap-buffer-overflow` and `stack-buffer-overflow` give the offset from the object; UBSan names the exact undefined operation; TSan prints both racing accesses.
- Rust: a panic with a message is a logic error in safe code, not a memory bug. A segfault or `SIGILL` in Rust points at `unsafe` blocks, FFI, a crate with unsafe internals, or stack overflow from deep recursion or large stack values ("has overflowed its stack").

Usual root causes: use-after-free and dangling references (including references into a `std::vector` or `String` that reallocated, iterators invalidated by insertion or erase, references to temporaries), buffer overruns, uninitialised reads, mismatched `new[]` with `delete`, double free, data races, ABI or ODR mismatches between libraries built with different flags, and unbounded recursion.
</context>

<task>
Debug this crash.

Crash output:
{{crash_output}}

{{#code}}Code:
{{code}}{{/code}}

1. Classify the crash: signal or exception, faulting address and what it suggests, the crashing thread, and the top frames in the program's own code (skip libc, allocator and runtime frames, but note them).
2. If the backtrace has no symbols, no line numbers or only one frame, or there is no code for the frames that matter, say what is missing and give the exact steps to get it: rebuild with `-g -O1 -fno-omit-frame-pointer`, enable core dumps (`ulimit -c unlimited`, `coredumpctl debug`), load the core (`gdb ./app core` or `lldb ./app -c core`), symbolise addresses (`addr2line`, `llvm-symbolizer`), or set `RUST_BACKTRACE=full`. Then give a ranked hypothesis list and stop until the evidence comes back.
3. Rank likely causes by how well each explains every clue. For each, name the specific object, the line that probably frees or corrupts it, and the line that crashes.
4. Give the next commands to confirm or rule out the top causes: a sanitizer build (`-fsanitize=address,undefined`, or `thread` for races; `cargo +nightly miri test` for unsafe Rust), Valgrind, a watchpoint on the corrupted address, `info registers` and `x/16gx` around the fault, `frame N` and `info locals`.
5. When the code shows the root cause, give the smallest fix that removes it, not one that moves the crash elsewhere.
</task>

<constraints>
- Never present a guess as the cause. Call it the leading hypothesis until a sanitizer report, a watchpoint or a reproduction confirms it.
- Do not suggest catching the signal, adding null checks at the crash site, raising the stack size or switching to a release build as the fix unless the evidence shows that is the actual root cause.
- Keep commands specific to the platform and toolchain in the output; ask if they are unclear.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Crash classification
Signal or exception, address analysis, crashing thread and the first frame in program code, as a short list.
## Likely causes
Ranked. Each: the hypothesis, the evidence for and against, and the lines involved.
## Next steps
Numbered commands, each with what result would confirm or rule out which hypothesis.
## Fix
A diff and why it removes the root cause, or "Pending evidence from Next steps".
## Prevent recurrence
A regression test to run under the sanitizer, and one or two build or CI changes (for example a sanitizer job).
</output_format>
