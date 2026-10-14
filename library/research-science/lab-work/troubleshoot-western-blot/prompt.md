---
schema: 1
id: troubleshoot-western-blot
kind: prompt
title: Troubleshoot a western blot
description: Diagnoses a western blot problem such as no bands, high background, extra bands or smiling lanes from the blot and the method, ranks causes by stage and plans the next blot.
category: lab-work
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, student]
subject: [biology]
requires: [none]
inputs: [notes, text, image]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [western-blot, immunoblotting, background, band-pattern, loading-control]
pairs_with:
  prompts: [troubleshoot-failed-experiment, plan-antibody-validation, write-lab-notebook-entry]
  personas: [lab-manager]
args:
  - name: result
    description: What the blot shows - band sizes seen against the ladder, background, lanes affected, loading control, exposure - and what you expected, including the predicted size of the target.
    type: text
    required: true
  - name: method
    description: Sample prep and lysis buffer, protein loaded per lane, gel percentage, transfer type and conditions, membrane, blocking agent, antibody dilutions and incubation times, washes and detection method.
    type: text
    required: true
  - name: history
    description: Whether this blot or antibody worked before and what has changed since (new lot, new buffer, new person, new samples). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Reading of the blot, Likely causes by stage, Quick checks, Next blot, What to record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A western blot fails at one of a handful of stages: sample (degradation, too little target, wrong fraction), separation (gel percentage, overloading), transfer (incomplete, bubbles, small proteins blown through the membrane, large ones stuck in the gel), blocking and antibodies (concentration, specificity, blocking agent clashing with the epitope or a phospho-antibody), and detection (substrate exhausted, overexposure, saturated signal). Experienced people localise the stage first: a reversible total-protein stain such as Ponceau on the membrane separates transfer from antibody problems, the ladder and loading control show whether separation and loading worked, and a positive control lysate shows whether the antibody can work at all. A band at the "wrong" size is not automatically non-specific: post-translational modifications, isoforms, cleavage and dimers shift apparent size. Changing several things at once makes the next blot uninterpretable.
</context>

<task>
Help me work out what went wrong with this blot.

<result>
{{result}}
</result>

<method>
{{method}}
</method>
{{#history}}

<history>
{{history}}
</history>
{{/history}}

1. Classify the symptom (no signal, weak signal, high uniform background, speckled background, extra bands, band at unexpected size, smeared or smiling lanes, uneven loading, saturated bands) and say what the ladder, loading control and any positive control tell you about which stages worked.
2. Rank the likely causes by stage (sample, gel, transfer, blocking, primary, secondary, detection), each with the observation that supports it and the observation that would rule it out.
3. Quick checks that cost little and split the problem: total-protein stain of the membrane, secondary-only control, re-probing the same membrane, checking the predicted size against known modifications and isoforms in the antibody datasheet, fresh substrate, shorter exposures.
4. Next blot: what to change, one main variable at a time (or a split-membrane comparison if strips allow it), what controls to include (positive lysate, negative or knockdown lysate if available, loading control), and what result would confirm the diagnosis.
5. What to record in the notebook: lot numbers, dilutions, exposure times and the image files unaltered.
</task>

<constraints>
- Do not invent the predicted size, isoforms or modifications of the target; if I did not give them, ask or tell me where to look (the antibody datasheet or a protein database).
- If the result is consistent with several causes, say so and give the check that separates them rather than picking one.
- Do not suggest image adjustments that change the data (selective contrast, splicing lanes without marking it); quantification must use unsaturated exposures.
- If no controls were run, the first recommendation is adding them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Reading of the blot
What worked and what did not, stage by stage.
## Likely causes by stage
| Rank | Stage | Cause | Supports | Would rule it out |
## Quick checks
Numbered, cheapest first.
## Next blot
Changes, controls and the result that confirms the diagnosis.
## What to record
A short checklist.
</output_format>
