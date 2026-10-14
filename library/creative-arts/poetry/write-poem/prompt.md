---
schema: 1
id: write-poem
kind: prompt
title: Write a poem
description: Writes an original poem from a topic, moment or occasion, built on one concrete image and a turn, then revises it once. Use when you want a poem and are not sure where to start.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer, student]
requires: [none]
inputs: [text, topic]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
depth: basic
tags: [poem, verse, free-verse, rhyme, imagery]
pairs_with:
  prompts: [write-poem-in-form, write-occasion-poem, critique-poem, workshop-poem-revision]
  personas: [poetry-mentor]
args:
  - name: topic
    description: What the poem is about, ideally with one moment, person, place or object at its centre (for example "my grandmother's hands kneading bread").
    type: text
  - name: shape
    description: Form, rhyme and length if you have a preference (for example "rhyming, 4 short stanzas", "a sonnet", "free verse, short"). Optional; unrhymed free verse of 12–20 lines is assumed.
    type: string
  - name: purpose
    description: Who it is for or where it will be read (just for me, a card, a wedding toast, a class assignment). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Approach, Poem, Notes, Another version, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet and writing teacher. Generated poems fail in predictable ways: they name feelings instead of showing them ("I feel so lost"), reach for stock images (roses, hearts, stormy seas, "tapestry"), bend word order to reach a rhyme, keep every line the same length and rhythm, and end by explaining what the poem meant. A good poem starts from one specific moment, image or object, moves through a turn (something shifts between the first line and the last), uses line breaks on purpose, and ends on an image or a turn rather than a moral.
{{#topic}}

<topic>
{{topic}}
</topic>
{{/topic}}
{{#shape}}
Shape: {{shape}}
{{/shape}}
{{#purpose}}
For: {{purpose}}
{{/purpose}}
</context>

<task>
1. If there is no topic, or only a broad word with nothing to anchor it ("love", "nature", "a poem"), ask these questions and stop:
   1. What is it about, and is there one moment, person, place or object at the centre? (for example "the last morning in our old flat")
   2. Who is it for, or where will it be read? (for example "just for me", "my dad's 70th birthday card")
   3. Rhymed or unrhymed, and about how long? (default: unrhymed free verse, 12–20 lines)
   Say that if they answer "just write it", you will pick a concrete angle yourself and name it. If the topic already gives you something concrete, do not ask; state any assumption in one line and write.
2. Find the centre: choose one concrete image or moment and the turn. Write both in two lines under Approach.
3. Choose the shape. Follow any form or rhyme asked for; a fixed form (sonnet, haiku, villanelle) follows its rules exactly. Otherwise use free verse, or rhyme when the purpose calls for it (children, cards, toasts). Fit the length to the purpose: a card is 4–12 lines.
4. Draft: specific nouns and verbs, sensory detail, line breaks that land on strong words, varied line lengths, no stated moral in the last lines. When it rhymes, keep natural word order and a steady beat, and prefer a fresh slant rhyme to a tired perfect one.
5. Revise once before showing it: cut or replace the weakest line, replace every stock phrase, read it aloud in your head for rhythm.
6. Offer one alternative ending or title and say in one line what it changes.
</task>

<constraints>
- Write original work. Do not reproduce or closely paraphrase published poems or lyrics; for "in the style of" a poet, capture traits (themes, line length, imagery, sound) without copying lines.
- Keep names, places and details exactly as given. For a poem about a real person, do not invent facts about them; put a [bracket] where a personal detail would help.
- Do not explain the poem at length unless asked; the notes stay short.
</constraints>

<output_format>
## Approach
The centre and the turn in two lines, plus any assumption.

## Poem
Title, then the poem with its line breaks and stanza breaks.

## Notes
Up to three bullets: the form or rhyme choice, and the line you are least sure of.

## Another version
The alternative ending or title.

## Go deeper
One line: to try a set form, use "Write a poem in a fixed form"; for a birthday, wedding or funeral, "Write a poem for an occasion"; for feedback on your own draft, "Critique a poem" or "Workshop a poem through revisions".
</output_format>
