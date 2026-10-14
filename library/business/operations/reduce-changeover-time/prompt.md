---
schema: 1
id: reduce-changeover-time
kind: prompt
title: Reduce changeover time
description: Cuts machine or line changeover time with the SMED method - separating external from internal tasks, converting and streamlining them - and writes a standard changeover sheet.
category: operations
version: 1.0.0
status: incubating
stage: [design, operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, transcript, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [smed, changeover, setup-reduction, lean, machine-setup]
pairs_with:
  prompts: [calculate-process-capacity, run-value-stream-map, write-sop]
args:
  - name: changeover
    description: The machine or line and what changes (product, size, colour, recipe, tooling), the steps as they happen today in order with rough times (a timed video walkthrough written up is ideal), who does them, and total time from last good part to first good part.
    type: text
    required: true
  - name: situation
    description: How many changeovers per day or week, whether the machine is the bottleneck, budget, and any constraints (shared tools, one setter, cleaning or allergen rules).
    type: text
output_contract:
  format: markdown
  sections: [Baseline, Task breakdown, Move to external, Streamline internal, Standard changeover sheet, Expected result, Safety and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Changeover time is measured from the last good part of one run to the first good part of the next at full speed, so trial runs and adjustments count. The SMED method (single-minute exchange of die) works in stages: record every task with its time; separate internal tasks (only possible with the machine stopped) from external ones (possible while it runs, such as fetching tools, preheating, preparing the next material and paperwork); move everything possible to external; convert internal tasks to external through preparation (pre-set tooling, standard heights, duplicate fixtures); then streamline what remains (quick-release clamps instead of bolts, fewer adjustment points, parallel work by two people, checklists, eliminating trial-and-error adjustment). Typically the first stage alone, doing preparation before stopping, removes a large share of the time with little spending. Cutting changeover time matters most on the bottleneck, where minutes saved become output, or where shorter changeovers allow smaller batches and less stock.
</context>

<task>
Changeover:
<changeover>
{{changeover}}
</changeover>

{{#situation}}Situation:
<situation>
{{situation}}
</situation>{{/situation}}

1. State the baseline: total time from last good to first good part, number of changeovers per period, and the time lost per week. If the steps add up to less than the total, point out the unaccounted time (usually searching, waiting and adjusting).
2. Break the changeover into tasks with times and classify each as internal or external as done today, and as it could be.
3. List tasks to move to external: preparation checklist, tool and material staging, pre-heating, paperwork, and who does them before the stop.
4. Convert and streamline internal tasks: standardised settings, preset tools, quick fasteners, parallel work with clear roles, removing adjustment by fixing positions. Give each idea an estimated saving and a cost band (low, medium, high).
5. Write a standard changeover sheet: before stop, during stop (sequence with roles), first-part checks, and after (put away, record time).
6. Estimate the new changeover time and what it means: extra output if the machine is the bottleneck, or smaller batches if not.
7. Cover safety and quality: isolation and lock-out before reaching into machinery, cleaning and allergen or contamination checks where relevant, first-off approval.
</task>

<constraints>
- Never suggest skipping isolation, guarding, lock-out or cleaning steps to save time; safety tasks stay and may be done faster only by better preparation.
- Use only the times given; mark estimates as estimates.
- Do not invent machine models, part numbers or prices; use cost bands.
- If the machine is not the bottleneck and changeovers are rare, say the gain may be small and where the effort would pay more.
</constraints>

<output_format>
## Baseline
## Task breakdown
Table: # | Task | Time | Internal or external today | Could be.
## Move to external
## Streamline internal
Table: Idea | Saving estimate | Cost band.
## Standard changeover sheet
## Expected result
## Safety and checks
</output_format>
