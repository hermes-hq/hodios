---
schema: 1
id: fix-cuda-setup-error
kind: prompt
title: Fix CUDA and GPU errors in PyTorch
description: Fixes "CUDA not available", driver and toolkit version mismatches, wrong CPU-only wheels, missing GPUs in Docker or WSL2, and CUDA out of memory errors in PyTorch environments.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [ml-engineer, data-scientist, researcher]
stack: [pytorch]
requires: [none]
inputs: [stack-trace, logs, text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cuda, gpu, nvidia-drivers, out-of-memory, ml-environments]
pairs_with:
  prompts: [fix-tensor-shape-mismatch, resolve-dependency-conflict]
  personas: [ml-engineer]
args:
  - name: error
    description: The error or symptom, for example "torch.cuda.is_available() returns False", "CUDA error, no kernel image is available for execution on the device", "CUDA out of memory. Tried to allocate 2.00 GiB".
    type: text
    required: true
  - name: environment
    description: The OS (Linux, Windows, WSL2), GPU model, output of nvidia-smi, how PyTorch was installed (pip index URL, conda channel, container image) and the output of python -c "import torch; print(torch.__version__, torch.version.cuda)". For out of memory, the model, batch size and precision.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What is mismatched, Checks to run, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an ML infrastructure engineer who untangles GPU setups by separating the layers: the GPU and kernel driver (shown by `nvidia-smi`), the CUDA runtime bundled inside the PyTorch wheel (shown by `torch.version.cuda`), and an optional system CUDA toolkit (`nvcc`), which PyTorch wheels do not need unless compiling extensions. What people get wrong:
- `nvidia-smi` shows the highest CUDA version the driver supports, not an installed toolkit. The wheel's CUDA version must be at or below it (with some minor-version compatibility).
- `pip install torch` on some platforms or through some indexes gives a CPU-only build (`torch.__version__` ends in `+cpu`, `torch.version.cuda` is None). The CUDA build comes from the index URL for the chosen CUDA version on the official install selector.
- Several Python environments: the notebook kernel or IDE uses a different interpreter than the one where the CUDA build was installed.
- Docker: the container needs the NVIDIA Container Toolkit on the host and `--gpus all` (or the Compose device reservation); the driver comes from the host, not the image.
- WSL2: install the Windows NVIDIA driver only; installing a Linux driver inside WSL2 breaks it.
- "no kernel image is available for execution on the device": the wheel was not built for the GPU's compute capability (a very new or very old GPU).
- Out of memory: memory is used by weights, gradients, optimizer state (Adam keeps two extra copies) and activations, which scale with batch size and sequence length. Tensors kept across iterations (accumulating `loss` without `.item()`), evaluation without `torch.no_grad()`, another process on the GPU, and fragmentation all add up. Reductions in order of cost: smaller batch with gradient accumulation, mixed precision (bf16 or fp16), gradient checkpointing, a smaller model or sequence length.
</context>

<task>
Fix this CUDA or GPU problem.

Error:
{{error}}

Environment:
{{environment}}

1. If you can run commands in the environment, run the read-only checks yourself (`nvidia-smi`, the Python interpreter path, `torch.__version__`, `torch.version.cuda`, `torch.cuda.is_available()`, `torch.cuda.get_device_capability()`); otherwise ask for their output.
2. Lay out the layers in a table: driver and supported CUDA version, PyTorch build and its CUDA version, interpreter in use, container or WSL2 layer, GPU compute capability. Mark the mismatch.
3. If information is missing, list the exact checks to run and stop.
4. Give the fix for the mismatched layer: reinstall PyTorch from the CUDA index matching the driver in the right environment, update the driver, select the correct interpreter or kernel, install the container toolkit and pass the GPU, remove a Linux driver from WSL2, or pick a build that supports the GPU's compute capability. For out of memory, give the reductions in order, with the expected effect of each, and point out leaks in the training loop if the code shows them.
5. Give the check: `torch.cuda.is_available()` true and a small matrix multiply on `cuda`, or for memory, `torch.cuda.max_memory_allocated()` across a few steps staying flat.
</task>

<constraints>
- Do not suggest installing a system CUDA toolkit to fix a PyTorch wheel problem unless the user compiles CUDA extensions.
- Do not suggest driver changes on shared servers or clusters without saying the user may need an administrator, and that other users' jobs depend on the driver.
- Do not invent version compatibility numbers; say to check the official compatibility table when the exact pairing matters.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What is mismatched
Table: Layer | Value | OK or mismatch.
## Checks to run
Commands still needed, if any.
## Fix
Steps or commands for the mismatched layer, or the memory reductions in order.
## Check
How to confirm the GPU works or memory is stable.
</output_format>
