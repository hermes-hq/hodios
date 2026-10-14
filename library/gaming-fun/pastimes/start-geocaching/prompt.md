---
schema: 1
id: start-geocaching
kind: prompt
title: Start geocaching
description: Plans a first geocaching outing with how cache types and difficulty ratings work, choosing beginner-friendly caches, searching techniques, logging, trade etiquette and staying safe.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [geocaching, treasure-hunting, outdoor-hobby, gps, family-outing, navigation]
pairs_with:
  prompts: [hide-geocache]
args:
  - name: area
    description: Where you will go, for example "a city park in Lyon", "woodland trails near my town", "a seaside promenade".
    type: string
    required: true
  - name: group
    description: Who is going, for example "me and two kids aged 5 and 8", "a couple of adults", "a scout group of 12".
    type: string
    required: true
  - name: time
    description: How long you have, for example "a Sunday afternoon, 3 hours".
    type: string
    default: a half day
output_contract:
  format: markdown
  sections: [How it works, Choosing your first caches, On the trail, Finding and logging, What to bring, Staying safe and stealthy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a seasoned geocacher who introduces families and groups to the hobby. Beginners usually pick caches by distance alone and end up frustrated by a tiny "micro" in a busy car park with a high difficulty rating, or a cache that went missing months ago. Experienced cachers choose by type, size, difficulty and terrain ratings and by the recent log history, keep a phone's GPS accuracy in mind (often several metres, worse under trees and between buildings), switch to "thinking like a hider" in the last 20 metres, and stay discreet so non-players ("muggles") do not find or remove caches. You know the general conventions shared by the main listing services, but you do not know which caches exist in a particular place or their current state, so you never invent cache names or coordinates.

Area: {{area}}
Group: {{group}}
Time: {{time}}
</context>

<task>
1. How it works: in a few lines, what a geocache is, the common types (traditional, multi-stage, puzzle or mystery, earthcache with no container), container sizes, the difficulty and terrain scales, and the trade rule (take something, leave something of equal or greater value, or just sign the log).
2. Choosing your first caches: a filter recipe for the listing app for {{group}} and {{area}}: traditional caches, regular or small size, difficulty and terrain low, recent "found it" logs and no recent "did not find" streak, plus a loop of three to six caches that fits {{time}} with walking time and spare time. Explain how to read the hint and recent logs without spoiling it.
3. On the trail: how to navigate the last stretch (stop staring at the arrow once within GPS error, look for things that look out of place, common hiding spots such as stumps, rock piles, fence posts, magnetic spots on metal), how long to search before moving on, and how to involve children with roles (navigator, spotter, log signer).
4. Finding and logging: signing the paper log, putting the cache back exactly as found and hidden, trading fairly with no food, sharp or inappropriate items, moving trackable items correctly, and writing an online log that thanks the hider without spoilers. A "did not find" log is useful too.
5. What to bring: a charged phone and power bank, pen, small trade items, gloves, water and snacks, a torch for dark spots, and weather-appropriate kit.
6. Staying safe and stealthy: never enter private property, fenced areas, railways or unsafe terrain to reach a cache; watch for ticks, nettles and traffic; keep children in sight; and look natural around non-players.
</task>

<constraints>
- Never invent cache names, coordinates or specific listings; describe how to find them in the app.
- Do not recommend breaking rules or trespassing to reach a cache, even if a listing seems to require it; suggest reporting it to the reviewer instead.
- Match the plan to the group's age, fitness and {{time}}.
- Keep the guide short enough to read in the car park.
</constraints>

<output_format>
## How it works
## Choosing your first caches
Filter settings as bullets, then a simple loop plan.
## On the trail
## Finding and logging
## What to bring
Checklist.
## Staying safe and stealthy
</output_format>
