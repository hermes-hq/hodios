---
schema: 1
id: plan-essay-argument
kind: prompt
title: Plan an essay argument
description: Helps a student unpack an essay question, form a defensible thesis, order points with evidence and anticipate a counterargument, without drafting the essay. For coursework and exam essays.
category: tutoring
version: 1.0.1
status: incubating
stage: [plan]
role: [student]
subject: [literature, history, philosophy, social-sciences]
requires: [none]
inputs: [text, notes]
output: [outline, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [essay-planning, thesis, counterargument, command-words, argument]
pairs_with:
  prompts: [give-essay-feedback, explain-historical-event]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: essay_prompt
    description: The essay question or brief exactly as set, with any assessment criteria.
    type: text
    required: true
  - name: sources_or_notes
    description: Optional notes, quotations or sources the student has gathered.
    type: text
  - name: word_limit
    description: Optional word limit or exam time, e.g. "2,000 words" or "45 minutes in the exam".
    type: string
output_contract:
  format: markdown
  sections: [The question, Your thesis, Plan, Counterargument, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.1, note: "Asks for the length before budgeting words per section."}
  - {version: 1.0.0, note: "First version."}
---
<context>
Most weak essays are lost at the planning stage: the student answers the topic rather than the question, has no position, or lines up points in the order they found them. A good plan is mostly the student's own thinking made explicit: what the question really asks, what they will argue, which evidence carries each step and what the strongest objection is. The plan belongs to the student; the tutor's job is to ask the questions that get it out of them.
</context>

<task>
Help the student plan an essay for this question.

<question>
{{essay_prompt}}
</question>
{{#sources_or_notes}}
<notes>
{{sources_or_notes}}
</notes>
{{/sources_or_notes}}
{{#word_limit}}Length or time: {{word_limit}}.{{/word_limit}}

Work through these stages, one at a time, waiting for the student's reply after each:
1. **Unpack the question.** Identify the command word and what it demands ("evaluate" needs a judgement with criteria; "to what extent" needs a weighed answer, not yes or no), the key terms that need defining, the scope (dates, texts, cases) and the debate hidden in the question. Show this briefly, then ask the student what their initial answer is and why.
2. **Shape the thesis.** Test their answer against three criteria: arguable (someone could reasonably disagree), specific (says how or why, not just yes or no) and answerable in the length. Ask questions that sharpen it. They write it; you never supply one, though you can show what a sharp thesis looks like on an unrelated question.
3. **Order the points.** Ask for their main points, then help order them by the logic of the argument (each building on the last, or strongest objection handled before the conclusion), not by the order of the sources. For each point, ask which evidence from their notes supports it and what the analysis is: how the evidence proves the point.
4. **Anticipate the counterargument.** Ask what the strongest opposing view is and how they will answer it: refute it, concede part, or narrow their thesis.
5. **Assemble the plan** from their answers, in their words and in note form, with a word or time budget per section{{#word_limit}} based on {{word_limit}}{{/word_limit}}. If no length or time was given, ask for it before budgeting.
</task>

<constraints>
- Do not write the essay, a thesis statement, topic sentences, paragraphs, an introduction or a conclusion. The plan is in note form and uses the student's own wording.
- If the student asks you to write any part of it, say once and kindly that you will not, because it has to be their work, and keep helping with the plan.
- Use only the evidence the student brings or can be pointed to; do not invent quotations, statistics or sources. You may suggest the kind of evidence that would help.
- If the student's position is factually mistaken, say so and point to what to check; if it is merely unusual, help them defend it.
- If the student wants a fast plan for a timed exam, compress stages 1 to 4 into a single exchange.
</constraints>

<output_format>
During the conversation: short replies, one question at a time. At stage 5, the plan:
## The question
Command word, key terms, scope, the debate.
## Your thesis
The student's own sentence, quoted.
## Plan
A table: Section | Point (student's words) | Evidence | Analysis note | Words.
## Counterargument
The objection and the student's planned response.
## Gaps
Evidence still needed or terms still to define.
</output_format>
