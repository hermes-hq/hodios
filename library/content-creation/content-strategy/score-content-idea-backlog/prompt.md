---
schema: 1
id: score-content-idea-backlog
kind: prompt
title: Score a content idea backlog
description: Scores a backlog of content ideas on audience demand, pillar and goal fit, effort and timeliness, explains each score in a line, and returns a ranked list with three to make next and ideas to drop.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, editor, writer, marketer]
requires: [none]
inputs: [text, dataset]
output: [table, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [idea-triage, idea-backlog, scoring-model, editorial-planning, content-ideas]
pairs_with:
  prompts: [define-content-pillars, plan-content-calendar, mine-audience-questions, find-timely-content-angles]
  personas: [content-strategist]
args:
  - name: ideas
    description: Your list of content ideas, one per line, with any notes (format, where the idea came from, evidence people want it).
    type: text
    required: true
  - name: goals
    description: Your content goal and pillars, for example "grow the newsletter; pillars - beginner guides, gear reviews, trip reports".
    type: text
    required: true
  - name: weights
    description: Optional custom weights out of 100 for demand, fit, effort and timeliness, for example "demand 40, fit 30, effort 20, timeliness 10".
    type: string
    default: demand 35, fit 30, effort 20, timeliness 15
output_contract:
  format: markdown
  sections: [Scoring rules, Ranked backlog, Make next, Drop or park, Missing evidence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a creator, editor or content team turn a long, guilt-inducing idea list into a short queue. Backlogs grow because every idea feels promising and nobody kills any; then the next piece is chosen by mood. A light scoring model forces explicit trade-offs: how strongly the audience wants this (evidence beats guesses), how well it fits the pillars and goal, how much effort it takes, and whether timing matters. Scores are a conversation tool, not truth: the explanation line matters more than the number, and the creator's own judgement can override with a stated reason.

Weights: {{weights}}
</context>

<task>
<ideas>
{{ideas}}
</ideas>

<goals>
{{goals}}
</goals>

1. State the scoring rules: each criterion from 1 to 5 with anchors.
   - Demand: 5 = repeated direct requests or questions, or proven past performance on the topic; 3 = plausible, some signals; 1 = only the creator's interest.
   - Fit: 5 = squarely in a pillar and directly serves the goal; 1 = off-pillar.
   - Effort (reversed, so less effort scores higher): 5 = under two hours or reuses existing material; 1 = multi-day production or needs access they do not have.
   - Timeliness: 5 = tied to a near date or season and loses value later; 3 = evergreen; 1 = already late.
2. Score every idea, compute the weighted total out of 100 (score divided by 5 times weight, summed), and give a one-line reason naming the evidence used.
3. Merge duplicates and near-duplicates, and flag ideas that are really a series or a pillar rather than a single piece.
4. Rank the list. Choose three to make next, balancing at least two pillars and including one quick win if possible.
5. Drop or park: ideas below a clear cut-off (for example under 50) or off-goal, with a reason; park timely ideas for their date.
6. Missing evidence: ideas where a cheap check (search, a poll, past analytics) would change the score.
</task>

<constraints>
- Use only evidence present in the notes for demand; if none is given, score demand 2 or 3 and say so, never invent search volumes or engagement figures.
- If custom weights do not sum to 100, normalise them and say so.
- Show the arithmetic for the top three.
- If there are no goals or pillars, ask for them before scoring fit, or score fit as [X] and say why.
</constraints>

<output_format>
## Scoring rules
The anchors in a compact table and the weights.

## Ranked backlog
Table: rank | idea | demand | fit | effort | timeliness | total | reason.

## Make next
Three numbered ideas with the first step for each.

## Drop or park
Table: idea | drop or park | reason or date.

## Missing evidence
Bullets with the cheap check for each.
</output_format>
