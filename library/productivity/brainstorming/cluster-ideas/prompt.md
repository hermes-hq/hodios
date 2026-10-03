---
schema: 1
id: cluster-ideas
kind: prompt
title: Cluster a long list of ideas
description: Clusters a long list of ideas into named themes, merges duplicates without losing any idea, and ranks the clusters against stated criteria with reasons. Use after a brainstorm or survey.
category: brainstorming
version: 1.0.0
status: incubating
stage: [review]
role: [manager, product-manager, ux-researcher, individual]
requires: [none]
inputs: [notes, text]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [affinity-mapping, synthesis, deduplication, theme-ranking, sticky-notes]
pairs_with:
  prompts: [brainstorm-ideas, facilitate-group-brainstorm, run-reverse-brainstorm, compare-options-matrix]
args:
  - name: ideas
    description: The ideas, one per line or as pasted sticky notes, survey answers or chat messages. Authors or vote counts can stay in.
    type: text
    required: true
  - name: criteria
    description: How to rank the clusters, for example "impact on customer retention, cost under 5k, can start this month". Optional; default criteria are used and stated if empty.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Clusters, Ranking, Outliers, Gaps, Count check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run affinity mapping, the step after a brainstorm where a wall of sticky notes becomes a few themes people can act on. Good clustering is bottom-up: groups emerge from what the ideas have in common, not from categories decided in advance. Cluster names say something ("Make the first week less lonely"), not just label a topic ("Onboarding"). Duplicates are merged but their authors and counts are kept, because repetition is a signal. Every idea ends up somewhere, including the odd ones, which are sometimes the most valuable.

Ideas:
<ideas>
{{ideas}}
</ideas>
{{#criteria}}
Ranking criteria:
<criteria>
{{criteria}}
</criteria>
{{/criteria}}
</context>

<task>
1. Number every idea in the order given. Split lines that contain two distinct ideas (mark them 4a, 4b). Keep the original wording.
2. Merge duplicates and near-duplicates: keep one canonical wording, list the merged numbers, and count how many times the idea came up.
3. Cluster bottom-up into about five to nine clusters, depending on the list length. Each cluster should hold ideas that would be pursued or decided together. Split any cluster that holds more than a quarter of all ideas unless it is truly one theme.
4. Name each cluster with a short, specific phrase that states the shared intent, and write a one-sentence summary.
5. Put ideas that fit nowhere into "Outliers". Do not force them into a cluster.
6. Rank the clusters against the criteria. If none were given, use impact on the apparent goal, effort to act on, and how often the theme came up, and say that these are defaults. Score each criterion 1 to 5 with a short reason; state any weighting and show the total.
7. Note gaps: obvious angles the list does not cover, given the apparent goal, as questions rather than new ideas.
8. Recount: confirm every numbered idea appears exactly once (in a cluster, as merged, or in outliers).
</task>

<constraints>
- Lose nothing and invent nothing. Do not add ideas to clusters; gaps go in the gaps section only.
- Keep original wording in the cluster lists; your own wording is only for cluster names, summaries and canonical merged items.
- Scores must follow from the ideas and the stated criteria; when a criterion cannot be judged from the text (for example cost), say "unknown" instead of guessing.
- If there are fewer than about eight ideas, say clustering adds little and rank the ideas directly instead.
- If the input is not a list of ideas, say so and ask for one.
</constraints>

<output_format>
## Overview
Number of ideas, duplicates merged, clusters, outliers, and the top-ranked cluster in one line.

## Clusters
For each cluster: name, one-sentence summary, then the ideas as "#n original wording" bullets, with merged numbers and counts like "(#3, #17, #22 · 3 mentions)".

## Ranking
Table: Rank | Cluster | one column per criterion with score and reason | Total.

## Outliers
Bullets with numbers, or "None".

## Gaps
Questions, or "None noticed".

## Count check
"N ideas in, N accounted for."
</output_format>
