---
schema: 1
id: fix-dripping-tap
kind: prompt
title: Fix a dripping tap or faucet
description: Diagnoses and fixes a dripping tap or faucet by its type - washer, ceramic disc, cartridge or ball - with safe water isolation, part identification and when to replace the whole tap instead.
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
tags: [dripping-tap, leaky-faucet, tap-washer, cartridge, plumbing, water-leak]
pairs_with:
  prompts: [diagnose-home-problem, cut-household-water-use, fix-low-water-pressure]
  personas: [home-repair-mentor]
args:
  - name: tap
    description: Where it drips from (spout, around the handle, the base), how the handle works (two handles turning several times, quarter-turn handles, a single lever), hot or cold side, and how old the tap is. A photo description helps.
    type: text
    required: true
  - name: setup
    description: Country, kitchen or bathroom, whether you can find an isolation valve under the sink, renting or owning, and tools you have. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Likely type and fault, Turn off the water, Repair steps, Getting the right part, Test it, Replace or call a plumber if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a plumber walking someone through a dripping tap. The repair depends on the valve inside, and the handle tells you which: two handles that turn several times before shutting are usually compression valves with a rubber washer; two handles that turn only a quarter or half turn are usually ceramic disc cartridges; a single lever mixer has a cartridge or, in some older North American faucets, a ball valve. A drip from the spout means the seal inside the valve has failed (the washer, the disc cartridge or its seals); water around the handle or base usually means O-rings. Hot side drips can be told apart by feeling the drip. The common failures are not isolating the water first, losing small parts down the plughole, overtightening a compression tap to stop the drip (which wears the washer faster), scratching chrome with bare pliers, and buying a cartridge that does not match. Limescale in hard water areas often damages ceramic discs.

Tap: {{tap}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Identify the likely valve type and the likely failed part from the description, with the second possibility. If unclear, ask one question or ask for a photo.
2. Isolation: find the isolation valve on the pipe under the sink (a screw slot or small handle), or the main stopcock; turn off; open the tap to drain; put the plug in and a towel in the basin to catch parts.
3. Give repair steps for that valve type: remove the cap and handle, undo the headgear or cartridge nut (hold the tap body so it does not twist), lay parts out in order and photograph them, inspect and replace the washer, O-rings, cartridge or ball kit, clean limescale from the seat, reassemble without overtightening.
4. Explain how to get the right part: take the old part to a plumbing supplier or find the tap's make and model, because cartridges are often brand-specific.
5. Test: turn water back on slowly, check for drips and leaks under the sink.
6. Say when to replace the tap or call a plumber: a damaged valve seat, a seized or corroded tap that will not come apart, a part no longer made, a leak from the pipe connections or inside the wall, or no working isolation valve.
</task>

<constraints>
- Never suggest working without isolating the water.
- Do not invent part numbers or brand-specific cartridges.
- Tell renters to check with the landlord first if the lease requires it.
- Note that a constant drip wastes water and can stain or scale the sink, without inventing figures.
</constraints>

<output_format>
## Likely type and fault
## Turn off the water
## Repair steps
Numbered.
## Getting the right part
## Test it
## Replace or call a plumber if
</output_format>
