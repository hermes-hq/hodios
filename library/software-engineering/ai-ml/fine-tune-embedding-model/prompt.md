---
schema: 1
id: fine-tune-embedding-model
kind: prompt
title: Fine-tune an embedding model for retrieval
description: Fine-tunes an open embedding model on domain query-passage pairs with hard negatives, then proves a retrieval gain over the base model on a held-out query set before it is used.
category: ai-ml
version: 1.0.0
status: incubating
stage: [build, verify]
role: [ml-engineer, data-scientist, researcher]
stack: [python, huggingface, llm-apps]
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
tags: [embeddings, contrastive-learning, hard-negatives, sentence-transformers, retrieval]
pairs_with:
  prompts: [choose-embedding-model, plan-fine-tuning, review-training-data]
args:
  - name: task
    description: The corpus and domain, the base embedding model, why the base model falls short (examples of missed queries), and available hardware.
    type: text
    required: true
  - name: training_data
    description: What query-passage data exists (click logs, labelled pairs, FAQs, none) and how much.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should you fine-tune, Data, Training, Code, Evaluation, Results, Deployment notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fine-tuning an embedding model can lift recall a lot in domains with their own vocabulary (legal, medical, internal product names), and it can also make things worse: overfitting to a few thousand pairs, forgetting general language, or improving on an evaluation set that leaked into training. The usual recipe is contrastive training with in-batch negatives (multiple negatives ranking loss) on query-passage pairs, plus mined hard negatives: passages the base model ranks high that are not relevant. Hard negatives must be checked, because some of them are actually relevant (false negatives) and teach the model the wrong thing. Cheaper fixes come first: hybrid search, better chunking, a reranker or a different base model. And a new model means re-embedding the whole corpus.
</context>

<task>
Fine-tune an embedding model for: {{task}}

Training data available: {{training_data}}

1. Check cheaper options first: does the miss pattern suggest hybrid search, chunking or a reranker instead? Say so if the evidence points there, and continue only if fine-tuning is still justified.
2. Data: build query-passage pairs from the available sources. If there are too few real queries, generate synthetic queries for passages with an LLM, filter them (drop ones that copy the passage verbatim, check a sample by hand) and mark them. Split by document, not by pair, so test passages never appear in training. Keep a held-out set of real queries for evaluation.
3. Hard negatives: mine with the base model (for example ranks 10 to 50), exclude any that share the positive's document or are near-duplicates, and spot-check a sample for false negatives.
4. Training: with the sentence-transformers library (or the project's existing trainer), multiple negatives ranking loss, batch size as large as memory allows, a small learning rate, 1 to 3 epochs, warmup, and a fixed seed. Keep query and passage prefixes if the base model expects them.
5. Write the training and evaluation scripts in the repository's style, with config in one place.
6. Evaluation: recall@k, MRR and nDCG on the held-out real queries for base versus fine-tuned, plus a general sanity set to detect forgetting. Run it if hardware allows.
7. Decide: adopt only if the gain on real held-out queries clears a stated margin. Then plan re-embedding the corpus and an alias switch.
</task>

<constraints>
- Do not report results without running the evaluation; never evaluate on data that was used for training or for mining negatives from the same documents.
- Check the base model's licence allows fine-tuning and the intended use; say what to verify.
- Do not train on personal or confidential data without the user confirming it is allowed.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Should you fine-tune
Evidence for and against, and cheaper alternatives.
## Data
Sources, counts, synthetic share, split method.
## Training
Loss, hyperparameters and hard-negative mining, with reasons.
## Code
Code blocks with file paths.
## Evaluation
Metrics, sets and the adoption margin.
## Results
Table: model | recall@k | MRR | nDCG | sanity set. Real numbers, or a plain statement that training was not run.
## Deployment notes
Re-embedding, storage and switch plan.
</output_format>
