---
schema: 1
id: plan-discovery-and-delivery-tracks
kind: prompt
title: Plan discovery and delivery tracks
description: Plans a dual-track roadmap showing discovery items with learning goals next to delivery items, with capacity for each and the evidence an idea needs to move into delivery.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, designer, ux-researcher, engineering-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dual-track, learning-goals, validation, evidence-gates, product-trio]
pairs_with:
  prompts: [build-outcome-roadmap, run-quarterly-planning, map-assumptions, design-validation-experiment]
args:
  - name: ideas
    description: The ideas, problems and committed items on the table, with what is known about each (evidence, open questions, size if known).
    type: text
    required: true
  - name: team
    description: Who is on the team (product, design, research, engineering) and how much of their time is available, plus the planning period.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Sorting the work, Discovery track, Delivery track, Capacity split, Moving from discovery to delivery, Rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan a roadmap with two tracks: discovery, where the team learns whether an idea is worth building, and delivery, where it builds what has earned its place. Single-track roadmaps either treat every idea as committed delivery, so untested bets consume engineering time, or bolt research on as a phase that nobody staffs. Dual-track works when discovery items are written as questions with a learning goal and a time box rather than features, when the same team does both (so engineers see the evidence), when delivery keeps most of the engineering capacity, and when there is an explicit bar of evidence for an idea to move from discovery into delivery, plus a way to kill ideas that fail it. Discovery is cheap only if it stays small: prototypes, interviews, data pulls, fake doors.
</context>

<task>
Ideas and items:

<ideas>
{{ideas}}
</ideas>

Team:

<team>
{{team}}
</team>

1. Sort the work: items ready for delivery (problem understood, solution reasonably clear, evidence it matters), items that need discovery (key risk is value, usability, feasibility or business viability), and items that are commitments regardless of evidence.
2. Write the discovery track: for each item, the riskiest assumption, the learning goal as a question, the cheapest method to answer it, a time box, and who is involved.
3. Write the delivery track: items in order with size, outcome and owner.
4. Split capacity across the tracks by role, explaining the reasoning; engineers should spend some time in discovery for feasibility, not none.
5. Define the evidence bar for moving from discovery to delivery and the kill rule for ideas that fail it, specific to each discovery item where possible.
6. Set the rhythm: how often discovery results are reviewed, how they change the delivery track, and how the two tracks are shown to stakeholders.
</task>

<constraints>
- Do not put unvalidated ideas on the delivery track unless they are explicit commitments, and label those as such.
- Keep discovery methods small and time-boxed; avoid multi-month research projects unless the user asks.
- Do not invent research findings or evidence; mark unknowns.
{{> output/uncertainty}}
</constraints>

<output_format>
## Sorting the work
Table: item | track | main risk | reason.

## Discovery track
Table: item | riskiest assumption | learning goal | method | time box | people.

## Delivery track
Table: order | item | outcome | size | owner.

## Capacity split
Table: role | discovery share | delivery share.

## Moving from discovery to delivery
Bullets: evidence bar and kill rule per item.

## Rhythm
Bullets.
</output_format>
