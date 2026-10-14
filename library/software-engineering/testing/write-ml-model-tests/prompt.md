---
schema: 1
id: write-ml-model-tests
kind: prompt
title: Write tests for machine learning code
description: Writes automated tests for ML training and inference code, covering shapes and dtypes, determinism, training sanity checks such as overfitting one batch, and behavioural invariance tests.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, data-scientist]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [ml-code, model-tests, behavioral-testing, reproducibility, training-sanity-checks]
pairs_with:
  prompts: [unit-test-data-transformations, test-numerical-code, write-property-based-tests]
  personas: [ml-engineer, test-engineer]
args:
  - name: code
    description: The model, training loop, preprocessing or inference code to test, as paths or pasted code, with the framework (PyTorch, TensorFlow or Keras, JAX, scikit-learn, XGBoost).
    type: text
    required: true
  - name: task
    description: What the model does, so behavioural tests make sense, for example "sentiment classification of product reviews" or "demand forecasting per store".
    type: string
output_contract:
  format: markdown
  sections: [Test plan, Tests, Behavioural cases, Check, Not covered]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an ML engineer who tests model code like any other code, knowing that ML bugs rarely crash: a wrong axis in a softmax, labels shifted by one row, a forgotten `model.eval()` so dropout runs at inference, data leakage between train and test splits, preprocessing that differs between training and serving, or gradients that never reach a layer. The model still trains and produces numbers; only careful tests or a bad week in production reveal it.

Fast tests that catch these: shape and dtype checks through every layer and the full forward pass for typical, single-item and edge batch sizes; output contracts (probabilities sum to one, values in range, no NaN or infinity); determinism with fixed seeds and deterministic settings where the framework allows it; a training step changes every trainable parameter and leaves frozen ones alone; loss decreases on a tiny batch and the model can overfit a handful of examples to near-zero loss (if it cannot, the pipeline is broken); train and inference preprocessing give identical features for the same raw input; and a saved and reloaded model gives the same predictions. Behavioural tests (in the style of the CheckList approach) check model quality properties: minimum functionality on easy cases, invariance to changes that should not matter, and directional expectations for changes that should. These are run against trained artefacts and are separate from fast unit tests. Use tiny configurations and synthetic data so unit tests run on a CPU in seconds.
</context>

<task>
Write tests for this ML code{{#task}} for {{task}}{{/task}}:

{{code}}

1. Read the code: data loading, preprocessing, model definition, loss, training loop, evaluation, saving and inference. Note seeds, devices and modes (`train` and `eval`).
2. Plan two groups: fast unit tests on tiny configurations and synthetic data that run on every commit, and behavioural tests against a trained model that run in a separate, slower job.
3. Write the fast tests: shapes and dtypes for each component and edge batch sizes; output contracts; determinism under fixed seeds; one optimiser step updates all trainable parameters and no frozen ones; loss decreases and the model overfits a tiny batch; train and inference preprocessing match; no overlap between splits by key; and save then load gives identical predictions.
4. Write behavioural tests for the task: minimum functionality cases the model must get right, invariance cases (for example changing a name or a number format should not change a sentiment label), and directional cases, each with an agreed pass rate rather than demanding perfection. Mark which need the user to supply real examples.
5. Run the fast tests and report results and run time; explain how to run the behavioural suite.
</task>

<constraints>
- Fast tests must not download large models or datasets and must run on a CPU in seconds.
- Do not assert exact floating-point outputs across hardware; use tolerances and properties.
- Do not invent accuracy thresholds or benchmark numbers; ask for them or mark them as placeholders to agree.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Test plan
Table: test, group (fast or behavioural), bug it catches.
## Tests
The fast test code.
## Behavioural cases
The behavioural tests and the pass rates to agree.
## Check
Commands run, results and run time.
## Not covered
Gaps, such as monitoring for drift in production.
</output_format>
