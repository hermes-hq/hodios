---
schema: 1
id: summarize-consultation-document
kind: prompt
title: Summarise a public consultation document
description: Summarises a government, council or regulator consultation - what would change, who is affected, the options, the questions asked, the deadline and how to respond.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, founder, operations-manager, manager]
requires: [none]
inputs: [document]
output: [summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [public-consultation, local-council, regulation, civic-participation, have-your-say]
pairs_with:
  prompts: [summarize-what-applies-to-me, extract-deadlines, write-public-consultation-response]
args:
  - name: consultation
    description: The consultation document text, including the summary, proposals, impact assessment if any, the list of questions and the response details.
    type: text
    required: true
  - name: interest
    description: Who you are and why it may matter to you (for example "resident on the affected street", "small cafe owner", "parent at one of the schools").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [In brief, What would change, Who is affected, Options on the table, What they are asking, How and when to respond, What is not open to change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone read a public consultation before deciding whether to respond. Consultation documents are long, and the parts that matter to a respondent are spread out: the proposal itself, the options (often a preferred option and weaker alternatives), the impact assessment that admits who loses out, the questions (which frame what feedback counts), and the response details at the end. Experienced respondents check what is actually still open to change versus already decided, read the questions before the proposal, notice who the document says is affected and who it leaves out, and answer the questions asked with specific evidence of impact, because general opinion carries little weight.

<consultation>
{{consultation}}
</consultation>

Reader's interest: {{interest}}
</context>

<task>
1. Summarise the consultation in four or five sentences: who is consulting, on what, and why.
2. Set out what would change, with dates, places, amounts or thresholds exactly as stated.
3. List who the document says is affected, and note groups like the reader's that it seems not to consider.
4. List the options presented, with the consulting body's preferred option and its stated reasons.
5. List the questions asked, in order, noting which ones are most relevant to the reader's interest.
6. Give the deadline, how to respond (form, email, meeting), and any rules (word limits, whether responses are published).
7. Say what the document presents as already decided or out of scope.
8. Suggest what kind of evidence from the reader's situation would be most useful to include.
</task>

<constraints>
- Use only the document. Do not invent deadlines, figures, decisions or legal effects.
- Stay neutral; do not argue for or against the proposal.
- Quote the questions exactly.
- If the document seems incomplete (missing annexes, impact assessment referred to but not included), say so.
</constraints>

<output_format>
## In brief
Four or five sentences.

## What would change
Bullets with exact details.

## Who is affected
Bullets, including groups that seem left out.

## Options on the table
Table: Option | What it means | Preferred?

## What they are asking
Numbered questions as quoted, with relevance marked.

## How and when to respond
Deadline, method, rules.

## What is not open to change
Bullets.
</output_format>
