---
schema: 1
id: diagnose-student-misconceptions
kind: prompt
title: Diagnose student misconceptions
description: Diagnoses the misconceptions behind a set of wrong student answers, groups them by cause, and plans a short reteach with a hinge question to check each one.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [report, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [misconceptions, hinge-questions, formative-assessment, reteaching, error-analysis]
pairs_with:
  prompts: [analyze-class-assessment-results, design-formative-assessment, write-multiple-choice-questions]
args:
  - name: wrong_answers
    description: 'The question or task and the students'' wrong answers, copied as written, with initials or numbers instead of names, e.g. "Q3: 0.5 x 0.4 = ?  S1: 2.0  S2: 0.20  S3: 20  S4: 2".'
    type: text
    required: true
  - name: topic
    description: The topic or skill being assessed, e.g. "multiplying decimals" or "photosynthesis and respiration".
    type: string
    required: true
  - name: age_group
    description: Age or year group, e.g. "Year 7" or "first-year undergraduates".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the answers show, Misconception groups, Reteach plans, Hinge questions, Watch next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A wrong answer is information. The same wrong answer from several students usually comes from a shared misconception, a reasonable-seeming rule that is wrong or over-applied, while scattered errors are often slips or missing knowledge. Re-explaining the topic the same way rarely fixes a misconception; what works is surfacing the faulty rule, creating a conflict with an example it cannot explain, teaching the correct idea, and checking with a hinge question: a quick multiple-choice question where each wrong option maps to a known misconception, so one glance at the class's answers shows who still holds it.

Topic: {{topic}}. Learners: {{age_group}}.
</context>

<task>
<wrong_answers>
{{wrong_answers}}
</wrong_answers>

1. **Read each answer and infer the thinking.** For every wrong answer, work out the most likely reasoning that produced it, and reproduce it step by step to confirm it gives exactly that answer. If more than one line of thinking fits, list them.
2. **Classify each error:**
   - *Misconception:* a consistent faulty rule or belief.
   - *Missing knowledge or skill:* a prerequisite not secure.
   - *Slip:* a careless error by someone who likely knows the method.
   - *Misread question:* answered a different question.
   - *Unclear:* not enough evidence to tell; say what would tell you.
3. **Group the misconceptions** by cause, not by question, and note which students (by initial or number) show each.
4. **Plan a reteach for each misconception group**, about five to ten minutes: how to surface the faulty rule (ask students to explain their method), an example or counterexample that the faulty rule gets visibly wrong, the correct idea with a representation that makes it make sense (a diagram, a model, a number line, a physical demonstration), and one or two practice items.
5. **Write a hinge question for each misconception:** four options, one correct, each distractor matching a specific misconception you found, answerable in under a minute. Explain what each option tells the teacher.
6. **Watch next time:** one or two lines on how to prevent these misconceptions when the topic is taught next.
</task>

<constraints>
- Base every diagnosis on the actual answers. Do not attribute a misconception from a single ambiguous answer; mark it as a possibility.
- Do not judge students' ability or effort from their errors; the analysis is about thinking, not people.
- Use initials or numbers only. If full names appear in the input, replace them with initials.
- Make sure the correct answers and explanations are right for the subject at this level; if a "wrong" answer is actually acceptable, or the question itself is ambiguous, say so.
- If there are too few answers to see patterns, still diagnose each one and say that patterns need more data.
- Before finishing, check that each hinge question's distractors match the misconceptions you named and that exactly one option is correct.
</constraints>

<output_format>
## What the answers show
Two or three sentences: the main patterns.
## Misconception groups
Table: Misconception or error type | Students | Evidence (answers) | Likely thinking.
## Reteach plans
For each misconception: **Surface it**, **Create conflict**, **Teach it right**, **Practise**.
## Hinge questions
For each: the question and four options, then what each option tells you.
## Watch next time
One or two lines.
</output_format>

<examples>
Answers to 0.5 x 0.4: "2.0" and "2" suggest multiplying 5 x 4 and placing the point as if adding (or ignoring it); "0.20" is correct; "20" ignores the decimals. A conflict example: "0.5 is half. What is half of 0.4? Is it bigger or smaller than 0.4?"
</examples>
