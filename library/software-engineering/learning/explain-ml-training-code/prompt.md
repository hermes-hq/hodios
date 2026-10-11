---
schema: 1
id: explain-ml-training-code
kind: prompt
title: Explain a model training script
description: Explains a PyTorch-style training script section by section, covering data loading, model, loss, optimiser, training loop and evaluation, with tensor shapes and the ML idea behind each part.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, ml-engineer, data-scientist, student]
stack: [pytorch]
requires: [none]
inputs: [text, file]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [deep-learning, training-loop, tensor-shapes, code-reading]
pairs_with:
  prompts: [write-pytorch-training-loop, debug-neural-network-training, find-leakage-in-training-code]
args:
  - name: code
    description: The training script or notebook cells.
    type: text
    required: true
  - name: background
    description: What you already know, such as "good Python, no ML" or "know the theory, new to PyTorch".
    type: text
output_contract:
  format: markdown
  sections: [What this trains, Section by section, Shapes through the model, Things that look odd, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Training scripts look alike, and the learning is in the details that change the result. Readers new to them need the map (data, model, loss, optimiser, loop, evaluation) and then the conventions that trip everyone: the batch dimension comes first and shapes must line up at every layer; `CrossEntropyLoss` expects raw logits and class indices, so a softmax before it is a bug; `optimizer.zero_grad()`, `loss.backward()` and `optimizer.step()` must happen in that order each step; `model.train()` and `model.eval()` change dropout and batch norm; evaluation should run under `torch.no_grad()`; the learning-rate scheduler steps per batch or per epoch depending on its type; data augmentation belongs on training data only; and normalisation statistics computed on the whole dataset leak test information.
</context>

<task>
Explain this training code.
{{#background}}
The reader's background: {{background}}. Pitch the ML and framework explanations to that.
{{/background}}

```python
{{code}}
```

1. Say in two or three sentences what is being trained: the task (classification, regression, generation), the data, the model family and what a prediction is.
2. Walk through the script section by section (imports and config, data loading and preprocessing, dataset splits, model definition, loss, optimiser and scheduler, training loop, evaluation, saving). For each section: what the code does, the ML idea behind it in plain words, and the key hyperparameters with what changing them does.
3. Trace tensor shapes through one batch: input batch, each layer or block of the model, output, target and loss. Use symbols for the batch size and the given values for the rest. Mark any shape you inferred rather than read.
4. Explain one training step in order (forward, loss, zero grad, backward, step, scheduler) and what each line changes in memory or in the weights.
5. Point out things that look odd or wrong, each with why it matters: softmax before cross-entropy, missing zero_grad, missing eval mode or no_grad in evaluation, augmentation on validation data, leakage between splits, a scheduler stepped at the wrong frequency, metrics averaged incorrectly, or tensors kept on the graph across steps (`loss` instead of `loss.item()` when logging).
</task>

<constraints>
- Explain; do not rewrite the script. Corrections appear only as notes under things that look odd.
- Do not claim what accuracy or loss the run will reach. Say what to watch in the curves instead.
- If the code uses a framework other than PyTorch (Keras, JAX, Lightning, Hugging Face Trainer), map the same sections to it and say which steps the framework hides.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this trains
Two or three sentences.
## Section by section
A heading per section with code reference, explanation and hyperparameters.
## Shapes through the model
A table: step, tensor, shape, note.
## Things that look odd
Bullets with why each matters. "None found" if none.
## Questions
What the code alone did not answer, such as the dataset or hardware.
</output_format>
