---
schema: 1
id: plan-for-lightning-on-trail
kind: prompt
title: Plan for lightning on a hike
description: Plans a hike or climb around thunderstorm risk, with storm timing, exposed sections to clear early, safer spots, what to do when caught out and first aid for a strike.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [lightning, thunderstorms, exposed-ridges, afternoon-storms, storm-safety, mountain-safety]
pairs_with:
  prompts: [read-mountain-weather-forecast, set-turnaround-time, build-outdoor-first-aid-kit]
args:
  - name: route
    description: The route, date, start time, the highest and most exposed parts (ridges, summits, open plateaus, via ferrata cables, open water) and where shelter or lower ground is.
    type: text
    required: true
  - name: forecast
    description: What the forecast says about storms or convection, in your own words, and the typical pattern there if you know it (for example "afternoon storms most summer days").
    type: text
    required: false
  - name: group
    description: Who is going, pace, and any children or slower walkers.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Storm pattern for this trip, Exposed sections, Timing plan, Warning signs, If a storm catches you, If someone is struck, "Go, change or cancel"]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help hikers and climbers avoid being high and exposed when a thunderstorm arrives. In many mountain ranges summer storms build in the afternoon after a clear morning, so the main defence is timing: start early and be off summits, ridges and open ground before storms usually form. There is no safe place outdoors in a thunderstorm; the aim is to reduce risk. Peaks, ridges, isolated trees, open meadows, metal cables and water are the worst places; dense forest of similar-height trees, lower ground and valleys are less bad. Lightning can strike well ahead of the rain, so "if you hear thunder, you are within striking distance" is the working rule, and the flash-to-bang count tells you whether a storm is approaching. Lightning victims carry no charge and can be touched straight away; cardiac arrest is the main cause of death, and prompt CPR saves lives.

<route>
{{route}}
</route>

{{#forecast}}Forecast as given: {{forecast}}{{/forecast}}

{{#group}}Group: {{group}}{{/group}}
</context>

<task>
1. Storm pattern for this trip: from the forecast they gave, state what it says about convection and timing. If they gave no forecast, say which forecast details to look for (thunderstorm or convective risk, timing, freezing level and cloud build-up) and do not invent the weather.
2. Exposed sections: list each part of the route that is high, open, near metal or water, with a time to be off it and a lower or sheltered alternative.
3. Timing plan: work back from the likely storm time to a start time, add a margin for this group, and set a turnaround rule tied to the exposed sections, not only to the summit.
4. Warning signs: building towering clouds, darkening bases, distant thunder, static (buzzing, hair standing up), rising wind and sudden temperature drops, and what each means for the next 30 minutes. Explain flash-to-bang counting and the habit of waiting about 30 minutes after the last thunder before going back up.
5. If a storm catches you: get off peaks and ridges now, avoid isolated trees, cables and water, move away from metal gear, spread a group out so one strike does not hit everyone, and if there is no lower ground, crouch on an insulating pad with feet together and do not lie flat. Say that a car or a solid building is far safer than a tent or open shelter.
6. If someone is struck: it is safe to touch them; call emergency services; check breathing and start CPR if they are not breathing normally; treat for burns and cold; when several people are hit, help those who look lifeless first because they may be saved with CPR.
7. Go, change or cancel: a short decision rule for the morning, with a lower or shorter alternative route.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present any outdoor position as safe in a thunderstorm; only safer or less safe.
- Do not state the actual forecast or storm timing as fact; work from what they gave and tell them to check the latest local forecast before leaving.
- Do not recommend lightning myths such as sheltering under a lone tree, lying flat, or removing all metal as a substitute for getting down.
- Tell them to learn CPR on a course; written steps are a reminder, not training. Emergency numbers vary by country; say to check the local one.
</constraints>

<output_format>
## Storm pattern for this trip
## Exposed sections
Table: Section | Why exposed | Be off it by | Lower option.
## Timing plan
## Warning signs
## If a storm catches you
Numbered steps.
## If someone is struck
## Go, change or cancel
</output_format>
