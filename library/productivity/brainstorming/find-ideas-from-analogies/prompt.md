---
schema: 1
id: find-ideas-from-analogies
kind: prompt
title: Find ideas from analogies
description: Generates solutions by abstracting a problem to its core structure, borrowing how nature, other industries and history solved the same structure, and adapting the best ones with a cheap test.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [founder, product-manager, designer, individual]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [analogical-thinking, biomimicry, cross-industry, lateral-thinking, innovation]
pairs_with:
  prompts: [brainstorm-ideas, cluster-ideas, run-reverse-brainstorm]
args:
  - name: problem
    description: The problem, with context - who has it, what makes it hard, what has been tried, and constraints such as budget, rules or time.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The problem in abstract, Analogies, Adapted ideas, Where the analogies break, Shortlist and tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You generate ideas through analogy, the method behind many inventions: strip a problem down to its underlying structure, find a field that has already solved that structure, and carry the mechanism back. Near analogies (a similar industry) are easy to adapt but rarely surprising; far analogies (nature, a distant industry, history, games, sport, the military, medicine, logistics) are harder to map but produce the breakthroughs. The value is in the mechanism, not the surface story: "hospitals triage patients by urgency" is useful for a support queue because both face unpredictable arrivals and unequal urgency with fixed capacity.

Problem:
<problem>
{{problem}}
</problem>
</context>

<task>
1. Restate the problem, then abstract it into two or three structural versions that drop the domain words, each in the form "How does a system [do X] under [constraint Y]?" (for example "How does a system keep a scarce resource fair when demand spikes unpredictably?"). If the problem is too vague to abstract, ask up to two questions and stop.
2. For each abstraction, find analogous solved problems across at least four source areas: nature, another industry, history, and one wildcard (games, sport, the arts, the military, medicine, logistics, cities). Aim for ten to fifteen analogies in total, with a mix of near and far.
3. For each analogy, describe the mechanism that makes it work in one or two sentences, and say whether it is near or far.
4. Adapt each analogy into a concrete idea for the user's problem: what it would look like here, who would do what.
5. For the most promising ideas, say where the analogy breaks: what is structurally different in the user's situation (scale, incentives, regulation, human behaviour) and whether the idea survives the difference.
6. Shortlist the three to five strongest ideas, judged by fit of the mechanism, novelty relative to what the user has tried, and feasibility within the stated constraints. For each, give the cheapest test that would show within a few weeks whether it works.
</task>

<constraints>
- Only describe source mechanisms you are confident are real. If you are not sure how something works in nature or history, say "if I recall correctly" or leave it out; do not invent biology, history or company practices.
- Prefer mechanisms over famous anecdotes; use a well-known example only if its mechanism truly fits.
- Respect the constraints the user gave; an idea that needs ten times the budget goes in the list only if marked as such.
- Do not repeat what the user said they have already tried, unless you explain what is different.
- Keep each analogy and adaptation short enough to scan.
</constraints>

<output_format>
## The problem in abstract
The restated problem and the two or three structural versions.

## Analogies
Table: # | Source (area) | Near or far | Mechanism | Adapted idea.

## Adapted ideas
For the six to eight most promising, a short paragraph each: how it would work here.

## Where the analogies break
Bullets: idea number, the difference, and whether the idea survives.

## Shortlist and tests
Table: Idea | Why it is strong | Cheapest test | What would count as success.
</output_format>
