---
schema: 1
id: set-up-experiment-tracking
kind: prompt
title: Set up ML experiment tracking
description: "Adds MLflow or Weights and Biases tracking to training code so every run records parameters, metrics, code commit, data version, artifacts and registered models."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, researcher]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [experiment-tracking, mlflow, weights-and-biases, model-registry, reproducibility]
pairs_with:
  prompts: [plan-ml-experiment, write-pytorch-training-loop]
args:
  - name: training_code
    description: Paths to the training scripts and how they are launched today.
    type: text
    required: true
  - name: tool
    description: MLflow, Weights and Biases or another tracker, and whether a shared tracking server exists or must run locally.
    type: string
    required: true
  - name: team_needs
    description: What the team needs to answer later, for example "which data trained the production model" or "compare runs across people".
    type: string
output_contract:
  format: markdown
  sections: [What gets logged, Code, Conventions, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tracking that only logs a loss curve does not answer the question asked six months later: which code, data and settings produced the model in production? A useful run record has the git commit and whether the working tree was dirty, the full resolved config (not only the parameters someone remembered to log), a data version or content hash, the seed, library versions and hardware, metrics per step and final, and the model and key plots as artifacts. Runs need consistent experiment names and tags so people can find them, and a registry with aliases (for example "champion" and "challenger") so deployment points to a model, not a file path. Common mistakes: logging secrets inside the config, logging from every distributed rank, a tracking call that crashes training when the server is down, and personal data in logged samples.
</context>

<task>
Add experiment tracking to: {{training_code}}

Tool: {{tool}}
{{#team_needs}}

Team needs: {{team_needs}}
{{/team_needs}}

1. Read the training code, config handling and launch commands, and check whether a tracker is partly set up already.
2. Decide what gets logged per run: resolved config, git commit and dirty flag, data version or hash of the input files or table snapshot, seed, library versions, hardware, per-step and final metrics, the trained model with its signature or input example, evaluation plots, and the command line.
3. Implement a small tracking module the scripts call, rather than calls spread through the code: start run with experiment name and tags, log config, log metrics, log artifacts, end run with status. Log only from rank 0 in distributed training.
4. Make tracking failure-tolerant: an offline or local fallback, and training that continues if the server is unreachable, with a warning.
5. Filter secrets and personal data out of logged configs and samples.
6. Set up the model registry flow: register a model from a run, set aliases (recent MLflow versions deprecate stages in favour of aliases), and load the model by alias in the evaluation or serving code.
7. Write short conventions for the team: experiment naming, required tags, how to compare runs, how to promote a model.
8. Run a tiny training run end to end and show it appears in the tracker with all the fields.
</task>

<constraints>
- Do not change training behaviour; tracking only observes.
- Never log API keys, passwords or connection strings; read credentials from the environment.
- Use the tracker's API for the version installed; check it rather than guess.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What gets logged
Table: item | how it is captured | why.
## Code
Code blocks with file paths.
## Conventions
Short list for the team.
## Check
The test run and what appeared in the tracker.
## Open questions
Numbered, or "None".
</output_format>
