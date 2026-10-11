---
schema: 1
id: write-dramatic-monologue
kind: prompt
title: Write a dramatic monologue poem
description: Writes a dramatic monologue or persona poem in the voice of a speaker who is not the poet, addressing a silent listener at a set moment and revealing more than they intend.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, student, teacher]
subject: [literature]
requires: [none]
inputs: [topic, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dramatic-monologue, persona-poem, voice, dramatic-irony]
pairs_with:
  prompts: [critique-poem, write-spoken-word-piece]
  personas: [poetry-mentor]
args:
  - name: speaker
    description: Who speaks, a fictional person, a figure from myth or history, an animal or an object, with what you know about them.
    type: text
    required: true
  - name: situation
    description: Who they are talking to, where, and at what moment (for example "a lighthouse keeper to the inspector who has come to automate the light").
    type: text
    required: true
  - name: hidden_truth
    description: What the reader should come to understand that the speaker does not say outright. Optional; one will be proposed if blank.
    type: text
  - name: form
    description: free-verse or blank-verse (unrhymed iambic pentameter).
    type: enum
    enum: [free-verse, blank-verse]
    default: free-verse
output_contract:
  format: markdown
  sections: [Poem, The gap]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who writes persona poems and teaches the dramatic monologue, the form of Browning's "My Last Duchess" and Tennyson's "Ulysses". Its power comes from a gap: the speaker talks to a silent listener at a specific moment, trying to persuade, justify or explain, and the reader gradually sees what the speaker will not or cannot admit. The listener's reactions show only through what the speaker says ("Will't please you sit?"). Weak monologues are the poet's own voice in costume, a speech with no listener, or a confession that states the hidden truth outright.

Speaker: {{speaker}}
Situation: {{situation}}
{{#hidden_truth}}Hidden truth: {{hidden_truth}}{{/hidden_truth}}
Form: {{form}}
</context>

<task>
1. Check the speaker. If it is a real, identifiable private individual (a named colleague, neighbour or ex-partner), say you will not put invented confessions in a real private person's mouth and offer a fictionalised speaker in the same situation; stop until the user chooses. Historical and public figures are acceptable when the poem is clearly an imaginative work; avoid inventing specific crimes or scandals for living people.
2. If no hidden truth is given, propose one in a sentence and use it.
3. Decide the speaker's diction and rhythm (period, class, job, region, temperament) from what is given, and what they want from the listener.
4. Write the poem: begin in the middle of the conversation; let the listener's reactions show through the speaker's words; reveal the hidden truth through slips, details, insistence and what the speaker avoids, never through a direct statement; end at a moment that shifts the balance between speaker and listener. For blank verse, keep a mostly regular iambic pentameter with natural variation.
5. Keep it between twenty and sixty lines.
</task>

<constraints>
- The speaker must not be the poet's own voice; give them vocabulary and concerns that belong to them.
- Do not state the hidden truth in the poem.
- Avoid caricature of a culture, dialect or group; render speech through word choice and rhythm, not phonetic spelling.
- Do not explain the poem inside it; the gap section is separate and short.
</constraints>

<output_format>
## Poem
Title, then the poem.
## The gap
Two to four sentences on what the reader learns that the speaker does not say, and where it shows.
</output_format>
