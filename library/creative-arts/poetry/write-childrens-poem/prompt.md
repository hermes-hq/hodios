---
schema: 1
id: write-childrens-poem
kind: prompt
title: Write a poem for children
description: Writes a poem for children with a strong beat, playful sound and age-right vocabulary, plus a read-aloud and clapping guide for use in class, at a library session or at bedtime.
category: poetry
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [topic]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [childrens-poetry, read-aloud, rhyme, nonsense-verse, early-literacy]
pairs_with:
  prompts: [write-childrens-story, write-poem-in-form]
args:
  - name: topic
    description: What the poem is about, for example "a dog who hates baths", "the first frost", "counting buses", "being the smallest in the class".
    type: string
    required: true
  - name: age
    description: The child's or group's age in years. Vocabulary, length and beat are pitched to it.
    type: number
    required: true
  - name: form
    description: rhyming (regular beat and end rhyme), nonsense (invented words and silly logic), shape (lines arranged into a picture of the topic), or list (a repeated frame with one new item each line).
    type: enum
    enum: [rhyming, nonsense, shape, list]
    default: rhyming
output_contract:
  format: markdown
  sections: [Poem, Read-aloud guide, Try this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write poems for children and lead read-aloud sessions in schools and libraries. Children's poems work when the beat is steady enough to clap, the sounds are fun in the mouth (alliteration, onomatopoeia, internal rhyme), the words are mostly familiar with one or two delicious new ones, and there is a surprise or a joke near the end. They fail when rhymes force odd word order ("to the shop did go"), the metre lurches, the poem preaches a lesson, or the vocabulary is pitched at adults.

Topic: {{topic}}. Age: {{age}}. Form: {{form}}.
</context>

<task>
1. Pitch to age {{age}}: under 5, four to twelve short lines, simple words, lots of repetition and a refrain to join in; 5 to 8, eight to twenty lines, playful rhyme, one or two new words a child can guess from context; 9 to 12, up to about thirty lines, wordplay, irony and a twist allowed. If the age is over 12, say this prompt is for children and write for the upper end.
2. Write the poem in the {{form}} form:
   - rhyming: a regular beat (usually four stresses or a ballad-like four-three pattern) and true end rhymes in natural word order.
   - nonsense: invented words whose sound suggests their meaning, inside a strict, clappable rhythm so the silliness has a frame.
   - shape: lines laid out in plain text so the poem's outline suggests the topic; keep it readable aloud from top to bottom.
   - list: a repeated opening frame ("In my pocket there's...") with one fresh, concrete item per line building to a funny or warm last line.
3. End with a surprise, joke or warm turn, not a moral.
4. Read it aloud in your head and check: every line keeps the beat when clapped; no rhyme forces unnatural word order; every word is one the age group knows or can guess; nothing is frightening or unkind for the age.
</task>

<constraints>
- No lessons stated outright; let the poem be fun first.
- Avoid stereotypes, mockery of real groups, and gross-out humour unless the user asks for it and the age suits it.
- Do not copy or closely imitate well-known children's poems; write original lines.
- If the topic is sensitive (a pet dying, a new sibling, a move), keep it gentle and honest and suit it to the age.
</constraints>

<output_format>
## Poem
Title, then the poem with line breaks. For a shape poem, keep it in a code block so the layout holds.

## Read-aloud guide
- The beat: the stressed syllables of the first two lines marked in capitals so the reader can clap them.
- Where to pause, where to speed up, and which line or refrain children can join in on.
- One or two words to explain or act out.

## Try this
Two quick follow-ups: an action or clapping game, and a way for children to write their own line or verse in the same pattern.
</output_format>
