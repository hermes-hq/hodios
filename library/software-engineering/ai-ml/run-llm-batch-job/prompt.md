---
schema: 1
id: run-llm-batch-job
kind: prompt
title: Run an LLM batch job over many records
description: Builds a script that runs an LLM over thousands of records with a batch API or bounded concurrency, checkpoints, resume, output validation, a cost cap and a pilot run first.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [data-engineer, ml-engineer, backend-engineer, data-scientist]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [dataset, text, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [batch-processing, checkpointing, data-enrichment, cost-cap, idempotency]
pairs_with:
  prompts: [build-structured-extraction, estimate-llm-feature-cost, reduce-llm-costs]
args:
  - name: job
    description: What each record is, what the model must produce for it (ideally with the existing per-item prompt and output schema), the number of records, and where input and output live.
    type: text
    required: true
  - name: provider_sdk
    description: The provider SDK and whether its batch API may be used.
    type: string
    required: true
  - name: limits
    description: Deadline, budget cap and the rate limits of the account, if known.
    type: text
output_contract:
  format: markdown
  sections: [Plan, Code, Pilot, Cost estimate, Runbook, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Running a model over 50,000 rows looks like a for-loop and fails like a distributed system. The loop dies at row 31,000 and restarts from zero, paying twice. Unbounded concurrency hits rate limits and half the rows fail. Malformed outputs are written straight into the results table. Nobody runs a pilot, so a prompt bug is discovered after the whole budget is spent. Provider batch APIs cut cost substantially and remove rate-limit pain for work that can wait hours, but they have their own rules: request file formats, size limits, a completion window, per-request custom ids for matching results back, and partial failures to resubmit.
</context>

<task>
Build a batch job for: {{job}}, using {{provider_sdk}}.{{#limits}} Limits: {{limits}}.{{/limits}}

1. Read the existing per-item prompt, output schema and data access code in the repository. If there is no output schema, define one and validate against it.
2. Choose the execution mode and say why: the provider's batch API when the deadline allows and it is permitted, otherwise a concurrent runner with a bounded worker pool sized to the rate limits, with backoff on 429.
3. Make every record idempotent: a stable custom id per record, a results store keyed by that id with status (pending, done, failed, invalid) and the prompt version, so reruns skip done records and a changed prompt version can be rerun deliberately.
4. Checkpoint and resume: persist progress so the job restarts where it stopped. For the batch API, store batch ids and poll; on completion, map results back by custom id and resubmit failed or expired items.
5. Validate each output against the schema; store invalid outputs separately with the raw text and reason, retry them once, then leave them for review. Never overwrite source data in place.
6. Cost control: estimate cost before starting from token counts of a sample, print it, require a confirmation flag to run the full job, and stop when the running cost passes the cap.
7. Pilot: a `--limit` option; run it on 20 to 50 representative records, show the outputs and the invalid rate, and stop there for the user to check quality before the full run.
8. Report at the end: counts by status, tokens and cost, invalid examples, and how to rerun failures.
</task>

<constraints>
- Do not start the full run yourself; run only the pilot and leave the full run to the user's explicit go-ahead.
- Do not send data to the provider that the user has not said may be sent; ask if the records contain personal or confidential data.
- Use the real batch API request format for the stated SDK version; if unsure of a field, say so and point to the documentation.
- No orchestration framework unless the project already uses one.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Mode, concurrency or batch size, idempotency key, storage, in bullets.
## Code
Code blocks with file paths.
## Pilot
Command, real results and sample outputs, or a plain statement that it was not run.
## Cost estimate
The arithmetic from sample token counts, with prices as given or as symbols.
## Runbook
How to start, monitor, resume, rerun failures and change prompt versions.
## Open questions
Numbered, or "None".
</output_format>
