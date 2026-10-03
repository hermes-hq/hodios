---
schema: 1
id: write-long-document-prompt
kind: prompt
title: Write a long document prompt
description: Writes a prompt for analysing long documents with document placement, metadata tags, quote-first answering, citations, a not-found rule and a chunking plan for documents that do not fit.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [ml-engineer, software-engineer, researcher, legal-professional]
requires: [none]
inputs: [text, document]
output: [prompt, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [long-context, document-qa, citations, chunking]
pairs_with:
  prompts: [write-structured-output-prompt, design-prompt-chain, prepare-knowledge-files]
  personas: [prompt-engineer]
args:
  - name: task
    description: What should be done with the documents, for example "answer questions about our supplier contracts" or "compare three tender responses against our requirements".
    type: text
    required: true
  - name: document_types
    description: "Optional: what the documents are, their typical length and format, and how many arrive at once."
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Prompt, Chunked variant, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long-document prompts go wrong in specific ways: the model answers from general knowledge instead of the text, misses details buried in the middle, blends facts from two documents, cites sections that do not say what it claims, and never admits the answer is not there. Provider guidance converges on a few remedies: put long documents before the instructions and question, wrap each document in tags with its source and date, ask the model to pull the relevant quotes first and answer from them, require citations that point to a findable place, and give an explicit way to say "not found". When documents exceed the context window or the budget, process chunks with a fixed per-chunk output and combine the results.

<task_description>
{{task}}
</task_description>
{{#document_types}}
<document_types>
{{document_types}}
</document_types>
{{/document_types}}
</context>

<task>
1. If the task's deliverable or the documents' scale is unclear and it changes the design (single document versus many, questions versus a report), ask up to three questions and stop.
2. Choose and explain the design: single pass or chunked, document ordering, the citation format (document id plus section, page or clause number), and how to handle conflicts between documents or versions.
3. Write the single-pass prompt with: documents first, each in a document tag holding id, title, date and source, then content; the instructions and question after the documents; a quote-first step (extract the passages that bear on the question, with citations, inside a quotes section) followed by the answer built only from those passages; a rule that information not in the documents is reported as "not found in the provided documents" rather than filled from general knowledge; conflict handling that names both sources; and an exact output format.
4. Write the chunked variant: chunk size and overlap, a per-chunk prompt with a fixed output (relevant findings with citations, or "nothing relevant"), and a combine prompt that merges, de-duplicates and flags contradictions without adding facts.
5. Write tests: a detail buried in the middle of a long document, a question whose answer is absent, two documents that disagree, a question needing facts from two places, and a citation check where a reviewer verifies every quote exists verbatim.
</task>

<constraints>
- Placeholders in the prompts use square brackets, such as [DOCUMENTS] and [QUESTION], so they are easy to spot.
- Quotes must be verbatim; the prompt must tell the model not to paraphrase inside the quotes section.
- Model-agnostic. Context window sizes vary and change; give chunk sizes as a fraction of the operator's limit, not as a fixed number tied to one model.
- For legal, medical or financial documents, the prompt should state that its output supports review by a qualified person and is not advice.
</constraints>

<output_format>
## Design choices
Short bullets with reasons.
## Prompt
Single-pass prompt in a fenced block.
## Chunked variant
Per-chunk prompt and combine prompt, each in a fenced block, plus chunking settings.
## Tests
Table: Test | Setup | Pass criterion.
</output_format>
