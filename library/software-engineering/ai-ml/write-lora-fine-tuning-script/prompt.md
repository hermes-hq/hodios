---
schema: 1
id: write-lora-fine-tuning-script
kind: prompt
title: Write a LoRA fine-tuning script
description: Writes a LoRA or QLoRA fine-tuning script with Hugging Face PEFT and TRL that fits the user's GPU, uses the model's chat template, evaluates against the base model and exports the adapter.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, researcher]
stack: [pytorch, huggingface]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [lora, qlora, peft, fine-tuning, gpu-memory]
pairs_with:
  prompts: [plan-fine-tuning, review-training-data]
args:
  - name: setup
    description: Base model, dataset path and format, the task, GPU type and memory (or cloud instance), and library versions if pinned.
    type: text
    required: true
  - name: goal
    description: What success looks like and the evaluation set or metric to beat the base model on.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Memory plan, Configuration, Code, Smoke test, Evaluation, Export and serving, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
LoRA trains small adapter matrices instead of all weights, and QLoRA does it on a 4-bit quantised base, so a 7 to 8 billion parameter model fits on a single 24 GB GPU. Most failed runs come from a few mistakes: formatting examples by hand instead of with the tokenizer's chat template, so the fine-tuned model breaks at inference; computing loss on the prompt as well as the answer; a missing or wrong padding token; sequence length cut too short, so answers are truncated; learning rates copied from full fine-tuning; targeting only attention projections when the task needs more capacity; and no comparison with the base model, so nobody knows if the run helped. Library APIs (transformers, peft, trl, bitsandbytes) change often, so the script must match the installed versions.
</context>

<task>
Write a LoRA fine-tuning script for: {{setup}}

Goal: {{goal}}

1. Read the repository and the installed library versions (`pip show` or the lock file). Write code for those versions; if a needed library is missing, list the pinned install command for the user rather than installing silently.
2. Memory plan: estimate memory for the base model in bf16 versus 4-bit, adapter and optimiser state, and activations at the chosen sequence length and batch size; choose LoRA or QLoRA, gradient checkpointing and gradient accumulation to fit the GPU.
3. Configuration in one place: rank and alpha, dropout, target modules (attention and MLP projections for most tasks, with the module names checked against the model), learning rate in the usual LoRA range with warmup and cosine decay, epochs, max sequence length from the dataset's token-length percentiles, seed, and bf16 where supported.
4. Data: load the dataset, apply the tokenizer's chat template, mask the loss to assistant tokens only, set the padding token correctly, and report how many examples exceed the max length.
5. Training: use TRL's SFT trainer or plain transformers per the installed versions, log to the project's tracker if any, evaluate on the validation split during training, and save checkpoints.
6. Smoke test: a run on 50 examples for a few steps to confirm loss falls and memory fits, before the full run. Run it if a GPU is available.
7. Evaluation: generate on the held-out set with base and fine-tuned models using the same chat template and decoding settings, and compare on the goal metric; include a few side-by-side samples.
8. Export: save the adapter, and optionally a merged model (merge into the full-precision base, not the 4-bit one), with the tokenizer and a note of the versions, and how to load it for serving.
</task>

<constraints>
- Do not start the full training run without the user's go-ahead; run only the smoke test.
- Check the base model's licence permits fine-tuning and the intended use, and say what to verify.
- Use only arguments that exist in the installed library versions; if unsure, say so and point to the changelog.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Memory plan
The arithmetic and the chosen settings.
## Configuration
Table: setting | value | why.
## Code
Code blocks with file paths.
## Smoke test
Command and real output (loss, memory), or a plain statement that it was not run.
## Evaluation
How base and fine-tuned models are compared, and results if run.
## Export and serving
Adapter and merged-model steps.
## Risks
Overfitting, forgetting, licence and data issues.
</output_format>
