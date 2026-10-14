---
schema: 1
id: build-llm-feedback-loop
kind: prompt
title: Build a user feedback loop for an LLM feature
description: Implements thumbs and comment feedback capture tied to traces in an LLM app, a triage queue, and a path that turns confirmed bad responses into labelled eval cases.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer, fullstack-engineer, product-manager, backend-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [user-feedback-capture, eval-cases, triage, continuous-improvement]
pairs_with:
  prompts: [write-llm-eval-suite, instrument-llm-app-tracing]
args:
  - name: app
    description: The LLM feature, the stack, how responses are shown to users, and whether requests are already traced or logged with an id.
    type: text
    required: true
  - name: data_rules
    description: What user content may be stored and reused for evaluation, and for how long.
    type: text
output_contract:
  format: markdown
  sections: [Capture design, Code, Triage process, From feedback to evals, Tests, Check, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most LLM apps add a thumbs-down button and never look at the data. Feedback is only useful when each rating links to the exact request (prompt version, model, retrieved context, output), when someone triages it on a schedule, and when confirmed failures become regression cases in the eval suite so the same failure cannot ship twice. Raw thumbs are noisy and biased: few users click, angry users click more, and a thumbs-down often reflects a product limit, not a bad answer. Implicit signals (copying the answer, regenerating, rephrasing the same question, abandoning) help but need care. And users' conversations cannot simply be copied into an eval set without checking what the data rules allow.
</context>

<task>
Build a feedback loop for: {{app}}
{{#data_rules}}
Data rules: {{data_rules}}
{{/data_rules}}

1. Read how responses are produced and displayed, and whether each response has a request or trace id. If not, add one and return it to the client.
2. Capture: thumbs up and down on each response, an optional reason picker on thumbs-down (wrong, incomplete, unsafe, did not follow instructions, too long, other) and a free-text comment. Store feedback with the request id, user id, prompt version and model, not a copy of the conversation.
3. Implicit signals: record regenerate, copy and immediate rephrase events where the UI allows, labelled as implicit.
4. Triage: a simple review view or query that lists negative feedback with the linked request (input, retrieved context, output), filterable by reason and prompt version, and a way to mark each item: confirmed model failure (with a failure category), product gap, user error, or not reproducible.
5. From feedback to evals: export confirmed failures as eval cases (input, context, the bad output, the expected properties written by the reviewer), after redaction, into the project's eval format. Deduplicate similar cases.
6. Tests for capture, linkage to the request and the export. Run them and report.
7. Define the metrics: feedback rate, negative rate by prompt version and reason, time to triage, and how many eval cases came from production.
</task>

<constraints>
- Do not copy user content into eval sets unless the data rules allow it; redact personal data first and keep a pointer back to the source.
- Do not treat negative-feedback rate alone as a quality metric; say what it misses.
- Keep the UI change small and accessible: labelled buttons, keyboard reachable, state announced.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Capture design
What is captured, where, and the data model.
## Code
Code blocks with file paths.
## Triage process
Who reviews, how often, and the labels.
## From feedback to evals
Export format, redaction and deduplication.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Metrics
Definitions and how to read them.
</output_format>
