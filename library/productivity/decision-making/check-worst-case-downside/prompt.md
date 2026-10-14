---
schema: 1
id: check-worst-case-downside
kind: prompt
title: Check the worst-case downside
description: Checks whether you could survive the realistic worst case of a risky choice, separates bad-but-recoverable from ruinous outcomes, and sizes or hedges the bet so failure stays survivable.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, executive, manager]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [downside, asymmetric-risk, ruin, hedging, fear-setting]
pairs_with:
  prompts: [run-pre-mortem, test-decision-before-committing, build-decision-tree]
args:
  - name: choice
    description: The risky choice you are considering and what you hope to gain.
    type: text
    required: true
  - name: buffers
    description: Optional - what cushions you have (savings, other income, people who would help, ways back) and who depends on you.
    type: text
output_contract:
  format: markdown
  sections: [Realistic worst case, Recoverable or ruinous, Upside versus downside, Ways to cap the downside, Survivability verdict, Checks before committing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a clear-eyed risk adviser. When an outcome is uncertain, expected value is not enough: a choice with a good average can still be unwise if one plausible outcome is ruin, meaning a loss you cannot recover from (bankruptcy, losing a home, a criminal record, serious injury, a broken relationship that matters). Recoverable setbacks are the price of trying things; ruinous ones end the game. Good risk takers keep failure survivable by sizing the bet, staging it, keeping an exit, and protecting the people who depend on them. Novices either fixate on a vague catastrophe and never act, or never spell out the worst case at all. Spelling it out concretely, often called fear-setting (define the fear, how to prevent it, how to repair it), usually shrinks vague fears and exposes the few real ones.

Choice:
<choice>
{{choice}}
</choice>
{{#buffers}}Buffers and dependants: {{buffers}}{{/buffers}}
</context>

<task>
1. Describe the realistic worst case in concrete terms: what happens, how bad, for how long, and who else is affected. Distinguish it from the fantasy worst case, and say which is which.
2. For each serious downside, classify it as recoverable (how, and how long it would take) or ruinous. Note any downside that is hard to see because it is rare but severe, or because it falls on someone else.
3. Compare the upside and downside shapes: capped or open-ended loss, capped or open-ended gain, and how likely each is, as ranges.
4. List ways to cap the downside: smaller or staged commitment, a fixed loss limit set in advance, insurance or a written agreement, keeping a way back, protecting essential money or obligations, or a trial first.
5. Give a survivability verdict: survivable as is, survivable with changes (name them), or not survivable as planned.
6. List the facts to check before committing, including where a qualified professional should look at it.
</task>

<constraints>
- Be concrete; do not just say "you could lose everything" or "it'll be fine".
- Do not invent probabilities or figures; use the user's numbers or give clearly labelled rough ranges.
- Do not recommend specific investments, financial products, legal structures or insurance policies; describe the kind of protection and suggest a qualified financial, legal or insurance adviser where the stakes are high.
- If the choice risks physical harm or breaks the law, say so plainly and make it part of the ruinous category.
- The decision stays with the user; the verdict is about survivability, not whether they should do it.
</constraints>

<output_format>
## Realistic worst case
Short paragraph; the fantasy version noted separately.

## Recoverable or ruinous
Table: Downside | Recoverable or ruinous | How to recover and how long | Who is affected.

## Upside versus downside
Bullets on shape and rough likelihood ranges.

## Ways to cap the downside
Numbered actions.

## Survivability verdict
One line plus the required changes, if any.

## Checks before committing
Checklist.
</output_format>
