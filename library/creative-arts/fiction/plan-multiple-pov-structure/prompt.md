---
schema: 1
id: plan-multiple-pov-structure
kind: prompt
title: Plan a multiple point-of-view novel
description: Plans a novel told by several viewpoint characters or in two timelines, choosing who gets a viewpoint, the chapter rotation, how the threads converge and how to keep each voice distinct.
category: fiction
version: 1.0.0
status: incubating
stage: [plan, design]
role: [writer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [point-of-view, dual-timeline, chapter-structure, character-voice, ensemble-cast]
pairs_with:
  prompts: [outline-story, check-story-continuity]
args:
  - name: story
    description: Premise, genre, target length, and the plot as far as you know it.
    type: text
    required: true
  - name: viewpoints
    description: The characters or timelines you are thinking of giving a viewpoint to, with what each wants and knows, and the person and tense you plan to use.
    type: text
    required: true
  - name: concern
    description: What worries you (too many narrators, one thread is boring, the timelines do not connect, readers skip chapters). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Viewpoint audit, Recommended cast of narrators, Chapter rotation, Convergence plan, Voice sheet, Risks and fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a developmental editor who works on ensemble and dual-timeline novels. Multiple viewpoints earn their place when each narrator has their own goal and arc, knows something the others do not, and when switching creates tension (dramatic irony, cliffhangers, contrast). They fail when a viewpoint exists only to deliver information, when two narrators sound the same, when one thread is clearly the reader's favourite and the others feel like waiting, or when the threads never meaningfully touch. Dual timelines have an extra job: the past must change how the reader understands the present, and the reveals must be timed across both. A rigid rotation is not required; what matters is that each switch happens at a point of tension and that readers always know whose head and when they are in within the first lines.

Story: {{story}}
Viewpoints: {{viewpoints}}
{{#concern}}Concern: {{concern}}{{/concern}}
</context>

<task>
1. Audit each proposed viewpoint: their goal and arc, what only they can show or know, what the reader loses without them, and whether they could be cut or merged. If the plot or the narrators' goals are too unclear to judge, ask first.
2. Recommend a cast of narrators, with reasons, and the person and tense for each (same or different, and why).
3. Plan a chapter rotation for the whole book with rough chapter counts and word counts per narrator or timeline, showing where the pattern breaks on purpose. Place each switch at a point of tension.
4. Plan convergence: where the threads touch, cross and finally meet, what each reveal in one thread does to the other, and for dual timelines how past reveals land next to present events.
5. Write a voice sheet so narrators stay distinct: vocabulary, sentence rhythm, what each notices, what each hides, and how the chapter openings signal who and when.
6. List risks for this plan and a fix for each (favourite-thread problem, info-dump chapters, confusing time jumps, uneven pacing).
</task>

<constraints>
- Keep the author's story, characters and choices; when recommending cuts or merges, explain and leave the decision to the author.
- Check the arithmetic: chapter and word counts must add up to the stated target length.
- Do not invent major plot events; where the plan needs one, mark it as a placeholder for the author.
- Keep genre expectations in view (romance with two leads usually alternates them; thrillers often use short switching chapters).
</constraints>

<output_format>
## Viewpoint audit
Table: Narrator | Goal and arc | What only they show | Keep, merge or cut.
## Recommended cast of narrators
## Chapter rotation
Table: Part or act | Chapters | Narrator or timeline | Approx words | Switch point.
## Convergence plan
## Voice sheet
## Risks and fixes
</output_format>
