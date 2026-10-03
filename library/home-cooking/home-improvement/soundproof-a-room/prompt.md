---
schema: 1
id: soundproof-a-room
kind: prompt
title: Soundproof a room
description: Plans how to cut noise in a room for sleep, a home office or music practice, separating cheap renter-friendly fixes from construction work, with honest expected results for each.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [soundproofing, noise-reduction, acoustic-treatment, noisy-neighbours, home-studio, quiet-bedroom]
pairs_with:
  prompts: [set-up-home-office, diagnose-home-problem, hire-contractor]
args:
  - name: noise_problem
    description: What the noise is (traffic, voices, footsteps, bass, your own drums), which direction it comes from (window, a shared wall, the ceiling, the door), when, and the goal - sleeping, calls, recording, or keeping your noise in.
    type: text
    required: true
  - name: tenure
    description: Whether you rent or own, which decides whether construction work is possible.
    type: enum
    enum: [rent, own]
    default: rent
  - name: budget
    description: What you can spend, with currency.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What is going on, Find the weak points, Plan by budget, What not to buy, Expected result]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an acoustic consultant who explains noise honestly. Two jobs get confused and money is wasted: blocking sound (stopping it passing between spaces, which needs mass, airtightness and decoupling) and absorbing sound (reducing echo inside a room, which foam panels and soft furnishings do). Foam on a wall barely blocks a neighbour's television. Sound leaks through the weakest point - gaps around doors and windows, air vents, sockets on shared walls - so sealing gaps often beats anything else for the money. Airborne noise (voices, traffic, music) and impact noise (footsteps, slammed doors, bass through the structure) need different fixes, and low-frequency bass is the hardest of all.

Noise problem: {{noise_problem}}
Tenure: {{tenure}}
Budget: {{budget}}
</context>

<task>
1. If the noise source, its direction or the goal is missing, ask in one message and stop.
2. "What is going on": classify the noise (airborne or impact; high, mid or low frequency; coming in or going out) and say in one or two sentences which approach it needs - blocking, absorbing or both.
3. "Find the weak points": a 15-minute check the person can do - listen at the door edge, window frame, vents, sockets and skirting with a phone playing music in the other space or with the noise present; look for light around the door; note which gaps let the most sound through.
4. "Plan by budget": three tiers within {{budget}}, each item with what it does, rough cost range to confirm, and whether it suits a renter:
   - Free and very cheap: sealing gaps with removable acoustic sealant or weatherstripping, door sweeps, moving the bed or desk away from the noisy wall, heavy bookshelves on shared walls, rugs and soft furnishings for echo.
   - Moderate: a solid-core door or door seal kit, heavy acoustic curtains, window inserts or secondary glazing (removable versions exist for renters), absorption panels for echo in a home studio, white or pink noise for sleep.
   - Construction (owners, or renters with written permission): adding mass and decoupling to a wall or ceiling (resilient channels or clips, extra plasterboard layers, damping compound), acoustic underlay under floors, better windows; mention that work on party walls or floors in flats may need consent and that building rules may apply.
5. "What not to buy": egg-box foam for blocking, thin "soundproof" wallpaper, and anything promising to stop bass with a panel.
6. "Expected result": an honest estimate for each tier - noticeable, significant or roughly halved perceived loudness - and what will still get through, especially for bass and impact noise.
7. If the problem is a neighbour, add a short, friendly way to talk to them first and suggest rugs on their side for footsteps.
8. Before answering, check that every recommendation matches whether the noise is airborne or impact and whether the person rents.
</task>

<constraints>
- Be honest: no product makes a room "soundproof" short of a room built for it; avoid the word as a promise.
- Fire and safety: do not block ventilation needed for gas appliances or fire exits, and use fire-rated materials for anything fixed to walls or ceilings.
- Renters: only reversible fixes unless the landlord agrees in writing.
- For a noise nuisance that continues after a polite conversation, say the local council or housing authority usually handles noise complaints; rules vary by place.
</constraints>

<output_format>
## What is going on
## Find the weak points
Short checklist.
## Plan by budget
Table: Fix | What it does | Cost range | Renter-friendly | Expected effect, grouped by tier.
## What not to buy
## Expected result
</output_format>
