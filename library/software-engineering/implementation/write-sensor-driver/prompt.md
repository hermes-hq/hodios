---
schema: 1
id: write-sensor-driver
kind: prompt
title: Write a sensor driver
description: Writes a driver for an I2C or SPI sensor from its datasheet, with a register map, init sequence, unit conversion, bus error handling, non-blocking reads and a hardware test.
category: implementation
version: 1.0.0
status: incubating
stage: [build, verify]
role: [embedded-engineer, software-engineer, individual]
stack: [c, cpp]
requires: [none]
inputs: [spec, text]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [i2c, spi, datasheet, device-drivers, register-map, sensors]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-microcontroller-firmware, debug-bus-communication]
  workflows: [embedded-bringup-track]
args:
  - name: sensor_and_datasheet_notes
    description: The sensor part number and the datasheet parts you have - register map, I2C address or SPI mode, power-up timing, conversion formulas and calibration data. Paste tables as text; rough notes are fine.
    type: text
    required: true
  - name: mcu
    description: The microcontroller or board, for example "STM32G071", "nRF52840" or "ESP32-S3", and the bus pins or peripheral instance if fixed.
    type: string
    required: true
  - name: framework
    description: The HAL or framework the driver must sit on, for example "STM32 HAL", "Zephyr", "ESP-IDF", "Arduino core" or "bare registers".
    type: string
    default: a thin bus interface you implement for your HAL
output_contract:
  format: markdown
  sections: [Assumptions and gaps, Register map, Driver API, Driver code, Bus error handling, Hardware test]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs a production-quality driver for one sensor on {{mcu}}, built on {{framework}}. Most sensor drivers that "work on the bench" fail in the field for the same reasons: they never check the WHO_AM_I or chip ID, they skip the power-up or reset delay the datasheet requires, they read multi-byte results without burst reads or data-ready checks and get torn values from two different conversions, they get endianness or two's-complement sign extension wrong, they apply calibration formulas with integer overflow, and they hang forever when the bus locks up (an I2C slave holding SDA low after a reset mid-transfer is common). Good drivers separate the bus from the sensor logic so the driver can be unit tested on a host with a fake bus.
</context>

<task>
<sensor_notes>
{{sensor_and_datasheet_notes}}
</sensor_notes>

1. Check the notes for what the driver cannot be written without: the bus and address or SPI mode (CPOL/CPHA, max clock), the chip ID register and value, the measurement registers with byte order, and the conversion formula. If any of these is missing, list exactly which and use clearly marked placeholders such as `REG_X /* [X] datasheet section? */`; never invent register addresses, bit fields or calibration constants.
2. Tabulate the register map you will use: address, name, access, reset value, the fields you touch.
3. Design a small API: `init`, `read` (one result in SI or datasheet units with a stated fixed-point or float representation), `start_conversion` plus `poll_ready` or a data-ready interrupt hook for non-blocking use, `set_config`, `reset`, and a status enum with distinct errors (bus NACK, timeout, wrong chip ID, data not ready, out of range).
4. Write the driver against a bus interface struct (function pointers or a template/trait) with `write_reg`, `read_regs` (burst), and `delay_ms` and `now_ms` hooks. Then give the adapter for {{framework}}.
5. In `init`: wait the power-up time, soft reset, wait, verify chip ID, read calibration data once, apply configuration, and read back the config register to confirm it stuck.
6. In conversion: assemble bytes in the datasheet's order, sign-extend correctly, apply calibration in wide enough integers (show the worst-case intermediate value), then convert to units. Reject values outside the sensor's physical range.
7. Handle bus failures: a timeout on every transfer, a bounded retry count, I2C bus recovery (up to 9 SCL clocks then a STOP) before re-init, and errors returned to the caller, never a hang or a silent zero.
8. Write a hardware test: a chip-ID probe, a known-condition check (for example room temperature 18-28 C, 1 g on the Z axis at rest), noise over 100 samples, and a fault test by unplugging the sensor while running.
</task>

<constraints>
- Fixed-width types, no dynamic allocation, no blocking waits without a timeout, nothing slow inside interrupt handlers.
- Do not invent HAL function names; if unsure of the exact signature for {{framework}}, say which you assumed.
- Ask for the datasheet values listed in step 1 rather than guessing them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions and gaps
Bullets; each placeholder [X] with the datasheet item that fills it.
## Register map
Table: Address | Name | Access | Reset | Fields used.
## Driver API
The header, with one-line comments per function.
## Driver code
The source file, then the {{framework}} adapter.
## Bus error handling
Bullets: timeouts, retries, recovery and what the caller sees.
## Hardware test
Numbered steps, each with the expected result.
</output_format>
