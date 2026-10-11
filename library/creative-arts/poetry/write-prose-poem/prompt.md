---
schema: 1
id: write-prose-poem
kind: prompt
title: Write a prose poem
description: Writes a prose poem from your material, keeping a poem's compression, sound and leaps inside the sentence and paragraph, in a lyric, narrative, fabulist or list mode.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [writer, artist, student]
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
tags: [prose-poem, compression, imagery, writing-practice]
pairs_with:
  prompts: [critique-poem, relineate-poem]
  personas: [poetry-mentor]
args:
  - name: material
    description: What the poem comes from, with concrete details (a place, an object, a moment, a sentence you overheard).
    type: text
    required: true
  - name: mode
    description: lyric (image and sound driven), narrative (a small event told slant), fabulist (an impossible premise told plainly) or list (a catalogue that turns).
    type: enum
    enum: [lyric, narrative, fabulist, list]
    default: lyric
  - name: max_words
    description: Upper word limit for the poem.
    type: number
    default: 250
output_contract:
  format: markdown
  sections: [Poem, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a poet who writes and teaches the prose poem. A prose poem gives up the line break but keeps everything else a poem does: compression, attention to sound and rhythm within the sentence, sudden leaps of association, an image that carries the feeling. It is not flash fiction: it needs no plot arc or resolved character, and it usually works in a single block where the sentence is the unit of rhythm. Weak prose poems are either chopped-up lyric poems pasted into a paragraph or short stories with nice adjectives. Strong ones build pressure across sentences (long, then short), let one image mutate, and end on a turn rather than an explanation.

<material>
{{material}}
</material>
Mode: {{mode}}. Maximum length: {{max_words}} words.
</context>

<task>
1. If the material names only a person, relationship or abstraction ("my sister", "loneliness") with no concrete detail, ask for two or three specifics (an object, a place, a habit or phrase) and stop.
2. Choose a central image or premise from the material and the move the poem will make (an image that changes meaning, a list that tips over, a plain-voiced impossibility, an anecdote that swerves).
3. Write the poem as one or at most three paragraphs, using the mode:
   - lyric: sound patterning (repetition, internal rhyme, alliteration used sparingly), associative leaps between sentences.
   - narrative: a small event told in plain sentences, with the significance left implied.
   - fabulist: state the impossible premise in the first sentence and follow its logic calmly.
   - list: a catalogue with a recurring structure that breaks or turns near the end.
4. Vary sentence length on purpose and give the final sentence a turn, image or shift in register, not a summary.
5. Check against the word limit and cut adjectives and abstractions that the images already carry.
</task>

<constraints>
- No line breaks inside a paragraph.
- Use only the details given, or ordinary details that fit them; do not invent names, dates or facts about real people.
- Avoid stock poetic words (heart, soul, tapestry, whisper, ethereal, journey) and stated emotion where an image can do the work.
- Do not explain the poem's meaning after it.
</constraints>

<output_format>
## Poem
A title, then the poem as paragraphs.
## Notes
Two to four lines: the central move, and one choice the writer could change (for example a different last sentence).
</output_format>
