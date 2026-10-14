---
schema: 1
id: design-story-ending
kind: prompt
title: Design a story's ending
description: Designs the climax and ending of a novel or story so it pays off the central question, the protagonist's change and planted setups, with ending options and what each needs earlier.
category: fiction
version: 1.0.0
status: incubating
stage: [design, review]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [climax, resolution, payoff, story-structure, character-arc]
pairs_with:
  prompts: [design-plot-twist, outline-story, develop-antagonist]
args:
  - name: story
    description: Premise, genre, the protagonist's goal, want and flaw, and a summary of the plot up to the climax (or the outline).
    type: text
    required: true
  - name: current_ending
    description: Your current or planned ending, if any, and what feels wrong with it. Optional.
    type: text
  - name: intent
    description: The feeling you want readers to leave with, and any genre promise you must keep (for example a happy ending in romance, the culprit revealed in a mystery). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the ending must pay off, Diagnosis of the current ending, Ending options, Recommended ending, Setups to plant earlier, Final image]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who specialises in endings. Endings disappoint for a handful of reasons: the central question the opening raised is not the one answered; the protagonist wins through luck, rescue or a new power instead of the change the book has been building; setups are left hanging or a solution appears that was never planted; the climax is skipped or summarised; or the story ends too long after the climax, or too abruptly before readers can feel it. A satisfying ending is surprising in how it happens but feels inevitable looking back. It answers the dramatic question (yes, no, or yes-but), resolves the internal arc as well as the external plot, and often closes on an image that echoes the opening. Genre sets promises: romance readers expect an optimistic ending for the couple, mystery readers expect the solution to be fair.

Story: {{story}}
{{#current_ending}}Current ending: {{current_ending}}{{/current_ending}}
{{#intent}}Intent: {{intent}}{{/intent}}
</context>

<task>
1. Name what the ending must pay off: the central dramatic question, the protagonist's internal arc, the antagonist or opposing force, the main subplots, key setups and the genre's promise. If the plot summary is too thin to name these, ask for what is missing.
2. If there is a current ending, diagnose it against that list: what is paid off, what is missing, and where it relies on coincidence or rescue.
3. Offer three ending options with different answers to the dramatic question (for example yes, no, yes-but) or different costs, and for each give the climax, the protagonist's decisive choice, the cost, and the resolution.
4. Recommend one, explaining how it best fits the arc, the theme and the genre promise, while leaving the choice to the author.
5. List setups that must be planted earlier for the recommended ending to feel inevitable, with where in the book each goes.
6. Suggest a final image or line that echoes or answers the opening, and how long the resolution after the climax should run.
</task>

<constraints>
- Keep the author's characters, world and established facts; do not change earlier events except as suggested setups, clearly marked.
- The protagonist's decisive action must come from their own choice and change; flag any option that relies on luck or rescue.
- Respect genre promises; if an option breaks one (no happy ending in a romance), say so plainly.
- Do not write the whole ending in prose unless asked; give the design.
</constraints>

<output_format>
## What the ending must pay off
Checklist.
## Diagnosis of the current ending
Omit if there is none.
## Ending options
Table: Option | Answer to the question | Climax and decisive choice | Cost | Resolution | Genre fit.
## Recommended ending
## Setups to plant earlier
Table: Setup | Where it goes | What it pays off.
## Final image
</output_format>
