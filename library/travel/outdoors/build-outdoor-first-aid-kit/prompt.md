---
schema: 1
id: build-outdoor-first-aid-kit
kind: prompt
title: Build an outdoor first aid kit
description: Builds a first aid and repair kit sized to a specific outdoor trip, its remoteness, group and hazards, with what each item is for, what to leave out and the skills to train for.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [first-aid-kit, wilderness-first-aid, blisters, repair-kit, remote-trips, pack-weight]
pairs_with:
  prompts: [refresh-first-aid-knowledge, write-trip-intentions-plan, lead-group-hike]
args:
  - name: trip
    description: The activity, how many days, how far from help (hours to a road, signal or not), climate and season, group size and ages, and personal medicines people carry such as inhalers or adrenaline auto-injectors.
    type: text
    required: true
  - name: training
    description: First aid training in the group, for example "none", "work first aid course", "wilderness first aid course". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Check first, Kit list, Repair and emergency items, Leave out, Skills to train, Packing and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people pack first aid kits that match the trip and their skills. On most trips the kit is used for blisters, small cuts, splinters, sprains, sunburn and personal medicines; on remote trips it must also help someone stabilise a casualty for hours while help arrives. Remoteness changes the kit more than anything: the further from help, the more you need for bleeding control, splinting improvised with what you carry, keeping a casualty warm (hypothermia is common in injured people even in summer) and calling for help. A kit nobody knows how to use is dead weight, so training matters more than items. Every item should have a reason.

<trip>
{{trip}}
</trip>
{{#training}}Training: {{training}}{{/training}}
</context>

<task>
1. Check first: the remoteness band (close to help, half a day out, a day or more), and gaps they must fill (signal, allergies and medicines in the group). Remind them that personal medicines, especially inhalers and adrenaline auto-injectors, are carried by the person, within reach, and that others should know where they are.
2. Kit list by purpose: blisters and feet, wounds and bleeding, sprains and splinting support, burns and sun, eyes, stings and bites, hygiene, and casualty warmth. Give quantities scaled to group size and days.
3. Repair and emergency items: emergency shelter or bivvy bag, whistle, head torch, a means of calling for help where there is no signal (satellite messenger or personal locator beacon), duct tape, cord, repair items for their kit.
4. Leave out: items that are heavy, duplicated or that nobody is trained to use.
5. Skills to train: the three or four skills that matter most for this trip (for example bleeding control, managing a casualty in the cold, recognising serious illness, blister care) and the kind of course that teaches them, such as a wilderness or outdoor first aid course.
6. Packing and checks: waterproof bag, layout so items can be found fast, checking expiry dates before each trip, and replacing what was used.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend prescription medicines or give doses. For over-the-counter pain relief and antihistamines, say to follow the label and check with a pharmacist, especially for children, pregnancy and anyone on other medicines.
- Do not teach procedures such as tourniquet use as if text were enough; point to training.
- No brands.
</constraints>

<output_format>
## Check first
## Kit list
Table: Purpose | Item | Quantity | Why.
## Repair and emergency items
## Leave out
## Skills to train
## Packing and checks
</output_format>
