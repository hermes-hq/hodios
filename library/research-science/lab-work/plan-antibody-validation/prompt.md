---
schema: 1
id: plan-antibody-validation
kind: prompt
title: Plan antibody validation
description: Plans application-specific validation of a research antibody using genetic, orthogonal, independent-antibody and expression strategies, with controls, titration, acceptance criteria and records.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [antibody-validation, reproducibility, western-blot, immunostaining, rrid]
pairs_with:
  prompts: [plan-bench-experiment, troubleshoot-failed-experiment, write-methods-section]
args:
  - name: antibody
    description: Target protein, host species, clonality, the information the supplier gives (immunogen, validation data, lot), the application (western blot, immunohistochemistry, immunofluorescence, flow cytometry, immunoprecipitation) and the species and sample type.
    type: text
    required: true
  - name: resources
    description: What you have available, for example knockout or knockdown lines, cells known to express or lack the target, a second antibody to another epitope, tagged constructs, access to mass spectrometry. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What needs validating, Validation strategy, Controls, Titration, Acceptance criteria, Records and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Antibodies are a major source of irreproducible results. An antibody that works in western blot (denatured protein) may fail in immunohistochemistry (fixed, folded protein), so validation is specific to the application, the sample type and often the lot. A widely cited framework from an international working group proposes five strategies: genetic (signal lost in knockout or knockdown samples), orthogonal (agreement with an antibody-independent measure such as RNA or mass spectrometry across samples), independent antibodies (two antibodies to different epitopes give the same pattern), expression of a tagged protein (signal matches the tag), and immunocapture followed by mass spectrometry. Genetic strategies are usually the strongest. Good practice also records the antibody's Research Resource Identifier (RRID) and lot, titrates for each application, and checks expected molecular weight, isoforms and modifications.

Antibody:
<antibody>
{{antibody}}
</antibody>
{{#resources}}Resources: {{resources}}{{/resources}}
</context>

<task>
1. What needs validating: the claim the user wants to make with this antibody in this application, and what the supplier's data does and does not already show for this application, species and sample.
2. Validation strategy: choose at least one, ideally two, of the five strategies{{#resources}} using the resources available{{/resources}}, with the experiment for each, ranked by strength and effort. If no strong strategy is feasible, say what claim the data will and will not support.
3. Controls: positive and negative samples, secondary-only and isotype or no-primary controls where relevant, blocking peptide only as a weak supporting control, and loading or counterstain controls.
4. Titration: a dilution series plan for this application with what to judge (signal to background, specific pattern) and the criteria for picking the working dilution.
5. Acceptance criteria: what result counts as validated for this application, including expected band size or localisation as [CONFIRM] from databases, and what result means the antibody should not be used.
6. Records and reporting: notebook fields (supplier, catalogue number, lot, RRID, dilution, conditions), how to handle a new lot, and what to report in a methods section.
</task>

<constraints>
- Do not invent the target's molecular weight, localisation, isoforms or the supplier's validation data; mark them [CONFIRM] with where to check.
- Say plainly that a single band of the expected size, or a blocking peptide result, alone is weak evidence of specificity.
- Validation applies to the tested application, sample type and lot; never imply that one result validates other uses.
</constraints>

<output_format>
Use the contract's section headings in order. Validation strategy as a table: Strategy | Experiment | Strength | Effort | Feasible with resources. Records as a checklist.
</output_format>
