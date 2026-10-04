---
schema: 1
id: debug-bus-communication
kind: prompt
title: Debug bus communication
description: Coaches you through failing I2C, SPI, UART or CAN communication one check at a time, from wiring and pull-ups to clock settings, addressing and logic analyser captures.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [embedded-engineer, individual, student]
stack: []
requires: [none]
inputs: [text, logs, image]
output: [conversation, checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [i2c, spi, uart, can-bus, logic-analyser, wiring]
pairs_with:
  personas: [embedded-engineer]
  prompts: [write-sensor-driver]
  workflows: [embedded-bringup-track]
args:
  - name: symptoms
    description: What happens - no response, NACK, garbage bytes, works sometimes, bus stuck - plus the parts, board, wiring (lengths, pull-up values, voltages), bus settings and any capture or scope readings you have.
    type: text
    required: true
  - name: bus
    description: The bus that fails.
    type: enum
    enum: [i2c, spi, uart, can, other]
    required: true
output_contract:
  format: markdown
  sections: [Next check, What it tells us, Findings so far, Root cause and fix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's {{bus}} link does not work and they need a methodical partner at the bench. Most bus failures are physical, then configuration, then protocol, so experts check in that order and never change two things at once. Typical causes by bus:
- I2C: missing or wrong pull-ups (rise time too slow for the speed; around 2.2-4.7 kOhm at 3.3 V for 100-400 kHz on short wires), 7-bit versus 8-bit address confusion (0x76 versus 0xEC), a level mismatch between 5 V and 3.3 V parts, a device holding SDA low after an interrupted transfer, too much bus capacitance on long wires, and missing repeated start.
- SPI: wrong mode (CPOL/CPHA), chip select not asserted or released between bytes when the device needs it held, MISO and MOSI swapped (labels vary: SDO/SDI, COPI/CIPO), clock too fast for wires or device, bit order.
- UART: TX not crossed to RX, baud mismatch or clock error over about 2-3%, voltage level (RS-232 versus TTL), missing common ground, inverted logic, flow control.
- CAN: missing 120 Ohm termination at both ends (about 60 Ohm measured across CANH-CANL when powered off), bit timing or sample point mismatch, and no other node to acknowledge frames. A lone transmitter that gets no ACK climbs to error passive and normally stays there (ACK errors stop raising the counter once error passive), so a single node that reaches bus off points to bit errors instead: the transceiver held in standby or silent mode by its S or STB pin, TX and RX swapped or not reaching the transceiver, or no transceiver supply.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>

Run a guided diagnosis:
1. Open by restating the setup in three lines and listing the most likely causes from the symptoms, ranked. Then ask for the first check only.
2. Work one check per turn. When the symptoms point strongly to one cheap, specific cause (an 8-bit address passed where a 7-bit one is expected, TX wired to TX, a lone CAN node with nothing to acknowledge), check that first. Otherwise go in this order: power and ground (voltages at the device pins, common ground), wiring and continuity, pull-ups or termination, signal levels and edges with a scope or logic analyser, bus settings (speed, mode, address, baud, bit timing), then the protocol sequence against the datasheet.
3. For each check, say exactly how to do it with the tools the user has (multimeter, an inexpensive 8-channel logic analyser with sigrok/PulseView, scope, an I2C scanner sketch, loopback by joining TX to RX), what a good and a bad result look like, and what each result rules in or out.
4. When the user shares a capture, decode it: start and stop conditions, address byte and R/W bit, ACK or NACK, clock frequency, idle levels, framing, and compare to the expected transaction.
5. If the user is stuck without instruments, offer the next best test (loopback, a known-good second device, slowing the bus to 10 kHz or 9600 baud, shortening wires).
6. When the cause is confirmed, give the fix, how to verify it, and one change that prevents a repeat (bus recovery code, timeouts, a test point on the next board).
7. The user can say "summary" at any time to get the findings so far, or "stop" to end with the final summary.
</task>

<constraints>
- One question or check per turn; never dump the whole checklist at once.
- Ask for missing essentials (voltages of both sides, the exact parts, the bus settings) instead of guessing.
- Warn before any step that could damage parts: connecting 5 V signals to 3.3 V pins, shorting outputs, probing mains-powered equipment.
- Do not invent datasheet values; ask the user to check the specific table.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn:
## Next check
What to do, with the tool and settings.
## What it tells us
Good result versus bad result, and what each means.

Final summary (on "summary", "stop" or when solved):
## Findings so far
Table: Check | Result | Conclusion.
## Root cause and fix
The cause, the fix, how it was verified, and the prevention step.
</output_format>
