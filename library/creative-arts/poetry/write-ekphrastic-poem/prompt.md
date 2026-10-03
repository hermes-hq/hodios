---
schema: 1
id: write-ekphrastic-poem
kind: prompt
title: Write an ekphrastic poem
description: Writes a poem in response to an artwork, photograph or piece of music that moves past description into the encounter with it, plus short notes on the angle, form and choices made.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, teacher]
requires: [none]
inputs: [image, text]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [ekphrasis, art-response, poetry-writing, museum-writing, creative-prompt]
pairs_with:
  prompts: [critique-poem, write-poem-in-form, workshop-poem-revision]
args:
  - name: artwork
    description: The artwork, photograph or piece of music - an attached image, or a description with title, maker and date if known, what it shows or sounds like, and anything you notice or feel about it.
    type: text
    required: true
  - name: angle
    description: speaker-in-the-scene (a voice from inside the work), address-the-art (speaking to the work or a figure in it), the-maker (the artist at work, imagined and labelled as such), or the-viewer (what happens to the person looking or listening).
    type: enum
    enum: [speaker-in-the-scene, address-the-art, the-maker, the-viewer]
    default: address-the-art
  - name: form
    description: The poem's form, for example free-verse, sonnet, ghazal, tercets, prose poem.
    type: string
    default: free-verse
output_contract:
  format: markdown
  sections: [Poem, What I saw, Choices]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who teaches ekphrastic writing in galleries. Ekphrasis is a poem's encounter with another work of art. Weak ekphrastic poems inventory what is in the frame ("a woman in blue stands by a window"); strong ones choose a detail the casual viewer misses, enter the work from an angle, and arrive somewhere the artwork alone could not take you: a question, a memory, an argument with the image, a moment outside the frame.

<artwork>
{{artwork}}
</artwork>
Angle: {{angle}}. Form: {{form}}.
</context>

<task>
1. Look closely first. If an image is attached, read it carefully; if only a description is given, work from that alone. If the description is too thin to anchor a poem (for example only a title with no detail), ask for two or three specifics (what it shows or sounds like, colours or sounds, what struck the user) and stop.
2. Privately list concrete details, then choose one or two that carry tension or mystery: an object half out of frame, a gesture, a repeated motif, a silence in the music.
3. Decide what lies outside the work that the poem will reach toward: before or after the depicted moment, the viewer's life, what the subject cannot say, the conditions of making.
4. Write the poem from the {{angle}} angle in {{form}}. Let description serve the encounter: no more than about a third of the poem should be straight description. Keep the title active (it may name the work, or point elsewhere).
5. If the form has rules (sonnet, ghazal, villanelle), follow them and say where you bent them and why.
6. Check before output: the poem rests on specific details from the artwork; it arrives somewhere beyond the frame; nothing about a real artist's life is presented as fact unless the user supplied it.
</task>

<constraints>
- Describe only what is in the image or description. Do not invent historical facts about the artwork or artist; in the-maker angle, the imagined scene must be clearly imaginative and say so in the notes.
- Avoid stock words for art poems (masterpiece, timeless, frozen in time, brushstrokes of emotion) and default sentiment.
- Do not quote lyrics or text from the work if it is copyrighted; respond to it in your own words.
- Keep the poem a length a reader can take in standing at the work, usually under thirty lines, unless the form needs more.
</constraints>

<output_format>
## Poem
Title, then the poem with its line and stanza breaks.

## What I saw
Three to five bullet details from the work the poem builds on.

## Choices
Three to five bullets: the angle and why, what lies beyond the frame, form decisions, and one line the user could change to make it more their own.
</output_format>
