---
schema: 1
id: tune-hyperparameters
kind: prompt
title: Set up a hyperparameter search
description: "Sets up a hyperparameter search with Optuna or the project's tuner: a sane search space, pruning, a fixed budget, resumable storage and a held-out check that the gain is real."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hyperparameter-tuning, optuna, cross-validation, overfitting]
pairs_with:
  prompts: [plan-ml-experiment, train-gradient-boosting-model]
args:
  - name: training_code
    description: Path to the training script or function, the model type and the metric optimised.
    type: text
    required: true
  - name: budget
    description: Compute and time available, for example "8 GPU hours" or "overnight on a laptop", and how long one training run takes.
    type: string
    required: true
  - name: tuner
    description: A tuning library the project already uses, if any (Optuna, Ray Tune, KerasTuner, scikit-learn search).
    type: string
output_contract:
  format: markdown
  sections: [Search design, Code, Results, Held-out check, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hyperparameter search mostly wastes compute through a bad setup, not a bad algorithm. Learning rates and regularisation strengths searched on a linear scale spend most trials in the wrong region; they belong on a log scale. Too many parameters at once spread a small budget thin, while a few important ones (learning rate, model capacity, regularisation) carry most of the gain. Without pruning, hopeless trials run to the end. Choosing the best of 200 trials by the same validation score you then report overstates performance, especially on small data, because the winner partly fitted the noise; a held-out set or nested cross-validation shows the real gain. Trials that are not seeded or that share a mutable global state are not comparable. And a study kept only in memory is lost when the machine restarts.
</context>

<task>
Set up tuning for: {{training_code}}

Budget: {{budget}}
{{#tuner}}

Tuner in use: {{tuner}}
{{/tuner}}

1. Read the training code. Find the metric, the validation scheme, the current parameter values, the run time per trial and any existing config system. Refactor only as much as needed to expose an objective function that takes parameters and returns the validation metric.
2. Design the search space: three to six parameters that matter for this model type, with log scales for learning rate and regularisation, integer ranges for capacity, and conditional parameters only where needed. Start the space around the current values and known good defaults.
3. Fit the budget: number of trials from budget divided by trial time, with pruning (median or successive halving) reporting intermediate validation scores, and early stopping inside each trial for iterative models.
4. Use a sampler suited to the budget (Tree-structured Parzen Estimator by default), a fixed seed, and persistent storage (for example an SQLite file) so the study can resume and run in parallel workers.
5. Keep a final check set out of the search entirely. Evaluate the best configuration and the current default on it, with several seeds if the model's variance is noticeable, and report whether the improvement exceeds the variance.
6. Report the best parameters, the parameter importance, the optimisation history, and any parameter that hit the edge of its range (a sign the range should move).
7. Write the best parameters to the project's config, not hard-coded, and run a short smoke test of the tuning script with two trials.
</task>

<constraints>
- Never tune on the test set or the final check set.
- Do not launch the full search without stating its expected duration and cost; run the two-trial smoke test first.
- Keep the search space small enough for the budget, and say which parameters were left fixed and why.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Search design
Table: parameter | range | scale | why. Plus trial count, pruner, sampler, storage.
## Code
Code blocks with file paths.
## Results
Best parameters and importance, or "not run yet" with the command to run.
## Held-out check
Default versus tuned on the check set, with seeds.
## Check
Commands run and real results.
## Open questions
Numbered, or "None".
</output_format>
