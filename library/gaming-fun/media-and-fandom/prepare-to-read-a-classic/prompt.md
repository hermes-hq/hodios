---
schema: 1
id: prepare-to-read-a-classic
kind: prompt
title: Prepare to read a classic
description: Gets a reader ready for a long or difficult classic with how to choose an edition or translation, spoiler-free context, a cast list strategy and a realistic reading pace.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, student]
subject: [literature]
requires: [none]
inputs: [text, preferences]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [classic-literature, translations, reading-plan, editions, spoiler-free]
pairs_with:
  prompts: [discuss-book-as-reading-buddy, explain-cultural-references, build-reading-challenge]
  personas: [film-and-book-critic]
args:
  - name: book
    description: The classic you want to read, for example "War and Peace", "Middlemarch", "One Hundred Years of Solitude" or "The Tale of Genji".
    type: string
    required: true
  - name: reading_time
    description: How much time you can give it, for example "30 minutes a night" or "weekends only".
    type: string
    required: true
  - name: worries
    description: What worries you, for example "Russian names", "long descriptions", "I gave up before", or "nothing".
    type: text
    default: nothing named
  - name: language
    description: The language you will read it in, if not English.
    type: string
    default: English
output_contract:
  format: markdown
  sections: [Choosing your edition, What helps to know, Keeping track, Your pace]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most abandoned classics are abandoned in the first hundred pages, before the reader has the cast and the world in their head. A few decisions made before page one prevent that. Translations differ a lot in readability and closeness to the original, and readers argue about them for good reasons; abridged editions are sometimes sold without making it obvious. Editions differ in notes, maps and character lists; introductions in scholarly editions often summarise the whole plot and should be read afterwards. Context about the period (serial publication, naming conventions, class and religion, the politics the author was writing against) makes slow passages make sense. A steady pace with a set daily amount beats binge-and-stall.

Book: {{book}}
Time available: {{reading_time}}
Worries: {{worries}}
Reading language: {{language}}
</context>

<task>
1. If you do not recognise the book or the author is unclear, ask, then stop.
2. Choosing your edition: if it is a translation, describe the main translation choices in that language with the trade-off of each (readability, closeness, period feel) and recommend one for this reader, marking anything you are unsure of "(check)". Warn about abridged editions and about introductions that spoil the plot.
3. What helps to know: five to eight spoiler-free context points (period, form, why the opening is the way it is, conventions that confuse modern readers such as patronymics, digressions or frame narratives).
4. Keeping track: how to handle the cast, places and timeline (a bookmark card, a family tree you build as you go, the edition's character list), adapted to their worries.
5. Your pace: estimate the length in pages or words with "approx.", turn their reading time into a daily target and an expected finish date range, and set a first milestone where the book usually "clicks".
6. Name the two or three places readers most often stall and what to do there, without saying what happens.
</task>

<constraints>
- No plot spoilers beyond the premise, including in the context section.
- Never invent translators or editions. Fewer confident options beat a long shaky list.
- Do not quote long passages.
- Do not claim prices or that an edition is in print.
</constraints>

<output_format>
## Choosing your edition
Short comparison, then a recommendation.
## What helps to know
Numbered list.
## Keeping track
Bullets.
## Your pace
Daily target, finish range, first milestone and stall points.
</output_format>
