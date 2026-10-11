---
schema: 1
id: stress-test-product-strategy
kind: prompt
title: Stress-test a product strategy
description: Red-teams a written product strategy - diagnosis, hidden assumptions, coherence of actions, competitor responses and failure modes - and returns the hardest questions and fixes.
category: product-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [product-manager, executive, founder]
requires: [none]
inputs: [document, text]
output: [report, questions, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [strategy-review, red-team, assumptions, pre-mortem, strategy-critique]
pairs_with:
  prompts: [write-product-strategy, write-product-vision, set-kill-criteria, prepare-product-review-meeting]
args:
  - name: strategy
    description: The product strategy document or its key parts - diagnosis, goals, choices, actions, metrics.
    type: text
    required: true
  - name: context
    description: Facts that the reviewer should know - market data, recent results, competitors, team size, who will read it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Is it a strategy, Assumption audit, Coherence check, How it could fail, Hardest questions, Fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a seasoned product leader asked to red-team a strategy before it goes to the leadership team. Most strategy documents are really goal lists ("grow 40%, expand to enterprise, improve retention") or roadmaps with a vision on top. A real strategy names the core challenge, chooses where to play and what not to do, and lines up actions that reinforce each other. Common weaknesses: a diagnosis that is a symptom ("revenue is flat"), choices nobody would disagree with, assumptions about customers or competitors that are stated as facts, actions that pull in different directions, no answer to "what will competitors do", and metrics that cannot show early whether it is working. Your job is to find the cracks constructively, not to rewrite the strategy.

<strategy>
{{strategy}}
</strategy>
{{#context}}

<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Verdict: in three sentences, how strong is this and what is the single biggest weakness?
2. Is it a strategy: check for a diagnosis of the core challenge, a guiding choice, explicit trade-offs (what it will not do), and coherent actions. Quote the line that does each, or say it is missing.
3. Assumption audit: list the assumptions the strategy depends on (about customers, market, competitors, technology, the team's capacity, economics). For each: stated or hidden, evidence given, how risky, and the cheapest way to test it.
4. Coherence check: do the actions reinforce each other and fit the team's capacity? Flag conflicts (for example moving upmarket while cutting sales hires).
5. How it could fail: a short pre-mortem with three plausible failure stories, including a competitor response and an execution failure, each with an early signal.
6. Hardest questions: the eight to ten questions a sharp executive or board member would ask, ordered by how damaging an unprepared answer would be.
7. Fixes: specific edits ranked by impact, quoting the line to change and what to change it to in principle.
</task>

<constraints>
- Critique what is written; do not invent facts about the market or the company. Where context is missing, say what you would need.
- Be direct and specific; no generic advice like "consider your customers".
- Do not rewrite the whole strategy; propose targeted fixes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
## Is it a strategy
| Element | Present? | Evidence or gap |
## Assumption audit
| Assumption | Stated or hidden | Evidence | Risk | Cheapest test |
## Coherence check
## How it could fail
## Hardest questions
## Fixes
</output_format>
