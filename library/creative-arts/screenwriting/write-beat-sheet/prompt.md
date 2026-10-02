---
schema: 1
id: write-beat-sheet
kind: prompt
title: Write a beat sheet
description: Builds a beat sheet for a feature, TV episode or short in Save the Cat or another structure, with each beat's scene, purpose and page target. Use when outlining a script.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [beat-sheet, save-the-cat, story-structure, page-count]
pairs_with:
  prompts: [write-logline-and-synopsis, write-film-treatment, format-screenplay-scene, design-plot-twist]
  personas: [script-consultant]
args:
  - name: premise
    description: The story, with the protagonist, what they want, the inciting incident, the opposition, the stakes and the ending if you know it. For TV, include the series premise and where this episode sits.
    type: text
    required: true
  - name: format
    description: "feature: about 90 to 120 pages. tv-episode: a half-hour or one-hour episode (say which in the premise). short: a short film of about 5 to 15 pages."
    type: enum
    enum: [feature, tv-episode, short]
    default: feature
  - name: structure
    description: The beat model, e.g. "Save the Cat", "three-act", "sequence approach (eight sequences)", "TV act structure", or auto to choose the best fit for the format.
    type: string
    default: auto
output_contract:
  format: markdown
  sections: [Story spine, Beat sheet, Storylines, Structure checks, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A beat sheet is the cheapest place to fix a script. It shows whether the protagonist drives the story, whether each turning point changes the direction of the action, whether the stakes rise, and whether the pages are spent in the right places. Structure models (Save the Cat's 15 beats, the three-act paradigm, the eight-sequence approach, TV act breaks) are tools for checking the shape, not formulas to fill; a beat sheet that names the beats but not the specific scene that delivers each one is useless. Page targets matter because one page of a properly formatted screenplay runs about a minute on screen.
</context>

<task>
Build a beat sheet for this {{format}}. Structure: {{structure}}.

<premise>
{{premise}}
</premise>

1. **Story spine:** a one-sentence logline, the protagonist's external goal, their internal need or flaw, the antagonist or opposing force, the stakes, the theme as a question, and the ending (how the central question is answered). If the premise lacks a protagonist, a goal or an opposing force, ask for them (at most three questions) and stop. If only the ending is missing, propose one or two possible endings, mark them as proposals, and build on the one you recommend.
2. **Choose the structure:** if {{structure}} is auto, use Save the Cat for a feature; for a tv-episode, a teaser or cold open plus four or five acts for a one-hour drama, or a cold open plus two or three acts and a tag for a half-hour; for a short, setup, inciting incident, escalation, climax and resolution. Say which you used and why in one line.
3. **Page targets:** scale the beats to the format. For a 110-page feature in Save the Cat, use approximately: opening image 1, theme stated 5, setup 1 to 10, catalyst 12, debate 12 to 25, break into two 25, B story 30, fun and games 30 to 55, midpoint 55, bad guys close in 55 to 75, all is lost 75, dark night of the soul 75 to 85, break into three 85, finale 85 to 110, final image 110. Scale proportionally for other lengths; for TV, give page ranges per act with the act-out at the end of each; for a short, keep the inciting incident within the first page or two.
4. **Beat sheet:** for every beat, give the page target, the specific scene or sequence that delivers it (who, where, what happens), and what changes by the end of it (the value shift or new information that pushes the protagonist into the next beat). Each beat must cause the next ("therefore" or "but", not "and then").
5. **Storylines:** the A story and the B story (and C for TV) in one or two lines each, with the beats where they intersect, and how the B story carries the theme.
6. **Structure checks:** confirm or flag: the protagonist makes the key choices at the break into two, the midpoint and the climax; the midpoint changes the game (a false victory or false defeat, raised stakes, a new goal); the all-is-lost moment is the lowest point and costs something real; the climax is won by the protagonist using what they learned; for TV, each act ends on a question or reversal and, for a pilot, the series engine is clear.
7. **Questions:** up to three decisions the writer should make before drafting.
</task>

<constraints>
- Keep the writer's premise, characters and ending. Where a beat needs invented material, keep it minimal and mark it "(proposed)".
- Use specific scenes, not abstractions ("she loses her job" rather than "things get worse").
- Do not write dialogue or screenplay pages.
- Treat page targets as guides, not rules, and say so where the story's needs differ.
</constraints>

<output_format>
## Story spine
## Beat sheet
Table: Beat | Pages | Scene | What changes.
## Storylines
## Structure checks
A short list, each marked OK or Flag with a reason.
## Questions
</output_format>
