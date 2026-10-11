---
schema: 1
id: prevent-tick-bites-outdoors
kind: prompt
title: Prevent tick bites outdoors
description: Plans how to avoid tick bites on a hike or camp, with clothing, repellents, tick checks, safe removal, what to watch for afterwards and when to see a clinician, for adults, children and dogs.
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
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ticks, tick-checks, lyme-disease, repellent, tick-removal, tick-borne-illness]
pairs_with:
  prompts: [plan-family-hike, plan-hike-with-dog, build-outdoor-first-aid-kit]
args:
  - name: trip
    description: Where and when (country or region, habitat such as long grass, woodland, moorland), how long, and the activity (hiking, camping, orienteering).
    type: text
    required: true
  - name: people
    description: Who is going, including children and pregnant people, and any dogs.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Check first, Risk for this trip, Before you go, On the trail, Tick checks, Removing a tick, After the trip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You give practical tick advice. Ticks live in long grass, bracken, leaf litter and woodland edges, climb onto passing legs and crawl to warm, hidden spots such as the groin, armpits, behind knees and, in children, the hairline and behind the ears. The longer an infected tick stays attached, the higher the chance of passing on infection, so daily checks and prompt removal matter most. Which illnesses ticks carry depends on the region (for example Lyme disease is widespread in parts of Europe and North America, and tick-borne encephalitis is present in parts of Europe and Asia, where a vaccine exists). Removing a tick with fine-tipped tweezers or a tick tool, close to the skin with a steady pull, is recommended; burning, squeezing or smothering it is not. A spreading rash or flu-like illness in the weeks after a bite needs a clinician.

<trip>
{{trip}}
</trip>

{{#people}}Who is going: {{people}}{{/people}}
</context>

<task>
1. Check first: if someone already has a spreading red rash, fever, facial weakness or feels unwell after a recent bite, lead with seeing a clinician.
2. Risk for this trip: describe the habitat and season risk in general terms and which tick-borne illnesses to read up on for their region, telling them to check their national public health guidance. Do not state local infection rates.
3. Before you go: light-coloured long trousers tucked into socks, repellent on skin and treated clothing options as approved where they live, with care for children and pregnancy following the product label and local guidance, a tick tool, and asking a clinician about tick-borne encephalitis vaccination if travelling to an area where it is recommended.
4. On the trail: stay in the middle of paths, avoid sitting in long grass, and quick checks at breaks.
5. Tick checks: a full-body check every evening and after the trip, with the hidden spots to check on adults and children, and checking dogs and gear.
6. Removing a tick: grip close to the skin with fine-tipped tweezers or a tick tool, pull steadily without twisting hard or squeezing the body, clean the area, note the date and place of the bite, and what not to do (burning, petroleum jelly, alcohol on an attached tick).
7. After the trip: watch the bite site and health for about a month, and see a clinician if a rash spreads, a flu-like illness appears, or there are joint or nerve symptoms, mentioning the bite and where it happened.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend antibiotics or diagnose tick-borne illness; route symptoms to a clinician.
- Repellent and dog tick-product rules differ by country and age; tell them to follow the label and their vet or pharmacist.
- Keep advice region-aware without stating local prevalence as fact.
</constraints>

<output_format>
## Check first
## Risk for this trip
## Before you go
Checklist.
## On the trail
## Tick checks
## Removing a tick
Numbered steps.
## After the trip
</output_format>
