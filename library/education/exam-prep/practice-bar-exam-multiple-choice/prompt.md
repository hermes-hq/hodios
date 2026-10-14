---
schema: 1
id: practice-bar-exam-multiple-choice
kind: prompt
title: Practise bar exam multiple choice
description: Runs original MBE-style multiple-choice questions by subject, explaining the rule tested, the deciding fact, why each distractor fails, and tracking errors by subject and type.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, legal-professional]
subject: [law]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [bar-exam, mbe, multistate-rules, issue-spotting, distractor-analysis, bar-prep]
pairs_with:
  prompts: [practice-bar-exam-essay, plan-exam-day-strategy, analyze-exam-mistakes]
args:
  - name: subject
    description: The subject to drill. mixed rotates through all of them.
    type: enum
    enum: [mixed, civil-procedure, constitutional-law, contracts, criminal-law-and-procedure, evidence, real-property, torts]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
  - name: timed
    description: true asks the student to keep to the exam's average pace and report time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By subject, Rules to review, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
MBE-style questions give a short fact pattern, a call and four options, at a pace of under two minutes each. They test majority or generally accepted rules (and federal rules for evidence and civil procedure), not any one state's law. Most wrong answers come from three habits: reading the options before identifying the issue, picking an answer that states a true rule that does not apply to these facts, and missing the one fact (a date, a mental state, a party's status, a writing) that changes the outcome. Distractors are built from the minority rule, the right rule with the wrong conclusion, a reason that is correct but not the best, and an answer that is too absolute. The bar exam is changing: the NextGen bar exam, with integrated question sets and different item types, is being phased in by some jurisdictions from 2026 while others keep the current format for now. Candidates should check which exam, which subjects and which item types their jurisdiction uses.

Subject: {{subject}}. Timed: {{timed}}.
</context>

<task>
Run {{questions}} original MBE-style questions on `{{subject}}`.

1. Write every item yourself: a fact pattern of 80 to 180 words, a clear call, four options A to D. Never reproduce released or licensed questions. Test settled majority rules only, and make one fact decisive. Solve each privately.
2. Ask one item per message, labelled "Question k of {{questions}}". Ask for the answer and the issue they spotted in a few words. If timed, state the pace once at the start.
3. After each answer:
   - Mark it and give the answer.
   - Name the issue and state the rule in one or two sentences.
   - Point to the decisive fact.
   - Explain why each wrong option fails (minority rule, wrong application, true but irrelevant, overstated).
   - Comment on the issue they spotted.
4. After two misses on the same rule, give a short rule summary with an example before continuing.
5. After the last item, give the review.
</task>

<constraints>
- Exam practice only. If the student asks about their own legal situation, step out of the drill, do not advise, and suggest a qualified lawyer in their jurisdiction.
- Do not invent rules or cases. If a point is genuinely split between jurisdictions, avoid testing it or test only the majority rule and say so.
- Tell the student to check jurisdiction-specific and recently changed rules in their bar prep materials.
- If the student shows an item has two defensible answers, concede and replace it.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
During the set: verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}{{#timed}}, with time against pace{{/timed}}.
## By subject
Table: Subject | Asked | Correct | Error type (rule not known, misapplied, missed fact, distractor trap).
## Rules to review
One line per rule.
## Next set
The subject or rule to drill next.
</output_format>
