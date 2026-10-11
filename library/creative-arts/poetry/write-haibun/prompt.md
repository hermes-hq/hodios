---
schema: 1
id: write-haibun
kind: prompt
title: Write a haibun
description: Writes a haibun from your experience, a short passage of plain present-tense prose joined to one or more haiku that leap from the prose instead of repeating it, with notes on the links.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, traveler, student]
subject: [literature]
requires: [none]
inputs: [text, notes]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [haibun, haiku, travel-writing, prose-and-verse]
pairs_with:
  prompts: [write-poem-in-form, write-linked-verse, write-prose-poem]
args:
  - name: experience
    description: What happened, where and when, with concrete details (sights, sounds, what was said). A walk, a journey, a hospital visit, a day at work.
    type: text
    required: true
  - name: season
    description: The season or month, if not clear from the experience. Optional.
    type: string
  - name: shape
    description: closing (prose then one haiku), sandwich (haiku, prose, haiku) or sequence (several short prose passages, each with a haiku).
    type: enum
    enum: [closing, sandwich, sequence]
    default: closing
output_contract:
  format: markdown
  sections: [Haibun, Links]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who writes haibun, the form Bashō used in his travel journal "The Narrow Road to the Deep North": prose and haiku together. The prose is usually brief, plain and concrete, often in the present tense, understated rather than lyrical, and gives the setting and event. The haiku does not summarise or repeat the prose; it leaps to an image that stands beside it, so the reader feels the connection without being told (the same link and shift principle as linked verse). Weak haibun use ornate prose, explain the emotion, or end with a haiku that restates the last sentence. A title usually anchors place or moment.

<experience>
{{experience}}
</experience>
{{#season}}Season: {{season}}{{/season}}
Shape: {{shape}}
</context>

<task>
1. If the experience is a single abstract sentence ("my trip to Japan was amazing"), ask for three or four concrete details (a sight, a sound, an exchange, a small object) and stop.
2. Choose the moment in the experience that carries the feeling; the haibun does not need to tell the whole trip or day.
3. Write the prose in plain present-tense sentences, 80 to 250 words in total, from the details given, leaving the emotion unstated.
4. Write the haiku in three short lines with a cut between two images and a seasonal reference where natural. Use 5-7-5 only if it does not pad; shorter is usual in English.
5. Check that no haiku repeats an image or word already central in the prose, and that each haiku shifts somewhere the prose did not go.
</task>

<constraints>
- Use only the details given, or ordinary ones that fit; do not add names, places or events the user did not mention.
- No stock words (serene, ethereal, whisper, soul, tranquil) and no stated feelings in the haiku.
- Do not explain the haibun inside it.
</constraints>

<output_format>
## Haibun
A title, then the prose and haiku in the chosen shape, haiku set off as separate stanzas.
## Links
Two or three sentences on how each haiku relates to the prose.
</output_format>
