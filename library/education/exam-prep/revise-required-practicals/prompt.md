---
schema: 1
id: revise-required-practicals
kind: prompt
title: Revise required practicals
description: Revises one school science required practical with its method, variables, risks, typical results and the exam questions it produces, then quizzes the student with exam-style questions.
category: exam-prep
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [student]
subject: [biology, chemistry, physics]
requires: [none]
inputs: [topic]
output: [explanation, quiz, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [required-practicals, gcse, a-level, variables, accuracy-and-precision, practical-skills]
pairs_with:
  prompts: [design-science-lab-activity, drill-exam-command-words, make-flashcards]
args:
  - name: practical
    description: The practical, such as "osmosis in potato cylinders", "rate of reaction with sodium thiosulfate", "specific heat capacity", "resistance of a wire". Add the exam board if you know it.
    type: string
    required: true
  - name: level
    description: gcse for GCSE required practicals; a-level for A-level required or core practicals, which adds uncertainty and more demanding analysis.
    type: enum
    enum: [gcse, a-level]
    default: gcse
  - name: questions
    description: Number of quiz questions after the summary.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Practical summary, Variables, Risks, Results and graph, Where exam marks come from, Quiz results]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Required practicals are examined in written papers, so students need to recall the method and reason about it: identify variables, explain a step, suggest an improvement, spot an error, process results and draw conclusions. Marks are commonly lost by mixing up accuracy (close to the true value), precision (little spread in repeats), repeatability (same person, same method), reproducibility (different person or method) and resolution (smallest change an instrument can show); by suggesting vague improvements ("be more careful"); by naming a hazard without its control; and by describing a graph without units or a numerical trend. Methods vary slightly by exam board, so the student should check their board's practical handbook.
</context>

<task>
Revise the practical: {{practical}}, at {{level}} level.

1. If the practical is not one you can identify confidently as a standard school practical, ask the student to paste their method sheet before going on.
2. Write the revision summary:
   - Aim and the science behind it in two sentences.
   - Method in numbered steps as a student would carry it out, with the equipment and typical quantities, and the reason for any step that exams ask about.
   - Variables: independent, dependent, and the control variables with how each is controlled.
   - Risks: hazard, risk, control, as a table. No invented hazards; keep to the real ones.
   - Typical results: what the data usually looks like, the graph to draw (axes with units, line or curve of best fit) and the expected trend. Common anomalies and their causes.
   - Where exam marks come from: random versus systematic error, accuracy versus precision, improvements that work (repeats and means, more precise instruments with named resolution, narrower intervals, controlling a named variable), and for a-level, percentage uncertainty and error bars.
3. Then run a quiz of {{questions}} questions, one question per message, labelled "Question k of {{questions}}", in exam style with marks in brackets: at least one each on variables, an improvement, processing data (a calculation from a small table of realistic results) and evaluation of a conclusion.
4. After each answer: marks awarded, what the mark scheme would credit, and the exact wording that earns the mark if theirs was vague.
5. After the last question, give the quiz results.
</task>

<constraints>
- Keep methods safe and as taught in schools; never suggest doing the practical at home with lab chemicals.
- Do not invent board-specific details; when a step or quantity differs between boards, say so.
- Original questions only; never present them as real past paper questions.
</constraints>

<output_format>
First message, under these headings:
## Practical summary
## Variables
A table: Type | Variable | How controlled or measured.
## Risks
A table: Hazard | Risk | Control.
## Results and graph
## Where exam marks come from
Then the first quiz question.

During the quiz: the marking, then the next question.
## Quiz results
After the last question: score, a table of Question | Skill | Marks, and the two phrases to learn.
</output_format>
