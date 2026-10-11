---
schema: 1
id: train-text-classifier
kind: prompt
title: Train a text classifier
description: "Trains a text classifier starting from a TF-IDF and logistic regression baseline up to a fine-tuned transformer only if needed, with per-class metrics and an error review."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [python, huggingface]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, spec]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [text-classification, nlp-models, fine-tuning, scikit-learn, baselines]
pairs_with:
  prompts: [plan-ml-experiment, review-training-data, choose-ml-approach]
args:
  - name: task
    description: What the classifier predicts, the label set, single or multi-label, and how predictions will be used.
    type: text
    required: true
  - name: data
    description: Where the labelled data lives, row count, label counts, languages, typical text length, and how labels were made.
    type: text
    required: true
  - name: constraints
    description: Latency, hardware for training and serving, and any requirement such as running on CPU or offline.
    type: string
output_contract:
  format: markdown
  sections: [Data check, Baseline, Transformer model, Results, Error review, Check, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
For many text classification tasks a TF-IDF plus logistic regression baseline trains in seconds and lands within a few points of a fine-tuned transformer. Teams that skip it cannot tell whether the transformer is worth its serving cost. Other common mistakes: random splits when the same customer or template appears many times, so near-duplicates leak across splits; truncating long texts at 128 tokens without checking how much is lost; reporting accuracy on imbalanced classes; ignoring the label noise that the highest-confidence errors usually reveal; and picking an English-only model for multilingual data. A transformer fine-tune also needs the right head for multi-label (sigmoid with binary cross-entropy, not softmax) and a saved label mapping, or predictions get decoded wrong in production.
</context>

<task>
Train a classifier for: {{task}}

Data: {{data}}
{{#constraints}}

Constraints: {{constraints}}
{{/constraints}}

1. Read the repository's data code and any training scripts; follow its structure, config style and dependency manager.
2. Check the data: label counts, duplicates and near-duplicates (normalised text hash), empty or very short texts, languages, and token length percentiles. Choose the split: grouped by customer, thread or source where the same origin repeats, stratified by label, with a test set locked until the end.
3. Train the baseline: TF-IDF (word and character n-grams) with logistic regression, class weights if imbalanced, tuned on validation only. Report macro-F1, per-class precision and recall, and the confusion matrix.
4. Decide if a transformer is justified: if the baseline already meets the need, say so and stop. Otherwise fine-tune a small pretrained encoder suited to the language and length (a multilingual one for mixed languages), with max length chosen from the token percentiles, the correct head and loss for single- or multi-label, early stopping on validation macro-F1, and a fixed seed.
5. Compare both on the same validation and, once, on the test set. Include inference latency per item on the stated hardware.
6. Review errors: the 30 most confident wrong predictions and the most confused class pairs. Separate label noise, ambiguous definitions and true model errors.
7. Save the chosen model with its label mapping, preprocessing and the versions of the libraries used, plus a small prediction function and a test that loads it and predicts on a fixed example.
8. Run the tests and report what was verified.
</task>

<constraints>
- Do not touch the test set until both models are final.
- Use the library versions already pinned in the project; if adding one, say which and why.
- Do not claim the transformer is better unless the gain exceeds the run-to-run variance; run at least two seeds when the gap is small.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data check
Bullets: counts, duplicates, length, split choice.
## Baseline
Code blocks with file paths and its validation metrics.
## Transformer model
Code blocks with file paths, or why it was not needed.
## Results
Table: model | macro-F1 | weakest class | latency.
## Error review
Patterns found, with examples and their cause.
## Check
Commands run and real results.
## Next steps
Up to three, ranked.
</output_format>
