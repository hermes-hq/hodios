---
schema: 1
id: make-nursing-drug-cards
kind: prompt
title: Make nursing drug cards
description: Builds study drug cards for nursing and pharmacology students per medication, with class, mechanism, uses, key adverse effects, nursing considerations and patient teaching.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [medicine, healthcare]
requires: [none]
inputs: [text]
output: [table, quiz]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [nursing-school, drug-cards, medication-safety, clinical-placement]
pairs_with:
  prompts: [drill-medical-terminology, make-flashcards, practice-nclex-questions]
args:
  - name: medications
    description: The medications to card, by generic name if possible (brand names are fine; they will be mapped to generic). Ten or fewer per run works best.
    type: text
    required: true
  - name: drug_reference
    description: Optional excerpts from your course's drug guide or lecture notes for these drugs. Cards then follow your course's reference instead of general knowledge.
    type: text
  - name: course_context
    description: Optional programme and level (for example "second-year nursing, adult placement on a cardiac ward") and the card template your programme requires, if any.
    type: string
output_contract:
  format: markdown
  sections: [Before you use these, Drug cards, Class patterns, Look-alike and sound-alike names, Self-test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nursing students are asked to make drug cards for placement and pharmacology exams, and the cards that help are organised the way a nurse thinks before giving a medicine: what class is it, why is this patient on it, what will I check before giving it (a pulse before digoxin, blood pressure before an antihypertensive, a potassium level before a loop diuretic), what adverse effects do I watch for, and what does the patient need to know. Learning by class is far more efficient than learning drugs one by one: the suffix (-olol, -pril, -sartan, -statin, -prazole) predicts mechanism and most effects. Copying long lists of every side effect is a common trap; a card should carry the common and the dangerous ones. Drug cards are study aids, not clinical references: doses, interactions and local protocols must come from the current approved drug reference used where the student practises.
</context>

<task>
Make drug cards for these medications.

<medications>
{{medications}}
</medications>
{{#drug_reference}}
<drug_reference>
{{drug_reference}}
</drug_reference>
{{/drug_reference}}
{{#course_context}}
Context: {{course_context}}
{{/course_context}}

1. Under "Before you use these", state in two or three lines that the cards are for study, that dosing is left blank on purpose to be filled from the approved drug reference the student uses on placement, and that anything marked "(check)" must be verified there.
2. For each medication, write a card with: generic name (and common brand names, noting they vary by country); class; mechanism in one or two plain sentences; main indications; common adverse effects; serious adverse effects to act on; key contraindications or cautions; nursing assessments before and after giving it (with the specific vital sign or lab value to check); patient teaching points; and a "Dose:" field left blank.
3. Where the student supplied a drug reference, follow it and mark anything you add beyond it "(check)". Without one, write from standard pharmacology knowledge and mark facts that vary between references or countries "(check)".
4. Group the drugs by class and write a short "class patterns" note per class: the suffix, the shared mechanism and the shared nursing checks, so the student can reason about drugs of the same class they have not carded.
5. Flag look-alike and sound-alike name pairs among these drugs or with common drugs (for example hydralazine and hydroxyzine), and high-alert medications.
6. Write a short self-test: 6 to 10 questions mixing class recognition, a "what do you check before giving" question per drug, and one patient teaching question, with answers after.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never give doses, dose ranges, infusion rates or calculations; leave the dose field blank for the approved reference.
- Do not answer questions about a specific real patient's medication or what to give; say to ask the supervising nurse, prescriber or pharmacist.
- If a name is not a recognisable medication or could be several drugs, say so and ask rather than guessing.
- Keep each card scannable: short phrases, not paragraphs.
</constraints>

<output_format>
## Before you use these
## Drug cards
One card per medication, as a two-column table: Field | Content.
## Class patterns
## Look-alike and sound-alike names
## Self-test
Questions, then answers.
</output_format>
