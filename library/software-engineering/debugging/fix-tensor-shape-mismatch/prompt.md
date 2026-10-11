---
schema: 1
id: fix-tensor-shape-mismatch
kind: prompt
title: Fix a tensor shape, dtype or device mismatch
description: Fixes PyTorch and NumPy shape mismatch, dtype and device errors such as "mat1 and mat2 shapes cannot be multiplied" by tracing tensor shapes layer by layer through the model and data pipeline.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, researcher]
stack: [pytorch]
requires: [none]
inputs: [stack-trace, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tensors, shape-errors, broadcasting, deep-learning, numpy]
pairs_with:
  prompts: [explain-stack-trace, fix-cuda-setup-error]
  personas: [ml-engineer]
args:
  - name: error
    description: The full traceback, including the line in your code and the shapes or dtypes the error prints.
    type: text
    required: true
  - name: code
    description: The model definition, the forward pass, and the data loading or preprocessing that produces the inputs, with the input size and batch size you use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Shape trace, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an ML engineer who fixes tensor errors by writing down the shape at every step instead of guessing reshapes. What novices miss:
- "mat1 and mat2 shapes cannot be multiplied (A x B and C x D)": the input to a `Linear` layer has B features while the layer expects C. After convolutions and pooling, the flattened size depends on the input image size; change the image size and the first `Linear` breaks. `nn.LazyLinear` or computing the size with a dummy forward pass avoids hard-coding it.
- `view` versus `reshape`: `view` fails on non-contiguous tensors (after `transpose` or `permute`). A reshape that "works" can silently mix the batch dimension with features; flattening should keep dimension 0 (`flatten(1)`).
- Layout conventions: PyTorch convolutions expect channels first (N, C, H, W); images loaded with PIL or OpenCV are H, W, C, and OpenCV is BGR. Recurrent layers default to (seq, batch, feature) unless `batch_first=True`.
- Missing or extra batch dimensions: a single sample needs `unsqueeze(0)`; `squeeze()` without an argument removes a batch dimension of size 1 too, which breaks on the last small batch.
- Broadcasting hides bugs: subtracting a (N,) tensor from a (N, 1) tensor gives (N, N) with no error, typical in loss functions comparing predictions of shape (N, 1) with targets of shape (N,).
- Loss functions expect specific shapes and dtypes: `CrossEntropyLoss` takes raw logits (N, C) and integer class indices (N,) of dtype long, not one-hot floats or probabilities after softmax; `BCEWithLogitsLoss` takes floats of the same shape as the logits.
- Dtype and device: "expected scalar type Float but found Double" comes from NumPy float64 arrays; "Expected all tensors to be on the same device" comes from a tensor created inside `forward` without `device=`, or inputs not moved with the model.
</context>

<task>
Fix this tensor error.

Error:
{{error}}

Code:
{{code}}

1. If you can read the repository or run the code, read the model, the dataset's `__getitem__`, transforms and collate function before answering. If you can run it, add temporary shape prints or a forward hook rather than reasoning only on paper.
2. Write a shape trace: the shape, dtype and device of the tensor after each step from the data loader to the failing line, for the user's input size and batch size. Mark any step where the shape is assumed rather than known.
3. Name the step where the actual shape differs from what the next operation expects, and why.
4. Give the fix at the source of the mismatch, not with a reshape right before the failing line: the correct `in_features` (or a lazy layer), channels-first conversion in the transform, `flatten(1)`, `batch_first=True`, correct target dtype and shape for the loss, `.float()` at data loading, or creating tensors on the input's device. Show it as a diff.
5. Give a check: a single forward and backward pass on a dummy batch with asserted output shape, and the last smaller batch of the epoch.
</task>

<constraints>
- Do not "fix" a mismatch with a reshape or `view` that merely makes the numbers multiply; state what each dimension means before and after.
- Warn when a fix silently relies on broadcasting, and check loss input shapes explicitly.
- Remove temporary debug prints or hooks once the cause is found, unless the user wants them kept.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Shape trace
Table: Step | Shape | Dtype | Device | Known or assumed.
## Cause
The step where it breaks and why.
## Fix
Diff.
## Check
Dummy batch test and edge batch.
</output_format>
