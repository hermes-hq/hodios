---
schema: 1
id: write-farm-safety-induction
kind: prompt
title: Write a farm safety induction
description: Writes a safety induction for farm workers, volunteers, school groups or visitors covering vehicles and machinery, livestock, chemicals, slurry, children and emergencies, with a sign-off record.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, individual, operations-manager]
requires: [none]
inputs: [notes, text]
output: [docs, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [farm-safety, safety-induction, livestock-handling, machinery-safety, farm-visits, farming]
pairs_with:
  prompts: [write-toolbox-talk, write-emergency-procedures-for-staff, write-workplace-risk-assessment, plan-livestock-record-keeping]
  personas: [farm-business-advisor]
args:
  - name: farm_type
    description: The kind of farm and its main activities, for example "dairy with slurry lagoon and robot milking", "mixed arable and sheep", "market garden with polytunnels".
    type: string
    required: true
  - name: audience
    description: Who the induction is for. Workers get the full version with competence checks; volunteers, school visits and the public get versions sized to what they will do.
    type: enum
    enum: [workers, volunteers, school-visits, public]
    default: workers
  - name: hazards
    description: Optional. Specific hazards and site details - machinery in use, bulls or cows with calves, chemical store, slurry pits, ponds, overhead power lines, no-go areas, first aid kit and assembly point locations, mobile signal.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, The rules that keep you alive, Area by area, Health and hygiene, In an emergency, Sign-off record, Notes for the person giving the induction]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write farm safety inductions. Farming has one of the highest rates of fatal injury of any industry, and the same causes repeat year after year: being struck or run over by moving vehicles, machinery entanglement, falls from height, being attacked or crushed by livestock (especially cows with calves and bulls), drowning or poisoning in slurry and grain stores, and children on the farm. Visitors also face illness from animals (such as E. coli) when hand washing is skipped. An induction works when it is short, specific to this farm, says what to do rather than listing dangers, and is checked: the person can say back the key rules before they start.

Farm type: {{farm_type}}
Audience: {{audience}}
{{#hazards}}
<hazards>
{{hazards}}
</hazards>
{{/hazards}}
</context>

<task>
1. Write "Before you start": who is in charge and how to reach them, signing in and out, where you may and may not go, clothing and footwear, and lone working rules for workers.
2. Write "The rules that keep you alive" as five to eight short imperatives tailored to {{farm_type}} and {{audience}}. Include, where relevant: never approach moving vehicles until the driver has seen you and stopped; safe stop before any work on machinery (handbrake on, controls in neutral, engine off, key out); never enter a slurry pit or tank, and stay away from slurry while it is being mixed because the gas can kill in seconds; never go into a field with a bull or with cows and calves unless authorised; stay clear of overhead power lines with any tall machinery; only trained people handle chemicals; children never ride on or play near machinery.
3. Go area by area using the hazards supplied: yard, buildings, machinery, livestock, chemical store, slurry and grain storage, water, fields. For each, the hazard and what to do. Where a hazard is generic because the farm details are missing, mark it `[CONFIRM for this farm]`.
4. Write health and hygiene: hand washing after touching animals and before eating, especially for children and pregnant visitors, and where the wash points are.
5. Write "In an emergency": the emergency number `[CONFIRM local number]`, the farm's address and an exact location reference for responders, first aid kit and defibrillator locations, assembly point, and what to do for a person overcome by slurry gas (do not go in after them; call for help).
6. Adapt to the audience: workers get competence checks and the rule that they may refuse unsafe work; volunteers get task limits and supervision; school visits get a teacher briefing, supervision ratios to agree, and a child-friendly version of the rules; the public get signage-style text and no-go areas.
7. Write a sign-off record and five check questions the inductee should answer before starting.
8. Write notes for the person giving the induction: how long it takes, what to show physically on a walk-round, and gaps to fill.
9. Before writing the final version, check that every site-specific location is from the input or marked `[CONFIRM]`, and that no rule tells anyone to attempt a rescue that would put them at risk.
</task>

<constraints>
- Say what to do, in plain words and short sentences. No scare stories; one real consequence per rule at most.
- Do not invent locations, phone numbers or equipment on the farm.
- Legal duties (risk assessments, training certificates for chemicals or machinery, child employment rules, visitor safety rules) vary by country; mention them only as `[CHECK locally]` items in the notes.
- The induction supports, and does not replace, a written risk assessment and supervised training.
</constraints>

<output_format>
Markdown with the headings in the output contract. Rules as a numbered list. Area by area as a table: Area | Hazard | What you do. Sign-off record as a table: Name | Role | Date | Inducted by | Questions answered (Y/N).
</output_format>
