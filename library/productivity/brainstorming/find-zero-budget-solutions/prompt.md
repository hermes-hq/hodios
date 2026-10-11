---
schema: 1
id: find-zero-budget-solutions
kind: prompt
title: Find zero-budget solutions
description: Finds ways to solve a problem with no money by inventorying the time, skills, spaces, things and people already available, then combining them into solutions and asks that cost nothing.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, founder, teacher, manager]
requires: [none]
inputs: [topic, text]
output: [ideas, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bricolage, frugal-innovation, resourcefulness, no-budget, effectuation]
pairs_with:
  prompts: [brainstorm-ideas, find-new-uses-for-item, brainstorm-community-project-ideas]
args:
  - name: problem
    description: What you need to achieve or fix, by when, and what you would buy if you had money.
    type: text
    required: true
  - name: what_you_have
    description: Optional - your time, skills, tools, spaces, things, people you know and organisations you belong to.
    type: text
output_contract:
  format: markdown
  sections: [The real need, Resource inventory, Solutions, Asks, Plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When there is no budget, people tend to either give up or shrink the goal. Resourceful people do something else: they start from what they have (who they are, what they know, whom they know), a principle from research on how expert entrepreneurs act, called effectuation, and from "bricolage", making do by recombining resources at hand. They also separate the need from the purchase they first imagined: "we need a projector" may really be "we need everyone to see the slides", which a large TV, printed handouts or a shared screen link can solve. Asking for help, borrowing and swapping are legitimate tools, and many people say yes to a specific, small, time-bound ask.

<problem>
{{problem}}
</problem>
{{#what_you_have}}
What the user has:
<what_you_have>
{{what_you_have}}
</what_you_have>
{{/what_you_have}}
</context>

<task>
1. Restate the real need behind the purchase the user imagined, and the deadline. If the problem is unclear, ask up to two questions and stop.
2. Build a resource inventory in six columns: time, skills, things, spaces, people, organisations or groups{{#what_you_have}}, starting from what the user listed{{/what_you_have}}. Add likely resources they may have overlooked, marked as "check".
3. Generate 12 to 20 solutions that cost nothing or almost nothing: recombining resources, borrowing, swapping skills, using free public services as types (libraries, community spaces), doing less of the expensive part, changing the format, or partnering with someone who has the resource.
4. For each solution, give the trade-off (time, quality, dependence on someone else).
5. Write two or three specific asks: who to ask (by type or relationship), what exactly, for how long, and what they get in return or why they might say yes.
6. Plan the top approach as steps with a fallback if an ask is declined.
</task>

<constraints>
- Do not suggest anything that breaks terms of service, copyright or law, uses employer resources without permission, or relies on unpaid work from people who cannot afford to give it.
- Do not name specific local services or schemes as fact; describe types and say how to find them.
- Be honest when no zero-cost route can meet the need well, and say what the smallest spend would buy.
</constraints>

<output_format>
## The real need
Two lines: the need and the deadline.

## Resource inventory
Table with columns: Time | Skills | Things | Spaces | People | Groups.

## Solutions
Numbered list: solution and trade-off.

## Asks
Each ask as who, what, how long, why they might say yes; with a short message draft.

## Plan
Numbered steps with a fallback.
</output_format>
