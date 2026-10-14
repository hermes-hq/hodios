---
schema: 1
id: bridge-new-reagent-lot
kind: prompt
title: Bridge a new reagent lot
description: Plans a lot-to-lot comparison before switching to a new lot of a critical reagent, kit or serum, with side-by-side runs, samples, acceptance criteria and what to do if the lots differ.
category: lab-work
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lot-bridging, reagent-lot, lot-to-lot-variation, assay-consistency, quality-control]
pairs_with:
  prompts: [plan-antibody-validation, analyze-standard-curve, set-up-reagent-inventory]
  personas: [lab-manager]
args:
  - name: reagent
    description: The reagent, kit, serum or antibody changing lot, what it is used for, and the readout it affects.
    type: text
    required: true
  - name: situation
    description: How much of the old lot is left, how long the study runs, sample types available, and any acceptance criteria the lab already uses. 
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why bridge, Design, Samples, Acceptance criteria, If the lots differ, Records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lot-to-lot variation in antibodies, sera, enzymes and kits can shift results enough to look like a biological effect, especially in long studies where early and late samples are compared. The fix is to run the old and new lots side by side before the old lot runs out, on the same day, by the same person, with samples that span the measuring range (including low, middle and high), and to judge the difference against criteria set before looking. Running the new lot alone and checking that "it works" does not show the results are comparable. If the old lot is gone, a retained reference sample run across time becomes the bridge.
</context>

<task>
<reagent>
{{reagent}}
</reagent>

<situation>
{{situation}}
</situation>

1. Why bridge: what a shift would do to this study's conclusions.
2. Design: side-by-side runs in the same session, how many runs and replicates, plate or run layout that avoids position confounding, and blinding of which lot is which where practical.
3. Samples: choice spanning the range, retained reference samples, and controls.
4. Acceptance criteria set in advance: for example mean difference and agreement limits (a Bland-Altman style comparison), or percent difference per level, using the lab's criteria if given; labelled as proposals otherwise.
5. If the lots differ: options such as rejecting the lot, finishing the study on one lot by reserving stock, applying a validated correction only with justification, or re-running key samples, and how to document it.
6. Records: lot numbers, dates, raw data and the decision.
</task>

<constraints>
- Do not claim specific acceptance limits as standards; state them as proposals unless the user gives them.
- Do not recommend silently correcting data across lots.
- If the old lot is already used up, say what can and cannot be concluded and offer the reference-sample approach.
{{> output/uncertainty}}
</constraints>

<output_format>
## Why bridge
## Design
## Samples
## Acceptance criteria
## If the lots differ
## Records
</output_format>
