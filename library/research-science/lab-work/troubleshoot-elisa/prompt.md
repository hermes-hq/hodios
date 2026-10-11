---
schema: 1
id: troubleshoot-elisa
kind: prompt
title: Troubleshoot an ELISA
description: Diagnoses ELISA problems such as high background, weak signal, poor replicates, a flat standard curve or edge effects from the plate data and method, and plans the next plate.
category: lab-work
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [notes, text, dataset]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [elisa, immunoassay, plate-assay, coefficient-of-variation, background-signal]
pairs_with:
  prompts: [analyze-standard-curve, design-plate-layout, troubleshoot-failed-experiment]
  personas: [lab-manager]
args:
  - name: result
    description: The problem and the numbers - blank, standard and sample readings (or a pasted plate export), replicate values, wavelength, and what a good run looks like if this assay worked before.
    type: text
    required: true
  - name: method
    description: Format (sandwich, direct, indirect, competitive; kit or in-house), coating, blocking, sample diluent and dilutions, incubation times and temperatures, washing (manual or washer, number of washes), substrate and stop solution.
    type: text
    required: true
  - name: plate_layout
    description: Where standards, blanks, controls and samples sat on the plate. Optional but needed to judge edge or position effects.
    type: text
output_contract:
  format: markdown
  sections: [What the data show, Likely causes, Quick checks, Next plate, What to record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most ELISA problems trace back to washing, timing and temperature, not the antibodies. Poor washing raises background and spreads replicates; plates read too long after stopping drift; reagents used cold or incubations in a draughty spot produce edge effects; a standard reconstituted wrongly shifts the whole curve. The pattern in the numbers points to the cause: high blanks mean background, a good curve with weak samples means sample matrix or concentration, a flat or compressed top means substrate saturation or too-long development, scattered replicates mean pipetting or washing, and a position pattern means temperature or evaporation. Samples outside the curve's range need re-running at another dilution, not extrapolating. Kit manuals give acceptance ranges, and those beat general rules.
</context>

<task>
Work out what went wrong with this ELISA.

<result>
{{result}}
</result>

<method>
{{method}}
</method>
{{#plate_layout}}

<plate_layout>
{{plate_layout}}
</plate_layout>
{{/plate_layout}}

1. Summarise the data: blank level, signal range of the standards, replicate agreement (coefficient of variation per pair where values allow), and any positional pattern. Say what is normal and what is not, using the kit's acceptance criteria if given.
2. Rank likely causes with the evidence for each: washing, incubation time or temperature, reagent preparation or expiry, standard reconstitution, sample matrix interference, hook effect at very high concentrations, pipetting, plate reader settings (wavelength, reference wavelength), timing between stop and read.
3. Quick checks: re-read the plate if still within the read window, check reagent dates and storage, check the washer for blocked pins, check the calculation of the standard dilution series, spike-and-recovery or dilution linearity for matrix suspicion.
4. Next plate: what to change and what to hold constant, a layout that tests the suspected cause, and acceptance criteria to judge the run.
5. What to record: kit lot, reagent prep times, room temperature, washer used and raw reader files.
</task>

<constraints>
- Use the numbers given; do not invent readings, CV thresholds or kit ranges. When you use a general rule of thumb (for example replicate CV under about 15 to 20%), label it as such and defer to the kit or lab's criteria.
- Never recommend reporting concentrations extrapolated beyond the standard curve.
- If plate layout is missing and the pattern could be positional, say that the layout is needed to decide.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the data show
## Likely causes
| Rank | Cause | Evidence | Check |
## Quick checks
## Next plate
## What to record
</output_format>
