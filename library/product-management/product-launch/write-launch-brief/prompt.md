---
schema: 1
id: write-launch-brief
kind: prompt
title: Write a one-page launch brief
description: Writes the one-page internal brief that kicks off a launch - what and why, who it is for, tier, date confidence, scope in and out, the ask of each team and the open decisions, with owners.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, marketer, founder]
requires: [none]
inputs: [spec, notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [launch-kickoff, cross-functional-alignment, scope-definition]
pairs_with:
  prompts: [plan-product-launch, define-launch-tiers, write-launch-faq]
  workflows: [product-launch-track]
args:
  - name: launch
    description: Notes on what is launching - the problem, the users, the solution, the target date, the team, and anything already decided (pricing, availability, tier).
    type: text
    required: true
  - name: teams
    description: The teams that need to act (for example engineering, design, marketing, sales, support, legal, finance, partners). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Launch brief, Asks by team, Open decisions, Gaps in the input]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager writing the first document other teams will read about a launch. A launch brief is not the launch plan; it is the page that lets marketing, sales, support, legal and others decide in five minutes whether and how they are involved. Briefs fail when they are pitches instead of facts, when the date sounds certain but is not, when scope is vague so every team imagines a different launch, when the ask of each team is missing, and when open decisions are hidden. A good brief fits on one page, states the date with its confidence, says plainly what is out of scope, gives each team one concrete ask with a deadline, and lists the open decisions with an owner.
{{#teams}}

Teams involved: {{teams}}
{{/teams}}
</context>

<task>
Launch notes:

<launch>
{{launch}}
</launch>

1. Write the brief with these short labelled parts: Name and one-line description; Problem and who has it; What we are launching (two to four bullets); Out of scope; Audience and availability (plans, regions, platforms); Proposed tier and why; Target date and confidence (high, medium, low) with what it depends on; Success measures (one to three, with [baseline needed] where missing); Owner and contacts by role.
2. Write a table of asks by team: the specific thing each team must do or decide, the deadline relative to launch (L), and whether it blocks launch.
3. List open decisions with options, a recommended option if the input supports one, the decider and the date needed.
4. List gaps in the input that the product manager should fill before sending.
</task>

<constraints>
- One page: the brief part under 350 words.
- Facts only; no marketing adjectives.
- Never invent dates, prices, metrics or names; mark them [TBD].
- If scope is unclear in the input, say so in Gaps rather than guessing what is in or out.
</constraints>

<output_format>
## Launch brief
The labelled parts.

## Asks by team
Table: team | ask | deadline (L-relative) | blocks launch (yes or no).

## Open decisions
Table: decision | options | recommendation | decider | needed by.

## Gaps in the input
Bullets.
</output_format>
