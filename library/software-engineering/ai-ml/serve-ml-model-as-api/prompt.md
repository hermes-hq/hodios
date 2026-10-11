---
schema: 1
id: serve-ml-model-as-api
kind: prompt
title: Serve a trained model behind an HTTP API
description: "Serves a trained ML model behind an HTTP API with input validation, shared preprocessing, non-blocking inference, batching, versioning, health checks and a load test."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, ship]
role: [ml-engineer, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, file, spec]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [model-serving, inference-api, batching, model-versioning, load-testing]
pairs_with:
  prompts: [convert-model-to-onnx, monitor-model-drift, shadow-test-new-model]
args:
  - name: model
    description: Where the trained model artifact and its preprocessing are, framework and version, input features and output.
    type: text
    required: true
  - name: traffic
    description: Expected requests per second, latency target, single or batch requests, and CPU or GPU serving.
    type: text
    required: true
  - name: platform
    description: Where it will run (container platform, serverless, existing service) and any existing web framework to use.
    type: string
output_contract:
  format: markdown
  sections: [Design, Code, Tests, Load test, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The common failures of model APIs are not in the model. Preprocessing re-implemented in the service drifts from training, so predictions are wrong with no error (training-serving skew); the same code or the saved pipeline must be used in both. The model is loaded per request, or lazily on the first one, which then times out. CPU-heavy inference inside an async handler blocks the event loop and stalls every other request; it belongs in a thread or process pool, or a sync worker model. GPUs sit mostly idle without batching requests together. Missing input validation lets out-of-range values, missing features or huge payloads through. Responses without a model version make incidents impossible to trace. A readiness check that returns OK before the model has loaded sends traffic to a cold instance. And nobody knows the real capacity until a load test measures p95 and p99 latency.
</context>

<task>
Serve this model: {{model}}

Traffic: {{traffic}}
{{#platform}}

Platform: {{platform}}
{{/platform}}

1. Read the training code, the saved artifacts and any existing service code. Reuse the existing web framework and deployment pattern; FastAPI is the default only if nothing exists.
2. Make preprocessing shared: load the saved pipeline, or import the same preprocessing module used in training. Do not re-implement transformations in the service.
3. Define request and response schemas: field types, ranges, allowed categories, maximum batch size and payload size; responses carry predictions, the model version and a request id.
4. Load the model once at startup, warm it with a sample prediction, and only then report ready. Provide separate liveness and readiness endpoints.
5. Run inference without blocking the server: a thread or process pool for CPU-bound models, or dynamic micro-batching with a short wait window for GPU models. Set request timeouts.
6. Version the model: read the version from the artifact's metadata, expose it, and allow loading a specific version by configuration.
7. Log per request: latency, model version, input validation failures and prediction summaries for monitoring, without logging personal data.
8. Write tests: valid request, each validation failure, batch request, readiness before and after load, and a parity test that the API output equals the offline model output on a fixed sample.
9. Load test at the expected rate and twice it, reporting p50, p95 and p99 latency, error rate and resource use, and state the instance count needed.
</task>

<constraints>
- Never let the service's preprocessing differ from training; the parity test proves it.
- Do not log raw inputs that may hold personal data.
- Do not run load tests against shared or production environments without asking.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Bullets: framework, preprocessing reuse, concurrency model, batching, versioning, health checks.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Load test
Table: rate | p50 | p95 | p99 | error rate | CPU or GPU use.
## Check
Commands run and real results.
## Open questions
Numbered, or "None".
</output_format>
