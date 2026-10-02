---
schema: 1
id: plan-fine-tuning
kind: prompt
title: Plan a fine-tuning project
description: Decides whether fine-tuning beats prompting or retrieval for a task and, if it does, plans the data, splits, training settings, evaluation against a prompt baseline, and cost.
category: ai-ml
version: 1.0.0
status: experimental
stage: [plan]
role: [ml-engineer, data-scientist, software-engineer]
stack: [llm-apps]
requires: [none]
inputs: [spec, dataset, text]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [fine-tuning, lora, distillation, baseline]
pairs_with:
  prompts: [choose-ml-approach, write-llm-eval-suite, review-training-data]
  personas: [ml-engineer]
args:
  - name: task
    description: What the model must do, the input and output, current approach and how it falls short, request volume and latency needs.
    type: text
    required: true
  - name: data_available
    description: What examples exist, how many, how they were labelled, their quality, and whether they contain personal data.
    type: text
    required: true
  - name: budget
    description: Money, time and people available, for example "2,000 USD and two weeks, one engineer".
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Why, Baseline first, Data plan, Training plan, Evaluation, Cost model, Go/no-go]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fine-tuning changes how a model behaves: output format and style, consistency on a narrow classification or extraction task, reliability at calling tools, or a large model's skill distilled into a smaller, cheaper one. It is a poor way to teach facts that change, which retrieval handles better, and it cannot fix a task nobody has specified clearly. Most fine-tuning projects that fail never measured a strong prompted baseline, trained on noisy or leaky data, or forgot the recurring costs: relabelling, retraining when the base model is retired, and hosting.
</context>

<task>
Task:
{{task}}

Data available:
{{data_available}}
{{#budget}}

Budget: {{budget}}
{{/budget}}

1. Compare the options for this task: a better prompt with few-shot examples and structured output, retrieval, supervised fine-tuning, preference tuning (only if pairwise preferences exist or can be collected), and distillation from a larger model. Judge each against what is failing now, the data's volume and quality, how often the task changes, request volume, latency, and whether a small or self-hosted model is required.
2. Give a verdict: do not fine-tune, fine-tune after a baseline, or fine-tune now. If no prompted baseline has been measured, the first step is always to build the eval set and the best prompt baseline, and to set the lift fine-tuning must achieve to be worth it.
3. If fine-tuning stays on the table, plan the data:
   - the format: chat-style JSONL with the same system prompt used at inference, and tool calls included if the task uses tools;
   - how to build examples from the data available, and how many are needed, stated as rules of thumb (format or style tasks often need tens to a few hundred good examples; classification over many labels needs more per label);
   - cleaning: deduplication, label consistency checks, removal of personal data;
   - splits: train, validation and a locked test set, split by source, customer or time so near-duplicates do not cross splits.
4. Plan training: full fine-tune, adapter methods such as LoRA, or a hosted fine-tuning API, and why. Give starting settings (epochs, learning rate or the platform's multiplier, batch size), the signals to watch (validation loss rising while training loss falls means overfitting), and a sweep of at most three runs.
5. Plan evaluation: the same eval set for the base model, the prompted baseline and each fine-tuned run; per-slice results; checks that general behaviours the product relies on (refusals, format, tone) did not regress; and a human review sample.
6. Model cost as formulas, filling in only numbers the user gave: labelling hours, training tokens (examples × average tokens × epochs × price per token), the inference price difference times monthly volume, hosting, and retraining frequency. Give the break-even volume.
7. State go/no-go criteria and how to roll back.
</task>

<constraints>
- Never invent prices or benchmark results. Use variables where the user gave no figure.
- Keep the plan vendor-neutral. Name a platform only as an example.
- If the budget cannot cover the plan, say what to cut first.
- Do not recommend fine-tuning to inject knowledge that changes more often than you would retrain.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line, then two or three sentences of reasoning.

## Why
Table: approach | fit for this task | cost | main risk.

## Baseline first
The prompt baseline to build, the eval set, and the target lift.

## Data plan
Format, sources, cleaning, splits and target size.

## Training plan
Method, starting settings, runs and what to watch.

## Evaluation
What is compared, on which slices, and what counts as a win.

## Cost model
One-off and recurring costs as formulas, with break-even volume.

## Go/no-go
The criteria to ship, and the rollback.
</output_format>
