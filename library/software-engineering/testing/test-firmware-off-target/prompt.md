---
schema: 1
id: test-firmware-off-target
kind: prompt
title: Test firmware off target
description: Sets up host-based unit tests for firmware by separating logic from the HAL, faking registers and peripherals, and running in CI. Use when firmware has no automated tests.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [embedded-engineer]
stack: [c, cpp]
requires: [none]
inputs: [file, text]
output: [tests, code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [firmware, hal, test-doubles, hardware-in-the-loop, host-tests, microcontroller]
pairs_with:
  prompts: [write-microcontroller-firmware, decouple-for-testability]
  personas: [embedded-engineer]
args:
  - name: firmware_code
    description: The firmware source to test - one module or driver plus the headers it includes. Say which MCU and which vendor HAL or RTOS it uses if the code does not show it.
    type: text
    required: true
  - name: toolchain
    description: The cross-compiler and build system, for example "arm-none-eabi-gcc with CMake" or "PlatformIO".
    type: string
    default: "not given; infer from the code and say what you assumed"
  - name: framework
    description: A host test framework you already use or prefer, such as Unity with CMock, Ceedling, CppUTest or GoogleTest.
    type: string
    default: "recommend one that fits the language and build"
output_contract:
  format: markdown
  sections: [Testability assessment, Seams and fakes, Test setup, First tests, Needs real hardware, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is an embedded engineer whose firmware is only tested by flashing a board and watching it. Most firmware logic (state machines, protocol parsing, scaling, filtering, retry and timeout rules) does not need hardware at all, and can run as fast unit tests on the build machine, compiled with the host compiler. What blocks that is code that reads and writes registers directly, calls the vendor HAL from inside business logic, uses compiler-specific keywords, or depends on a real tick counter.

Common failures this prompt avoids: mocking every HAL call so tests only restate the implementation; trying to emulate the whole MCU; ignoring host-versus-target differences (int width, endianness, struct packing, `volatile`, alignment) so tests pass on the laptop but not on the chip; and claiming host tests prove timing, interrupts or electrical behaviour.

Toolchain: {{toolchain}}. Test framework: {{framework}}.
</context>

<task>
<firmware_code>
{{firmware_code}}
</firmware_code>

1. Sort the code into three layers: pure logic (no hardware access), hardware-facing glue (calls into the HAL, drivers, RTOS), and direct register access. Name the functions in each.
2. Propose seams with the least churn: a thin interface (struct of function pointers, link-time substitution of a `.c` file, or a small C++ interface) between logic and hardware. Prefer link-time substitution for C when the code must not change shape; prefer passing a dependency when the module is being touched anyway.
3. Design fakes, not just mocks: a fake GPIO or UART that records writes and lets the test inject reads, a fake register block as a plain struct the code points at in tests, a controllable fake clock or tick source, and a fake for any RTOS call the logic uses (queue, semaphore, delay). Use generated mocks (for example CMock) only to check that a call happened at the boundary.
4. Set up the host build: a separate target compiled with the host compiler, compile flags such as `-Wall -Wextra -Werror` and sanitizers (`-fsanitize=address,undefined`) on host, fixed-width types, a guard for compiler-specific attributes, and the one command to run the tests locally and in CI. Note host-versus-target differences to check for this code.
5. Write the first 4-8 tests for the most valuable logic: boundaries, invalid input, wraparound of counters and ticks, timeouts and error paths. Each test names the behaviour it proves.
6. List what still needs hardware-in-the-loop or on-target tests: interrupt timing and races, DMA, peripheral configuration, power modes, real sensor noise, watchdog and boot behaviour. Suggest the cheapest way to cover each (on-target test runner, logic analyser capture, HIL rig).

If the code is too partial to see where the hardware calls happen, ask for the header or HAL wrapper it uses and stop.
</task>

<constraints>
- Do not change the firmware's behaviour while adding seams; keep refactors minimal and show them as diffs or before-and-after snippets.
- No dynamic allocation added to target code for the sake of tests.
- Do not invent register names, addresses or HAL function signatures; use the ones in the code or mark them [CHECK DATASHEET].
- Never claim a host test proves timing, interrupt safety or electrical behaviour.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Testability assessment
Table: function or module | layer (logic, glue, register) | testable on host now? | blocker.
## Seams and fakes
For each seam: technique, the interface or substitution, and the fake's code.
## Test setup
Directory layout, build target, flags and the commands to run locally and in CI.
## First tests
The test file code, with one comment line per test on what it proves.
## Needs real hardware
Table: behaviour | why host tests cannot prove it | cheapest on-target check.
## Next steps
Up to five, in order.
</output_format>
