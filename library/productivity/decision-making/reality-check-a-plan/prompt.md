---
schema: 1
id: reality-check-a-plan
kind: prompt
title: Reality-check an ambitious plan
description: Checks the arithmetic of an ambitious plan - hours, money, skills and dependencies - against what the person really has, then shows the gaps and a version that fits.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, student, manager]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [feasibility, capacity, planning-fallacy, time-budget, overcommitment]
pairs_with:
  prompts: [surface-hidden-assumptions, run-pre-mortem, test-decision-before-committing]
args:
  - name: plan
    description: The plan and its goal and deadline (for example "write a novel, learn Spanish to B1 and run a marathon by next September while working full time").
    type: text
    required: true
  - name: resources
    description: What you really have - free hours per week on a normal week, money, current skills, help from others, fixed commitments.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The plan in numbers, Hours check, Money check, Skills and dependencies, Verdict, A version that fits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check whether a plan adds up. Ambitious plans usually fail on arithmetic, not motivation: the work needs more hours than the person's real free time, the budget leaves out recurring and hidden costs, a skill has to be learned before the plan can start, or one step waits on someone else. People estimate from their best week, not a normal one, and forget illness, holidays, family events and the time lost switching between projects (the planning fallacy). A sound check converts every part of the plan into hours, money and prerequisites, compares the totals with what is really available after a contingency buffer of roughly 20-30%, and then offers a version that fits by cutting scope, extending the date or adding resources, rather than just saying "it is too much".

Plan:
<plan>
{{plan}}
</plan>

Resources:
<resources>
{{resources}}
</resources>
</context>

<task>
1. Break the plan into its main parts. For each, estimate the hours needed (a range, with the basis: typical figures for that kind of task, marked as estimates) and the money needed.
2. Hours check: total the hours, spread them over the weeks to the deadline, and compare with the real free hours per week after a 20-30% buffer for normal disruption. Show the gap as hours per week.
3. Money check: total one-off and recurring costs, add a contingency, and compare with the money available. Show the gap.
4. Skills and dependencies: list skills that must be learned first, and steps that depend on other people, approvals or seasons. Mark any that sit on the critical path.
5. Verdict: fits, fits with no margin, or does not fit, and by how much.
6. A version that fits: offer two or three concrete adjustments (cut or sequence parts, extend the deadline, add help or money), each with the new numbers, and say which part to protect if only one goal survives.
</task>

<constraints>
- Show the arithmetic so the user can correct an estimate and see the effect.
- Label all hour and cost figures as estimates; do not present them as facts about the user's case.
- Use the user's stated free time for a normal week. If they gave only an ideal figure, say so and ask for a typical week.
- Do not judge the goal itself; the job is to make it add up.
</constraints>

<output_format>
## The plan in numbers
Table: Part | Hours (range) | Money | Basis.

## Hours check
Total hours, weeks available, hours per week needed versus available after the buffer, and the gap.

## Money check
One-off, recurring, contingency, available, gap.

## Skills and dependencies
Bullets, critical-path items marked.

## Verdict
One of: fits, fits with no margin, does not fit (with the size of the gap).

## A version that fits
Two or three options with their new numbers, and which part to protect.
</output_format>
