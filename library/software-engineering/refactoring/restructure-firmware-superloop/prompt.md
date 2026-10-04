---
schema: 1
id: restructure-firmware-superloop
kind: prompt
title: Restructure a firmware superloop
description: Restructures a tangled single-loop firmware sketch full of globals and delays into non-blocking state machines and modules, keeping behaviour and timing the same, one step at a time.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [embedded-engineer, software-engineer]
stack: [cpp]
requires: [none]
inputs: [file, text]
output: [code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [state-machine, non-blocking, arduino, firmware, superloop]
pairs_with:
  prompts: [design-firmware-task-architecture, write-microcontroller-firmware]
  personas: [embedded-engineer]
args:
  - name: firmware_code
    description: The sketch or main loop code as it is now (all files if split), what the device does, and any behaviour that must stay exactly the same (blink rates, debounce feel, timeouts).
    type: text
    required: true
  - name: board
    description: The board and framework, for example Arduino Uno, ESP32 with Arduino core, or STM32 with HAL.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Behaviour inventory, Problems found, Refactoring steps, Restructured code, How to verify each step, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You restructure a firmware loop that grew by accretion. Typical symptoms: `delay()` calls that freeze button reading and communication, dozens of global flags that encode state implicitly, one huge `loop()` with nested ifs, interrupt handlers sharing variables without `volatile` or atomic access, and timing that only works by accident. Rewriting from scratch loses subtle behaviour that users rely on, so you change structure in small steps, flashing and checking after each one. You do not add an RTOS; that is a separate design decision.

Board: {{board}}
</context>

<task>
<firmware_code>
{{firmware_code}}
</firmware_code>

1. Build a behaviour inventory from the code: every input, output and timing (for example "LED blinks 200 ms on, 800 ms off while in pairing mode", "button held 3 s triggers reset"), every mode the device can be in, and the transitions between them. This becomes the checklist that must still be true afterwards.
2. List problems: blocking delays and what they block, implicit state spread across flags, shared data between interrupts and the loop without protection, `millis()` comparisons that fail on overflow (use `now - start >= interval`), magic numbers, and hardware access mixed into logic.
3. Plan refactoring steps, each small enough to flash and test on its own, in this order: (a) name constants and pins; (b) protect interrupt-shared variables (`volatile`, copy with interrupts briefly disabled); (c) replace each `delay()` with a non-blocking timer, one at a time; (d) turn implicit flags into an explicit state enum with a switch-based state machine per concern (for example connection, user input, actuator); (e) move each concern into its own module with `setup` and `update(now)` functions and keep hardware access behind small driver functions; (f) make `loop()` a short list of `update` calls.
4. Write the restructured code in full, using the board's normal framework, keeping timing values identical and noting where a delay's blocking side effect was load-bearing (for example a debounce that relied on it) and how it is preserved.
5. For each step, give a verification: what to observe on the device, a serial log line to compare, or a logic-analyser check of a timing.
</task>

<constraints>
- Keep behaviour and timing identical; if the original has a bug, leave it and list it under Risks with a proposed fix as a separate change.
- No dynamic memory allocation in the new structure, no new libraries, and no RTOS.
- Stay within the board's memory; avoid `String` on small AVR boards and say if the original's use of it risks fragmentation.
- If the code is partial or references functions not shown, say what is missing and mark gaps as [X] rather than guessing hardware details.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviour inventory
Table: behaviour | trigger | timing | must stay identical (yes or note).

## Problems found
Bullets with line references.

## Refactoring steps
Numbered steps, each with what changes and why it is safe.

## Restructured code
Full code in code blocks, one per file.

## How to verify each step
Table: step | what to check | how (device, serial, analyser).

## Risks and questions
Bullets, including bugs preserved on purpose.
</output_format>
