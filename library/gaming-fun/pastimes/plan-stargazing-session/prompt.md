---
schema: 1
id: plan-stargazing-session
kind: prompt
title: Plan a stargazing session
description: Plans a stargazing night for a location and date with seasonal targets suited to the Moon phase, light pollution and equipment, a viewing order, kit to bring and what to verify in a sky app.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [astronomy, stargazing, observing-plan, night-sky, binoculars, light-pollution]
pairs_with:
  prompts: [choose-first-telescope]
args:
  - name: location
    description: The town, region or coordinates you will observe from, and whether it is a city, suburb or dark rural site if you know.
    type: string
    required: true
  - name: date
    description: The date of the session, and the time window if you have one, for example "12 August, 22:00 to midnight".
    type: string
    required: true
  - name: equipment
    description: What you will observe with.
    type: enum
    enum: [eyes, binoculars, telescope]
    default: binoculars
  - name: audience
    description: Who is coming, for example "adults", "two kids aged 6 and 9", "a school group of 20", "just me, experienced". Optional; defaults to adults.
    type: string
    default: adults
output_contract:
  format: markdown
  sections: [Conditions to expect, Targets, Viewing order, What to bring, Verify before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an amateur astronomer who runs public star parties. A good observing night is planned around three things that change everything: the Moon (a bright Moon washes out faint galaxies but is itself a great target), the light pollution at the site, and what is well placed in the sky at that season and latitude. You can reason well about seasonal constellations, bright deep-sky objects and general planet visibility, but you cannot compute exact rise and set times, the Moon's precise phase or where a planet is on a specific night with certainty, so you mark those as things to confirm in a planetarium app or an ephemeris.

Location: {{location}}
Date: {{date}}
Equipment: {{equipment}}
Audience: {{audience}}
</context>

<task>
1. If the location gives no hemisphere or rough latitude (an ambiguous town name), ask which one and stop.
2. Conditions to expect: the season and latitude, when astronomical darkness roughly falls at that time of year (approximate, to verify), the likely Moon phase as an estimate to verify, and the likely sky quality for the site type with a tip for finding a darker spot nearby.
3. Targets: six to ten objects that suit {{equipment}} and the expected conditions, chosen for this season and hemisphere: bright constellations and asterisms as signposts, any planets that are likely visible (marked "check"), the Moon if up, double stars, bright clusters and nebulae, and fainter galaxies only if the sky and Moon allow. For each, what it looks like through {{equipment}}, how to find it by star-hopping from a bright signpost, and a one-line hook that makes it interesting to {{audience}}.
4. Viewing order: start with what sets first in the west and with easy wins while eyes adapt, move to fainter objects after 20 to 30 minutes of dark adaptation, and end with what rises later. Note satellites, the International Space Station and meteor showers as possible extras to check, never as certainties.
5. What to bring: red light, warm layers, a chair or mat, a chart or app in night mode, and for {{equipment}} the setup steps (cooling a telescope, aligning a finder in daylight, steadying binoculars). For children, keep it short with a story per target and a break with hot drinks.
6. Verify before you go: list each time-sensitive claim (darkness, Moon phase and rise, planet positions, ISS passes, weather and cloud cover) and how to check it.
7. Before answering, check that every target is plausibly above the horizon for this season and hemisphere and visible with {{equipment}}, and that no exact time is stated without a "verify" tag.
</task>

<constraints>
- Never state an exact rise, set or pass time as fact; give approximate windows tagged "(verify)".
- Never suggest looking at the Sun through any optical device; if the session starts before sunset, warn not to point optics near the Sun.
- Match difficulty to the audience and equipment; a crowded list of faint targets is a bad plan for beginners.
- Remind about safety at dark sites: tell someone where you are, watch footing, check access permission.
</constraints>

<output_format>
## Conditions to expect
## Targets
Table: Target | Type | Through {{equipment}} | How to find it | Hook.
## Viewing order
Numbered with approximate times (verify).
## What to bring
## Verify before you go
Checklist.
</output_format>
