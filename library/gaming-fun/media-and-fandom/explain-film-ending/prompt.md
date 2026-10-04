---
schema: 1
id: explain-film-ending
kind: prompt
title: Explain an ambiguous ending
description: Explains an ambiguous film, series or book ending with the main readings, the clues each rests on, and what the creators have actually said, kept clearly separate.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [ending-explained, film-analysis, interpretation, fan-theories]
pairs_with:
  prompts: [catch-up-on-series-spoiler-free, recommend-films-from-favorites]
  personas: [film-and-book-critic]
args:
  - name: title
    description: The film, series (with season) or book, with the year if there are remakes, for example "Inception (2010)" or "The Leftovers, final episode".
    type: string
    required: true
  - name: confusion
    description: What did not make sense to you or what you want settled, for example "Was the top still spinning? Was it all a dream?". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What literally happens, Your question, Readings, What the creators have said, Best-supported reading, If you rewatch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain endings the way a good film-studies teacher does: you separate what the work literally shows from what it might mean, and both from what its makers have said outside the work. Most "ending explained" articles blur the three, present one fan theory as the answer, and attribute quotes to directors that they never said. Ambiguity is often deliberate, so the goal is to show the reader how the readings are built, not to close what the work left open.

Work: {{title}}
{{#confusion}}What puzzled them: {{confusion}}{{/confusion}}
</context>

<task>
1. Open with a one-line spoiler warning, because this discusses the ending.
2. Identify the work. If the title matches several works (remakes, adaptations) and the year is missing, say which one you assume. If you do not know the work well, say so and ask for a summary of the ending; do not reconstruct it from guesses.
3. State what literally happens in the final act, without interpretation.
4. If they described what puzzled them, answer that directly first.
5. Lay out two to four main readings. For each, give the clues it rests on (scenes, images, paraphrased dialogue, structure) and the strongest evidence against it.
6. Report creator statements only when you are confident they exist, naming the kind of source (interview, commentary track, afterword) and roughly when. If you know of none, say "I am not aware of a reliable statement from the creators". Never invent or reconstruct a quote.
7. Say which reading you find best supported by the work itself and why, while noting if the creators intended it to stay open.
8. Before answering, check that every creator statement is one you actually know, that fan theories are labelled as fan theories, and that quotes are either exact or clearly paraphrased.
</task>

<constraints>
- Label every claim as one of: on screen or on the page, interpretation, fan theory, or creator statement.
- Paraphrase dialogue unless you are certain of the exact words.
- Do not spoil other works in the same franchise beyond the one asked about, unless the reading depends on it; then warn first.
- Keep the tone curious, not authoritative; readers may reasonably disagree.
</constraints>

<output_format>
Spoiler warning line.
## What literally happens
## Your question
Only if they gave one.
## Readings
For each: a bold name, then "Rests on:" and "Against it:" bullets.
## What the creators have said
Each statement with its source type and rough date, or the line saying you know of none.
## Best-supported reading
## If you rewatch
Two to four scenes or moments to look at again.
</output_format>
