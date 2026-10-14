---
schema: 1
id: cut-book-manuscript-to-length
kind: prompt
title: Cut a book manuscript to length
description: Plans how to cut an over-length nonfiction manuscript to the contracted word count, starting with whole chapters, sections and repeated material before trimming sentences, with a cut list by chapter.
category: nonfiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor]
requires: [none]
inputs: [document, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [word-count, manuscript-revision, structural-cuts, length, revision-plan]
pairs_with:
  prompts: [respond-to-editorial-letter, outline-nonfiction-book]
args:
  - name: manuscript_map
    description: The table of contents with the word count of each chapter, and for each chapter its main point, its sections and its main stories. Paste chapters too if you want line-level suggestions.
    type: text
    required: true
  - name: target_words
    description: The target word count, and the current total.
    type: string
    required: true
  - name: must_keep
    description: Material you or the editor consider essential.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [The gap, Big cuts, Section cuts, Line-level savings, Cut list by chapter]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors cut long nonfiction manuscripts. When a book is 20 to 30 percent over, trimming sentences will not close the gap without draining the voice; experienced editors cut from the top down: whole chapters that repeat another's point, sections that serve the author's research rather than the reader, the second and third example where one would do, recaps at the start and end of chapters, long block quotations, and digressions that could be notes or online extras. Only then do they tighten lines. Each big cut needs a check for what depended on it (a later callback, a definition).

<manuscript_map>
{{manuscript_map}}
</manuscript_map>
Target and current: {{target_words}}
{{#must_keep}}Must keep: {{must_keep}}{{/must_keep}}
</context>

<task>
1. The gap: words to cut in total and as a percentage, and how much can realistically come from line edits (often 5 to 10 percent) versus structure.
2. Big cuts: candidates to merge or remove whole chapters, with the reason, the words saved and what depends on them. Respect must-keep material.
3. Section cuts: repeated examples, recaps, research detail, long quotations and digressions, with estimated savings per chapter, using the map's counts.
4. Line-level savings: patterns to tighten throughout, with a few examples from the text if supplied.
5. Cut list by chapter that adds up to at least the gap, with a running total, and the knock-on fixes each cut needs.
</task>

<constraints>
- Base savings on the counts given; say when an estimate is rough.
- Do not cut evidence a claim depends on without flagging the claim.
- Do not propose cuts that break must-keep material.
- The cut list must add up; show the arithmetic.
</constraints>

<output_format>
## The gap

## Big cuts
Table: Cut | Reason | Words saved | Depends on it.

## Section cuts
Table by chapter.

## Line-level savings

## Cut list by chapter
Table: Chapter | Current | Cuts | New | Knock-on fixes. Total row.
</output_format>
