---
schema: 1
id: plan-irl-stream
kind: prompt
title: Plan an IRL stream
description: Plans an outdoor or travel livestream with route, mobile connection and power, local filming rules to check, consent of people on camera, location privacy and a safety contact.
category: livestreaming
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, traveler]
inputs: [notes, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [irl-stream, mobile-streaming, filming-in-public, location-privacy, travel]
pairs_with:
  prompts: [audit-stream-for-privacy-leaks, plan-livestream-run-of-show]
  personas: [stream-producer]
args:
  - name: plan
    description: Where you want to stream (city walk, market, hike, event, trip abroad), when, how long, solo or with a camera operator, and what viewers will see.
    type: text
    required: true
  - name: kit
    description: What you have - phone or camera, mobile data plan and carrier, power banks, microphone, gimbal - and whether you use a bonding or relay service.
    type: text
    required: true
  - name: country
    description: The country or countries you will stream in.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Route and timing, Connection and power, Rules to check, People on camera, Privacy and safety, Show plan, Kit checklist, When things go wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
IRL streaming fails on three things: signal, power and people. Mobile upload varies street by street and drops in crowds, so experienced IRL streamers use a lower bitrate than at home, test the route, and use connection bonding or a relay that holds the stream while the signal recovers, with a "reconnecting" scene so viewers stay. Phones overheat and drain fast while streaming; power banks and shade matter. People are the hardest part: filming in public is lawful in many places but not all, rules differ for private property (shops, malls, transport, venues), and many people do not want to be on a live stream; children, people in vulnerable situations, and anyone who asks not to be filmed should be kept off camera. Live location is a real safety risk: viewers can find a streamer in minutes, and a stream that shows where they are now can attract unwanted company. A safety contact off-stream and a delay where possible reduce risk. Drones, recording audio of others, and streaming in certain places (government sites, hospitals, schools) have extra rules.
</context>

<task>
<plan>
{{plan}}
</plan>

<kit>
{{kit}}
</kit>

Country: {{country}}

1. **Route and timing:** a route or sequence that avoids long dead zones, with planned stops, a time limit, and rest; suggest testing upload along the route beforehand.
2. **Connection and power:** a realistic bitrate range for mobile, bonding or relay options in general terms, a reconnecting scene, battery and heat management.
3. **Rules to check:** for this country and these places, the questions to check (filming in public, private property, transport, audio recording, drones, permits for organised filming, religious or government sites). Present them as checks with where to look, not as legal conclusions.
4. **People on camera:** how to handle passers-by, staff, children and anyone who objects: framing, asking, blurring later in VODs, and a line to say when someone asks to stop.
5. **Privacy and safety:** not revealing home, hotel or exact next stops; a stream delay if available; hiding map overlays until after leaving; a safety contact who knows the route and check-in times; a code word with mods; when to end the stream.
6. **Show plan:** segments, interaction with chat while moving (a mod reads questions), and moments to slow down.
7. **Kit checklist.**
8. **When things go wrong:** signal loss, a confrontation, harassment from chat in person, theft of equipment, a medical issue. For immediate danger, end the stream and contact local emergency services.
</task>

<constraints>
- Do not state what is legal in the given country as fact; frame as checks and suggest official or venue sources, and say rules differ by place and change.
- Never plan to film people who have asked not to be filmed, children without a guardian's agreement in focus, or to provoke strangers for content.
- Never broadcast exact real-time location in a way that lets viewers find the streamer; plan delays and after-the-fact reveals.
- Do not invent carrier coverage or data plan details; tell them to check.
</constraints>

<output_format>
## Route and timing
## Connection and power
## Rules to check
Table: question | where to check.

## People on camera
## Privacy and safety
## Show plan
## Kit checklist
Checkbox list.

## When things go wrong
Table: situation | what to do.
</output_format>
