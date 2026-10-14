---
schema: 1
id: cut-manuscript-to-word-limit
kind: prompt
title: Cut a manuscript to a word limit
description: Cuts a manuscript or section to a journal's word limit with a cutting plan by section, tightened text, material moved to supplements and a log, without dropping required methods detail.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [review, ship]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [word-limit, manuscript-editing, concise-writing, journal-submission, supplementary-material]
pairs_with:
  prompts: [write-methods-section, write-discussion-section, write-abstract, turn-thesis-chapter-into-paper]
  personas: [academic-writing-coach]
args:
  - name: manuscript
    description: The text to cut (whole manuscript or sections), with section headings.
    type: text
    required: true
  - name: limit
    description: The target, for example "3,500 words excluding abstract, references, tables and figure legends".
    type: string
    required: true
  - name: protected
    description: Optional. Anything that must stay (a reviewer-requested paragraph, a required reporting item).
    type: text
output_contract:
  format: markdown
  sections: [Cutting plan, Revised text, Moved to supplement, Change log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cutting a paper by 20 to 30 percent is a routine job that goes wrong in predictable ways: authors trim adjectives everywhere and save little, or they cut the methods details that reporting guidelines and reviewers need, while long introductions and discussions that restate results survive. Experienced editors cut by structure first: introductions shrink to the gap and aim, discussions stop repeating results and drop speculative paragraphs, text that duplicates a table or figure goes, detailed methods move to a supplement with a pointer, and only then do they tighten sentences (nominalisations, "it is important to note that", stacked hedges, redundant transitions). They count what the journal counts, since limits differ on whether abstract, tables, legends and references are included.
</context>

<task>
Cut this text to {{limit}}:
<manuscript>
{{manuscript}}
</manuscript>
{{#protected}}
Must keep: {{protected}}
{{/protected}}

1. Estimate the current count for what the limit includes and the number of words to cut. Give a budget per section.
2. Make structural cuts first: duplicated results, background beyond the gap, discussion paragraphs that restate results or speculate without support, and text that repeats tables or figures. Identify methods detail that can move to a supplement with a pointer.
3. Then tighten sentences across all sections.
4. Produce the revised text with the same headings.
5. Recount and report the result against the limit. If the target cannot be met without losing required content, stop at the nearest safe count and say what the authors must decide.
</task>

<constraints>
- Never change numbers, statistics, citations or the meaning of claims. Do not strengthen or weaken hedges unless the original overstated a result, and log any such change.
- Keep methods detail required for reproducibility and reporting guidelines in the main text or the supplement, never deleted.
- Keep protected content.
- Word counts are estimates; tell the user to confirm with their word processor.
</constraints>

<output_format>
## Cutting plan
A table: section | current words (estimate) | target | main cuts.
## Revised text
The full revised text with headings.
## Moved to supplement
Each moved passage with the pointer sentence left in the main text.
## Change log
Bullets of substantive changes, especially any that touch claims.
</output_format>
