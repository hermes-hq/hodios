---
schema: 1
id: plan-backcountry-toilet-and-waste
kind: prompt
title: Plan toilet and waste on a trip
description: Plans how to deal with toilet needs, periods, rubbish and grey water on a hike or camping trip, by terrain and local rules, with a kit list and a short briefing for the group.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [leave-no-trace, catholes, pack-it-out, periods-outdoors, grey-water, outdoor-hygiene]
pairs_with:
  prompts: [plan-camping-trip, choose-wild-camp-spot, plan-trail-water]
args:
  - name: trip
    description: Where and for how long (terrain such as forest, alpine, desert, river corridor, snow or beach, and the country or park), how many people, and whether there are toilets or huts on the way.
    type: text
    required: true
  - name: needs
    description: Anything specific, such as periods, children in nappies or toilet training, a medical condition, or a group that is shy about it.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Rules to check, Toilet method for this terrain, Periods and personal care, Rubbish and food waste, Washing and grey water, Kit, Group briefing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach practical, unembarrassed outdoor hygiene. Human waste near water is a real source of illness for later walkers, and toilet paper and wipes left under rocks are among the most visible damage on popular trails. The standard practice in many places is a cathole about 15 to 20 cm deep in organic soil, well away from water, camps and trails (often given as about 60 m or 200 feet), with paper packed out or buried only where rules allow. In deserts, high alpine terrain, snow, narrow canyons and river corridors, and in many busy parks, waste has to be packed out in a bag system. Menstrual products and wipes are always packed out. Hand hygiene matters more than people think on group trips.

<trip>
{{trip}}
</trip>

{{#needs}}Specific needs: {{needs}}{{/needs}}
</context>

<task>
1. Rules to check: say that rules vary by park and country (some require waste bags, some ban burying paper, river trips often require a portable toilet) and tell them where to check.
2. Toilet method for this terrain: give the right method for their terrain, including distances from water, trails and camp, how to dig and cover a cathole, and when pack-out bags are needed instead. Cover urinating away from water and on durable surfaces where that matters.
3. Periods and personal care: practical options (cup, pads or tampons, period underwear), how to pack used items out in an opaque double bag, hand cleaning, and cleaning a cup with treated water. Keep the tone matter-of-fact.
4. Rubbish and food waste: pack it in, pack it out, including fruit peel and food scraps, and how to keep the rubbish bag from smelling or attracting animals.
5. Washing and grey water: washing people and dishes away from water sources, minimal or no soap, straining food bits and scattering grey water widely.
6. Kit: trowel, toilet paper in a bag, pack-out bags where needed, hand sanitiser, opaque bags, small wash kit.
7. Group briefing: a short, light-hearted but clear briefing that a leader could read out at the start.
</task>

<constraints>
- Do not state park-specific rules as fact; tell them to check.
- Plain, non-squeamish language; no jokes that would embarrass a participant.
- If children in nappies are mentioned, include packing out nappies and changing hygiene.
</constraints>

<output_format>
## Rules to check
## Toilet method for this terrain
## Periods and personal care
## Rubbish and food waste
## Washing and grey water
## Kit
Checklist.
## Group briefing
Five or six plain sentences to read out.
</output_format>
