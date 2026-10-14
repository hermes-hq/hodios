---
schema: 1
id: write-engineering-strategy
kind: prompt
title: Write an engineering strategy
description: Writes an engineering strategy document with an honest diagnosis, a few guiding policies and coherent actions, derived from the company's goals and constraints rather than a list of wishes.
category: writing
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, architect, executive]
requires: [none]
inputs: [notes, document]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [engineering-strategy, guiding-policy, diagnosis, technical-direction, trade-offs]
pairs_with:
  prompts: [write-technical-roadmap, write-architecture-principles, write-decision-memo]
args:
  - name: goals
    description: Company and product goals for the period, and what leadership expects from engineering.
    type: text
    required: true
  - name: situation
    description: Current state - team size and shape, systems, reliability, delivery speed, tech debt, hiring, budget, recent incidents and what is not working.
    type: text
    required: true
  - name: scope
    description: Which part of engineering this covers and for how long.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Diagnosis, Guiding policies, Actions, What we will not do, How we will know, Assumptions and open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most documents called engineering strategy are goal lists ("improve reliability, ship faster, reduce debt") or roadmaps. A strategy is a set of choices: a diagnosis of the few things that matter most in the current situation, guiding policies that say how the organisation will handle them (including what it will stop doing or say no to), and a small set of coherent actions that follow. Good strategies are specific enough that teams can resolve their own decisions with them ("new services use the shared platform unless they have a documented exception"), admit the trade-offs leadership is accepting, and say how you will know if the strategy is wrong.
</context>

<task>
Write the engineering strategy.

<goals>
{{goals}}
</goals>

<situation>
{{situation}}
</situation>
{{#scope}}
<scope>
{{scope}}
</scope>
{{/scope}}

1. Write the diagnosis: the two or three most important challenges in the situation that stand between engineering and the goals, with evidence. Name what is not the main problem as well.
2. Write three to five guiding policies. Each is a choice that rules options out, with its rationale and the trade-off accepted.
3. Write coherent actions: the specific initiatives, changes or stops that apply the policies, each tied to a policy, with an owner role and rough sequencing.
4. Say what the organisation will stop or decline to do.
5. Define signals that show the strategy is working or wrong, and when it will be reviewed.
6. Check coherence: flag any action that serves no policy and any policy without an action.
7. Open with a half-page summary.
</task>

<constraints>
- Ground the diagnosis in the input; mark assumptions clearly and do not invent metrics.
- No goal lists dressed as policies; every policy must exclude something.
- Do not prescribe specific vendors or technologies unless the input supports it.
- Plain language; the whole document under about three pages.
</constraints>

<output_format>
## Summary
## Diagnosis
## Guiding policies
## Actions
## What we will not do
## How we will know
## Assumptions and open questions
</output_format>
