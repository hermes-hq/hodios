---
schema: 1
id: run-mind-map-brainstorm
kind: prompt
title: Run a mind map brainstorm
description: Grows a radiant mind map from one central challenge by free association, then hunts for links between distant branches as the source of fresh ideas. Returns a Mermaid mindmap.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, student, teacher, writer]
requires: [none]
inputs: [topic, text]
output: [ideas, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [mind-mapping, radiant-thinking, free-association, divergent-thinking, ideation-technique]
pairs_with:
  prompts: [cluster-ideas, run-lotus-blossom, brainstorm-ideas]
args:
  - name: centre
    description: The challenge, question or topic at the centre of the map, with any constraints. For example "a school fundraiser that is not another bake sale, under 200 in costs".
    type: text
    required: true
  - name: starting_branches
    description: Optional - words or directions you already associate with the topic, to seed the first branches.
    type: text
output_contract:
  format: markdown
  sections: [Centre, Mind map, Cross-links, Ideas from the map, Grow next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mind map for brainstorming is different from a concept map or a study outline. It radiates out from one centre by free association: each node holds one word or a short phrase, each branch follows wherever the previous word leads, and nothing is judged or ordered while the map grows. One keyword per node matters, because a single word opens more associations than a sentence, which closes the thought. The ideas do not sit on the branches themselves. They come from the second pass: spotting a word on one branch that connects to a word on a far-away branch, and asking what the two together suggest. Novice maps fail in three ways: the first-level branches are just a category list (who, what, when) so the map turns into a planning outline; branches stay two levels shallow, so only obvious associations appear; and the map is admired but never mined for ideas.

<centre>
{{centre}}
</centre>
{{#starting_branches}}
Words the user already associates with it:
<starting_branches>
{{starting_branches}}
</starting_branches>
{{/starting_branches}}
</context>

<task>
1. Write the centre as two to six words that capture the challenge. If the centre is too vague to associate from (for example "life" or "stuff"), ask up to two questions and stop.
2. Grow five to seven main branches{{#starting_branches}}, starting with the user's words{{/starting_branches}}. Make them associative angles (a feeling, a place, an object, a sense, an opposite, a memory, a rule), not a who/what/when/where checklist. At least one branch should be an odd or playful association. If the user asks for checklist branches (who, what, when, budget), say in one line that this produces a planning outline rather than new ideas, keep at most one of them, and use associative branches for the rest.
3. Extend each main branch at least three levels deep, one word or short phrase per node, following the chain of association rather than staying on topic. Let some branches wander far from the centre; that distance is where unusual ideas come from.
4. Mine the map for cross-links: find at least five pairs of nodes on different main branches, preferably far apart, and for each pair write what the combination suggests in one line.
5. Turn the cross-links and any standout single nodes into eight to twelve concrete ideas for the centre challenge, each traced back to the nodes it came from, and checked against the stated constraints.
6. Name the one or two nodes rich enough to become the centre of a second map, and why.
</task>

<constraints>
- One word or short phrase per node in the map; no sentences inside the diagram.
- Keep the Mermaid valid: a single `mindmap` block, consistent two-space indentation, no parentheses, brackets or quotes inside node text other than the root shape.
- No invented facts about the user's organisation, local rules, prices or people; label any assumption.
- Every idea must trace back to named nodes; do not add ideas that ignore the map.
- Respect stated constraints; mark any idea that stretches them as a stretch.
</constraints>

<output_format>
## Centre
The short centre phrase, and the full challenge in one sentence.

## Mind map
A Mermaid `mindmap` code block with the root as `root((centre phrase))`, five to seven main branches, each at least three levels deep. Below it, the same map as an indented bullet outline for tools that do not render Mermaid.

## Cross-links
Table: Node A (branch) | Node B (branch) | What the pair suggests.

## Ideas from the map
Numbered list: idea in one or two lines, then "From:" the nodes it came from. Mark stretches.

## Grow next
One or two nodes to put at the centre of a new map, with a reason each.
</output_format>
