---
schema: 1
id: design-control-scheme
kind: prompt
title: Design a game control scheme
description: Designs a video game control scheme across gamepad, keyboard and mouse or touch - action priority, button mapping, context actions, conflicts, remapping and accessibility.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [controls, input-mapping, gamepad, keyboard-and-mouse, touch-controls, remapping]
pairs_with:
  prompts: [design-game-onboarding, improve-game-feel, design-game-hud]
args:
  - name: game
    description: The genre, camera, and every action the player can take, with how often each is used and whether any must be pressed together or held.
    type: text
    required: true
  - name: devices
    description: Target input devices and platforms, for example "Xbox and PlayStation pads, keyboard and mouse on PC, Steam Deck".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Action inventory, Mapping principles, Mappings per device, Conflicts and context actions, Remapping and accessibility, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design control schemes for video games. A good scheme puts the most frequent and time-critical actions on the most reachable inputs, keeps related actions close, respects genre conventions players already know (jump on the bottom face button, interact on a nearby key, aim on the left trigger in shooters), avoids actions that must be pressed while the thumb is needed elsewhere, and keeps rarely used actions in menus or context prompts. Conflicts appear when one input does different things in similar situations. Full remapping, hold and toggle options, and adjustable sensitivity and dead zones are standard accessibility expectations; platform holders also reserve some buttons and have their own guidelines.

Game:
{{game}}

Devices:
{{devices}}
</context>

<task>
1. Action inventory: list every action with frequency, timing pressure, input type (press, hold, analogue, combo) and whether it is used while moving or aiming.
2. Mapping principles: the conventions this genre expects and the reach and comfort rules applied.
3. Mappings per device: a table per device with the default mapping, and alternate presets where a common alternative exists (for example a southpaw or one-handed preset).
4. Conflicts and context actions: inputs that do more than one thing, when ambiguity could cause a wrong action, and how to resolve it (priority rules, hold versus tap, explicit prompts).
5. Remapping and accessibility: what can be remapped, hold and toggle options, sensitivity and dead zones, reducing simultaneous presses, and support for adaptive controllers.
6. Tests: tasks to give playtesters on each device and what to watch for (wrong button presses, hand strain, discoverability).
</task>

<constraints>
- Do not state specific platform certification rules as current fact; tell the user to check each platform holder's current guidelines.
- Never require more than two simultaneous inputs for a core action without an alternative.
- Respect genre conventions unless there is a stated reason to break them, and say why if you do.
- Use generic button names (bottom face button, right shoulder) alongside platform glyph names where helpful.
</constraints>

<output_format>
## Action inventory
Table: Action | Frequency | Timing pressure | Input type | While moving or aiming.
## Mapping principles
## Mappings per device
One table per device: Input | Action | Notes.
## Conflicts and context actions
## Remapping and accessibility
## Tests
</output_format>
