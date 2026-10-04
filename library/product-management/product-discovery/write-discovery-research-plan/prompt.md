---
schema: 1
id: write-discovery-research-plan
kind: prompt
title: Write a discovery research plan
description: Writes a one-page discovery plan linking each learning goal to the decision it informs and the cheapest method that can answer it, with sample, timeline, budget and attendees.
category: product-discovery
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, designer, ux-researcher]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [research-plan, learning-goals, method-selection, sample-size, decision-driven]
pairs_with:
  prompts: [write-customer-interview-guide, write-research-screener, design-validation-experiment, write-discovery-readout]
  personas: [product-coach]
args:
  - name: decision_and_unknowns
    description: The decision coming up, when it must be made, who makes it, and what you do not know that matters for it.
    type: text
    required: true
  - name: project_constraints
    description: Time, budget, people available, access to users and anything off-limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Decision, Learning goals, Plan, Timeline, Budget and people, Cut from scope]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write research plans for small teams without a dedicated researcher. Research plans go wrong when they start from a method ("let's do a survey") instead of a decision, collect goals that would not change anything ("understand users better"), choose expensive methods for questions that analytics or ten minutes of desk research could answer, and forget to book the people who must see the results first-hand. A good plan fits on one page: each learning goal names the decision it informs and the cheapest method that can answer it credibly.
</context>

<task>
Decision and unknowns:

<decision_and_unknowns>
{{decision_and_unknowns}}
</decision_and_unknowns>
{{#project_constraints}}

Project constraints:

<project_constraints>
{{project_constraints}}
</project_constraints>
{{/project_constraints}}

1. Restate the decision, the date and the decision-maker in two lines.
2. Turn the unknowns into three to six learning goals, each phrased as a question with an answer that would change the decision ("If X, we do A; if not, B"). Cut any goal where no plausible answer changes the decision and list it under "Cut from scope".
3. For each goal choose the cheapest credible method, in roughly this order of cost: existing data (analytics, support tickets, sales notes), desk research, a short survey to behaviour-based questions, interviews, observation or contextual inquiry, usability or prototype test, live experiment (fake door, concierge, pilot). Say why a cheaper one is not enough when you pick a more expensive one.
4. Participants and sample per method, with rules of thumb: five to eight interviews per distinct segment for patterns; five users per round for usability problems; surveys need enough responses per segment to compare (often 100+), and experiments need the traffic for a pre-set threshold.
5. Timeline back from the decision date, including recruiting lead time (often one to two weeks), sessions, synthesis and a readout before the decision.
6. Budget and people: incentives, tools, who runs and who attends (decision-makers should see at least two sessions live or recorded), and who writes the readout.
</task>

<constraints>
- Keep it to one page; if it does not fit, the scope is too large and you cut goals.
- Do not invent user numbers, budgets or dates; mark unknowns as [X] and list them.
- If the decision or its date is missing, ask for them and stop; a plan without a decision is not a discovery plan.
</constraints>

<output_format>
## Decision
Two lines.

## Learning goals
Numbered questions, each with "if yes / if no" consequences.

## Plan
Table: goal | method | why this method | participants and sample | owner.

## Timeline
Table: week | activity, ending with the readout before the decision date.

## Budget and people
Bullets: incentives, tools, roles, who attends.

## Cut from scope
Bullets with the reason each goal was cut.
</output_format>
