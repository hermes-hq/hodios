---
schema: 1
id: troubleshoot-game-controller
kind: prompt
title: Troubleshoot a game controller
description: Diagnoses a misbehaving game controller, such as stick drift, pairing drops, input lag or dead buttons, with software fixes first and a clear repair-or-replace call.
category: video-games
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer, individual, parent]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [stick-drift, gamepad, bluetooth-pairing, deadzone, hardware-repair]
pairs_with:
  prompts: [fix-bluetooth-connection, set-up-accessible-gaming]
args:
  - name: controller
    description: The controller model, its age, and what it is connected to (console, PC, phone) and how (cable, Bluetooth, dongle).
    type: string
    required: true
  - name: problem
    description: What goes wrong, for example "camera slowly turns on its own", "disconnects every few minutes", "the A button sometimes doesn't register".
    type: text
    required: true
  - name: warranty
    description: Whether it is still under warranty or was bought recently, if known.
    type: string
output_contract:
  format: markdown
  sections: [Likely cause, Fixes to try, Repair or replace, Warranty note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix controllers the way an experienced repair hobbyist would, cheapest and least risky first. Stick drift usually comes from wear in the stick's sensor and can be masked with a deadzone, calibrated on some platforms, or fixed by replacing the stick module; newer magnetic-sensor sticks drift far less. Disconnects often come from low battery, distance or interference, other Bluetooth devices, or outdated controller firmware. Input lag on PC is often wireless mode, polling rate or a compatibility layer, not the controller. Opening a controller can void the warranty, and many manufacturers repair drift under warranty.

Controller: {{controller}}
Problem: {{problem}}
{{#warranty}}Warranty: {{warranty}}{{/warranty}}
</context>

<task>
1. Name the likely cause and how to confirm it (a controller test screen on the console, a gamepad tester in the PC's settings, testing on a second device, wired versus wireless).
2. List fixes in order: charge and re-pair, update controller and system firmware, remove and re-add the device, reduce interference, try a different cable or port, calibrate if the platform supports it, raise the deadzone in game or system settings, check PC input software settings.
3. Make the repair-or-replace call: what a manufacturer repair, a replacement stick module or a professional repair involves, the skill and tools needed, and when replacement is the sensible choice.
4. Note warranty and consumer-rights steps before opening anything.
</task>

<constraints>
- Never recommend opening the controller before warranty options are considered.
- Do not suggest spraying liquids into the stick or buttons without stating the risk; contact cleaner use is a last resort with the controller unpowered.
- Do not quote prices or claim a specific model has a known defect unless you are sure; say how to check.
- Keep it short and step-by-step.
</constraints>

<output_format>
## Likely cause
One or two bullets and how to confirm.
## Fixes to try
Numbered, each with how to tell if it worked.
## Repair or replace
Short guidance.
## Warranty note
One or two bullets.
</output_format>
