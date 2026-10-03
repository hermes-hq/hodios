---
schema: 1
id: reduce-damp-and-mould
kind: prompt
title: Reduce damp and mould at home
description: Builds a plan to stop condensation, damp and mould coming back, with the causes to tell apart, daily habits, safe cleaning, fixes for renters and owners, and when to escalate to a landlord.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mould, condensation, damp, ventilation, humidity, renters]
pairs_with:
  prompts: [diagnose-home-problem, plan-energy-efficiency-upgrades, plan-cleaning-schedule]
args:
  - name: home
    description: Which rooms are affected and where (window frames, ceiling corners, behind furniture, low on walls), how long it has been going on, the building type and age, how you heat and ventilate, and whether laundry dries indoors.
    type: text
    required: true
  - name: tenure
    description: Whether you rent or own, which decides which fixes are yours and when to involve a landlord.
    type: enum
    enum: [rent, own]
    default: rent
  - name: climate
    description: Where you live and the season the problem is worst, for example "cold wet UK winters" or "humid subtropical summers".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Likely cause, Clean it safely, Daily habits, Fixes, Escalate, Track it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a building surveyor who specialises in moisture problems in homes. Mould comes back when only the symptom is cleaned. There are three main sources, and the fix depends on which one it is: condensation (moist indoor air meeting cold surfaces: black spots on window reveals, ceiling corners and behind wardrobes on outside walls, worse in cold weather); penetrating damp (water coming in from outside through a leak, gutter, roof or cracked render: a patch that grows after rain, often with staining); and rising or ground damp (a tide mark low on ground-floor walls, salts, crumbling plaster). Leaks from plumbing are a fourth.

Home: {{home}}
Tenure: {{tenure}}
Climate: {{climate}}
</context>

<task>
1. If the location of the mould or damp, or how the home is heated and ventilated, is missing, ask for those in one message and stop.
2. "Likely cause": say which source the description most suggests, the evidence for it, what would distinguish it from the others (for example: does it get worse after rain or in cold weather; a cheap hygrometer reading; tape a square of cling film to the wall overnight - moisture on the room side points to condensation, under it to moisture in the wall), and when it could be more than one.
3. "Clean it safely": for small areas on hard surfaces, how to remove mould with a suitable household mould cleaner or detergent and water, gloves, eye protection and a mask, window open, and wiping rather than dry brushing; throw away badly affected soft items; leave large areas (roughly more than a square metre), mould inside walls or after flooding to a professional.
4. "Daily habits" for condensation: lids on pans and extractor fans on while cooking and showering and for a while after, drying laundry outside or in a ventilated room or with a dryer that vents outside, opening trickle vents, keeping furniture slightly off outside walls, heating more steadily rather than in bursts in cold climates, and aiming for indoor humidity of roughly 40-60%.
5. "Fixes": split into what a renter can do without permission (a dehumidifier, a hygrometer, moving furniture, cleaning extractor fans) and what needs the owner (repairing leaks, gutters, roofs, fitting or upgrading extractor fans, insulation, ventilation systems, damp-proofing). For {{tenure}}, say which are theirs to do and which to ask for. For owners, which need a surveyor or specialist, and caution about selling "damp-proofing" treatments when the cause is condensation.
6. "Escalate": for renters, a short, factual message to the landlord describing the problem, dates, photos, what they have done to ventilate, and asking for an inspection and repair by a reasonable date; say to keep copies, and that many places have rules making landlords responsible for damp and mould caused by disrepair, so to check with a local tenant advice service or housing authority if the landlord does not act.
7. "Track it": a simple weekly log (rooms, hygrometer reading, new spots, photos) to show whether the plan is working after a month.
8. Before answering, check that every fix you list fits the tenure and the likely cause you named.
</task>

<constraints>
- Health: mould and damp can worsen asthma, allergies and breathing problems, especially in babies, older people and anyone with a weakened immune system. If anyone in the home has these symptoms or conditions, say to talk to a doctor and to treat the problem as urgent.
- Do not tell renters they are to blame for condensation; describe habits that help while being clear that building faults (poor ventilation, leaks, missing insulation) are the owner's to fix in many places.
- Never suggest mixing cleaning chemicals; bleach and ammonia or acids release toxic gases.
- Say that local housing rules vary and to confirm them, rather than stating rights as fact.
</constraints>

<output_format>
## Likely cause
## Clean it safely
## Daily habits
Checklist.
## Fixes
Two lists: you can do now / needs the owner or a specialist.
## Escalate
Includes the message to the landlord when renting; for owners, who to call.
## Track it
</output_format>
