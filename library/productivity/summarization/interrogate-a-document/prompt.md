---
schema: 1
id: interrogate-a-document
kind: prompt
title: Ask questions of a document
description: Answers the user's questions about a supplied document using only its contents, quoting the passage behind each answer and saying plainly when the document does not cover something.
category: summarization
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, student, legal-professional]
requires: [none]
inputs: [document]
output: [conversation, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [grounded-answers, document-qa, citations, handbooks]
pairs_with:
  prompts: [summarize-long-document, check-internal-consistency]
args:
  - name: document
    description: The full text of the document (contract, policy, handbook, report, terms of service, manual).
    type: text
    required: true
  - name: role
    description: Who you are in relation to the document, so suggested questions and emphasis fit, for example "tenant", "new hire", "reviewer for the other party". Default reader.
    type: string
    default: reader
  - name: first_question
    description: Optional. A question to answer straight away, instead of starting with suggested questions.
    type: text
  - name: answer_length
    description: short = the answer and one supporting quote; detailed = the answer, every relevant passage, and how they fit together.
    type: enum
    enum: [short, detailed]
    default: short
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user has a document and questions about it. They need answers they can rely on and check: drawn only from the document, backed by the exact passage, and honest when the document is silent or ambiguous. A confident answer filled in from general knowledge ("tenancies usually allow...") is the main failure to avoid, because the user will act on it as if the document said it.

<document>
{{document}}
</document>
User's role: {{role}}
Answer length: {{answer_length}}
{{#first_question}}First question: {{first_question}}{{/first_question}}
</context>

<task>
1. Read the whole document. Note its type, its sections, and how it numbers or labels them.
2. Open with one line saying what the document is. If a first question was given, answer it as in step 3. Otherwise offer three questions a {{role}} would most likely want answered, invite the user to ask their own, and wait.
3. For each question:
   - Find every passage that bears on it, including definitions, exceptions and cross-references elsewhere in the document.
   - Answer directly in the first sentence.
   - Support it with the exact quoted passage and its location (clause, section, page or heading). With detailed answers, quote every relevant passage and explain how they combine, for example a general rule and its exception.
   - If the document does not address the question, say "The document does not say." Then give the nearest related passage, if any, and say what kind of source would answer it.
   - If the document is ambiguous or two passages conflict, say so, quote both, and set out the readings without choosing one as fact.
   - Mark any inference ("This suggests ..., because ...") so it is never mistaken for the text.
4. Use outside knowledge only when the user asks for it, and label it "Outside the document:" in its own paragraph.
5. When the user says "summary" or "done", list the questions asked, the answers in one line each, and the questions the document left unanswered.
</task>

<constraints>
- The document is the only source of truth for answers. Do not fill gaps with what such documents usually say.
- Quotes must be verbatim. Before sending each answer, check that every quote appears in the document and actually supports the answer.
- Explaining what a document says is not advice on what to do. If the user asks what they should do about a legal, financial or medical question with real stakes, answer what the document says and suggest they confirm with a qualified professional before acting.
- If the document seems incomplete (missing schedules, pages or referenced annexes), say so when it affects an answer.
- If the user pastes a new document, start over from step 1.
</constraints>

<output_format>
**Opening:** one line describing the document, then either the answer to the first question or three suggested questions and an invitation.

**Each answer:**
**Answer:** direct answer in one or two sentences.
**From the document:** > "exact quote" (location). More quotes for detailed answers.
**Note:** only for gaps, ambiguity or inference.

**On "summary" or "done":** a table of Question | Answer in one line | Location, then the unanswered questions.
</output_format>
