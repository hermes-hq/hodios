---
schema: 1
id: build-reading-deck
kind: prompt
title: Build a deck meant to be read
description: Builds a send-ahead deck designed to be read without a presenter, with full-sentence titles, self-explanatory charts, a summary page up front and enough text to stand alone.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [consultant, manager, business-analyst, product-manager]
requires: [none]
inputs: [document, notes, dataset]
output: [outline, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pre-read, async-communication, action-titles, executive-audience, storyline]
pairs_with:
  prompts: [convert-slides-to-handout, turn-document-into-slides, write-executive-summary-slide]
  personas: [presentation-designer]
args:
  - name: material
    description: The content, findings, data and recommendations the deck must carry. Paste a document, notes or the slides you have.
    type: text
    required: true
  - name: readers
    description: Who will read it, what they need to decide or know, and how they will read it, for example "board pre-read, printed, 2 days before the meeting".
    type: text
    required: true
  - name: page_limit
    description: Maximum number of pages, excluding appendix.
    type: string
    default: 10 pages plus appendix
output_contract:
  format: markdown
  sections: [Summary page, Page-by-page plan, Chart and table notes, Appendix, Reading test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people write decks that will be read, not presented: board pre-reads, consulting deliverables, investment committee papers, strategy documents sent by email. These follow different rules from talk slides. With no speaker, every page must carry its own argument: the title is a full-sentence conclusion (the "so what"), the body gives the evidence for that conclusion, charts are labelled so they make sense on their own (title stating the takeaway, axis labels with units, source and date, the key data point called out), and abbreviations are spelled out. Reading the titles alone in order should tell the whole story. The first page is a summary that a busy reader could stop after. Density is acceptable here, but layout must still guide the eye: one message per page, evidence grouped, no orphan bullets. Common failures are presenter slides sent as-is (cryptic, missing the spoken half) or a wall of text pasted into slide format.

<material>
{{material}}
</material>

Readers: {{readers}}
Page limit: {{page_limit}}
</context>

<task>
1. Work out the governing message: the one conclusion and what you want readers to do. If the material does not support a clear conclusion, say so and give the options it does support.
2. Group the supporting points into three to five arguments, each with evidence from the material (pyramid structure).
3. Write the summary page: the conclusion, the supporting arguments in one line each, and the decision or action asked of readers.
4. Plan each page within {{page_limit}}: a full-sentence action title, the body (short paragraphs or grouped bullets, enough to stand alone), and the visual. Order pages so that reading only the titles tells the story.
5. For each chart or table, specify the takeaway title, what is plotted, axis labels and units, the highlighted data point, and the source line with date, using only data from the material.
6. Move detail that supports but does not drive the argument into an appendix, with page references from the main body.
7. Run a reading test: list the titles in order and check they make a complete argument; flag pages that would confuse a reader without a presenter (undefined terms, unlabelled charts, references to "as discussed").
</task>

<constraints>
- Use only facts and numbers in the material; mark gaps as [data needed] and never invent sources or figures.
- Every main page title is a full sentence of at most about 15 words that states a conclusion, not a topic.
- Spell out abbreviations on first use; define terms a reader outside the team might not know.
- Every chart carries a source and date; every number has units.
- Respect the page limit; say what you moved to the appendix to meet it.
</constraints>

<output_format>
## Summary page
The full text of page one.

## Page-by-page plan
For each page: title, body text or bullets, visual.

## Chart and table notes
Table: Page | Takeaway title | Data plotted | Labels and units | Highlight | Source.

## Appendix
List of appendix pages with what each holds and where it is referenced.

## Reading test
Titles in order, then flagged issues.
</output_format>
