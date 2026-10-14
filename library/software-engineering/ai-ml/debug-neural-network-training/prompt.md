---
schema: 1
id: debug-neural-network-training
kind: prompt
title: Debug a neural network that will not train
description: "Diagnoses neural network training that diverges, stalls, produces NaN or overfits, checking in order: data, labels, loss setup, learning rate, initialisation and precision."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, researcher, data-scientist]
stack: [pytorch]
requires: [repo-read, shell]
inputs: [repo, logs, text]
output: [report, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [training-instability, nan-loss, overfitting, learning-rate, deep-learning]
pairs_with:
  prompts: [write-pytorch-training-loop, review-training-data]
  personas: [ml-engineer]
args:
  - name: symptom
    description: What the training does wrong, with the loss and metric curves or log excerpts, and when it started.
    type: text
    required: true
  - name: code
    description: Paths to the model, data pipeline, loss and training loop.
    type: text
    required: true
  - name: recent_changes
    description: What changed since training last worked, if it ever did.
    type: string
output_contract:
  format: markdown
  sections: [Symptom reading, Checks run, Root cause, Fix, Check, Next if not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most broken training runs are broken by the data or the plumbing, not the architecture. Labels misaligned with inputs after a shuffle or a join, augmentations that destroy the signal, inputs not normalised, or a loss applied to the wrong thing (softmax before `CrossEntropyLoss`, which expects logits; sigmoid before `BCEWithLogitsLoss`). A stalled loss often means the learning rate is far off, parameters missing from the optimiser, frozen layers, or `model.eval()` left on. NaN usually comes from float16 overflow, log of zero, division by a zero norm, a bad input row, or a learning rate spike. Overfitting from the first epoch can mean leakage between splits as much as a too-large model. An experienced engineer checks the cheapest things first, changes one thing at a time, and uses a few fixed tests: does the initial loss match the theory (about ln of the number of classes for balanced classification), and can the model overfit a single batch?
</context>

<task>
Diagnose this training problem: {{symptom}}

Code: {{code}}
{{#recent_changes}}

Recent changes: {{recent_changes}}
{{/recent_changes}}

1. Read the symptom carefully and classify it: diverges, NaN or Inf, stalls from the start, stalls after progress, validation much worse than training, or metric and loss disagree. Read the code paths it implicates before guessing.
2. Run the cheap checks in this order, stopping when one explains the symptom:
   - Data: inspect a few batches after all transforms (shapes, value ranges, normalisation, a sample decoded or plotted), check labels against inputs on a handful of examples, and look for NaN or extreme values.
   - Loss setup: the loss receives what it expects (logits versus probabilities, class indices versus one-hot, reduction), and the initial loss is close to the theoretical value.
   - Optimiser: all trainable parameters are registered, gradients are zeroed each step, the learning rate and scheduler are what the config says at step 0 and step N, and `model.train()` is on.
   - Overfit one batch: if the model cannot drive the loss on one batch close to zero, the bug is in the model, loss or optimiser, not in the data volume.
   - Gradients: per-layer gradient norms for vanishing, exploding or zero gradients (dead units, detached tensors).
   - Precision: float16 overflow, missing gradient scaler, or operations unsafe in reduced precision; retry in float32 or bfloat16 to confirm.
   - Learning rate: a short range test or a run at one tenth and ten times the rate.
   - For overfitting: leakage checks between splits, then regularisation, augmentation and data size.
3. Report each check with its real result. Change one thing at a time and keep each experiment short.
4. State the root cause with the evidence that confirms it, propose the smallest fix, apply it if the user agrees, and rerun a short training to show the curve now behaves.
5. If not resolved, say what has been ruled out and the next two checks.
</task>

<constraints>
- Do not rewrite the model or swap the architecture as a first move.
- Keep diagnostic runs short; ask before launching anything longer than a few minutes or using shared GPUs.
- Do not claim a fix until a rerun shows the symptom is gone.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Symptom reading
The class of failure and what it rules in and out.
## Checks run
Table: check | result | conclusion.
## Root cause
What it is, with evidence.
## Fix
Diff with file paths.
## Check
The rerun and its real result.
## Next if not fixed
Ruled out so far, and the next two checks.
</output_format>
