---
schema: 1
id: convert-model-to-onnx
kind: prompt
title: Convert a model to ONNX and verify it
description: "Exports a PyTorch or scikit-learn model to ONNX with dynamic shapes, verifies numerical parity on real inputs with ONNX Runtime, and benchmarks inference speed."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, ship]
role: [ml-engineer, backend-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [onnx, onnx-runtime, model-export, inference-optimization]
pairs_with:
  prompts: [serve-ml-model-as-api, train-object-detector]
args:
  - name: model
    description: Where the model is, its framework and version, inputs and outputs, and any preprocessing done outside the model.
    type: text
    required: true
  - name: target
    description: Where the ONNX model will run (ONNX Runtime on CPU or GPU, a mobile runtime, TensorRT) and the batch sizes and input shapes it must accept.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Export plan, Code, Parity results, Benchmark, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An ONNX export that runs is not an export that is correct. Models exported in training mode keep dropout active or batch-norm statistics updating. A dummy input with fixed shapes bakes the batch size and sequence length into the graph unless dynamic axes are declared. Data-dependent Python control flow is traced along one path only, so other inputs silently take the wrong branch. Unsupported operators fail at export or get replaced by slow fallbacks. scikit-learn converters need input types declared, and float64 to float32 casts change results near decision boundaries. Preprocessing done in Python outside the model (tokenisation, normalisation, feature encoding) must be reproduced exactly at inference or moved into the graph. Parity has to be checked on real, varied inputs with stated tolerances, and speed measured after warm-up with the thread settings the target will use.
</context>

<task>
Export this model to ONNX: {{model}}

Target: {{target}}

1. Read the model code, its preprocessing and the installed library versions. List inputs and outputs with names, dtypes and which dimensions vary.
2. Plan the export: the exporter (the framework's exporter, a converter library for scikit-learn or gradient boosting, or a model-hub export tool for transformer models), the opset supported by the target runtime, dynamic axes, and any preprocessing to move into the graph or replicate. Flag control flow that depends on input values.
3. Export with the model in evaluation mode and representative example inputs; name inputs and outputs. Run the ONNX checker and print the graph's input and output signatures.
4. Verify parity on at least 100 real inputs covering different shapes, batch sizes and edge cases (empty or minimum-length, maximum length, extreme values): compare outputs with stated absolute and relative tolerances, and for classifiers also compare predicted labels and report any flips.
5. Benchmark on the target or the closest available hardware: warm-up runs, then latency percentiles and throughput at the expected batch sizes, against the original framework, with session and thread options stated.
6. Optionally apply graph optimisation or quantisation; if so, repeat the parity check against the original and report any accuracy change on a labelled sample.
7. Save the model with a small metadata file (source commit, opset, input spec, tolerances used), and add a test that loads it and checks parity on a fixed sample. Run it.
</task>

<constraints>
- Do not claim parity without the comparison results.
- Do not quantise without measuring accuracy afterwards.
- Pin the opset and runtime version and state them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Export plan
Exporter, opset, dynamic axes, preprocessing handling, risks.
## Code
Code blocks with file paths.
## Parity results
Max absolute and relative difference, label flips, tolerances.
## Benchmark
Table: runtime | batch | p50 | p95 | throughput.
## Check
Commands run and real results.
## Open questions
Numbered, or "None".
</output_format>
