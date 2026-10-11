---
schema: 1
id: plan-caesarean-recovery-at-home
kind: prompt
title: Plan caesarean recovery at home
description: Plans the first weeks at home after a caesarean, with home setup, help with lifting and older children, feeding positions, transport while not driving, a recovery log and warning signs.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [caesarean, c-section-recovery, household-help, wound-care, older-siblings]
pairs_with:
  prompts: [plan-postpartum-exercise-return, plan-labour-day-logistics, plan-meal-train-for-friend]
args:
  - name: situation
    description: Planned or emergency caesarean, the date (or "had it 4 days ago"), what the hospital told you about restrictions, wound care and medicines (copy it), home layout (stairs, bathroom, where the baby sleeps), older children, pets, who can help and when, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the hospital told you, Set up the home, Help you need, Feeding and handling the baby, Getting around, Recovery log, Call your midwife or doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan recovery after a caesarean the way a postnatal midwife would when sitting down with the family before discharge. A caesarean is major abdominal surgery followed immediately by looking after a newborn, and the practical gaps are predictable: nobody to lift the car seat or the toddler, a bathroom upstairs, a bed too low to get out of, pain medicine taken late, no one checking the wound, and driving or lifting restrictions people do not know how long last. Restrictions, wound care and timings come from the person's own hospital and differ between units and countries, so the plan copies them rather than inventing them. Emergency caesareans can also leave people shaken, which belongs in the plan too.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What the hospital told you: list restrictions, wound care, medicines and follow-up exactly as given, and a list of [ask your midwife] gaps (how long before lifting more than the baby, driving, bathing, exercise, when the dressing comes off, who checks the wound).
2. Set up the home: a living zone on one floor if possible with the essentials within reach (water, snacks, pain relief schedule as prescribed, nappy station, phone charger), a supportive chair or raised bed position, pillows for feeding and getting up, a night setup so the baby can be reached without twisting.
3. Help you need: a two-week table of who does lifting, older children, school runs, meals, laundry, pets, shopping, nights and appointments, using only the helpers and times they gave, with gaps marked.
4. Feeding and handling the baby: feeding positions that keep the baby off the wound (for example side-lying, rugby or football hold) described plainly, getting in and out of bed by rolling on the side, and asking the midwife or feeding specialist for hands-on help.
5. Getting around: transport to appointments while they cannot drive, and checking with their insurer and doctor before driving again.
6. Recovery log: a simple daily table to track pain relief taken as prescribed, wound check, temperature if advised, bleeding, bowel and bladder, mood and sleep, to show the midwife.
7. Call your midwife or doctor if: the warning signs, separated into "call today" and "emergency now".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Emergency now: heavy bleeding or large clots, chest pain or difficulty breathing, a swollen, red, painful calf, severe headache with vision changes, collapse, or thoughts of harming yourself or the baby. Call today: a wound that is red, hot, swelling, leaking or opening, fever, worsening abdominal pain, foul-smelling discharge, pain or burning when passing urine, or feeling very low or anxious.
- Never invent restrictions, timescales, doses or wound care steps; copy what the hospital gave and mark gaps as questions.
- If it was an emergency caesarean or they mention a frightening birth, add one kind line that a birth debrief and talking to the midwife or doctor about how they feel is available in many places.
- Assign helpers only within what they offered.
- No exercise programme; refer to their midwife or physiotherapist for returning to exercise.
</constraints>

<output_format>
## What the hospital told you
## Set up the home
Checklist.
## Help you need
Table: Task | Who | When | Gap?
## Feeding and handling the baby
## Getting around
## Recovery log
Table template.
## Call your midwife or doctor if
Two lists: Emergency now, Call today.
</output_format>
