---
schema: 1
id: design-behavioral-experiment
kind: prompt
title: Design a behavioural experiment
description: Designs a lab or online behavioural experiment with conditions, between or within-subjects design, counterbalancing, stimuli, manipulation checks, power and a trial-by-trial procedure.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [psychology]
tags: [experimental-design, counterbalancing, manipulation-check, within-subjects, between-subjects, experimental-psychology]
pairs_with:
  prompts: [write-testable-hypotheses, calculate-sample-size, write-preregistration, plan-online-participant-recruitment]
  personas: [research-methodologist]
args:
  - name: idea
    description: The effect you want to test, the population, whether it runs in the lab or online, the time per participant and any paradigm you have in mind.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Hypothesis and manipulation, Design, Stimuli and materials, Procedure, Power and sample, Analysis plan, Confounds checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Behavioural experiments fail less from statistics than from design details. A manipulation that changes two things at once cannot say which one mattered; a within-subjects design without counterbalancing confuses condition with order, practice or fatigue; stimuli that differ in length, familiarity or difficulty across conditions create confounds; demand characteristics let participants guess and perform the hypothesis; and a manipulation check placed before the outcome can itself change the outcome. Experts decide between and within designs on the trade-off between power and carry-over, treat stimuli as a random factor when items are sampled from a larger set, plan the number of trials and participants together, keep the analysis consistent with the design (for example mixed models with participants and items as random effects), and write the procedure down to the screen and second so it can be replicated.
</context>

<task>
Design an experiment for:
<idea>
{{idea}}
</idea>

1. State the hypothesis and the manipulation: the independent variable(s), levels, and exactly what differs between conditions. Check that only the intended feature differs; propose a better control condition if not.
2. Choose between-, within- or mixed design and justify it by carry-over risk, power and practicality. For within factors, specify counterbalancing (full, Latin square, or randomised order) and blocking.
3. Specify stimuli: how many items, how they are created or sampled, which features are matched across conditions, and norming or pretesting needed.
4. Write the procedure step by step: consent, instructions, practice trials, trial structure with timings, randomisation, breaks, the manipulation check (placed after the main outcome unless there is a reason not to), demand and suspicion probe, and debrief.
5. Give the power logic: the smallest effect of interest and where it comes from, the number of participants and trials, and a simulation-based approach for mixed models if appropriate. Do not use an effect size from a single small prior study uncritically.
6. Pre-specify the analysis: the model, random effects structure, exclusions at trial and participant level, and how manipulation check failures are handled.
7. List confounds and how the design rules out each.
</task>

<constraints>
- Do not invent effect sizes from named studies; label any value as an assumption with its rationale.
- Avoid deception unless needed; if used, require a debrief and ethics approval.
- Keep total session time realistic for the stated setting, especially online.
- Flag designs that need more participants than the user can reach and propose a simpler design.
</constraints>

<output_format>
## Hypothesis and manipulation
The hypothesis and a table of conditions with what differs.
## Design
Design type, counterbalancing and randomisation.
## Stimuli and materials
Item counts, matching and pretesting.
## Procedure
Numbered steps with timings.
## Power and sample
Inputs, result or simulation plan, in a code block.
## Analysis plan
Model and exclusions.
## Confounds checked
A table: confound | how it is controlled.
</output_format>
