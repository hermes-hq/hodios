---
schema: 1
id: plan-precision-teaching
kind: prompt
title: Plan a precision teaching programme
description: Plans a precision teaching programme for one pupil - a small fluency target, daily one-minute probes, aims, a teaching routine and a chart to read, with decision rules for when to change the teaching.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [precision-teaching, fluency, progress-monitoring, intervention, data-based-decisions]
pairs_with:
  prompts: [plan-one-to-one-support-session, write-iep-goals, write-iep-progress-report]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: Age or year group, what the pupil can already do accurately in this area, where they are slow or hesitant, and what motivates them. Use initials.
    type: text
    required: true
  - name: skill
    description: The skill to build fluency in, e.g. reading high-frequency words, number bonds to 10, letter-sound correspondences, times tables, spelling a word family.
    type: string
    required: true
  - name: time_available
    description: How many minutes a day an adult can give, and who that adult is. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Target and pinpoint, Probe sheet, Aim and baseline, Daily routine, Chart and decision rules, Moving on, Notes for the adult]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Precision teaching is a way of measuring, not a teaching method: a pupil practises a small, exact skill they can already do accurately, then does a one-minute timed probe each day, and the adult charts correct and incorrect responses per minute. The chart shows quickly whether the teaching is working, so it can be changed after days instead of at the end of a term. Common mistakes: probing a skill the pupil cannot yet do accurately (fluency work builds on accuracy), slices too large (a probe of 50 different words instead of 6 to 10 targets repeated across the sheet), aims picked without a reference, ignoring errors, and continuing the same teaching for weeks when the chart is flat. It suits skills where speed and automaticity matter for later learning, such as word reading or number facts, and it should feel like a game to beat one's own score, not a test.
</context>

<task>
Plan a precision teaching programme.

<pupil>
{{pupil}}
</pupil>

Skill: {{skill}}
{{#time_available}}Time available: {{time_available}}{{/time_available}}

1. Check readiness: does the pupil already do this skill accurately but slowly? If the notes show they cannot yet do it accurately, say to teach for accuracy first and suggest what to teach; then plan the probe for later.
2. Target and pinpoint: write the exact observable behaviour in "see/say", "see/write", "hear/write" or "think/say" form (for example "see word, say word"), and pick a small slice of 6 to 10 items, mixing a few known items with new ones.
3. Probe sheet: lay out the sheet with the items repeated in random order to fill a minute, and say how to make two or three versions so the pupil does not learn the order.
4. Aim and baseline: take three days of baseline probes; set an aim in correct responses per minute with the reasoning (for example a fluent peer's rate on the same sheet, or a typical reference the school uses), and an error aim near zero. Say that aims should be checked against a fluent peer if no reference is available.
5. Daily routine: about 5 to 10 minutes - brief teaching or practice of the slice (with modelling and error correction), the one-minute probe, counting correct and errors, charting with the pupil, and praise for beating their own score.
6. Chart and decision rules: describe a simple chart (days across, responses per minute up, correct and errors marked differently) and rules: if correct rises steadily toward the aim, continue; if three days are flat or falling, change one thing in the teaching (smaller slice, more modelling, different practice); if errors stay high, go back to accuracy teaching.
7. Moving on: when the aim is met on two or three days in a row, add the next slice and occasionally re-probe old slices to check they stay fluent.
8. Notes for the adult: how to keep it positive, what to record, and when to raise concerns with the special educational needs coordinator or teacher.
</task>

<constraints>
- Do not present aims as universal norms; say where they come from and that they need checking.
- Keep it to one skill and one small slice at a time.
- Do not use probes for skills where speed is not useful or would cause distress; if the notes show anxiety about timing, suggest the pupil times against their own previous score privately, or that the adult uses a quiet timer.
- Do not diagnose any difficulty from the information given.
</constraints>

<output_format>
## Target and pinpoint
The pinpoint statement and the item slice.

## Probe sheet
The layout as a grid in a fenced block, and how to vary it.

## Aim and baseline
Bullets with reasoning.

## Daily routine
Numbered steps with minutes.

## Chart and decision rules
A short description of the chart, then a table: Pattern on the chart | What it means | What to change.

## Moving on
Bullets.

## Notes for the adult
Bullets.
</output_format>
