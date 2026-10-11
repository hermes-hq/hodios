---
schema: 1
id: plan-instrument-calibration-schedule
kind: prompt
title: Plan instrument calibration and checks
description: Plans calibration and in-house performance checks for lab instruments such as pipettes, balances, pH meters and centrifuges, with intervals, acceptance criteria, out-of-tolerance actions and records.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [calibration, metrology, performance-checks, quality-assurance, equipment-records]
pairs_with:
  prompts: [calculate-measurement-uncertainty, set-up-equipment-booking-rules]
  personas: [lab-manager]
args:
  - name: instruments
    description: The instruments with type, model if known, how they are used, how critical their measurements are, how often they are used, and any current calibration or service arrangements.
    type: text
    required: true
  - name: quality_system
    description: Any quality system or accreditation the lab works under (for example ISO/IEC 17025, GLP, GMP, clinical accreditation, or none) and auditor findings. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Instrument register, Schedule, Check procedures, Out-of-tolerance actions, Records]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Labs often confuse three different things. Calibration compares an instrument against a reference traceable to national standards and is usually done by an accredited provider, producing a certificate with measured errors and uncertainty. Performance checks (verification) are quick in-house tests between calibrations: check weights on a balance, a gravimetric check of a pipette, buffer readings on a pH meter, a reference thermometer in an incubator. Maintenance keeps the instrument working. Intervals should follow risk: how critical the measurement is, how often the instrument is used, how stable it has been, and what the manufacturer or quality system requires. The hard part is what happens when a check fails: the instrument is taken out of use, and someone must assess which results since the last good check may be affected.

Instruments:
<instruments>
{{instruments}}
</instruments>
{{#quality_system}}Quality system: {{quality_system}}{{/quality_system}}
</context>

<task>
1. Instrument register: list each instrument with an ID scheme, location, owner, criticality (high, medium, low) with the reason, and current status.
2. Schedule: for each instrument, external calibration interval, in-house check frequency (daily, before use, weekly, monthly), and maintenance tasks, with the reasoning for each interval{{#quality_system}} and any requirement of the quality system given{{/quality_system}}.
3. Check procedures: short step lists for each in-house check (for example check weights on a balance, gravimetric pipette check at stated volumes with replicates, two- or three-point pH calibration with slope check, reference thermometer readings), with acceptance criteria taken from the manufacturer's specification or the relevant standard and written as [CONFIRM] values where not given.
4. Out-of-tolerance actions: label and remove from use, notify users, assess impact on results since the last passing check, repair and recalibrate, and record the decision.
5. Records: the log fields for each check, where certificates are kept, how to show traceability, and the reminder system so due dates are not missed.
</task>

<constraints>
- Do not invent tolerances, maximum permissible errors or calibration intervals required by a standard; state them only if supplied, otherwise mark [CONFIRM] with where to find them (manufacturer specification, ISO 8655 for piston pipettes, the accreditation body's guidance).
- Separate calibration, verification and maintenance clearly in every table.
- Scale the plan to the lab: a teaching or small research lab does not need an accredited lab's paperwork unless it works under one.
</constraints>

<output_format>
Use the contract's section headings in order. Register and Schedule as tables. Check procedures as short numbered lists under each instrument type.
</output_format>
