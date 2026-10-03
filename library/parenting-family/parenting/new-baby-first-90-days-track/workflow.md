---
schema: 1
id: new-baby-first-90-days-track
kind: workflow
title: First 90 days with a new baby
description: Guides new parents through the first twelve weeks in gated stages, from coming home, feeding and sleep logs, visitors and appointments to recovery and the return-to-work plan.
category: parenting
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table, message]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [newborn, fourth-trimester, postpartum-recovery, feeding-log, safe-sleep, return-to-work, new-parents]
pairs_with:
  prompts: [prepare-for-new-baby, plan-newborn-routine, check-in-on-new-parent-wellbeing, build-care-rota]
  personas: [parenting-coach]
args:
  - name: due_or_birth_date
    description: The baby's birth date, or the due date if the baby has not arrived yet, for example "born 2 March" or "due 18 May". Say if the baby was born early and by how many weeks.
    type: string
    required: true
  - name: country
    description: The country you live in, so appointments, registrations, leave and health services can be matched to the local system (for example "Germany", "Ontario, Canada").
    type: string
    required: true
  - name: household
    description: Who is at home and who can help, for example "two parents, partner has 2 weeks of leave, a 3-year-old, grandma 20 minutes away", plus anything that makes things harder (a caesarean, twins, a long commute). Optional.
    type: text
  - name: feeding_plan
    description: How you plan to feed the baby. Use undecided if you are still choosing or it is not going as planned.
    type: enum
    enum: [breast, formula, mixed, undecided]
    default: undecided
steps:
  - {id: coming-home, file: steps/01-coming-home.md, stage: plan, gate: approve}
  - {id: feeding-and-sleep, file: steps/02-feeding-and-sleep.md, stage: operate, gate: approve}
  - {id: visitors-and-appointments, file: steps/03-visitors-and-appointments.md, stage: plan, gate: approve}
  - {id: parent-recovery, file: steps/04-parent-recovery.md, stage: operate, gate: approve}
  - {id: return-to-work, file: steps/05-return-to-work.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Walks new parents through the first twelve weeks one stage at a time, the way a midwife, a health visitor and a friend who did it recently would. Each stage produces one scannable plan a tired parent can read on a phone at 3am, then a short checkpoint.

Birth or due date: {{due_or_birth_date}}
Country: {{country}}
Feeding plan: {{feeding_plan}}
{{#household}}
<household>
{{household}}
</household>
{{/household}}

{{> guardrails/professional-limits}}

Rules for every stage:
- Say which week the baby is in (corrected age if premature). If not born yet, plan ahead and mark what to revisit.
- Red flags first. Baby: under three months with a temperature of 38°C / 100.4°F or more; breathing difficulty or pauses; blue, grey or very pale skin; floppy or hard to wake; refusing feeds or far fewer wet nappies; a rash that does not fade under pressure; green vomit. Parent: heavy bleeding or large clots, fever, chest pain or breathlessness, a painful swollen calf, severe headache or vision changes, thoughts of harming themselves or the baby. If any appear, say to call the local emergency number or urgent medical line now, and stop the stage.
- Safe sleep every stage: on the back, own clear flat sleep space, parents' room; never asleep with the baby on a sofa or armchair.
- Appointments, vaccinations, registration, leave and benefits differ by country: give what is usual in {{country}} as an assumption and say who confirms it. Never invent dates, amounts or numbers.
- No strict schedules, no sleep training, no brands, no medicine doses.
- Ask missing facts in one short batch, state assumptions, carry on.
- Keep a running "Ask at your next check" list.
- Checkpoint: ask in one line each how feeding, sleep (baby and each adult) and each parent's mood went, adjust the next stage, and stop for approval.
