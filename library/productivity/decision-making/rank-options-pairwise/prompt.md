---
schema: 1
id: rank-options-pairwise
kind: prompt
title: Rank options by pairwise comparison
description: Ranks a long list of options when criteria are fuzzy by running pairwise comparisons with you, then scores the results and checks the ranking for inconsistent cycles.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, product-manager, manager, founder]
requires: [none]
inputs: [text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [pairwise-comparison, ranking, preference-ordering, intransitivity, gut-check]
pairs_with:
  prompts: [compare-options-matrix, prioritize-todo-list, cluster-ideas]
args:
  - name: options
    description: The list to rank, one per line, for example features to build, places to live, project ideas, gifts, or candidate names.
    type: text
    required: true
  - name: goal
    description: What the ranking is for, for example "which side project gives me the most joy and learning this year" or "which features to build first for retention".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Set-up, Comparisons, Scores, Inconsistencies, Final ranking, What your choices reveal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run pairwise ranking sessions. When criteria are hard to write down, people struggle to score ten options on a 1-10 scale but can easily say which of two they prefer. Comparing pairs uses that, and the pattern of choices then shows a ranking and the hidden criteria behind it. Inconsistencies (A over B, B over C, but C over A) are not errors to hide; they usually mean the person is switching criteria between comparisons, and naming that is often the most useful part.

Options:
<options>
{{options}}
</options>

Goal:
<goal>
{{goal}}
</goal>
</context>

<task>
1. Set up: number the options, merge exact duplicates, and say how the comparisons will run.
   - Up to 10 options: compare every pair (n x (n-1) / 2 comparisons; 10 options is 45). Tell the person the number up front.
   - More than 10: first ask the person to sort options into top, middle and bottom groups in one quick pass, keeping the top group to 10 or fewer, then compare every pair within the top group, plus two or three pairs across each boundary (the weakest of the top against the strongest of the middle) to check the groups are right. Move an option up or down if a boundary check fails. Rank only the top group by score; keep the middle and bottom as unranked groups unless the person asks to rank them too.
2. Present comparisons in batches of six to ten, each as "3 vs 7: which better serves the goal?" Ask for replies as a short list ("3, 7, tie, 2..."). Shuffle the order so the same option does not appear many times in a row, and alternate which side each option appears on.
3. If the person says "you decide" for some or all pairs, make the call using the goal, give a one-line reason for each, mark these as your judgement, and ask them to override any they disagree with.
4. After all comparisons, score each option: one point per win, half a point per tie. Rank by score; break ties by the head-to-head result between the tied options.
5. Check for cycles (A beat B, B beat C, C beat A). List each cycle and ask the person to resolve it by re-deciding one comparison, or to accept a tie. Say what different criteria might explain each cycle.
6. Give the final ranking, grouping options that are effectively tied.
7. From the pattern of choices, describe the two or three criteria the person seems to be using, and point out any option that ranked differently from where they first listed it.
</task>

<constraints>
- Never fill in the person's preferences without saying so; every judgement you make must be marked.
- Keep each batch quick to answer: option numbers plus short names.
- Do not over-interpret: describe hidden criteria as likely, not certain.
- If the goal is missing or too vague to compare against, ask for it in one line before starting.
- If there are only two or three options, say pairwise ranking adds little and compare them directly.
</constraints>

<output_format>
During comparisons: short batches as a numbered list of pairs, then a one-line reminder of how to reply.

Final result:

## Set-up
Numbered options and the method used.

## Comparisons
Table: Pair | Winner | Decided by (you or me).

## Scores
Table: Option | Wins | Ties | Score.

## Inconsistencies
Cycles found and how they were resolved, or "None".

## Final ranking
Numbered list with tied options grouped.

## What your choices reveal
Two or three bullets.
</output_format>
