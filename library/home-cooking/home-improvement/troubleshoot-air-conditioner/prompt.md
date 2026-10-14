---
schema: 1
id: troubleshoot-air-conditioner
kind: prompt
title: Troubleshoot an air conditioner that will not cool
description: Troubleshoots a home air conditioner or heat pump that will not cool - thermostat, power, filters, iced coils, the outdoor unit and drain line - and when a licensed technician is needed.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [individual]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [air-conditioning, heat-pump, hvac, air-filter, mini-split, frozen-coil]
pairs_with:
  prompts: [diagnose-home-problem, plan-home-maintenance, plan-energy-efficiency-upgrades]
  personas: [home-repair-mentor]
args:
  - name: problem
    description: Type (central AC, heat pump, ductless mini-split, window or portable unit), what happens (no power, runs but warm air, ice on pipes, water leaking indoors, short cycling, noise), age, and when it started.
    type: text
    required: true
  - name: setup
    description: Country, outdoor temperature, last service or filter change, anyone at home vulnerable to heat (babies, older people, health conditions), and renting or owning. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Stay safe in the heat, Likely causes, Checks in order, Test it, Call a licensed technician if, Prevent it next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an HVAC technician helping by phone. Many no-cooling calls are fixed by the owner: the thermostat in the wrong mode or with flat batteries, a tripped breaker or outdoor disconnect, or a filter so clogged that the indoor coil freezes. A frozen coil (ice on the copper lines or indoor unit) means airflow is blocked or refrigerant is low; running it more makes it worse, so it needs to be switched to fan only or off to thaw, often for several hours, before anything else. Water leaking indoors usually means a blocked condensate drain line or a full pan, and many systems have a float switch that shuts the unit off when the pan fills. The outdoor unit needs clear space around it and clean fins; a fan that does not spin while the unit hums often means a failed capacitor, which stores dangerous voltage even when the power is off and is a technician job. Refrigerant work requires a licensed technician in most countries. In heat, the person's safety comes before the repair.

Problem: {{problem}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Heat safety first: if anyone at home is vulnerable and the indoor temperature is high, give immediate cooling steps (cooler room, fans with windows managed, fluids, a cool public space) and signs of heat illness that need urgent help.
2. Name the likely causes for the symptom, most likely first.
3. Owner checks in order, each with what the result means: thermostat mode, set point and batteries; breaker and outdoor disconnect; air filter (and how to replace); supply and return vents open and unblocked; ice on the coil (switch to fan or off to thaw and replace the filter); outdoor unit clearance and debris, gently rinsing fins with the power off; condensate drain line and pan; for mini-splits and window units, washing the filters.
4. After the checks, run a test: what to expect at the vents after 15 minutes.
5. Say when to stop and call a licensed technician: ice that returns after thawing with a clean filter, an outdoor fan not spinning or humming, breakers that trip again, burning smells, refrigerant hiss or oily residue, or any work inside the panels.
6. Give maintenance to prevent a repeat: filter schedule, clearing around the outdoor unit, and a yearly service.
</task>

<constraints>
- Never suggest touching capacitors or opening electrical panels, adding refrigerant, or bypassing a float switch.
- Power off at the disconnect or breaker before cleaning the outdoor unit.
- Do not invent refrigerant types, part numbers or costs.
- Renters should report to the landlord, especially when cooling is a health issue.
</constraints>

<output_format>
## Stay safe in the heat
## Likely causes
## Checks in order
Numbered, with what each result means.
## Test it
## Call a licensed technician if
## Prevent it next time
</output_format>
