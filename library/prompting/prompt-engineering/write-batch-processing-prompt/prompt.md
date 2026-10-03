---
schema: 1
id: write-batch-processing-prompt
kind: prompt
title: Write a batch processing prompt
description: Writes a prompt for processing many items consistently through an API or script, with a per-item output schema, stable labels, ID echo, error records and a QA sampling plan.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [software-engineer, data-engineer, data-analyst, ml-engineer]
requires: [none]
inputs: [text, dataset]
output: [prompt, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [batch-processing, jsonl, consistency, error-handling]
pairs_with:
  prompts: [write-structured-output-prompt, write-classification-prompt, write-spreadsheet-ai-prompts]
  personas: [prompt-engineer]
args:
  - name: task
    description: What to do to each item and what the results feed, for example "classify 40,000 support tickets by product area for a quarterly report".
    type: text
    required: true
  - name: item_examples
    description: Five to ten representative items as they will be sent, including messy ones. Remove personal data first.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Output schema, Prompt, Error handling, Run plan, QA]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prompt that works on ten items in a chat behaves differently across ten thousand: labels drift ("Billing", "billing", "Payments"), messy items produce prose instead of the format, a failed item is silently skipped and the rows no longer line up, and items sent together leak into each other's answers. Batch prompts need a per-item contract: the item's ID echoed back, a fixed schema, a closed label set, an explicit error record for items that cannot be processed, and a sampling plan that checks quality before and after the full run.

<task_description>
{{task}}
</task_description>

<item_examples>
{{item_examples}}
</item_examples>
</context>

<task>
1. If the deliverable or the label set is unclear, ask up to three questions and stop. Otherwise decide whether each request carries one item or a small group, and say why (one item per request is the safe default; groups save cost but risk cross-item contamination and misaligned results).
2. Define the output schema per item: the echoed item ID, the result fields with exact allowed values, and a status field with "ok" or an error code. Define error codes for empty input, wrong language, unreadable or truncated content, out-of-scope items, and "unsure".
3. Write the prompt: the task and its purpose, field rules with label definitions, the instruction to judge each item on its own content only, the error rule (return an error record instead of guessing or skipping), and "return only one JSON object per item" (or one JSON Lines row per item in grouped mode, in input order, one for every ID).
4. Run the prompt mentally on each example item and show the expected output, including at least one error record.
5. Give the run plan: a pilot on 100 to 200 items read by a person, validation of every output against the schema, a check that every input ID has exactly one output, retry of failed items once with the validator error, keeping the prompt version and settings with the results, and using a provider batch interface when latency is not urgent (to confirm in the provider's documentation).
6. Give the QA plan: a random sample size for review, label distribution compared with the pilot to catch drift, and what error rate stops the run.
</task>

<constraints>
- Labels and error codes must be identical everywhere they appear.
- Never instruct the model to infer a value the item does not support; use the "unsure" or error path.
- Model-agnostic; describe batch interfaces, rate limits and pricing only as things to confirm with the provider.
- Keep the prompt under about 400 words excluding label definitions, because it is repeated for every item.
</constraints>

<output_format>
## Output schema
JSON Schema or a typed example in a fenced block, plus the error codes table.
## Prompt
One fenced block with [ITEM_ID] and [ITEM] as the insertion points.
## Error handling
Expected outputs for the example items, including the error records.
## Run plan
Numbered steps.
## QA
Sample size, drift check, stop rule.
</output_format>
