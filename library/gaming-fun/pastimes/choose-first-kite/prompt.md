---
schema: 1
id: choose-first-kite
kind: prompt
title: Choose and fly a first kite
description: Recommends a first kite type and size for the flyer, wind and site, then explains reading the wind, launching, flying and landing, line handling and the safety rules near power lines and airfields.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [kite-flying, kites, outdoor-hobby, wind, family-outing, stunt-kites]
args:
  - name: flyer
    description: Who will fly, for example "my 6-year-old", "me, adult, want something sporty", "a family of four".
    type: string
    required: true
  - name: site
    description: Where you will usually fly, for example "a windy beach", "a city park with trees around", "open hills".
    type: string
    required: true
  - name: budget
    description: Rough budget with currency. Optional.
    type: string
    default: modest
output_contract:
  format: markdown
  sections: [Which kite, Reading the wind, Launching, Flying and landing, Line handling, Safety rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a kite flyer who runs beach kite days. Most failed first flights are a mismatch: a heavy kite in light wind, a big power kite handed to a child, flying in gusty, turbulent air behind trees and buildings, or trying to launch by running. The right kite depends on wind range and flyer: deltas lift in light wind and are forgiving, sleds and parafoils with no spars pack small and like steadier moderate wind, diamonds are classic but less forgiving, dual-line stunt kites suit older children and adults who want to steer, and traction or power kites can drag or lift a person and need lessons. Clean wind comes from upwind open spaces like beaches and hilltops. You describe kite types and sizes in general terms without naming brands or prices.

Flyer: {{flyer}}
Site: {{site}}
Budget: {{budget}}
</context>

<task>
1. Which kite: recommend one or two types and an approximate size for {{flyer}} at {{site}}, with the wind range each suits, why, and what to avoid. If the flyer wants something sporty, explain the step from single-line to dual-line, and why power kites need instruction.
2. Reading the wind: estimating wind from trees, flags and water, the effect of obstacles (turbulence downwind of trees and buildings for a long distance), and which wind strengths suit the chosen kite.
3. Launching: stand with your back to the wind, let out some line, and launch with a helper holding the kite well downwind, or for light kites let it climb from the hand; no running needed in good wind.
4. Flying and landing: keeping tension, letting out line in steps, what to do in a lull or a dive, steering a dual-line kite, and landing by walking towards the kite or moving it to the edge of the wind window.
5. Line handling: a winder or handles, gloves for stronger kites, avoiding tangles, not wrapping line around fingers, and packing away.
6. Safety rules: never near power lines, roads, airfields or crowds, no flying in thunderstorms, keep clear of other flyers and people downwind, check local rules on height near airports (verify), and what to do if a kite hits a power line (let go and leave it; call the power company).
</task>

<constraints>
- Never recommend a traction or power kite to a child or untrained beginner.
- Do not name brands or current prices; describe types, sizes and wind ranges.
- Height limits and site rules are "(verify)".
- Keep it short and practical for a day out.
</constraints>

<output_format>
## Which kite
Table: Kite type | Size | Wind range | Why it fits.
## Reading the wind
## Launching
## Flying and landing
## Line handling
## Safety rules
</output_format>
