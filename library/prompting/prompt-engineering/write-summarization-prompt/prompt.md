---
schema: 1
id: write-summarization-prompt
kind: prompt
title: Write a summarization prompt
description: Writes a reusable summarization prompt for a recurring document type and reader, with keep and drop rules, length, structure, faithfulness rules for numbers and uncertainty, and a test plan.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, software-engineer, data-analyst, operations-manager]
requires: [none]
inputs: [text, document]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [summarization-prompt, faithfulness, reusable-prompt, audience-fit, abstractive-summary]
pairs_with:
  prompts: [write-long-document-prompt, build-prompt-test-set, write-batch-processing-prompt]
  personas: [prompt-engineer]
args:
  - name: source_type
    description: What will be summarised again and again - for example "customer call transcripts", "weekly incident reports", "research papers", "board minutes" - with typical length.
    type: text
    required: true
  - name: reader
    description: Who reads the summary, what they decide or do with it, and what they already know.
    type: text
    required: true
  - name: sample
    description: One real example of the source, and a summary you liked or disliked if you have one. Remove personal data first. Optional but strongly recommended.
    type: text
  - name: format_needs
    description: Length limit, structure, where it will be pasted (email, ticket, chat, spreadsheet cell) and language. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this summary is for, Keep and drop rules, Prompt, Faithfulness checks, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write reusable summarization prompts. "Summarise this" produces generic summaries that keep the beginning, lose the decisions, soften numbers and sometimes add claims the source never made. A good summarization prompt is written for a specific reader and decision: it names what must always survive (decisions, owners, dates, numbers, risks, open questions), what to drop (pleasantries, repetition, process chatter), the length and structure, and strict faithfulness rules: no information that is not in the source, numbers copied exactly, uncertainty and disagreement preserved, and a clear marker when something expected is missing. For long or important sources, asking for supporting quotes or references to sections makes summaries checkable.

Source type: {{source_type}}

Reader: {{reader}}
{{#sample}}

Sample:
<sample>
{{sample}}
</sample>
{{/sample}}
{{#format_needs}}

Format needs: {{format_needs}}
{{/format_needs}}
</context>

<task>
1. State what the summary is for in one or two sentences: the reader, the decision or action, and what a useless summary would look like for them.
2. Write keep and drop rules specific to this source type: the must-keep items in priority order, what to drop, and how to handle conflicting statements, tentative language and numbers.
3. Write the prompt, ready to paste, with the source in clearly delimited tags, the reader and purpose, the keep and drop rules, length and structure, faithfulness rules (only use the source, copy numbers and names exactly, keep uncertainty, say "not stated" for missing must-keep items), and the output format. Use named placeholders for variable parts.
4. If a sample was given, show the summary the prompt should produce for it as a reference, and point out anything in the sample a generic summary would likely get wrong.
5. Faithfulness checks: a short checklist a person or a second prompt can run against a summary (every claim traceable, numbers match, owners and dates correct, nothing important missing).
6. Test plan: five varied test sources to try, including a very short one, one with conflicting views, one with no decisions, and one longer than usual, with what a pass looks like.
</task>

<constraints>
- Do not invent details about the source type or the reader; ask, or state assumptions clearly.
- Keep the prompt model-agnostic; avoid tricks tied to one vendor.
- Keep the written prompt under about 400 words unless the source type truly needs more.
- If summaries will be used for high-stakes decisions (medical, legal, financial, safety), add a line that the summary does not replace reading the source, and keep source references in the output.
</constraints>

<output_format>
## What this summary is for
## Keep and drop rules
## Prompt
In a fenced code block.
## Faithfulness checks
## Test plan
</output_format>
