---
schema: 1
id: run-second-order-thinking
kind: prompt
title: Run second-order thinking on a decision
description: Maps the second- and third-order consequences of a decision for each stakeholder over time, finds feedback loops and incentives, rates reversibility and suggests how to proceed.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder, executive, individual]
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [second-order-effects, consequences, unintended-consequences, reversibility, systems-thinking]
pairs_with:
  prompts: [run-pre-mortem, compare-options-matrix, make-life-decision]
  personas: [thinking-partner]
args:
  - name: decision
    description: The decision you are considering, what it is meant to achieve, and the context (organisation, household, community), including anything already tried.
    type: text
    required: true
  - name: stakeholders
    description: The people or groups affected, for example "customers, frontline staff, finance, our competitors". Optional; they are inferred from the decision if empty.
    type: text
output_contract:
  format: markdown
  sections: [The decision, Consequence map, By stakeholder, Loops and incentives, Reversibility, Watch for, How to proceed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You practise second-order thinking. First-order consequences are what the decision is designed to do. Second-order consequences come from how people and systems respond to it: they change behaviour, game the incentives, compete for the freed resource, or stop doing something nobody knew they were doing. Third-order consequences are the responses to those responses, and they often show up months later, far from the original decision. Most bad decisions were fine at first order. You trace the chain one step at a time, for each stakeholder, over time, and you separate what is likely from what is merely possible.

Decision:
<decision>
{{decision}}
</decision>
{{#stakeholders}}
Stakeholders:
<stakeholders>
{{stakeholders}}
</stakeholders>
{{/stakeholders}}
</context>

<task>
1. Restate the decision and its intended first-order effect in one or two sentences. If the decision or its context is too vague to trace consequences, ask up to three questions and stop.
2. List the stakeholders. Start with any given; add those the decision clearly touches, including those who are not in the room (future staff, suppliers, neighbours, regulators, the person's future self).
3. For each stakeholder, trace the chain: first-order effect, then "and then what?" at least twice. For each consequence, give the mechanism (the incentive, constraint or behaviour that produces it), the time frame (days, months, years), the direction (helps or hurts the goal), and a likelihood (likely, plausible, speculative) with a one-line reason.
4. Look across stakeholders for feedback loops (a consequence that amplifies or dampens the original effect), incentives that will be gamed, and anything the current arrangement quietly does that the decision would remove. Name the loop in a sentence.
5. Rate reversibility: is this a one-way door or a two-way door? What would it cost to undo after one month, six months and two years, and what becomes harder to reverse over time (contracts, trust, skills lost, people who leave)?
6. Pick the leading indicators that would show the important second-order effects early, each with a threshold that should trigger a rethink.
7. Recommend how to proceed: go ahead, go ahead with specific mitigations, test it small first (say how), stage it, or rethink. Explain the recommendation through the consequences that matter most. The decision remains the user's.
</task>

<constraints>
- Each consequence needs a mechanism. "Morale might drop" is not enough; say why and among whom.
- Keep likely, plausible and speculative clearly apart; do not present a speculative chain as a forecast.
- Include positive second-order effects too, not only risks.
- Use the facts given; do not invent figures, people or history. Where a number would change the conclusion, say which number to find.
- Stop at third order unless a later step is likely and material.
- If the decision involves health, legal, tax or investment matters, map the consequences but say which professional should check the specifics.
</constraints>

<output_format>
## The decision
Restated decision and intended effect.

## Consequence map
Table: Stakeholder | 1st order | 2nd order | 3rd order | Time frame | Likelihood.

## By stakeholder
Short paragraphs for the three or four stakeholders where the chain matters most, with mechanisms.

## Loops and incentives
Bullets.

## Reversibility
One-way or two-way door, then a table: Point in time | Cost to undo | What gets locked in.

## Watch for
Table: Indicator | Threshold | What it would mean.

## How to proceed
The recommendation, the mitigations, and the smallest test if one is suggested.
</output_format>
