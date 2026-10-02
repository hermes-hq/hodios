---
schema: 1
id: write-product-strategy
kind: prompt
title: Write a product strategy
description: Writes a one-page product strategy with a diagnosis of the core challenge, a guiding policy, coherent actions and an explicit list of what the team will not do.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, document]
output: [plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [strategy-kernel, guiding-policy, non-goals, one-pager]
pairs_with:
  prompts: [build-outcome-roadmap, define-north-star-metric, run-product-teardown]
args:
  - name: context
    description: The product, customers, market, competitors, current performance, what has been tried, and anything leadership has said about direction.
    type: text
    required: true
  - name: goals
    description: Company or product goals for the period, with targets if known. Optional.
    type: text
  - name: constraints
    description: Budget, team size, deadlines, technical debt, regulatory or partner constraints. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Guiding policy, Coherent actions, What we will not do, How we will know, Assumptions and risks, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who writes strategy the way Richard Rumelt describes it: a diagnosis that names the crucial challenge, a guiding policy that says how the team will deal with it, and a set of coherent actions that reinforce each other. Most "strategies" are really goal lists ("grow 40%"), wish lists of every initiative, or fluff ("be the customer-centric leader"). A real strategy makes choices, so it is as clear about what the team will stop or refuse to do as about what it will do. It fits on one page so that people actually read it and use it to make decisions.
</context>

<task>
Context:

<context_notes>
{{context}}
</context_notes>

{{#goals}}Goals:
<goals>
{{goals}}
</goals>
{{/goals}}
{{#constraints}}Constraints:
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Diagnose. Identify the one to three facts that explain why the situation is hard, and name the crucial challenge: the obstacle that, if overcome, unlocks the most progress. Use evidence from the context. If the context is too thin to diagnose, ask up to five targeted questions and stop.
2. Set the guiding policy: one or two sentences that describe the approach to the challenge and rule out reasonable alternatives. Name the alternatives considered and why they lose.
3. Choose three to five coherent actions that follow from the policy, use the team's real advantages, and reinforce each other. For each, say how it addresses the challenge and what it needs (people, time, partners).
4. Write what the team will not do: specific segments, features, channels or requests it will decline or stop, including at least one thing someone in the organisation currently wants.
5. Define how the team will know the strategy is working: leading indicators and one or two lagging outcomes, with targets if the goals provide them.
6. List the key assumptions and the evidence that would make you change course.
7. Test the draft: would a reasonable competitor choose differently? Could a team member use it to decide between two requests? If not, sharpen it.
</task>

<constraints>
- One page: about 400 to 600 words for the strategy itself, excluding assumptions and questions.
- Goals are not strategy; do not let the guiding policy restate a target.
- Every action must follow from the diagnosis; drop anything that does not, however attractive.
- Do not invent market data, competitor moves or customer numbers. Mark any inference from general knowledge as an assumption.
- Plain language. No "synergy", "leverage", "best-in-class", "world-class" or "customer-centric" without a concrete meaning.
</constraints>

<output_format>
## Diagnosis
A short paragraph ending with "The crucial challenge is ...".

## Guiding policy
One or two sentences, then "Alternatives we rejected:" with one line each.

## Coherent actions
Numbered: action, how it addresses the challenge, what it needs.

## What we will not do
Bullets, each with a one-line reason.

## How we will know
Bullets: indicator, target or direction, review date.

## Assumptions and risks
Bullets: assumption, evidence that would change our mind.

## Open questions
Bullets, or "None".
</output_format>
