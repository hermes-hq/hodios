---
schema: 1
id: audit-stream-for-privacy-leaks
kind: prompt
title: Audit a stream for privacy leaks
description: Audits a streamer's scenes, room, habits and accounts for what could reveal their location or identity - windows, mail, reflections, notifications, routines, metadata - and ranks fixes by risk.
category: livestreaming
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator, gamer]
inputs: [notes, image, text]
output: [checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [doxxing, privacy, stream-safety, opsec, screen-capture]
pairs_with:
  prompts: [prepare-hate-raid-response, plan-irl-stream, reduce-online-footprint]
  personas: [stream-producer]
args:
  - name: setup
    description: Describe or attach screenshots of your scenes and camera view, what is behind you, which windows or screens you capture, what you talk about on stream (your town, job, school, pets, routines), and which accounts link to your stream.
    type: text
    required: true
  - name: concern
    description: Optional. Whether something has already happened (someone named your town or sent mail) or this is a check-up.
    type: text
output_contract:
  format: markdown
  sections: [Highest risks, On camera, On screen, What you say, Accounts and links, Fixes in order, Habits from now on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Streamers are found through small details that add up: a view out of the window, a distinctive building, a parcel label, a reflection in glasses or a monitor, a school logo, the sound of a nearby train at a regular time, the weather mentioned live, local shop names, a pet's name that is also a password hint, a display capture that flashes an email or a map, notifications on a phone shown to camera, and old accounts under the same handle with real names. Live streams make timing information valuable: "back from the gym" at the same hour every week is a routine. Display capture leaks more than window capture. Photo and video uploads can carry location metadata. Old VODs and clips keep leaks alive after they are fixed. The goal is not paranoia but removing the few details that combine into an address.
</context>

<task>
<setup>
{{setup}}
</setup>

{{#concern}}
<concern>
{{concern}}
</concern>
{{/concern}}

1. If the concern says someone already knows or shared the streamer's address or is threatening them, start with safety: save evidence, report to the platform, consider contacting local police, and contact local emergency services if in immediate danger. Then continue the audit.
2. **On camera:** windows, outside views, mail and packages, documents, photos, uniforms or logos, reflections, distinctive furniture or posters, anything outside the room.
3. **On screen:** display versus window capture, notifications, browser tabs and bookmarks, maps or delivery apps, file names, game friend lists with real names, desktop backgrounds.
4. **What you say:** town or neighbourhood, weather, local events, workplace or school, routines and times, people's names, travel plans before they happen.
5. **Accounts and links:** old accounts with the same handle, real names on linked profiles, public payment or wishlist pages that show a name or address, domain registration details, metadata in uploaded images.
6. **Fixes in order:** a ranked list (highest risk first) with how to fix each and roughly how long it takes.
7. **Habits from now on:** a short pre-stream check and habits like posting trips after returning.
8. Review old VODs and clips for the leaks found, and how to remove or trim them.
</task>

<constraints>
- Base findings on what the user described or showed; mark items you are inferring as "check this".
- Do not attempt to locate the streamer or deduce their address from the details, even as a demonstration.
- Do not frighten; rank by real risk and keep fixes practical.
- Legal options after doxxing differ by country; mention police and platform reporting without predicting outcomes.
</constraints>

<output_format>
## Highest risks
Top three in one line each.

## On camera
## On screen
## What you say
## Accounts and links
Each as bullets: risk | why.

## Fixes in order
Table: rank | fix | how | time needed.

## Habits from now on
Checkbox list for each stream.
</output_format>
