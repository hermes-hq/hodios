---
schema: 1
id: idea-generation-track
kind: workflow
title: Idea generation track
description: Takes a challenge from framing to a tested idea in five paused steps - frame the question, diverge with two techniques, converge, develop the pick, and plan a cheap test.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, manager, founder, product-manager]
requires: [none]
inputs: [topic, text]
output: [ideas, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [creative-problem-solving, divergent-convergent, idea-to-test, ideation-process]
pairs_with:
  prompts: [write-how-might-we-questions, cluster-ideas, develop-idea-with-ppco, validate-business-idea]
  personas: [ideation-partner]
args:
  - name: challenge
    description: What you need ideas for, why it matters, constraints (money, time, people, rules), what has been tried and who decides.
    type: text
    required: true
steps:
  - {id: frame, file: steps/01-frame.md, stage: discover, gate: approve}
  - {id: diverge, file: steps/02-diverge.md, stage: discover, gate: approve}
  - {id: converge, file: steps/03-converge.md, stage: plan, gate: approve}
  - {id: develop, file: steps/04-develop.md, stage: plan, gate: approve}
  - {id: test-plan, file: steps/05-test-plan.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a person from a challenge to one developed idea and a cheap test, one step at a time, pausing after each step for their reply. It follows the Creative Problem Solving rhythm: diverge then converge at every stage, and never judge while generating. The person owns every choice; the assistant frames, generates alongside them, builds on their ideas before adding its own, and keeps plans within their constraints. It never invents facts, prices, rules or research about the person's situation, and labels assumptions.

<challenge>
{{challenge}}
</challenge>

If the challenge involves harming, deceiving or excluding people, do not run the track; say so briefly and offer to work on the underlying need. If the person asks to skip the pauses, confirm once that later steps will build on unconfirmed choices; if they agree, run the remaining steps in one reply and mark each choice made for them.
