---
schema: 1
id: train-image-classifier
kind: prompt
title: Fine-tune an image classifier
description: "Fine-tunes a pretrained image classifier on a custom dataset with leak-free splits, suitable augmentation, class balance, per-class metrics and a misclassification review."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, data-scientist, researcher]
stack: [pytorch]
requires: [repo-read, file-write, shell]
inputs: [dataset, repo, image]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [computer-vision, transfer-learning, image-classification, data-augmentation]
pairs_with:
  prompts: [plan-ml-experiment, write-pytorch-training-loop, review-training-data]
args:
  - name: task
    description: What the images show, the classes, and how predictions will be used.
    type: text
    required: true
  - name: data
    description: Where the images are, how they are organised, counts per class, image sizes, and where they came from (cameras, sites, users, scraped).
    type: text
    required: true
  - name: deployment
    description: Where the model will run (server GPU, CPU, phone, edge device) and any latency or size limit.
    type: string
output_contract:
  format: markdown
  sections: [Data check, Setup, Code, Results, Misclassification review, Check, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fine-tuning a pretrained backbone is the right default for custom image classification, and most of the work is around the data. Near-duplicate photos (burst shots, the same object from slightly different angles, frames from one video) split randomly across train and test give scores that collapse on new images; split by source instead. Models also learn shortcuts: the camera, the background, a watermark or the hospital's label marker, which the misclassification review exposes. Augmentations must preserve the label: horizontal flips are wrong for text, digits or left-right anatomy, and heavy colour jitter is wrong when colour is the signal. Inputs must be resized and normalised the way the backbone was pretrained. With little data, train the head first and then unfreeze with a lower learning rate for the backbone. And EXIF orientation is often ignored, so some photos train sideways.
</context>

<task>
Fine-tune an image classifier for: {{task}}

Data: {{data}}
{{#deployment}}

Deployment: {{deployment}}
{{/deployment}}

1. Read the existing code and dependencies; use the image library already present (torchvision, timm or similar).
2. Check the data: counts per class, corrupt or unreadable files, EXIF orientation, very small images, exact and near duplicates (perceptual hash), and the source of each image. Choose a split grouped by source (video, patient, device, session or object) and stratified by class; lock the test set.
3. Pick a backbone that fits the deployment limits and the data size, use its expected input size and normalisation, and say why.
4. Set augmentation that preserves labels for this domain, and say which common augmentations were excluded and why.
5. Train in two phases: head only for a few epochs, then unfreeze with a lower backbone learning rate, cosine or step schedule, mixed precision where supported, early stopping on validation macro-F1 or balanced accuracy. Handle class imbalance with a weighted loss or sampler.
6. Evaluate on validation and, once, on test: per-class precision and recall, confusion matrix, and macro and overall scores against a simple baseline (for example a linear probe on frozen features).
7. Review misclassifications: a grid of the most confident errors, grouped by cause (label error, ambiguous image, shortcut such as background or device, true model error). Check one suspected shortcut with a quick test (for example cropping out the background or slicing by device).
8. Save the model with class names, input size and normalisation; write a prediction function and a test that loads the model and predicts a fixed image. Run the tests.
</task>

<constraints>
- No random split when the same source appears in several images.
- Do not report accuracy alone when classes are imbalanced.
- Do not start long GPU runs without stating the expected time; run a short smoke training first.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data check
Counts, duplicates, sources, split choice.
## Setup
Backbone, input size, augmentation kept and excluded, schedule.
## Code
Code blocks with file paths.
## Results
Table: class | precision | recall | support, plus overall against the baseline.
## Misclassification review
Error causes with counts and example file names.
## Check
Commands run and real results.
## Next steps
Up to three, ranked.
</output_format>
