---
schema: 1
id: bootstrap-labels-with-llm
kind: prompt
title: Bootstrap dataset labels with an LLM
description: "Pre-labels a dataset with an LLM, measures agreement against a human-labelled sample, and routes low-confidence items to people instead of trusting every label."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist]
stack: [python, llm-apps]
requires: [repo-read, file-write, shell]
inputs: [dataset, spec, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-labeling, weak-supervision, inter-annotator-agreement, human-in-the-loop, gold-set]
pairs_with:
  prompts: [write-annotation-guidelines, review-training-data, build-structured-extraction]
args:
  - name: task
    description: What is being labelled, the label set with definitions (or a path to the guidelines), and what the labels will train or evaluate.
    type: text
    required: true
  - name: data
    description: Where the unlabelled data lives, its size and format, and any human-labelled examples that already exist.
    type: text
    required: true
  - name: target_quality
    description: The precision or agreement the labels must reach and the budget for human review, for example "95% precision, 2,000 items reviewed by people".
    type: string
output_contract:
  format: markdown
  sections: [Plan, Code, Agreement on gold set, Routing rule, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
LLM pre-labelling can cut annotation cost several times over, but only when its error rate is measured, not assumed. The common failures: no human-labelled gold set, so nobody knows the label accuracy; few-shot examples drawn from the same items used to measure agreement, which inflates the score; trusting the model's self-reported confidence, which is poorly calibrated; a model that over-predicts the majority or first-listed class; and labels with no record of which model and prompt version produced them, so they cannot be redone when the prompt changes. The useful design treats the model as one more annotator: compare it with people the same way people are compared with each other, accept its labels only where it is measurably reliable, and send the rest to humans.
</context>

<task>
Set up LLM pre-labelling for: {{task}}

Data: {{data}}
{{#target_quality}}

Target quality and review budget: {{target_quality}}
{{/target_quality}}

1. Read the repository's existing data loading, any LLM client code and the label guidelines. Reuse the existing client, retry and config patterns. If the label set has no written definitions, stop and ask for them or propose them for approval first.
2. Build or confirm a gold set: a stratified sample of at least 200 items (more for many classes or rare classes) labelled by people, kept out of every prompt. If two people labelled the same items, compute their agreement as the ceiling the model can be judged against.
3. Write the labelling prompt: label definitions, the tie-break rules from the guidelines, a few examples drawn from outside the gold set, an explicit "unsure" or abstain option, and structured output (label plus short reason) validated against the label set. Shuffle or fix the label order deliberately and test for order bias.
4. Produce a confidence signal that is better than self-report: agreement across several samples at non-zero temperature, agreement between two different models or prompts, or token log-probabilities where the API exposes them.
5. Run on the gold set. Report per-class precision and recall, Cohen's kappa against people, the confusion matrix, and how accuracy varies with the confidence signal.
6. Choose a routing rule from that curve: the confidence level above which accepted labels meet the target precision, with the share of data it auto-labels. Everything below it, every abstention and every rare-class prediction you cannot yet trust goes to human review.
7. Run the batch with resumable progress, store with each label the model id, prompt version, confidence and timestamp, and estimate cost before the full run.
8. Plan an ongoing audit: a random sample of auto-accepted labels checked by people each batch, with the rule tightened if precision falls.
</task>

<constraints>
- Never report label quality without a measured gold-set result. If no gold set exists yet, the first deliverable is the sampling plan for one.
- Do not let gold-set items appear as few-shot examples.
- Do not send personal or confidential data to an external API unless the data owner has allowed it; ask when unsure.
- Run small first (the gold set) and show the cost estimate before labelling the full dataset.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
Gold set, prompt design, confidence signal, routing, in bullets.
## Code
Code blocks with file paths.
## Agreement on gold set
Table: class | precision | recall | support, plus kappa and the human ceiling, or a note that the run has not happened yet.
## Routing rule
Threshold, expected precision, share auto-labelled, share sent to people.
## Check
Commands run and real results.
## Open questions
Numbered, or "None".
</output_format>
