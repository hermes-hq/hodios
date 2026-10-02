---
schema: 1
id: analyze-exam-mistakes
kind: prompt
title: Analyse exam mistakes
description: Classifies the mistakes in marked work as knowledge gaps, misreads, slips, time pressure or method errors and builds a targeted review plan for each type. Use after getting work back.
category: studying
version: 1.0.0
status: incubating
stage: [review, learn]
role: [student]
requires: [none]
inputs: [document, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [error-analysis, exam-wrapper, metacognition, mistake-log]
pairs_with:
  prompts: [create-study-plan, grade-practice-answers, generate-practice-exam]
  personas: [study-coach]
  workflows: [exam-prep-track]
args:
  - name: marked_work
    description: The questions, the learner's answers and the marker's marks or comments, pasted or described question by question. Add notes like "ran out of time on Q7" if known.
    type: text
    required: true
  - name: subject
    description: Optional subject and level, e.g. "A-level Chemistry", "Calculus I".
    type: string
  - name: next_exam
    description: Optional next exam or test and its date, so the plan fits the time left.
    type: string
output_contract:
  format: markdown
  sections: [Mistake log, Pattern, Review plan, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most students look at the grade, skim the red ink and move on, so the same marks are lost next time. Lost marks have different causes, and each needs a different fix: relearning content does nothing for misread questions, and more practice does nothing for a checking habit that is missing. This is the "exam wrapper" idea: sort the errors, find the pattern, change the preparation.
</context>

<task>
Analyse the mistakes in this marked work{{#subject}} for {{subject}}{{/subject}}.

<marked_work>
{{marked_work}}
</marked_work>

1. Go through every question where marks were lost. Work out the correct answer yourself and check it, so you know exactly where the learner's answer departs from it.
2. Classify each lost mark by its most likely cause:
   - **Knowledge gap:** did not know or misunderstood the content.
   - **Misread question:** answered a different question, missed a command word ("explain" answered as "describe"), missed a condition, unit or "give two".
   - **Careless slip:** knew how, but made an arithmetic, copying, sign or unit error.
   - **Time pressure:** unanswered, rushed or visibly incomplete late questions.
   - **Method error:** knew the content but chose the wrong approach, set it up wrongly, or did not show the working or structure the marks require.
   Base each classification on evidence in the answer and the marker's comment, and give that evidence in a few words. When the evidence cannot separate two causes (for example, a gap and a slip), mark it "unclear" and add a question for the learner.
3. Find the pattern: the share of lost marks per cause, the topics where knowledge gaps cluster, and anything systematic (all slips in the last third, every "evaluate" question under-answered).
4. Build a review plan with one section per cause that actually occurs, in order of marks lost:
   - Knowledge gaps: the specific subtopics to relearn, with a retrieval activity for each and a re-test after a few days.
   - Misreads: a reading routine, such as circling command words, numbers of points and units before answering, and practice on command words.
   - Careless slips: a checking routine matched to the slips found (estimate first, re-substitute, units check), and practice under the same conditions.
   - Time pressure: timed sections, a marks-per-minute budget, and a rule for when to move on.
   - Method errors: worked examples compared side by side with their wrong method, and practice on choosing the method before solving.
   {{#next_exam}}Fit the plan to the time before {{next_exam}}, with actions per week.{{/next_exam}}
</task>

<constraints>
- Do not re-mark generously or harshly; take the marker's marks as given unless one is clearly an error, and then say so as a question, not a verdict.
- If the work is too incomplete to analyse (no marks shown, questions missing), say what you need and stop.
- Do not invent the content of questions you were not given.
- Keep the tone factual and encouraging: errors are data about what to practise.
</constraints>

<output_format>
## Mistake log
A table: Question | Marks lost | Cause | Evidence | Correct idea in one line.
## Pattern
Marks lost per cause, then 2 to 4 sentences on what stands out.
## Review plan
One subsection per cause that occurs, each with 2 to 4 concrete actions.
## Questions for you
Only for "unclear" items; omit the section if there are none.
</output_format>
