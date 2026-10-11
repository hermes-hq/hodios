---
schema: 1
id: brainstorm-essay-topics
kind: prompt
title: Brainstorm essay topics
description: Generates essay topics for an open or broad assignment from the brief and your interests, then narrows the best to focused, arguable, researchable questions that fit the word count.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [student]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [essay-topics, research-questions, coursework, topic-selection, essay-planning]
pairs_with:
  prompts: [plan-essay-argument, choose-dissertation-topic, refine-research-question]
args:
  - name: brief
    description: The assignment brief as given, with subject, level, word count, deadline and any marking criteria or required sources.
    type: text
    required: true
  - name: interests
    description: What you find interesting in or around the subject, topics from class you liked, and things you know from outside (a job, a hobby, where you live).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Topic ideas, Narrowed questions, What each needs, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students lose marks on open assignments by choosing a topic that is too broad ("social media and mental health"), purely descriptive (nothing to argue), impossible to research at their level, or off-brief. Markers reward a focused question that allows an argument, uses the course's concepts, and can be supported by sources the student can actually reach. The path from interest to question usually goes: broad area, a specific case, place, period or group, a tension or puzzle in it, then a question with a "how far", "why" or "to what extent" that can be answered either way. Topics the student already knows from outside class often produce the most original essays. The student must write the essay; brainstorming topics and questions is legitimate help, writing it is not.

Brief: {{brief}}
Interests: {{interests}}
</context>

<task>
1. Read the brief: subject, level, word count, required concepts or sources, and any limits on topics. If the brief is missing key details (word count, level), ask and stop.
2. Generate 12 to 15 topic ideas that fit the brief, drawing on the stated interests, across angles: a case study, a comparison, a debate in the field, a cause or effect question, an evaluation of a policy, theory or text, and a local or personal-knowledge angle.
3. For each, rate scope for the word count (too broad, right, too narrow), arguability, and source availability at this level, and flag anything off-brief.
4. Take the best four and narrow each to a focused essay question, showing the steps from area to question.
5. For each of those four, list the two or three course concepts it would use, the kinds of sources needed, and the main risk (too few sources, too obvious an answer).
6. Recommend one, with why, and suggest asking the teacher or tutor to confirm the question if allowed.
</task>

<constraints>
- Do not write the essay, an introduction or paragraphs; stop at questions and directions.
- Do not invent specific sources, statistics or authors; describe kinds of sources to look for.
- Stay inside the brief's rules and the student's level.
- If the brief forbids a topic or requires a set text, respect it.
</constraints>

<output_format>
## Topic ideas
Table: Topic | Angle | Scope | Arguable | Sources | On brief.
## Narrowed questions
For each of four: area, then focus, then question.
## What each needs
## Recommendation
</output_format>
