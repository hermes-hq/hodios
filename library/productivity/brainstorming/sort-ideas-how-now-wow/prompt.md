---
schema: 1
id: sort-ideas-how-now-wow
kind: prompt
title: Sort ideas with a How-Now-Wow matrix
description: Places each idea on a How-Now-Wow matrix by originality and ease of doing it now, so a group keeps a few bold Wow ideas alongside quick Now wins instead of only picking the familiar.
category: brainstorming
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, product-manager, teacher, founder]
requires: [none]
inputs: [notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [how-now-wow, idea-selection, convergence, prioritisation-matrix]
pairs_with:
  prompts: [cluster-ideas, develop-idea-with-ppco, facilitate-group-brainstorm]
args:
  - name: ideas
    description: The list of ideas from a brainstorm, one per line.
    type: text
    required: true
  - name: context
    description: The goal the ideas serve and the constraints that decide what is easy - budget, people, time, approvals, what has been tried.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Criteria, Matrix, Pick, What to do with the rest]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a brainstorm, groups tend to pick the familiar, easy ideas, and the original ones quietly disappear. The How-Now-Wow matrix (associated with Gamestorming and earlier creativity facilitation) prevents that by sorting on two axes: originality (familiar to new) and ease of implementation (hard to easy). "Now" ideas are familiar and easy: quick wins. "How" ideas are original but hard today: worth keeping for the future or a research step. "Wow" ideas are original and easy: rare, and the most valuable. Familiar and hard ideas are usually dropped. The judgement is only as good as the criteria, so originality is judged against what this group or organisation already does, and ease against its stated constraints.

<ideas>
{{ideas}}
</ideas>
<context_details>
{{context}}
</context_details>
</context>

<task>
1. Define the two criteria in this context: what counts as original here (new to this group, not new to the world) and what makes an idea easy (cost, people, time, approvals within the stated constraints). If there are fewer than five ideas or no goal is stated, ask for them and stop.
2. Merge duplicates and place every idea in a quadrant: Now, How, Wow or Drop. Give a one-line reason for each placement.
3. Challenge the placements: for each How idea, ask whether a smaller or cheaper version would move it to Wow; for each Now idea, ask whether a twist would make it more original. Note any that move.
4. Pick a balanced set to act on: one or two Wow ideas, two or three Now ideas, and one How idea to explore with a research step.
5. Say what to do with the rest: park the How list with a revisit date, record dropped ideas and why.
</task>

<constraints>
- Place every idea; do not drop any without a reason.
- Judge ease only against the user's stated constraints; label assumptions.
- Do not invent costs or timelines; use relative judgements unless the user gave numbers.
- Keep reasons to one line.
</constraints>

<output_format>
## Criteria
Two short definitions.

## Matrix
Four sub-headings (Wow, Now, How, Drop) each with ideas and one-line reasons; then a note on ideas moved by the challenge step.

## Pick
Numbered list with quadrant and next step.

## What to do with the rest
Two or three bullets.
</output_format>
