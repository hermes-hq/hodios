---
schema: 1
id: prepare-music-grade-exam
kind: prompt
title: Prepare for a graded music exam
description: Plans preparation for a graded music exam with pieces, scales, sight-reading, aural tests and theory, split into weekly practice targets that run up to exam day.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student, artist]
subject: [music-theory]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [graded-music-exam, scales-and-arpeggios, sight-reading, aural-tests, performance-preparation, practice-plan]
pairs_with:
  prompts: [plan-instrument-practice, plan-exam-day-strategy]
args:
  - name: instrument
    description: The instrument or voice, such as "piano", "violin", "classical guitar", "singing".
    type: string
    required: true
  - name: grade
    description: The grade being taken, usually 1 to 8.
    type: number
    required: true
  - name: weeks_left
    description: Weeks until the exam date.
    type: number
    required: true
  - name: board
    description: The exam board and syllabus, such as an associated board, a college board, a rock and pop board, or a national conservatory. any plans for the components most boards share.
    type: string
    default: any
  - name: pieces
    description: Optional pieces or songs chosen so far and how secure each is (for example "piece A memorised, piece B notes learned, piece C not started"), plus which scales or supporting tests feel weakest.
    type: text
output_contract:
  format: markdown
  sections: [Exam components, Where the marks are, Weekly plan, Daily practice template, Mock exams, Exam day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Graded music exams combine prepared pieces, which carry most of the marks, with technical work (scales, arpeggios, studies or exercises) and supporting tests such as sight-reading, aural tests, improvisation or musical knowledge, depending on the board and syllabus. Boards differ in the options they allow and some require a theory or musicianship grade before the higher practical grades. Candidates usually lose marks in predictable ways: pieces that are note-secure but not performed, scales learned late and played hesitantly, and sight-reading and aural treated as untrainable when ten minutes a day improves both. The last two weeks should be about performing, not learning.
</context>

<task>
Plan preparation for Grade {{grade}} {{instrument}}, board: {{board}}, with {{weeks_left}} weeks to go.
{{#pieces}}
<current_state>
{{pieces}}
</current_state>
Plan from this starting point: the least secure piece and the weakest component get the most time early.
{{/pieces}}

1. **Exam components.** List the components of a Grade {{grade}} {{instrument}} exam for {{board}} as you understand them (number of pieces, technical work, supporting tests and options). Label it "check against the current syllabus, which changes", and flag anything you are unsure of. If board is "any", list the components most boards share and the questions to answer from the syllabus. If a theory or musicianship prerequisite may apply at this grade, say so and tell them to check.
2. **Where the marks are.** How marks are typically split across components, described in proportions rather than exact numbers unless you are certain, and what examiners listen for in each (accuracy and fluency, tone, rhythm and pulse, dynamics and shape, communication).
3. **Weekly plan.** If pieces were not given, refer to them as piece 1, piece 2 and so on, and say the plan assumes all are at the note-learning stage. Week-by-week targets for each component up to the exam: learn and secure all pieces early, bring scales in on a rotation from week one rather than at the end, sight-reading and aural little and often, run-throughs from the middle of the plan, and a performance-only final fortnight. If {{weeks_left}} is under six, say what to prioritise (pieces and the technical work most likely to be asked) and whether a later date might be wiser.
4. **Daily practice template.** A session plan for the time a student at this grade typically practises, with a warm-up, technical work, a piece focus using slow and chunked practice, sight-reading, aural and a run-through. Give a version for short days.
5. **Mock exams.** When to do mock exams in front of someone (teacher, family, a recording), and how to simulate the room: playing each piece once without stopping, scales asked at random.
6. **Exam day.** A checklist: warm-up, music and any accompanist arrangements, tuning, what to do after a slip (keep the pulse, carry on), and how to talk to the examiner.
</task>

<constraints>
- Do not invent set-list pieces, exact scale requirements or mark thresholds. If you name a requirement, say how confident you are; point to the board's current syllabus.
- Keep practice volume realistic for the grade and a student's age; recommend breaks to avoid strain, and stopping if practice causes pain.
- Do not replace the teacher: suggest the student share the plan with their teacher and adjust it.
</constraints>

<output_format>
Use the section headings from the output contract. Exam components as a table: Component | What is asked | Notes and confidence. Weekly plan as a table: Week | Pieces | Technical work | Sight-reading and aural | Checkpoint. Daily practice template as a timed list. Exam day as a checklist.
</output_format>
