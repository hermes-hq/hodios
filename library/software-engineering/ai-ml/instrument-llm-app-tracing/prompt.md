---
schema: 1
id: instrument-llm-app-tracing
kind: prompt
title: Instrument an LLM app with tracing
description: Adds request-level tracing to an LLM app capturing prompt version, model, retrieved context, tool calls, tokens, latency and cost per step, with redaction and sampling.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer, backend-engineer, sre, software-engineer]
stack: [llm-apps]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tracing, opentelemetry, token-usage, redaction, llm-ops]
pairs_with:
  prompts: [reduce-llm-costs, write-llm-eval-suite, redact-personal-data]
args:
  - name: app
    description: The app's model call paths (chat, RAG, agent with tools), the language and framework, and any tracing or logging already in place.
    type: text
    required: true
  - name: backend
    description: Where traces should go, for example an OpenTelemetry collector, an existing APM, or an LLM tracing tool the team already uses.
    type: string
  - name: data_rules
    description: What may and may not be stored in traces (personal data, customer content, retention period).
    type: text
output_contract:
  format: markdown
  sections: [Trace design, Redaction and sampling, Code, Tests, Check, Dashboards and alerts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an LLM feature gives a bad answer, the question is always "what exactly did the model see?" Generic HTTP logs cannot answer it. Useful traces record, per request, one span per step (retrieval, rerank, each model call, each tool call) with the prompt template id and version, model and parameters, the retrieved document ids and scores, tool name, arguments and result status, input, output and cached token counts, latency including time to first token, the finish reason, and cost computed from tokens. The common mistakes are logging full prompts with customer data into a system that was never approved for it, tracing so much at full payload that storage costs more than the model, losing the link between a user's feedback and the trace, and not recording the prompt version, so a regression cannot be tied to a change.
</context>

<task>
Add tracing to: {{app}}{{#backend}} Send traces to {{backend}}.{{/backend}}
{{#data_rules}}
Data rules: {{data_rules}}
{{/data_rules}}

1. Read the model call paths and the existing logging, metrics and tracing setup. Extend what is there (for example an OpenTelemetry tracer already configured) rather than adding a parallel system.
2. Design the trace: a root span per user request with user-facing ids (request id, conversation id, a hashed user id), child spans for each step, and the attributes listed in the context above. Follow the OpenTelemetry generative-AI semantic conventions where the project uses OpenTelemetry, and note that they are still evolving.
3. Payload policy: by default record metadata, token counts and document ids, not full text. Full prompt and completion text only behind a flag, with redaction of secrets and personal data before export, and only if the data rules allow it.
4. Sampling: keep 100% of errors, refusals, guardrail hits and requests with negative feedback; sample the rest at a configurable rate.
5. Cost: compute cost per span from token counts and a price table held in config, not hard-coded in the code paths.
6. Feedback link: return the trace or request id to the client so user feedback can be attached to the trace.
7. Implement with small wrappers or decorators around the model, retrieval and tool clients so call sites barely change.
8. Tests: spans emitted with expected attributes using an in-memory exporter, redaction removes test secrets and emails, sampling keeps errors. Run them and report.
9. Propose three dashboards and alerts: cost per day by feature and model, p95 latency and time to first token, and error, refusal and fallback rates.
</task>

<constraints>
- Never export API keys, auth headers or raw personal data. If the data rules are missing, default to metadata only and say so.
- Do not invent provider prices; read them from config and leave placeholders.
- Tracing must not break a request: exporter failures are swallowed and counted.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Trace design
Table: span | attributes | when recorded.
## Redaction and sampling
The default payload policy, the flag, and the sampling rules.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run with real results.
## Dashboards and alerts
Each with the query idea and threshold.
</output_format>
