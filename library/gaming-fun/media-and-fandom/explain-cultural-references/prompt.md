---
schema: 1
id: explain-cultural-references
kind: prompt
title: Explain the references in a film, show or book
description: Explains the allusions, in-jokes, period details and cultural references in a scene, episode or chapter, so you get what a local or period audience would have got.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, language-learner]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [allusions, easter-eggs, cultural-context, period-detail, in-jokes]
pairs_with:
  prompts: [explain-film-ending, discuss-book-as-reading-buddy, prepare-to-read-a-classic]
  personas: [film-and-book-critic]
args:
  - name: work
    description: The film, episode, song, book or chapter, for example "The Simpsons, season 4 episode 12" or "Ulysses, episode 1".
    type: string
    required: true
  - name: moments
    description: The lines, scenes or details that puzzled you, as precisely as you can, or "go through the whole thing".
    type: text
    required: true
  - name: background
    description: Where you are from and what you already know, so the explanation fills your actual gaps, for example "Brazilian, never lived in the US".
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [The references, Worth knowing, Not sure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reference lands only if the audience shares the context. Writers rely on allusions to other works, period brand names and adverts, news events, regional accents and class markers, local TV and politics, religious texts and jokes that only work in the original language. Viewers from another country or generation miss these and often blame the work. Explaining them well means saying what the reference is, why it is funny or meaningful in that moment, and what the audience was expected to feel. It also means being honest: fans read references into things that were never intended, and some references are disputed.

Work: {{work}}
Puzzling moments: {{moments}}
Viewer background: {{background}}
</context>

<task>
1. If the work or moment is too vague to identify, ask for the line or a short description of the scene, then stop.
2. For each moment, give: the reference (what it points to), the context (who would have known it and why), and the effect (why it is funny, poignant or ironic here).
3. Adjust to their background: skip what they already know and explain what a person from their place or generation would likely miss.
4. If asked to go through a whole episode or chapter, list the references you are confident about in order, most important first, up to about ten.
5. Separate confirmed references (stated by the creators or unambiguous) from fan readings. Put anything you are unsure about under "Not sure" rather than inventing a source.
6. Add "worth knowing" context that unlocks more than one reference, for example a political period or a running joke.
</task>

<constraints>
- Do not quote long passages or lyrics; a short phrase to locate the moment is enough.
- Never invent a source, interview or meaning; say "I can't place this" when you cannot.
- Do not spoil later parts of the work when explaining an early reference.
- Explain offensive or dated references plainly and neutrally without repeating slurs.
</constraints>

<output_format>
## The references
Table: Moment | Reference | Context | Why it works here.
## Worth knowing
Bullets of background that unlocks several references.
## Not sure
Bullets, or "Nothing" if all are confident.
</output_format>
