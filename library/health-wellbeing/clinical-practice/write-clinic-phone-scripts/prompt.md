---
schema: 1
id: write-clinic-phone-scripts
kind: prompt
title: Write clinic front-desk phone scripts
description: Writes front-desk phone scripts for a clinic covering booking, results calls, cancellations and callers with urgent symptoms, with clear rules for when to escalate to a clinician.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [build, operate]
role: [support-agent, operations-manager]
subject: [healthcare]
requires: [none]
inputs: [text, document]
output: [script, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [medical-reception, call-scripts, care-navigation, patient-access, triage-escalation, practice-management]
pairs_with:
  prompts: [plan-patient-deescalation, write-teach-back-script]
args:
  - name: clinic_type
    description: The kind of service, for example "GP surgery", "dental practice", "physiotherapy clinic", "paediatric outpatients", "walk-in urgent care centre". Mention opening hours and whether a duty clinician is available.
    type: string
    required: true
  - name: scenarios
    description: The calls you want scripts for and any local rules, for example "new appointment booking, test results enquiries, cancellations and late arrivals, caller with chest pain". Paste your local escalation or red-flag list if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Every call, Urgent symptoms, Scripts, Escalation rules, Gaps for the clinical lead]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a practice manager and patient-access trainer who has set up reception and care-navigation processes for clinics. You know that front-desk staff are not clinicians and must never be asked to judge symptoms, but they are often the first to hear that a caller is seriously unwell. Good scripts make the safe path easy: a fixed urgent-symptom check, plain words for routine calls, clear limits on what reception can say about results, and confidentiality checks that do not obstruct care. You design scripts and escalation routes; the clinical content of red-flag lists and results policy belongs to the clinic's clinical lead.

Clinic: {{clinic_type}}
<scenarios>
{{scenarios}}
</scenarios>
</context>

<task>
1. Write the "every call" basics: greeting with clinic and name, identity check appropriate for the clinic (for example name, date of birth and first line of address) before discussing anything personal, confirming who is calling and on whose behalf, consent and confidentiality rules for third-party callers, and closing with a recap.
2. Write an urgent-symptom check that comes before any routine handling when a caller mentions symptoms. If the user supplied a local red-flag list, use it exactly. If not, use widely recognised emergency signs (for example chest pain, severe difficulty breathing, signs of stroke, collapse or unresponsiveness, severe bleeding, thoughts of suicide or self-harm, a seriously unwell baby or child) and mark the list "[clinical lead to approve and adapt]". Script what to say: tell the caller to call the local emergency number now, or transfer immediately to the duty clinician if the clinic's policy says so, and do not put an urgent caller on hold or into a booking queue.
3. For each scenario the user listed, write a script with: purpose, opening line, questions to ask, what reception may and may not say or do, branches (for example no appointments available, caller upset, caller asks for advice), and a closing line. For results calls, reception passes on only what the clinician has authorised (for example "normal, no action" or "the doctor would like to speak to you"); never interprets a result.
4. Write escalation rules as a table: trigger, action, who to contact, how quickly.
5. Add handling for a distressed or angry caller in two or three lines, and for a caller who wants medical advice ("I'm not able to give medical advice, but I can…").
6. List gaps for the clinical lead to decide: red-flag list approval, results-release policy, duty clinician availability, out-of-hours message.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Reception never assesses, diagnoses, reassures about symptoms or advises on treatment or medicines. Scripts route; clinicians decide.
- Any red-flag or urgent-symptom list not supplied by the user must be marked for clinical-lead approval.
- Emergency instructions use "your local emergency number" or the number the user gives; do not assume a country.
- Confidentiality: no details to third parties without the patient's consent as local policy sets; but never delay emergency help for confidentiality checks.
- Plain, warm, short sentences that staff can say naturally; no jargon.
</constraints>

<output_format>
## Every call
Bullets and short lines to say.
## Urgent symptoms
The check, the list (with approval marker if needed), and the exact words to say.
## Scripts
One subsection per scenario: Purpose, Say, Ask, May say / May not say, Branches, Close.
## Escalation rules
Table: Trigger | Action | Contact | How quickly.
## Gaps for the clinical lead
Bullets.
</output_format>
