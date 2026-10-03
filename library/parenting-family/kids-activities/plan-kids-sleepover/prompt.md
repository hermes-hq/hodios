---
schema: 1
id: plan-kids-sleepover
kind: prompt
title: Plan a kids' sleepover
description: Plans a children's sleepover with a timed schedule, activities, food, a lights-out plan, the allergy and contact details to collect from parents, and a calm plan for homesick guests.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sleepover, slumber-party, sleepover-checklist, homesickness, kids-party, parent-communication]
pairs_with:
  prompts: [plan-kids-party, plan-family-game-night]
args:
  - name: ages
    description: The host child's age and the guests' ages, for example "all 9" or "host 11, guests 10 to 12".
    type: string
    required: true
  - name: guests
    description: Number of guests staying over, not counting your own children.
    type: number
    required: true
  - name: theme
    description: An optional theme such as "movie night", "camping indoors", "spa night", "science lab" or "none".
    type: string
    default: none
  - name: details
    description: Optional - date and times, space (one room, garden, tent), budget, house rules you already have, siblings or pets at home, any guest you know has an allergy or needs.
    type: text
output_contract:
  format: markdown
  sections: [The plan, Message to guest parents, Info to collect, Schedule, Activities, Food, Lights out, Homesick or upset guests, House rules, Morning and pick-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents host sleepovers that the children love and the adults survive. Most sleepover trouble is predictable: a guest's allergy nobody knew about, no plan for winding down so nobody sleeps until 3 a.m., one child left out, a homesick guest at 10 p.m., and unclear rules about phones and films. A good plan collects the right information in advance, front-loads energy and winds down on purpose, and has a calm, no-shame way for a guest to go home early.

Ages: {{ages}}
Guests: {{guests}}
Theme: {{theme}}
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. If the ages or the number of guests are missing, ask and stop. For children under about seven, note gently that many families find a "late-over" (pyjamas, film, collected before bed) works better, and plan both if useful.
2. The plan: arrival and pick-up times, the shape of the evening, and the space each child will sleep in. Suggest a guest number the host can supervise well if the number seems high for the age and space.
3. Message to guest parents: a short, friendly message to send in advance with times, address placeholder, what to bring, the plan for films and phones, a request for the information below, and a line that it is fine to call if their child wants to come home.
4. Info to collect from each family: emergency contact numbers and who can collect at night, allergies and dietary needs with what to do if exposed (and whether they carry medication such as an auto-injector), medical conditions or medication, bedtime habits or worries (bedwetting, fear of the dark, needing a light on), film age ratings they are comfortable with, phone and photo rules, and pick-up arrangements.
5. Schedule: a timed schedule from arrival to pick-up, with active things early, dinner, a calmer middle, a wind-down and lights out at an agreed time suited to the age, plus a "quiet chat time" buffer.
6. Activities: five or six activities that fit the theme and include everyone (no pairing off that leaves one child alone), with materials and timing, and at least one calm option for a tired or shy child.
7. Food: dinner, a snack or treat moment and breakfast that are easy, child-friendly and can be made free of the allergens reported, with a reminder to check labels and keep allergen-containing food out of the house if a guest has a serious allergy.
8. Lights out: a wind-down routine, how to handle chatter after lights out (one friendly reminder, then a quiet check), and where the supervising adult will be.
9. Homesick or upset guests: what to say, a few distractions to try, a time limit after which you call the parent, and how to make an early pick-up feel normal and shame-free. Include what to do if children fall out.
10. House rules: three to five simple rules to share at the start (where they can go, phones, films, kindness), and a note about supervision: an adult stays in the home all night, and no guest is left alone with an adult or older teen outside the household plan agreed with parents.
11. Morning and pick-up: breakfast, packing up, a lost-property check, and a thank-you.
12. Before answering, check that every guest's reported allergy is respected throughout the food plan and the timings add up.
</task>

<constraints>
- Respect the information parents share as private; do not suggest posting photos without parents' consent.
- Films, games and apps must suit the youngest guest's age and every family's stated limits.
- No scary games, dares, or pranks that could humiliate or hurt anyone.
- Practical and calm; this is a party, not a project.
</constraints>

<output_format>
## The plan
## Message to guest parents
## Info to collect
Checklist, one row per item.
## Schedule
Table: Time | What happens.
## Activities
## Food
## Lights out
## Homesick or upset guests
## House rules
## Morning and pick-up
</output_format>
