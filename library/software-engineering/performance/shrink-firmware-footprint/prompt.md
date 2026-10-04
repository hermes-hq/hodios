---
schema: 1
id: shrink-firmware-footprint
kind: prompt
title: Shrink firmware flash and RAM use
description: Reads a linker map and size report to cut firmware flash and RAM use, from the biggest symbols and pulled-in libraries to stack sizing and flags such as -Os and LTO. Use when out of memory.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [embedded-engineer]
stack: [c, cpp]
requires: [none]
inputs: [file, logs, text]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [firmware, linker-map, code-size, ram-usage, microcontroller, link-time-optimization]
pairs_with:
  prompts: [test-firmware-off-target, write-microcontroller-firmware]
  personas: [embedded-engineer]
args:
  - name: map_or_size_report
    description: The linker map file (or its largest sections), `size` or `arm-none-eabi-size -A` output, a symbol size list (for example `nm --size-sort -S` or bloaty output), and your current compiler and linker flags.
    type: text
    required: true
  - name: mcu
    description: The microcontroller and its memory, for example "STM32G030, 32 KB flash, 8 KB RAM", plus the RTOS or framework.
    type: string
    default: "not given; infer from the map and say what you assumed"
output_contract:
  format: markdown
  sections: [Where the bytes go, Quick wins, Code changes, RAM and stack, Risks and checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's firmware no longer fits, or has no room for the next feature or an over-the-air update slot. MCU: {{mcu}}. Flash holds `.text`, `.rodata` and the initial values of `.data`; RAM holds `.data`, `.bss`, heap and stacks. The usual big wins are not clever code changes but things pulled in by accident: `printf` with floating point support, C++ exceptions, RTTI and iostream, the full newlib instead of newlib-nano, software floating point routines because one `float` or `double` crept in, unused vendor HAL modules, large lookup tables or fonts copied into RAM because they were not `const`, and debug strings and asserts left in release builds.

The trap is shrinking size and breaking timing or behaviour: `-Os` and LTO can change timing of busy-wait loops, inline differently in interrupt handlers, and expose undefined behaviour; stack sizes cut without measuring cause rare crashes in the field.
</context>

<task>
<map_or_size_report>
{{map_or_size_report}}
</map_or_size_report>

1. Summarise the totals: flash used and free, RAM used and free (static), and the share of each section. Note whether heap and stacks are reserved statically.
2. List the 15-20 largest symbols and the libraries they come from (application, vendor HAL, RTOS, C library, compiler runtime such as soft-float or division helpers). Group by origin and give each group's bytes.
3. Identify accidental inclusions and their likely trigger: printf or scanf family with float support, `malloc` pulling in the allocator, exceptions and unwinding tables, RTTI, static constructors, double-precision maths in single-precision code, `sprintf` used for one number, assert strings with file names.
4. Propose quick wins with expected bytes saved (ranges): `-Os` or `-Oz` where the compiler supports it, `-ffunction-sections -fdata-sections` with `--gc-sections`, LTO, newlib-nano (`--specs=nano.specs`) and dropping `_printf_float` if not needed, `-fno-exceptions -fno-rtti` for C++, `-fsingle-precision-constant` or explicit `f` suffixes, removing unused HAL modules, compiling out logs and asserts in release.
5. Propose code changes for what remains: mark tables `const` so they stay in flash, smaller types and bitfields for large arrays of structs, replace a heavy library call with a small purpose-built one, deduplicate strings, compress large assets, move rarely used code to a bootloader-shared or external flash region if the hardware supports it.
6. RAM and stack: find the largest `.bss` and `.data` objects, check buffer sizes against real need, and size each task or main stack from measured high-water marks (stack painting, the RTOS's stack high-water API, or `-fstack-usage` and call-graph analysis) plus a stated margin (for example 20-25%).
7. List risks and checks for each change: timing-sensitive code, interrupt latency, behaviour changes under LTO, and the regression tests or hardware checks to run.

If the input lacks symbol-level sizes, give the exact command to produce them for the toolchain and stop.
</task>

<constraints>
- Every saving is an estimate until rebuilt; give ranges and say which are typical rather than measured.
- Never reduce a stack or buffer without measured usage and a margin.
- Do not invent symbol names or sizes not in the report.
- Do not recommend removing safety checks (watchdog, bounds checks on external input) to save bytes.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where the bytes go
Table: section | bytes | share | notes. Then a table: symbol or group | origin | bytes.
## Quick wins
Table: change | flag or setting | estimated bytes saved | risk.
## Code changes
Bullets with snippets where useful.
## RAM and stack
Table: object or stack | current bytes | measured or estimated need | proposed.
## Risks and checks
Bullets.
</output_format>
