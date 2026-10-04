---
schema: 1
id: write-firmware-requirements
kind: prompt
title: Write firmware requirements
description: Writes testable firmware requirements from a hardware product brief, covering behaviour, timing and power budgets, fault handling, update and boot, manufacturing test hooks and traceable IDs.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [embedded-engineer, product-manager, qa-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [requirements, traceability, power-budget, firmware-update, fault-handling, manufacturing-test]
pairs_with:
  prompts: [document-firmware-hardware-interface, define-non-functional-requirements, write-acceptance-criteria]
  personas: [embedded-engineer]
args:
  - name: product_brief
    description: The product brief - what the device does, users and environment, hardware (MCU, sensors, radios, battery), connectivity, regulatory targets, cost and battery-life goals, and anything already decided.
    type: text
    required: true
  - name: safety_relevant
    description: Set to true if a firmware failure could cause injury, fire or harm (medical, heating, motor control, vehicles), so safety requirements and a functional-safety process check are included. Leave it out otherwise.
    type: boolean
output_contract:
  format: markdown
  sections: [Scope and assumptions, Requirements, Verification matrix, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Firmware requirements written from a product brief tend to restate marketing goals ("long battery life", "reliable connectivity") that nobody can test, and they leave out the behaviours that cause field returns: what the device does on brown-out, when a sensor fails, when an update is interrupted, or when the clock is wrong after a battery swap. Good requirements are atomic, testable, measurable, traceable to the brief, and say what to do under fault, not only in the normal case. Use "shall" for mandatory requirements, "should" for goals, and give each a unique ID.
</context>

<task>
<product_brief>
{{product_brief}}
</product_brief>

1. Scope: what the firmware is responsible for and what belongs to hardware, the companion app or the cloud. List assumptions you had to make.
2. Write requirements grouped by area, each with an ID (for example FW-PWR-003), the requirement in one sentence with measurable criteria, rationale, source in the brief (or "derived"), priority (must, should, could) and verification method (test, analysis, inspection, demonstration):
   - functional behaviour and modes (off, sleep, active, pairing, fault), with a state list and transitions;
   - timing: response latencies, sampling rates, start-up time, with tolerances;
   - power: current budget per mode, duty cycles, and the resulting battery life calculation with the battery capacity given; low-battery behaviour and thresholds;
   - connectivity: pairing, reconnection, behaviour when offline, data buffering limits;
   - fault handling: brown-out, watchdog reset, sensor or peripheral failure, memory corruption, clock loss; what is logged and what the user sees;
   - boot and update: secure boot if required, update delivery, image verification, A/B or fallback slot, behaviour on interrupted update and on a bad image, version reporting;
   - security: unique device credentials, debug port lockdown in production, storage of secrets;
   - manufacturing and service: test mode entry, self-test, calibration storage, serial and version readout, factory reset;
   - diagnostics: logs, counters and what is reported for field failure analysis.
3. Make every requirement testable: replace adjectives with numbers and conditions; if the brief gives no number, propose one marked "TBC" and add it to Open questions.
{{#safety_relevant}}
4. Safety: identify hazards the firmware could cause or must prevent, state the safe state for each and the maximum time to reach it, independent monitoring where needed, and note that the applicable functional safety standard and its process (for example IEC 61508, ISO 26262 or IEC 60730, depending on the product) must be confirmed by a qualified safety engineer. Do not claim compliance.
{{/safety_relevant}}
Finally, build a verification matrix linking each requirement to a test approach and the brief item it traces to; flag brief items with no requirement.
</task>

<constraints>
- Do not invent hardware parts, battery capacities, currents or regulatory targets; use [X] or TBC and ask.
- One requirement per ID; no "and" joining two testable behaviours.
- Do not state that the product meets any regulation or standard; list which ones to check.
- Keep implementation choices out of requirements unless the brief fixes them (say "shall verify the image signature before booting it", not which library).
</constraints>

<output_format>
## Scope and assumptions
Bullets.
## Requirements
One table per area: ID, requirement, rationale, source, priority, verification.
## Verification matrix
Table: ID, test approach, environment (bench, chamber, field), brief item. Then untraced brief items.
## Open questions
Numbered, each linked to requirement IDs.
</output_format>
