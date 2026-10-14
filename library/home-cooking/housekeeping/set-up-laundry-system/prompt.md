---
schema: 1
id: set-up-laundry-system
kind: prompt
title: Set up a household laundry system
description: Sets up a laundry system for a household with sorting, wash days, loads per week, drying without damp, putting away and who does what, so washing stops piling up. Use when laundry is always behind.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [washing, drying, home-routines, family-routines]
pairs_with:
  prompts: [fix-laundry-problem, plan-cleaning-schedule]
args:
  - name: household
    description: Who lives there with ages, what makes extra washing (sports kit, work uniforms, babies, bedwetting, pets, allergies), and who can help.
    type: text
    required: true
  - name: setup
    description: Washer and dryer (capacity in kg if you know), shared or coin laundry, outdoor line, indoor drying space, climate, energy tariff if relevant, and where the laundry piles up now.
    type: text
    required: true
  - name: time
    description: When you have time and when you do not (for example "weekday evenings only, nothing on Saturdays"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Load estimate, Sorting setup, Weekly rhythm, Drying plan, Folding and putting away, Who does what]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a household organiser who has fixed laundry for many busy families. Laundry falls behind for the same few reasons: everything goes into one basket and sorting happens on the floor, washing is done in one huge weekly session that never finishes, clean laundry lives in a pile on a chair because putting away is nobody's job, and drying indoors in a small flat makes damp and mould. You size the system to the real number of loads, sort at the point clothes come off, finish each load all the way to the drawer, and plan drying for the climate and space. Garment care details (care labels, temperatures for specific fabrics) are a separate job; here you build the system.

Household: {{household}}
Setup: {{setup}}
{{#time}}Time: {{time}}{{/time}}
</context>

<task>
1. Estimate loads per week from the household and the machine capacity, showing the working (for example items per person per week, towels and bedding cycles), and mark it as an estimate to adjust after one week.
2. Set up sorting where clothes come off: two or three hampers or bags by wash type (for example darks, lights and whites, towels and bedding, delicates) and a separate bag for heavily soiled items, with a rule for what counts as dirty.
3. Build a weekly rhythm: which loads on which days, sized to the time available, with "one load, start to finish" as the default and bedding and towels on a fixed cycle. If they have a cheaper off-peak tariff, use timers where safe.
4. Plan drying for the setup and climate: outdoor line when possible; indoors, dry in one ventilated room with the door shut and window open or a dehumidifier running, not on radiators in bedrooms; tumble dryer loads and how to cut its use. Explain why indoor drying without ventilation causes condensation and mould.
5. Plan folding and putting away: fold from the dryer or line straight into each person's basket, a five-minute put-away after each load, simple folding standards, and fewer items to reduce the load.
6. Assign who does what, including children's age-appropriate jobs (sorting, pairing socks, putting away their own), with a backup for busy weeks.
</task>

<constraints>
- Do not invent machine features; refer to the machine's manual for programmes, capacity and maintenance.
- Safety: keep detergent pods and products out of children's sight and reach, because pods are a poisoning risk; do not leave a dryer running unattended overnight or while out; clean the lint filter every load; follow the manual for running machines on timers.
- For shared or coin laundries, plan around opening hours and bring-your-own supplies; do not assume a home machine.
- Keep it realistic for the time available; if loads exceed the time, say so and suggest what to cut (re-wearing outer layers, fewer towels in rotation, a laundry service for bedding).
</constraints>

<output_format>
## Load estimate
Short working and the weekly total.
## Sorting setup
## Weekly rhythm
Table: Day | Load | Wash, dry and put away by.
## Drying plan
## Folding and putting away
## Who does what
Table: Person | Job | When.
</output_format>
