---
schema: 1
id: troubleshoot-failed-experiment
kind: prompt
title: Troubleshoot a failed experiment
description: Works out why a bench experiment failed by reading what the controls show, ranking likely causes, and planning the cheapest checks and the next run with one change at a time.
category: lab-work
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [notes, text]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [experiment-troubleshooting, controls, root-cause, reproducibility]
pairs_with:
  prompts: [write-lab-notebook-entry, write-lab-protocol]
  personas: [lab-manager]
args:
  - name: experiment
    description: What you did (or the protocol), what you expected, what you got, the controls you ran and their results, and raw observations such as images, values or gel descriptions.
    type: text
    required: true
  - name: history
    description: Whether this worked before, and anything that changed since - new reagent lot, new person, instrument service, different samples, a protocol tweak. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the result tells you, Likely causes, Checks to run, Next experiment, What to record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experienced scientists troubleshoot from the controls outward. If the positive control failed, the problem is in reagents, equipment or the procedure, not the samples. If the positive control worked but samples did not, look at the samples and how they were prepared. A signal in the negative control or blank points to contamination or non-specific signal. If there were no controls, the first fix is to add them. They also ask what changed since it last worked, check the readout separately from the experiment (was the instrument, stain or detection step at fault?), and repeat a once-working protocol identically before changing anything, because single failures can be chance. Then they change one variable at a time, or split the procedure at checkpoints to find the failing stage, and weigh the cost of investigating against simply repeating.

Experiment:
<experiment>
{{experiment}}
</experiment>
{{#history}}History and changes: {{history}}{{/history}}
</context>

<task>
1. What the result tells you: interpret each control and the sample results, and say at which stage the failure most likely happened (sample, reagent, procedure, equipment, readout or analysis). If key controls are missing, say what their absence prevents you from concluding.
2. Likely causes: rank three to six causes by likelihood given the evidence{{#history}} and the changes listed{{/history}}, each with the observation that supports it and the observation that would rule it out.
3. Checks to run: quick checks that need no new experiment (reagent dates and storage, instrument logs, calculations, pipette check, notebook comparison with the last successful run), cheapest first.
4. Next experiment: the smallest run that separates the top causes, changing one variable per arm, with the controls it needs. Say whether a straight repeat is the better first step.
5. What to record: what to note in the lab notebook now, including lot numbers and deviations, so the next person can follow the investigation.
</task>

<constraints>
- Do not invent results, band sizes, concentrations or instrument settings that were not given; ask or mark them as unknown.
- Never suggest excluding inconvenient replicates, changing the analysis until it gives the expected answer, or reporting a failed run as successful. If asked, refuse and explain that it misrepresents data.
- Flag any safety issue the description reveals, such as a possible exposure or contamination of shared equipment, before troubleshooting.
- For work with dangerous pathogens, toxins or controlled substances, keep to general troubleshooting logic and refer specifics to the biosafety or safety officer.
</constraints>

<output_format>
Use the contract's section headings in order. Likely causes as a table: Cause | Supports it | Would rule it out | Likelihood. Next experiment as a small table of arms and controls.
</output_format>
