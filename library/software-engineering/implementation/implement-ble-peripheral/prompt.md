---
schema: 1
id: implement-ble-peripheral
kind: prompt
title: Implement a Bluetooth LE peripheral
description: Implements a Bluetooth Low Energy peripheral with a GATT design, notifications, pairing and bonding choices, MTU and battery-aware connection parameters, plus a phone-side test plan.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [embedded-engineer, mobile-engineer]
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
tags: [bluetooth-le, gatt, iot, wireless, pairing, low-power]
pairs_with:
  personas: [embedded-engineer]
  prompts: [add-low-power-sleep-modes, write-sensor-driver]
args:
  - name: device_purpose
    description: What the device does and what data moves each way - for example "heart-rate strap streaming 1 Hz readings, app sets the alarm threshold". Include battery type, expected users and any phone app you must support.
    type: text
    required: true
  - name: stack_or_sdk
    description: The BLE stack or SDK, for example "Zephyr on nRF52840", "ESP-IDF NimBLE", "STM32WB" or "Silicon Labs Bluetooth SDK".
    type: string
    default: Zephyr Bluetooth host
output_contract:
  format: markdown
  sections: [Assumptions, GATT design, Security, Connection and power, Firmware, Test plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is building a BLE peripheral on {{stack_or_sdk}}. Typical mistakes an experienced BLE engineer avoids: inventing custom 128-bit services when a Bluetooth SIG service fits (Heart Rate, Battery, Device Information, Environmental Sensing); polling with reads instead of notifications; sending notifications before the central has enabled them in the CCCD; assuming a 247-byte MTU when iOS and many Android phones negotiate differently and the default ATT payload is 20 bytes; using "Just Works" pairing on a device that controls something physical; requesting a 7.5 ms connection interval for data that changes once a second, which drains a coin cell in days; and forgetting that phones cache GATT tables, so changing services without the Service Changed characteristic breaks bonded users.
</context>

<task>
<device_purpose>
{{device_purpose}}
</device_purpose>

1. If the data each way, the update rate or the power source is missing, ask for it and stop. Otherwise state assumptions.
2. Design the GATT table: reuse SIG services and characteristics where they fit; for custom ones, generate one random 128-bit base UUID and derive characteristic UUIDs from it, with properties (read, write, write without response, notify, indicate), value format, byte order (little endian) and units. Prefer notify for streams, indicate only where delivery must be confirmed.
3. Choose security from the threat: what an attacker in radio range could read or change. Pick LE Secure Connections with Passkey or Numeric Comparison when there is a display or button, Just Works only for non-sensitive read-only data, and say why. Set per-characteristic permissions (encrypted, authenticated), bonding, and how the user clears bonds.
4. Plan connection and advertising: advertising interval and payload (name, service UUID, under 31 bytes legacy), connection interval, peripheral latency and supervision timeout from the update rate, MTU and data length extension requests, and PHY. Estimate average current for advertising and connected states with stated assumptions.
5. Write the firmware for {{stack_or_sdk}}: service registration, CCCD-aware notifications with back-pressure handling when the stack's buffers are full, write validation (length, range) returning proper ATT errors, connection and disconnection callbacks, advertising restart, and a Service Changed approach for future updates.
6. Write a test plan with a generic BLE scanner app and the companion app: discovery, pairing paths, notifications at the target rate, MTU on at least one iOS and one Android device, reconnection after range loss, bond deletion on either side, and a 24-hour current measurement.
</task>

<constraints>
- Do not use a SIG-assigned 16-bit UUID for a custom purpose, and do not invent assigned numbers; mark any you are unsure of to check against the Bluetooth SIG assigned numbers document.
- Do not invent SDK APIs; name the SDK version assumed.
- Never ship static or hard-coded passkeys for devices that control locks, medical or safety functions; say these need a security review.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.
## GATT design
Table: Service | Characteristic | UUID | Properties | Format and units | Permissions.
## Security
Pairing method, bonding and the reasoning, in under 120 words.
## Connection and power
Table of parameters with values and why, then the current estimate.
## Firmware
Code files with names.
## Test plan
Numbered checks with expected result and which phone.
</output_format>
