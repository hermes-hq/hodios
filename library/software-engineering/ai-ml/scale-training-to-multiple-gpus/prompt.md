---
schema: 1
id: scale-training-to-multiple-gpus
kind: prompt
title: Scale PyTorch training to multiple GPUs
description: "Converts a single-GPU PyTorch training script to DDP or FSDP with correct sampling, per-rank seeding, rank-0 logging and checkpointing, and a test run on two processes."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, researcher]
stack: [pytorch]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [distributed-training, ddp, fsdp, multi-gpu, torchrun]
pairs_with:
  prompts: [write-pytorch-training-loop, estimate-llm-gpu-requirements]
args:
  - name: script
    description: Path to the current single-GPU training script and its launch command.
    type: text
    required: true
  - name: target
    description: GPUs per node and node count, interconnect if known, and whether the model fits on one GPU.
    type: text
    required: true
  - name: framework_notes
    description: PyTorch version and any wrapper already in use (Lightning, Accelerate, DeepSpeed).
    type: string
output_contract:
  format: markdown
  sections: [Strategy, Changes, Code, Launch, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moving to several GPUs changes the semantics of a script in ways that do not crash. Without a `DistributedSampler`, every rank trains on the same data; without `sampler.set_epoch(epoch)`, the shuffle repeats every epoch. The effective batch size multiplies by the world size, so the learning rate and warm-up usually need adjusting. Every rank writes logs and checkpoints at once unless guarded, corrupting files. Saving `model.state_dict()` from a DDP wrapper adds a `module.` prefix that breaks loading elsewhere. Validation metrics computed per rank and printed from rank 0 report a quarter of the data. Batch norm statistics stay per GPU unless converted. Data-parallel DDP needs the whole model on each GPU; when it does not fit, FSDP shards parameters, gradients and optimiser states, but its checkpoints need a state-dict policy chosen deliberately. If the project already uses Lightning, Accelerate or DeepSpeed, the right move is to configure that, not hand-roll.
</context>

<task>
Scale this script: {{script}}

Target: {{target}}
{{#framework_notes}}

Notes: {{framework_notes}}
{{/framework_notes}}

1. Read the script, its data loading, checkpointing, logging and evaluation. If a training wrapper is already in use, plan the change through it instead.
2. Choose the strategy: DDP when the model, gradients and optimiser fit on one GPU; FSDP (or the wrapper's equivalent) when they do not; say why, with a rough memory estimate.
3. Make the changes:
   - launch with `torchrun`, initialise the process group from environment variables, set the device from `LOCAL_RANK`, and destroy the group at exit;
   - wrap the model (DDP with `device_ids`, or FSDP with an auto-wrap policy and mixed precision settings);
   - `DistributedSampler` for training and validation, with `set_epoch` each epoch and no `shuffle=True` on the DataLoader; note that it pads the last batch with repeated samples when the dataset does not divide by the world size, so exact validation metrics need that padding removed or a non-padded evaluation on one rank;
   - seeds offset by rank where randomness should differ (augmentation) and identical where it must match (model init);
   - the per-GPU batch size and learning rate rule, stated explicitly (keep the global batch, or scale the learning rate with warm-up);
   - convert batch norm with `SyncBatchNorm` where batches per GPU are small;
   - reduce validation metrics across ranks with `all_reduce` before reporting;
   - log and save only on rank 0, with a barrier around checkpointing; save the unwrapped model's state dict for DDP and a chosen full or sharded state dict for FSDP; resume loads on every rank;
   - use `no_sync` during gradient accumulation steps with DDP.
4. Test on two processes before using real hardware: CPU with the gloo backend or two GPUs, a few steps, checking that each rank sees different samples, loss matches a single-process run within tolerance for the same global batch, and a checkpoint saves and reloads.
5. Give the launch commands for one node and for several nodes.
</task>

<constraints>
- Keep single-GPU runs working with the same script.
- Do not launch multi-node jobs or reserve cluster resources without asking.
- Use APIs that exist in the stated PyTorch version; name any you are unsure of.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Strategy
DDP or FSDP and why, with the memory estimate.
## Changes
Bullets: each semantic change and the bug it prevents.
## Code
Code blocks or diffs with file paths.
## Launch
Commands for single node and multi-node.
## Check
The two-process test and its real result.
## Open questions
Numbered, or "None".
</output_format>
