---
schema: 1
id: read-mountain-weather-forecast
kind: prompt
title: Read a mountain weather forecast
description: Interprets a mountain or backcountry forecast for a planned route, translating wind at height, freezing level, wind chill, cloud base and storm timing into a go, change or no-go call.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text, image]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mountain-weather, go-no-go, wind-chill, freezing-level, lightning, mountain-safety]
pairs_with:
  prompts: [set-turnaround-time, plan-winter-hill-day, write-trip-intentions-plan]
args:
  - name: forecast
    description: The forecast text or a screenshot, ideally from a mountain-specific source, including wind at summit height, temperatures, freezing level, cloud base, precipitation and timing.
    type: text
    required: true
  - name: plan
    description: Where and when you are going, the highest point and most exposed section (ridge, plateau, summit, open water), the group's experience and kit, and how long you will be out.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the forecast says, What it means on your route, Main hazards and timing, Decision, What to watch for on the day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read forecasts the way an experienced mountain leader does. Valley forecasts mislead: wind usually rises sharply with height and on ridges and cols, temperature usually falls about 5 to 10 °C per 1,000 m of ascent (often taken as about 6.5 °C), less in moist cloudy air and more in dry air, and wind chill at summit level can make a mild day dangerous for someone soaked by rain. Sustained wind around 50 km/h (about 30 mph) makes walking on exposed ground tiring and balance hard, and gusts much above that can knock people over; these are rules of thumb, not thresholds. Freezing level tells you whether rain becomes snow or rime and whether paths may be icy. Cloud base below the high ground means navigating by map and compass in poor visibility. Thunderstorms often build in the afternoon in summer, and lightning is the deciding factor on exposed ridges. The forecast's confidence and timing matter as much as the numbers.

<forecast>
{{forecast}}
</forecast>

<plan>
{{plan}}
</plan>
</context>

<task>
1. Summarise the forecast in plain words for the time and height of the route, noting the source type (mountain-specific or general) and its stated confidence. If it is a general town forecast, say what it leaves out and suggest finding a mountain or backcountry forecast.
2. Translate it to the route: estimated temperature and wind chill at the high point, wind strength and direction on the exposed section, where precipitation may fall as snow or freeze, visibility at the cloud base, and when conditions change. Show the working with stated assumptions.
3. List the main hazards in order of seriousness with their timing window: for example lightning after 1pm, gusts on the ridge all day, rain then a temperature drop at 4pm.
4. Decide: go as planned, go with changes (earlier start, lower route, reversed direction, skip the ridge, an extra layer), or do not go today. Give the reasons that drive the call and what would change it.
5. List what to watch for on the day and the trigger to turn back: building cumulus, a rising wind you cannot stand still in, members getting cold and clumsy, cloud dropping onto the route. Include what to do if caught in a thunderstorm on exposed ground (get off ridges and summits, avoid isolated tall objects and water, spread the group out, do not shelter under a lone tree).
</task>

<constraints>
- Never invent forecast numbers or fill gaps with typical values without labelling them as assumptions.
- Do not give a single "safe" wind speed or temperature; explain the effect on this group with this kit.
- When the forecast is uncertain or contradictory, lean to the cautious option and say why.
- Avalanche conditions need a dedicated avalanche forecast and training; if the route has snow slopes, say so and do not assess avalanche risk from a weather forecast.
- Use the forecast's units and convert where it helps.
</constraints>

<output_format>
## What the forecast says
## What it means on your route
Table: Place or height | Temperature | Wind | Feels like | Visibility | Precipitation.
## Main hazards and timing
## Decision
Go, go with changes, or no-go, in bold, then reasons.
## What to watch for on the day
</output_format>
