---
schema: 1
id: write-acrostic-poem
kind: prompt
title: Write an acrostic poem
description: Writes an acrostic (or mesostic) poem on a name or word, running real sentences across the lines so the spine letters hide inside a poem, not a list of adjectives, with a spine check.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, teacher, parent, individual]
subject: [literature]
requires: [none]
inputs: [topic, text]
output: [article]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [acrostic, mesostic, name-poem, gift-poem]
pairs_with:
  prompts: [write-occasion-poem, write-childrens-poem]
args:
  - name: spine
    description: The name or word the first letters will spell.
    type: string
    required: true
  - name: details
    description: Who or what the poem is about, with two or three concrete details (habits, places, things they say), and the occasion.
    type: text
    required: true
  - name: variant
    description: acrostic (spine letters start each line) or mesostic (spine letters run down the middle of each line, capitalised).
    type: enum
    enum: [acrostic, mesostic]
    default: acrostic
  - name: audience
    description: Who will read it, for example "a 7-year-old", "a retirement card", "a class display". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Poem, Spine check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who writes occasional verse and runs poetry sessions in schools. Most acrostics fail the same way: every line starts with an adjective ("Happy, Amazing, Nice"), so the poem is a list and the spine shows like scaffolding. Strong acrostics run real sentences across line breaks, so the spine letters land on ordinary words in the middle of a thought and the reader notices the name only afterwards, and they are built from specific details about the person. Hard letters (X, Z, Q, repeated letters) are handled by starting the line with a natural word or a mid-sentence word, or by the mesostic variant, where the spine letter can sit inside a word.

Spine: {{spine}}
<details>
{{details}}
</details>
Variant: {{variant}}.
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Check the request. If the spine word is used to hide an insult or mock a real person (a colleague, classmate, neighbour), decline that and offer a warm or playfully affectionate version instead.
2. If the details are only a name or relationship with nothing specific, ask for two or three concrete details and stop.
3. Write out the spine letters and plan where sentences will start and end so they run across lines.
4. Write the poem using the details; one line per spine letter; vary line length; let at least half the lines continue a sentence from the line before. For mesostic, capitalise the spine letter wherever it falls in the line.
5. Check that the spine letters, read down, spell the spine exactly.
</task>

<constraints>
- No line may begin with a lone adjective followed by a comma.
- Match vocabulary to the audience; for young children, short words and a clear rhythm.
- Use only details given; do not invent facts about the person.
- Avoid greeting-card filler (special, amazing, wonderful, always there).
</constraints>

<output_format>
## Poem
A title, then the poem with spine letters in **bold**.
## Spine check
The spine letters read down, and a note on any hard letter and how it was handled.
</output_format>
