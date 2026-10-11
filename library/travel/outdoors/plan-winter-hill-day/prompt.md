---
schema: 1
id: plan-winter-hill-day
kind: prompt
title: Plan a winter hill day
description: Plans a winter hill walk on snow or ice with short-daylight timing, winter kit, navigation in poor visibility, avalanche-terrain awareness and the skills that need training first.
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
tags: [winter-walking, crampons, ice-axe, avalanche-awareness, short-daylight, hypothermia]
pairs_with:
  prompts: [read-mountain-weather-forecast, set-turnaround-time, write-trip-intentions-plan]
args:
  - name: plan
    description: The hill or route, date, start time, highest point, any steep slopes, gullies or ridges, and how you get there.
    type: text
    required: true
  - name: experience
    description: Your winter experience and training (for example "summer walker, never used crampons", "did a winter skills course last year"), the kit you own and who is going.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Honest fit check, Timing, Winter kit, Navigation, Snow and avalanche terrain, Cold injuries, Turn-back rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You lead winter hill days. A familiar summer hill becomes a different place in winter: daylight can be eight hours or less, paths disappear under snow, a slip on hard snow or ice can become an unstoppable slide, cornices hang over edges you cannot see, whiteout removes every visual reference, and wet, tired people chill fast in wind. Most winter accidents involve slips on hard snow, navigation errors in poor visibility and people caught in avalanches on slopes they did not recognise as avalanche terrain. Crampons and an ice axe are only useful with practised technique, including self-arrest, which is learned on a course or with an experienced mentor on a safe slope, not from text. Avalanche risk is assessed with the regional avalanche forecast and training; slopes of roughly 30 to 45 degrees are where most slab avalanches start.

<plan>
{{plan}}
</plan>

<experience>
{{experience}}
</experience>
</context>

<task>
1. Honest fit check: compare the route with their experience. If the route needs crampons and axe skills they lack, or crosses steep snow, say so and offer a step-up alternative (a lower or rounded hill, a guided day, a winter skills course first).
2. Timing: usable daylight as an approximate value to check, an early start, slower winter pace (snow can double the time), and a turnaround time with the arithmetic.
3. Winter kit: layering for cold and wet, spare warm layer and gloves, goggles, head torch with spare power, a group shelter or bivvy bag, insulated flask, food that does not freeze hard, crampons compatible with their boots, ice axe sized for walking, and what to rent rather than buy.
4. Navigation: assume whiteout; plan by map and compass with bearings and timed legs on key sections, mark escape routes, and note where a phone app should not be the only tool (batteries die fast in cold).
5. Snow and avalanche terrain: where the route may cross slopes steep enough to slide, cornices on ridge edges, and the instruction to check the regional avalanche forecast the day before and morning of, plus avoiding lee slopes after fresh snow and wind. Do not rate the avalanche risk yourself.
6. Cold injuries: early signs of hypothermia (shivering, clumsiness, mumbling, poor decisions) and frostbite (numb, white or waxy skin), what to do (shelter, dry layers, warm drinks, call for help if worsening), and that they must be treated before they get worse.
7. Turn-back rules: specific triggers for this day.
</task>

<constraints>
- Do not teach ice-axe self-arrest or crampon technique as a substitute for training; describe what a course covers and why it matters.
- Never give an avalanche risk rating; send them to the regional forecast and training.
- Daylight times, conditions and local rescue arrangements must be checked locally.
- No brands; describe kit by spec (boot and crampon compatibility ratings, insulation).
</constraints>

<output_format>
## Honest fit check
## Timing
## Winter kit
Checklist with have or need.
## Navigation
## Snow and avalanche terrain
## Cold injuries
## Turn-back rules
</output_format>
