---
schema: 1
id: test-physical-prototype-with-users
kind: prompt
title: Test a physical prototype with users
description: Plans hands-on sessions with a looks-like or works-like prototype of a physical product in a realistic setting, with in-context tasks, safety checks and the limits of what it can show.
category: product-discovery
version: 1.0.0
status: incubating
stage: [verify, discover]
role: [product-manager, designer, founder, ux-researcher]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [physical-product, prototype-testing, industrial-design, hardware, user-testing]
pairs_with:
  prompts: [design-validation-experiment, map-assumptions, write-research-screener, test-packaging-and-instructions]
  workflows: [physical-product-validation-track]
  personas: [hardware-product-manager]
args:
  - name: product_and_prototype
    description: What the product is and does, who it is for, and the prototype you have (looks-like, works-like, or both; materials, weight vs final, what works and what is faked, how many units).
    type: text
    required: true
  - name: questions_to_answer
    description: What the team needs to learn from these sessions and which design or business decision each answer will inform.
    type: text
    required: true
  - name: setting
    description: Where the sessions happen - in the user's home, at their workplace, in a lab or studio, outdoors, or in a retail-like setting.
    type: enum
    enum: [in-home, workplace, lab-or-studio, outdoors, retail]
    default: in-home
output_contract:
  format: markdown
  sections: [Fidelity check, What this prototype cannot tell you, Participants, Session plan, Safety and handling, Observation grid, Decision rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an industrial design researcher planning prototype sessions for a physical product (kitchenware, a tool, a wearable, furniture, a device). Physical prototype tests go wrong in predictable ways: the team asks "do you like it?" instead of watching people use it for a real task; the prototype's fidelity does not match the question (a 3D-printed shell cannot answer a durability or grip-fatigue question; a bare circuit board cannot answer a desirability question); people judge weight, finish and price from a prototype that is nothing like the final part; and nobody plans for sharp edges, hot parts, batteries or loose small parts in a participant's hands.

Setting: {{setting}}
</context>

<task>
Product and prototype:

<product_and_prototype>
{{product_and_prototype}}
</product_and_prototype>

Questions to answer:

<questions_to_answer>
{{questions_to_answer}}
</questions_to_answer>

1. Fidelity check. For each question, say whether this prototype can answer it: looks-like answers form, size, first impression and where people try to grip or press; works-like answers function, sequence and timing; a combined prototype is needed for real-task handling. Mark each question "answerable", "partly" (with the caveat) or "not with this prototype" (with the cheapest prototype or test that would answer it).
2. List what this prototype cannot tell you: typically weight and balance if materials differ, durability and wear, surface feel and finish, noise and heat in long use, perceived value or price, and behaviour after weeks of use. Say how to stop participants anchoring on these (tell them what is not final, but only after first unprompted reactions).
3. Participants: 5-8 per distinct user group is usually enough to find handling problems; include at least one person at the edge of the range (small or large hands, reduced grip strength, left-handed, reading glasses) when ergonomics matter.
4. Session plan for the {{setting}} setting, timed (usually 45-60 minutes): unprompted first contact (hand it over without instructions and watch for 1-2 minutes), 3-5 realistic tasks drawn from the user's own routine (for example "make tonight's coffee as you normally would"), a short comparison with what they use today, then debrief. Tasks are things to do, not opinions to give. Adapt logistics to the setting: in-home and workplace need consent for photos of the space and time with the real context; outdoors needs weather and transport plans; retail tests shelf-level choice and first impression.
5. Safety and handling: hazards specific to this prototype (edges, pinch points, heat, batteries, mains power, food contact with non-food-safe materials, small parts near children), mitigations, what participants must not do, and a stop rule.
6. Observation grid: what to record for each task (first grip, hesitations, errors, workarounds, time to complete, spontaneous comments) and what counts as a problem.
7. Decision rules set before the sessions: for each question, what result would change the design and what would let it proceed.
</task>

<constraints>
- Prefer observed behaviour over stated opinion. Purchase intent or price questions on a prototype are unreliable; if the team needs price evidence, point to a separate test with real money at stake.
- Do not invent the prototype's materials, weight or features. If the product or prototype description is too thin to judge fidelity, ask for the missing items (what is real vs faked, materials, number of units) and stop.
- Flag any hazard you cannot rule out from the description as a question, never as safe.
- Remind the team to get informed consent and to be clear that the product is a prototype, not for sale.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fidelity check
Table: question | answerable? | why | better prototype or test if not.

## What this prototype cannot tell you
Bullets, each with how to avoid misleading participants or the team.

## Participants
Groups, numbers, edge-of-range participants and screening criteria.

## Session plan
Timed agenda with each task written as the facilitator would say it, plus setting logistics.

## Safety and handling
Table: hazard | mitigation | stop rule.

## Observation grid
Table: task | what to watch | problem signal | notes column.

## Decision rules
Bullets: per question, what result changes the design and what lets it proceed.
</output_format>
