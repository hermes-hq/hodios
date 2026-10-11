---
schema: 1
id: set-up-equipment-booking-rules
kind: prompt
title: Set up rules for shared lab equipment
description: Sets up booking and use rules for shared lab instruments, with training sign-off, slot limits, priority, logbooks, cleaning, fault lockout, charges and a one-page notice to post by the instrument.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [shared-instruments, core-facility, equipment-booking, user-training, fair-use]
pairs_with:
  prompts: [plan-instrument-calibration-schedule, write-lab-induction-checklist]
  personas: [lab-manager]
args:
  - name: equipment
    description: The instruments to cover, how long a typical run takes, how fragile or costly they are, consumables, and any instrument with special safety needs (lasers, radiation, biohazards).
    type: text
    required: true
  - name: users
    description: Who uses them - groups, number of users, internal and external users, current conflicts or complaints, and who looks after each instrument.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Problems to solve, Booking rules, Training and access, Using the instrument, Faults, Charging, Notice to post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shared instruments cause the same fights in every department: one group books every Friday for months, people overrun into the next slot, untrained users break expensive parts, nobody reports a fault so the next user loses a day, and samples are left in the instrument. Facilities that run well have a named responsible person for each instrument, training sign-off before anyone can book, limits on how far ahead and how much anyone can book, clear overrun and no-show rules, a logbook for usage and problems, a fault lockout process, cleaning rules, and, where costs are recovered, transparent hourly charges. Rules work when they are short, posted by the instrument and enforced consistently.

Equipment:
<equipment>
{{equipment}}
</equipment>

Users:
<users>
{{users}}
</users>
</context>

<task>
1. Problems to solve: from the users and conflicts described, the specific problems the rules must fix.
2. Booking rules: booking system and who manages it, slot length, maximum hours per user or group per week, how far ahead people may book, long-run and overnight rules, priority rules if any (stated plainly and justified), no-show and overrun rules, and how to swap or release slots.
3. Training and access: training steps and sign-off by the responsible person per instrument, levels (assisted, independent, trainer), what happens after a long gap in use, and how access is removed.
4. Using the instrument: pre-use checks, logbook entries (user, date, time, settings, problems), cleaning and decontamination, removing samples and data, and shutdown.
5. Faults: how to report, lockout tagging, who decides when it is back in use, and how affected users are told.
6. Charging: whether to charge, the cost components to include (service contract, consumables, staff time, depreciation), how to set internal and external rates, and placeholders for the amounts.
7. Notice to post: a one-page summary for the wall by the instrument.
</task>

<constraints>
- Do not invent rates, service costs or manufacturer requirements; use placeholders and say where the numbers come from.
- Rules must apply equally to senior and junior users; if priority is given to any group, state why openly.
- Include instrument-specific safety (laser, radiation, biohazard containment) only as a pointer to the relevant local authorisation, not as a substitute for it.
- Keep the posted notice to one page.
</constraints>

<output_format>
Use the contract's section headings in order. Booking rules as a table: Rule | Detail | Why. Notice to post in a fenced block.
</output_format>
