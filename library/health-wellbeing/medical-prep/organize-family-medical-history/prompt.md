---
schema: 1
id: organize-family-medical-history
kind: prompt
title: Organize a family medical history
description: Builds a family medical history record across three generations with conditions and ages at onset, highlights patterns worth mentioning to a doctor, and lists gaps to ask relatives about.
category: medical-prep
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [notes, text]
output: [table, summary, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-history, genetics, pedigree, hereditary-conditions, preventive-care]
pairs_with:
  prompts: [prepare-doctor-questions, prepare-emergency-medical-summary, prepare-prenatal-visits]
  personas: [health-navigator]
args:
  - name: family_info
    description: What you know about relatives' health, for example parents, siblings, children, grandparents, aunts, uncles and cousins, with conditions, age when diagnosed, age and cause of death, and ancestry if relevant. Use relationships, not names. Mark what you are unsure of.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Family health record, Family tree, Worth mentioning to your doctor, Gaps to fill, Asking relatives, Short summary for appointments]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people record their family medical history the way a genetic counsellor or family doctor would take it: three generations, each side of the family separately, with the condition, the age it started and, for relatives who have died, the age and cause. Clinicians use this to decide on earlier or extra screening and whether a genetics referral might help. The most useful details are often the ones people leave out: the age at diagnosis, which side of the family, and whether two relatives with the same condition are related to each other.

<family_info>
{{family_info}}
</family_info>
</context>

<task>
1. Build a record table for every relative mentioned: relationship, side (maternal, paternal, both for siblings and children), living or deceased, conditions, age at diagnosis, age and cause of death, and notes (smoking or other context they gave, uncertainty). Mark unknowns as [unknown] and anything they were unsure of as [unsure].
2. Draw a simple text family tree grouped by generation and side.
3. Worth mentioning to your doctor: point out patterns that clinicians generally ask about, as observations, not conclusions. Examples: the same or related condition in two or more close relatives on the same side; a condition diagnosed at a younger age than usual (for example heart disease, stroke, or bowel, breast or other common cancers diagnosed before about 50); a rare condition; a relative with two different cancers; sudden unexplained deaths at a young age; known genetic test results in a relative. Explain in one line why each is something a doctor would want to know.
4. Gaps to fill: missing ages, unknown causes of death, one side of the family with little information, half-siblings or adoption that changes the picture, and ancestry if it is relevant to screening.
5. Asking relatives: a short, gentle message or conversation opener they can use, the questions to ask, and how to handle relatives who do not want to share.
6. A short summary for appointments: five lines or fewer with the most relevant items first.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not calculate or state anyone's risk, say they "will" or are "likely to" get a condition, or recommend specific screening tests or genetic tests. Turn these into questions for a doctor or genetic counsellor ("Does my family history change when I should start screening?", "Would a genetics referral be useful?").
- Do not guess diagnoses from vague descriptions ("Grandad had something with his heart" stays as written, marked [details unknown]).
- Respect relatives' privacy: use relationships, not names, and remind them that relatives' health information is sensitive and to share it only with their clinicians.
- If adoption, donor conception or unknown parentage comes up, say plainly that this is common and what can still be recorded.
- If the person seems anxious about what they have found, acknowledge it and remind them that family history is one factor among many, best interpreted by a clinician.
- Plain language.
</constraints>

<output_format>
## Family health record
Table: Relative | Side | Status | Conditions | Age at diagnosis | Age and cause of death | Notes.
## Family tree
In a code block, grouped by generation.
## Worth mentioning to your doctor
Bullets: the observation, then why it matters to a clinician.
## Gaps to fill
## Asking relatives
A message they can send, then the questions.
## Short summary for appointments
</output_format>
