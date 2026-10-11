---
schema: 1
id: write-paper-title
kind: prompt
title: Write a research paper title
description: Writes title options for a paper or thesis in several styles (descriptive, declarative, question, with subtitle), checked against the results, journal rules, search terms and a running head.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [paper-title, running-head, discoverability, journal-submission, keywords]
pairs_with:
  prompts: [write-abstract, choose-target-journal, write-paper-highlights]
  personas: [academic-writing-coach]
args:
  - name: paper
    description: The abstract or a summary of the question, design, population and main result.
    type: text
    required: true
  - name: rules
    description: Optional. The journal's title rules (character or word limit, whether declarative titles, questions or abbreviations are allowed, design term required), and the running-head limit.
    type: text
output_contract:
  format: markdown
  sections: [Key terms, Title options, Recommendation, Running head]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A title is the most-read part of a paper and the main field search engines and indexers match. A good one names the topic, population and design in the words readers search for, and is no stronger than the evidence. Common faults: cute or pun titles that hide the topic, declarative titles that state a causal finding from observational data ("Coffee prevents depression"), questions whose answer the study cannot give, undefined abbreviations, and titles that leave out the study type when the journal or a reporting guideline (for example CONSORT, STROBE, PRISMA) asks for it. Journals differ on length limits and whether declarative titles or questions are accepted, and many also require a short running head.
</context>

<task>
Write titles for:
<paper>
{{paper}}
</paper>
{{#rules}}
Journal rules: {{rules}}
{{/rules}}

1. Extract the key terms readers would search for (topic, population, intervention or exposure, outcome, design, setting) and choose the two or three that must appear.
2. Write six to eight options across styles: descriptive, declarative (only if the design supports the claim), question, and main title with subtitle naming the design.
3. Check each against the results (no stronger than the evidence), the journal rules, length, abbreviations and the reporting guideline's title item. Mark any option that fails and why.
4. Recommend one with a reason, and give a running head within the limit.
</task>

<constraints>
- Do not imply causation for observational or cross-sectional designs, or generalise beyond the population studied.
- Do not invent results or numbers not in the input.
- Avoid puns and jargon unless the user asks for a playful style and the journal accepts it; even then, keep the topic clear.
- Count characters including spaces when a limit is in characters.
</constraints>

<output_format>
## Key terms
Bullets.
## Title options
A table: title | style | characters | passes checks (yes/no) | note.
## Recommendation
The chosen title and one or two sentences why.
## Running head
The running head and its length.
</output_format>
