---
schema: 1
id: add-low-power-sleep-modes
kind: prompt
title: Add low-power sleep modes
description: Adds sleep modes to battery firmware, gating clocks and peripherals, choosing wake sources and state retention, and backs the change with a current measurement plan and battery-life budget.
category: implementation
version: 1.0.0
status: incubating
stage: [build, verify]
role: [embedded-engineer]
stack: [c]
requires: [none]
inputs: [file, text]
output: [diff, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [low-power, sleep-modes, battery-life, power-budget, rtc, wake-sources]
pairs_with:
  personas: [embedded-engineer]
  prompts: [implement-ble-peripheral]
  workflows: [embedded-bringup-track]
args:
  - name: firmware_code
    description: The main loop or task code, clock and peripheral init, and the code for each peripheral that is active. Note what the device does over time, for example "samples every 30 s, sends over LoRa every 15 min".
    type: text
    required: true
  - name: mcu
    description: The exact microcontroller and board, for example "STM32L071 on a custom board" or "nRF52840 on a Feather", plus regulators and anything else on the power rail.
    type: string
    required: true
  - name: battery
    description: The battery and the target life, for example "2x AA alkaline, 2 years" or "CR2032, 1 year".
    type: string
    default: not given - the budget will show life per 1000 mAh
output_contract:
  format: markdown
  sections: [Current power profile, Sleep design, Code changes, Measurement plan, Power budget, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants their firmware on {{mcu}} to sleep. Battery target: {{battery}}. Experienced low-power engineers know the sleep current in the datasheet headline is rarely what the board achieves: floating GPIOs, pull-ups fighting external dividers, a debugger left attached (it keeps debug power domains on), an always-on LDO with high quiescent current, an LED, or a sensor never put into its own power-down mode can each cost more than the MCU. They also know the duty cycle decides battery life: a device that wakes for 50 ms at 8 mA every second averages 400 uA, so shortening the awake time often beats a deeper sleep mode. Deep modes lose RAM or peripheral state, add wake-up latency, and can miss interrupts if wake sources are configured after entering sleep.
</context>

<task>
<firmware_code>
{{firmware_code}}
</firmware_code>

1. Profile the current behaviour: list each state (active, waiting, transmitting, idle) with estimated current and duration per cycle, and mark busy-waits, `delay()` loops and polling that keep the core awake.
2. Pick the deepest sleep mode that still meets the requirements. For each candidate mode on {{mcu}} say what keeps running (RTC, low-speed oscillator, retained RAM, GPIO wake), wake-up time and what must be re-initialised. Cite the reference-manual mode names; mark values to confirm as [check datasheet].
3. Design wake sources: RTC alarm or low-power timer for periodic work, GPIO edge for buttons and sensor data-ready lines, and the radio or UART wake if needed. Configure and clear pending flags before entering sleep to avoid an instant wake or a missed event.
4. Decide state retention: what stays in retained RAM or backup registers, what is rebuilt, and a magic number or CRC so a cold boot is told apart from a wake.
5. Write the code changes as a diff: an idle hook or main-loop sleep entry, peripheral and clock gating before sleep and restore after, every unused pin set to analog or a defined level, external sensors and radios commanded to their own sleep, and debug output kept off the sleep path.
6. Plan the measurement: a current meter or power profiler with enough dynamic range (sub-uA to tens of mA), debugger disconnected, measured at the battery, averaged over at least one full duty cycle; check each rail by removing jumpers or loads one at a time.
7. Build the power budget and the battery life, derating capacity by 20-30% for temperature, self-discharge and cut-off voltage.
</task>

<constraints>
- Do not quote sleep currents or wake times as fact; label them as datasheet figures to confirm and separate estimates from measurements.
- Keep behaviour the same: list any timing, responsiveness or data-loss change sleep introduces.
- Ask for the board's schematic details if regulator or pull-up choices decide the result.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current power profile
Table: State | Current | Duration per cycle | Notes.
## Sleep design
Chosen mode, wake sources, retained state and re-init list, in bullets.
## Code changes
Unified diff, then a short note per hunk.
## Measurement plan
Numbered steps with the instrument settings and the expected reading.
## Power budget
Table: State | Current | Time per cycle | Charge per cycle; then average current and battery life with the derating shown.
## Risks
Bullets: missed wakes, latency, brown-out, debug access after sleep.
</output_format>
