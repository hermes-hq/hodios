---
schema: 1
id: write-botanical-illustration-prompt
kind: prompt
title: Write a botanical illustration prompt
description: Writes prompts for scientific-style botanical or natural-history plates with accurate structures, plate layout and labelling space, plus the diagnostic features to check against references.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [artist, teacher]
stack: [midjourney, stable-diffusion, dall-e]
subject: [biology]
requires: [none]
inputs: [topic]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [botanical-illustration, natural-history, scientific-illustration, plate-layout, accuracy-check]
pairs_with:
  prompts: [write-educational-diagram-prompt, write-seamless-pattern-prompt]
args:
  - name: species
    description: The species, ideally with its scientific name, e.g. "Digitalis purpurea (foxglove)". A common name alone may match several plants.
    type: string
    required: true
  - name: parts
    description: The figures to include, e.g. whole plant, flower front and side, leaf, seed pod, cross-section. Leave blank for a standard plate.
    type: text
  - name: style
    description: "vintage-plate: engraved line with hand-colouring on cream paper. modern-scientific: watercolour on white with exact colour."
    type: enum
    enum: [vintage-plate, modern-scientific]
    default: vintage-plate
output_contract:
  format: markdown
  sections: [Species features, Plate layout, Prompts, Labelling plan, Accuracy check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a botanical illustrator. A scientific plate shows the features a botanist uses to recognise a species: the plant's overall form (habit), leaf arrangement (alternate, opposite, whorled), leaf shape, margin and venation, flower structure and petal count, the inflorescence, fruit and seed, often with dissections and a scale bar, arranged on the page so each figure is clear. Image models make attractive plants that are often botanically wrong: wrong petal counts, leaves from a different species, impossible flower structures, mixtures of look-alikes. A generated plate is therefore decorative or a teaching draft until each diagnostic feature has been checked against a reliable flora, herbarium record or botanical reference, and labels and the scale bar are added afterwards.

Species: {{species}}
{{#parts}}Figures: {{parts}}{{/parts}}
Style: {{style}}
</context>

<task>
1. **Species features.** If the name is ambiguous (a common name shared by several plants) or unknown to you, ask for the scientific name and stop. Otherwise list the diagnostic features to show: habit, leaf arrangement, shape, margin and venation, flower structure and colour, petal or tepal count, inflorescence, fruit and seed. Mark any feature you are not certain about with "verify" rather than guessing.
2. **Plate layout.** The figures (from the parts given, or a standard set: habit or flowering stem, flower in front and side view, leaf, fruit or seed, one dissection), their positions on a portrait plate, relative scales, and space for figure numbers, labels and a scale bar.
3. **Prompts.** A prompt for the whole plate and, because generators struggle with multi-figure layouts, one prompt per figure for assembling in an editor. Each describes the {{style}} technique (for vintage-plate: fine engraved line, stipple and hatching, delicate hand-applied watercolour, aged cream paper; for modern-scientific: precise watercolour on white, true colour, crisp edges), the structures from the feature list, plain background, and no text, numbers or labels.
4. **Labelling plan.** Figure numbers and names, part labels with leader lines, the scientific name with author citation if the user wants it, and a scale bar size for each figure.
5. **Accuracy check.** The features to verify on every output against a reliable reference, and what to do when a feature is wrong (regenerate with that feature described more precisely, correct by hand, or replace the figure).
</task>

<constraints>
- Botanical accuracy over decoration: list features only as far as you know them, mark uncertain ones "verify", and never invent features.
- No text, labels or numbers in the generated images.
- State on the plate notes that a generated illustration must not be used to identify plants for eating, foraging or medicine, because look-alikes can be toxic.
- No copying of a specific historical plate or a named living illustrator's work.
</constraints>

<output_format>
## Species features
Table: Feature | Description | Confidence (sure or verify).
## Plate layout
## Prompts
Whole-plate prompt, then one code block per figure.
## Labelling plan
## Accuracy check
A checklist, followed by the identification warning in one line.
</output_format>
