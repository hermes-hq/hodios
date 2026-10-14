---
schema: 1
id: choose-wild-camp-spot
kind: prompt
title: Choose a wild camp spot
description: Helps pick and set up a safe, low-impact wild camping pitch, checking access rules, wind, water, dead trees, flood and rockfall risk, then plans tent orientation and a backup site.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [wild-camping, tent-pitch, widowmakers, flood-risk, leave-no-trace, site-selection]
pairs_with:
  prompts: [plan-camping-trip, plan-backcountry-toilet-and-waste, choose-outdoor-gear]
args:
  - name: area
    description: Where you plan to camp (country or region, terrain such as forest, moorland, alpine meadow, beach, desert), the season and the likely overnight weather, especially wind direction and rain.
    type: text
    required: true
  - name: setup
    description: Your shelter (tent type, tarp, hammock, bivvy), group size, and anything you are unsure about.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Is it allowed here, Spot checklist, Pitching for the weather, Low-impact camp, Backup plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people choose a wild camp pitch. The difference between a good and a miserable or dangerous night is mostly the spot. Experienced campers look up (dead branches and leaning trees, called widowmakers, and rockfall), look down (dips that collect cold air and water, dry stream beds that flood, slopes that tip you off your mat), look around (wind exposure, distance from water, animal trails, other people) and leave no trace. Wild camping law varies sharply: it is a right in some countries and regions, needs landowner permission in others, and is banned or limited to set zones or heights in many parks.

<area>
{{area}}
</area>

{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Is it allowed here: say plainly that the rules depend on country, region and land type, give the kinds of rules that exist (open access rights with conditions, permission needed, designated sites only, minimum distance from roads or huts, one night only, fire bans) and tell them where to check for their area. Do not state the local law as fact unless they told you.
2. Spot checklist: above (dead trees and limbs, rockfall, avalanche paths in snow), below (flat, not in a hollow or dry river bed, above the high tide line on beaches, durable surface), around (shelter from the expected wind, distance from water, away from animal trails and the main path), and water (a source nearby but camp a good distance from it, often around 50 to 70 m).
3. Pitching for the weather: point the narrow, low end of the tent into the forecast wind, use all guylines in wind, check the wind may change overnight, avoid cold-air pockets in valley bottoms on clear nights, and keep condensation down with ventilation.
4. Low-impact camp: arrive late and leave early where that is the custom, keep groups small, do not dig trenches or move rocks, cook on a stove rather than a fire unless fires are clearly allowed, pack out all rubbish, and leave the spot as you found it.
5. Backup plan: a second site picked before dark, and what makes you move (rising water, wind shift, a dead tree you missed).
</task>

<constraints>
- Never present wild camping as allowed in a place; say how to check.
- Do not name specific campsites or local rules you were not told about.
- Tune the checklist to their terrain and season instead of listing every hazard everywhere.
</constraints>

<output_format>
## Is it allowed here
## Spot checklist
Checklist grouped by: Above you | Below you | Around you | Water.
## Pitching for the weather
## Low-impact camp
## Backup plan
</output_format>
