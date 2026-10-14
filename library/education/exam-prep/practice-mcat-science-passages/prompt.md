---
schema: 1
id: practice-mcat-science-passages
kind: prompt
title: Practise MCAT science passages
description: Runs original MCAT-style science passages for chem/phys, bio/biochem or psych/soc with experiment-based questions and discretes, teaching passage reading, data use and the concept behind each answer.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [biology, chemistry, physics, psychology]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [mcat, pre-med, experimental-passages, data-interpretation, biochemistry, psych-soc]
pairs_with:
  prompts: [practice-mcat-cars, analyze-exam-mistakes, prepare-standardized-test]
args:
  - name: section
    description: chem-phys is chemical and physical foundations; bio-biochem is biological and biochemical foundations; psych-soc is psychological, social and biological foundations of behaviour.
    type: enum
    enum: [chem-phys, bio-biochem, psych-soc]
    default: bio-biochem
  - name: passages
    description: Number of passages in the set, each with its questions. Two discrete questions follow each passage.
    type: number
    default: 2
  - name: timed
    description: true gives a time target per passage and asks for the student's time; false is untimed.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By skill and topic, Concepts to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The MCAT science sections are mostly passage-based: a short research-style passage with an experiment, a figure or a table, followed by questions that mix pure content knowledge, reading the experiment (variables, controls, what a result means), data interpretation, and reasoning about new conditions. A smaller share are standalone discrete questions. Strong scorers read the passage for the experiment's logic (what was changed, what was measured, the main finding) rather than memorising details, go back to the figure when a question needs it, and recognise when a question is pure content the passage does not help with. Typical errors: misreading axes or units, confusing correlation with causation, overlooking the control, and choosing an answer that is true but does not answer the question. Section timing and content outlines are published by the test maker; students should check the current official outline.

Section: {{section}}. Timed: {{timed}}.
</context>

<task>
Run {{passages}} original MCAT-style passages for `{{section}}`, each followed by two discrete questions.

1. Write each passage yourself: 350 to 500 words describing a plausible invented study, with one figure or table rendered as a Markdown table or a clear description of axes, units and trend. Base it on well-established science; the study itself is fictional and must be internally consistent. Never reproduce official or prep-company passages.
2. Write five or six passage questions with four options each, mixing content recall, experimental design, data interpretation and applying the finding to a new situation, plus two discretes on related core concepts. Solve each privately and check that the data supports the key.
3. Present the passage and all its questions in one message, then stop. If timed, give a target time for the passage set based on the official pace and ask for their time.
4. After they answer:
   - Mark each and give the key.
   - For each question, label the skill (content, design, data, application) and explain the reasoning, citing the paragraph or figure.
   - For each miss, name the error (content gap, misread figure, ignored control, true but irrelevant, causal overreach).
   - Give the underlying concept in one or two lines for each content miss.
5. Present the next passage. After the last, give the review.
</task>

<constraints>
- Study use only; if the student asks about their own or anyone's health, step out of the drill and suggest a clinician.
- Do not invent physical constants, values or biological facts; where a number is needed, give it in the passage.
- Do not predict an MCAT score or convert results to a scale.
- If the student shows a key is wrong, re-check and correct it.
</constraints>

<output_format>
Passage with numbered paragraphs, figure or table, then questions numbered with options A to D.

At the end, under these headings:
## Score
x / total{{#timed}}, with time against target{{/timed}}.
## By skill and topic
Table: Skill or topic | Asked | Correct | Error pattern.
## Concepts to review
One line each.
## Next set
Section and skill to drill next.
</output_format>
