---
schema: 1
id: prepare-for-high-altitude-trip
kind: prompt
title: Prepare for a high-altitude trip
description: Prepares a traveller for a high-altitude destination with an acclimatisation check of the itinerary, warning signs of altitude illness, when to descend and what to discuss with a doctor.
category: travel-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
subject: [medicine]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [altitude-sickness, acclimatisation, trekking, mountain-travel, travel-health]
pairs_with:
  prompts: [plan-adventure-trip, choose-travel-insurance, build-packing-list, plan-long-distance-walk]
args:
  - name: destination
    description: Where you are going, for example "Cusco and the Inca Trail", "La Paz", "Everest Base Camp trek", "Lhasa".
    type: string
    required: true
  - name: max_altitude_m
    description: The highest altitude you will reach, in metres.
    type: number
    required: true
  - name: days
    description: Total days of the trip at altitude.
    type: number
    required: true
  - name: itinerary
    description: Day by day where you will sleep and its altitude, if known, for example "Day 1 Lima 150 m; Day 2 Cusco 3,400 m". Optional but lets the plan check your ascent rate.
    type: text
  - name: health_notes
    description: Anything a doctor should weigh, such as heart or lung conditions, pregnancy, past altitude illness, medicines. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Altitude profile check, Acclimatisation plan, Warning signs, Descend rules, Questions for your doctor, Kit and insurance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Altitude illness depends mostly on how fast someone gains sleeping altitude, not on fitness. Widely used mountain medicine guidance suggests that above roughly 3,000 m, sleeping altitude should rise by no more than about 500 m a day, with a rest day every three to four days, and that people who fly or drive straight to a high city cannot stage their ascent and need gentle first days. Acute mountain sickness (headache with nausea, fatigue, dizziness, poor sleep) is common; high-altitude cerebral oedema (confusion, loss of coordination, extreme drowsiness) and high-altitude pulmonary oedema (breathlessness at rest, cough, marked loss of exercise tolerance) are emergencies where descent is the treatment. You help the traveller plan a sensible profile and recognise danger, and you leave medical decisions to a doctor.

Destination: {{destination}}
Highest point: {{max_altitude_m}} m
Days at altitude: {{days}}
</context>

<task>
{{#itinerary}}
Itinerary:

<itinerary>
{{itinerary}}
</itinerary>

{{/itinerary}}
{{#health_notes}}
Health notes to raise with a doctor:

<health_notes>
{{health_notes}}
</health_notes>

{{/health_notes}}
1. If {{max_altitude_m}} is below about 2,500 m, say that altitude illness is uncommon at that height, give a short version, and stop there.
2. Altitude profile check: if an itinerary is given, list each night's sleeping altitude and the gain from the night before, and flag nights above about 3,000 m that gain more than about 500 m, and stretches without a rest day. If there is no itinerary, ask for one and outline what a typical safe profile for this destination and {{days}} days could look like, marked as a general pattern.
3. Acclimatisation plan: concrete changes such as an extra night lower, sleeping lower than the highest point of the day, a light first day after flying in, and avoiding alcohol and sedatives early on. Keep changes realistic for {{days}} days; if the trip is too short for the height, say so plainly.
4. Warning signs: a table for mild altitude sickness, cerebral oedema and pulmonary oedema with signs and the action, including a simple coordination check companions can do (walking heel to toe in a straight line).
5. Descend rules: never go higher with symptoms; descend if symptoms worsen or do not improve with rest; descend immediately and seek emergency help for confusion, loss of coordination or breathlessness at rest; never leave an ill person alone.
6. Questions for the doctor: whether preventive medicine is appropriate for them (doctors sometimes prescribe it for higher-risk itineraries), interactions with current medicines, and how their health notes affect the trip. Name no doses.
7. Kit and insurance: insurance that covers the maximum altitude and helicopter evacuation (check the policy wording), layers for cold nights, sun protection, water, and a written plan for the group.
8. Before writing, check the gain calculations against the itinerary numbers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose, prescribe or give doses. Medicines are discussed only as a topic for a doctor or travel clinic.
- Any sign of cerebral or pulmonary oedema means descend now and get emergency help; say this first if the user describes such symptoms.
- Present ascent-rate figures as commonly cited guidance, not guarantees; individuals vary and previous good experiences do not predict the next trip.
{{> output/uncertainty}}
</constraints>

<output_format>
## Altitude profile check
Table: Night | Sleeping altitude | Gain | Flag. Or the request for an itinerary plus a general profile.

## Acclimatisation plan
Numbered changes.

## Warning signs
Table: Condition | Signs | What to do.

## Descend rules
Bullets.

## Questions for your doctor
Numbered.

## Kit and insurance
Checklist.
</output_format>
