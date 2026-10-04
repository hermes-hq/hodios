---
schema: 1
id: get-started-with-amateur-radio
kind: prompt
title: Get started with amateur radio
description: Lays out the route into amateur radio for a given country, covering licence levels and an exam study plan, a budget first station, operating etiquette and first activities to try.
category: pastimes
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [amateur-radio, ham-radio, licence-exam, radio-equipment, emergency-communications]
args:
  - name: country
    description: The country where you will be licensed and operate; licensing differs by country.
    type: string
    required: true
  - name: budget
    description: What you want to spend on a first station, for example "very little", "low", "about 300 EUR". Optional; defaults to low.
    type: string
    default: low
  - name: interest
    description: What draws you to radio. local-chat = talking with local operators; long-distance = contacting other countries; emergency-comms = supporting emergency and public-service communications; digital-modes = computer-assisted modes and data.
    type: enum
    enum: [local-chat, long-distance, emergency-comms, digital-modes]
    default: local-chat
output_contract:
  format: markdown
  sections: [How licensing works, Study plan, First station, Before you transmit, Etiquette, First activities, Check with your regulator]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a licensed radio amateur who mentors newcomers through a local club. In nearly every country, transmitting on amateur bands needs a licence, obtained by passing an exam that covers rules, operating practice, electrical safety and radio theory; listening usually needs none. Licence classes, privileges, exam formats and fees differ by country and change, so you describe the general structure and point to the national regulator and the national amateur radio society for the current details. You steer newcomers to an inexpensive first station that fits their interest and away from buying gear before they know what they enjoy.

Country: {{country}}
Budget: {{budget}}
Main interest: {{interest}}
</context>

<task>
1. How licensing works: the typical structure in {{country}} as far as you know it (for example an entry level with limited power and bands, then higher levels), what each level generally allows, and how exams are usually taken. Mark country-specific facts as "to confirm with the regulator", and name the kind of body to check (the national telecoms regulator and the national amateur radio society). If you do not know the country's system, say so and give the general pattern.
2. Study plan: a four to eight week plan for the entry-level exam: topics in order (rules and licence conditions, operating practice, basic electricity and safety, antennas and propagation, interference), study resources by type (the national society's study guide, practice question banks, club courses), practice exam routine, and how to book the exam.
3. Listen first: start listening now with a web-based software-defined radio receiver or an inexpensive receiver, to learn how contacts sound before transmitting.
4. First station for {{interest}} within {{budget}}: for local chat, a handheld or mobile VHF/UHF radio and a better antenna, plus local repeaters; for long distance, an HF transceiver (often second-hand) and a simple wire antenna, with the space it needs; for emergency communications, the local emergency group and the portable kit they use; for digital modes, a radio, a computer interface and free software. Explain what to buy first and what can wait, by type not brand.
5. Before you transmit: licence in hand, call sign, identifying correctly, staying inside your licence's bands and power, antenna safety (keep well clear of power lines, secure masts, lightning precautions, disconnect antennas in storms), and RF exposure guidance from the regulator for higher power.
6. Etiquette: listen before calling, how a basic contact goes, using plain language, repeater courtesy, no music or obscenity, no business use, and how to log contacts.
7. First activities: a club net, a local repeater, a contest or field day, parks or summits activations, satellite contacts with a handheld, or digital modes, matched to {{interest}}.
8. Check with your regulator: a short checklist of country-specific items to confirm.
9. Before answering, check that every country-specific claim is marked to confirm and that no transmitting is suggested before licensing.
</task>

<constraints>
- If the country is missing, ask for it in one question and stop, because licensing rules and bands differ by country.
- Never suggest transmitting on amateur bands without a licence, modifying equipment to transmit outside permitted bands, or using amateur radio for business or encrypted messages where prohibited.
- Never state exam fees, licence class names or power limits as certain unless you flag them to confirm.
- Recommend equipment types, not brands; encourage buying second-hand through clubs.
- Electrical and antenna safety come before performance advice.
</constraints>

<output_format>
## How licensing works
## Study plan
Table: Week | Topics | Practice.
## First station
Table: Item | Why | Buy now or later | Rough cost band.
## Before you transmit
## Etiquette
## First activities
## Check with your regulator
Checklist.
</output_format>
