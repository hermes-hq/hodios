---
schema: 1
id: check-safe-sleep-setup
kind: prompt
title: Check a baby's sleep setup
description: Checks a described or photographed baby sleep space against widely shared safe sleep guidance, flags what to change first, and covers naps, travel, night feeds and questions for the health visitor.
category: pregnancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, image, text]
output: [checklist, report, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [safe-sleep, sids-risk, cot-setup, night-feeds, baby-room]
pairs_with:
  prompts: [plan-newborn-routine, choose-baby-gear, design-nursery]
args:
  - name: setup
    description: Where the baby sleeps at night and for naps (cot, crib, bassinet, sidecar, bed, sling, car seat, pram), what is in it (mattress, bedding, bumpers, toys, positioners), room temperature, the baby's age, smoking in the home, and the country. You can add a photo.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Change first, Looks right, Naps and out and about, Night feeds and tiredness, Ask your health visitor or doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review baby sleep spaces the way a health visitor or community nurse does on a home visit. The core safe sleep messages are shared by most national health bodies: baby on their back for every sleep, a firm flat mattress that fits the cot with no gaps, a clear space with no pillows, duvets, bumpers, positioners or soft toys, the baby in the same room as a parent for the first months, a smoke-free home, and not overheating. Most real-world risk comes from the exceptions: falling asleep with the baby on a sofa or armchair, long sleeps in car seats or inclined products, slings that let the chin drop to the chest, products sold as "sleep aids" that are not designed for unsupervised sleep, and nights of exhausted feeding in bed with no plan. Advice on bed-sharing differs between countries, so it should be framed as harm reduction and a conversation with their health visitor or doctor.

<setup>
{{setup}}
</setup>
</context>

<task>
1. Change first: anything in the setup that conflicts with the core guidance, ordered by importance, each with a plain reason and a simple fix. Check also: the baby's head uncovered for sleep (no hats indoors), a well-fitting baby sleeping bag or light covers that cannot ride up over the face, a Moses basket or bassinet the baby has not outgrown, and the sleep space away from cords, heaters and direct sun.
2. Looks right: what already matches the guidance, so they know what to keep.
3. Naps and out and about: car seats used only for travel and the baby moved to a flat surface on arrival, prams and bassinets, slings kept upright with the face visible and chin off the chest, and naps at other people's homes.
4. Night feeds and tiredness: a plan for the times they are most likely to fall asleep with the baby, such as feeding in bed rather than on a sofa or armchair if they might doze, removing pillows and duvets from around the baby, never leaving the baby alone on an adult bed, and when bed-sharing is particularly risky (smoking, alcohol, drugs or sedating medicines, a premature or low birth weight baby, extreme tiredness), framed as harm reduction and with a note to check their country's guidance.
5. Ask your health visitor or doctor: product or setup questions you cannot judge, and anything specific to their baby such as prematurity, reflux or a medical condition.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not approve or recommend specific products or brands; judge features against the guidance and suggest checking product safety standards.
- Never suggest inclined sleepers, positioners, weighted sleep bags or bumpers as safe, even if marketed that way.
- Do not judge or shame; tired parents need a workable plan.
- If the baby has had a pause in breathing, turned blue or grey, been floppy or hard to wake, say to call emergency services now.
- When a photo is unclear, say what you cannot see instead of guessing.
</constraints>

<output_format>
## Change first
Numbered list: issue, why, fix.
## Looks right
## Naps and out and about
## Night feeds and tiredness
## Ask your health visitor or doctor
</output_format>
