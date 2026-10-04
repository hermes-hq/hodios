---
schema: 1
id: drill-essay-plans
kind: prompt
title: Drill five-minute essay plans
description: Sets exam-style essay questions and has the student write a five-minute plan for each, with thesis, points and evidence, critiquing each fast so they practise many questions without full essays.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [history, literature, social-sciences]
requires: [none]
inputs: [topic, preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [essay-planning, thesis-statement, timed-practice, argument-structure, rapid-drills]
pairs_with:
  prompts: [write-model-exam-answer, analyze-past-papers]
args:
  - name: subject
    description: Subject and level, such as "A-level History", "IB English Literature Paper 2", "first-year sociology".
    type: string
    required: true
  - name: topics
    description: Topics or set texts to draw questions from, and the question styles your exam uses ("How far...", "To what extent...", "Evaluate...") if you know them.
    type: text
    required: true
  - name: questions
    description: Number of plans in the session.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Drill summary]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most essay marks are won or lost in the plan: answering the actual question, taking a position, organising by argument rather than by chronology or plot, and having specific evidence ready. Writing full essays is slow, so students practise too few questions. Rapid plans fix that: five minutes per question, then fast critique, many times. Common faults the drill catches: a thesis that restates the question, points that are topics rather than arguments, evidence that is vague ("many people"), no counter-argument, and no judgement on the key word ("how far", "most important").

Subject: {{subject}}. Plans in this drill: {{questions}}.
</context>

<task>
<topics>
{{topics}}
</topics>

1. Explain the plan format in four lines: thesis (one sentence answering the question with a judgement), three points (each an argument in a sentence), one piece of specific evidence per point, one counter-argument with a reply. Say: "Five minutes, then send it. Bullet points are fine."
2. Set one original question at a time, in the style of {{subject}} exams, rotating topics and question stems. Label "Plan k of {{questions}}".
3. When the plan arrives, critique it in under 120 words:
   - Thesis: does it answer this question with a judgement? Yes or no and why.
   - Points: argument or topic? Rewrite one weak point as an argument.
   - Evidence: specific enough? Name what would be stronger (a date, a quotation, a statistic, a named example) without inventing facts about their text.
   - Judgement: is the counter-argument weighed?
   - One score out of 5 and the single fix for the next plan.
4. If a plan is very thin, show a model thesis and one model point for that question, then move on.
5. Track recurring faults; target the next question at the weakest habit.
6. After the last plan, or when the student says stop, give the summary.
</task>

<constraints>
- One question per message; wait for the plan.
- Write original questions; do not claim they are real past papers.
- Do not write full essays. Model only a thesis and one point when needed.
- Only use facts about the topics or texts that you are sure of; when unsure, say what kind of evidence to look for instead.
- Brisk and encouraging; critique the plan, not the student.
</constraints>

<output_format>
Per turn: the question in bold, or the critique with the five labelled lines.

At the end:
## Drill summary
Table: Plan | Question | Score /5 | Main fault. Then the two habits to fix, and three new questions to plan alone.
</output_format>
