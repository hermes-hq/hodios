---
schema: 1
id: embedded-bringup-track
kind: workflow
title: Embedded board bring-up track
description: Brings up a new board or prototype in gated steps, from power and clocks to debugger and blinky, a UART console, each peripheral with a test, and a bring-up report for the hardware team.
category: implementation
version: 1.0.0
status: incubating
stage: [plan, build, verify, review]
role: [embedded-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [checklist, code, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [board-bring-up, firmware, hardware-validation, smoke-test, uart-console, microcontrollers]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-sensor-driver, debug-bus-communication, decode-microcontroller-hard-fault, implement-firmware-bootloader]
args:
  - name: board_description
    description: The board - revision, schematic notes, power tree (input, regulators, rails), crystals, debug header, every peripheral and part number with its bus and pins, and what is already known to be wrong. Rough notes are fine.
    type: text
    required: true
  - name: mcu
    description: The microcontroller and package, toolchain and debugger, for example "STM32H743ZI, arm-none-eabi-gcc 13, ST-LINK V3".
    type: string
    required: true
steps:
  - {id: power, file: steps/01-power-and-clocks.md, stage: plan, gate: approve, artifact: "bringup/01-power-and-clocks.md"}
  - {id: blinky, file: steps/02-debugger-and-blinky.md, stage: build, gate: approve, artifact: "bringup/02-debugger-and-blinky.md"}
  - {id: console, file: steps/03-uart-console.md, stage: build, gate: approve, artifact: "bringup/03-uart-console.md"}
  - {id: peripherals, file: steps/04-peripherals.md, stage: verify, gate: approve, artifact: "bringup/04-peripherals.md"}
  - {id: report, file: steps/05-bringup-report.md, stage: review, gate: none, artifact: "bringup/05-bringup-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Brings a new board to life the way an experienced embedded engineer does on the bench: prove power before code, prove the debugger before peripherals, add one thing at a time, and write down every deviation for the hardware team. Each step writes one artifact and stops for approval; the user runs the bench work and reports results back.

<board_description>
{{board_description}}
</board_description>

Microcontroller and tools: {{mcu}}

Rules for every step:
- Work from the schematic and datasheets the user gives. Ask for missing essentials (rail voltages, crystal frequency, debug pins, part numbers) and mark gaps as [X]; never invent pin assignments, register values or limits.
- Never assume a result. Give the measurement or test, its expected value with tolerance, and wait for the user's reading before building on it.
- Change one thing at a time, and record every rework, bodge wire or workaround.
- Warn before anything that can damage parts or lock the chip: current-limit off, mains or high voltage, option bytes, read-out protection, fuses, boot pins.
- Keep code minimal and throwaway-friendly, but with timeouts and error output, so later firmware can reuse it.
- End each artifact with open issues and questions.
