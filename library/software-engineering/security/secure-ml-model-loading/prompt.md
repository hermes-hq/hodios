---
schema: 1
id: secure-ml-model-loading
kind: prompt
title: Secure ML model and dataset loading
description: Removes code-execution risk from loading models and datasets (pickle, torch.load, joblib, trust_remote_code) using safetensors, pinned revisions, scanning and isolated conversion.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, data-scientist, security-engineer]
stack: [pytorch, huggingface]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [model-supply-chain, pickle, safetensors, trust-remote-code, ml-security]
pairs_with:
  prompts: [fix-insecure-deserialization, review-llm-app-security, vet-dependency]
  personas: [security-auditor]
args:
  - name: project
    description: The project and where its models and datasets come from (Hugging Face Hub, own storage, user uploads, partners), and where loading happens (training, serving, notebooks).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Load points, Findings, Changes, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many model formats are programs, not data. Python pickle runs arbitrary code during loading, and it sits underneath `torch.load` on full checkpoints, `joblib.load` and `pickle.load` for scikit-learn models, `pandas.read_pickle`, `numpy.load(allow_pickle=True)` and many dataset caches. Recent PyTorch releases default `torch.load` to `weights_only=True`, but code that passes `weights_only=False` to silence an error, or runs on older versions, is still exposed. In the Hugging Face ecosystem, `trust_remote_code=True` downloads and runs Python from the model repo, and a revision that is not pinned to a commit hash can change under you, so a model that was safe yesterday can run new code today. Keras models with Lambda layers can also carry code. `safetensors` stores only tensors and is the safe default for weights; ONNX and GGUF are data formats too. Pickle scanners catch known-bad patterns but can be bypassed, so they are a filter, not a guarantee; untrusted pickles should only ever be opened in an isolated, throwaway environment for conversion.
</context>

<task>
Secure model and dataset loading in {{project}}.

1. Find every load point: `torch.load`, `pickle`, `joblib`, `dill`, `cloudpickle`, `read_pickle`, `numpy.load`, `from_pretrained`, `pipeline(`, `hf_hub_download`, `snapshot_download`, `load_dataset`, Keras `load_model`, and any custom loaders. Record the source of each file and who can change it.
2. Classify each source: own artifacts from a controlled store, third-party public models, or user-supplied files. User-supplied pickles are critical findings.
3. Switch weight loading to safetensors where the model supports it (`use_safetensors=True`, `safetensors.torch.load_file`), and keep `torch.load(..., weights_only=True)` where a checkpoint must stay in PyTorch format.
4. Remove `trust_remote_code=True` where the architecture is supported natively by the installed library; where it is required, pin `revision` to a reviewed commit hash and note that the code was reviewed.
5. Pin every Hub model and dataset to a commit hash, and mirror production artifacts into the project's own storage with checksums verified on load.
6. For scikit-learn and other pickle-only formats from outside the team, recommend skops or ONNX, or a conversion step run in an isolated container with no network or credentials.
7. Add a CI or pre-load check with a pickle scanner if the project accepts it, described as a filter, not a guarantee.
8. Run the tests and a model load smoke test to confirm outputs are unchanged.
</task>

<constraints>
- Never load an untrusted pickle or remote code to "check it"; inspect metadata or use a scanner, and only convert inside isolation.
- Do not change model behaviour; confirm outputs match on a sample before and after the format switch.
- Do not invent library flags; check the installed versions and their docs before relying on a parameter.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Load points
Table: file:line, loader, source, who controls the source, risk.
## Findings
Ranked list with the fix for each.
## Changes
One line per file: `path`, what changed.
## Verification
Commands run, output comparison and actual results.
## Residual risk
What remains, such as required remote code or legacy checkpoints, and how it is contained.
</output_format>
