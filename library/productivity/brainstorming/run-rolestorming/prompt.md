---
schema: 1
id: run-rolestorming
kind: prompt
title: Run a rolestorming session
description: Generates ideas by answering a challenge as other people would - a newcomer, a critic, a child, a rival, someone from another trade - then collects what each role saw that the group missed.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [manager, product-manager, teacher, individual]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rolestorming, perspective-taking, borrowed-viewpoints, ideation-technique]
pairs_with:
  prompts: [brainstorm-ideas, facilitate-group-brainstorm, find-ideas-from-analogies]
args:
  - name: challenge
    description: The question you need ideas for, with context and constraints.
    type: text
    required: true
  - name: roles
    description: Optional - roles you want used, for example "a first-time customer, a competitor, a firefighter". Describe types of people, not real named individuals.
    type: text
output_contract:
  format: markdown
  sections: [Challenge, Roles, Ideas by role, What the roles saw, Shortlist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rolestorming, described by Rick Griggs, asks participants to brainstorm as someone else. It helps in two ways: people offer ideas they would hesitate to own ("the critic would say..."), and the role brings knowledge and priorities the group lacks. Roles work best when they are concrete types with a clear point of view (an impatient first-time user, a night-shift worker, a ten-year-old, a rival trying to steal your customers, a professional from an unrelated trade) rather than vague labels like "a creative person". Using real, named people tends to produce caricature and invented opinions, so roles describe types, not individuals.

<challenge>
{{challenge}}
</challenge>
{{#roles}}
Roles requested:
<roles>
{{roles}}
</roles>
{{/roles}}
</context>

<task>
1. Restate the challenge as one question. If it is too vague, ask up to two questions and stop.
2. Pick six roles{{#roles}}, starting with the user's{{/roles}}: at least one person directly affected, one sceptic or rival, one outsider from a different field, one with very different constraints (time, money, ability, age), and one wildcard. If a requested role is a real named person, replace it with the type of person it stands for and say so.
3. For each role, write two sentences on what this person cares about and notices, then four to six ideas in their voice. Keep them true to the role's priorities, including ideas the user might find uncomfortable.
4. Step out of the roles and list what each role saw that the others missed: needs, risks, overlooked resources.
5. Shortlist six ideas worth exploring, with the role they came from, why they are promising and a first step. Merge ideas that converge from different roles and note that convergence as a signal.
</task>

<constraints>
- Do not put words in the mouths of real named people; use types.
- Avoid stereotypes about groups (age, gender, nationality, disability); roles have points of view, not caricatures.
- Do not invent facts about the user's organisation or market; label assumptions.
- One line per idea.
</constraints>

<output_format>
## Challenge
One question.

## Roles
Numbered list: role and what they care about.

## Ideas by role
One sub-heading per role with its ideas.

## What the roles saw
Bulleted list of insights.

## Shortlist
Table: Idea | From role(s) | Why promising | First step.
</output_format>
