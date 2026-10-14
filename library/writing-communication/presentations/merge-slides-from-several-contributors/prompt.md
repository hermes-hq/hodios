---
schema: 1
id: merge-slides-from-several-contributors
kind: prompt
title: Merge slides from several contributors
description: Turns slides contributed by several people or teams into one coherent deck with a single storyline, consistent terms and numbers, no repeated content and a fair share of time.
category: presentations
version: 1.0.0
status: incubating
stage: [review, build]
role: [manager, project-manager, consultant, executive]
requires: [none]
inputs: [text, document]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [deck-assembly, storyline, consistency, contributors, slide-order]
pairs_with:
  prompts: [proofread-slide-deck, shorten-presentation-for-time, critique-slide-deck, unify-voice-in-multi-author-document]
  personas: [presentation-designer]
args:
  - name: slides
    description: The text of each contributor's slides (titles, bullets, notes), labelled by contributor or team.
    type: text
    required: true
  - name: purpose
    description: What the combined deck is for, who sees it and how long the slot is.
    type: text
    required: true
  - name: constraints
    description: Anything fixed, such as each team must have its own section, a slide limit or a template. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Storyline, Merged slide list, Conflicts to resolve, Consistency fixes, Messages to contributors]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You assemble group decks: quarterly business reviews, all-hands updates, bids and programme reviews where each team sends its own slides. Stapled together, they repeat the same context three times, use different names and numbers for the same thing ("ARR" vs "recurring revenue", 12.1m vs 12m), switch between topic titles and assertion titles, and run long because nobody owns the whole. The assembler's job is editorial: write one storyline the audience can follow, open with the overall message, order sections so each builds on the last, cut duplicates, make terms and figures consistent, and protect the time budget. Contributors' facts belong to them, so conflicting numbers are raised with the owners, never silently picked. Content that is useful but off the storyline goes to an appendix, which keeps contributors on side.

Contributed slides:
{{slides}}

Purpose: {{purpose}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Read every contribution and write the combined deck's storyline: the overall message, then the sections in order.
2. Build the merged slide list: for each slide, its new position, assertion title, source contributor, and action (keep, edit, merge with another, move to appendix, cut). Add an opening summary slide and a closing slide with decisions or next steps if missing.
3. Find duplicates and overlaps and say which version to keep and why.
4. Find conflicts: different numbers, dates or claims for the same thing. List them with both versions and the owners to ask, without choosing one.
5. Create a short glossary of terms to standardise, and note formatting fixes (title style, number format, date format, chart colours).
6. Check the timing against the slot and say how many minutes each section gets.
7. Draft short, polite messages to contributors whose slides were cut, merged or need a figure confirmed.
</task>

<constraints>
- Do not change any contributor's number or claim; flag conflicts for the owner.
- Do not drop a constraint given, such as a required section per team; work within it and say if it hurts the storyline.
- Keep wording neutral when explaining cuts to contributors.
</constraints>

<output_format>
## Storyline
Three to five sentences and the section order.

## Merged slide list
A table: position, title, source, action, notes.

## Conflicts to resolve
A table: item, version A (owner), version B (owner).

## Consistency fixes
Glossary and formatting bullets.

## Messages to contributors
Short drafts, one per contributor affected.
</output_format>
