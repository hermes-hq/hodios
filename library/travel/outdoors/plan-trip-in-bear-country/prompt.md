---
schema: 1
id: plan-trip-in-bear-country
kind: prompt
title: Plan a trip in bear country
description: Plans a hike or camp where bears live, with food storage rules, camp layout, avoiding surprise encounters, carrying bear spray and what to do in an encounter by bear type.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bear-safety, bear-spray, food-storage, wildlife-encounters, bear-canister, camp-layout]
pairs_with:
  prompts: [plan-camping-trip, plan-backpacking-food, choose-wild-camp-spot]
args:
  - name: trip
    description: Where you are going (park or region and country), dates, day hike or overnight, how you will store food, and the bear species you know live there if any.
    type: text
    required: true
  - name: group
    description: Group size, children, dogs, and any bear experience.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Check the local rules, Avoiding a surprise, Food and scented items, Camp layout, Bear spray, If you meet a bear, Report and adjust]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise hikers and campers in bear country. Most bear incidents start with a surprise at close range or a bear that has learned people mean food. Prevention does most of the work: travel in groups, make noise where visibility is poor, avoid carcasses and dense berry patches, and store every food and scented item so a bear cannot get it. Rules differ by park: many require approved bear canisters or lockers, some allow hanging, and some close trails when bears are active. Bear spray, carried accessible and practised, is widely recommended by wildlife agencies in North America. Response to an encounter depends on the species and whether the bear is defensive (surprised, with cubs or food) or predatory or curious, and land managers publish the guidance for their area.

<trip>
{{trip}}
</trip>

{{#group}}Group: {{group}}{{/group}}
</context>

<task>
1. Check the local rules: say which rules to look up for their park or region (required storage method, trail closures, group size advice, whether bear spray is allowed, dog rules), and where. If they did not name the species, say which bears are likely to matter for the region in general terms and ask them to confirm.
2. Avoiding a surprise: travel in a group, make noise near streams, bends and dense cover, travel by day, keep children close, dogs leashed or at home, watch for signs (fresh scat, tracks, dug ground, carcass smell) and leave the area if you find a carcass.
3. Food and scented items: everything that smells goes in the approved storage (food, rubbish, toiletries, sunscreen, cooking gear), never in the tent, and never left unattended at a picnic spot. Explain canister, locker and hang options and which their park requires.
4. Camp layout: a cooking and storage area well downwind and away from sleeping tents (often given as around 100 m), clean cooking, no food smells on sleeping clothes, and a camp away from trails and berry patches.
5. Bear spray: carry it on the hip or chest, not in the pack, know how to remove the safety, practise with an inert can, the range and wind effect, and the travel rules for it (it is often not allowed on planes).
6. If you meet a bear: give general guidance in a table by species, covering staying calm, not running, speaking firmly, backing away slowly, and the differences when a bear charges or makes contact (for example playing dead in a defensive brown bear attack versus fighting back against a black bear or any predatory attack). Say this follows widely published agency guidance and must be checked against the local land manager advice.
7. Report and adjust: report sightings or encounters to rangers and change plans if bears are active nearby.
</task>

<constraints>
- Do not invent park-specific rules, closures or permit conditions; tell them to check with the land manager.
- Do not suggest firearms as a primary defence or give advice on using them.
- Bear behaviour advice must follow established wildlife agency guidance; say so and avoid folk remedies.
- If children are in the group, add child-specific rules (stay within sight, no running ahead, what to do if they see a bear).
</constraints>

<output_format>
## Check the local rules
## Avoiding a surprise
## Food and scented items
Checklist.
## Camp layout
## Bear spray
## If you meet a bear
Table: Situation | Brown or grizzly | Black bear.
## Report and adjust
</output_format>
