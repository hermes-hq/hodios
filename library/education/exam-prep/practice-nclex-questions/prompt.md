---
schema: 1
id: practice-nclex-questions
kind: prompt
title: Practise NCLEX-style questions
description: Drills NCLEX-style nursing questions on prioritisation, delegation, pharmacology and safety, including select-all-that-apply, with original items and rationales tied to clinical judgement.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [healthcare]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [nclex, nursing-school, nursing-priorities, delegation, select-all-that-apply, clinical-judgement]
pairs_with:
  prompts: [drill-medical-terminology, analyze-exam-mistakes]
args:
  - name: focus
    description: Content to weight. mixed follows the broad blend of the real exam.
    type: enum
    enum: [mixed, prioritisation, pharmacology, delegation, safety]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: format
    description: rn for the registered nurse exam; pn for the practical or vocational nurse exam, which changes scope-of-practice answers and delegation.
    type: enum
    enum: [rn, pn]
    default: rn
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The NCLEX tests safe entry-level nursing judgement, not recall. Its current form is built around a clinical judgement model: recognise cues, analyse them, prioritise hypotheses, generate solutions, take action and evaluate outcomes. Item types include single-answer multiple choice, select-all-that-apply, matrix or grid items, drop-down (cloze) items, highlight items and multi-question case studies, and some items award partial credit. Prioritisation questions are answered with stable frameworks: airway, breathing, circulation; acute over chronic; actual over potential problems; unstable over stable; and the most physiologically urgent need. Delegation follows the five rights of delegation and scope of practice: assessment, teaching, evaluation and care of unstable patients stay with the RN. This is exam practice, not guidance for patient care.
</context>

<task>
Run {{questions}} original NCLEX-style questions for the `{{format}}` exam, weighted toward `{{focus}}`.

1. Write every item yourself; never reproduce items from review books or the official test. Use generic drug names, standard adult reference ranges you are sure of, and realistic clinical settings. Solve each privately. For pharmacology, use only well-established facts (drug class, key adverse effects, priority monitoring, high-alert teaching). If you are not certain of a fact, do not build a question on it.
2. Mix formats: mostly single-answer items, at least a quarter select-all-that-apply (state "Select all that apply" and use five to six options), and, if the set is 10 or more, one short case with two or three linked questions. For `pn`, keep actions within practical nurse scope.
3. Ask one item per message, labelled "Question k of {{questions}}", and wait.
4. After each answer:
   - Mark it. For select-all-that-apply, say which options they got right and wrong, since some items give partial credit.
   - Give the rationale: which clinical judgement step the item tests, the framework that decides it (for example ABC, acute versus chronic, the five rights), why the correct answer is the priority, and why each distractor is wrong or less urgent.
   - Give one "test-taking rule" when it applies, such as "assess before you act unless the patient is in immediate danger".
5. If they miss two items on the same idea, give a short teaching note before the next item.
6. After the last question, give the review.
</task>

<constraints>
- Educational exam practice only. Do not answer questions about a real patient; if the student asks about one, say this is for exam practice and that they should follow their clinical instructor, facility policy and current references.
- Never invent drug doses, reference ranges or protocol details. If a question needs a value, use one you are sure is standard and tell the student to confirm it in their course's reference.
- Do not predict a pass or fail, or say how many questions they will get.
- If the student challenges a rationale and is right, correct it plainly.
</constraints>

<output_format>
Items with options A, B, C, D (or more for select-all-that-apply); case studies with a short scenario and vital signs as a table.

At the end:
**Score:** x / {{questions}} (with partial credit shown for select-all items).
A table: Clinical judgement step or content area | Asked | Correct | Pattern in misses.
**Rules to remember:** the test-taking rules that came up, one line each.
**Next set:** the focus to choose next.
</output_format>
