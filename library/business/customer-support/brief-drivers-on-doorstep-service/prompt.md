---
schema: 1
id: brief-drivers-on-doorstep-service
kind: prompt
title: Brief drivers on doorstep service
description: Writes a one-page doorstep service brief for delivery drivers covering greeting, proof photos, safe places, refused or damaged goods, age-checked items, upset customers and when to call base.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, operations-manager, manager]
subject: [supply-chain, retail]
requires: [none]
inputs: [text, notes]
output: [docs, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [last-mile, proof-of-delivery, safe-place, age-verification, driver-briefing]
pairs_with:
  prompts: [plan-delivery-routes, write-job-aid, practise-de-escalation-skills]
args:
  - name: goods
    description: What your drivers deliver (parcels, hot food, furniture, groceries, alcohol, medicines, large appliances), to whom (homes, businesses, flats), and by what vehicle.
    type: text
    required: true
  - name: rules
    description: Your existing rules or the client's - photo requirements, whether safe places or neighbours are allowed, age-check rules, cash handling, the app or phone line for base. Optional; gaps are marked for you to fill.
    type: text
  - name: language_level
    description: How simple the wording should be, for drivers who read the brief in a second language.
    type: enum
    enum: [plain, very-simple]
    default: plain
output_contract:
  format: markdown
  sections: [Driver brief, Call base when, Notes for the manager]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the one-page brief a delivery driver keeps in the cab or on their phone. Most delivery complaints start at the doorstep, in the 60 seconds a driver spends there: a parcel left somewhere unsafe, no useful photo, a damaged item handed over without a note, an age-restricted item handed to a teenager, or a driver arguing with an upset customer. Drivers are busy, often new, sometimes reading in a second language and under time pressure, so the brief is short, concrete and ordered by the moment it is needed. Every rule says what to do, not what to feel. Language level: {{language_level}}.
</context>

<task>
<goods>
{{goods}}
</goods>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. Cover the doorstep in order: arriving and parking safely, greeting (one short line to say), handing over, proof of delivery, leaving.
2. Proof photos: what a useful photo shows (the item, the door or house number, where it was left) and what it must never show (inside the home, people, other personal details).
3. Nobody home: the order of options allowed by the rules (neighbour, safe place, locker, card and return), what a safe place is and is not (not visible from the street, not in rain, not with a dog loose), and what never to leave.
4. Refused or damaged goods: do not argue, note the reason, photograph the damage, take it back, tell base.
5. Age-restricted or ID-checked items (only if the goods include them): check ID by the rule given, never hand to someone who looks under the threshold without ID, never leave unattended, what to say when refusing.
6. Upset customers: three short calm lines, never argue about refunds or company policy, give the support contact, walk away and call base if voices rise or the driver feels unsafe.
7. Call base when: a clear list (safety, injury, wrong address, access issues, damage, refused age check, anything the driver is unsure about).
8. In Notes for the manager, list every rule you had to assume, marked [X], and anything that needs the client's or legal sign-off.
</task>

<constraints>
- The brief fits one page: about 350 words for plain, 250 for very-simple, short bullets, no paragraphs.
- Use only the rules given. Never invent legal age limits, ID types, or client requirements; mark them [X] to fill.
- Driver safety comes first in every section: no driver is asked to enter a home, confront anyone or wait in an unsafe place.
- very-simple: one action per line, common words, present tense, no idioms.
</constraints>

<output_format>
## Driver brief
Short headed blocks in doorstep order, bullet actions, and the exact short lines to say in quotes.
## Call base when
A bulleted list with how to reach base ([X] if not given).
## Notes for the manager
Assumptions marked [X] and items to confirm with the client or check locally.
</output_format>
