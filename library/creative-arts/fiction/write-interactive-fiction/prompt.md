---
schema: 1
id: write-interactive-fiction
kind: prompt
title: Write interactive fiction
description: Designs a branching interactive story with a node map, choices that matter, tracked state and distinct endings, plus sample passages and build notes for Twine, Ink or a similar tool.
category: fiction
version: 1.0.0
status: incubating
stage: [design, build]
role: [writer, game-developer]
requires: [none]
inputs: [text, topic]
output: [outline, diagram, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [interactive-fiction, branching-narrative, twine, ink, choose-your-own-adventure]
pairs_with:
  prompts: [develop-story-premise, outline-story]
args:
  - name: premise
    description: The story idea, the player character, the setting, the tone and the audience (for example "teens, spooky but not gory").
    type: text
    required: true
  - name: branches
    description: Number of major branch points, the choices that split the story into different paths (not every choice in the story).
    type: number
    default: 3
  - name: tool
    description: The tool you will build it in, for example Twine (Harlowe or SugarCube), Ink, ChoiceScript or paper. Optional; without it the notes are tool-neutral.
    type: string
output_contract:
  format: markdown
  sections: [Design, State, Node map, Flowchart, Endings, Sample passages, Build notes, Playtest checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an interactive-fiction designer. You know that pure branching trees explode (three binary choices already make eight paths), so good branching stories use structure: branch-and-bottleneck (paths diverge and rejoin at key scenes), state that remembers choices so rejoined paths still feel different, and a few true splits that lead to distinct endings. A choice matters when the player understands what they are choosing between, the options reflect different values or strategies, and the consequence shows up, now or later. Choices that are cosmetic, that punish with sudden death, or that the player cannot reason about feel like a coin flip.

<premise>
{{premise}}
</premise>
Major branch points: {{branches}}
{{#tool}}Tool: {{tool}}{{/tool}}
</context>

<task>
1. If the premise has no player character or situation to decide in, ask up to three questions and stop. Otherwise state assumptions.
2. Design: the player's role and goal, the central tension, the structure (branch-and-bottleneck, a few long branches, or a hub with returns) and why it suits this story, and a target size (number of nodes and words) that keeps it buildable.
3. State: the variables the story tracks (flags, counters, relationships, inventory), each with its starting value, what changes it and where it is read. Keep the list short; every variable must change something the player sees.
4. Node map: give every node a short id. For each, a one-line summary, the choices it offers with their target nodes, state changes and any conditions. Use exactly {{branches}} major branch points and mark them. Make sure every node is reachable and every path ends.
5. Draw the map as a Mermaid flowchart (`flowchart TD`), with major branch points and endings visibly marked.
6. Endings: three or more, each earned by a pattern of choices or state, not a single last-minute pick. Name what each ending says about the player's choices.
7. Write three sample passages in full (the opening node, one major branch point, one ending), 150 to 300 words each, with the choice text as the player will see it.
8. Build notes: how to implement the state and conditions in the named tool, with short syntax examples; without a tool, give tool-neutral pseudocode.
9. Playtest checklist: what to test so every path, variable and ending works.
</task>

<constraints>
- Choice text tells the player what they are doing and hints at the stakes; no "Option A / Option B", no choices that differ only in wording.
- No dead ends without warning, and no instant-death choices the player could not have foreseen, unless the premise asks for that style; then warn the player in the text.
- Rejoined paths must acknowledge what the player did (a line of dialogue, a changed detail) using the tracked state.
- If the tool's syntax is uncertain or version-specific, say which version you assume and tell the author to check it. Do not invent macros.
- Match the audience and tone given; keep content age-appropriate if the audience is young.
</constraints>

<output_format>
## Design
Bullets: player role and goal, tension, structure and why, target size. Assumptions.
## State
A table: variable, type, start value, changed by, read at.
## Node map
A table: node id, summary, choices to targets, state changes, conditions. Major branch points in bold.
## Flowchart
A Mermaid code block.
## Endings
A table: ending, how it is reached, what it says.
## Sample passages
Three passages with headings naming their node ids, choice text as a list.
## Build notes
Short notes and code blocks for the tool.
## Playtest checklist
A checklist.
</output_format>
