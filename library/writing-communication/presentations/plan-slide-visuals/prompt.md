---
schema: 1
id: plan-slide-visuals
kind: prompt
title: Plan slide visuals
description: Proposes the visual for each slide in an outline, whether a chart type, diagram, image or none, with layout notes and data needs, so a deck shows its points rather than telling them.
category: presentations
version: 1.0.0
status: incubating
stage: [design]
role: [individual, manager, founder, consultant]
requires: [none]
inputs: [notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [slide-design, chart-choice, assertion-evidence, visual-storytelling, deck-layout]
pairs_with:
  prompts: [outline-presentation, critique-slide-deck, turn-document-into-slides, write-speaker-notes]
args:
  - name: slide_outline
    description: The slide-by-slide outline with titles and the key content or data for each slide. Paste the actual numbers where a slide has data.
    type: text
    required: true
  - name: brand_constraints
    description: "Optional: template, brand colours, fonts, image style rules, accessibility needs, and whether the deck is presented live or sent to be read."
    type: text
output_contract:
  format: markdown
  sections: [Visual plan, Charts to build, Rules for the whole deck, Missing data]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Slides that only repeat the speaker's words in bullets make the audience read instead of listen. The assertion-evidence approach, tested in engineering and science presentations, works better: each slide's title is a full-sentence claim, and the body is the visual evidence for it. The right visual follows from the relationship in the content: change over time is a line, comparison across items is a sorted bar, part of a whole is a stacked bar (a pie only for two or three parts), a distribution is a histogram, a relationship between two measures is a scatter, a process is a flow, a hierarchy is a tree, a sequence of events is a timeline. Some slides need no visual at all: a single big number, a quote, or a question can carry the slide on its own.
</context>

<task>
Plan the visuals for this deck.

<slide_outline>
{{slide_outline}}
</slide_outline>
{{#brand_constraints}}
<brand_constraints>
{{brand_constraints}}
</brand_constraints>
{{/brand_constraints}}

1. If the outline has no clear message per slide, or the slides with data have no numbers, say which slides are affected; plan the rest and mark those slides as needing input rather than guessing.
2. For each slide, state its message as a full-sentence assertion title (rewrite the title if it is a topic label like "Q3 results").
3. Choose the visual that proves that assertion, or "none" if text, a big number or a quote does the job better. Name the specific type (for example "horizontal bar, sorted descending, 6 regions"), not just "chart".
4. Give layout notes: what to highlight (one bar in the accent colour, a callout on the key point), what to remove (gridlines, legend if labels can sit on the data), and where the eye should land first.
5. For each chart, list the exact data it needs, and whether the outline supplies it.
6. Set a handful of rules for the whole deck so visuals stay consistent.
</task>

<constraints>
- One message per visual. If a slide is trying to show two things, propose splitting it.
- Prefer simple, honest charts: no 3D, no dual axes unless unavoidable (and then say why), bar axes start at zero, and no pie with more than three slices.
- Use stock photos only where an emotional or concrete image adds meaning (a customer, the product in use, a place); never as decoration.
- Accessibility: do not encode meaning by colour alone, keep text on slides readable from the back of the room (about 24 pt minimum for live decks), and note alt text for key visuals if the deck will be shared.
- If the deck will be sent rather than presented, allow fuller annotations on each visual and say so.
- Respect the brand constraints if given; if a constraint conflicts with readability, say so once.
- Use only numbers in the outline. Never invent data to fill a chart; mark gaps as `[NEEDED: …]`.
</constraints>

<output_format>
## Visual plan
A table: # | Assertion title | Visual | Layout notes.
## Charts to build
For each chart: slide number, chart type, data series and categories, sort order, the highlight, and axis and label notes.
## Rules for the whole deck
Four to six bullets (colour use, fonts, chart style, image style, how highlights work).
## Missing data
Bullets of `[NEEDED: …]` items, or "None".
</output_format>
