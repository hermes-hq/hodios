---
schema: 1
id: prevent-hiking-blisters
kind: prompt
title: Prevent and treat hiking blisters
description: Builds a blister plan for a hike or trek, from boot fit and socks to taping hot spots before they turn into blisters, with how to treat one on the trail and when to get medical help.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
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
depth: specific
tags: [blisters, foot-care, boot-fit, hot-spots, taping, trekking]
pairs_with:
  prompts: [prepare-for-long-hike, choose-outdoor-gear, build-outdoor-first-aid-kit]
args:
  - name: trip
    description: The hike or trek (days, daily distance, terrain, weather and whether feet will get wet).
    type: text
    required: true
  - name: feet
    description: Your boots or shoes and how old they are, socks, where you usually get blisters or rubbing, and any foot conditions such as diabetes or poor circulation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, Why your feet blister, Before the trip, On the trail, Treating a blister, Foot kit, Get medical help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help walkers keep their feet working. Blisters come from friction plus moisture and heat, usually where a boot moves against the skin: heels lifting in boots that are too loose or laced badly, toes hitting the front on descents, and wet skin softening on long days. Prevention beats cure: well-fitted footwear worn in before the trip, socks that suit the shoe and wick moisture, trimmed nails, lacing that locks the heel, and stopping at the first hot spot to tape or pad it. Treatment for small intact blisters is usually to protect and leave them; large or painful ones may be drained with clean technique, keeping the roof on as a natural dressing. People with diabetes or poor circulation should not self-treat foot wounds and need professional advice.

<trip>
{{trip}}
</trip>

<feet>
{{feet}}
</feet>
</context>

<task>
1. Check first: if they mention diabetes, poor circulation, neuropathy or a foot that is red, hot, swollen or oozing, lead with seeing a clinician and keep self-care to protection only.
2. Why your feet blister: explain their likely cause from what they describe (fit, heel lift, toe bang, wet feet, seams, nails).
3. Before the trip: footwear fit check (thumb width at the toe, heel locked, try with hiking socks in the afternoon), breaking in with progressively longer walks, sock choice and liners, nail trimming, pre-taping known trouble spots, and lacing techniques such as a heel-lock.
4. On the trail: stop at the first hot spot, not the first blister; air and dry feet at breaks; change socks when wet; adjust lacing for climbs and descents; use gaiters for grit.
5. Treating a blister: clean hands and skin; leave small intact blisters protected with a dressing or padding; for a large, tense blister that will burst anyway, drain it at the edge with a sterilised needle, leave the roof on, cover with a blister dressing; for a torn blister, clean and cover. Watch for infection.
6. Foot kit: tape, blister dressings, padding, small scissors, antiseptic wipes, spare socks, a sterile needle.
7. Get medical help if: signs of infection (spreading redness, warmth, swelling, pus, red streaks, fever), a blister on someone with diabetes or poor circulation, or a wound that does not improve.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend prescription medicines or antibiotics; send infection signs to a clinician.
- Describe kit by function, not brand.
- Keep advice general; foot conditions and treatment preferences differ, and a pharmacist can advise on dressings.
</constraints>

<output_format>
## Check first
## Why your feet blister
## Before the trip
Checklist.
## On the trail
## Treating a blister
Numbered steps.
## Foot kit
Checklist.
## Get medical help if
</output_format>
