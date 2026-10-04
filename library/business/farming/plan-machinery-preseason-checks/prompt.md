---
schema: 1
id: plan-machinery-preseason-checks
kind: prompt
title: Plan machinery pre-season checks
description: Writes pre-season check lists for tractors, combines, balers, sprayers or drills covering wear parts, fluids, guards, calibration and spares, plus a ranked defects log to clear before the busy season.
category: farming
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [checklist, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [farm-machinery, pre-season-service, sprayer-calibration, spare-parts, defects-log]
pairs_with:
  prompts: [plan-equipment-maintenance, compare-contractor-vs-owning-machinery, write-farm-task-risk-assessment]
args:
  - name: machines
    description: The machines to prepare, with make or type, rough age or hours, and known problems from last season, for example "2015 tractor 6,200 h, front loader; 2008 round baler, knotter missed last year".
    type: text
    required: true
  - name: season
    description: The season or job the machines are being prepared for, for example "spring drilling", "first-cut silage", "grain harvest".
    type: string
    required: true
  - name: workshop
    description: Who does the work - mostly done on the farm, mostly by a dealer, or a mix.
    type: enum
    enum: [own-workshop, dealer, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Timeline, Machine checklists, Calibration, Spares to stock, Defects log, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer or farm mechanic get machines ready before the busy season. Breakdowns in the season cost far more than the part: a day of lost weather, a contractor booked elsewhere, a crop past its best. The common misses are wear parts that look fine but are near the limit (knives, tines, belts, bearings, chains, knotters), calibration skipped because the settings "were right last year", safety guards and lights left broken because the machine still works, and parts that take weeks to arrive being ordered on the day they fail. A good plan starts early enough for dealer lead times and separates "do not use until fixed" from "fix before the season" and "watch".

Season or job: {{season}}
Who does the work: {{workshop}}
</context>

<task>
<machines>
{{machines}}
</machines>

1. Set a timeline working back from the start of {{season}}: inspection first (at least 6-8 weeks ahead where dealer work or imported parts are involved), parts ordered, work done, test run under load at least a week before the season.
2. For each machine write a checklist grouped as: safety (guards, PTO shaft and cover, lights and beacons, brakes, seat belt and rollover protection, steps and handrails, emergency stops, fire extinguisher where carried); fluids and filters; wear parts specific to the machine type; electrics and hydraulics (hoses, couplings, leaks); tyres and wheels; then a test run.
3. Machine-type specifics to include where relevant: combines (knife sections and guards, concave and rotor or drum, sieves, belts and bearings, chopper, dust and chaff build-up as a fire risk); balers (pick-up tines, chains, knotters or net wrap, bale chamber); sprayers (nozzles, filters, pump, boom, leaks, and any test or certification the sprayer needs locally); drills (coulters, metering units, seed rate calibration test, tramline settings); mowers and tedders (blades, bolts, skids).
4. Write the calibration steps for anything that applies product or seed, as a short method the operator can follow, and say to record the result.
5. List spares to stock for the season, ranked by how likely they fail and how long they take to get.
6. Turn the known problems into a defects log, ranked: A = do not use until fixed (safety), B = fix before the season, C = monitor.
7. Where the work is done by a dealer, write what to ask them to check and quote for.
</task>

<constraints>
- Do not invent service intervals, torque figures, pressures or part numbers; say "per the operator's manual" and leave a blank to fill.
- Safety defects are always grade A, even if the machine still runs.
- Always say to switch off, remove the key, lower or support raised parts and wait for moving parts to stop before working on a machine.
- If the machines or season are missing, ask and stop.
</constraints>

<output_format>
## Timeline
Dated or week-numbered bullets working back from the season start.

## Machine checklists
One sub-heading per machine; a checklist with tick boxes, safety items first.

## Calibration
Numbered method per machine that needs it, with a line to record results.

## Spares to stock
Table: part | machine | why | lead time to check | quantity.

## Defects log
Table: grade (A/B/C) | machine | defect | action | who | by when | done.

## Questions
What to confirm (hours, manuals, dealer slots).
</output_format>
