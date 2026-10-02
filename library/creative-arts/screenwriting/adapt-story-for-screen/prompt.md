---
schema: 1
id: adapt-story-for-screen
kind: prompt
title: Adapt a story for the screen
description: Plans a screen adaptation of a story, book or real event, deciding what to keep, cut and externalise, the new structure and a sample scene, with a rights check. Use before adapting source material.
category: screenwriting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer]
requires: [none]
inputs: [text, document]
output: [plan, outline, script]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [adaptation, externalisation, story-structure, rights-check]
pairs_with:
  prompts: [write-beat-sheet, write-film-treatment, format-screenplay-scene]
  personas: [script-consultant]
args:
  - name: source
    description: The source material (a short story's text, a detailed summary of a book, or an account of a real event), plus what draws you to it and what must survive the adaptation. Say who owns the rights if you know.
    type: text
    required: true
  - name: format
    description: The target format, e.g. "feature film", "short film", "limited series of 6 one-hour episodes", "stage play", "half-hour series".
    type: string
    default: feature film
output_contract:
  format: markdown
  sections: [The core, Keep cut combine, Externalise, New structure, Sample scene, Risks and rights]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adaptation is translation, not transcription. Prose can live inside a character's head, roam across decades and hold dozens of characters; the screen shows only what can be seen and heard, in a fixed running time. Faithful adaptations keep the source's emotional core and its central question, then rebuild the structure for the new form: they cut and combine characters and subplots, compress time, invent scenes that dramatise what the prose only describes, and turn interior experience into behaviour, choices, objects, images and subtext. Real events add a second constraint: the drama must be built from what happened without misrepresenting real people, and the rights to a book, an article or a life story usually need securing before the adaptation can be sold.
</context>

<task>
Plan an adaptation of this source as a {{format}}.

<source>
{{source}}
</source>

1. If the source is too thin to adapt (no clear protagonist, sequence of events or ending), ask for what is missing (at most three questions) and stop. If you have only a summary of a long work, say so and plan from it.
2. **The core:** in a short paragraph, what the story is really about (its central question and emotional arc), whose story the adaptation tells, and why it suits {{format}}. If the source suits a different format better (for example a sprawling novel as a feature), say so with a reason.
3. **Keep, cut, combine:** a table of characters, subplots and key events, each marked keep, cut, combine (with what), compress or move, with a one-line reason tied to the core.
4. **Externalise:** for the three to six most important interior elements (thoughts, memories, narration, the narrator's irony, a character's secret), say how the screen will carry each: an action or choice, a visual motif or object, a new scene, a confidant character, dialogue with subtext, a structural device such as a flashback or a time jump, or limited voice-over. Prefer behaviour over voice-over and say what each option costs.
5. **New structure:** an outline in the target format: for a feature, act by act with the inciting incident, midpoint, crisis and climax; for a series, episode by episode with each episode's question and the season arc; for a stage play, scenes and locations within a stage's limits. Mark invented scenes "(new)".
6. **Sample scene:** write one key scene that shows the adaptation approach (ideally an externalised moment), in standard screenplay format (scene heading, action lines, character names, dialogue), one to three pages. Write original dialogue; do not lift long passages from the source.
7. **Risks and rights:** the main creative risks (what fans or readers will miss, what might feel thin), and a rights note: whether the source appears to be in copyright and whose permission is typically needed (author or publisher for a book; the publication for an article; life-rights or depiction considerations for real living people). State that this is general information, not legal advice, and recommend an entertainment lawyer before pitching or selling.
</task>

<constraints>
- Keep the source's core and its ending unless there is a strong reason to change it; if you recommend a change, flag it and explain.
- For real events: do not invent wrongdoing, crimes or private facts about real, identifiable people and present them as true. Mark invented or composite material, and suggest fictionalising names where portrayals could be damaging.
- Do not reproduce long passages of copyrighted source text; a short quoted line is acceptable when discussing what to keep.
- Never claim a work is in the public domain unless you are confident; when unsure, say "verify the copyright status".
</constraints>

<output_format>
## The core
## Keep cut combine
Table: Element | Decision | Reason.
## Externalise
## New structure
## Sample scene
Screenplay format in a code block.
## Risks and rights
</output_format>
