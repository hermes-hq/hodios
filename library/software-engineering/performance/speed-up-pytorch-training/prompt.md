---
schema: 1
id: speed-up-pytorch-training
kind: prompt
title: Speed up PyTorch training throughput
description: Raises GPU utilisation and samples per second in a PyTorch training loop by fixing data loading stalls, host-device syncs and precision, then applying torch.compile, checked against loss curves.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [ml-engineer]
stack: [pytorch]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [gpu-utilization, dataloader, mixed-precision, torch-compile, training-throughput]
pairs_with:
  prompts: [write-pytorch-training-loop, scale-training-to-multiple-gpus, debug-neural-network-training, profile-hot-path]
  personas: [ml-engineer, performance-engineer]
args:
  - name: training
    description: The training script, model size and type, GPU(s), PyTorch version, current samples or steps per second and GPU utilisation, dataset format and where it is stored.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Bottleneck, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Low GPU utilisation in `nvidia-smi` almost always means the GPU is waiting, not that it needs a bigger model. The common causes, roughly in order: a data loader that cannot keep up (`num_workers=0`, heavy per-sample decoding or augmentation in Python, many small files on network storage, no `pin_memory`, no `persistent_workers`); hidden host-device synchronisations in the loop (`.item()`, `.cpu()`, printing tensors, or Python control flow on tensor values every step), which stall the CUDA queue; full FP32 on GPUs with tensor cores, where bf16 autocast (or fp16 with a gradient scaler on older GPUs) is typically much faster; small batches that leave the GPU idle between kernels; and many tiny kernels from unfused operations, which `torch.compile` can fuse after its warm-up. Set `torch.backends.cuda.matmul.allow_tf32` or `torch.set_float32_matmul_precision("high")` on Ampere and later for FP32 matmuls. The PyTorch profiler with a trace view, or simply timing data wait versus step time, tells you which case you are in. Changing batch size changes optimisation dynamics, so the learning rate and schedule may need adjusting; throughput gains must not cost convergence.
</context>

<task>
Speed up this training: {{training}}

1. Read the training loop, data pipeline and dataset class, and note GPU type, PyTorch version and precision.
2. Measure a short run after warm-up: steps per second, samples per second, GPU utilisation and memory, and the share of each step spent waiting for data. Run the PyTorch profiler for a few steps if possible.
3. Name the bottleneck with evidence: data loading, host-device syncs, precision, batch size or kernel overhead.
4. Fix in order of evidence: loader workers, pinned memory, prefetching and moving costly preprocessing offline or onto the GPU; remove per-step syncs and log every N steps; enable bf16 or fp16 autocast with a scaler where needed; raise batch size to fit memory (with gradient accumulation if needed); then try `torch.compile` and measure after warm-up.
5. Re-measure throughput and compare the loss curve over the same number of samples against the baseline to show training still converges the same way.
</task>

<constraints>
- Report throughput only after warm-up and over enough steps to be stable.
- Treat a changed batch size or precision as a change to training dynamics: show the loss curve, and flag needed learning-rate changes.
- Do not change the model architecture or data to gain speed without saying so.
- Do not launch long or costly multi-GPU runs without confirmation.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Throughput, GPU utilisation and memory, data wait share.
## Bottleneck
What limits throughput, with profiler or timing evidence.
## Changes
One line per change: file, what, why.
## Results
Throughput after, loss curve comparison, open risks.
</output_format>
