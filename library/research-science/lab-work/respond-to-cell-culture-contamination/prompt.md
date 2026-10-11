---
schema: 1
id: respond-to-cell-culture-contamination
kind: prompt
title: Respond to cell culture contamination
description: Guides a lab through a suspected cell culture contamination, from identifying the likely type and containing it to decontamination, finding the source, recovering from banked stocks and prevention.
category: lab-work
version: 1.0.0
status: incubating
stage: [operate, verify]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cell-culture, mycoplasma, aseptic-technique, decontamination, cell-line-authentication]
pairs_with:
  prompts: [troubleshoot-failed-experiment, write-lab-notebook-entry]
  personas: [lab-manager]
args:
  - name: situation
    description: What you see (cloudiness, colour change, particles, filaments, slow growth, odd results), which cultures and how many, the cell types and their biosafety level, shared equipment and reagents (hoods, incubators, water bath, media, serum), and when it started.
    type: text
    required: true
  - name: stocks
    description: Frozen banks you have for these lines, when they were made, and the last mycoplasma test or authentication result. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Do now, What it probably is, Contain and clean, Find the source, Recover, Prevent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Contamination comes in kinds that call for different responses. Bacteria usually make medium cloudy and often acidic within a day or two; yeast and fungi show as budding particles or filaments; mycoplasma shows nothing visible, only subtle changes in growth and results, and is found by testing (PCR, a luminescence kit, or DNA staining). Cross-contamination by another cell line is invisible too and is found by authentication such as short tandem repeat profiling for human lines. Experienced culturists isolate affected flasks at once, discard rather than rescue unless a culture is truly irreplaceable, decontaminate the hood, incubator and water bath, check the shared reagents opened around the same time, go back to banked stocks tested clean, and find the source rather than blaming bad luck. Routine antibiotics mask low-level contamination and are not a fix.

Situation:
<situation>
{{situation}}
</situation>
{{#stocks}}Stocks and test history: {{stocks}}{{/stocks}}
</context>

<task>
1. Do now: the first actions today, in order: stop work with the affected cultures, isolate or discard them following the lab's biological waste rules, tell other users of shared hoods and incubators, and do not open suspect flasks in a shared hood.
2. What it probably is: the most likely type of contamination from the signs described, how to confirm it (microscopy, a mycoplasma test, authentication), and what else it could be.
3. Contain and clean: decontaminating the hood, incubator (including the water pan), water bath, centrifuge and pipettes, using the disinfectant and contact time the lab's procedures specify; quarantining other cultures in the same incubator until checked.
4. Find the source: check opened media, serum, supplements and trypsin by lot and date, technique and hood airflow, incubator and water bath, recently received cell lines, and shared pipettes. Suggest a short test to separate reagent from technique causes.
5. Recover: thaw from the earliest clean bank{{#stocks}} given the stocks listed{{/stocks}}, test it before expanding, and when an irreplaceable culture might justify a rescue attempt, under quarantine, with retesting and disclosure in any results.
6. Prevent: routine mycoplasma testing frequency, quarantine for incoming lines, authentication at banking and before publication, antibiotic-free routine culture, one cell line at a time in the hood, and a record of every incident.
</task>

<constraints>
- Follow the lab's biosafety level and local biological waste and disinfection procedures; where the cells are human or infected, tell the user to involve the biosafety officer.
- Do not invent disinfectant concentrations or contact times as universal; mark them to confirm against the lab's procedures and product labels.
- Never recommend continuing experiments or publishing data from cultures known to be contaminated without disclosure; data from the affected period should be reviewed.
</constraints>

<output_format>
Use the contract's section headings in order. Do now as a short numbered list. Find the source as a checklist.
</output_format>
