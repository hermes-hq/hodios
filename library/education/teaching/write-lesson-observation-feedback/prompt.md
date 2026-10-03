---
schema: 1
id: write-lesson-observation-feedback
kind: prompt
title: Write lesson observation feedback
description: Turns lesson observation notes into specific, growth-focused feedback with evidence-based strengths, one priority, an action step and a follow-up check, for coaches and school leaders.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher, manager]
requires: [none]
inputs: [notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [classroom-observation, instructional-coaching, teacher-feedback, professional-development, action-steps]
pairs_with:
  prompts: [run-plc-data-meeting, write-lesson-plan]
  personas: [instructional-coach]
args:
  - name: observation_notes
    description: The observer's notes from the lesson, ideally timestamped and low-inference (what the teacher and students said and did), plus the class, subject and lesson goal if known.
    type: text
    required: true
  - name: focus_area
    description: Optional focus agreed with the teacher, e.g. "checking for understanding", "behaviour routines", "questioning", "pace of the launch".
    type: string
  - name: teacher_experience
    description: The teacher's experience, which sets how directive the feedback is.
    type: enum
    enum: [new, developing, experienced]
    default: developing
output_contract:
  format: markdown
  sections: [Lesson snapshot, Strengths, Priority, Action step, Practice plan, Reflection questions, Follow-up check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Observation feedback changes practice when it is specific, evidence-based and narrow: a few genuine strengths grounded in what happened, one high-leverage priority, and an action step small enough to practise this week ("pause after the question and scan three named students' whiteboards before calling on anyone"), rather than a list of everything that could be better. It fails when it is generic ("good relationships"), judgemental ("the lesson was boring"), or a list of ten targets. The directness should match the teacher: new teachers usually benefit from a clear model and a script; experienced teachers from questions that surface their own analysis before a step is agreed. The aim is growth, not a rating.
</context>

<task>
Write feedback for a **{{teacher_experience}}** teacher from these observation notes{{#focus_area}}, focused on **{{focus_area}}**{{/focus_area}}.

<observation_notes>
{{observation_notes}}
</observation_notes>

1. **Lesson snapshot:** in 2 or 3 sentences, what the lesson aimed to do and what happened, from the notes only.
2. **Strengths:** 2 or 3 strengths, each tied to a specific moment in the notes (quote or paraphrase with the timestamp if there is one) and to its effect on students.
3. **Priority:** choose the one area that would most improve student learning in this class, within the focus area if one was given. Explain the evidence from the notes and why it matters for students. If the focus area shows no clear need, say so and choose the most useful priority within it or a closely related one.
4. **Action step:** one concrete, observable step the teacher can practise in their next lesson, phrased as what they will do and say. Keep it to a habit that takes a week or two to build.
5. **Practice plan:** how to rehearse the step before the next lesson. For a new teacher, give a short model script and a rehearsal with the coach. For an experienced teacher, give a planning prompt and let them design the wording.
6. **Reflection questions:** 2 or 3 questions for the debrief conversation that help the teacher analyse the evidence themselves. Make them more open for experienced teachers.
7. **Follow-up check:** when the observer will look again and what evidence would show the step is working (a change in what students do, not just what the teacher does).
</task>

<constraints>
- Use only evidence in the notes. If the notes are mostly judgements ("weak behaviour management") without what was seen, say which low-inference evidence would help next time, and keep the priority tentative.
- Do not rate or grade the lesson, use evaluation-framework labels, or comment on the teacher's personality, appearance or accent.
- One priority and one action step, even if the notes show many issues; list other observations in one line at the end only if they matter for later.
- If the notes mention a student safety or welfare concern, put it first: the observer should raise it with the school's designated safeguarding lead today, separately from the feedback.
- Refer to students by initials or descriptions, not full names.
- Write in a warm, direct, collegial tone, addressed to the teacher ("you").
</constraints>

<output_format>
## Lesson snapshot
2 or 3 sentences.
## Strengths
Bullets with evidence and effect.
## Priority
The priority, the evidence and why it matters.
## Action step
One sentence, then what it looks and sounds like.
## Practice plan
Script or planning prompt, and how to rehearse.
## Reflection questions
Numbered.
## Follow-up check
When and what evidence to look for.
</output_format>
