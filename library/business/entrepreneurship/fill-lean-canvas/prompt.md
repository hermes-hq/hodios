---
schema: 1
id: fill-lean-canvas
kind: prompt
title: Fill a lean canvas
description: Fills a lean canvas for a new business idea one block at a time with probing questions, then marks which assumptions are riskiest and how to test them first.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, individual, student]
requires: [none]
inputs: [text]
output: [table, questions, plan]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [lean-canvas, one-page-plan, riskiest-assumption, problem-solution-fit, customer-segments]
pairs_with:
  prompts: [validate-business-idea, analyze-business-model, write-business-plan, map-value-proposition-canvas]
  workflows: [idea-validation-track]
args:
  - name: idea
    description: The idea in your own words - who it is for, the problem, what you would offer and how it earns money. Rough is fine.
    type: text
    required: true
  - name: what_you_know
    description: Anything you have learned so far - customer conversations, competitors, prices you have seen, costs. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Lean canvas, Riskiest assumptions, Tests to run first, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders fill a lean canvas: a one-page model with nine blocks - problem, customer segments, unique value proposition, solution, channels, revenue streams, cost structure, key metrics and unfair advantage. The canvas is useful because it forces specific answers and exposes guesses. Common mistakes: writing "everyone" as the customer, listing features as the problem, an unfair advantage that anyone could copy ("passion", "quality"), revenue with no price, and no early adopters named. The recommended order is problem and customers first, then value proposition, solution, channels, revenue, costs, metrics and advantage last.

<idea>
{{idea}}
</idea>
{{#what_you_know}}
<what_you_know>
{{what_you_know}}
</what_you_know>
{{/what_you_know}}
</context>

<task>
1. Draft every block from what the founder gave, in plain short phrases. For problem, list the top three problems and the existing alternatives customers use today. For customers, name the early adopters: the narrow group feeling the problem most.
2. Mark each block's content as known (from evidence given) or assumed.
3. For each block that is vague or assumed, ask one or two probing questions that would make it specific (for example: "Who paid for a fix to this in the last year?", "What would you charge, per what?").
4. Challenge the unfair advantage: if it can be copied or bought, say so and suggest what a real one could become (insider access, a community, data, a cost edge, a hard-won relationship), or write "none yet".
5. Rank the three riskiest assumptions: the ones that, if wrong, kill the business, and that are least supported by evidence.
6. For each, propose the cheapest test that gives a real signal within two weeks, with a pass threshold.
7. When the founder answers the questions, update the canvas and the risk ranking, and show what changed.
</task>

<constraints>
- Keep each block to a few short phrases; the canvas must fit one page.
- Do not invent customers, competitors, prices or market sizes. Use "[assumption]" and say what to find out.
- One canvas per customer segment. If the idea serves two quite different segments (for example both sides of a marketplace), say so and fill the canvas for the segment to start with.
- Prefer tests that measure behaviour (sign-ups, deposits, pre-orders, replies) over opinion surveys.
</constraints>

<output_format>
## Lean canvas
Table: Block | Content | Known or assumed.
## Riskiest assumptions
Numbered, with why each is risky.
## Tests to run first
Table: Assumption | Test | Cost | Pass threshold | Deadline.
## Open questions
The probing questions, grouped by block.
</output_format>
