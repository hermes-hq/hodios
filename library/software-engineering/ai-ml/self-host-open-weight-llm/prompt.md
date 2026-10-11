---
schema: 1
id: self-host-open-weight-llm
kind: prompt
title: Self-host an open-weight LLM
description: Sets up an open-weight LLM behind an OpenAI-compatible API with vLLM, Ollama or llama.cpp, sizing GPU memory, quantisation, context length and concurrency, with load and quality checks.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer, devops-engineer, backend-engineer, sre]
stack: [llm-apps, docker]
requires: [repo-read, file-write, shell]
inputs: [spec, config]
output: [config, code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [self-hosting, model-serving, quantisation, gpu-sizing, inference]
pairs_with:
  prompts: [choose-llm-for-feature, add-llm-provider-fallback, write-docker-compose]
args:
  - name: requirements
    description: The model or model family wanted, the use (chat, batch, coding), expected concurrent users or requests per second, context length needed and latency target.
    type: text
    required: true
  - name: hardware
    description: GPUs (type, count, memory) or CPU-only machine, operating system, and whether it runs in Docker, Kubernetes or bare metal.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, Serving choice, Configuration, Deployment, Verification, Operations, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-hosting fails most often on arithmetic. Weights need roughly parameters x bytes per parameter (2 for bf16, about 0.5 to 0.6 for 4-bit), and the KV cache needs memory per token of context per concurrent request on top of that, so a model that loads fine can still run out of memory at long context or under load. The serving engine shapes everything: vLLM and similar servers batch many requests continuously on GPUs and suit multi-user APIs; Ollama is easiest for a single machine and local development; llama.cpp runs quantised GGUF models on CPU, Apple silicon or small GPUs. Quantisation saves memory but costs some quality, more on small models and at aggressive bit widths, so it needs checking on the real task. Other recurring problems: wrong or missing chat template, the API left open on the network without auth, and no measurement of throughput under concurrent load.
</context>

<task>
Self-host a model for: {{requirements}}

Hardware: {{hardware}}

1. Fit check: compute weight memory at bf16, 8-bit and 4-bit for the candidate model sizes, and KV-cache memory for the needed context and concurrency (show the formula using layers, KV heads, head dimension and bytes). Say which combinations fit with headroom, and which do not. If the model's architecture numbers are unknown, show the formula and say where to read them (the model's config file).
2. Serving choice: pick vLLM (or a comparable GPU server), Ollama or llama.cpp for this hardware and load, with reasons, and the quantisation format the engine supports (AWQ or GPTQ for GPU servers, GGUF for llama.cpp and Ollama).
3. Configuration: model id and revision pinned, max context length, GPU memory utilisation, tensor parallelism across GPUs if more than one, max concurrent sequences, the chat template, and the OpenAI-compatible endpoint settings. Write it as a Docker Compose file, Kubernetes manifest or service file matching the deployment target.
4. Security: bind to a private interface, put an API key or gateway auth in front, set request size and token limits, and keep model files on a read-only volume.
5. Verification: a smoke request through the OpenAI-compatible API, a load test at the expected concurrency reporting time to first token, tokens per second per request and total throughput, and a quality check on 20 to 50 task examples comparing the chosen quantisation against a higher-precision version or the hosted model it replaces.
6. Operations: health checks, metrics the engine exposes, restart behaviour, model update procedure, and log handling without storing prompt content by default.
7. If the files can be applied, start the service, run the smoke test and report; otherwise give the exact commands.
</task>

<constraints>
- Check the model licence for the intended (possibly commercial) use; do not assume open weights mean unrestricted use.
- Do not quote throughput numbers you did not measure; give the load test instead.
- Do not expose the server to the public internet without authentication. Ask before stopping or replacing services already running on the machine.
- Use flags and options that exist in the engine version being installed; if unsure, say so.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Fit check
Table: model size | precision | weights GB | KV cache GB at target load | fits?
## Serving choice
The engine, quantisation format and why.
## Configuration
Files with paths.
## Deployment
Commands in order.
## Verification
Smoke test, load test and quality check, with real results or the exact commands.
## Operations
Health, metrics, updates and logging.
## Open questions
Numbered, or "None".
</output_format>
