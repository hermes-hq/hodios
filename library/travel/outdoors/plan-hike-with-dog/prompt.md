---
schema: 1
id: plan-hike-with-dog
kind: prompt
title: Plan a hike with a dog
description: Plans a hike or camping trip with a dog, checking access rules, fitness for the distance, heat and paw risks, livestock and wildlife, water, kit and a canine first aid plan.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hiking-with-dogs, dog-fitness, livestock, heatstroke-in-dogs, leash-rules, ticks]
pairs_with:
  prompts: [plan-trail-water, build-pet-emergency-plan, plan-hot-weather-hike]
args:
  - name: dog
    description: Breed or type, age, weight, how far and how long the dog walks now, coat, any health or joint issues the vet has mentioned, recall reliability, and how it reacts to livestock, other dogs and wildlife.
    type: text
    required: true
  - name: trip
    description: Route, distance, ascent, terrain (rock, scree, snow, ladders), season and expected temperatures, water on the route, and whether you will camp.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Can the dog do this?, Rules to check, Heat, paws and terrain, Livestock and wildlife, Water and food, Kit, First aid and when to stop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan hikes with dogs. Dogs are keen long after it is good for them: they cannot tell you their pads are raw or that they are overheating until it is serious. Brachycephalic (flat-faced) breeds, very young dogs whose joints are still growing, older dogs and heavy-coated breeds are most at risk on long or hot days. Dogs cool mainly by panting, so heat and humidity build risk fast; rock and tarmac in sun can burn pads. Livestock are the other big issue: cattle, especially with calves, may charge at dogs, and the standard advice when threatened by cattle is to let go of the lead so you and the dog can both get away; sheep worrying can lead to the dog being shot in some places and to fines. Many parks and nature reserves restrict or ban dogs, and leash rules vary by season for ground-nesting birds and lambing.

<dog>
{{dog}}
</dog>

<trip>
{{trip}}
</trip>
</context>

<task>
1. Can the dog do this? Compare the route with the dog's current walking record, age and build. If it is a big step up, recommend building up over weeks or a shorter route, and suggest a vet check for young, old or unwell dogs.
2. Rules to check: dog access, leash requirements and seasonal restrictions on this land, and waste rules. Tell them where these are usually published and not to assume.
3. Heat, paws and terrain: temperature limits as cautious rules of thumb for this dog, timing walks for cooler hours, shade breaks, signs of heatstroke (heavy panting, drooling, stumbling, vomiting) and immediate cooling with cool (not ice-cold) water while getting to a vet; paw checks, booties for rough or hot ground, and terrain the dog cannot manage (ladders, scrambles, steep scree).
4. Livestock and wildlife: lead on near livestock, giving cattle a wide berth, letting go of the lead if cattle charge, keeping clear of wildlife, and local hazards to ask about (snakes, ticks, toxic algae in still water).
5. Water and food: water per hour for the dog, a collapsible bowl, extra food for a long day, and not letting the dog drink from stagnant or algae-covered water.
6. Kit: harness, lead, ID tag and microchip details up to date, poo bags, a towel, a coat for thin-coated dogs in cold, a light for evening, and a way to carry the dog or get help if it cannot walk out.
7. First aid and when to stop: a small canine first aid list (bandage, tick remover, saline), the signs to stop and turn back (limping, lagging, refusing to walk, heavy panting in shade), and having the nearest vet's details ready.
</task>

<constraints>
- Do not diagnose or dose medicines for the dog; send concerns to a vet.
- Do not state local dog rules as fact.
- Heat thresholds are cautious guides; say that some breeds struggle at milder temperatures.
</constraints>

<output_format>
## Can the dog do this?
## Rules to check
## Heat, paws and terrain
## Livestock and wildlife
## Water and food
## Kit
Checklist.
## First aid and when to stop
</output_format>
