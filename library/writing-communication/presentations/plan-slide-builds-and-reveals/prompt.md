---
schema: 1
id: plan-slide-builds-and-reveals
kind: prompt
title: Plan slide builds and reveals
description: Plans where a deck should reveal content step by step, such as bullets one at a time, chart series in order or a diagram built up, and where builds only slow the talk down.
category: presentations
version: 1.0.0
status: incubating
stage: [design]
role: [manager, consultant, teacher, researcher]
requires: [none]
inputs: [document, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [animation, progressive-disclosure, slide-design, pacing, live-presenting]
pairs_with:
  prompts: [plan-slide-visuals, write-speaker-notes, critique-slide-deck]
  personas: [presentation-designer]
args:
  - name: deck
    description: The slides in order, with what is on each one (bullets, chart, diagram, image) and what you say over it.
    type: text
    required: true
  - name: delivery
    description: How the deck will be used.
    type: enum
    enum: [live-in-room, live-online, recorded, sent-as-file]
    default: live-in-room
output_contract:
  format: markdown
  sections: [Build plan, Click script, Slides to leave static, Fallbacks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan builds (step-by-step reveals) for slides. Builds help when the order of ideas matters: they stop the audience reading ahead, focus attention on the item being discussed, and let a complex chart or diagram be explained one layer at a time (axes, then baseline, then the line that matters). They hurt when used for decoration, when every bullet flies in, or when the presenter loses track of how many clicks remain. Simple appear and fade are almost always enough; motion paths and spins distract. A deck sent as a file or exported to PDF loses builds, so the final state of each slide must make sense on its own, and some online tools drop or delay animations. A common alternative is to duplicate a slide and change one element per copy, which survives any export.

<deck>
{{deck}}
</deck>

Delivery: {{delivery}}
</context>

<task>
1. For each slide, decide: static, or build. Use a build only where the spoken explanation follows an order or where showing everything at once would give away a punchline or overwhelm.
2. For each build, specify the steps in order: what appears or fades at each click, and the effect (appear or fade, or duplicate-slide sequence). For charts, plan the layers: frame and axes, comparison baseline, highlight.
3. Write a click script: for each built slide, the words the presenter says before each click, so the clicks match the speech.
4. Check the final state of every built slide reads correctly on its own for handouts or PDF export.
5. Adapt to {{delivery}}: for sent-as-file, recommend no builds and say how to sequence with duplicate slides instead if order matters; for live-online and recorded, prefer duplicate-slide sequences that survive screen sharing and export.
6. Give a fallback for any build that depends on software features, and a click-count note per slide so the presenter knows when the slide is finished.
</task>

<constraints>
- No decorative motion: no spins, bounces, flying text or sound effects.
- Do not change the slide content; plan only the order of reveal, unless a slide needs splitting, which you may recommend.
- Keep instructions tool-neutral (appear, fade, duplicate slide) rather than relying on one product's menu names.
</constraints>

<output_format>
## Build plan
Table: Slide | Static or build | Steps in order | Effect | Clicks.

## Click script
For each built slide: "[before click 1] words... [click] ...".

## Slides to leave static
List with a one-line reason each.

## Fallbacks
Bullets for export, screen sharing and a dead clicker.
</output_format>
