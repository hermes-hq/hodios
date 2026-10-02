---
schema: 1
id: write-model-exam-answer
kind: prompt
title: Write an annotated model exam answer
description: Writes a model answer to a past exam question annotated against the mark scheme, showing where each mark is earned and how a weaker answer loses it. For students learning what examiners reward.
category: exam-prep
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student, teacher]
requires: [none]
inputs: [text, document]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mark-scheme, model-answer, past-papers, examiner-expectations, command-words]
pairs_with:
  prompts: [grade-practice-answers, analyze-exam-mistakes, generate-practice-exam]
  rules: [academic-integrity-rules]
args:
  - name: question
    description: The past exam question exactly as set, including any source extract, data or diagram described in words.
    type: text
    required: true
  - name: mark_scheme
    description: Optional official mark scheme or level descriptors for the question. Without it the marking is reconstructed and labelled as such.
    type: text
  - name: marks
    description: Optional marks available, e.g. "6", "15 (AO1 5, AO2 10)".
    type: string
  - name: level
    description: Optional qualification and level, e.g. "A-level Economics", "IB Biology HL", "AP US History", "first-year law".
    type: string
output_contract:
  format: markdown
  sections: [What the question wants, Model answer, Where the marks are, How weaker answers lose marks, Transferable lessons]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students who know the content still lose marks because they do not know what a mark looks like: the command word asked for analysis and they described, the mark scheme wanted a unit and a stated assumption, the top level needed a supported judgement. An annotated model answer shows exactly where each mark is earned, and comparing it with weaker versions shows how marks slip away.
</context>

<task>
Write an annotated model answer to this past exam question{{#level}} for {{level}}{{/level}}{{#marks}}, worth {{marks}} marks{{/marks}}.

<question>
{{question}}
</question>
{{#mark_scheme}}
<mark_scheme>
{{mark_scheme}}
</mark_scheme>
{{/mark_scheme}}

1. **What the question wants.** Name the command word and what it requires, the content area, any constraint (number of points, a named case, "using the data"), and how marks are awarded. If no mark scheme was given, reconstruct the likely marking from the level and marks (point-based marks, method and accuracy marks, or level descriptors with assessment objectives) and label it clearly as reconstructed, not official.
2. **Model answer.** Write a full-marks answer that a strong candidate could produce in the exam's time, proportionate to the marks: no padding, nothing beyond the level. Check every fact, figure and calculation; show working and units for quantitative questions.
3. **Annotate.** Mark each place a mark is earned with a bracketed tag in the answer, such as [M1] [A1] for method and accuracy, [1] for a point mark, or [AO2] for an assessment objective, and explain each tag in a table below.
4. **How weaker answers lose marks.** Write short excerpts of two weaker answers, a typical middle answer and a typical low one, using the mistakes examiners commonly report for this kind of question (describing instead of explaining, unsupported judgement, a missing unit, generic points not tied to the source). For each, say what it would score and why.
5. **Transferable lessons.** 3 to 5 rules that apply to other questions with this command word or format.
</task>

<constraints>
- When a mark scheme is given, follow it exactly; do not award marks it does not allow or add requirements it does not have.
- Never claim the reconstructed marking is official or quote examiner reports you have not been given.
- If the question looks like live coursework or an exam currently in progress rather than a past paper, say you can help the student plan their own answer instead, and stop.
- If the question depends on a source, diagram or data that is missing, ask for it.
</constraints>

<output_format>
Use the section headings from the output contract. The model answer in plain paragraphs (or numbered working for calculations) with inline mark tags. "Where the marks are" as a table: Tag | What earned it. Weaker answers as quoted excerpts, each followed by "Likely mark:" and two or three bullets.
</output_format>
