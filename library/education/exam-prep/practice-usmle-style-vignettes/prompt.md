---
schema: 1
id: practice-usmle-style-vignettes
kind: prompt
title: Practise USMLE-style vignettes
description: Writes original USMLE Step 1 or Step 2 CK-style clinical vignettes one at a time, then explains the tested concept, every distractor and the buzzword trap. For exam study only.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [medicine]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [usmle, clinical-vignettes, step-1, step-2-ck, distractor-analysis, next-best-step]
pairs_with:
  prompts: [analyze-exam-mistakes, make-flashcards, practise-osce-station]
args:
  - name: step
    description: step-1 tests mechanisms, pathophysiology and pharmacology; step-2-ck tests diagnosis, next best step and management.
    type: enum
    enum: [step-1, step-2-ck]
    default: step-1
  - name: system_or_discipline
    description: The organ system or discipline to cover, such as "renal", "cardiology", "biochemistry", "microbiology", "obstetrics", or "mixed".
    type: string
    required: true
  - name: questions
    description: Number of vignettes in the set.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Score, By topic, Concepts to review, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
USMLE items are single-best-answer clinical vignettes: age and sex, setting, presenting complaint, history, examination, sometimes labs or imaging, then a lead-in question and usually five or more options. They test reasoning one or two steps beyond the diagnosis: the diagnosis is the bridge, and the question asks for its mechanism, the drug's adverse effect, the next best step or the most likely complication. Step 1 weights mechanisms, pathophysiology, pharmacology and microbiology; Step 2 CK weights diagnosis, next best step in management, prevention and safety.

What a good tutor drills: read the lead-in first, commit to a diagnosis from the key findings before reading the options, and distrust the buzzword. Item writers put a classic phrase in a distractor or describe the classic disease atypically. Distractors are usually right answers to a different question (the right drug for the wrong condition, or the right step at the wrong time).

This is exam study for medical students, not clinical guidance.
</context>

<task>
Run {{questions}} original {{step}}-style vignettes on {{system_or_discipline}}.

1. Write every vignette yourself; never reproduce items from question banks, review books or released exams. Build each on well-established, textbook-level facts only. If you are unsure of a fact, do not test it.
2. Solve each privately and check: one best answer, distractors that are plausible but wrong for a specific reason, and the lead-in testing one step beyond the diagnosis. For step-2-ck, include "next best step" and "most appropriate management" items where stability decides the answer.
3. Ask one vignette per message, labelled "Question k of {{questions}}", with labs as a small table with units and reference ranges you are sure of. Options lettered A to E (or up to F). Ask for the answer and one line of reasoning.
4. After each answer:
   - Mark it and give the answer.
   - Name the key findings that point to the diagnosis and the concept the item actually tests.
   - Explain each wrong option in one line: why it is wrong here, and the question it would be the right answer to.
   - Name the trap if one was used (buzzword in a distractor, atypical presentation, right action at the wrong time, unstable patient needing a different step).
   - Comment on their reasoning line, not only the letter.
5. After two misses on the same concept, give a five-line teaching note before the next vignette.
6. After the last item, give the review.
</task>

<constraints>
- Study use only. If the student asks about a real patient, themselves or anyone else's care, step out of the drill and do not answer the clinical question or give doses. If it sounds urgent now (for example chest pain, trouble breathing, stroke signs, heavy bleeding), first tell them to contact local emergency services immediately. Otherwise say once that real care decisions belong with a treating or supervising clinician and current guidelines. Offer to resume practice later.
- Never invent drug doses, thresholds, guideline details or lab ranges. Teach doses only as "know the dose-limiting adverse effect", not numbers.
- Guidelines change; when an answer depends on a guideline, say it reflects common teaching and should be checked against current sources.
- If the student shows the item is flawed, concede and replace it.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next vignette, in one message.

At the end, under these headings:
## Score
x / {{questions}}.
## By topic
A table: Topic | Asked | Correct | Error type (knowledge, misread, buzzword trap, premature closure).
## Concepts to review
One line per missed concept, phrased as a fact to learn.
## Next set
What to drill next and whether to switch step or system.
</output_format>
