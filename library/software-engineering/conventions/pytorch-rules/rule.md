---
schema: 1
id: pytorch-rules
kind: rule
title: PyTorch rules
description: Standing rules for PyTorch code covering device-agnostic tensors, seeded runs, train and eval modes, no_grad inference, DataLoader settings, full checkpoints, shape comments and mixed precision.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, researcher]
stack: [pytorch]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [deep-learning, training-loop, reproducibility, checkpoints, gpu]
applies_to: ["**/*.py", "**/*.ipynb"]
pairs_with:
  rules: [python-style-rules]
  prompts: [write-pytorch-training-loop]
  personas: [ml-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change PyTorch code in this project:

**Know the setup first**
- Check the PyTorch version, the hardware the code runs on (CUDA, ROCm, Apple MPS, CPU only) and whether the project uses a training framework (Lightning, Accelerate, Hugging Face Trainer). Follow the framework instead of hand-writing what it already does.

**Devices**
- Write device-agnostic code: choose the device once (`device = torch.device(...)` from config or availability) and move the model and each batch with `.to(device)`. Never hard-code `.cuda()` calls scattered through the code.
- Create new tensors on the right device and dtype directly (`torch.zeros(..., device=x.device, dtype=x.dtype)`) instead of creating on CPU and moving.
- Avoid hidden device syncs in the training loop: no `.item()`, `.cpu()` or `print(tensor)` every step; log aggregated values every N steps.

**Reproducibility**
- Seed Python, NumPy and torch (and CUDA) from one config value at the start, seed DataLoader workers through a `generator` and `worker_init_fn`, and record the seed with the run. Say when deterministic algorithms are on or off; exact reproducibility on GPU needs them and costs speed.
- Keep hyperparameters in a config object or file, not literals scattered across modules, and save the config with each checkpoint.

**Training and evaluation**
- Call `model.train()` before training and `model.eval()` before validation or inference; dropout and batch norm behave differently. Wrap evaluation and inference in `torch.inference_mode()` or `torch.no_grad()`.
- Use the standard step order: `optimizer.zero_grad(set_to_none=True)`, forward, loss, `backward()`, optional gradient clipping, `optimizer.step()`, `scheduler.step()` at the interval the scheduler expects.
- Pass raw logits to `CrossEntropyLoss` and `BCEWithLogitsLoss`; do not apply softmax or sigmoid first.
- Use automatic mixed precision (`torch.autocast` with a `GradScaler` for float16) when the hardware supports it, and keep loss computation numerically stable.
- Check for data leakage: the validation and test splits never feed training, normalisation statistics come from the training split only.

**Data loading**
- Do heavy preprocessing in the `Dataset` or offline, not in the training loop. Set `num_workers`, `pin_memory` on CUDA and `persistent_workers` sensibly, and shuffle only the training loader.
- Handle the last incomplete batch deliberately (`drop_last` or masking).

**Shapes and modules**
- Comment tensor shapes at non-obvious points (`# (batch, seq, hidden)`). Assert shapes at module boundaries during development.
- Register submodules as attributes or in `nn.ModuleList`/`nn.ModuleDict`, not plain Python lists, so their parameters are trained and moved. Use `register_buffer` for non-trainable state.

**Checkpoints**
- Save a full checkpoint: model `state_dict`, optimizer, scheduler, scaler, epoch or step, config and seed, so training can resume exactly. Save the `state_dict`, not the pickled model object.
- Load untrusted checkpoints only with `weights_only=True`; pickled files can run code.
- Write checkpoints to a temporary file and rename, so a crash does not leave a corrupt latest checkpoint.

**Before you finish**
- Run a quick overfit test on one small batch (loss should go near zero) and a short training run, check that the validation metrics are computed in eval mode, and run unit tests. Say what you ran and on which device.
