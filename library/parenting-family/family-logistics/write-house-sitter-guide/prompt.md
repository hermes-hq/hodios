---
schema: 1
id: write-house-sitter-guide
kind: prompt
title: Write a house, pet or babysitter guide
description: Writes a guide for a house sitter, pet sitter or babysitter with routines, house quirks, emergency contacts and procedures, and what to do if something breaks, with gaps marked to fill in.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual, traveler]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [house-sitting, pet-sitting, babysitting, emergency-plan, household-manual, handover]
pairs_with:
  prompts: [prepare-emergency-medical-summary, coordinate-family-calendar]
args:
  - name: household_details
    description: Everything the sitter needs, in any order, for example routines, children's or pets' needs, food and allergies, house quirks, where things are (stopcock, fuse box), who to call, rules, and how long you will be away. Leave out alarm codes and passwords.
    type: text
    required: true
  - name: sitter_type
    description: Who the guide is for.
    type: enum
    enum: [house, pet, babysitter]
    default: house
output_contract:
  format: markdown
  sections: [At a glance, Emergencies, Daily routine, Specific care, The house, If something breaks, Rules and preferences, Before you leave, Still to fill in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the kind of guide a thoughtful host leaves on the kitchen counter: the sitter can find what they need in ten seconds when something goes wrong, and can follow the routine without texting every hour. Emergencies and contacts come first, routines next, then the house's quirks and a "what to do if" table for the most likely problems. Anything you do not know is left as a labelled blank, never guessed.

Guide for: {{sitter_type}} sitter

<household_details>
{{household_details}}
</household_details>
</context>

<task>
1. At a glance: dates, how to reach the owners, the top five things to know, and the address placeholder for calling emergency services.
2. Emergencies: who to call and in what order (emergency services, the owners, a trusted local contact, the family doctor or vet, poison control), plus where the first-aid kit, torch and fire extinguisher are, and the escape plan. Tailor to the sitter type:
   - **babysitter:** each child's allergies, conditions and medicines exactly as the parents wrote them (with where any emergency medicine such as an adrenaline auto-injector or inhaler is kept), who may and may not collect the children, and what to do if a child is ill or injured;
   - **pet:** the vet and out-of-hours vet, signs that need the vet (not eating for a set period the owner gave, vomiting repeatedly, collapse, suspected poisoning), and how to transport the animal;
   - **house:** water leak, power cut, gas smell, break-in, and fire.
3. Daily routine: a timed schedule. For a babysitter, meals and snacks, naps or bedtime routine, screen rules, homework, bath. For a pet, feeding amounts and times exactly as given, walks, litter or cage, medicines exactly as given, and behaviour notes. For a house, plants, post, bins and collection days, lights, heating, security routine.
4. Specific care: children's comfort items, fears and how to settle them, safe-sleep basics for babies if a baby is in the house (on their back, in their own cot, nothing loose in it); or a pet's quirks and what they must never eat; or appliances that need special handling.
5. The house: where things are (stopcock, fuse box, boiler, spare keys, bins), how tricky things work (the shower, the back door, the heating), Wi-Fi network name with the password left as a placeholder.
6. If something breaks: a table of likely problems, what to do first, and who to call, including when to just leave it for the owners.
7. Rules and preferences: guests, food from the fridge, smoking, parking, payment and expenses.
8. Before you leave: a checklist for the last day.
9. Still to fill in: every gap you noticed that matters for safety or the routine.
</task>

<constraints>
- Copy medicines, doses, feeding amounts, allergies and care instructions exactly. Never add a dose or suggest a treatment; if something is unclear, add it to "Still to fill in".
- Never invent phone numbers, addresses, codes or names; use placeholders such as [vet phone] or [neighbour's number].
- Keep alarm codes, safe codes and passwords out of the document; add a line that these will be shared separately and in person.
- For a babysitter guide, never include instructions to leave children unsupervised, and make clear the sitter calls emergency services first in an emergency, then the parents.
- Scannable: short lines, headings, tables. It should print on two or three pages.
</constraints>

<output_format>
## At a glance
## Emergencies
## Daily routine
Table: Time | What | Notes.
## Specific care
## The house
## If something breaks
Table: Problem | Do this first | Then call.
## Rules and preferences
## Before you leave
Checklist.
## Still to fill in
Numbered.
</output_format>
