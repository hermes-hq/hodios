---
schema: 1
id: add-sources-to-slides
kind: prompt
title: Add sources and credits to slides
description: Adds short source lines, image credits and a references slide to a deck, flags claims and images with no source, and lists image-use questions to check before presenting or sharing.
category: presentations
version: 1.0.0
status: incubating
stage: [review]
role: [student, researcher, teacher, consultant]
requires: [none]
inputs: [document, notes]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [citations, image-credits, attribution, references, academic-integrity, image-licensing]
pairs_with:
  prompts: [critique-slide-deck, make-presentation-accessible, convert-slides-to-handout]
  personas: [presentation-designer]
args:
  - name: deck
    description: Each slide's text, plus a note of every chart, photo, icon or quote and where you got it, as far as you know.
    type: text
    required: true
  - name: citation_style
    description: The style required, if any, for example APA, Harvard, IEEE or "none, just make it clear".
    type: string
    default: none specified
  - name: will_be_shared
    description: Whether the deck will be posted online, sent out or recorded after the talk, which raises the bar for image permissions.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Source lines per slide, Unsourced items, Image and media checks, References slide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people credit what is on their slides. On a slide, a full reference is too long; the usual practice is a short source line under the chart or quote (author or organisation, year, and title or dataset) with the full reference on a final references slide. Every statistic, chart, quotation and borrowed image needs a source the audience can follow up. Students lose marks and professionals lose credibility when numbers have no source. Images are a separate question from citing: an image found online is not free to use just because it is credited, and posting or recording a deck widens exposure. Stock and openly licensed images (for example some Creative Commons licences) have specific attribution and use conditions that the presenter must check. You do not give legal advice and you cannot verify licences or sources yourself.

<deck>
{{deck}}
</deck>

Citation style: {{citation_style}}
Deck will be shared or recorded afterwards: {{will_be_shared}}
</context>

<task>
1. Go through every slide and list each item that needs a source: statistics, charts, data tables, quotations, paraphrased findings, images, icons, logos, video or audio clips.
2. For each item with a source given, write a short on-slide source line in the required citation style ({{citation_style}}); if none is specified, use a clear short form (author or organisation, year, title).
3. List every item with no source given as unsourced, and say what the presenter needs to find. Never supply a plausible-looking source yourself.
4. For images and media, list what to check: who owns it, the licence or permission, attribution wording required, and whether the planned use (shown in a room, posted, recorded) is covered. Raise the priority of these checks when the deck will be shared. Suggest replacing doubtful images with the presenter's own, licensed stock or openly licensed alternatives.
5. Draft the references slide from the sources given, formatted in the required style, with missing details as [missing: year] style placeholders.
6. Note logos of other organisations and photos of identifiable people as items needing permission or a careful check.
</task>

<constraints>
- Never invent authors, years, titles, URLs or licence terms.
- Do not state that an image is free to use or that a use is legal; say what to check.
- Keep source lines short enough to fit under a chart in a small font.
</constraints>

<output_format>
## Source lines per slide
Table: Slide | Item | Source line.

## Unsourced items
Bullets: slide, item, what to find.

## Image and media checks
Table: Slide | Image or clip | What to check | Priority.

## References slide
The full references in the chosen style, with placeholders.
</output_format>
