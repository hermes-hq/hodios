---
schema: 1
id: diagnose-strategic-challenge
kind: prompt
title: Diagnose the strategic challenge
description: Writes the core of a business strategy - a sharp diagnosis of the critical challenge, a guiding policy and coherent actions - and rejects goals posing as strategy.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive, consultant]
requires: [none]
inputs: [text, document, notes]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [strategy-kernel, diagnosis, guiding-policy, coherent-action, bad-strategy]
pairs_with:
  prompts: [write-three-year-strategic-plan, pick-strategy-framework, run-swot-analysis, write-one-page-strategy-for-owners]
  personas: [management-consultant]
args:
  - name: situation
    description: The business situation - performance, market, competitors, capabilities, what leaders believe the problem is - and any current strategy or goals document.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Bad strategy check, Diagnosis, Guiding policy, Coherent actions, What this rules out, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work with the "kernel" of strategy described in strategy literature: a diagnosis that simplifies a messy situation into the one or two challenges that matter most; a guiding policy, the overall approach chosen to deal with them, which rules options out; and a set of coherent actions that reinforce each other and use the company's resources in a focused way. Much of what is called strategy is not: lofty goals ("be number one"), fluff ("leverage our customer-centric platform"), long lists of unrelated initiatives, or a refusal to face the real problem. The diagnosis is the hardest and most valuable part: it names the obstacle, not the wish.
</context>

<task>
Work on this situation:

<situation>
{{situation}}
</situation>

1. Bad strategy check: if the material contains a current strategy or goals, test it for the four common faults (fluff, failure to face the challenge, goals mistaken for strategy, unrelated objectives). Quote the lines and say what is missing. If there is none, say so.
2. Diagnosis: name the critical challenge in two or three sentences. Explain why this is the crux, what evidence in the material supports it, and which other problems it explains. Offer one alternative diagnosis and why you rank it lower.
3. Guiding policy: the overall approach to the challenge, stated in one or two sentences, with the source of advantage it relies on.
4. Coherent actions: four to six concrete actions that follow from the policy, show how they reinforce one another, and name the resources committed and the first step for each.
5. What this rules out: activities, customers, products or investments the company will not pursue as a result.
6. Open questions: the facts that would most change the diagnosis and how to check them.
</task>

<constraints>
- Ground the diagnosis in the material; mark inferences and do not invent facts or numbers.
- A goal ("grow 20%") is never a diagnosis or a policy.
- Actions must be specific enough that someone could start them next week.
- If the material is too thin to diagnose, ask for the key facts and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bad strategy check
Bullets with quoted lines.

## Diagnosis
Two or three sentences, then evidence and the alternative considered.

## Guiding policy
One or two sentences, then the advantage it uses.

## Coherent actions
Numbered actions, each with resources and first step, then a note on how they reinforce each other.

## What this rules out
Bullets.

## Open questions
Bullets with how to check.
</output_format>
