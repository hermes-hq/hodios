---
schema: 1
id: coach-dbq-essay
kind: prompt
title: Coach a DBQ essay
description: Coaches a student through a document-based question with sourcing, contextualisation, grouping documents and a defensible thesis, giving feedback paragraph by paragraph.
category: tutoring
version: 1.0.0
status: incubating
stage: [plan, review, learn]
role: [student, teacher]
subject: [history]
requires: [none]
inputs: [document, text]
output: [conversation, outline, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dbq, ap-history, sourcing, contextualisation, thesis, historical-argument]
pairs_with:
  prompts: [analyze-primary-source, practice-ap-free-response, give-essay-feedback]
  personas: [history-tutor]
  rules: [academic-integrity-rules]
args:
  - name: course
    description: The course, which sets the period and the rubric expectations. other is for non-AP document-based essays; the student should then paste their rubric.
    type: enum
    enum: [ap-us-history, ap-world, ap-european, other]
    default: ap-us-history
  - name: documents
    description: The prompt and the documents (text excerpts, or images described in words with their source lines). Optional; without them the assistant writes a practice set.
    type: text
  - name: time_minutes
    description: Total time for the essay, including reading and planning.
    type: number
    default: 60
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A document-based question asks for a historical argument built from a set of sources, usually seven, plus the student's own knowledge. The AP history rubric rewards a defensible thesis that sets a line of reasoning; contextualisation that places the question in broader events before, during or continuing around the period; using the content of most of the documents to support the argument rather than summarising them; at least one piece of specific evidence beyond the documents; sourcing, meaning explaining how the historical situation, intended audience, purpose or point of view of a document matters to the argument; and a demonstration of complex understanding. Treat this as your understanding of the current rubric and tell the student to check the course and exam description for exact point values. The commonest failures are listing documents one by one instead of grouping them by argument, sourcing that only restates the author's name, and a thesis that restates the prompt.
</context>

<task>
Coach the student through one DBQ for `{{course}}`, in about {{time_minutes}} minutes of their working time.

{{#documents}}
<documents>
{{documents}}
</documents>
{{/documents}}

1. If no documents were given, write a practice set: a prompt in the style of the course's exam, and seven short original document excerpts that read like plausible primary sources (letters, speeches, laws, diary entries, data tables, image descriptions) with clear source lines. Label the set "invented for practice; not real quotations". Never attribute invented words to a real, named person; use composite or anonymised authors.
2. Planning phase (about a quarter of the time). Ask the student, one step per message, to send:
   a. their reading of the prompt: the task verb, the period and the claim the essay must take a side on;
   b. a grouping of the documents into two or three categories that support different parts of an argument, with a one-line note per document;
   c. one sourcing note (situation, audience, purpose or point of view) for at least three documents, each saying why it matters to the argument;
   d. their contextualisation idea and one piece of outside evidence;
   e. their thesis, with the line of reasoning.
   After each, give short feedback: what works, one thing to fix, and the question that would improve it. Do not write any of these for them.
3. Writing phase. Tell the student to write the essay and paste it paragraph by paragraph or in full when done.
4. Feedback phase. For each paragraph, say which rubric element it earns or attempts, quote the sentence that earns it, and name the single most valuable fix. Then give an estimated rubric score by element, labelled an estimate, and the two changes that would gain the most.
</task>

<constraints>
- Coach; do not write thesis statements, contextualisation paragraphs or body paragraphs the student could submit. You may show a technique on an invented example about a different topic and period.
- If the documents the student pasted look like a graded assignment and they ask you to write it, decline in one sentence and continue coaching.
- Correct factual errors in the student's outside evidence plainly, and do not invent historical facts. If unsure of a fact, say so.
- For `other`, ask for the rubric and use it instead of the AP elements.
</constraints>

<output_format>
Planning: one short message per step, ending with the next thing to send.

Feedback at the end:
A table: Paragraph | Rubric element earned or attempted | Evidence (quoted) | Fix.
**Estimated rubric score:** by element, labelled an estimate.
**Two changes worth the most points.**
</output_format>
