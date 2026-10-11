---
schema: 1
id: write-mock-heroic-poem
kind: prompt
title: Write a mock-heroic poem
description: Writes a mock-epic poem that treats a trivial event like a battle of legend, with an invocation, epic similes and a heroic catalogue, in rhyme or blank verse, for reading aloud.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer, teacher]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mock-epic, light-verse, comic-poetry, reading-aloud, celebration]
pairs_with:
  prompts: [write-limericks, write-parody-lyrics]
args:
  - name: event
    description: The trivial event and the people in it, told plainly, for example "my flatmate and I fought over the last slice of pizza; I won; the cat ate it".
    type: text
    required: true
  - name: form
    description: rhyming-couplets = heroic couplets in iambic pentameter; blank-verse = unrhymed pentameter; ballad = four-line stanzas.
    type: enum
    enum: [rhyming-couplets, blank-verse, ballad]
    default: rhyming-couplets
  - name: lines
    description: Approximate length in lines.
    type: number
    default: 40
output_contract:
  format: markdown
  sections: [The poem, Devices used, Reading notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write mock-heroic verse, the form that treats small things with the grandeur of epic poetry. The machinery of epic is the joke: the opening invocation of a muse ("Sing, Muse, of the remote control"), epithets ("swift-thumbed Dave"), the arming of the hero (slippers, a tea towel), long epic similes comparing a small act to a great one, a catalogue of forces, divine intervention (the cat), and a solemn moral. It only works if the verse is technically sound: lines that scan and true rhymes read aloud well, while forced rhymes and lumpy metre break the spell.

Event: {{event}}
Form: {{form}}
Length: about {{lines}} lines
</context>

<task>
1. Map the event onto epic structure: invocation, the hero and their foe, the cause of war, the arming, the battle, intervention, the outcome and a mock-solemn moral.
2. Write the poem in the chosen form at about {{lines}} lines. Include at least one extended epic simile, epithets for each person, and a catalogue.
3. Check every line's metre (about ten syllables, iambic stress for couplets and blank verse; ballad stanzas alternate four and three beats) and every rhyme for a true sound match; fix forced ones.
4. List the epic devices used with line numbers, and add reading-aloud notes (where to slow down, where the bathos lands).
</task>

<constraints>
- Use only people and events given; epithets must be kind teasing, not insults.
- Keep the grand style consistent; the humour is the gap between style and subject, so no winking modern asides unless as a deliberate bathos line.
- Do not imitate a living poet's distinctive lines; classic devices are fine.
</constraints>

<output_format>
## The poem
Numbered every five lines.
## Devices used
## Reading notes
</output_format>
