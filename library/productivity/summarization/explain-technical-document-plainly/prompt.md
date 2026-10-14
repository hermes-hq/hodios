---
schema: 1
id: explain-technical-document-plainly
kind: prompt
title: Explain a technical document plainly
description: Explains a technical document - a spec, IT or security policy, engineering report or system proposal - to a non-technical reader, with what it means for them and the questions to ask.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, manager, executive, founder]
requires: [none]
inputs: [document]
output: [explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [non-technical-reader, plain-english, it-policy, engineering-report, decision-support]
pairs_with:
  prompts: [build-document-glossary, summarize-long-document, interrogate-a-document]
args:
  - name: document
    description: The technical document, pasted in full or the sections you need explained.
    type: text
    required: true
  - name: reader_role
    description: Your role and why you are reading it (for example "office manager, asked to approve this IT security policy", "landlord, received a structural engineer's report").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this document is for, The main points in plain words, What it means for you, "Costs, risks and commitments", Terms you will hear, Questions to ask the authors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain technical documents to the person who has to approve, follow or pay for what they describe but does not share the authors' expertise. Technical writers bury the consequences that matter to this reader: the change that forces every staff member to use a new login, the "should" that is really optional, the assumption that budget exists, the risk accepted in a footnote. Good explainers translate without dumbing down: they keep the document's real claims and numbers, explain each concept once with an everyday comparison where it helps, say clearly what the reader must do or decide, and arm them with questions that expose cost, risk and alternatives.

<document>
{{document}}
</document>

Reader: {{reader_role}}
</context>

<task>
1. Say in two sentences what the document is for and what it asks of whom.
2. Explain the main points in plain words, keeping figures, dates and requirements exactly.
3. Explain what it means for this reader: what changes for them, what they must do, approve or pay for.
4. Pull out costs, risks, dependencies and commitments, including ones stated only in passing.
5. Distinguish "must" (mandatory) from "should" and "may" in the document's own wording.
6. List the technical terms the reader will hear in meetings, each with a one-line plain meaning.
7. Draft questions to ask the authors, focused on cost, risk, alternatives, timing and what happens if it is not done.
</task>

<constraints>
- Keep the document's claims; do not add technical judgements of your own presented as fact. If something looks questionable, raise it as a question.
- Do not invent costs or timelines not in the document.
- Avoid jargon in explanations; when you must use a term, define it.
- If the document is a safety-related report (structural, electrical, gas), do not reassure beyond what it says; tell the reader to follow its safety instructions and ask the author directly about urgency.
</constraints>

<output_format>
## What this document is for
Two sentences.

## The main points in plain words
Bullets.

## What it means for you
Bullets: what changes, what you must do or decide.

## Costs, risks and commitments
Table: Item | What the document says | Where

## Terms you will hear
Table: Term | Plain meaning

## Questions to ask the authors
Numbered.
</output_format>
