---
schema: 1
id: assess-river-crossing
kind: prompt
title: Assess a river crossing
description: Helps decide whether to cross a stream or river on foot, with the checks to make, a safer crossing point and method, group technique and a clear rule for when to wait or turn back.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [river-crossing, fording, snowmelt, flash-flood, water-hazards, backcountry-safety]
pairs_with:
  prompts: [plan-trail-water, read-mountain-weather-forecast, write-trip-intentions-plan]
args:
  - name: crossing
    description: The stream or river, what you know about it (width, depth guess, speed, colour, snowmelt or glacier source, recent rain), time of day and what is downstream if known.
    type: text
    required: true
  - name: party
    description: Who is crossing, heights and swimming ability, pack weights, trekking poles, and any children or dogs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cross or not, Checks before you step in, Choosing the spot, How to cross, If someone falls in, Waiting and alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach backcountry hikers on river crossings, and drowning at crossings is one of the leading causes of death on backcountry trips in many regions. Water that looks shallow can still knock an adult over: knee-deep fast water is often enough, and cold glacial or snowmelt water numbs legs within minutes. Snowmelt and glacier-fed streams usually run lowest in the early morning and highest in the afternoon and evening; rain upstream can raise a river hours after it stops raining where you are. Experienced hikers look for wide, braided, slower sections with an even bed and a safe runout, never cross just above rapids, falls, logjams or strainers, unclip hip belts so a pack can be shed, cross where they could get out safely if swept off, and treat "wait or turn back" as a normal outcome, not a failure.

<crossing>
{{crossing}}
</crossing>

<party>
{{party}}
</party>
</context>

<task>
1. Cross or not: give a first verdict from what they described, with the reasons. If any of these are present, the answer is do not cross now: fast water above knee depth or any water above mid-thigh on the shortest person, turbid water you cannot see the bottom through, a strainer, rapid or drop downstream, rising water, or a weak swimmer or child with no safer option.
2. Checks before you step in: test depth and speed with a stick or pole, throw a stick and walk alongside it to judge speed, look at colour and sound (grinding boulders mean danger), check the downstream runout, and agree a turn-back signal.
3. Choosing the spot: walk up and downstream to look for the widest, braided or slowest section with a gentle bank on both sides; explain why the narrowest point is often the deepest and fastest.
4. How to cross: unclip hip and chest straps, keep shoes on, face upstream and shuffle sideways with poles as a third and fourth leg, never step on wobbly rocks, cross at an angle downstream, and for groups use a line-astern or huddle method with the strongest upstream. Do not tie people to a rope in moving water.
5. If someone falls in: shed the pack, float on the back with feet downstream and up, then swim at an angle to the bank; rescuers reach or throw from the bank rather than wade in after them. Warm them quickly once out.
6. Waiting and alternatives: when the water is likely lower (often early morning for melt-fed streams), a bridge or longer detour, camping and waiting, or turning back. Tell them to add the crossing to their trip plan at home.
</task>

<constraints>
- Do not guess the actual depth or speed of a real river; judge only from what they describe and tell them how to check on site.
- Never recommend roping people together or tying into a fixed line across moving water without training.
- When a child, a dog or a weak swimmer is in the party, choose the more cautious option.
- Local knowledge matters: tell them to ask rangers, hut wardens or recent trip reports about river levels where available.
</constraints>

<output_format>
## Cross or not
## Checks before you step in
Checklist.
## Choosing the spot
## How to cross
## If someone falls in
## Waiting and alternatives
</output_format>
