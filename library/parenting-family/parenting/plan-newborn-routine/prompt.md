---
schema: 1
id: plan-newborn-routine
kind: prompt
title: Plan a newborn routine
description: Plans a flexible newborn routine around feeding, sleep and parents' rest, with a night shift plan, safe sleep basics and what to raise with the health visitor or paediatrician.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newborn, baby-sleep, feeding, safe-sleep, postpartum, new-parents]
pairs_with:
  prompts: [prepare-for-new-baby, build-care-rota, plan-child-bedtime-routine]
  personas: [parenting-coach]
args:
  - name: baby_age_weeks
    description: The baby's age in weeks (for a premature baby, also give weeks of prematurity).
    type: number
    required: true
  - name: feeding
    description: How the baby is fed, for example "breastfed", "formula", "combination", "expressing and bottle". Optional.
    type: string
  - name: support
    description: Who is around and when, for example "partner home for two more weeks, then back at work 8 to 6; my mum visits Tuesdays", older children, and anything that makes rest hard. Optional.
    type: text
output_contract:
  format: markdown
  sections: [First, What to expect at this age, A flexible day, Nights and rest for the adults, Feeding notes, Safe sleep checklist, Signs things are on track, Raise at your next check, Get help now if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new parents find a rhythm in the first months. Newborns do not keep a clock schedule: in the early weeks they feed often (commonly 8–12 times in 24 hours for breastfed babies), stay awake only a short time between sleeps, and have not yet developed day–night rhythms, which usually begin to settle from around 6–12 weeks. A good newborn "routine" is therefore a loose, repeating pattern (feed, a little awake time, sleep) plus day–night cues, built around the parents getting protected blocks of sleep. Strict schedules and formal sleep training are not recommended for young babies. Safe sleep matters at every sleep, day and night.

Baby's age: {{baby_age_weeks}} weeks
{{#feeding}}Feeding: {{feeding}}{{/feeding}}
{{#support}}Support: {{support}}{{/support}}
</context>

<task>
1. First: if anything in the request suggests the baby is unwell (see "Get help now if"), say what to do before anything else.
2. What to expect at this age: in three or four bullets, typical feeding frequency, awake time, total sleep, and what is normal but surprising (cluster feeding in the evening, noisy sleep, growth spurts). Correct for prematurity if given.
3. A flexible day: a sample 24-hour rhythm as a table of blocks rather than exact times, with the feed–awake–sleep pattern, simple day cues (daylight, normal household noise, a short walk) and night cues (dim light, quiet, minimal talking at night feeds, nappy changes only when needed).
4. Nights and rest for the adults: a shift plan that fits the support described, aiming for each adult to get one protected block of four to five hours where possible. Adapt for breastfeeding (a partner can do settling, nappies and bringing the baby; expressed milk or a later feed by the partner if the parent wishes), for a single parent (nap-when-possible strategies, asking named helpers for specific tasks), and for older siblings.
5. Feeding notes: practical points for the feeding method given: responsive feeding, feeding cues, and where to get feeding help early (a midwife, health visitor, lactation consultant or infant feeding team). Do not give formula quantities or medical feeding plans beyond typical ranges labelled "check with your health visitor or doctor".
6. Safe sleep checklist: baby on their back for every sleep; a firm, flat, waterproof mattress in their own cot, crib or Moses basket; nothing in the sleep space (no pillows, bumpers, loose blankets or soft toys); room-sharing for the first six months; not overheating; a smoke-free home; never sleeping with the baby on a sofa or armchair; car seats, swings and bouncers not used for routine sleep outside the car; slings worn so the baby's face is visible and airway clear. Exhausted parents often fall asleep feeding in bed: say plainly that the baby's own sleep space is safest, that national guidance differs on bed-sharing (check yours), and that sharing a bed is especially dangerous with a smoker, alcohol, drugs or sedating medicine, extreme tiredness or a premature or low-birthweight baby; if it might happen, clear pillows and duvets away from the baby beforehand.
7. Signs things are on track: wet and dirty nappies, weight checks, alert periods, and feeding that settles the baby; give typical signs and say the health visitor or doctor confirms.
8. Raise at your next check: a short list based on what the user described, plus how the parents themselves are coping, including signs of postnatal depression or anxiety in either parent.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Get help now if (state these clearly and lead with any that apply): in babies under three months, a temperature of 38°C (100.4°F) or higher; breathing difficulty, grunting or pauses in breathing; blue, grey or very pale skin; floppiness, unusual drowsiness or being hard to wake; refusing feeds or far fewer wet nappies; a high-pitched or weak cry; yellow skin with poor feeding or sleepiness; vomiting green; a rash that does not fade under pressure. Tell them to call their local emergency number or urgent medical advice line.
- If a parent mentions thoughts of harming themselves or the baby, or feeling unable to cope, respond kindly and point to urgent help (their doctor, a crisis line or emergency services); if they feel overwhelmed by crying, say to put the baby down safely in the cot and step away for a few minutes. Never shake a baby.
- No strict feeding or sleep schedules for babies under about four months, and no formal sleep training advice; explain gently if asked.
- No brand or product recommendations.
- Plain, reassuring language; tired parents read on phones at 3am, so keep it scannable.
</constraints>

<output_format>
## First
One line, or the urgent steps.
## What to expect at this age
## A flexible day
Table: Block | Baby | Adults.
## Nights and rest for the adults
Table: Time | Who is on | Who sleeps.
## Feeding notes
## Safe sleep checklist
## Signs things are on track
## Raise at your next check
## Get help now if
</output_format>
