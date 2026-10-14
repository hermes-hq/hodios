---
schema: 1
id: secure-bike-against-theft
kind: prompt
title: Secure a bike against theft
description: Plans how to protect a bicycle or e-bike from theft where you park it, with lock types and how to lock properly, home storage, registration, insurance checks and what to do if it is stolen.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [bike-security, bike-locks, e-bikes, bike-theft, bike-registration]
pairs_with:
  prompts: [choose-bike, plan-bike-maintenance, fix-bike-puncture]
args:
  - name: bike
    description: The bike or e-bike, its rough value, quick-release wheels or seat, and any accessories worth stealing (battery, lights, bags).
    type: string
    required: true
  - name: parking
    description: Where it is left and for how long - home (shed, hallway, communal bike store, balcony), work, station, town centre overnight - and your city or country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your risk, Locks, How to lock, At home, Records and insurance, If it is stolen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cycling security adviser. What owners miss: no lock stops a determined thief with power tools, so the goal is to be harder and slower to steal than the bikes nearby; a good rule of thumb is to spend around a tenth of the bike's value on locking and to use two different lock types (for example a D-lock and a chain), which need different tools; the lock should go through the frame and a wheel to an immovable object, held high and tight so it cannot be levered or rested on the ground for bolt croppers; quick-release wheels and seats get stolen separately; many bikes are taken from sheds, garages and communal stores at home, so home security matters as much as street locking; and recording the frame number, photos and receipts makes recovery and insurance claims possible. Independent security ratings from testing bodies are a better guide than marketing levels on the packaging.

Bike: {{bike}}
Parking: {{parking}}
</context>

<task>
1. Your risk: rate the risk of each parking spot they named (low, medium, high) with one line why, and the biggest weak point.
2. Locks: the lock types (D-lock or U-lock, heavy chain, folding lock, cable only as a secondary for wheels, frame or wheel lock for short stops), what each resists, and a combination sized to their bike value and risk. Say to look for independent security ratings in their country rather than recommending brands.
3. How to lock: step by step for their main spot, with a short wrong-versus-right comparison, plus wheels, seat, lights, e-bike battery and display removal.
4. At home: shed or garage anchors, a ground anchor, locking inside communal stores, keeping it out of sight, and indoor storage options.
5. Records and insurance: note the frame number (usually under the bottom bracket) and photos, register it on a bike register used in their country if there is one, keep receipts, mark components, and check whether home insurance covers it away from home and what lock rating it requires. A tracker as an option for high-value bikes.
6. If it is stolen: report to the police with the frame number, inform the insurer, post on local stolen-bike groups and the register, watch resale sites, and never confront a seller alone; arrange a police-assisted recovery.
</task>

<constraints>
- Do not name or rank lock brands or insurers.
- Do not suggest confronting thieves or sellers or taking a bike back by force.
- Insurance lock requirements vary by policy; tell them to read theirs.
</constraints>

<output_format>
## Your risk
Table: Spot | Risk | Why.
## Locks
## How to lock
## At home
## Records and insurance
Checklist.
## If it is stolen
Numbered steps.
</output_format>
