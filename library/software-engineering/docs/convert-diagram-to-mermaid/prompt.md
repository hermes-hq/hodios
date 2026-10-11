---
schema: 1
id: convert-diagram-to-mermaid
kind: prompt
title: Convert a diagram image to Mermaid
description: Turns a whiteboard photo, screenshot or exported diagram into editable Mermaid or PlantUML of the right diagram type, listing every label or arrow it could not read instead of guessing.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, architect, technical-writer]
stack: []
requires: [none]
inputs: [image, file, text]
output: [diagram]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [mermaid, plantuml, diagrams-as-code, whiteboard-photo]
pairs_with:
  prompts: [write-c4-diagram, write-sequence-diagram, draw-database-er-diagram]
args:
  - name: target
    description: The diagram language to produce.
    type: enum
    enum: [mermaid, plantuml]
    default: mermaid
  - name: context_notes
    description: What the diagram is about, its legend, or names that are hard to read in the image.
    type: text
output_contract:
  format: markdown
  sections: [What I read, Diagram code, Uncertain items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Diagrams kept as images go stale because nobody can edit them; diagrams as code live next to the docs, render on GitHub and change in pull requests. Converting one well means choosing the diagram type from what it means, not what it looks like. Boxes with arrows between services in time order are a sequence diagram. Boxes with crow's feet are an ER diagram. Rounded states with event labels are a state diagram. Nested system boundaries are closer to C4. Whiteboard photos have ambiguous arrow directions, crossed-out parts and half-legible labels, and a silent guess turns into a wrong diagram that looks authoritative. Mermaid also has traps: labels with parentheses or special characters must be quoted, the word `end` breaks flowcharts, and ids must not contain spaces.
</context>

<task>
Convert the attached diagram to {{target}}.
{{#context_notes}}
Context: {{context_notes}}
{{/context_notes}}

1. Before writing code, list what you see: every element with its label, every connection with direction and label, groupings or boundaries, colours or line styles that seem to carry meaning, and anything crossed out.
2. Mark each label or arrow you cannot read with certainty, with your best reading and how sure you are.
3. Choose the diagram type that matches the meaning (flowchart, sequence, class, ER, state or C4-style) and say why in one sentence.
4. Write the code: short stable ids, readable labels in quotes where needed, groupings as subgraphs or boundaries, and a layout direction that matches the original. Leave out crossed-out parts and say so.
5. If colours or line styles carried meaning, keep it with a class or style and a short legend comment.
</task>

<constraints>
- Do not add elements, connections or labels that are not in the image or the notes. Mark guesses with `?` in the label and list them.
- Do not correct the diagram's content, even if it looks wrong; mention it under uncertain items instead.
- The code must be valid for the chosen language and render without changes.
{{> output/uncertainty}}
</constraints>

<output_format>
## What I read
The element and connection inventory, short.
## Diagram code
One code block in {{target}}.
## Uncertain items
Table: item, best reading, confidence, what to check. Or "None".
</output_format>
