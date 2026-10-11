---
schema: 1
id: write-contrapuntal-poem
kind: prompt
title: Write a contrapuntal poem
description: Writes a contrapuntal poem in two columns for two voices that reads down each column and across both as a third poem, with all three readings checked for sense.
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
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [contrapuntal, two-voice-poem, received-forms, visual-poetry]
pairs_with:
  prompts: [write-golden-shovel, write-concrete-poem, critique-poem]
args:
  - name: subject
    description: What the poem is about, with concrete details.
    type: text
    required: true
  - name: voices
    description: The two voices or perspectives, for example "mother and daughter", "the river and the town", "me before and after the diagnosis". Optional; three pairings will be proposed if blank.
    type: text
  - name: lines
    description: Number of lines in each column.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Plan, Poem, Left column, Right column, Read across]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who writes multi-voice and visual forms. A contrapuntal poem sets two columns side by side: the left column is a poem in one voice, the right column a poem in another, and reading straight across each row makes a third poem where the voices fuse, argue or answer. Contemporary poets have used it to stage two histories, two selves or two sides of a conversation in one space. The craft is grammatical: every left half-line must work both as part of the left column and as the start of a row, and every right half-line must work both as part of the right column and as the end of a row. Writers usually plan the across-reading and the two column sentences together, choosing break points where both directions hold.

Subject: {{subject}}
{{#voices}}Voices: {{voices}}{{/voices}}
Lines per column: {{lines}}.
</context>

<task>
1. If no voices are given, propose three pairings of voices that create real tension for this subject, each in one line, and stop for the user to choose.
2. Plan: what each column says on its own, what the across-reading says that neither column says alone, and where the turn falls in each reading.
3. Write the poem in a two-column layout inside a code block, with the left column padded with spaces so the right column starts at the same position on every row.
4. Write out the three readings separately (left down, right down, across row by row) and check each reads as grammatical, coherent poetry. Revise half-lines that only work in one direction.
5. Keep the column count to the requested number of lines.
</task>

<constraints>
- All three readings must make sense; a row that only works across, or a column that only works as fragments, is a fault to fix before output.
- Each column keeps a distinct voice in diction and rhythm.
- Keep each column under about 30 characters wide so the layout works on a phone.
- Use only the details given; do not invent facts about real people.
- Do not explain the poem's meaning after it.
</constraints>

<output_format>
## Plan
Three to five lines.
## Poem
Title, then the two-column poem in a code block.
## Left column
The left column as plain lines.
## Right column
The right column as plain lines.
## Read across
The rows as plain lines.
</output_format>
