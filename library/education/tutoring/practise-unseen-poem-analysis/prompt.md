---
schema: 1
id: practise-unseen-poem-analysis
kind: prompt
title: Practise unseen poetry analysis
description: Practises unseen poetry questions under exam conditions, guiding the student to annotate, form a reading, write a timed response and compare it with a model answer.
category: tutoring
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [literature]
requires: [none]
inputs: [text]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [unseen-poetry, gcse, a-level, close-reading, annotation, timed-writing]
pairs_with:
  prompts: [analyze-poem, give-essay-feedback]
  personas: [writing-tutor]
args:
  - name: poem
    description: A public-domain poem with its poet and date if known. Optional; without one the assistant picks a public-domain poem suited to the exam style.
    type: text
  - name: exam_style
    description: The exam and question style to imitate, such as "GCSE", "A-level", "IB Paper 1" or "Leaving Certificate". Sets the question wording, the marking focus and the expected depth.
    type: string
    default: GCSE
  - name: minutes
    description: Total time for reading, annotating and writing.
    type: number
    default: 45
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An unseen poem question tests whether a student can make and support a reading of a poem they have never met, in limited time. Examiners reward a clear overview of what the poem is about and how it feels, close analysis of language, form and structure tied to that overview, precise short quotations, and a sense of the poem as crafted. They do not reward feature-spotting ("there is a simile in line 3") without effect, or paraphrasing stanza by stanza. A reliable routine: read twice, answer "what happens, who speaks, what changes", annotate for the three or four most significant choices, especially the turn, write a one-sentence thesis, then analyse in order of importance, not line order.
</context>

<task>
Run a timed unseen poetry practice in the `{{exam_style}}` style, {{minutes}} minutes in total.

{{#poem}}
<poem>
{{poem}}
</poem>
{{/poem}}

1. If no poem was given, choose a public-domain poem (by a poet who died well over 70 years ago) of 12 to 30 lines that suits `{{exam_style}}`, and reproduce it accurately with poet and date. If you are not sure you can reproduce a poem exactly, choose another you are sure of. If the student supplied a poem that may still be in copyright, work with it, but do not reproduce it in full yourself.
2. Write an exam-style question in the wording `{{exam_style}}` typically uses (for example "How does the poet present feelings about…?"). Tell the student how to split the {{minutes}} minutes: reading and annotating, planning, writing.
3. Stage 1, annotate: ask the student to send their first-read overview (what happens, who speaks, what changes) and their three or four annotations with the line and an effect for each. Give brief feedback: one thing they saw well and the one significant feature or shift they have not noticed yet, as a question ("What happens to the rhythm in the last stanza?"). Do not interpret it for them.
4. Stage 2, write: ask them to write the timed response and paste it.
5. Stage 3, feedback and comparison:
   - Assess against the usual criteria for `{{exam_style}}`: response to the task and overview, analysis of language, form and structure with effects, use of quotation, and quality of written expression. Quote their sentences as evidence. Give an indicative band or level labelled an estimate, only if you know the exam's mark structure; otherwise rate Strong / Developing / Needs work.
   - Then show a model answer to the same question, written to a high band for `{{exam_style}}` and to the same time limit, with brief margin notes on what earns the marks.
   - End with a comparison: two things the model does that their answer did not, and one thing their answer did that the model did not.
</task>

<constraints>
- The student annotates and writes first; never show the model answer or your reading before Stage 3.
- Quote the poem accurately; never invent lines.
- Accept any reading the text supports, even if it differs from the model; say so explicitly.
- Do not show a model before the student has written something, unless they say they want to study a model first; then label it and recommend a fresh poem for timed practice.
</constraints>

<output_format>
Setup: poem (if chosen), question and time split.
Stage feedback: short, ending with what to send next.
Stage 3: a criteria table (Criterion | Rating or estimate | Evidence | Fix), then the model answer with notes, then the comparison.
</output_format>
