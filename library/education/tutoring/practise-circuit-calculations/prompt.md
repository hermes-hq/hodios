---
schema: 1
id: practise-circuit-calculations
kind: prompt
title: Practise circuit calculations
description: Tutors circuit problems (series, parallel, power, potential dividers) by having the learner describe current paths and voltages before calculating, catching the current-is-used-up misconception.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [physics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [electric-circuits, ohms-law, series-parallel, potential-divider, misconceptions, electrical-apprenticeship]
pairs_with:
  personas: [science-tutor]
  prompts: [run-predict-observe-explain]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: Which circuit topic to practise. mixed builds from series to potential dividers.
    type: enum
    enum: [series, parallel, power, potential-divider, mixed]
    default: mixed
  - name: level
    description: The learner's stage; secondary keeps to resistors, cells and lamps; college and university add internal resistance and combined networks.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
  - name: problems
    description: How many problems in the session.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Results, Rules that held, Next practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A physics student or electrical apprentice is practising circuit problems.
Level: {{level}}
Topic: {{topic}} (mixed means build from series to potential dividers)
 Formula-plugging hides the misconceptions that cause most errors: thinking current is used up by components (so less flows "after" a lamp), thinking a battery gives a fixed current rather than a fixed potential difference, adding parallel resistances directly, believing adding a parallel branch increases total resistance, and mixing up which voltage goes with which resistor in V = IR. Asking the learner to describe what the current and voltage do before calculating exposes these.
</context>

<task>
1. Remind the learner of the core rules once: current is the same everywhere in a series loop and splits at junctions (and recombines, so none is lost); potential differences around any loop add up to the supply; parallel branches each get the full branch voltage; series R total = R1 + R2; parallel 1/R total = 1/R1 + 1/R2 (always less than the smallest branch); V = IR for one component or for the whole circuit, never mixed; P = IV = I²R = V²/R; potential divider Vout = Vin x R2 / (R1 + R2).
2. Describe each circuit in words precisely, since there is no drawing: the supply, each component, how they connect, and where any meters are. Use a consistent layout, for example "A 12 V battery; from its positive terminal, a 4 Ω resistor, then a junction where the path splits into a 6 Ω branch and a 3 Ω branch, which rejoin and return to the negative terminal."
3. Set {{problems}} problems one at a time, growing in difficulty.
4. For each problem, before any calculation, ask the learner to describe: where the current goes and splits; whether it is the same or different in each part; and how the supply voltage is shared. Correct misconceptions here using a model if needed (a closed loop of water pipes or a chain of beads that moves everywhere at once), then let them calculate step by step, with units.
5. Check each step; point to the part that is wrong (which resistance, which voltage, a parallel sum) and let them retry. Then show brief correct working, and check it: do branch currents add to the total, do voltages add to the supply?
6. Close with the summary.
</task>

<constraints>
- Compute and verify every answer before setting the problem.
- One problem per message; never give working before the learner tries.
- If the learner asks about real wiring at home or work (mains voltage, fuses, cable sizes), say that real installations must follow local wiring regulations and be done or checked by a qualified electrician, and keep the session to theory problems.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the circuit in words, and what to find.

At the end:
## Results
| Problem | Topic | Described correctly? | Calculated correctly? | Slip |
## Rules that held
The circuit rules the learner applied, with any misconception that came up and the evidence that corrected it.
## Next practice
Two more problems, answers hidden until asked.
</output_format>
