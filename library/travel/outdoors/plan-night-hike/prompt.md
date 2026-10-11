---
schema: 1
id: plan-night-hike
kind: prompt
title: Plan a night hike
description: Plans a hike in the dark on a familiar or easy route, covering route choice, lighting, moon and sunset times, pace, navigation, group rules and what changes for wildlife and cold.
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
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [night-hiking, head-torch, moonlight, sunrise-hike, navigation-at-night, stargazing]
pairs_with:
  prompts: [prepare-for-getting-lost, write-trip-intentions-plan, set-turnaround-time]
args:
  - name: plan
    description: The route or area, distance and climb, why you are going at night (sunrise summit, stars, full moon, finishing a long day), the date and planned start time.
    type: text
    required: true
  - name: group
    description: Who is going, whether anyone has walked the route in daylight, ages and night experience.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Route check, Light and timing, Lighting kit, Moving in the dark, Group rules, Night-specific risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You lead night walks. A route that is easy by day feels twice as long in the dark: pace often drops by a third or more, junctions disappear, distances are misjudged and cold arrives quickly once the sun goes. Experienced night walkers choose a route they know in daylight, with a clear path and no exposed edges, check sunset, moonrise and moon phase, carry a main head torch with spare power plus a backup light, use red light to keep night vision, and keep the group tight with a set leader and back marker. Animals are more active at dusk and night, and some land has access rules after dark.

<plan>
{{plan}}
</plan>

<group>
{{group}}
</group>
</context>

<task>
1. Route check: judge whether the route suits darkness. Flag cliff edges, scrambles, river crossings, faint paths and complex junctions, and suggest a simpler route or doing it in daylight first. Note any access rules after dark to check.
2. Light and timing: tell them to check sunset, civil twilight, moonrise and moon phase for the date, explain how a full or near-full moon helps and a new moon does not, and work out a start and finish with slower night pace. For a sunrise summit, work back from sunrise with a margin.
3. Lighting kit: a head torch per person with a known run time, spare batteries or charge, a backup light, red-light mode, reflective strip or light for the back marker, phone not used as the main light.
4. Moving in the dark: slower steps, eyes adjusting for 20 to 30 minutes, handrailing features, checking the map at every junction, counting time between known points, and stopping rather than guessing.
5. Group rules: leader and back marker, regular headcounts, no one walks alone ahead, agreed calls or whistle signals, and what to do if lights get separated.
6. Night-specific risks: cold and wind after sunset (extra layer, hat, gloves), tiredness, wildlife and livestock, roads at the start and end, and phone signal; include a trip plan left with someone at home.
</task>

<constraints>
- Do not state sunset, moon or weather times as fact; tell them where to check.
- Recommend a route walked in daylight first for anyone new to night hiking.
- If children are in the group, shorten the route and add a meeting-point rule.
</constraints>

<output_format>
## Route check
## Light and timing
## Lighting kit
Checklist.
## Moving in the dark
## Group rules
## Night-specific risks
</output_format>
