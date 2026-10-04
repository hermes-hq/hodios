---
schema: 1
id: implement-firmware-bootloader
kind: prompt
title: Implement a firmware bootloader
description: Implements or configures a microcontroller bootloader with a flash layout, verified image header, safe jump to the application, field updates and recovery from an interrupted update.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [embedded-engineer]
stack: [c]
requires: [none]
inputs: [text, spec]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [bootloader, firmware-update, ota, flash-layout, secure-boot, rollback]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-microcontroller-firmware]
  workflows: [embedded-bringup-track]
args:
  - name: mcu
    description: The exact microcontroller with flash size, page or sector sizes and any dual-bank support, for example "STM32F407VG, 1 MB flash, 16/64/128 KB sectors".
    type: string
    required: true
  - name: update_channel
    description: How new firmware arrives - UART, USB DFU, BLE, Wi-Fi, LoRa, CAN or an SD card - and who triggers it.
    type: string
    required: true
  - name: requirements
    description: Anything else - image signing needed or not, existing bootloader you could use (MCUboot, vendor ROM bootloader), external flash, fleet size, anti-rollback, maximum bootloader size.
    type: text
    default: none given
output_contract:
  format: markdown
  sections: [Build or reuse, Memory layout, Image format, Boot flow, Update and recovery, Code, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs a bootloader for {{mcu}} with updates over {{update_channel}}. A bootloader is the one piece of firmware that cannot fail: a bug in it bricks devices in the field. Experts first ask whether to reuse a proven one (MCUboot, the vendor's ROM or secure bootloader, an SDK DFU) before writing one. The usual failures: erasing the running application before the new image is fully received and verified; no power-loss safety, so a reset mid-write leaves nothing bootable; jumping to the application without resetting peripherals, interrupts and the vector table, so the app crashes on the first interrupt; trusting a CRC as authentication; flash writes that ignore sector sizes and erase granularity; and no way to recover except a debugger.
</context>

<task>
<requirements>
{{requirements}}
</requirements>

1. Recommend build or reuse with reasons (size, signing support, the update channel, licence, team skills). If a proven bootloader fits, configure it and only write the glue; still answer every section below for that choice.
2. Lay out flash from the real sector map: bootloader, slot A (and slot B or a staging area), a small metadata or swap-status area, and configuration storage that updates do not wipe. If sector sizes or flash size are missing, ask.
3. Define the image header: magic, header version, image size, load address, firmware version (semantic or monotonic counter), hash (SHA-256) and, when devices are in the field or the channel is wireless, a signature (Ed25519 or ECDSA P-256) with the public key in the bootloader. Explain why CRC alone only detects accidents.
4. Write the boot flow: check for an update request or a pending image, verify size, hash and signature before booting anything, choose the slot, then jump: disable interrupts, de-initialise clocks and peripherals the bootloader used, clear pending interrupts, set the vector table offset, load the stack pointer and branch to the reset handler.
5. Design the update path over {{update_channel}}: framing with sequence numbers and per-chunk CRC, writing only to the inactive slot, resuming after a dropped link, and marking the image pending, never active, until verified.
6. Design recovery: A/B swap or copy with a swap-status record that survives power loss at any write, a trial boot where the application confirms it is healthy (or the watchdog triggers rollback after N failed boots), anti-rollback via a version counter if required, and a last-resort path such as a held button or the ROM bootloader.
7. Write the code for the parts you build, with timeouts on every receive and the flash operations aligned to the erase and write granularity.
8. Write a test plan including power cut at each phase (receiving, writing, swapping, first boot), corrupted image, wrong signature, older version, and a full slot.
</task>

<constraints>
- Never erase or overwrite the only bootable image before a verified replacement exists.
- Keep private signing keys out of the firmware and the repository; say where they belong (an HSM or offline signing machine).
- Do not invent register names or vendor API calls; state the SDK version assumed and mark unknowns [X].
- Warn before any step that sets read-out protection, option bytes or fuses, since some settings cannot be undone.
{{> output/uncertainty}}
</constraints>

<output_format>
## Build or reuse
The recommendation in under 100 words.
## Memory layout
Table: Region | Start | Size | Sectors | Purpose.
## Image format
Header struct with field sizes, and how the image is built and signed.
## Boot flow
Numbered steps or a flow list.
## Update and recovery
Bullets for the update protocol, then each power-loss point and what happens.
## Code
Files with names.
## Test plan
Table: Test | How | Expected result.
</output_format>
