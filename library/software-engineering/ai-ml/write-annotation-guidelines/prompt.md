---
schema: 1
id: write-annotation-guidelines
kind: prompt
title: Write annotation guidelines for a labelling task
description: "Writes labelling guidelines with label definitions, edge-case rulings, worked examples and a pilot agreement test, so annotators and LLM labellers make the same calls."
category: ai-ml
version: 1.0.0
status: incubating
stage: [plan, design]
role: [ml-engineer, data-scientist, researcher, product-manager]
requires: [none]
inputs: [spec, dataset, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-labeling, annotation, inter-annotator-agreement, label-taxonomy]
pairs_with:
  prompts: [bootstrap-labels-with-llm, review-training-data]
args:
  - name: task
    description: What is being labelled and why, the draft label set, and the unit of labelling (whole text, sentence, span, image, box).
    type: text
    required: true
  - name: samples
    description: Ten to fifty real items, ideally including ones the team argued about.
    type: text
    required: true
  - name: annotators
    description: Who will label (domain experts, crowd workers, an LLM, a mix) and their language and background.
    type: string
output_contract:
  format: markdown
  sections: [Purpose, Label definitions, Decision rules, Hard cases, Span or box rules, Pilot and agreement, Change log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most label noise is not carelessness. It comes from guidelines that define each label in isolation and never say what to do when two apply, when none apply, or when the item is ambiguous. Two careful annotators then disagree on 20-30% of items and the model learns the disagreement. Good guidelines define every label by inclusion and exclusion, rule on the overlaps with a priority order, give boundary examples (the near misses, not the obvious cases), say exactly where a span starts and ends, and are tested on a pilot round where agreement is measured and every disagreement becomes a new ruling. They are versioned, because labels made under different versions are not the same labels.
</context>

<task>
Write annotation guidelines for: {{task}}

Real items:
{{samples}}
{{#annotators}}

Annotators: {{annotators}}
{{/annotators}}

1. Check the label set first: labels that overlap, labels that are too rare to learn, a missing "none" or "other", and labels that need context the annotator will not see. Propose changes and mark them as proposals.
2. Write the purpose in two or three sentences: what the labels feed and which mistakes matter most, so annotators can resolve unforeseen cases in the right direction.
3. Define each label: one-line definition, includes, excludes, and two positive and two near-miss negative examples, using the supplied items where possible.
4. Write the decision rules: a short ordered procedure or decision tree for choosing among labels, the priority rule when several apply (or whether multi-label is allowed), what to do with ambiguous, off-topic, foreign-language, empty or offensive items, and when to use "unsure" and what happens to those items.
5. Collect hard cases from the samples: each with the ruling and the reason, written so it generalises.
6. If labelling spans or boxes: where boundaries fall (determiners, titles, punctuation, nested entities, partial occlusion, truncated objects), and whether overlapping spans are allowed.
7. Design the pilot: two or three annotators on 50-100 items including the hard cases, agreement measured with Cohen's kappa (two annotators) or Krippendorff's alpha (more, or missing labels), a target to reach before full labelling, and adjudication where every disagreement becomes a ruling or a definition change.
8. Add a version number and change log, and state that items labelled under an older version are re-checked against changed rules.
</task>

<constraints>
- Use only the label set and examples given, plus clearly marked proposals. Do not invent domain facts the annotator would need to verify.
- Write for the stated annotators: plain words for crowd workers, domain terms only where experts are labelling. Keep the core guideline readable in ten minutes.
- If the purpose or the label set is missing, ask for it before writing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Purpose
Two or three sentences.
## Label definitions
One subsection per label: definition, includes, excludes, examples.
## Decision rules
Numbered procedure and the priority order.
## Hard cases
Table: item | ruling | reason.
## Span or box rules
Rules, or "Not applicable".
## Pilot and agreement
Sample, measure, target, adjudication process.
## Change log
Version 1.0 and any proposals awaiting approval.
</output_format>
