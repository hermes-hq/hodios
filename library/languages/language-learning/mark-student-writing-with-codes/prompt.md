---
schema: 1
id: mark-student-writing-with-codes
kind: prompt
title: Mark student writing with correction codes
description: Marks a learner's text with correction codes instead of fixing errors, so the student self-corrects, and picks the three most important patterns plus one encouraging next step.
category: language-learning
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [correction-codes, self-correction, written-feedback, homework-marking, error-patterns]
pairs_with:
  prompts: [diagnose-recurring-errors, grade-language-writing-task]
  rules: [learner-error-correction-rules]
args:
  - name: target_language
    description: The language the student wrote in.
    type: string
    required: true
  - name: student_text
    description: The student's text exactly as written, plus the task it answers if you have it. Remove the student's name.
    type: text
    required: true
  - name: level
    description: The student's CEFR level.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Coded text, Code key, Three patterns to work on, Next step]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher mark homework with a correction code: the teacher marks where an error is and what kind it is, and the student finds the correct form. Research on written corrective feedback suggests learners remember more when they do the correcting, as long as the errors are ones they can fix at their level. Coded marking goes wrong when every slip is coded (a page of red), when codes point at errors the student has not learned to fix, when the code is ambiguous, and when there is no follow-up.

Student level: CEFR {{level}}

<student_text>
{{student_text}}
</student_text>
</context>

<task>
1. Read the whole text first for meaning. Note what the student did well (content, organisation, language they took a risk with).
2. Classify each error. Code only "treatable" errors the student can probably fix at {{level}} (rule-based grammar, spelling, word order, agreement, tense they have studied). For errors beyond their level or that need a new word, write the correct form in brackets instead of a code, and do this for at most three of them; leave the rest.
3. Use this code set, adding a code for a feature specific to {{target_language}} (gender, case, aspect, particles, accents) when needed:
   WW wrong word, WF wrong form of the word, T tense, V verb form or agreement, WO word order, Sp spelling, P punctuation, Gr other grammar, ^ something missing, / not needed, ? meaning unclear (rewrite), Reg register or tone.
4. Mark the code in square brackets directly after the error, with the error in bold: **goed** [WF]. Do not give the correct form for coded errors.
5. Limit codes so the text stays usable: roughly one code per 15-20 words at most. If there are more, code the errors linked to the three patterns in step 6 and the errors that block meaning, and say how many minor slips you left.
6. Choose the three most important patterns, ranked by: errors that block meaning, then errors that recur, then errors in language the class has studied. For each: the code, two of the student's examples (uncorrected), a hint that leads to the rule without stating the answer, and a short practice task.
7. Write one next step, warm and specific, that names a strength and the one thing to focus on in the next piece.
</task>

<constraints>
- Never rewrite the student's text or produce a corrected version, unless the teacher asks for a teacher's answer key separately.
- Do not mark regional, heritage or informal forms that are correct in a real variety as errors; mark Reg only when the task required a register the student missed.
- If you are unsure whether something is an error in {{target_language}}, do not code it; list it under a "Teacher to check" line.
- If the text is not in {{target_language}}, or there is no student text, say so and stop. If it is very short (under about 30 words), code it but say the three patterns are tentative and choose fewer if there are not three.
- If the request is to rewrite the text for the student to hand in, do not; explain in one line that coded marking lets the student correct it, and code it as usual.
- Do not guess the student's identity, background or first language.
</constraints>

<output_format>
## Coded text
The full text with bold errors and bracketed codes, line breaks kept. Then: "Minor slips not coded: N".
## Code key
Table: Code | Meaning | Example from a different sentence (not from the student's text).
## Three patterns to work on
Numbered: code, two examples, hint, practice task.
## Next step
Two or three sentences addressed to the student.
</output_format>
