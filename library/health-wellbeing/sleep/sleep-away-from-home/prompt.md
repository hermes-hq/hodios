---
schema: 1
id: sleep-away-from-home
kind: prompt
title: Sleep well away from home
description: Plans how to sleep in hotels, relatives' homes, tents or hospital, with a sleep kit, room setup, a portable routine and the first-night effect. Use before a stay away.
category: sleep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [first-night-effect, sleep-kit, hotel-sleep, tent-sleep, travel-sleep, earplugs]
pairs_with:
  prompts: [beat-jet-lag, audit-bedroom-for-sleep]
  personas: [sleep-coach]
args:
  - name: stay
    description: Where you will sleep, how many nights, who with, what you expect to be hard (noise, light, a shared room, a hard bed, cold, early starts), and what helps you sleep at home.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What to expect, Your sleep kit, On arrival, Your routine away, Problems you cannot control, Getting back to normal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sleep coach. Many people sleep worse on the first night in a new place, a well-studied "first-night effect" in which part of the brain stays more alert to an unfamiliar environment; it usually eases on the second night. What helps: knowing this so one bad night does not cause worry, bringing a few familiar cues (own pillowcase, the same wind-down, a familiar sound or audio), controlling light and noise with a small kit, sorting the room on arrival (temperature, curtains, a gap under the door, alarms and lights from devices), and keeping the wake time similar to home. Camping adds cold and ground comfort; hospital stays add light, noise and checks at night that cannot be avoided, so the focus moves to rest and what can be asked for.

Stay: {{stay}}
</context>

<task>
1. What to expect: one or two lines on the first-night effect and the likely challenges of this stay.
2. Your sleep kit: a short packing list matched to the stay (eye mask, earplugs, a small light, layers, own pillowcase, a phone with downloaded calming audio, charger with a long lead), and for camping, insulation from the ground and warm layers.
3. On arrival: a five-minute room setup (check temperature and bedding, block light and gaps, silence or cover device lights, find the bathroom route in the dark, ask for a quieter room if possible).
4. Your routine away: keep the home wind-down short and portable, similar wake time, daylight in the morning, caffeine and alcohol limits, and how to fit in with others in a shared room or family home.
5. Problems you cannot control: noisy neighbours, a snoring roommate, hospital checks: masking, earplugs, asking politely, and resting without fighting it. For hospital stays, suggest asking staff what is possible (an eye mask, earplugs, grouping checks) and never changing treatment timing.
6. Getting back to normal: the first night home and keeping the wake time.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No sleeping pills, melatonin, antihistamines or alcohol as sleep aids, and no doses. Questions go to a doctor or pharmacist.
- Personal safety in shared or unfamiliar places (hostels, camping): keep valuables and medicines secure, and know exits; use earplugs only where they will still hear alarms, or rely on a vibrating alarm.
- If they cross several time zones, say that a jet lag plan is needed as well.
- If they sleep badly at home too, most nights, mention that a doctor can help with persistent insomnia.
</constraints>

<output_format>
## What to expect
## Your sleep kit
A checklist.
## On arrival
## Your routine away
## Problems you cannot control
## Getting back to normal
</output_format>
