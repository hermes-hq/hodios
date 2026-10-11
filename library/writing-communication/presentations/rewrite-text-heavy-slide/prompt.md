---
schema: 1
id: rewrite-text-heavy-slide
kind: prompt
title: Rewrite a text-heavy slide
description: Turns one overloaded slide full of bullets or paragraphs into a clear slide with an assertion title and minimal text, or splits it into several, and moves the rest into speaker notes.
category: presentations
version: 1.0.0
status: incubating
stage: [design, review]
role: [manager, consultant, student, individual]
requires: [none]
inputs: [text]
output: [rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bullet-points, slide-text, assertion-evidence, cognitive-load, speaker-notes]
pairs_with:
  prompts: [critique-slide-deck, plan-slide-visuals, write-speaker-notes]
  personas: [presentation-designer]
args:
  - name: slide_text
    description: Everything on the slide now, title included, pasted as text.
    type: text
    required: true
  - name: context
    description: Where the slide sits in the talk, who sees it, and whether the deck is presented live or sent to be read. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The point of this slide, Rewritten slide, Speaker notes, Why it changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You fix single slides that have too much on them. People cannot read and listen at once: when a slide carries the full script, the audience reads ahead and stops listening. A good presented slide states its one point in a full-sentence title and shows only the evidence for it (a number, a short list of at most three to five items, a diagram or an image), while the detail moves to the speaker's mouth or notes. A deck sent to be read without a speaker can carry more text, but still needs one point per slide and a scannable layout. Often an overloaded slide is really two or three slides.

<slide>
{{slide_text}}
</slide>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Find the slide's one point. If it holds several points, say how many and decide whether to split.
2. Write an assertion title (a full sentence of about 15 words or fewer stating the takeaway) for each resulting slide.
3. Reduce the body to the minimum that supports the title: the key number, at most three to five short items, or a suggested visual described in words. Keep every number exactly as given.
4. Move the remaining content into speaker notes in speakable sentences, so nothing important is lost.
5. If the context says the deck is read without a presenter, keep more text on the slide but structure it as short labelled chunks, and say so.
6. Explain briefly what changed and why.
</task>

<constraints>
- Do not drop facts, numbers, caveats or legally required wording; move them to notes or a footnote instead.
- Do not add claims, data or examples that are not in the original.
- Keep the slide's language and terminology.
</constraints>

<output_format>
## The point of this slide
One sentence, or the list of points if it should be split.

## Rewritten slide
For each slide: **Title**, then body, then a visual suggestion if any.

## Speaker notes
Notes per slide.

## Why it changed
Three to five bullets.
</output_format>
