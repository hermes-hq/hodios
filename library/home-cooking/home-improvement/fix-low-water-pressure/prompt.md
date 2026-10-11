---
schema: 1
id: fix-low-water-pressure
kind: prompt
title: Fix low water pressure
description: Diagnoses low water pressure at one tap or the whole house - aerators, part-closed valves, reducing valves, leaks, old pipes and supplier faults - with simple tests and when to call a plumber.
category: home-improvement
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [water-pressure, plumbing, aerator, pressure-reducing-valve, water-leak, stopcock]
pairs_with:
  prompts: [diagnose-home-problem, fix-dripping-tap, cut-household-water-use]
  personas: [home-repair-mentor]
args:
  - name: problem
    description: Where pressure is low (one tap, one bathroom, hot only, cold only, whole house), sudden or gradual, any recent work, and whether neighbours have the same problem.
    type: text
    required: true
  - name: setup
    description: Country, mains water or a private well, house age and pipe type if known, combi boiler or hot water tank, water softener or filter, upstairs or downstairs, and renting or owning. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the pattern suggests, Tests in order, Fixes you can do, Call a plumber or the supplier if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a plumber diagnosing low pressure, and the first question decides almost everything: where is it low? One tap points to that tap: a limescale-blocked aerator or shower head, or a part-closed isolation valve underneath. Hot only points to the hot side: the water heater's outlet or inlet valve, sediment, or in a combi boiler its flow limit or a blocked filter. Whole house, sudden, points to a part-closed main stopcock (often after work was done), a supplier issue (check with neighbours and the supplier's service updates), a failed pressure reducing valve, a large leak, or on a well a pressure switch or pressure tank fault. Whole house, gradual, points to scale or corrosion in old galvanised or iron pipes, a clogged whole-house filter or softener, or a slowly failing reducing valve. Pressure and flow are different: a tap can have pressure but poor flow because of a restriction, so a simple bucket-and-timer flow test and, where possible, a gauge on an outside tap give real numbers to compare. A hidden leak can be checked with the water meter: turn everything off and watch whether it moves.

Problem: {{problem}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Classify the problem (one fixture, hot only, cold only, whole house; sudden or gradual) and list the likely causes for that pattern.
2. Give tests in order: compare with neighbours and check for supplier notices; check the main stopcock and any isolation valves are fully open; unscrew and clean the aerator or shower head (descale by soaking); flow test with a bucket and timer at the kitchen cold tap and note the result; meter test for leaks; check whole-house filters and softener bypass; for a well, look at the pressure gauge on the tank and listen for the pump.
3. For each result, say what it means and the fix the owner can do, or that it needs a plumber.
4. Explain what a pressure reducing valve is, where it is usually found, and that adjusting or replacing it is generally a plumber's job.
5. Say when to call a plumber or the water supplier: the leak test shows a leak, a reducing valve problem, old pipe corrosion, the supply pipe from the street, or a supplier who confirms a network issue.
6. Renters: report to the landlord with the test results.
</task>

<constraints>
- Do not quote typical pressure or flow standards as fact for their area; say the supplier or local regulations define them.
- Do not suggest removing a pressure reducing valve or installing a booster pump without a plumber; pumps can be restricted by suppliers.
- Do not invent prices.
</constraints>

<output_format>
## What the pattern suggests
## Tests in order
Numbered, with what each result means.
## Fixes you can do
## Call a plumber or the supplier if
</output_format>
