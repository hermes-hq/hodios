---
schema: 1
id: plan-staggered-family-move
kind: prompt
title: Plan a move where one partner goes first
description: Plans a family move where one adult moves ahead and the rest follow later - who goes first, how long apart, the split of tasks, money for two homes, the children and the reunion.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [split-family-move, living-apart, solo-parenting, family-reunion, moving-abroad]
pairs_with:
  prompts: [plan-long-distance-connection, prepare-children-for-move-abroad, find-rental-from-abroad, plan-relocation-finances]
args:
  - name: plan
    description: Where you are moving, why, who would go first and when, when the others would follow, and what sets that date (school year, house sale, notice period, a permit).
    type: text
    required: true
  - name: household
    description: The adults and their work, children and ages, pets, the home you are leaving, and any support nearby for the one who stays.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is staggering right, Who does what, The months apart, Money for two homes, Children and the one who stays, The reunion, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families who move in two stages. You know why families stagger: a job starts before the school year ends, a house must be sold, a notice period runs on, or the first mover needs to find housing. You know the hidden costs: the parent who stays becomes a solo parent while also selling, packing and closing everything; the one who goes first is lonely, works long hours and makes big decisions (the home, the area) alone; two homes cost more than expected; children may feel the absence as a loss; and the separation often stretches beyond the planned date. You know what helps: a fixed reunion date with a fallback, a clear split of tasks, regular calls at set times, a visit in the middle, joint decisions on the big choices by video, extra help for the parent at home, and checking early whether the family's right to join depends on the first mover's permit or registration.

Plan: {{plan}}
Household: {{household}}
</context>

<task>
1. Is staggering right: compare going together, staggering as planned, and alternatives (a shorter gap, the first mover commuting back, temporary accommodation for everyone), with the main trade-off.
2. Who does what: a task split between the first mover (housing search, registrations, bank, school places, setting up the home) and the one who stays (selling or ending the lease, packing, school records, closing accounts), with joint decisions marked.
3. The months apart: a timeline with call rhythm, at least one visit, decision points and the planned reunion with a fallback date.
4. Money for two homes: the extra costs to list and estimate with the user's figures, and how the household will manage cash flow.
5. Children and the one who stays: how to explain the gap to children by age, keeping the absent parent present, and practical help for the parent who stays (childcare, family, paid help, reduced work).
6. The reunion: preparing the new home, the arrival week, and giving the household time to re-form after living apart.
7. Questions to check: whether the family's permits or registration depend on the first mover, school application timing, and lease or sale deadlines, framed for the right authority or adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state permit or family-reunion rules as fact; frame them as questions for the immigration authority or a lawyer.
- If the parents are separated or in dispute, or one parent would take children abroad without the other parent's agreement, say clearly that this raises serious legal issues and they need a family lawyer before moving any children; do not plan the move.
- Give the parent who stays as much attention as the one who goes.
- Do not invent costs or dates.
</constraints>

<output_format>
## Is staggering right
## Who does what
A table: Task | First mover | One who stays | Joint decision?
## The months apart
## Money for two homes
## Children and the one who stays
## The reunion
## Questions to check
</output_format>
