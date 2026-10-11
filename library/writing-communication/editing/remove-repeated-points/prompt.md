---
schema: 1
id: remove-repeated-points
kind: prompt
title: Remove repeated points from a long document
description: Finds points a long document makes more than once across sections, picks the best single place for each, consolidates the wording there and cuts or cross-references the repeats.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, consultant, researcher]
requires: [none]
inputs: [document]
output: [report, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [repetition, redundancy, long-documents, consolidation, reports]
pairs_with:
  prompts: [edit-for-structure, tighten-prose, check-summary-matches-document]
  personas: [editor]
args:
  - name: document
    description: The full document, with its headings. Repetition can only be found across the whole piece.
    type: text
    required: true
  - name: output_mode
    description: map lists the repeats and the plan only; edit also returns the revised document.
    type: enum
    enum: [map, edit]
    default: map
output_contract:
  format: markdown
  sections: [Repetition map, Consolidation plan, Revised document, Repeats kept on purpose]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long documents written over weeks, or by several people, say the same thing in several places: the rationale in the introduction, again in the background, again before the recommendation; the same risk in three sections in different words. Sentence-level tightening cannot fix this because each instance reads fine on its own. Readers notice it as drag and start skimming, which is when they miss the new material. Some repetition is deliberate and useful: an executive summary repeats the body by design, a conclusion restates the main point, and a reference document may repeat a warning where people will look for it. The job is to tell the two apart, keep each point in the place where it does the most work, and make the other places either disappear or point to it.
</context>

<task>
Find and consolidate repeated points in this document. Mode: {{output_mode}}.

<document>
{{document}}
</document>

1. If the document is empty, ask for it and stop. If it is short (under about 800 words), still check, but say repetition is less likely to matter.
2. Break the document into points (claims, facts, reasons, recommendations, warnings), each with its section.
3. Group points that say the same thing, even in different words or at different levels of detail. Ignore shared terms that are not the same point.
4. For each group, choose the home: the place where the reader needs it to follow the argument, usually its first full treatment. Merge the strongest wording and any unique details from the other instances into the home.
5. For each other instance, decide: cut, shorten to a one-line reminder, or replace with a cross-reference ("see section 3"). Check that removing it does not break the paragraph around it; repair the join if needed.
6. Mark deliberate repeats to keep: summaries, conclusions, safety warnings in procedures, and anything a reader may reach directly without reading the rest.
7. In edit mode, return the full revised document with no other changes.
</task>

<constraints>
- Do not merge points that only look similar; if two instances differ in scope, number or condition, they are different points, and you should say so.
- Do not drop any unique detail during consolidation: a number, condition or example that appears in only one instance must survive.
- Do not line-edit or restructure beyond what consolidation needs.
- Quote enough of each instance for the writer to find it.
</constraints>

<output_format>
## Repetition map
A table: Point | Where it appears (sections) | Home | Action for each other instance.
## Consolidation plan
Numbered list of edits in document order, with approximate words saved in total.
## Revised document
In edit mode, the full revised document. In map mode, "Not requested."
## Repeats kept on purpose
Bullets: repeats you kept and why. "None" if none.
</output_format>
