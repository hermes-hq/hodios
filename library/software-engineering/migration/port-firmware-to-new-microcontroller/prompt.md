---
schema: 1
id: port-firmware-to-new-microcontroller
kind: prompt
title: Port firmware to a new microcontroller
description: Plans porting firmware to a different MCU or vendor SDK, covering HAL gaps, peripherals, clocks, pin mapping, interrupt priorities, toolchain and bootloader, with a board bring-up test order.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [embedded-engineer]
stack: [c]
requires: [none]
inputs: [text, file]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mcu-port, hal, board-bring-up, pin-mapping, interrupts, bootloader]
pairs_with:
  personas: [embedded-engineer, migration-engineer]
args:
  - name: current_mcu
    description: The current part number, core, clock, flash and RAM, vendor SDK or HAL version, RTOS if any, and toolchain.
    type: string
    required: true
  - name: target_mcu
    description: The new part number and why it was chosen (shortage, cost, power, a new feature), plus the SDK or HAL you plan to use.
    type: string
    required: true
  - name: firmware_overview
    description: What the firmware does, the peripherals it uses (with modes, for example "SPI1 master 8 MHz with DMA", "ADC 4 channels at 1 kHz"), timing-critical paths, interrupts, the bootloader and update mechanism, memory use and how the code is layered. Rough notes are fine.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Abstraction plan, Peripheral mapping, Clock and timing, Toolchain and boot, Bring-up order, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An embedded engineer has to move firmware from {{current_mcu}} to {{target_mcu}}, often under a chip shortage or a board redesign. Ports go wrong in the places a feature list does not show: a peripheral that exists on both parts but differs in FIFO depth, DMA request mapping or errata; pins that cannot share the needed alternate functions; a clock tree that cannot produce the exact UART baud or USB clock; interrupt priority numbering and nesting rules that differ between cores or vendors; flash page sizes and write rules that break the bootloader and settings storage; and endianness, alignment or atomic access assumptions buried in application code. The safest port isolates hardware access behind a thin board layer and brings the board up one peripheral at a time.
</context>

<task>
<firmware_overview>
{{firmware_overview}}
</firmware_overview>

1. Fit check: compare flash, RAM, core and FPU, peripheral counts and features, voltage domains, package and pin count, temperature grade and availability. Flag anything the firmware needs that the target lacks. Tell the user which datasheet, reference manual and errata sections to read for each peripheral in use; do not state register-level or errata details from memory as fact.
2. Abstraction plan: find where application code touches vendor HAL calls, registers or vendor types directly. Propose a board support layer with small interfaces per peripheral (for example `uart_write`, `adc_start_scan`, `flash_erase_page`) so the application compiles against both parts, and say whether to port the RTOS port layer, the HAL, or both.
3. Peripheral mapping: for each peripheral, the target instance, pins and alternate functions, DMA channel or request, interrupt, and the behaviour differences to verify. Check pin conflicts and that the PCB can route them.
4. Clock and timing: a clock tree that meets every derived frequency (UART baud error under about 2%, USB 48 MHz, ADC sample rates, timer resolution), low-power modes and wake-up sources, and how timing-critical loops and delays must change.
5. Interrupts and concurrency: priority mapping (lower number means higher priority on some cores, not all), priorities usable with RTOS calls, nesting, critical sections and atomic access width.
6. Toolchain and boot: compiler and linker script, startup code, vector table location, memory map, bootloader and firmware update compatibility (flash layout, page size, image header, signature), option bytes or fuses, debug probe and production programming.
7. Bring-up order on the first boards: power and clocks, debug connection, GPIO blink, UART log, timers, then each peripheral from simplest to most timing-critical, then the bootloader and an update cycle, then low power, then full-system soak tests. Each step gets a pass criterion.
</task>

<constraints>
- Never state register names, errata, pin alternate functions or electrical limits as fact without saying which document confirms them; mark them "to verify in the datasheet or reference manual".
- If peripheral details, memory use or the update mechanism are missing and they change the plan, ask for them and mark assumptions as [X].
- Keep field-update safety first: a port must not brick devices already deployed if the bootloader changes.
- Consider certification (radio, safety, EMC) re-testing when the MCU or board changes, and say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fit check
Table: need | current | target | status (ok, differs, missing) | document to check.

## Abstraction plan
Bullets and a short interface sketch in C.

## Peripheral mapping
Table: function | current instance and pins | target instance and pins | DMA and IRQ | differences to verify.

## Clock and timing
The proposed clock tree in text, derived frequencies with error, and timing code to revisit.

## Toolchain and boot
Bullets.

## Bring-up order
Numbered steps, each with a pass criterion.

## Risks and open questions
Ranked bullets.
</output_format>
