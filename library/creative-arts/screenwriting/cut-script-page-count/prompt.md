---
schema: 1
id: cut-script-page-count
kind: prompt
title: Cut a script's page count
description: Plans how to bring an overlong script down to a target page count, from structural cuts to scene trims to line-level tightening, without cheating the format. Use when a draft runs long.
category: screenwriting
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [document, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [page-count, script-trimming, tightening, cut-scenes]
pairs_with:
  prompts: [fix-sagging-second-act, review-first-ten-pages, write-script-coverage]
args:
  - name: script
    description: The script, or a scene list with the page length of each scene and a one-line summary of what it does.
    type: text
    required: true
  - name: current_pages
    description: Current page count.
    type: number
    required: true
  - name: target_pages
    description: The page count you need to reach, e.g. 110 for a feature, 60 for an hour pilot, 12 for a short.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Cut budget, Structural cuts, Scene trims, Line-level tightening, Do not cheat, Running total]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers notice length before they read a word; an overlong script signals a writer who has not made hard choices. Writers usually try to trim lines first, which saves little; the big savings come from structure: cutting or merging scenes that repeat a beat, entering scenes later and leaving earlier, and removing subplots that do not pay off. Line-level tightening (orphan words that create an extra line, action paragraphs that restate what dialogue shows, characters greeting each other) finishes the job. Cheating with margins, fonts or line spacing is easy for readers to spot and breaks the page-to-minute convention, so it is not an option.
</context>

<task>
Bring this script from {{current_pages}} to {{target_pages}} pages.

<script>
{{script}}
</script>

1. **Cut budget:** pages to cut, and a split between structural cuts (aim for most of it), scene trims and line tightening.
2. **Structural cuts:** scenes or sequences to cut or merge, each with the reason (repeats a beat, no change in value, subplot without payoff), what information must survive and where it moves, and pages saved.
3. **Scene trims:** for scenes that stay, where to enter later and leave earlier, with page or scene references and estimated savings.
4. **Line-level tightening:** the patterns that waste lines in this script with one example each (orphans, restated action, greetings and goodbyes, over-described blocking, unnecessary parentheticals) and an estimate of what fixing them saves.
5. **Do not cheat:** confirm the plan keeps standard formatting; list any scene the writer may be too attached to cut, with the trade-off.
6. **Running total:** a table summing savings to show the target is reached; if it cannot be reached without damaging the story, say how many pages remain and what the next decision would be.
</task>

<constraints>
- Never recommend changing margins, fonts or spacing.
- Keep every beat the story needs; say where its information goes when a scene is cut.
- Estimates are approximate; label them as such.
- Do not rewrite the whole script; give examples, not a new draft.
</constraints>

<output_format>
## Cut budget
## Structural cuts
## Scene trims
## Line-level tightening
## Do not cheat
## Running total
Table: Change | Type | Pages saved (est.) | Cumulative.
</output_format>
