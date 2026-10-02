---
schema: 1
id: write-shaped-pitch
kind: prompt
title: Write a Shape Up pitch
description: Writes a Shape Up pitch with the problem, the appetite, a fat-marker solution described in words, rabbit holes with patches and explicit no-gos. For teams using fixed-time, variable-scope cycles.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, designer, tech-lead, founder]
requires: [none]
inputs: [text, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [shape-up, appetite, betting-table, scope-hammering]
pairs_with:
  prompts: [write-problem-statement, define-mvp-scope, write-prd]
args:
  - name: problem
    description: The problem to solve - who hits it, a concrete story of when it happens, and why it matters now.
    type: text
    required: true
  - name: appetite
    description: How much time the work is worth - small (one designer and one or two programmers for one to two weeks) or big (the same team for a full six-week cycle).
    type: enum
    enum: [small, big]
    default: big
  - name: ideas
    description: Rough solution ideas, sketches described in words, constraints or technical notes the shaper already has. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Problem, Appetite, Solution, Rabbit holes, No-gos, Open questions for the betting table]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced shaper in a team that works in Shape Up cycles. A pitch is the document the betting table reads to decide whether to commit a team for a fixed amount of time. Good shaped work is rough (leaves room for the team's design decisions), solved (the main elements and how they connect are worked out) and bounded (clear about what is out). The appetite is fixed and the scope flexes to fit it; the pitch never asks "how long will this take?" but "what is it worth?". Pitches fail when they are a raw idea with no solution, a detailed spec that leaves no room, or an unbounded problem with unaddressed technical unknowns.

Appetite: {{appetite}} (small = one to two weeks for a designer and one or two programmers; big = a six-week cycle for the same team).
</context>

<task>
Problem:

<problem>
{{problem}}
</problem>
{{#ideas}}

Shaper's ideas:

<ideas>
{{ideas}}
</ideas>
{{/ideas}}

1. **Problem:** write the problem around one specific story of a real situation in which the current way fails, and why it matters. State the baseline: what customers do today without this. If the problem is really several problems, pick the one worth this appetite and list the rest as no-gos or future pitches.
2. **Appetite:** restate the appetite and what it implies: what level of solution is worth this much time and what is not. If the problem clearly cannot be solved within the appetite even narrowly, say so and propose a narrower problem that can be.
3. **Solution:** describe the solution at fat-marker level, in words:
   - A breadboard for each flow: places (screens, dialogs, emails), affordances (buttons, fields, links) on each place, and connections between places, written as "Place: affordances → next place".
   - Fat-marker sketch descriptions for any layout that matters, saying only what the arrangement must convey, not visual detail.
   - The key elements and how they fit into the existing product, so a team could start without a meeting.
   Leave visual design, copy and implementation details to the team.
4. **Rabbit holes:** the technical, design or edge-case risks that could blow the appetite, each with a patch: a decision that removes the risk now (a simplifying assumption, a narrower case, a reuse of something existing). Flag any unknown that needs a quick spike or an expert's input before the betting table.
5. **No-gos:** what is deliberately out: use cases, edge cases, platforms or nice-to-haves the team should not attempt in this cycle.
6. **Open questions for the betting table:** decisions or facts needed to bet, and why this is worth betting on now compared with other work.
</task>

<constraints>
- Do not estimate in hours or story points; the appetite is the budget.
- Keep the solution rough: no wireframe-level detail, no full spec, no task breakdown.
- Every rabbit hole has a patch or is called out as a reason not to bet yet.
- If the ideas include a solution that cannot fit the appetite, propose a version that does and explain the cut.
- Plain prose and lists; about one to two pages.
</constraints>

<output_format>
## Problem
The story, the baseline and why now.

## Appetite
Two or three sentences.

## Solution
Breadboards as indented lists, then fat-marker descriptions and how it fits.

## Rabbit holes
Bullets: risk, then the patch.

## No-gos
Bullets.

## Open questions for the betting table
Bullets.
</output_format>
