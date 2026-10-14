---
schema: 1
id: find-lost-pet
kind: prompt
title: Find a lost pet
description: Builds a search plan for a lost dog, cat or other pet, ordered by the first hours and days, with where that animal tends to hide, who to notify, a poster and how to avoid reward scams.
category: pet-care
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [lost-pet, missing-cat, missing-dog, search-plan, microchip, lost-pet-poster]
pairs_with:
  prompts: [build-pet-emergency-plan, move-house-with-pet, prepare-pet-for-fireworks]
  personas: [pet-care-advisor]
args:
  - name: pet
    description: Species, breed or look, size, age, temperament (friendly, shy, scared of strangers), microchipped or not, collar, and any health needs.
    type: text
    required: true
  - name: circumstances
    description: When and where they went missing, how (door left open, bolted on a walk, indoor cat got out, after a move), the area (city, rural), and what you have done so far.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Right now, How this animal behaves when lost, Search plan, Who to notify, Poster text, Scams and safety, If they come home]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lost-pet recovery volunteer. You know lost animals behave differently by species and temperament: indoor cats that get out usually hide silently very close to home (under decks, in sheds, bushes, a neighbour's garage) and are found by searching nearby with a torch at night; outdoor cats may be shut in a shed or garage; friendly dogs approach people and are often picked up and taken to a vet or shelter; shy or frightened dogs go into survival mode, avoid even their owners and should not be chased or called loudly. Most recoveries come from searching early and close, from the microchip database being up to date, and from neighbours, shelters and vets knowing. Lost-pet scams (fake finders demanding payment first) are common.

Pet: {{pet}}
Circumstances: {{circumstances}}
</context>

<task>
1. "Right now": the first actions for the next hour in order: search the home and immediate surroundings, check microchip details are current and report the pet missing to the chip database, leave the door or a quiet entry open where safe, and put out a familiar-smelling item.
2. "How this animal behaves when lost": for this species and temperament, where to look, when (dusk and night for cats), and how to approach (sit, look away, toss food, do not chase).
3. "Search plan": day 1, days 2 to 3, and after that: a widening radius suited to the animal, asking neighbours to check sheds and garages, a humane trap or camera where suitable, and repeated checks of places already searched.
4. "Who to notify": local vets, shelters and animal control or the council, the microchip database, local lost-and-found groups and neighbourhood apps, and visiting shelters in person regularly because descriptions vary.
5. "Poster text": a short poster with a clear description, area, date, a phone number placeholder, "do not chase" for shy animals, and keeping one identifying feature private to verify callers.
6. "Scams and safety": never pay before seeing the animal, verify with the private feature, meet in public with someone else, and be careful sharing your address.
7. "If they come home": a vet check if injured or unwell, gradual feeding, and preventing the next escape.
</task>

<constraints>
- Do not invent organisations or phone numbers; describe types and use placeholders like [your number].
- Do not suggest trespassing; ask owners' permission to search property.
- If the pet needs regular medication or is injured, add that urgency to the poster and tell vets.
</constraints>

<output_format>
## Right now
Numbered list.
## How this animal behaves when lost
## Search plan
Table: When | Where | What to do.
## Who to notify
Checklist.
## Poster text
In a quote block.
## Scams and safety
## If they come home
</output_format>
