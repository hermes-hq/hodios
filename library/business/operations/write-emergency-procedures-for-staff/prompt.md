---
schema: 1
id: write-emergency-procedures-for-staff
kind: prompt
title: Write staff emergency procedures
description: Writes staff emergency procedures for a small workplace - fire, injury or illness, power cut, robbery, severe weather and more - with roles, contacts, assembly points and a drill plan.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [operations-manager, manager, founder]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [emergency-procedures, fire-evacuation, first-aid, robbery, severe-weather, workplace-safety, drills]
pairs_with:
  prompts: [plan-business-continuity, write-toolbox-talk, write-opening-closing-checklist]
args:
  - name: workplace
    description: The workplace - type, layout and floors, exits, number of staff and typical number of customers or visitors, people who may need help to evacuate, first aiders, alarm and extinguisher locations, cash on site, and the hazards you know of.
    type: text
    required: true
  - name: location
    description: Country and region, for local emergency numbers and the kinds of severe weather to plan for.
    type: string
output_contract:
  format: markdown
  sections: [Emergency contacts, Roles, Procedures, Quick-reference card, Drills and training, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write emergency procedures for small workplaces: shops, cafes, clinics, offices, workshops. In an emergency people do what they have practised, so procedures must be short, in the order actions happen, and posted where staff will see them. Each one answers: what do I do first, who calls for help, how do we get everyone out or keep them safe, who is in charge, and what happens after. The procedures support, and never replace, the workplace's fire risk assessment and any legal duties, which differ by country.
</context>

<task>
Write staff emergency procedures.

<workplace>
{{workplace}}
</workplace>
{{#location}}Location: {{location}}{{/location}}

1. Emergency contacts: the local emergency number for the location (if no location is given or you are not certain of the number, write `[CONFIRM: local emergency number]`), plus placeholders for the building manager, alarm company, utilities, the owner and the nearest hospital.
2. Roles: who is in charge on each shift (by role, with a deputy), fire wardens or sweepers, first aiders, who calls emergency services, who takes the visitor list or bookings to the assembly point, and who helps anyone who needs assistance to evacuate.
3. Procedures, each as numbered steps of one action, in the order they happen:
   - Fire or alarm: raise the alarm, evacuate by the nearest safe exit, do not use lifts, do not collect belongings, sweep if safe, assembly point, roll call, do not re-enter until the fire service says so. Only use an extinguisher if trained and the fire is small with a clear exit behind you.
   - Injury or sudden illness: make the area safe, call for a first aider and emergency services when needed, do not move the casualty unless in danger, record the incident.
   - Power cut: safety lighting, customers, tills and card payments, fridges and freezers, when to close.
   - Robbery or threat: comply, do not resist or chase, note descriptions when safe, call the police after, lock up, preserve the scene, support staff.
   - Severe weather relevant to the location (for example storm, flood, extreme heat, snow, earthquake; if no location is given, cover the two most common and mark the rest `[CHECK: local hazards]`): when to close, shelter or evacuate.
   - Any other emergency the workplace description suggests (gas leak, chemical spill, aggressive customer, missing child, bomb threat).
4. A one-page quick-reference card to post by the till or staff area.
5. Drills and training: what new staff learn on day one, drill frequency marked `[CHECK]`, and a short post-drill review.
</task>

<constraints>
- Life safety first in every procedure: people before property, stock or cash.
- Do not state legal duties, drill frequencies or equipment requirements as fact; mark them `[CHECK: …]` and say to confirm against the fire risk assessment, the local fire authority or the workplace safety regulator.
- Include people who need help to evacuate (wheelchair users, people with hearing or vision impairments, children) with a named plan, not a general mention.
- Plain language a new or temporary staff member can follow under stress. Each procedure under about 120 words.
- If the workplace description reveals a current hazard (blocked fire exit, no alarm, locked emergency door), list it first under Questions to confirm as something to fix now.
</constraints>

<output_format>
## Emergency contacts
Table: Who | Number.
## Roles
Table: Role | Who (by job title) | Deputy | Duties.
## Procedures
One subsection per emergency, numbered steps.
## Quick-reference card
A compact block, under 150 words.
## Drills and training
## Questions to confirm
Numbered: hazards to fix now first, then every `[CONFIRM]` and `[CHECK]` item.
</output_format>
