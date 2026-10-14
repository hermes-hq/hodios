---
schema: 1
id: write-pytorch-training-loop
kind: prompt
title: Write a PyTorch training loop
description: "Writes a PyTorch training loop with mixed precision, gradient clipping, checkpointing that can resume, seeding, validation and early stopping, plus an overfit-one-batch test."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, researcher]
stack: [pytorch]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [training-loop, mixed-precision, checkpointing, reproducibility, deep-learning]
pairs_with:
  prompts: [plan-ml-experiment, set-up-experiment-tracking]
  personas: [ml-engineer]
args:
  - name: task
    description: The model, the dataset and DataLoader (or where they are defined), the loss and the validation metric.
    type: text
    required: true
  - name: hardware
    description: GPU type and count, or CPU only, and whether bfloat16 is supported.
    type: string
  - name: framework_notes
    description: The PyTorch version and anything the loop must fit into, such as an existing config system or logger.
    type: string
output_contract:
  format: markdown
  sections: [Design, Code, Tests, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hand-written PyTorch loops tend to carry the same handful of bugs. `model.eval()` is called for validation and never switched back, so dropout and batch norm stay off for the rest of training. Gradients are not zeroed or are zeroed in the wrong place, which accumulates them by accident. With float16 autocast the gradient scaler is missing, so small gradients underflow, or gradients are clipped before `scaler.unscale_`, which clips the scaled values. bfloat16 needs no scaler. The scheduler is stepped per epoch when it was designed per step, or before the optimiser. Checkpoints save only the model weights, so resuming resets the optimiser, scheduler, scaler and random state and the curve jumps. DataLoader workers all share one seed unless a generator and worker init function are set. And nobody runs the one test that catches most of this: can the loop overfit a single small batch to near-zero loss?
</context>

<task>
Write a training loop for: {{task}}
{{#hardware}}

Hardware: {{hardware}}
{{/hardware}}
{{#framework_notes}}

Fit into: {{framework_notes}}
{{/framework_notes}}

1. Read the existing model, dataset, config and logging code. Reuse them; do not add a training framework the project does not use.
2. Write the loop:
   - seeding for Python, NumPy and torch, a DataLoader generator and worker init function, and a flag for deterministic algorithms with its speed cost noted;
   - device placement, `model.train()` at the start of every epoch and `model.eval()` with `torch.inference_mode()` for validation;
   - `optimizer.zero_grad(set_to_none=True)`, forward under `torch.autocast` (bfloat16 if supported, else float16 with `GradScaler`), backward, unscale then clip gradients, optimiser step, scaler update, scheduler step at the granularity it expects;
   - optional gradient accumulation with the loss divided by the number of steps;
   - validation each epoch (or every N steps) computing the stated metric over the whole validation set;
   - early stopping on the validation metric with patience, keeping the best checkpoint;
   - checkpoints containing model, optimiser, scheduler, scaler, epoch, step, best metric, and RNG states, written atomically (to a temp file then renamed), and a resume path that restores all of them;
   - logging of loss, learning rate, gradient norm and throughput through the project's logger.
3. Detect non-finite loss and stop with a clear message that includes the step and batch index.
4. Write tests: overfit one small batch to near-zero loss; save then resume gives the same next-step loss as continuing; validation does not change model weights; the loop runs on CPU for two steps.
5. Run the tests and report the real results.
</task>

<constraints>
- Use APIs that exist in the stated PyTorch version; if unsure, say so and check the installed version.
- Do not start a long training run; the tests use tiny data and few steps.
- Keep the loop readable in one file unless the project already splits it differently.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Bullets: precision mode, scheduler granularity, checkpoint contents, early stopping rule.
## Code
Code blocks with file paths.
## Tests
Code blocks with file paths.
## Check
Commands run and real results.
## Open questions
Numbered, or "None".
</output_format>
