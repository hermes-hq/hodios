---
schema: 1
id: practice-sat-section
kind: prompt
title: Practise a digital SAT section
description: Runs timed digital SAT practice for Math or Reading and Writing with original questions in the official formats, adapting difficulty and explaining every answer and trap.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [mathematics, english]
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
tags: [sat, digital-sat, adaptive-modules, answer-traps, pacing, error-log]
pairs_with:
  prompts: [prepare-standardized-test, analyze-exam-mistakes]
  workflows: [exam-prep-track]
args:
  - name: section
    description: Which section to practise. math covers algebra, advanced math, problem solving and data analysis, and geometry and trigonometry; reading-writing covers the short-passage questions.
    type: enum
    enum: [math, reading-writing]
    default: math
  - name: questions
    description: Number of questions in the set. 22 matches one Math module and 27 one Reading and Writing module.
    type: number
    default: 15
  - name: target_score
    description: Optional target section score (200 to 800), used to set the starting difficulty and which question types to weight.
    type: string
  - name: calculator_policy
    description: For Math only. as-official means a calculator is allowed on every question, as on the real test; no-calculator forces mental and written methods for extra fluency practice.
    type: string
    default: as-official
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The digital SAT has two sections, each split into two modules, and the second module's difficulty depends on how the student did in the first. Reading and Writing uses short passages with one question each, grouped by skill: Craft and Structure, Information and Ideas, Standard English Conventions, and Expression of Ideas. Math covers Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry; about a quarter of the questions are student-produced responses with no options, a reference sheet is provided and a calculator is allowed throughout. There is no penalty for wrong answers. Treat these as your understanding of the current format and tell the student to confirm details, especially timing and question counts, on the official test-maker's site.

Most lost points come from a small set of recurring traps, not from missing content: answering an intermediate value instead of the quantity asked, misreading "not" or "except", choosing a Reading and Writing option that is true but does not answer the question, or picking the most sophisticated-sounding transition instead of the logically correct one.
</context>

<task>
Run a practice set of {{questions}} original questions for the SAT `{{section}}` section.
{{#target_score}}Target section score: {{target_score}}.{{/target_score}}
Calculator policy (Math only): {{calculator_policy}}.

1. Before the first question, in one short message: state the section's format as you understand it, the average time per question to aim for, and that the student should note their start time (or say they want untimed practice). Ask nothing else unless the section value is unclear.
2. Plan privately: spread the questions across the section's domains in roughly the official proportions, and write every question yourself. Do not reproduce real or released test items. Solve each question before asking it and check that exactly one option is correct (or, for a student-produced response, that the answer is unique and in an acceptable form).
3. Ask one question per message, labelled "Question k of {{questions}}" with the domain and skill in brackets after the student answers, not before. Match the official style: Reading and Writing passages of about 25 to 150 words with four options; Math with four options or a student-produced response, using realistic contexts and clean numbers.
4. Adapt difficulty: start at medium{{#target_score}}, or at the level a {{target_score}} scorer needs to answer reliably{{/target_score}}. After two correct answers in a row, step up; after a miss, step down one level and later return to the same skill in a new form. Tell the student at the halfway point which way the set is moving, the way module 2 would.
5. After each answer, before the next question:
   - Mark it Correct or Incorrect and give the correct answer.
   - Explain the fastest valid route in three to five lines. For Math, show the method a strong student would use under time pressure, including when a calculator graph or plugging in an option is faster and respect the calculator policy above.
   - Name the trap behind each wrong option the student might pick, or the trap they fell into.
   - If they took noticeably long or said they guessed, log it even if correct.
6. Treat "skip" or "I don't know" as incorrect and teach it the same way. If the student says "stop", go straight to the review.
7. After the last question, give the review.
</task>

<constraints>
- Original questions only; never present remembered official items or claim a question is "from a real SAT".
- Never give score predictions, conversions or percentiles from a short set. Say that only full official practice tests give a reliable estimate.
- Do not reveal the answer, the domain or the trap before the student answers.
- If you are not certain an answer key is right, rework the question or replace it rather than ask it.
- Keep Reading and Writing passages self-contained: no outside knowledge needed.
</constraints>

<output_format>
During the set: short messages with the verdict and explanation for the last answer, then the next question. Put Math in plain text or LaTeX, whichever the student uses.

At the end:
**Score:** x / {{questions}}
A table: Domain / skill | Asked | Correct | Slow or guessed | Status (Solid / Shaky / Review).
**Error log:** a table with one row per miss or guess: Question | Skill | My answer | Correct | Cause (content / misread / trap / timing / careless) | Rule for next time.
**Next set:** the two skills to drill next and the difficulty to start at.
</output_format>
