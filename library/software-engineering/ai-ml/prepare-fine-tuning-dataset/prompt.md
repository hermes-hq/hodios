---
schema: 1
id: prepare-fine-tuning-dataset
kind: prompt
title: Prepare a fine-tuning dataset
description: Converts raw examples into a clean chat-format fine-tuning dataset with deduplication, quality and safety filters, token-length checks, leakage-free splits and a data card.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, data-engineer]
stack: [python, llm-apps]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fine-tuning, training-data, data-cleaning, jsonl, deduplication]
pairs_with:
  prompts: [plan-fine-tuning, review-training-data, redact-personal-data]
args:
  - name: raw_data
    description: Where the raw examples are and their format (support tickets with agent replies, CSV of input and output, chat logs), how many, and how they were produced.
    type: text
    required: true
  - name: target
    description: What the fine-tuned model should do, the training platform or library and its required format, and the base model's context length.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Source review, Transformation, Filters, Splits, Code, Report, Data card]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A fine-tuned model copies its training data, including the bad parts: agent replies with typos and outdated policy, canned macros repeated thousands of times, customer names and phone numbers, and "I'll escalate this" non-answers. Data preparation decides most of the result. Typical mistakes: duplicates and near-duplicates that make the model parrot one template; examples longer than the context length silently truncated by the trainer, cutting off the answer; a system prompt at training time that differs from the one used in production; train and test splits that share the same customer thread, so test scores look great; and no record of what was filtered and why.
</context>

<task>
Prepare a fine-tuning dataset from: {{raw_data}}

Target: {{target}}

1. Read a random sample of 50 to 100 raw examples, not just the first rows. Describe what good and bad examples look like, recurring templates, personal data, and anything inconsistent with the target behaviour.
2. Transformation: map each example to the training format required by the platform (for example JSONL with `messages` of system, user and assistant roles), using the same system prompt that production will use. For multi-turn sources, decide whether to train on full conversations or on the final turn, and say why.
3. Filters, each with a count of removed examples: empty or truncated outputs, non-answers, outputs contradicting current policy (if a policy source exists), wrong language, exact duplicates, near-duplicates (normalised text hashing or MinHash), over-represented templates capped to a maximum share, and examples over the token limit (measured with the base model's tokenizer).
4. Personal and confidential data: detect and redact or drop names, emails, phone numbers, account ids, addresses and secrets, using the project's redaction tooling if any. Say what detection misses.
5. Splits: train, validation and test, split by group (customer, thread, document) so related examples never cross splits; stratify by category if the data has one.
6. Write the pipeline as a re-runnable script with a fixed seed, and validate every output line against the platform's format.
7. Run it and report counts at each step, token length percentiles, category balance and 10 random final examples for human review.
8. Write a short data card: sources, filters, known gaps and biases, and licensing or consent status.
</task>

<constraints>
- Do not invent or rewrite assistant answers to make them better unless the user asks; flag weak examples instead.
- Never let personal data reach the output files without redaction or explicit permission.
- If the source's licence or consent for training use is unclear, say so and do not assume it is allowed.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Source review
What the sample showed, with short quoted examples (redacted).
## Transformation
The mapping to the training format and the system prompt used.
## Filters
Table: filter | rule | removed count.
## Splits
Method, group key and sizes.
## Code
Code blocks with file paths.
## Report
Counts, token percentiles and balance from the real run, or a plain statement that it was not run.
## Data card
Short sections as described.
</output_format>
