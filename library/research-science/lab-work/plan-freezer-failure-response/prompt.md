---
schema: 1
id: plan-freezer-failure-response
kind: prompt
title: Plan for a lab freezer failure
description: Writes a lab's response plan for an ultra-low or cryogenic storage failure, with sample priorities, an alarm call tree, backup capacity, step-by-step rescue, an excursion record and prevention.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, operations-manager]
subject: [biology]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [ultra-low-freezer, sample-storage, temperature-excursion, business-continuity, cold-chain]
pairs_with:
  prompts: [set-up-sample-tracking, plan-instrument-calibration-schedule]
  personas: [lab-manager]
args:
  - name: lab
    description: The freezers and dewars (type, location, how full), what they hold and which samples are irreplaceable, current monitoring and alarms, who can respond out of hours, and access to dry ice, liquid nitrogen or spare freezer space.
    type: text
    required: true
  - name: incident
    description: If a failure is happening now, what you see - display temperature, alarm, how long it may have been off. Optional.
    type: text
output_contract:
  format: markdown
  sections: [If it is happening now, Sample priorities, Alarm and call tree, Backup capacity, Response steps, After the event, Prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ultra-low freezers fail on weekends more often than anyone plans for: compressors wear out, condenser filters clog, doors are left ajar, power or building work cuts supply. Labs that lose little have four things in place: monitoring with an alarm that reaches a person at any hour, a short list of what to save first (irreplaceable patient or field samples, master cell banks and unique strains before replaceable reagents), reserved backup space or a dry ice supply they can reach within hours, and a written procedure people can follow half-asleep. Opening the door repeatedly warms the cabinet fast, so moves are planned before the door opens. After the event, the temperature record decides whether samples are still fit for use, so it must be kept.

Lab:
<lab>
{{lab}}
</lab>
{{#incident}}
Happening now:
<incident>
{{incident}}
</incident>
{{/incident}}
</context>

<task>
1. If it is happening now: if an incident is described above, give the first five actions for it in order, before anything else in the plan, including who to call and what to move first. Otherwise write "No active incident" and continue.
2. Sample priorities: a tiering of what to save first, with how to mark tiers on racks and in the inventory so a responder who does not know the samples can act.
3. Alarm and call tree: monitoring setup, alarm thresholds to set as [CONFIRM] values, who is called in what order, and what each person does.
4. Backup capacity: reserved space in other freezers, shared facility or partner lab arrangements, dry ice and liquid nitrogen sources with lead times, and how much capacity is needed for tier 1 and tier 2.
5. Response steps: a numbered procedure from alarm to stable storage: check whether it is a false alarm, check power and door, plan moves before opening, personal protective equipment for dry ice and cryogens, ventilation in small rooms, moving by tier, recording times and temperatures.
6. After the event: the excursion record, how to judge sample integrity by sample type, service and root cause, and a short report.
7. Prevention: maintenance (filters, defrosting, seals), not overloading, spreading irreplaceable samples across two freezers, and drills.
</task>

<constraints>
- Do not invent warm-up rates, hold times or safe temperature limits for specific freezers or samples; mark them to confirm from the manufacturer or the lab's own data.
- Include dry ice and liquid nitrogen hazards (asphyxiation in enclosed spaces, cold burns, never sealing dry ice in airtight containers).
- Keep the response steps short enough to print on one page and post on the freezer.
</constraints>

<output_format>
Use the contract's section headings in order. Call tree and sample priorities as tables. Response steps as a numbered list suitable for printing.
</output_format>
