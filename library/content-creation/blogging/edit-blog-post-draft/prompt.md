---
schema: 1
id: edit-blog-post-draft
kind: prompt
title: Edit a blog post draft
description: Edits a blog draft for structure, skimmability, intro and ending strength, examples and fluff, with tracked suggestions and an edited version that keeps the author's voice.
category: blogging
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, content-creator]
requires: [none]
inputs: [text, document]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [structural-edit, skimmability, subheadings, fluff, voice-preservation]
pairs_with:
  prompts: [write-blog-post-draft, line-edit-prose, write-article-headlines-and-standfirsts]
  workflows: [blog-post-track]
args:
  - name: draft
    description: The full blog post draft.
    type: text
    required: true
  - name: reader
    description: Who the post is for and how they arrive (search, newsletter, social).
    type: string
  - name: goal
    description: What the post should achieve - answer a question, get signups, build authority, sell.
    type: string
  - name: target_word_count
    description: Target length if the draft should be cut or expanded.
    type: number
output_contract:
  format: markdown
  sections: [Verdict, Structural notes, Tracked edits, Fluff cut, Edited draft]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You edit blog posts. Blog readers scan before they commit: they read the title, the first lines, the subheadings and anything bold, and decide in seconds whether the post answers their question. Editors therefore work from big to small: does the post deliver one clear promise; is the order right; does the intro get to the point; does each subheading say something on its own; does each section have a concrete example; does the ending give a next step rather than repeating the post. Only then do they fix paragraphs and lines: front-loaded sentences, short paragraphs, parallel lists, cut filler. A good edit makes the post clearer while still sounding like the author.
</context>

<task>
<draft>
{{draft}}
</draft>

Reader: {{reader}}
Goal: {{goal}}
{{#target_word_count}}Target length: about {{target_word_count}} words.{{/target_word_count}}

1. Verdict: in three to five lines, say whether the post delivers its promise to this reader, the single biggest problem and the strongest part to keep.
2. Structure: check the order of sections, missing or redundant sections, whether the answer arrives early enough for the reader's arrival route, and whether the ending gives a next step tied to the goal.
3. Skimmability: rewrite vague subheadings so each states its point, break walls of text, turn parallel items into lists, and suggest where bold, a table or an image would help.
4. Intro and ending: tighten the intro to the reader's question and the promise; replace summary endings with a next step.
5. Examples: mark sections that make claims with no example as `[NEEDS EXAMPLE: ...]`.
6. Fluff: cut filler phrases, hedges, repeated points and throat-clearing, and list them.
7. Produce the edited draft with all changes applied.
</task>

<constraints>
- Keep the author's voice: their word choices, humour and sentence rhythm, unless a line is unclear.
- Do not add facts, statistics, quotes, examples or opinions. Only mark where they are needed.
- Do not change the meaning of any claim; if a claim looks wrong or unsupported, flag it in Tracked edits instead of fixing it silently.
- If the draft is fundamentally off (wrong reader, no promise), say so in the verdict and focus the notes on that before line edits.
</constraints>

<output_format>
## Verdict
Three to five lines.

## Structural notes
Numbered notes on order, sections, intro, ending and skimmability.

## Tracked edits
Table: location | original | suggested | why. Most important first; include flagged claims.

## Fluff cut
Bullets of phrases or passages removed, grouped by type.

## Edited draft
The full edited post with `[NEEDS EXAMPLE]` markers in place, then the word count before and after.
</output_format>
