---
schema: 1
id: set-microscopy-acquisition-settings
kind: prompt
title: Set microscopy acquisition settings
description: Plans fluorescence image acquisition settings for an experiment so images are comparable and quantifiable, covering exposure, gain, saturation, bleed-through, controls and metadata.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, build]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fluorescence-microscopy, image-acquisition, saturation, bleed-through, image-quantification]
pairs_with:
  prompts: [plan-bench-experiment, design-scientific-figures, write-lab-notebook-entry]
  personas: [lab-manager]
args:
  - name: experiment
    description: What you are imaging and what you will measure, for example "nuclear translocation of a GFP-tagged protein, 3 conditions, comparing intensity" or "counting labelled cells per field".
    type: text
    required: true
  - name: microscope
    description: Microscope type (widefield, confocal, spinning disk), objectives, camera or detectors, and the fluorophores and filter sets or laser lines available.
    type: text
    required: true
  - name: constraints
    description: Time on the instrument, sample fragility or photobleaching, number of fields or samples, and any facility rules. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the images must support, Channel plan, Exposure and detector settings, Controls, Sampling plan, Metadata and files, Checklist for the session]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Images that will be compared or quantified must be acquired with identical settings across conditions, set on the brightest sample so nothing saturates, and saved in the raw file format with metadata. The common mistakes are adjusting exposure per sample "to see it better", using auto-exposure, saturating pixels that then cannot be measured, choosing fields by eye where the effect looks best, and ignoring bleed-through between channels, which manufactures colocalisation. Facility staff know the instrument; this plan is a starting point to agree with them, not a substitute for their training.
</context>

<task>
Plan the acquisition.

<experiment>
{{experiment}}
</experiment>

<microscope>
{{microscope}}
</microscope>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. What the images must support: the measurement, whether it is qualitative, counted or intensity-based, and what that demands (resolution, dynamic range, z-sampling).
2. Channel plan: fluorophore to channel, order of acquisition (longest wavelength first if bleaching matters), sequential versus simultaneous acquisition to avoid bleed-through, and single-label controls to check it.
3. Exposure and detector settings: set on the brightest condition with a saturation indicator, keep below saturation with headroom, then lock for all conditions; bit depth; binning; pinhole for confocal; averaging. Note what must never change between conditions.
4. Controls: unstained or secondary-only for background, single-label controls, and a reference sample imaged each session if work spans days.
5. Sampling plan: how many fields per sample and how they are chosen without bias (predefined positions, random stage coordinates, or chosen on a channel not being measured), and blinding of condition where practical.
6. Metadata and files: save in the instrument's native format, naming scheme, record settings, never measure on compressed or display-adjusted copies.
7. A checklist for the session.
</task>

<constraints>
- Do not give exact exposure times or laser powers as facts; give the method for finding them and placeholders.
- Do not recommend any processing that alters measured intensities before analysis.
- If the measurement needs settings the described microscope cannot deliver (for example optical sectioning on a widefield), say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the images must support
## Channel plan
| Fluorophore | Channel | Order | Control |
## Exposure and detector settings
## Controls
## Sampling plan
## Metadata and files
## Checklist for the session
</output_format>
