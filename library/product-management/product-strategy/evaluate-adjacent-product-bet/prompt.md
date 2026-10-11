---
schema: 1
id: evaluate-adjacent-product-bet
kind: prompt
title: Evaluate launching a second product
description: Evaluates whether a company should build a second product next to its core one - customer overlap, right to win, distraction cost, core health gate - and recommends go, test first, or not yet.
category: product-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [second-product, adjacency, multi-product, focus, right-to-win, opportunity-cost]
pairs_with:
  prompts: [assess-product-market-fit, set-kill-criteria, write-product-strategy, define-mvp-scope]
args:
  - name: core
    description: The core product, its customers, growth, retention and how much of the team it uses; known weaknesses still open.
    type: text
    required: true
  - name: idea
    description: The second product idea, who it is for, why now, the evidence of demand you have (customer requests, data, competitor moves), and the team you would put on it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Core health gate, Adjacency test, Right to win, Cost of focus, Options, Recommendation, What would change our mind]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product strategist who has advised companies on going multi-product. A second product can raise revenue per customer, defend the core and open new markets; it can also split a small team, starve the core of attention while it still has unfixed retention problems, and confuse sales and support. Strong adjacencies share something real with the core: the same buyer, the same data, the same distribution channel or the same workflow, so the company has a right to win. Weak ones share only the founders' interest. The usual mistake is to launch the second product to escape a core that has stopped growing for reasons a second product will not fix. The cheapest tests (a concierge version, a paid pilot with existing customers, a feature inside the core) often answer the question before a team is built.

<core>
{{core}}
</core>

<idea>
{{idea}}
</idea>
</context>

<task>
1. Core health gate: judge from the data whether the core is healthy enough (retention, growth, open critical issues) to share attention. If not, say what must be true first.
2. Adjacency test: score shared buyer, shared user, shared data or technology, shared channel, and shared workflow, each strong, partial or none, with reasons.
3. Right to win: what advantage the company brings over specialists already serving this need, and where it would be at a disadvantage.
4. Cost of focus: the people and time the idea takes from the core, what the core roadmap would lose, and effects on sales, support and positioning.
5. Options: compare build as a separate product, build as a feature or add-on to the core, partner or integrate, run a cheap test first, or not now; with the main risk of each.
6. Recommendation: one option, the first test if any, success and stop criteria with dates, and who decides.
7. What would change our mind: the evidence that would flip the recommendation.
</task>

<constraints>
- Use only the evidence given; separate evidence from opinion and mark assumptions.
- Do not invent market sizes, competitor names or customer quotes.
- Criteria must be measurable and dated; no "see how it goes".
{{> output/uncertainty}}
</constraints>

<output_format>
## Core health gate
## Adjacency test
| Dimension | Score | Reason |
## Right to win
## Cost of focus
## Options
| Option | What it means | Main risk |
## Recommendation
## What would change our mind
</output_format>
