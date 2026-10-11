---
schema: 1
id: write-design-rationale
kind: prompt
title: Write a design rationale
description: Writes the rationale for a design decision for stakeholders, linking each choice to evidence, goals and constraints, with alternatives considered, trade-offs and how success will be judged.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, product-manager]
requires: [none]
inputs: [text, image, notes]
output: [docs, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-rationale, stakeholder-communication, design-decisions, trade-offs]
pairs_with:
  prompts: [choose-between-ui-designs, respond-to-design-feedback, write-design-handoff, write-design-principles]
  personas: [product-designer]
args:
  - name: design
    description: The design (screenshots or description) and what it changes compared with today.
    type: text
    required: true
  - name: evidence
    description: The goal, research findings, data, constraints and the alternatives you explored, in rough notes. Mark anything that is a hunch.
    type: text
    required: true
  - name: audience
    description: Who will read it (executives, product and engineering leads, a client, a review board) and what they care about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Problem and goal, Key decisions, Alternatives considered, Trade-offs and risks, How we will know, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Designs get relitigated when stakeholders see the result but not the reasoning. A rationale that works is short, starts with the problem and goal the reader already cares about, and for each important decision says what was chosen, why (evidence first, principle second), and what was given up. It is honest about which reasons are evidence and which are judgement, names the alternatives so readers see they were considered, and ends with how success will be measured, which turns opinion debates into a check that can be run. It is written for decision makers, not as a handoff to engineers.
</context>

<task>
<design>
{{design}}
</design>

<evidence>
{{evidence}}
</evidence>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

If the goal of the design is missing, ask and stop.

1. **Summary.** Three sentences: what changes, why, and the expected result.
2. **Problem and goal.** The user problem and business goal in the audience's terms, with the evidence.
3. **Key decisions.** Three to six decisions that matter most or are most likely to be questioned. For each: what was chosen, why (citing the evidence given, marked as research, data or judgement), and what it means for users.
4. **Alternatives considered.** The options explored and the reason each was not chosen.
5. **Trade-offs and risks.** What the design gives up and the risks, with how each is reduced.
6. **How we will know.** The metrics or test results that will show success or failure, with a time frame and what would trigger a change.
7. **Open questions.** Decisions still pending and who owns them.
Fit the length and vocabulary to the audience: executives get the summary, decisions and metrics without design jargon.
</task>

<constraints>
- Use only evidence provided; never invent research findings, numbers or quotes. Mark judgement calls as judgement.
- Do not oversell; state the risks and trade-offs plainly.
- Plain language; no design jargon without a short explanation for non-designers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
## Problem and goal
## Key decisions
For each: **Decision**, Why (evidence type marked), Effect on users.
## Alternatives considered
| Alternative | Why not chosen |
## Trade-offs and risks
## How we will know
## Open questions
</output_format>
