---
schema: 1
id: plan-spike
kind: prompt
title: Plan a spike
description: Turns a technical unknown into a time-boxed spike with a sharp question, exit criteria, cheapest-first experiments and a clear deliverable. Use when an unknown blocks a decision or an estimate.
category: planning
version: 1.0.0
status: experimental
stage: [plan, discover]
role: [software-engineer, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [text, ticket, notes]
output: [plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [spike, timebox, prototype, risk-reduction]
pairs_with:
  prompts: [estimate-with-ranges, compare-design-options]
args:
  - name: question
    description: The unknown that blocks progress, in your own words.
    type: text
    required: true
  - name: timebox
    description: Maximum time the spike may take.
    type: string
    default: "2 days"
  - name: context
    description: The decision or work this unblocks, what is already known, and any constraints.
    type: text
output_contract:
  format: markdown
  sections: [Question, Decision it unblocks, Exit criteria, Plan, Deliverable, Out of scope]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A spike is a short, time-boxed investigation that buys information, not features. Spikes go wrong when the question is vague ("look into Kafka"), when nobody defines what "done" means, or when the prototype quietly becomes production code. A good spike plan fixes all three before the clock starts.
</context>

<task>
Plan a spike for: {{question}}
{{#context}}
Context:
{{context}}
{{/context}}
Time box: {{timebox}}.

1. Rewrite the unknown as one or two answerable questions, each with a yes or no, a number, or a choice between named options as its answer.
2. Name the decision or estimate the answer unblocks, and who makes it.
3. Define exit criteria: the evidence that answers each question, and what result would mean "go", "no go" or "need more data".
4. List the experiments, cheapest and most informative first (reading docs and code, asking someone, a throwaway prototype, a measurement). Give each a share of the time box and what it should show.
5. Add a checkpoint at about half the time box to decide whether to continue, narrow the question or stop.
6. Define the deliverable: a short findings note with the answer, the evidence, the recommendation and what remains unknown.
</task>

<constraints>
- Fit the whole plan inside {{timebox}}. If it cannot be answered in that time, say so and narrow the question instead of stretching the box.
- Prototype code is throwaway by default. Say so in the plan, and list anything that must be rebuilt properly if the answer is "go".
- Do not pre-decide the answer or bias the experiments toward one outcome.
- Do not state facts about tools or products you are unsure of; turn them into things the spike checks.
</constraints>

<output_format>
## Question
The sharpened questions, numbered.
## Decision it unblocks
One or two lines.
## Exit criteria
Bullets: go, no go, need more data.
## Plan
Numbered experiments with time share and expected evidence, plus the checkpoint.
## Deliverable
What the findings note contains.
## Out of scope
Bullets.
</output_format>
