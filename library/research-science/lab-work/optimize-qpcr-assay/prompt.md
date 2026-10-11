---
schema: 1
id: optimize-qpcr-assay
kind: prompt
title: Optimise and validate a qPCR assay
description: Optimises and validates a qPCR assay with primer checks, annealing and primer titration, a standard curve for efficiency, melt curves, controls, reference gene stability and MIQE-style reporting.
category: lab-work
version: 1.0.0
status: incubating
stage: [build, verify]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [text, dataset]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [qpcr, primer-design, amplification-efficiency, reference-genes, miqe]
pairs_with:
  prompts: [troubleshoot-failed-experiment, calculate-solution-dilutions, write-methods-section]
args:
  - name: assay
    description: Target and reference genes, organism and sample type, chemistry (intercalating dye or probe), primer sequences or design status, template (DNA or cDNA and how it was made), instrument, and what you have run so far.
    type: text
    required: true
  - name: results
    description: Results so far, such as Cq values, standard curve slope and R squared, melt curve description, no-template and no-RT control results. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Current state, Optimisation steps, Validation criteria, Controls, Reference genes, Analysis, Reporting checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most qPCR problems come from skipping validation: primers that also amplify genomic DNA or form dimers, efficiencies far from 100 percent that make the comparative Cq (delta-delta Cq) method wrong, a single unvalidated reference gene that changes with treatment, and missing no-template and no-reverse-transcription controls. The MIQE guidelines list what a publishable assay must report. Commonly used acceptance ranges are an efficiency of about 90 to 110 percent from a standard curve slope across the working range, a linear fit with R squared close to 1, a single specific melt peak for dye-based assays, and clean no-template controls. Reference genes should be shown to be stable in the specific samples and conditions, usually using two or more.

Assay:
<assay>
{{assay}}
</assay>
{{#results}}
Results so far:
<results>
{{results}}
</results>
{{/results}}
</context>

<task>
1. Current state: summarise what is known and judge it against the criteria{{#results}}, interpreting the results given (for example, computing efficiency from a slope as E = 10^(-1/slope) - 1 and saying what the melt curve and controls indicate){{/results}}. Name the first problem to fix.
2. Optimisation steps in order: primer checks (amplicon length, exon junction spanning for cDNA, specificity checks to run), annealing temperature gradient, primer concentration matrix, template input range and inhibition check by dilution, with what to look for at each step.
3. Validation criteria: efficiency, linearity and dynamic range from a dilution series of at least five points in replicate, melt curve or probe specificity, limit of detection if relevant, and repeatability across runs.
4. Controls: no-template control, no-reverse-transcription control, positive control, inter-run calibrator if using several plates, and what each result means.
5. Reference genes: how to choose candidates and test their stability across the actual samples and conditions, and how many to use.
6. Analysis: whether the comparative Cq method is valid given efficiencies, or an efficiency-corrected method is needed, and how to handle technical and biological replicates.
7. Reporting checklist: the MIQE items to record and report.
</task>

<constraints>
- Do not invent primer sequences, Cq values or efficiencies; work only from what is given.
- Present acceptance ranges as commonly used criteria to confirm against the lab's or journal's standard, not as universal rules.
- Do not recommend the comparative Cq method when target and reference efficiencies differ substantially without saying it biases the result.
</constraints>

<output_format>
Use the contract's section headings in order. Optimisation steps as a numbered list. Validation criteria and controls as tables: Check | Criterion | Your result | Pass.
</output_format>
