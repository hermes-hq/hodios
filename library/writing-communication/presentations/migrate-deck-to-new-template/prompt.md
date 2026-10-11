---
schema: 1
id: migrate-deck-to-new-template
kind: prompt
title: Migrate a deck to a new template
description: Plans moving an old deck into a new brand or company template, mapping each slide to a template layout, flagging content that will not fit and listing what to rebuild rather than paste.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [manager, consultant, marketer, individual]
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
tags: [slide-template, rebranding, slide-layouts, brand-consistency, deck-reuse]
pairs_with:
  prompts: [critique-slide-deck, proofread-slide-deck, rewrite-text-heavy-slide]
  personas: [presentation-designer]
args:
  - name: old_deck
    description: Each slide of the old deck with its title, what is on it (text amount, charts, tables, images, logos) and any special formatting.
    type: text
    required: true
  - name: template_layouts
    description: The layouts the new template offers, for example "title, section divider, title and content, two content, big number, quote, chart, closing", plus any brand rules such as maximum bullets or colour use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout mapping, Content that will not fit, Rebuild list, Migration steps, Final check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people move existing decks into a new template, a job that usually comes with a rebrand or a new client. Copy-pasting slides keeps the old formatting as hidden overrides: wrong fonts and colours, text boxes outside the placeholders, and titles that the outline view and screen readers cannot see. The reliable method is to map each old slide to a layout in the new template, paste content into the placeholders as plain text, rebuild charts so they pick up the new theme colours, re-insert images, and remove old logos and footers. Slides that do not fit any layout are a signal the content needs restructuring, not that the template needs a new layout. Brand templates often limit text, so dense slides may need splitting.

<old_deck>
{{old_deck}}
</old_deck>

<template_layouts>
{{template_layouts}}
</template_layouts>
</context>

<task>
1. Map each old slide to the best new layout, with a one-line note on how the content goes into the placeholders.
2. Flag slides whose content will not fit a layout or breaks a brand rule (too much text, three charts on one slide, custom diagrams, old colours that carry meaning), and say whether to split, simplify or rebuild.
3. List what must be rebuilt rather than pasted: charts (recreate from data so they adopt theme colours), tables, diagrams, icons, and anything using old brand colours or fonts.
4. Give step-by-step migration instructions that avoid hidden formatting: start from the template file, add slides by layout, paste text as plain text, use placeholders not free text boxes, reset slides to layout where available, and delete leftover old masters.
5. Give a final check: old logos, footers and colours gone; fonts consistent; titles in title placeholders for accessibility and navigation; slide numbers; charts readable in new colours, especially if colour meaning changed.
</task>

<constraints>
- Keep the content and numbers unchanged; this is a format migration, not a rewrite. Recommend splits but do not rewrite text beyond what fitting requires.
- Keep instructions tool-neutral; mention where common tools differ only in general terms.
- Do not invent template layouts that were not listed; if none fits, say so.
</constraints>

<output_format>
## Layout mapping
Table: Old slide | New layout | How content goes in.

## Content that will not fit
Bullets with split, simplify or rebuild recommendation.

## Rebuild list
Checklist.

## Migration steps
Numbered steps.

## Final check
Checklist.
</output_format>
