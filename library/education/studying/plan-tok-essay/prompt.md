---
schema: 1
id: plan-tok-essay
kind: prompt
title: Plan a TOK essay
description: Plans an IB Theory of Knowledge essay from the prescribed title, unpacking the knowledge question, choosing areas of knowledge, real examples and counterclaims, without writing it.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
subject: [philosophy]
requires: [none]
inputs: [text, notes]
output: [plan, outline, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ib-diploma, theory-of-knowledge, knowledge-questions, areas-of-knowledge, counterclaims, academic-integrity]
pairs_with:
  prompts: [plan-essay-argument, give-essay-feedback]
  workflows: [extended-essay-track]
  rules: [academic-integrity-rules]
args:
  - name: title
    description: The prescribed title exactly as published for the student's session, word for word.
    type: text
    required: true
  - name: areas_of_knowledge
    description: Optional areas of knowledge the student is considering, and any examples or ideas they already have.
    type: text
  - name: word_limit
    description: The word limit for the essay.
    type: number
    default: 1600
output_contract:
  format: markdown
  sections: [The title unpacked, Knowledge questions, Areas of knowledge, Examples to look for, Claims and counterclaims, Structure and word budget, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The TOK essay is assessed holistically on whether it gives a clear, coherent and critical exploration of the prescribed title. Examiners look for a focus on knowledge itself (how we know, how knowledge is produced, justified and limited) rather than on the subject matter of the examples; for the title's key terms to be interpreted and kept in view; for arguments developed through two areas of knowledge, usually with comparison between them; for specific, real examples, ideally from the student's own courses and experience, instead of generic or hypothetical ones; for claims tested by counterclaims and evaluated, not just listed; and for implications and the student's own perspective. The commonest failures are answering a question about the world rather than about knowledge, using the same famous examples everyone uses, and drifting from the title's exact wording.
</context>

<task>
Help the student plan a TOK essay on this prescribed title, within {{word_limit}} words.

<title>
{{title}}
</title>
{{#areas_of_knowledge}}
<student_ideas>
{{areas_of_knowledge}}
</student_ideas>
{{/areas_of_knowledge}}

1. **The title unpacked.** Identify the key terms and the assumptions in the title. For each key term, give two or three possible interpretations and note how the choice changes the essay. Point out any word that restricts the scope ("always", "only", "most", a named area of knowledge) and what it requires.
2. **Knowledge questions.** Offer three or four knowledge questions the title raises, in open, general form ("To what extent…", "How do we decide…"). The student chooses one main line.
3. **Areas of knowledge.** Recommend which areas of knowledge fit the title best and why, including any the title names. If the student suggested areas, evaluate their fit honestly. Explain what each area brings to the comparison (methods, kinds of evidence, the role of the knower).
4. **Examples to look for.** Do not supply ready-made examples. Instead, describe the kind of specific, real example that would work for each area (for example "a case in your biology course where a model was replaced") and ask the student to find their own from their subjects and experience. Warn against overused examples.
5. **Claims and counterclaims.** For each area, sketch the shape of a claim and a counterclaim as questions the student must answer with their examples, and what evaluation would look like (how far, under what conditions, with what implications).
6. **Structure and word budget.** A skeleton within {{word_limit}} words: introduction with the interpretation and the line of argument, development by area with claim, counterclaim and evaluation, comparison, conclusion with implications and the student's perspective. Give word budgets.
7. **Questions for you.** Five questions the student should answer in writing before drafting.
</task>

<constraints>
- Plan; do not write the essay, its thesis, paragraphs or example analyses. Questions, interpretations of terms and structures are fine.
- Keep focus on knowledge, and point it out if the student's ideas drift into first-order subject debates.
- Do not invent facts about real examples; if the student cites one, help them check its accuracy.
- If the title does not look like a TOK prescribed title, ask the student to paste the exact wording from the official list.
- Remind the student that their school's AI policy and the IB's academic integrity rules apply, and to keep their planning notes.
</constraints>

<output_format>
Use the section headings from the output contract. Key terms as a table: Term | Possible interpretations | Effect on the essay. Structure as a table: Section | Purpose | Words. Questions for you as a numbered list.
</output_format>
