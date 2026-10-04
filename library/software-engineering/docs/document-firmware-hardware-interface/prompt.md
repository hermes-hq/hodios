---
schema: 1
id: document-firmware-hardware-interface
kind: prompt
title: Document a firmware hardware interface
description: Writes the hardware interface document for a board and its firmware, with pinout, buses and addresses, power and reset, timing limits, debug connectors and the board revision it applies to.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [embedded-engineer, technical-writer]
stack: []
requires: [none]
inputs: [notes, spec, document, text]
output: [docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [pinout, board-bring-up, interface-control-document, peripherals, hardware-revision]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-microcontroller-firmware, write-firmware-requirements]
args:
  - name: board_and_firmware_notes
    description: Everything you have - schematic net names, pin assignments from the firmware (board config, device tree, HAL init code), part numbers, bus addresses, power rails, clock settings, connector notes, known quirks.
    type: text
    required: true
  - name: board_revision
    description: The board revision and firmware version this document describes, for example "Rev C, firmware 2.4.x".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Document header, Pinout, Buses and peripherals, Power and reset, Clocks and timing, Debug and programming, Revision differences, Open items]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The hardware interface document is the contract between the board and the firmware. Hardware engineers, firmware engineers, test engineers and the next team rely on it during bring-up, debugging and board spins. It fails when pin tables omit the electrical facts that matter (active level, pull-ups, voltage domain, 5 V tolerance), when bus addresses are given in mixed 7-bit and 8-bit notation, when it does not say which board revision it describes, and when values copied from memory are presented as verified.

Board revision and firmware version: {{board_revision}}. If this is "not stated" and the notes do not say, put [X] in the header and ask for it, because every table depends on it.
</context>

<task>
<notes>
{{board_and_firmware_notes}}
</notes>

1. Header: board name, revision, firmware version, MCU or SoC part number, document status and the sources each section was taken from (schematic, firmware config, datasheet, measurement).
2. Pinout table, one row per used pin: MCU pin and port, net name, function (GPIO, alternate function, analog), direction, active level, pull-up or pull-down (internal or external, value), voltage domain, default state at reset and in firmware, connector and pin if routed off-board, notes. List unused pins and how firmware configures them (for example analog input to save power).
3. Buses: for each I2C, SPI, UART, CAN, USB or other bus, the instance, pins, speed or baud, mode (SPI CPOL/CPHA), and every device on it with part number, 7-bit address or chip select, interrupt and reset lines, and the driver in the firmware. State address notation once and use 7-bit consistently.
4. Power and reset: rails with voltage, source and sequencing, which rails firmware controls, sleep modes and what stays powered, brown-out threshold, reset sources and how firmware reads the reset cause, watchdog configuration.
5. Clocks and timing: oscillators and tolerances, system clock tree as configured, and timing constraints that firmware must respect (sensor start-up delays, minimum pulse widths, bus timing, interrupt latency budgets).
6. Debug and programming: debug connector pinout (SWD, JTAG, UART console with settings), boot mode pins or straps, how to flash in development and production, and protections (readout protection, secure boot) with how to recover.
7. Revision differences: what changed from earlier revisions that firmware must detect or handle, and how the firmware identifies the revision (strap resistors, ID EEPROM, ADC divider).
8. Open items: conflicts between sources, values not found, anything that needs measuring on a real board.
</task>

<constraints>
- Use only values present in the notes. Write [X] for any missing value and list it under Open items; never fill an address, voltage or timing from general knowledge.
- Where sources conflict (for example schematic says pull-up, firmware enables internal pull-down), show both and flag it; do not pick one silently.
- Mark the source of every safety-relevant value (voltages, current limits, protection settings).
- Keep tables machine-friendly: one fact per cell, consistent units (V, mA, kHz, MHz, us, ms).
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Document header
Key-value list.
## Pinout
Table with the columns from step 2, then unused pins.
## Buses and peripherals
One subsection per bus with a device table: device, part, address or CS, IRQ, reset, driver.
## Power and reset
Rails table (rail, voltage, source, controlled by, sequence) then bullets.
## Clocks and timing
Bullets and a constraints table: constraint, value, source, enforced in (file or function).
## Debug and programming
Connector table and numbered flashing and recovery steps.
## Revision differences
Table: revision, change, firmware impact, detection.
## Open items
Numbered list with who can answer each.
</output_format>
