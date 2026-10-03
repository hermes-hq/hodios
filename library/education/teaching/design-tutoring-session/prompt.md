---
schema: 1
id: design-tutoring-session
kind: prompt
title: Plan a one-to-one tutoring session
description: Plans a one-to-one tutoring session with a quick diagnostic, a teaching segment, guided and independent practice, homework and a session note. For private tutors in any subject.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, topic]
output: [plan, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [private-tutoring, one-to-one, diagnostic-questions, worked-examples, homework, session-notes]
pairs_with:
  prompts: [write-lesson-plan, analyze-exam-mistakes, hint-through-problem]
  personas: [socratic-tutor, math-tutor]
args:
  - name: subject
    description: Subject and current topic, e.g. "GCSE maths - simultaneous equations", "AP Chemistry - equilibrium", "Grade 3 reading comprehension".
    type: string
    required: true
  - name: student_level
    description: The student's year or grade, exam or goal, strengths, gaps and how they learn best, e.g. "Year 11, aiming for grade 6, solid algebra, panics on word problems".
    type: text
    required: true
  - name: minutes
    description: Session length in minutes.
    type: number
    default: 60
  - name: last_session_notes
    description: Optional notes from the last session - what was covered, what went wrong, homework set and how it went.
    type: text
output_contract:
  format: markdown
  sections: [Session goal, Timed plan, Diagnostic, Teaching segment, Practice, Homework, Session note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One-to-one tutoring is powerful because the tutor can find the exact gap and adjust minute by minute, but sessions often slip into the tutor explaining while the student nods, or into doing homework together. A strong session starts with a quick check of the last session and a short diagnostic, teaches one thing explicitly with a worked example, then moves quickly to the student doing problems while thinking aloud, with help fading from guided to independent. It ends with the student explaining back what they learned, homework that practises it with spacing, and a note so the next session (and the parent, where relevant) knows where things stand.
</context>

<task>
Plan a {{minutes}}-minute tutoring session in **{{subject}}**.

<student_level>
{{student_level}}
</student_level>

{{#last_session_notes}}
<last_session_notes>
{{last_session_notes}}
</last_session_notes>
{{/last_session_notes}}

1. Set **one** session goal (two at most) as something the student will be able to do by the end. If last session's notes show an unresolved gap, prioritise it. If the topic is too broad for the time, narrow it and say what is left for next time.
2. **Timed plan** adding up to exactly {{minutes}} minutes: warm-up retrieval (questions from earlier sessions or last homework), diagnostic, teaching segment, guided practice, independent practice, explain-back, homework set-up. Adjust proportions for age and session length.
3. **Diagnostic:** 3 to 5 short questions that pinpoint where the student is on today's topic, ordered from easier to harder, with what each wrong answer would reveal and how the plan changes if they get them all right (skip ahead) or all wrong (step back to the prerequisite).
4. **Teaching segment:** the key idea in plain words, one fully worked example with the reasoning the tutor says aloud, a common mistake to show and fix, and 2 or 3 questions to check understanding before moving on.
5. **Practice:** 3 to 4 guided problems with the hint the tutor gives at each sticking point (a question, not the answer), then 3 to 4 independent problems of rising difficulty, including one exam-style or real-world problem if relevant. Give answers.
6. **Homework:** 15 to 30 minutes of work: new topic practice plus 2 or 3 spaced review questions from earlier topics. Answers for the tutor.
7. **Session note:** a short template the tutor fills in after the session: covered, what clicked, what still needs work, homework set, plan for next time, and a 2 to 3 sentence parent update if the student is a minor.
</task>

<constraints>
- The student does most of the thinking: the tutor talks for less than half of the session.
- All problems and answers must be correct; check arithmetic and working.
- Match the language and difficulty to the student's level and any exam board named; do not invent exam-board specification details.
- Hints guide; they do not give the answer.
- Keep the parent update factual and encouraging, with no comparisons to other students.
</constraints>

<output_format>
## Session goal
One or two sentences, plus what is deferred.
## Timed plan
Table: Minutes | Phase | What happens. Total = {{minutes}}.
## Diagnostic
Numbered questions with answers and what wrong answers reveal, then the branching note.
## Teaching segment
Key idea, worked example, common mistake, check questions.
## Practice
Guided problems with hints, then independent problems, with answers.
## Homework
Numbered tasks with answers.
## Session note
Template with fields.
</output_format>
