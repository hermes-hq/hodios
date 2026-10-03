---
schema: 1
id: run-morphological-analysis
kind: prompt
title: Run a morphological analysis
description: Builds a morphological box of a problem's dimensions and options, rules out inconsistent pairs, then generates and screens unusual combinations into a shortlist worth testing.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, design]
role: [individual, product-manager, designer, founder]
requires: [none]
inputs: [text, topic]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [morphological-analysis, zwicky-box, combinatorial-ideas, concept-generation, option-space]
pairs_with:
  prompts: [solve-contradiction-with-triz, cluster-ideas, compare-options-matrix, brainstorm-ideas]
args:
  - name: problem
    description: What you are trying to invent or design, with the goal and any hard constraints, for example "A weekend event format for our 300-person community, budget 5k, must work for families".
    type: text
    required: true
  - name: dimensions
    description: 'The independent aspects of a solution you already see, with options if you have them, for example "Venue: park, library, online; Duration: 2 h, half day; Who leads: staff, members". Optional; dimensions are proposed if missing.'
    type: text
output_contract:
  format: markdown
  sections: [Dimensions, Morphological box, Inconsistent pairs, Combinations, Shortlist, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a concept designer who uses morphological analysis (the Zwicky box) to escape the first idea everyone converges on. The method splits a solution into independent dimensions, lists several options for each, and treats every combination of one option per dimension as a candidate concept. The value comes from combinations nobody would have thought of directly. Its risks are dimensions that overlap, options that are all variations of the obvious, and a box so large nobody can read it, so you keep it disciplined.

Problem:
<problem>
{{problem}}
</problem>
{{#dimensions}}

Dimensions suggested by the user:
<dimensions>
{{dimensions}}
</dimensions>
{{/dimensions}}
</context>

<task>
1. Define four to seven dimensions: aspects every solution must decide on, independent of each other (changing one does not force another). Use the user's dimensions first; merge any that overlap and add missing ones, saying what you changed.
2. List three to six options per dimension. For each dimension include at least one option that is unusual or borrowed from another field, not just variations of the current way.
3. Show the box and state how many total combinations it contains.
4. Cross-consistency check: list the pairs of options that cannot go together (logically impossible, against a hard constraint, or clearly unworkable), with a short reason. Treat these as excluded.
5. Generate combinations:
   - The status quo or most obvious combination, as a reference point.
   - Three to four combinations that change just one or two dimensions from the obvious one.
   - Four to six bold combinations that change most dimensions, chosen to be different from each other.
   - Two combinations picked by forcing the least-used options in the box together.
   Skip any that hit an excluded pair. Give each a short, memorable name and a two-sentence description of what it would be like in practice.
6. Screen the combinations against the goal and hard constraints with a quick score for appeal, feasibility and novelty (1-5 each), and shortlist the best three to five.
7. For each shortlisted concept, name the biggest uncertainty and a cheap way to test it.
</task>

<constraints>
- Dimensions must be independent and each must apply to every solution; flag and fix ones that are really options of another dimension.
- Keep the box readable: no more than seven dimensions and six options each.
- Describe concepts concretely enough that someone could picture or sketch them.
- Scores are judgements, not measurements; say so once.
- If the problem is too vague to identify dimensions (no goal or context), ask up to three questions before building the box.
</constraints>

<output_format>
## Dimensions
Numbered: dimension and one line on why it is independent. Note any changes to the user's dimensions.

## Morphological box
Table: one row per dimension, options in columns. Then the total number of combinations.

## Inconsistent pairs
Table: Option A | Option B | Why excluded.

## Combinations
Table: Name | Options chosen | Type (reference, small shift, bold, forced) | What it is like.

## Shortlist
Table: Name | Appeal | Feasibility | Novelty | Why shortlisted.

## Next steps
Numbered: concept, biggest uncertainty, cheap test.
</output_format>
