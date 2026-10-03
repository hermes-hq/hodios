---
schema: 1
id: write-referral-letter
kind: prompt
title: Write a referral letter
description: Writes a clear referral letter from a clinician's notes, leading with the question for the specialist, then relevant history, findings, medicines, allergies and urgency.
category: clinical-practice
version: 1.0.1
status: incubating
stage: [operate]
subject: [healthcare, medicine]
requires: [none]
inputs: [notes, text]
output: [message, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: expert
tags: [referral-letter, clinical-correspondence, primary-care, specialist-referral, care-transitions, secondary-care]
pairs_with:
  prompts: [summarize-patient-records, write-letter-of-medical-necessity, rewrite-clinic-letter-for-patient, structure-soap-note]
args:
  - name: clinician_notes
    description: Your notes on the patient and why you are referring, including history, examination, results, medicines and allergies as you have them. De-identify first; add identifiers in your own system afterwards.
    type: text
    required: true
  - name: specialty
    description: The service you are referring to, for example "cardiology", "rheumatology", "community mental health team", "paediatric speech and language therapy".
    type: string
    required: true
  - name: urgency
    description: How soon you are asking to be seen. routine = standard wait, soon = expedited, urgent = urgent or suspected-cancer pathway. Use your local pathway for true emergencies, not a letter.
    type: enum
    enum: [routine, soon, urgent]
    default: routine
output_contract:
  format: markdown
  sections: [Referral letter, Not in the notes, Before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pairs with the SOAP note prompt."}
---
<context>
You write referral letters the way experienced generalists do and specialists wish everyone did. Specialists triage dozens of letters a day: a letter that opens with a specific question, gives the relevant facts in a predictable order and states the urgency with a reason gets the patient to the right clinic faster. A letter that buries the question in a page of history gets bounced or downgraded. You write from the referring clinician's notes only; the clinical reasoning is theirs.

<clinician_notes>
{{clinician_notes}}
</clinician_notes>
Referring to: {{specialty}}
Urgency requested: {{urgency}}
</context>

<task>
1. Find the referral question in the notes: what the clinician wants from the specialist (diagnosis, investigation, a procedure, management advice, shared care, a second opinion). Write it as one or two direct sentences that open the letter. If the notes give no clear question, write "[Referral question not stated: what do you want the specialist to do?]" and still draft the rest.
2. State the urgency in plain words with the clinical reason from the notes ("Urgent: weight loss of 6 kg in 3 months with iron-deficiency anaemia"). If the notes do not support the urgency chosen, keep it and flag it under Before sending; do not change it.
3. Lay out the body in this order, using only facts from the notes, keeping each section short:
   - History of the presenting problem: onset, course, key symptoms, what has been tried and with what effect.
   - Relevant past history and social context that changes management (frailty, carers, occupation, interpreter needed, capacity concerns).
   - Examination findings and results with dates and units.
   - Current medicines with doses as written, recent changes, and allergies with the reaction if stated.
   - What the patient knows and wants: whether they agree to the referral, their main concern, any access needs.
4. Close with what the referrer will do meanwhile and how to reach them, using a placeholder for contact details.
5. Tailor emphasis to the specialty: what that service always needs to triage (for example a recent ECG for cardiology, inflammatory markers for rheumatology, a risk summary for mental health). Use that list only to flag gaps.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This prompt is for clinicians writing their own referrals. Never add a symptom, finding, result, diagnosis, medicine, dose or allergy that is not in the notes. Never write "no allergies" unless the notes say so.
- Copy numbers, units, dates, medicine names and doses exactly.
- Keep the letter to one page: about 250 to 400 words in the body. Cut history that does not bear on the question.
- Use placeholders in square brackets for patient identifiers, referrer details and anything missing: [Patient name, DOB, ID], [Referrer name and contact].
- If the notes describe a patient who needs same-day emergency care (for example suspected stroke, sepsis, cauda equina), put one line above everything telling the clinician to use the emergency pathway now rather than a letter, then draft the letter.
- Plain, courteous, clinical tone. No padding such as "I would be most grateful if you could kindly see".
</constraints>

<output_format>
## Referral letter
Addressed to the {{specialty}} service, with: Referral question, Urgency and reason, History, Past history and context, Findings and results, Medicines and allergies, Patient's view, Meanwhile and contact.
## Not in the notes
Bullets, "Add: …", starting with what this specialty needs to triage.
## Before sending
Three to five checks, including any mismatch between the urgency chosen and the facts.
</output_format>

<examples>
Opening for a rheumatology referral: "Referral question: Please assess for inflammatory arthritis and advise on starting treatment. Urgency: soon, because of 8 weeks of symmetrical small-joint swelling with morning stiffness over an hour and a raised CRP of 34."
</examples>
