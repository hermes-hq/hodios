---
schema: 1
id: plan-tidal-coastal-walk
kind: prompt
title: Plan a tidal coastal walk
description: Plans a coastal walk where tides matter, such as beaches, causeways, sandbanks or cliff-foot routes, with a tide window, cut-off points, escape routes and what to do if caught.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tides, tidal-causeway, coastal-walking, cut-off-risk, quicksand, estuary-sands]
pairs_with:
  prompts: [write-trip-intentions-plan, set-turnaround-time, plan-family-hike]
args:
  - name: walk
    description: The coastline or route (beach, causeway to an island, estuary sands, path along the foot of cliffs), distance, where the tide can cut you off if known, and the date.
    type: text
    required: true
  - name: tide_info
    description: The tide times and heights you found for that date and place, if you have them.
    type: text
    required: false
  - name: group
    description: Who is walking, pace, children or dogs.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [How the tide affects this walk, Tide window, Cut-off points and escapes, Other coastal hazards, If you get cut off, Before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan walks where the sea decides the timetable. People get cut off by the tide far more often than they expect: on flat sands and estuaries the water can come in faster than walking pace and fill channels behind you first, causeways have published safe crossing times that are not optional, and beaches at the foot of cliffs can have no way up. Tides follow a roughly twelve-and-a-half-hour cycle, but times and heights shift each day, spring tides reach further and run faster than neaps, and onshore wind or low pressure can push water higher than the table says. Soft mud and quicksand are common in estuaries. Experienced walkers plan around falling or low tide, know the last safe time for every cut-off point, have an escape route, and leave plenty of margin.

<walk>
{{walk}}
</walk>

{{#tide_info}}Tide times given: {{tide_info}}{{/tide_info}}

{{#group}}Group: {{group}}{{/group}}
</context>

<task>
1. How the tide affects this walk: explain which parts are tidal and why, including spring versus neap tides and the effect of wind and pressure.
2. Tide window: using only the tide times they gave, set a start on a falling tide, the time each cut-off point must be passed, and a finish with margin. If they gave no tide times, do not invent them; explain how to read a local tide table and what to calculate, and for causeways tell them to use the published safe crossing times.
3. Cut-off points and escapes: list the points where the sea meets cliffs or channels, the escape route at each, and the rule to turn back at the last safe time even if close to the end.
4. Other coastal hazards: soft mud and quicksand in estuaries and how to avoid and escape them, rockfall at cliff bases (stay away from the foot), slippery weed-covered rocks, large waves on exposed coasts, and fog on sands.
5. If you get cut off: do not try to wade or swim through incoming water, get as high as possible, call the coastal emergency service (in many countries via the emergency number asking for the coastguard), use a whistle or light, and stay together.
6. Before you go: tide table checked for that day and place, forecast, phone charged and in a waterproof bag, someone told your route and return time, and footwear for wet sand and rock.
</task>

<constraints>
- Never invent tide times, heights or causeway crossing times.
- Tell them to use the official tide table for the nearest station and any local signs, as times differ along a coast.
- For groups with children or dogs, add a wider margin and a dog-on-lead rule near cliffs and soft mud.
</constraints>

<output_format>
## How the tide affects this walk
## Tide window
Table: Point | Safe to pass from | Must be past by.
## Cut-off points and escapes
## Other coastal hazards
## If you get cut off
Numbered steps.
## Before you go
Checklist.
</output_format>
