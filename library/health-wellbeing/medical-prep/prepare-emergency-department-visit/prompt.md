---
schema: 1
id: prepare-emergency-department-visit
kind: prompt
title: Prepare for an emergency department visit
description: Helps someone heading to an emergency department decide how to get there, what to bring, how to describe the problem at triage, when to speak up while waiting and what to ask before leaving.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [checklist, script]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [emergency-room, urgent-care, triage, patient-advocacy, hospital-visit]
pairs_with:
  prompts: [choose-right-care-service, prepare-emergency-medical-summary, build-medication-list, practise-describing-symptoms]
  personas: [health-navigator]
args:
  - name: situation
    description: What is happening and who it is for, for example "my dad, 82, fell and his hip hurts, he has dementia", "I've had stomach pain on the right for 12 hours", "my daughter, 3, cut her chin".
    type: text
    required: true
  - name: who
    description: Who needs care.
    type: enum
    enum: [self, child, older-relative, someone-else]
    default: self
  - name: country
    description: Country, so the emergency number and terms (emergency department, A&E, ER) fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Go now or call, What to bring, What to say at triage, While you wait, Before you leave]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who has already decided to go to an emergency department, or is about to, get through it well. People are seen in order of clinical urgency, not arrival, after a short triage assessment, so the first two minutes matter: a clear one-sentence problem, when it started, whether it is getting worse, severity, and the facts that change risk (blood thinners, diabetes, pregnancy, recent surgery, immune suppression, allergies). Waits can be long, and the most important rule while waiting is that if the person gets worse or develops a new symptom, staff must be told immediately, not at the end of the wait. Leaving without telling staff is risky. Bringing medicines (or the boxes), a list of conditions, ID and insurance details if relevant, a phone charger, glasses and hearing aids, and someone who knows the patient's normal state (crucial for older people with dementia and young children) saves time and errors. Some situations should not go by car at all: possible heart attack, stroke, severe breathing difficulty, heavy bleeding, collapse, or a seriously injured person who should not be moved.

Situation: {{situation}}
Who: {{who}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Go now or call: if the situation includes chest pain, stroke signs (face drooping, arm weakness, slurred speech), severe difficulty breathing, heavy bleeding, collapse or unresponsiveness, a seizure that does not stop, a severe allergic reaction, a possible overdose or poisoning, self-harm or thoughts of acting on suicide, or a serious injury to the head, neck or back, tell them to call the emergency number now (name it for their country if given and you are confident; the local emergency number works everywhere) rather than drive, with one or two immediate actions. Otherwise, say not to drive themselves if they are unwell, dizzy or in severe pain, and to arrange a lift or taxi.
2. What to bring: a short checklist tailored to {{who}}: medicines or boxes, conditions and allergies, ID and insurance or health card, phone and charger, glasses and hearing aids, any advance care plan, a contact person's number, and for a child a comfort item and their health record. Add: do not eat or drink if surgery or sedation might be needed (for example abdominal pain or a possible fracture), unless staff say otherwise; ask at triage.
3. What to say at triage: a fill-in script from {{situation}}: the main problem in one sentence, when it started, whether it is getting worse, severity 0 to 10, other symptoms, key medicines (especially blood thinners) and conditions, allergies, pregnancy possibility, and for someone who cannot speak for themselves, how this differs from their normal. Use [placeholders] for missing facts.
4. While you wait: tell staff immediately about worsening or new symptoms (give examples relevant to the situation), ask before eating, drinking or taking painkillers, keep a short note of times and changes, and do not leave without telling staff.
5. Before you leave: questions to ask: what was found or ruled out, what to watch for and when to come back, any new medicines and how to take them, follow-up appointments and who arranges them, a written discharge summary, and fitness for work, school or driving.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- If anything in the situation sounds immediately life-threatening, the call-now instruction is the first line of the reply, before anything else.
- Do not diagnose, estimate how serious it is, or predict wait times.
- Do not suggest medicines or doses to take before or while waiting.
- Keep it short; the person may be reading on a phone in a hurry.
</constraints>

<output_format>
## Go now or call
## What to bring
Checklist.
## What to say at triage
Fill-in script.
## While you wait
## Before you leave
</output_format>
