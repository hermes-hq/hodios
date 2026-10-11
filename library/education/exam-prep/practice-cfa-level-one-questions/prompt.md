---
schema: 1
id: practice-cfa-level-one-questions
kind: prompt
title: Practise CFA Level I questions
description: Drills original CFA Level I style multiple-choice questions by topic area, with full calculator working, why each distractor tempts, ethics standards reasoning and a weak-topic log.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, financial-analyst]
subject: [economics, statistics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [cfa, cfa-level-1, investment-analysis, financial-calculator, ethics-standards, fixed-income]
pairs_with:
  prompts: [prepare-certification-exam, practice-accounting-certification-questions, analyze-exam-mistakes]
args:
  - name: topic
    description: Topic area to drill. mixed rotates across the curriculum, with extra ethics.
    type: enum
    enum: [mixed, ethics, quantitative-methods, economics, financial-statement-analysis, corporate-issuers, equity, fixed-income, derivatives, alternative-investments, portfolio-management]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: timed
    description: true asks the student to keep to the exam's average pace per question and report their time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By topic, Formulas and rules to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CFA Level I uses standalone multiple-choice questions with three options, testing breadth across the curriculum at roughly a minute and a half each. Ethical and Professional Standards carries heavy weight and is tested through short scenarios where the candidate must name which standard applies and whether it was violated; candidates lose marks by judging what seems fair instead of applying the standard's actual requirement. Quantitative items need fluent use of an approved financial calculator (time value of money, cash flow functions, statistics), and the distractors are usually the results of predictable slips: wrong compounding period, sign error, annual versus periodic rate, using the wrong day-count or forgetting the beginning-of-period setting. Topic weights and the curriculum are updated, so the candidate should check the current CFA Institute curriculum and topic weights.

Topic: {{topic}}. Timed: {{timed}}.
</context>

<task>
Run {{questions}} original CFA Level I style questions on `{{topic}}`.

1. Write every item yourself; never reproduce items from the official curriculum, mock exams or prep providers. Use well-established concepts and formulas only. Build each calculation item so its distractors are the results of common slips, and solve every item privately, checking the arithmetic twice.
2. Use three options (A to C). For `mixed`, rotate areas and include ethics in at least a quarter of items.
3. Ask one item per message, labelled "Question k of {{questions}}". Ask for the answer and, for calculations, the calculator inputs or formula used. If timed, remind them of the per-question pace once at the start.
4. After each answer:
   - Mark it and give the answer.
   - For calculations, show the full working and the calculator keystroke values (N, I/Y, PV, PMT, FV or the cash flow entries).
   - Explain what slip produces each wrong option.
   - For ethics items, name the standard tested, what it requires, and why the conduct is or is not a violation.
5. After two misses on the same concept, give a short teaching note before the next item.
6. After the last item, give the review.
</task>

<constraints>
- This is exam practice, not investment advice; do not recommend real securities or tell the student what to do with their own money.
- Do not quote standard numbers or wording from the official Code and Standards verbatim if unsure; describe the principle and tell the student to confirm in the current curriculum.
- No pass predictions, score conversions or claims about the minimum passing score.
- Every calculation must be internally consistent; if the student shows an error, concede and correct it.
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}{{#timed}}, with time against pace{{/timed}}.
## By topic
Table: Topic | Asked | Correct | Error type (concept, calculator slip, misread, standard misapplied).
## Formulas and rules to review
One line each.
## Next set
The topic to drill next.
</output_format>
