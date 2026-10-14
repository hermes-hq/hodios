---
schema: 1
id: write-trip-intentions-plan
kind: prompt
title: Write a trip intentions plan
description: Writes a trip intentions plan to leave with someone at home, with route, party, kit, a latest-safe-return time and exact instructions for when and how to raise the alarm.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [trip-plan, emergency-contact, search-and-rescue, solo-hiking, mountain-safety]
pairs_with:
  prompts: [set-turnaround-time, prepare-for-getting-lost, plan-camping-trip]
args:
  - name: trip
    description: Where you are going, the planned route (start, waypoints, finish), dates and times, who is in the party, how you get to the start (vehicle and where it will be parked), and any alternative routes you might take.
    type: text
    required: true
  - name: contact
    description: Who will hold the plan (their relationship to you, not their name) and how you can reach them, plus what communication you carry (phone, satellite messenger, beacon) and where you expect signal. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Trip intentions plan, Alarm instructions, Message to your contact, Before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help hikers, climbers, paddlers and campers write the plan that search and rescue teams wish everyone left behind. Rescuers start searching from the last known point and the planned route, so the most useful plan names the route and the likely alternatives, describes the party and what they are wearing and carrying, and gives the contact one unambiguous rule: if we have not checked in by this time, call this number and say this. Two mistakes are common. The first is a vague plan ("hiking near the lake, back tonight") that leaves searchers guessing. The second is an alarm time set too early or too late: too early causes false call-outs and people learn to ignore it; too late loses daylight hours that matter. The useful split is an expected return time and a later, firm latest-safe-return time that already allows for slow going.

<trip>
{{trip}}
</trip>
{{#contact}}
<contact>
{{contact}}
</contact>
{{/contact}}
</context>

<task>
1. List your assumptions: country or region (ask if missing, because the emergency number and the rescue service differ), season and daylight, and anything missing from the trip that a searcher would need. Mark gaps as [fill in].
2. Write the plan itself in the order a rescue coordinator asks: party (number, ages, experience, relevant medical conditions they choose to share), route in legs with named points, planned campsites, alternative routes and bail-out options, vehicle (make, colour, registration as [fill in], parking spot), clothing and pack colours, shelter, food and water days, communication devices and the times you will try to check in.
3. Set two times: the expected return and the latest-safe-return. Explain how you chose the gap (daylight, terrain, group pace, weather margin), usually a few hours for a day hike and up to half a day for multi-day trips where a late finish is common.
4. Write the alarm instructions as a short numbered rule the contact can follow under stress: what to do if a check-in is missed but the alarm time has not passed (try once, do not panic), what to do at the latest-safe-return time (call the emergency number for the region and ask for the relevant rescue service, such as police or mountain, cave or coastal rescue where that is how it works), what to read out (the plan), and what not to do (do not drive out to look themselves).
5. Write a short message to send the contact with the plan attached, including how you will confirm you are safe, and that you will also tell them if plans change.
6. Give a before-you-go checklist: share the plan, leave a copy in the car if that is a local norm, charge devices, check the forecast once more, and the rule that you do not change the route on the day without telling the contact if you have signal.
</task>

<constraints>
- Do not invent emergency numbers or rescue organisations. If the country is known and you are confident, name the general emergency number; otherwise tell them to look it up and write it in.
- Never suggest relying on a phone alone in remote terrain; mention a satellite messenger or personal locator beacon where there may be no signal, without naming brands.
- Do not include full names, addresses or registration numbers in your output; use [fill in] placeholders.
- Keep the plan to one printable page; the contact must be able to use it in under a minute.
- Do not soften the alarm rule. "Wait and see" is not an instruction.
</constraints>

<output_format>
## Assumptions
Bullets, with [fill in] gaps.
## Trip intentions plan
Labelled fields and a route table: Leg | From | To | Planned time | Alternative.
## Alarm instructions
Numbered steps for the contact.
## Message to your contact
Ready to send.
## Before you go
Checklist.
</output_format>
