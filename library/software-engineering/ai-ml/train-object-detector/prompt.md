---
schema: 1
id: train-object-detector
kind: prompt
title: Train an object detector on a custom dataset
description: "Trains an object detector such as a YOLO-family model on a custom dataset with annotation format checks, scene-grouped splits, mAP evaluation per class and an export check."
category: ai-ml
version: 1.0.0
status: incubating
stage: [build]
role: [ml-engineer, researcher]
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
tags: [computer-vision, object-detection, yolo, map-metric, annotation-formats]
pairs_with:
  prompts: [train-image-classifier, write-annotation-guidelines, convert-model-to-onnx]
args:
  - name: task
    description: The objects to detect, the classes, and what happens with detections (counting, alerts, cropping for another model).
    type: text
    required: true
  - name: data
    description: Where images and annotations are, the annotation format or tool export, counts per class, image sizes and the typical object size.
    type: text
    required: true
  - name: deployment
    description: Target hardware, frame rate needed, and export format if known (ONNX, TensorRT, Core ML, TFLite).
    type: string
output_contract:
  format: markdown
  sections: [Data check, Setup, Code, Results, Error review, Export, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Detector projects fail first on annotation plumbing. YOLO labels are normalised centre-x, centre-y, width, height; COCO uses absolute top-left x, y, width, height; Pascal VOC uses absolute corner coordinates. A silent mix-up trains on shifted boxes and mAP stays near zero. Class ids get reordered between the labelling tool export and the training config. Images with no objects are dropped, so the model fires on empty scenes. Frames from the same video in both train and validation inflate mAP. Small objects vanish when images are resized to 640 pixels; higher input size or tiling helps. mAP@0.5 and mAP@0.5:0.95 tell different stories (detection versus box precision), and the deployed confidence and NMS thresholds are separate choices from the mAP number. Licences matter too: some popular detector libraries and weights are under copyleft licences such as AGPL, which affects commercial use.
</context>

<task>
Train an object detector for: {{task}}

Data: {{data}}
{{#deployment}}

Deployment: {{deployment}}
{{/deployment}}

1. Read the repository and existing dependencies. If no detector library is chosen, propose one that fits the deployment and state its licence and its weights' licence so the user can confirm.
2. Check annotations: parse every label file, confirm the coordinate format by drawing boxes on 20 random images and saving them for the user to look at, check class id mapping against the labelling tool's export, and report boxes outside the image, zero-area boxes, duplicate boxes, and images without labels (keep true negatives as background images).
3. Report object size distribution relative to image size and choose the input size (or tiling) so the smallest objects that matter stay several pixels wide.
4. Split by video, site, camera or capture session, stratified by class presence. Lock a test set.
5. Train from pretrained weights with the library's standard augmentation, adjusted for the domain (no vertical flip for street scenes, for example), a short smoke run first, then the full run with early stopping on validation mAP.
6. Evaluate: mAP@0.5 and mAP@0.5:0.95 overall and per class, precision and recall at the chosen confidence threshold, and performance by object size. Pick confidence and NMS IoU thresholds from the validation precision-recall trade-off for the use case.
7. Review errors on validation images: missed small objects, duplicates, confused classes, false positives on background, and label errors. Save examples.
8. Export to the deployment format, verify that exported outputs match the PyTorch model on sample images within tolerance, and measure speed on the target hardware or the closest available.
</task>

<constraints>
- Do not train until the box format check passes on drawn samples.
- State licences of the library and weights; do not assume commercial use is allowed.
- Do not start long GPU runs without stating expected time; smoke-test first.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data check
Format confirmed, class mapping, annotation problems, object sizes, split.
## Setup
Library and licence, model size, input size, augmentation.
## Code
Code blocks with file paths.
## Results
Table: class | AP@0.5 | AP@0.5:0.95 | precision | recall, plus chosen thresholds.
## Error review
Error types with counts and example files.
## Export
Format, parity result, speed.
## Check
Commands run and real results.
</output_format>
