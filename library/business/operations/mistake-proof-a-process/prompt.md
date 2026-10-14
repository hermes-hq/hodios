---
schema: 1
id: mistake-proof-a-process
kind: prompt
title: Mistake-proof a process
description: Designs mistake-proofing for a recurring human error, from warnings and checklists up to physical and system guards that make the error impossible, ranked by strength and cost.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [poka-yoke, error-proofing, human-error, lean, process-controls]
pairs_with:
  prompts: [run-five-whys, run-fmea, write-capa-report]
args:
  - name: error
    description: The mistake that keeps happening - what goes wrong, at which step, how often, how it is found today and what it costs.
    type: text
    required: true
  - name: setting
    description: Where the work happens and the tools involved (workstation, software, forms, parts, packaging), plus any constraints such as budget, shared equipment or temporary staff.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Error analysis, Options by strength, Recommended controls, Trial plan, What not to rely on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mistake-proofing (poka-yoke) starts from the fact that people will slip, especially when tired, rushed or interrupted, so the process should make the error impossible or at least immediately obvious. Controls form a hierarchy of strength: eliminate the step; prevent the error by design (a part that only fits one way, a form field that will not accept a wrong value, a jig, a colour-coded connector); detect it at the moment it happens and stop the process (scan to confirm, weight check, a sensor, a hard stop in the software); detect it later (inspection); and, weakest, warnings, signs, checklists and retraining. Novices reach for the weakest controls first because they are cheap. Good fixes are specific to the error type (wrong item, missed step, wrong order, wrong quantity, wrong setting, wrong place) and are often cheap: a shadow board, a counter, a template, a default value removed, a cut-out in a box.
</context>

<task>
Error:
<error>
{{error}}
</error>

Setting:
<setting>
{{setting}}
</setting>

1. Classify the error: type (wrong item, omission, wrong order, wrong quantity, wrong setting, wrong place, misreading), whether it is a slip, a lapse or a decision made with wrong information, and the conditions that make it more likely.
2. If the error looks like a deliberate shortcut, say so and identify what makes the right way harder than the wrong way.
3. Generate options at each level of the hierarchy (eliminate, prevent, detect and stop, detect later, warn). Make each option concrete for this setting, not generic.
4. For each, estimate strength, rough cost band (low, medium, high), time to implement and side effects such as slowing the work or new failure points.
5. Recommend a combination: the strongest affordable control, plus a cheap interim measure for this week.
6. Write a trial plan: where to try it, how long, what to measure (error rate, cycle time, workarounds) and the decision rule to keep or change it.
7. List the controls the team should not rely on alone, and why.
</task>

<constraints>
- Do not present retraining, reminders or "be more careful" as the main fix.
- Do not invent equipment models, prices or supplier names; use cost bands.
- If the error affects safety (machinery, electrical, chemicals, medication, food allergens), say the change needs a competent person's review and that bypassing existing guards is never an option.
- Check that a new control does not create a new error, such as people overriding a scanner because it is slow.
</constraints>

<output_format>
## Error analysis
## Options by strength
Table: Level | Option | Strength | Cost band | Time | Side effects.
## Recommended controls
Interim measure and long-term control.
## Trial plan
## What not to rely on
</output_format>
