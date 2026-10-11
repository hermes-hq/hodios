---
schema: 1
id: prepare-for-home-birth
kind: prompt
title: Prepare for a home birth
description: Prepares a household for a planned home birth with the midwife team, covering the space and supplies, access for midwives, children and pets, a transfer-to-hospital plan and questions for the midwife.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [home-birth, midwife, transfer-plan, birth-pool, household-prep]
pairs_with:
  prompts: [write-birth-preferences, write-birth-partner-guide, plan-labour-day-logistics]
args:
  - name: situation
    description: Your midwife team or service and what they have agreed, how far you are from the hospital, the home (floors, stairs, parking, access at night, where you want to labour), a birth pool if planned, older children, pets, who will be there, and the country.
    type: text
    required: true
  - name: midwife_list
    description: The supply list or instructions your midwife gave you, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Agreed with your midwife, The space, Supplies, Access and the night of labour, Children and pets, Transfer plan, Questions for your midwife]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare for a planned home birth the way a community midwife does at the home visit. Home birth is a plan agreed with a midwife team, who bring the clinical equipment and decide with the family if transfer is needed; the household's job is the space, supplies, access and a transfer plan that has been thought through calmly in advance. What gets missed: a house number nobody can see at night, a car parked across the drive, a birth pool filled too early or a floor that cannot take its weight, no plan for a toddler waking at 3am, and a transfer bag nobody packed. Home birth availability and what midwives bring differ a lot by country and service.

<situation>
{{situation}}
</situation>
{{#midwife_list}}
<midwife_list>
{{midwife_list}}
</midwife_list>
{{/midwife_list}}
</context>

<task>
1. Agreed with your midwife: restate what the midwife team has agreed and list what is not yet confirmed (when to call, who comes, what they bring, the criteria for transfer, how long to the hospital) as questions.
2. The space: the room for labour and birth, floor protection, warmth, lighting, a clear path, a bathroom nearby, and if there is a pool: floor load and location as things to check with the midwife or pool guidance, water supply and hose, and filling time.
3. Supplies: the midwife's own list if given, copied exactly, otherwise a typical household list (old towels and sheets, waterproof covers, bin bags, pads, snacks and drinks, a torch, phone chargers, clothes and nappies for the baby) marked "check with your midwife".
4. Access and the night of labour: house number visible, outside light, parking for two cars, gate and door unlocked when midwives are on their way, pets shut away, and who opens the door.
5. Children and pets: whether older children will be present or cared for elsewhere, a carer and backup, and pet arrangements.
6. Transfer plan: a packed transfer bag, the route and time to the hospital, car or ambulance depending on what the midwife decides, who goes and who stays with children, and that transfer is a common, sensible part of home birth plans.
7. Questions for your midwife: 6 to 8 focused questions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend for or against home birth or comment on whether it is safe for them; that is a decision with their midwife or doctor who knows their history.
- Never describe how to give birth without a midwife. If the baby is coming before the midwife arrives, call emergency services and follow their instructions.
- Call the midwife team or emergency services straight away for bleeding, green or brown waters, reduced baby movements, constant severe pain, fever, severe headache or vision changes; state these clearly.
- Do not invent the midwife's equipment or criteria for transfer; mark as questions.
- No brand recommendations for pools or supplies.
</constraints>

<output_format>
## Agreed with your midwife
## The space
## Supplies
Checklist.
## Access and the night of labour
## Children and pets
## Transfer plan
## Questions for your midwife
</output_format>
