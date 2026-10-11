---
schema: 1
id: speed-up-model-inference
kind: prompt
title: Cut model inference latency and cost
description: Cuts latency and cost of a self-hosted ML model's inference with batching, a compiled or optimised runtime, quantisation and right-sized hardware, checking accuracy holds on real data.
category: performance
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [inference-latency, quantization, dynamic-batching, onnx-runtime, model-serving]
pairs_with:
  prompts: [serve-ml-model-as-api, convert-model-to-onnx, self-host-open-weight-llm, reduce-tail-latency]
  personas: [ml-engineer, performance-engineer]
args:
  - name: model
    description: Model type and size, framework, how it is served (server, batch job, device), hardware, current p50 and p95 latency and throughput, traffic shape, and the latency or cost target.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Where time goes, Options, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Inference time is often not the model's forward pass. Preprocessing in Python (tokenising, image decoding and resizing), serialising inputs, copying tensors between CPU and GPU, and running one request at a time on a GPU that could process 32 together frequently dominate. The right levers depend on the goal: for throughput and cost, dynamic batching with a short max wait raises GPU utilisation sharply; for single-request latency, a faster runtime (ONNX Runtime, TensorRT, OpenVINO on CPU, `torch.compile`) and smaller precision help most. Running in inference mode (`model.eval()` and `torch.inference_mode()`) is a free win that is often missing. Quantisation (fp16 or bf16 on GPU, int8 dynamic or static on CPU) can cut latency and memory but can cost accuracy, so it must be checked on a real held-out set with the metric the product cares about, not on a handful of examples. Hardware fit matters: a small model may be cheaper and as fast on CPU, while a GPU sitting at 5 percent utilisation is money wasted. For large language models, the serving engine (vLLM, TGI, llama.cpp) and KV-cache settings dominate and are a different job.
</context>

<task>
Speed up inference for: {{model}}

1. Read the serving code end to end: request parsing, preprocessing, model loading, the forward call, postprocessing and response. Note eval mode, inference mode, device placement and batch handling.
2. Measure a baseline under realistic load: p50, p95 and p99 latency, throughput, hardware utilisation, and a per-stage time breakdown. If you cannot run it, give the exact measurement plan and stop at hypotheses.
3. State where the time goes and whether the goal is latency, throughput or cost.
4. Rank options by expected gain and risk: fix preprocessing and copies, inference mode, dynamic batching, compiled or exported runtime, reduced precision or quantisation, and hardware or instance changes. Get agreement on any that may change outputs.
5. Implement the agreed options one at a time, re-measuring after each. For any change that can alter outputs, compare predictions and the product metric on a held-out set against the original model.
6. Report final latency, throughput, cost per 1,000 requests where hardware cost is known, and accuracy deltas.
</task>

<constraints>
- No speed-up is accepted if accuracy drops beyond a tolerance the user sets; report the delta either way.
- Measure under the real traffic shape; single-request benchmarks do not show batching gains or queueing delay.
- Do not quote cloud prices from memory; use prices the user gives or leave cost as a formula.
- Do not change production serving config without confirmation.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Latency percentiles, throughput, utilisation, under what load.
## Where time goes
Per-stage breakdown.
## Options
Ranked table: option, expected gain, risk to accuracy, effort.
## Changes
What was implemented, with file paths.
## Results
Measurements after, accuracy comparison, open decisions.
</output_format>
