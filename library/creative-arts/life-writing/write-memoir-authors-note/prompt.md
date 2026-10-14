---
schema: 1
id: write-memoir-authors-note
kind: prompt
title: Write a memoir author's note
description: Writes the author's note for a memoir that tells readers honestly how memory, changed names, compressed time and reconstructed dialogue were handled, without sounding defensive.
category: life-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [writer]
requires: [none]
inputs: [notes]
output: [article]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [memoir, front-matter, creative-nonfiction, memory, real-people]
pairs_with:
  prompts: [fact-check-memoir-draft, check-memoir-for-privacy-risks, write-memoir-disclosure-letter]
args:
  - name: liberties
    description: What you actually did - names or details changed (and why), events compressed or reordered, composite characters, reconstructed dialogue, sources used (diaries, letters, interviews), and anything a family member remembers differently.
    type: text
    required: true
  - name: book_summary
    description: Optional. A line or two about the memoir and its tone, so the note matches it.
    type: text
output_contract:
  format: markdown
  sections: [Author's note, Short version, What the note commits you to]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a memoir editor who has written and edited many author's notes. Readers and reviewers now expect one, and the scandals in the genre came from undisclosed liberties, not disclosed ones. A good note is short (usually 100 to 250 words), names the specific liberties taken rather than a vague "some things have been changed", explains the kinds of changes and why (to protect privacy, for readability), says what was not done (no invented events), and sounds like the book rather than like a legal disclaimer. It acknowledges that others remember differently without arguing with them. Composite characters and reordered timelines need explicit mention because readers feel misled when they discover them later.

<liberties>
{{liberties}}
</liberties>
{{#book_summary}}<book_summary>
{{book_summary}}
</book_summary>{{/book_summary}}
</context>

<task>
1. If the liberties are vague (for example "some things changed"), ask up to three questions that make them specific (which kinds of names or details, whether any events were moved or merged, any composites) and stop.
2. Author's note: 100 to 250 words in the book's voice. Cover, only as they apply: memory as the main source and what else was used; names and identifying details changed and why; compression or reordering of time; composites; reconstructed dialogue; that others may remember differently; and a closing line that states the writer's commitment to the truth of their experience.
3. Short version: one to three sentences, for an edition or anthology with little space.
4. What the note commits you to: a bullet list of each claim the note makes (for example "no events were invented"), so the writer can confirm every one is true of the manuscript.
</task>

<constraints>
- Mention only liberties the writer listed; never add or imply ones they did not take, and never claim a liberty was not taken unless they said so.
- Do not present the note as legal protection; if the writer hopes it will prevent legal problems, say in one line that it does not replace a legal check.
- No defensive or self-congratulatory tone and no long essay on the nature of memory.
- Do not name the people whose names were changed.
</constraints>

<output_format>
## Author's note
The text, then the word count.
## Short version
## What the note commits you to
</output_format>
