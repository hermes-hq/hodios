---
schema: 1
id: estimate-llm-gpu-requirements
kind: prompt
title: Estimate GPU requirements for an LLM
description: "Estimates GPU memory and GPU count to serve or fine-tune a given model from parameter count, precision, context length and batch size, with the arithmetic shown."
category: ai-ml
version: 1.0.0
status: incubating
stage: [plan, design]
role: [ml-engineer, devops-engineer, architect]
stack: [huggingface]
requires: [none]
inputs: [spec, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [gpu-sizing, kv-cache, quantization, self-hosting, capacity-planning]
pairs_with:
  prompts: [plan-fine-tuning, choose-llm-for-feature, estimate-llm-feature-cost]
args:
  - name: model
    description: The model and its architecture facts if known, for example "Llama-style 70B dense, 80 layers, 8 KV heads, head dim 128" or a model card name.
    type: text
    required: true
  - name: workload
    description: Serve or fine-tune; precision or quantisation; context length; concurrent requests or batch size; for fine-tuning, full, LoRA or QLoRA and sequence length.
    type: text
    required: true
  - name: hardware
    description: GPUs available or being considered, for example "A100 80GB with NVLink" or "two 24GB consumer cards".
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Memory breakdown, GPU plan, Throughput notes, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GPU sizing goes wrong in a few predictable ways. People size for the weights only and forget the KV cache, which at long context and high concurrency can be larger than the weights themselves. They use the attention head count instead of the KV head count, so a grouped-query model looks eight times more expensive than it is. They assume a mixture-of-experts model needs memory for its active parameters only, when every expert must be resident. They plan full fine-tuning at "2 bytes per parameter" when mixed-precision Adam needs roughly 16 bytes per parameter before activations. And they ignore the overhead real servers take: CUDA context, framework buffers, and serving engines that reserve a fixed share of memory (vLLM defaults to about 90%). Decode speed at small batch is limited by memory bandwidth, not FLOPs, so "it fits" and "it is fast enough" are separate questions.
</context>

<task>
Estimate the hardware for this model: {{model}}

Workload: {{workload}}
{{#hardware}}

Hardware under consideration: {{hardware}}
{{/hardware}}

1. List the architecture facts the estimate needs: total parameters (and active parameters for MoE), number of layers, number of KV heads, head dimension, vocabulary size. Take them from the input; where a fact is missing, state the value you assume and say it must be checked against the model's config file.
2. Weights: parameters times bytes per parameter (FP32 4, BF16/FP16 2, FP8/INT8 1, 4-bit about 0.5 plus roughly 5-10% for scales and zero points). For MoE, use total parameters.
3. KV cache for serving: 2 (keys and values) x layers x KV heads x head dimension x bytes per element x tokens, where tokens = context length x concurrent sequences. Give the per-token figure and the total at the stated concurrency. Note when a KV cache in FP8 is an option.
4. Fine-tuning, if asked: full fine-tuning with mixed-precision Adam at about 16 bytes per parameter (weights, gradients, FP32 master copy, two optimiser states) plus activations; LoRA as frozen weights plus small adapters, gradients and optimiser states for the adapters only; QLoRA with 4-bit base weights. Estimate activations from sequence length, batch, hidden size and layers, and say how gradient checkpointing changes them.
5. Add overhead: 1-2 GB per GPU for CUDA context and buffers, and the serving engine's memory reservation. Show the total per configuration.
6. Turn the total into a GPU plan: GPU model and count, the parallelism needed (tensor parallel within a node needs fast interconnect, and the head count must divide by the tensor-parallel size), and headroom left for the KV cache.
7. Throughput notes: rough decode tokens per second at batch 1 as memory bandwidth divided by bytes read per token, and how batching raises total throughput while each user's speed drops. Label every number as an estimate.
8. Compare at most three options (for example BF16 on more GPUs, FP8 on fewer, 4-bit on one) with the quality and speed trade-off of each.
</task>

<constraints>
- Show the arithmetic for every figure so it can be checked. Use GB = 10^9 bytes or GiB = 2^30 bytes, say which, and be consistent.
- Do not invent model architecture numbers or GPU prices as facts. Mark assumed values clearly.
- Do not promise latency or throughput; give ranges and say a load test on the target engine settles it.
- Warn when quantisation below 8 bits may hurt quality for the use case, and suggest an eval before committing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Architecture facts, precision, context, concurrency; assumed values marked.
## Memory breakdown
Table: component | formula | value per GPU or total.
## GPU plan
Recommended configuration and up to two alternatives, with parallelism.
## Throughput notes
Estimated ranges and what limits them.
## Risks
Bullets: what could make the estimate wrong.
## Open questions
Numbered, or "None".
</output_format>
