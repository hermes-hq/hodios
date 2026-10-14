---
schema: 1
id: compare-book-and-adaptation
kind: prompt
title: Compare a book and its adaptation
description: Advises whether to read the book or watch the adaptation first, then compares them at the spoiler level you choose, with what each does better and why changes were made.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual, student]
subject: [literature]
requires: [none]
inputs: [text, preferences]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [book-vs-film, adaptation, read-first, spoiler-levels]
pairs_with:
  prompts: [explain-film-ending, recommend-next-book, catch-up-on-series-spoiler-free]
  personas: [film-and-book-critic]
args:
  - name: work
    description: The book and the adaptation, for example "Dune (Frank Herbert) and the Villeneuve films" or "Normal People, novel and series".
    type: string
    required: true
  - name: status
    description: What you have done, for example "read neither", "seen the film, not the book", "finished both".
    type: string
    required: true
  - name: spoilers
    description: none = no plot details at all; light = set-up and broad structure only; full = everything, for people who finished both.
    type: enum
    enum: [none, light, full]
    default: none
output_contract:
  format: markdown
  sections: [Which first, What changes, What each does better, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Adaptations change books for reasons that are usually craft, not carelessness: film runs two hours, so subplots and characters are merged; interior monologue has to become action, image or voice-over; a series can be more faithful but must end episodes on hooks; rights, budget and ratings shape what gets shown. Which to experience first depends on the work: a twist-driven mystery is best met once in whichever form is stronger; a dense book can be easier after the film gives you the faces and the map; a quiet literary novel can be flattened if you see the film first. When several adaptations exist, they must be kept apart.

Work: {{work}}
Status: {{status}}
Spoiler level: {{spoilers}}
</context>

<task>
1. If you do not recognise the book or the adaptation, say so plainly and do not describe changes you cannot verify, then stop. If there are several adaptations and it is unclear which one is meant, list them with years and ask, then stop.
2. Recommend which to experience first given their status, with the reason. If they have already done one, say whether the other is still worth it.
3. Describe what changes at the {{spoilers}} level: with none, talk only about form (length, structure, point of view, tone, what is cut in kind); with light, add set-up and broad structural changes; with full, discuss specific plot and ending changes.
4. Explain why key changes were likely made (medium, length, rating, era), and mark which reasons are documented (creators said so) versus your inference.
5. Say what each version does better, concretely.
6. Give a verdict tailored to them, and if relevant point to a second adaptation or a sequel book.
</task>

<constraints>
- Never exceed the chosen spoiler level. If a point needs more, say "skipping this, it needs full spoilers".
- Do not invent quotes from authors or directors; label inference as inference.
- Do not confuse different adaptations of the same book, and never invent an adaptation, a cast or a change.
- Keep any quotation from the book to a short phrase.
</constraints>

<output_format>
## Which first
Two to four sentences.
## What changes
Table: Aspect | Book | Adaptation | Likely reason.
## What each does better
Two short bullet lists.
## Verdict
Two or three sentences.
</output_format>
