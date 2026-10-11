---
schema: 1
id: prepare-pets-for-new-baby
kind: prompt
title: Prepare pets for a new baby
description: Plans getting a dog, cat or other pet ready for a new baby, with routine changes to start early, the first introduction, supervision rules, hygiene in pregnancy and when to call a trainer.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [dogs, cats, pet-behaviour, baby-safety, household-prep]
pairs_with:
  prompts: [prepare-for-new-baby, train-dog-behavior]
args:
  - name: pets
    description: Each pet's species, age, size and temperament, how they react to children, visitors, noise and being handled, where they sleep and walk now, who looks after them, and any growling, snapping, guarding or anxiety.
    type: text
    required: true
  - name: timeline
    description: Due date or baby's age, home layout (stairs, gates, garden), and who will care for the pets during the birth. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Watch-outs first, Changes to start now, During the birth, The first introduction, House rules with the baby, Hygiene in pregnancy and with a baby, Get a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare pets for a baby the way a qualified behaviourist who works with families would. What experts know: most bites to young children come from the family's own dog, often a dog described as "great with kids", in moments with no adult watching; changes to routine (less attention, new walking times, new rooms off-limits) cause more stress than the baby itself, so they should start weeks or months before, not on the day home; dogs need a retreat space the baby cannot reach; and a pet should never be alone with a baby, however gentle. For pregnancy, handling cat litter and raw pet food carries infection risks that are usually managed by someone else doing it or using gloves and washing hands, which is worth confirming with the midwife or doctor.

<pets>
{{pets}}
</pets>
{{#timeline}}
<timeline>
{{timeline}}
</timeline>
{{/timeline}}
</context>

<task>
1. Watch-outs first: anything in the description that already needs a professional before the baby arrives (growling or snapping at people, resource guarding, fear of children, a dog that has bitten), stated plainly.
2. Changes to start now: routine changes phased in by week before the due date (walk times, who feeds, rooms and furniture off-limits, gates, a quiet retreat space, getting used to baby sounds and smells, walking calmly next to a pram), each with how to reward calm behaviour.
3. During the birth: who cares for the pets, a key and instructions, and bringing home something with the baby's smell if they want.
4. The first introduction: a calm, step-by-step plan for the day home and the first week, with the pet greeting the parent first, controlled distance, short sessions and lots of rewards, and stopping if the pet is stressed.
5. House rules with the baby: always supervised or separated (gate, crate, closed door), never alone together even for a moment, pets out of the baby's sleep space, feeding and toys out of reach, body language signs of stress to watch (lip licking, yawning, turning away, whale eye, stiffening, leaving) and what to do.
6. Hygiene in pregnancy and with a baby: litter tray, raw food, worming and flea treatment, handwashing, and to ask the vet about the pet's health checks and the midwife or doctor about pregnancy-specific precautions.
7. Get a professional if: signs that mean calling a qualified behaviourist or trainer who uses reward-based methods, or the vet (sudden behaviour change can be pain).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say a pet can be left alone with a baby or that a breed is safe or unsafe in itself.
- Do not recommend punishment-based training, shock or prong collars, or rehoming as a first resort; if there are serious safety concerns, say separation now and a qualified professional, and that rehoming is a decision some families face.
- Give no medication doses for pets or people.
- If a pet has already injured the baby or anyone, say to get medical care for the injury first and keep them separated.
- Tailor to the species and temperament given; do not pad with advice for animals they do not have.
</constraints>

<output_format>
## Watch-outs first
## Changes to start now
Table: Weeks before due | Change | How to reward calm.
## During the birth
## The first introduction
## House rules with the baby
## Hygiene in pregnancy and with a baby
## Get a professional if
</output_format>
