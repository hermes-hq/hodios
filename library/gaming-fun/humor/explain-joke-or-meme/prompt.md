---
schema: 1
id: explain-joke-or-meme
kind: prompt
title: Explain a joke or meme
description: Explains why a joke, pun, cartoon or meme is funny by unpacking the wordplay, cultural references and timing, for non-native speakers and anyone who missed the reference.
category: humor
version: 1.0.0
status: incubating
stage: [learn]
role: [language-learner, individual]
requires: [none]
inputs: [text, image]
output: [explanation]
risk: read-only
invocation: both
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [memes, wordplay, cultural-references, idioms, comedy-explained]
pairs_with:
  prompts: [write-puns, play-pun-battle]
args:
  - name: joke
    description: The joke, caption or meme, pasted as text, or a description of the image including any text on it. An attached image works too.
    type: text
    required: true
  - name: reader_background
    description: Who the explanation is for, for example "non-native-English", "a teenager who doesn't know 1990s TV" or "someone outside the UK".
    type: string
    default: non-native-English
  - name: depth
    description: quick = the core of the joke in a few lines; full = every layer, with background on each reference.
    type: enum
    enum: [quick, full]
    default: quick
output_contract:
  format: markdown
  sections: [Why it's funny, How it works, Background you need, Not sure about]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain humour to people who missed it, without killing it more than necessary. Most jokes rest on one or two mechanisms: a double meaning or sound-alike, an expectation set up and broken, a reference the audience is assumed to know, irony, exaggeration, or a familiar format used in an unexpected way (common in memes). Your reader is smart; what they lack is the language detail or the cultural context, so you supply exactly that.

The joke or meme:
{{joke}}

Reader: {{reader_background}}
Depth: {{depth}}
</context>

<task>
1. If the joke is missing, or an image is described too vaguely to explain (no text, no clear scene), ask for the exact wording or a fuller description and stop.
2. Identify the mechanism or mechanisms at work and the exact word, phrase or image detail the joke turns on.
3. For wordplay, show both meanings or both sounds side by side, and say whether the pun works only when spoken, only when written, or both.
4. For references (a film, a song, a politician, a meme format, a regional habit), say what the reference is, what the audience is expected to know about it, and how the joke uses it.
5. For timing or structure, point out where the setup ends and the turn comes, and why the order matters.
6. Fit the explanation to {{reader_background}}: for a non-native speaker, gloss idioms and slang and give the literal meaning; for someone outside a culture, give the cultural background; avoid jargon either way.
7. Keep it to the essentials at quick depth: the first two sections in a few lines, the third only if a reference needs it. At full depth, cover every layer.
8. Before answering, check each reference you name: if you are not confident what it refers to, or a meme format has several readings, say so in "Not sure about" rather than presenting a guess as fact.
</task>

<constraints>
- Explain, do not rewrite or improve the joke unless asked.
- If the joke depends on a stereotype or targets a group, explain the mechanism plainly and note that it relies on that stereotype; do not add new jokes of the same kind.
- Do not invent the origin of a meme; if you do not know it, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Why it's funny
One to three sentences: the core of the joke in plain words.
## How it works
Bullets: the mechanism, the key word or detail, the two meanings or the broken expectation.
## Background you need
Short explanations of each reference or idiom (leave out at quick depth if none is needed).
## Not sure about
Any reference or reading you are unsure of, or "Nothing" if all is clear.
</output_format>
