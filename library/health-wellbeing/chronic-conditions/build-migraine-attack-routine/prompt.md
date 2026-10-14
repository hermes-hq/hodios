---
schema: 1
id: build-migraine-attack-routine
kind: prompt
title: Build a migraine attack routine
description: Builds a step-by-step routine for migraine attacks from the person's own treatment plan, with an attack kit, work and home set-up, a log of acute medicine days, and red flags that need urgent care.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [migraine, headache, attack-plan, medication-overuse, headache-diary]
pairs_with:
  prompts: [explore-flare-triggers, plan-flare-day-logistics, set-up-medication-routine]
args:
  - name: attacks
    description: What your attacks are like (warning signs, aura, how fast they build, how long they last, nausea or light sensitivity), how often you get them, and what you do now.
    type: text
    required: true
  - name: treatment
    description: The acute and preventive treatment your doctor has prescribed or recommended and how they told you to use it, copied as written. Say if you have no plan yet.
    type: text
    required: true
  - name: life
    description: Work or school, commute, caring responsibilities, and where attacks hit hardest. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get urgent help if, Your treatment plan, The attack routine, The attack kit, At work or school, Counting medicine days, Questions for your doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with diagnosed migraine handle attacks with a plan instead of improvising in pain. Headache specialists generally advise taking acute treatment early in an attack, as prescribed, because many treatments work less well once the attack is established; people often wait "to see if it gets bad" and lose the window. A practical routine includes recognising warning signs, acting on the prescribed plan, getting to a dark, quiet, cool place, managing nausea as advised, fluids and food as tolerated, and a gradual return. People who use acute medicines on many days a month risk medication overuse headache, where frequent use itself makes headaches more frequent; international headache criteria use thresholds of about 10 or 15 days a month depending on the type of medicine, so counting acute medicine days and sharing the count with the doctor matters. Some headaches are not migraine and need urgent care.

<attacks>
{{attacks}}
</attacks>

<treatment>
{{treatment}}
</treatment>
{{#life}}
<life>
{{life}}
</life>
{{/life}}
</context>

<task>
1. Get urgent help if: a sudden severe "thunderclap" headache, the worst headache of their life, headache with fever and stiff neck or rash, new weakness, numbness, confusion, speech or vision loss that is different from their usual aura, headache after a head injury, a new pattern after age 50, or an attack that is very different from usual. Put this first.
2. Your treatment plan: copy their prescribed acute and preventive instructions exactly. If there is none, say so, suggest seeing a doctor for a plan, and do not supply one.
3. The attack routine: numbered stages from early warning to recovery, each using only their prescribed treatment plus non-medicine steps.
4. The attack kit: what to keep at home, at work or school, and in a bag (their prescribed medicines in date, sunglasses or eye mask, earplugs, cold or warm pack, water, plain snacks, sick bags, phone charger).
5. At work or school: a plan for leaving or resting, what to tell a manager or teacher if they choose, travel home safely (not driving during aura or if medicines cause drowsiness), and adjustments to ask about.
6. Counting medicine days: a simple monthly table to count days with acute medicine, explaining why the count matters and that the doctor decides what it means.
7. Questions for your doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend a medicine, dose, combination or timing beyond what their doctor prescribed or wrote down.
- Do not diagnose the type of headache or reassure that a new or changed headache is "just a migraine".
- Do not state the overuse thresholds as a personal limit; present them as a reason to count and discuss.
- Keep the routine short enough to follow during an attack.
</constraints>

<output_format>
## Get urgent help if
## Your treatment plan
## The attack routine
Numbered.
## The attack kit
Checklist.
## At work or school
## Counting medicine days
Table: Month | Days with acute medicine | Which medicine | Notes.
## Questions for your doctor
</output_format>
