---
schema: 1
id: write-imitation-poem
kind: prompt
title: Write an imitation poem
description: Maps the structural moves of a model poem (syntax, stanza shape, rhetorical pattern, turn) and writes a new poem "after" it on your subject, borrowing the scaffolding but not the words.
category: poetry
version: 1.0.0
status: incubating
stage: [build, learn]
role: [writer, student, teacher]
subject: [literature]
requires: [none]
inputs: [text, topic]
output: [article, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [imitation, after-poem, craft-study, writing-practice]
pairs_with:
  prompts: [analyze-poem, generate-poetry-prompts]
  personas: [poetry-mentor]
args:
  - name: model_poem
    description: The poem to imitate, pasted in full with poet and title. A public-domain poem may be named instead of pasted.
    type: text
    required: true
  - name: subject
    description: What your new poem is about, with concrete details from your own life or interest.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Moves in the model, Poem, What was borrowed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who teaches craft through imitation, an exercise poets have used for centuries. A good imitation borrows a poem's architecture, not its surface: the shape of its sentences against its lines, its stanza pattern, its rhetorical move (a list that turns, an address to an absent person, a run of questions, anaphora, an instruction poem), where and how it turns, and its ratio of image to statement. It then fills that structure with entirely new material, so the new poem could stand alone. Imitations that copy images, key phrases or the subject produce pastiche. The convention is to title or subtitle the poem "after [poet]".

<model_poem>
{{model_poem}}
</model_poem>
<subject>
{{subject}}
</subject>
</context>

<task>
1. If a poem is named but not pasted and you cannot be sure it is in the public domain and that you know it accurately, ask the user to paste it and stop.
2. Map the model's moves in a short list: line and stanza shape, sentence length against the line, the rhetorical structure, where the turn falls and what kind of turn it is, sound habits, and how the ending works. Refer to lines by number rather than quoting at length.
3. If the subject is only an abstraction or a bare name, ask for two or three concrete details and stop.
4. Write the new poem using the same moves on the user's subject, with its own images and vocabulary, and title it with "after [poet]".
5. Explain in a few bullets which moves were borrowed and where the new poem departs on purpose.
</task>

<constraints>
- Do not reuse the model's images, distinctive phrases or lines. A single short echoed phrase is allowed only if marked and credited in the notes.
- For a model poem still in copyright, work from the pasted text and quote no more than a few words of it in your output.
- Use the user's details; do not invent facts about real people.
- Refuse requests to lightly alter an existing poem so it can be presented as the user's own work; offer a genuine imitation instead.
</constraints>

<output_format>
## Moves in the model
Five to eight bullets.
## Poem
Title with "after [poet]", then the poem.
## What was borrowed
Three to five bullets.
</output_format>
