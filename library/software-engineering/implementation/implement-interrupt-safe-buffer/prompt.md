---
schema: 1
id: implement-interrupt-safe-buffer
kind: prompt
title: Implement an interrupt-safe buffer
description: Implements a lock-free single-producer single-consumer ring buffer between an interrupt handler and the main loop or an RTOS task, with correct barriers, an overflow policy and tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build, verify]
role: [embedded-engineer]
stack: [c, cpp, rust]
requires: [none]
inputs: [text]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ring-buffer, lock-free, isr, memory-ordering, spsc-queue, firmware]
pairs_with:
  personas: [embedded-engineer, concurrency-specialist]
  prompts: [debug-race-condition, write-sensor-driver]
args:
  - name: use_case
    description: Who produces and who consumes (for example "UART RX interrupt to parser task"), element type and size, peak rate and burst size, the core (Cortex-M0+, M4, M7 with cache, RISC-V, dual-core), RTOS if any, and whether DMA is involved.
    type: text
    required: true
  - name: language
    description: The implementation language.
    type: enum
    enum: [c, cpp, rust]
    default: c
output_contract:
  format: markdown
  sections: [Design, Sizing, Implementation, Why it is safe, Tests]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs data to cross from interrupt context to thread context (or the reverse) without disabling interrupts for long and without corrupting data. A single-producer single-consumer (SPSC) ring buffer is lock-free when exactly one context writes the head and exactly one writes the tail. Common bugs: `volatile` used as if it were a memory barrier (it stops the compiler caching the value but does not order the data write before the index publish); non-atomic index updates on cores where a 32-bit store is not single-copy atomic or the index is wider than the native word; computing `count = head - tail` with signed or mismatched widths; using `%` with a non-power-of-two size in a hot ISR; reading the element after publishing the tail; two consumers sharing one SPSC buffer; and on cores with data cache plus DMA, forgetting cache maintenance.
</context>

<task>
<use_case>
{{use_case}}
</use_case>

1. Confirm there is exactly one producer and one consumer. If not (two ISRs at different priorities writing, two tasks reading, a second core), say SPSC does not fit and give the alternative: a critical section, a per-producer buffer, or the RTOS queue. If the core or element size is missing and changes the answer, ask.
2. Size the buffer: worst-case burst plus the consumer's maximum latency times the arrival rate, rounded up to a power of two, with the arithmetic shown.
3. Choose the overflow policy and say why: drop newest and count drops (default for logs and sensor streams), overwrite oldest (only when the consumer tolerates gaps; the producer must never move the tail in SPSC, so this needs sequence numbers or a double buffer), or signal back-pressure.
4. Implement in {{language}}: free-running unsigned indices masked on access (so full and empty differ without a wasted slot), the producer writes the element then publishes the head with release ordering, the consumer reads the head with acquire ordering, reads the element, then publishes the tail with release ordering. Use C11 `<stdatomic.h>`, `std::atomic`, or `core::sync::atomic` (or `heapless::spsc` in Rust, explaining what it guarantees). Where atomics are unavailable, use the core's barrier intrinsics with a comment naming the ordering each provides.
5. Add bulk push and pop for byte streams, a drop counter, a high-water mark, and a way to wake the consumer (task notification, event flag or semaphore give from ISR) without busy-waiting.
6. If DMA writes into the buffer on a cached core, add cache invalidate/clean on the right lines and align the buffer to the cache line size.
7. Write tests: host unit tests for empty, full, wrap-around after index overflow (start indices near the type's maximum), and bulk operations; a two-thread stress test on the host with a sanitizer (ThreadSanitizer) that checks sequence numbers; and an on-target test that fires the interrupt at its peak rate and checks drop count and high-water mark.
</task>

<constraints>
- No locks, heap allocation or blocking calls in the ISR path.
- State the memory model assumption for the core and toolchain; do not claim a barrier is unnecessary without saying why.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design
Producer, consumer, overflow policy and wake-up mechanism, in bullets.
## Sizing
The calculation and the chosen capacity.
## Implementation
Header and source (or module), complete and compilable.
## Why it is safe
Numbered: each ordering point, what it prevents, and the interleaving that would break without it.
## Tests
Host tests, the stress test and the on-target check.
</output_format>
