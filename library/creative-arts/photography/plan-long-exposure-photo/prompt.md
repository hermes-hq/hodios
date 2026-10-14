---
schema: 1
id: plan-long-exposure-photo
kind: prompt
title: Plan a long exposure photo
description: Plans a long exposure such as silky water, light trails, moving clouds or empty streets, with ND filter maths, exposure time for the effect, tripod technique and fixes for common failures.
category: photography
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, artist]
requires: [none]
inputs: [topic, preferences]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [long-exposure, nd-filters, light-trails, slow-shutter, tripod-technique]
pairs_with:
  prompts: [plan-landscape-photo-trip, choose-camera-settings, plan-astrophotography-night]
  personas: [photography-mentor]
args:
  - name: effect
    description: The effect and scene, for example smooth waterfall in a forest, car light trails on a city bridge, streaky clouds over a pier, removing tourists from a square.
    type: text
    required: true
  - name: gear
    description: Camera, tripod, any ND filters (with strength in stops or ND number) and remote release. A phone is fine.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Exposure time for the effect, Exposure maths, Setup, Step by step, Common failures]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a landscape and city photographer who teaches long exposure. The shutter time is chosen for the effect, not for the light: water goes from frozen to textured at a fraction of a second to silky over a second or two, clouds need tens of seconds to minutes, and light trails need long enough for cars to cross the frame. Exposure is then balanced with ND filters, aperture and ISO. Each stop doubles the time, so a 10-stop filter turns 1/30 s into about 30 s. Most failures are vibration, light leaking through the viewfinder, colour casts from strong filters, focus lost after fitting the filter, and blown highlights in city lights.

Effect: {{effect}}
Gear: {{gear}}
</context>

<task>
1. If the gear has no way to keep the camera still (no tripod or stable surface mentioned), say a stable support is required and ask what they can use; continue only if one is available.
2. Exposure time for the effect: the range of shutter times that gives the effect described, and how changing it changes the look, with a short trial plan (for example 1 s, 4 s, 15 s).
3. Exposure maths: from a normal metered exposure, how to calculate the long exposure with the filters they own, with a worked example in numbers (stops, the doubling, rounding to available shutter speeds, bulb mode beyond 30 s). If they have no filter, what can still be done (dusk or night, lowest ISO, narrow aperture with the diffraction trade-off, phone long-exposure or night modes, stacking several frames).
4. Setup: tripod and stance, turning off stabilisation on a tripod if their system recommends it, remote or self-timer, mirror lock-up or electronic first curtain, covering the viewfinder, manual focus set before the filter goes on, RAW, and fixed white balance.
5. Step by step at the scene: a numbered sequence from composing to the first test shot to the final exposure, including checking the histogram.
6. Common failures and fixes: blur from wind or footsteps, colour cast, vignetting from stacked filters, hot pixels and long-exposure noise reduction, highlights blown by street lights, people as ghosts.
7. Safety: for water and city scenes, footing, tides, traffic and not blocking pavements with tripods.
</task>

<constraints>
- Show the exposure maths with numbers; check that every stated time is consistent with the stops given.
- Keep advice to the gear stated; if a filter strength is not given, ask or give the maths for common strengths as examples.
- Do not name brands unless the user did.
</constraints>

<output_format>
## Exposure time for the effect
## Exposure maths
Worked example with numbers.
## Setup
## Step by step
Numbered.
## Common failures
Table: Problem | Cause | Fix. End with a short safety note.
</output_format>
