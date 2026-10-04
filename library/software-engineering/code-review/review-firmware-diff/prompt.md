---
schema: 1
id: review-firmware-diff
kind: prompt
title: Review a firmware diff
description: Reviews embedded C or C++ changes for ISR safety, missing volatile or atomics, stack use, blocking calls in timed paths, overflow, register order and watchdog use. Use on firmware PRs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [embedded-engineer]
subject: [engineering]
stack: [c, cpp]
requires: [none]
inputs: [diff]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [firmware, interrupts, rtos, microcontroller, watchdog, timing]
pairs_with:
  personas: [embedded-engineer]
  prompts: [review-pull-request, write-microcontroller-firmware]
args:
  - name: diff
    description: The diff, plus relevant headers, linker or RTOS config, and the ISR or task the code runs in if it is not obvious.
    type: text
    required: true
  - name: target
    description: MCU and clock, memory and toolchain, for example "STM32G4 at 170 MHz, 128 KB RAM, arm-none-eabi-gcc -O2". Include the timing budget if one applies.
    type: string
    default: ""
  - name: rtos
    description: RTOS or scheduler, for example "FreeRTOS 10.5", "Zephyr 3.6", "bare-metal superloop".
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Assumptions, Verdict, Findings, Timing and memory, Tests on hardware]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review firmware the way an experienced embedded engineer does. Firmware defects rarely show on the bench: they appear as a once-a-week lockup, a corrupted reading when an interrupt lands mid-update, a stack overflow on the one path that recurses, or a watchdog reset in the field. The compiler is free to cache, reorder and remove accesses the code relies on, and fixed-width arithmetic wraps silently.

Target: {{target}}
RTOS: {{rtos}}
</context>

<task>
<diff>
{{diff}}
</diff>

1. If the MCU, the execution context (ISR, task, superloop) or the timing budget is missing and a finding depends on it, list the assumption you make under Assumptions. If the context is so unclear that most of the review would be guesswork, ask for the MCU, RTOS and timing budget and stop.
2. For each changed function, identify where it runs (which ISR at what priority, which task, init only) and what it shares with other contexts.
3. Check:
   - **ISR safety:** ISRs kept short; no blocking calls, `malloc`, `printf`, floating point where the FPU context is not saved, or non-ISR-safe RTOS APIs (use the `FromISR` variants); flags cleared in the right order; nested-priority assumptions.
   - **Shared data:** variables shared with ISRs or other tasks declared `volatile` and accessed atomically; multi-byte or read-modify-write accesses protected by a critical section, atomics or disabling the specific interrupt; critical sections kept short; priority inversion around mutexes.
   - **Memory:** stack depth per task (large local buffers, recursion, `alloca`, VLAs), heap use after init, buffer bounds on DMA and UART buffers, alignment and cache coherency for DMA, `const` data placed in flash.
   - **Timing:** busy-waits and blocking delays in time-critical paths, unbounded loops waiting on hardware without a timeout, timer and tick wraparound (compare with unsigned subtraction), latency added to an ISR.
   - **Arithmetic:** overflow and truncation on `uint8_t`/`uint16_t`/`int32_t`, signed/unsigned comparison, integer promotion surprises, division by zero, fixed-point scaling, units.
   - **Peripherals:** register write order from the reference manual (clock enable before configuration, unlock sequences), read-to-clear side effects, bit-field and mask mistakes, missing memory barriers where the core needs them.
   - **Robustness:** watchdog fed only from a point that proves the system is healthy (not from a timer ISR), error paths that leave peripherals in a known state, brown-out and reset-cause handling, safe behaviour on bad sensor data.
4. Rate each finding: critical (lockup, corruption, unsafe actuator state), high (field failure under normal conditions), medium (edge timing or rare input), low (hardening).
5. Estimate the timing and memory impact of the change where the diff allows (added cycles in an ISR, stack bytes, flash bytes), marked as estimates.
</task>

<constraints>
- Every finding cites `path:line`, the execution context, the failure and the fix. Where the fix depends on the MCU or RTOS, say what to check in the reference manual or RTOS docs.
- At most 10 findings, ranked by severity. No style comments unless they cause one of the defects above.
- Do not invent register names, addresses, errata or API behaviour; name the document to check instead.
- If the code controls motors, heaters, power or anything safety-related, say when a finding needs a safety review under the product's standard.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets: MCU, context and timing assumptions you made.
## Verdict
One line: approve | approve-with-nits | request-changes, with the main risk.
## Findings
Numbered. Each: severity, `path:line`, context (ISR, task name, init), the defect, how it fails on hardware, the fix.
## Timing and memory
Bullets: estimated ISR latency change, stack and heap impact, flash and RAM growth.
## Tests on hardware
Bullets: what to measure or provoke (logic analyser on a pin toggle, stack watermark, fault injection, interrupt storm, long soak test) and the finding each one checks.
</output_format>
