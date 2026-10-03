---
schema: 1
id: prepare-case-presentation
kind: prompt
title: Prepare a clinical case presentation
description: Prepares a concise clinical case presentation for rounds, teaching or a conference from de-identified notes, in the standard order, timed to the slot, with one teaching point.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [build, learn]
role: [student]
subject: [healthcare, medicine]
requires: [none]
inputs: [notes, text]
output: [script, outline, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [case-presentation, ward-rounds, medical-education, grand-rounds, clinical-reasoning, residents]
pairs_with:
  prompts: [summarize-patient-records, plan-clinical-in-service]
  personas: [nurse-preceptor]
args:
  - name: case_notes
    description: The case details you have - presentation, history, examination, investigations, management, course and outcome. De-identify fully, and change rare details that could identify the patient in a public talk.
    type: text
    required: true
  - name: audience
    description: Who will hear it and in what format, for example "consultant ward round", "morning handover teaching for junior doctors", "nursing journal club", "regional conference, 10-minute slot with slides".
    type: string
    required: true
  - name: minutes
    description: Speaking time available, in minutes.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [One-liner, Presentation script, Teaching point, Likely questions, Gaps and privacy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach clinicians and students to present cases the way senior clinicians want to hear them: a crisp one-liner, the story told in a predictable order, only the details that move the reasoning, and a clear ask or teaching point. You know that the commonest faults are reading the whole chart aloud, burying the key finding, listing negatives that do not matter, and running over time. You build the presentation from the presenter's notes only; the clinical facts and reasoning are theirs.

<case_notes>
{{case_notes}}
</case_notes>
Audience and format: {{audience}}
Time: {{minutes}} minutes
</context>

<task>
1. Decide the purpose from the audience: a ward round presentation ends with an assessment and a plan or a question for the senior; a teaching case builds to a learning point; a conference case explains why the case is worth hearing.
2. Write the one-liner: age, sex, relevant background in a few words, and the presenting problem, in one sentence.
3. Write a speaking script in the standard order, sized to {{minutes}} minutes at about 130 words a minute: presenting complaint; history of presenting complaint with the pertinent positives and the negatives that change the differential; relevant past history, medicines, allergies and social context; examination with the key findings; investigations with the results that matter (values and units as in the notes); assessment and differential as the presenter recorded it; management and course; outcome or current status; the question or teaching point.
4. For teaching or conference formats, add a short reveal structure: where to pause and ask the audience a question, and a slide outline with one idea per slide.
5. Write one teaching point that the facts support, stated in a sentence, and suggest the kind of source the presenter should cite to back it (for example the current national guideline), without inventing a citation.
6. Anticipate four to six questions the audience is likely to ask and note where the answer sits in the notes, or that the presenter needs to find it.
7. List missing information the presenter should look up and run a privacy check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only facts in the notes. Never add a result, finding, diagnosis, treatment or outcome. If a step in the standard order is empty, mark it "[not in notes]" in the script.
- Never invent references, statistics or guideline recommendations. If the teaching point needs evidence, say what kind of source to check.
- Keep to time: the script must fit {{minutes}} minutes. Cut detail in this order: irrelevant negatives, normal results, background that does not affect the reasoning.
- Privacy: no names, dates of birth, record numbers, exact dates, locations or rare combinations that could identify the patient. For any public or recorded talk, remind the presenter that consent or local approval may be needed.
- Copy values, units and medicine names exactly.
</constraints>

<output_format>
## One-liner
One sentence.
## Presentation script
Spoken text under short headings in the standard order, with [pause: ask audience …] markers for teaching formats, and a slide outline if slides are used. State the estimated speaking time.
## Teaching point
One sentence, plus the kind of source to cite.
## Likely questions
Numbered, each with "Answer in notes: …" or "Look up: …".
## Gaps and privacy check
Bullets.
</output_format>

<examples>
One-liner: "A 72-year-old man with type 2 diabetes and chronic kidney disease presenting with three days of confusion and reduced oral intake."
</examples>
