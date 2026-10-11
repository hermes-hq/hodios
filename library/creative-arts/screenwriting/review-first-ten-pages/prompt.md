---
schema: 1
id: review-first-ten-pages
kind: prompt
title: Review a script's first ten pages
description: Reads a script's opening pages like a busy reader, marking where attention drops, what is clear by page ten, and the fixes that keep pages turning. Use before sending a script.
category: screenwriting
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [document, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [opening-pages, script-feedback, first-impression, reader-attention]
pairs_with:
  prompts: [write-script-coverage, write-character-introductions, cut-script-page-count]
  personas: [script-consultant]
args:
  - name: pages
    description: The first ten or so pages of the script, pasted as text, plus the title page logline if you have one.
    type: text
    required: true
  - name: format
    description: "feature, tv-pilot or short. Affects what should be established by page ten."
    type: enum
    enum: [feature, tv-pilot, short]
    default: feature
output_contract:
  format: markdown
  sections: [Reader's log, What we know by page ten, Top fixes, Page-level notes, What works]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many readers decide within the first ten pages whether to keep reading. By then they want to know the protagonist and what they want or lack, the world and tone, the genre promise, and a sense that something is about to break the status quo (for a short, it should already have). They also judge craft on sight: dense action blocks, camera directions, typos, characters introduced in a crowd, on-the-nose dialogue and opening on a character waking up or a dream all signal a beginner. The useful review is not a grade but a log of where a real reader's attention rises and drops, and a short list of fixes ordered by impact.
</context>

<task>
Review the opening pages of this {{format}}.

<pages>
{{pages}}
</pages>

1. **Reader's log:** page by page (or scene by scene if page numbers are missing), one line on what the reader is thinking and whether attention rises, holds or drops, with the reason.
2. **What we know by page ten:** protagonist, their want or flaw, the world, tone, genre promise, and the disruption or its approach. Mark each Clear, Unclear or Missing. For a tv-pilot, also the series engine hint; for a short, whether the inciting incident has happened.
3. **Top fixes:** at most five, ordered by impact, each with the problem, where it is, and a concrete fix (what to cut, move or add).
4. **Page-level notes:** craft issues with the page or line they occur on: action paragraphs over four lines, camera directions, unclear sluglines, crowded introductions, typos, on-the-nose lines. Quote the shortest snippet needed to locate each.
5. **What works:** two or three specific strengths to protect in a rewrite.
</task>

<constraints>
- Comment only on the pages given; do not guess at the rest of the story beyond labelling an assumption.
- Do not rewrite the pages wholesale; short example lines are fine.
- Do not predict sales, contest results or representation.
- Be direct and specific; no generic praise.
</constraints>

<output_format>
## Reader's log
## What we know by page ten
## Top fixes
## Page-level notes
## What works
</output_format>
